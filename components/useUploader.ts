"use client";
import { useState, useCallback } from "react";
import axios, { AxiosProgressEvent } from "axios";

// Cloudinary returns a lot of data; these are the most important ones
interface CloudinaryResponse {
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  [key: string]: any;
}

interface UploaderOptions {
  onCompleted?: (res: CloudinaryResponse) => void;
  onError?: (error: string) => void;
  // Replace these with your actual Cloudinary credentials or pass them via env
  cloudName?: string;
  uploadPreset?: string;
}

const useUploader = (options?: UploaderOptions) => {
  const [uploadPercentage, setUploadPercentage] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const CLOUD_NAME = options?.cloudName || "dkxe2zerp"; 
  const UPLOAD_PRESET = options?.uploadPreset || "finance_market";

  const handleReset = useCallback(() => {
    setError(null);
    setUploadPercentage(0);
    setLoading(false);
  }, []);

  const upload = async (file: File) => {
    if (!file) return null;

    handleReset();
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await axios.post<CloudinaryResponse>(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            if (progressEvent.total) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadPercentage(percentCompleted);
            }
          },
        }
      );

      const result = response.data;

      if (result && result.secure_url) {
        options?.onCompleted?.(result);
        // Reset progress bar after successful upload
        setTimeout(() => setUploadPercentage(0), 1000);
        return result;
      } else {
        throw new Error("Upload failed: No URL returned from Cloudinary");
      }
    } catch (err: any) {
      let errorMessage = "Upload to Cloudinary failed";

      if (axios.isAxiosError(err)) {
        // Cloudinary returns errors in err.response.data.error.message
        errorMessage = err.response?.data?.error?.message || err.message;
      }

      setError(errorMessage);
      options?.onError?.(errorMessage);
      console.error("[CLOUDINARY_UPLOAD_ERROR]:", errorMessage);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { upload, uploadPercentage, loading, error, handleReset };
};

export default useUploader;
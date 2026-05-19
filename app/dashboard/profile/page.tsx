"use client";

import { useState, useEffect } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner"; // Assuming sonner for notifications
import {
  User,
  Shield,
  Upload,
  CheckCircle2,
  AlertCircle,
  Key,
  Smartphone,
} from "lucide-react";
import { useGetProfileQuery, useUpdateProfileMutation } from "@/store/api/userApiSlice";


export default function ProfilePage() {
  // 1. RTK Query Hooks

  const { data: profile, isLoading, isError } = useGetProfileQuery("profile"); // "profile" is just a cache key, can be anything unique
  const [updateProfile, { isLoading: isUpdating }] = useUpdateProfileMutation();

  // 2. Local State for Form
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
  });

  // 3. Sync Data to Form when fetched
  useEffect(() => {
    if (profile) {
      setFormData({
        firstName: profile.firstName || "",
        lastName: profile.lastName || "",
        email: profile.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
        country: profile.country || "",
      });
    }
  }, [profile]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSave = async () => {
    try {
      await updateProfile(formData).unwrap();
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <p className="text-muted-foreground animate-pulse">Loading profile data...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-6 text-center">
        <AlertCircle className="w-10 h-10 text-destructive mx-auto mb-2" />
        <p className="text-destructive">Error loading profile. Please refresh the page.</p>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader
        title="Profile"
        description="Manage your personal information"
      />

      <div className="p-6 space-y-6">
        {/* Profile Header */}
        <Card className="bg-card border-border">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="relative">
                <Avatar className="w-24 h-24">
                  <AvatarFallback className="bg-primary/10 text-primary text-2xl">
                    {formData.firstName?.[0]}{formData.lastName?.[0]}
                  </AvatarFallback>
                </Avatar>
                <Button
                  size="icon"
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full"
                >
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-foreground mb-1">
                      {formData.firstName} {formData.lastName}
                    </h2>
                    <p className="text-muted-foreground">{formData.email}</p>
                    <div className="flex flex-wrap items-center gap-2 mt-2">
                      <Badge variant="secondary">{profile?.plan || "Standard"} Plan</Badge>
                      {profile?.kycStatus === "verified" && (
                        <Badge className="bg-accent text-accent-foreground">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Verified
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="text-left md:text-right">
                    <p className="text-sm text-muted-foreground">Account ID</p>
                    <p className="font-mono text-foreground">{profile?.accountId || "N/A"}</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList>
            <TabsTrigger value="personal">Personal Info</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" value={formData.firstName} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" value={formData.lastName} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" value={formData.email} disabled className="bg-muted cursor-not-allowed" />
                  </div>

                  {/* <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input id="phone" type="tel" value={formData.phone} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" value={formData.address} onChange={handleInputChange} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input id="country" value={formData.country} onChange={handleInputChange} />
                  </div> */}
                </div>
                <div className="mt-6">
                  <Button onClick={handleSave} disabled={isUpdating}>
                    {isUpdating ? "Saving Changes..." : "Save Changes"}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">Password and security options can be managed here.</p>
                <Button variant="outline">Request Password Reset</Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                {profile?.recentActivity?.length > 0 ? (
                  <div className="space-y-4">
                    {profile.recentActivity.map((activity: any, index: number) => (
                      <div key={index} className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-muted-foreground">{activity.device}</p>
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.date}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No recent activity found.</p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  );
}
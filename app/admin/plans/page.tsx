'use client'

import { useState } from 'react'
import { 
  useGetAdminPlansQuery, 
  useCreateInvestmentPlanMutation 
} from '@/store/api/admin/adminPlansApiSlice'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Plus, 
  Layers, 
  DollarSign, 
  Clock, 
  Percent, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  Sparkles, 
  Eye, 
  EyeOff,
  Image as ImageIcon,
  UploadCloud,
  RefreshCw
} from 'lucide-react'
import useUploader from '@/components/useUploader'

export default function AdminInvestmentPlans() {
  const { data: plans = [], isLoading: isFetching, isError, refetch } = useGetAdminPlansQuery()
  const [createPlan, { isLoading: isCreating }] = useCreateInvestmentPlanMutation()

  // State Management
  const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL')
  const [picture, setIsPicture] = useState('')
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    minAmount: '',
    maxAmount: '',
    roiPercentage: '',
    durationDays: '',
    category: 'STARTER',
    description: '',
    imageUrl: '',
    isActive: true
  })

  // Instantiate your custom Cloudinary hook architecture
  const { upload, uploadPercentage, loading: isUploading, error: uploadError } = useUploader({
    onCompleted: (res) => {
      console.log("Image uploaded successfully:", res)
      setFormData(prev => ({ ...prev, imageUrl: res?.secure_url || res?.url }))
      setIsPicture(res?.secure_url || res?.url)
    },
    onError: (err) => {
      console.error("Cloudinary failed to parse resource stream:", err)
    }
  })

  // Handle local image file selections
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      await upload(file)
    }
  }

  // Filtering Logic
  const filteredPlans = plans.filter(plan => {
    if (activeTab === 'ACTIVE') return plan.isActive
    if (activeTab === 'INACTIVE') return !plan.isActive
    return true
  })

  // Handlers
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

//   console.log("Image URL:", formData.imageUrl)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createPlan({
        name: formData.name,
        minAmount: Number(formData.minAmount),
        maxAmount: Number(formData.maxAmount),
        roiPercentage: Number(formData.roiPercentage),
        durationDays: Number(formData.durationDays),
        category: formData.category,
        description: formData.description,
        imageUrl: formData.imageUrl || picture,
        isActive: formData.isActive
      }).unwrap()

      // Reset states upon execution
      setFormData({
        name: '',
        minAmount: '',
        maxAmount: '',
        roiPercentage: '',
        durationDays: '',
        category: 'STARTER',
        description: '',
        imageUrl: '',
        isActive: true
      })
      setIsPicture('')
      setIsFormOpen(false)
    } catch (err) {
      console.error("Failed to compile asset node deployment payload:", err)
    }
  }

  return (
    <div className="space-y-8">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Investment Plans</h1>
          <p className="text-muted-foreground mt-1">Configure, provision, and deploy portfolio investment brackets for client dashboard access channels.</p>
        </div>
        <div className="flex items-center gap-2">
          {!isFormOpen && (
            <Button variant="outline" size="icon" onClick={() => refetch()} title="Refresh Data">
              <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
            </Button>
          )}
          <Button 
            onClick={() => setIsFormOpen(!isFormOpen)} 
            className="w-full sm:w-fit bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-600/10 gap-2 h-11 text-white font-medium"
          >
            {isFormOpen ? <Layers size={18} /> : <Plus size={18} />}
            {isFormOpen ? 'View Existing Matrices' : 'Mint New Asset Plan'}
          </Button>
        </div>
      </div>

      {isFormOpen ? (
        /* ================= DEPLOYMENT MINTING COMPONENT BLOCK ================= */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <Card className="lg:col-span-2 p-6 shadow-sm border border-muted/60">
            <div className="mb-6">
              <h2 className="text-xl font-bold flex items-center gap-2 text-foreground">
                <Sparkles className="text-blue-500" size={20} />
                Plan Configuration Parameters
              </h2>
              <p className="text-sm text-muted-foreground">Define accurate rate allocations below. All fields sync automatically into client listing pools.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Package Matrix Name</label>
                  <Input required name="name" value={formData.name} onChange={handleInputChange} placeholder="e.g., Diamond Yield Compound" className="h-11" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Risk Tier Group Category</label>
                  <select 
                    name="category" 
                    value={formData.category} 
                    onChange={handleInputChange}
                    className="w-full rounded-md border border-input bg-background px-3 h-11 text-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                 <option value="STARTER">STARTER Tier Group</option>
                <option value="PRO">PRO Tier Group</option>
                <option value="PREMIUM">PREMIUM Tier Group</option>
                <option value="VIP">VIP Tier Group</option>
                <option value="MEGAPACK_SOLAR">MEGAPACK SOLAR Tier Group</option>
                <option value="ROBOTAXI_FLEET">ROBOTAXI FLEET Tier Group</option>
                  </select>
                </div>
              </div>

              {/* CLOUDINARY UPLOADER DROPZONE FIELD */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Cover Media Asset</label>
                <div className="border-2 border-dashed border-muted-foreground/20 hover:border-blue-500/50 rounded-xl p-6 bg-muted/20 transition-colors text-center relative group">
                  <input 
                    type="file" 
                    accept="image/*" 
                    id="plan-image-upload" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed" 
                    onChange={handleFileChange}
                    disabled={isUploading}
                  />
                  <div className="flex flex-col items-center justify-center space-y-2">
                    <div className="p-3 bg-background rounded-full shadow-sm group-hover:scale-110 transition-transform">
                      {isUploading ? (
                        <Loader2 className="animate-spin text-blue-600" size={22} />
                      ) : (
                        <UploadCloud className="text-muted-foreground" size={22} />
                      )}
                    </div>
                    {isUploading ? (
                      <div className="w-full max-w-[200px] space-y-1">
                        <p className="text-xs font-semibold text-foreground">Syncing to Cloudinary...</p>
                        <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
                          <div className="bg-blue-600 h-full transition-all duration-300" style={{ width: `${uploadPercentage}%` }} />
                        </div>
                        <p className="text-[10px] text-muted-foreground font-bold">{uploadPercentage}%</p>
                      </div>
                    ) : formData.imageUrl ? (
                      <p className="text-xs text-emerald-600 font-semibold truncate max-w-xs">✓ Image linked successfully</p>
                    ) : (
                      <div>
                        <p className="text-xs font-semibold text-foreground">Click or drop image file here</p>
                        <p className="text-[11px] text-muted-foreground mt-0.5">Supports PNG, JPG, or WebP graphic frames</p>
                      </div>
                    )}
                  </div>
                </div>
                {uploadError && <p className="text-xs font-medium text-destructive mt-1">⚠️ {uploadError}</p>}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1"><DollarSign size={12}/> Minimum Bound ($)</label>
                  <Input required type="number" name="minAmount" value={formData.minAmount} onChange={handleInputChange} placeholder="100" className="h-11" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1"><DollarSign size={12}/> Maximum Bound ($)</label>
                  <Input required type="number" name="maxAmount" value={formData.maxAmount} onChange={handleInputChange} placeholder="10000" className="h-11" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1"><Percent size={12}/> Net Return (ROI %)</label>
                  <Input required type="number" step="0.1" name="roiPercentage" value={formData.roiPercentage} onChange={handleInputChange} placeholder="12.5" className="h-11" />
                </div>
                <div className="space-y-1.5 md:col-span-2">
                  <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1"><Clock size={12}/> Lifespan Epoch (Days)</label>
                  <Input required type="number" name="durationDays" value={formData.durationDays} onChange={handleInputChange} placeholder="30" className="h-11" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Product Portfolio Subtext</label>
                <Textarea required name="description" value={formData.description} onChange={handleInputChange} placeholder="Describe conditions, lockup cycles, or backing allocations of this system plan..." rows={4} />
              </div>

              <div className="flex items-center gap-2 bg-muted/30 p-4 rounded-lg border">
                <input 
                  type="checkbox" 
                  id="isActive" 
                  name="isActive" 
                  checked={formData.isActive} 
                  onChange={handleInputChange}
                  className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="isActive" className="text-sm font-medium text-foreground select-none cursor-pointer">
                  Instantly publish to standard pool feeds (Set active)
                </label>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <Button type="button" variant="outline" onClick={() => setIsFormOpen(false)} disabled={isCreating || isUploading} className="h-11 font-medium">Cancel Process</Button>
                <Button type="submit" disabled={isCreating || isUploading} className="bg-emerald-600 hover:bg-emerald-700 h-11 font-medium text-white shadow-md shadow-emerald-600/10 min-w-[140px]">
                  {isCreating ? <Loader2 className="animate-spin" size={18} /> : 'Deploy Asset Profile'}
                </Button>
              </div>
            </form>
          </Card>

          {/* Form Dynamic Live Preview Container */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Live Feed Node Preview</h3>
            <Card className="overflow-hidden border shadow-sm group bg-background">
              <div className="h-44 bg-muted relative flex items-center justify-center overflow-hidden">
                {formData.imageUrl ? (
                  <img src={formData.imageUrl} alt="preview" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="text-muted-foreground/40 flex flex-col items-center gap-1"><ImageIcon size={32} /><span className="text-xs">No Asset Rendered</span></div>
                )}
                <span className="absolute top-3 right-3 text-xs font-bold tracking-wide text-white bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-full">
                  {formData.category}
                </span>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <h4 className="font-bold text-lg text-foreground truncate">{formData.name || 'Untitled Offering Plan'}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mt-1">{formData.description || 'Provide descriptions in the configurations editor block to map structural layout previews.'}</p>
                </div>
                <div className="grid grid-cols-2 gap-3 bg-muted/40 p-3 rounded-lg border border-muted text-xs">
                  <div>
                    <span className="text-muted-foreground block font-medium">Limits</span>
                    <span className="font-bold text-foreground text-sm">${Number(formData.minAmount || 0).toLocaleString()} - ${Number(formData.maxAmount || 0).toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground block font-medium">Yield Return</span>
                    <span className="font-bold text-emerald-600 text-sm">+{formData.roiPercentage || '0'}% Net ROI</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-1">
                  <span className="flex items-center gap-1 font-medium text-muted-foreground"><Clock size={14}/> {formData.durationDays || '0'} Day Cycle</span>
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${formData.isActive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'}`}>
                    {formData.isActive ? <CheckCircle size={10} /> : <XCircle size={10} />}
                    {formData.isActive ? 'Active Stream' : 'Staged Pipeline'}
                  </span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      ) : (
        /* ================= LIVE CONFIG MATRIX BREAKDOWN ================= */
        <div className="space-y-6">
          {/* Controls Segment */}
          <div className="flex border-b w-fit space-x-1 p-1 bg-muted/60 rounded-lg">
            {(['ALL', 'ACTIVE', 'INACTIVE'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all ${activeTab === tab ? 'bg-background shadow-sm text-blue-600' : 'text-muted-foreground hover:text-foreground'}`}
              >
                {tab === 'ALL' ? 'Show All Matrix' : tab === 'ACTIVE' ? 'Live Feeds' : 'Archived Packs'}
              </button>
            ))}
          </div>

          {/* Loader Fallback Grid */}
          {isFetching && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <Card key={i} className="h-80 bg-muted animate-pulse rounded-lg border" />
              ))}
            </div>
          )}

          {/* Error Boundary Banner */}
          {isError && (
            <Card className="p-4 border-destructive/50 bg-destructive/5 flex items-center gap-3 text-destructive">
              <XCircle size={20} />
              <p className="text-sm font-medium">Failed to decode configuration states from the ledger node. Verify gateway connectivity parameters.</p>
            </Card>
          )}

          {/* Empty Records Notice */}
          {!isFetching && filteredPlans.length === 0 && (
            <div className="text-center py-16 border rounded-xl bg-muted/10 border-dashed">
              <Layers size={40} className="mx-auto text-muted-foreground/30 mb-3" />
              <h3 className="font-semibold text-foreground text-lg">No Package Tracks Matched</h3>
              <p className="text-sm text-muted-foreground mt-1 max-w-sm mx-auto">Click the control engine setup option to publish initial configurations to clients.</p>
            </div>
          )}

          {/* Portfolio Offerings Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map((plan) => (
              <Card key={plan._id} className={`overflow-hidden border shadow-sm flex flex-col group relative ${!plan.isActive ? 'opacity-70 bg-muted/10' : 'bg-background'}`}>
                <div className="h-40 bg-muted relative overflow-hidden">
                  <img src={plan.imageUrl} alt={plan.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  <span className="absolute top-3 right-3 text-[10px] font-extrabold tracking-widest text-white bg-black/70 backdrop-blur px-2.5 py-1 rounded-full uppercase">
                    {plan.category}
                  </span>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-foreground truncate">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">{plan.description}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-muted/40 p-3 rounded-lg border border-muted text-xs">
                    <div>
                      <span className="text-muted-foreground/80 block font-medium mb-0.5">Threshold Limits</span>
                      <span className="font-bold text-foreground text-[13px]">${plan.minAmount.toLocaleString()} - ${plan.maxAmount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground/80 block font-medium mb-0.5">Pool Returns</span>
                      <span className="font-bold text-emerald-600 text-[13px]">+{plan.roiPercentage}% Net ROI</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs border-t pt-3 border-muted">
                    <span className="flex items-center gap-1 font-medium text-muted-foreground"><Clock size={14}/> {plan.durationDays} Day Lockup</span>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wider ${plan.isActive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-amber-500/10 text-amber-600'}`}>
                      {plan.isActive ? <Eye size={12} /> : <EyeOff size={12} />}
                      {plan.isActive ? 'Active Live' : 'Staged Sync'}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
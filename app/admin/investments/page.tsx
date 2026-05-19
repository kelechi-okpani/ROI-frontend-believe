'use client'

import { useState, useMemo } from 'react'
import { PaginationLedger } from '@/components/ui/pagination-ledger'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Download, 
  Check, 
  X, 
  Loader2, 
  RefreshCw, 
  TrendingUp, 
  Briefcase,
  AlertCircle
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart
} from 'recharts'
import { useGetPendingInvestmentsQuery, useReviewInvestmentMutation } from '@/store/api/admin/investmentsApiSlice'

export default function AdminInvestments() {
  // Upstream Live RTK-Query Connections
  const { data: investments = [], isLoading: isFetching, isError, refetch } = useGetPendingInvestmentsQuery()
  const [reviewInvestment, { isLoading: isReviewing }] = useReviewInvestmentMutation()

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

  // Native Component Filter & Pagination States
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED'>('ALL')
  const [processingId, setProcessingId] = useState<string | null>(null)


  // Action Modifier Pipeline execution logic
  const handleReview = async (id: string, action: 'APPROVE' | 'REJECT') => {
    setProcessingId(id)
    try {
      await reviewInvestment({ id, action }).unwrap()
    } catch (err) {
      console.error(`[INVESTMENT_WORKFLOW_CRASH]: Execution failed during action: ${action}`, err)
    } finally {
      setProcessingId(null)
    }
  }

  // 1. Text Parsing & Status Filter Mapping Block
  const filteredInvestments = investments.filter((inv:any) => {
    if (statusFilter !== 'ALL' && inv.status !== statusFilter) return false

    const userFirstName = inv.userId?.firstName || ''
    const userLastName = inv.userId?.lastName || ''
    const userEmail = inv.userId?.email || ''
    const fullName = `${userFirstName} ${userLastName}`.toLowerCase()
    const planName = (inv.planId?.name || '').toLowerCase()
    const search = searchTerm.toLowerCase()

    return (
      fullName.includes(search) ||
      userEmail.toLowerCase().includes(search) ||
      planName.includes(search)
    )
  })

  // 2. Client Side Pagination View Slicing Configuration
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentDisplayedInvestments = filteredInvestments.slice(indexOfFirstItem, indexOfLastItem)

  // 3. Dynamic Aggregation Engine: Populates the Trend Chart directly using actual database indices
  const dynamicChartData = useMemo(() => {
    const monthlyMap: Record<string, { month: string; count: number; amount: number }> = {}
    
    // Sort and cluster records based on historical timestamp profiles
    investments.forEach((inv:any) => {
      if (!inv.createdAt) return
      const date = new Date(inv.createdAt)
      const monthLabel = date.toLocaleString('default', { month: 'short' }) // e.g., "Jan", "Feb"
      
      if (!monthlyMap[monthLabel]) {
        monthlyMap[monthLabel] = { month: monthLabel, count: 0, amount: 0 }
      }
      
      monthlyMap[monthLabel].count += 1
      if (inv.status === 'ACTIVE' || inv.status === 'COMPLETED') {
        monthlyMap[monthLabel].amount += inv.amount
      }
    })

    const order = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    return Object.values(monthlyMap).sort((a, b) => order.indexOf(a.month) - order.indexOf(b.month))
  }, [investments])

  // Reset page layout frame on input changes to prevent clipping views out of bounds
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleStatusFilterChange = (status: typeof statusFilter) => {
    setStatusFilter(status)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Upper Context Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Asset Investment Management</h1>
          <p className="text-muted-foreground mt-1">Audit active micro-lending configurations, review incoming proposals and inspect target returns.</p>
        </div>
        <Button variant="outline" size="icon" onClick={() => refetch()} disabled={isFetching}>
          <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
        </Button>
      </div>

      {/* Analytics Chart Segment */}
      <Card className="p-6 border shadow-sm bg-background">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
              <TrendingUp size={18} className="text-blue-600" /> Platform Deployment Metrics
            </h2>
            <p className="text-xs text-muted-foreground">Real-time mapping of capital sizing offsets across monthly runtime clusters</p>
          </div>
        </div>
        
        <div className="h-[280px] w-full">
          {dynamicChartData.length === 0 ? (
            <div className="h-full w-full flex items-center justify-center text-xs font-semibold text-muted-foreground bg-muted/20 border border-dashed rounded-lg">
              Insufficient ledger metrics available to populate analytics vectors.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={dynamicChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted/60" vertical={false} />
                <XAxis dataKey="month" tickLine={false} className="text-xs font-bold text-muted-foreground" />
                <YAxis yAxisId="left" tickLine={false} axisLine={false} className="text-xs font-bold text-muted-foreground" label={{ value: 'Volume ($)', angle: -90, position: 'insideLeft', style: { textAnchor: 'middle', fill: '#6b7280', fontWeight: 600, fontSize: 10 } }} />
                <YAxis yAxisId="right" orientation="right" tickLine={false} axisLine={false} className="text-xs font-bold text-muted-foreground" label={{ value: 'Requests Count', angle: 90, position: 'insideRight', style: { textAnchor: 'middle', fill: '#6b7280', fontWeight: 600, fontSize: 10 } }} />
                <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', fontWeight: 600, paddingTop: '10px' }} />
                <Bar yAxisId="left" dataKey="amount" fill="#2563eb" radius={[4, 4, 0, 0]} name="Active Invested Volume ($)" maxBarSize={45} />
                <Line yAxisId="right" type="monotone" dataKey="count" stroke="#db2777" strokeWidth={2.5} name="Contract Count" dot={{ r: 4, strokeWidth: 2 }} />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </div>
      </Card>

      {/* Table Sieve Engine Filtering Shells */}
      <div className="flex flex-col xl:flex-row gap-4 xl:items-center justify-between">
        <div className="relative w-full xl:max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search matching users or active target plan profiles..."
            className="pl-10 h-10 bg-background"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>

        {/* Extended State Matrix Tabs */}
        <div className="flex border p-1 bg-muted/40 rounded-lg space-x-1 overflow-x-auto w-full xl:w-auto">
          {(['ALL', 'ACTIVE', 'COMPLETED', 'CANCELLED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => handleStatusFilterChange(tab)}
              className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
                statusFilter === tab 
                  ? 'bg-background shadow-sm text-blue-600 border border-border' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'ALL' ? 'All Contracts' : tab.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Content Ledger Grid */}
    <Card className="overflow-hidden border shadow-sm bg-background">
  <div className="overflow-x-auto">
    <table className="w-full">
      <thead className="bg-muted/50 border-b border-border text-left">
        <tr>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">User Entity Context</th>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Principal Volume</th>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Tier Architecture Plan</th>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status Lifecycle</th>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Duration(ROI)</th>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Daily Profit</th>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Total Profit</th>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Allocation Date</th>
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Workflow Options</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-border">
        {isFetching && (
          <tr>
            <td colSpan={7} className="p-12 text-center text-sm font-medium text-muted-foreground">
              <div className="flex items-center justify-center gap-2">
                <Loader2 className="animate-spin text-blue-600" size={16} />
                Resolving current investment indexes...
              </div>
            </td>
          </tr>
        )}

        {isError && (
          <tr>
            <td colSpan={7} className="p-8 text-center text-sm font-medium text-destructive">
              ⚠️ Fatal downstream network crash experienced collecting database positions.
            </td>
          </tr>
        )}

        {!isFetching && currentDisplayedInvestments.length === 0 && (
          <tr>
            <td colSpan={7} className="p-16 text-center text-muted-foreground text-sm">
              <div className="max-w-xs mx-auto space-y-2">
                <AlertCircle className="mx-auto text-muted-foreground/40" size={28} />
                <p className="font-semibold text-foreground">No Subscriptions Found</p>
                <p className="text-xs text-muted-foreground">Adjust text strings or navigate alternate metadata fields context channels.</p>
              </div>
            </td>
          </tr>
        )}

        {!isFetching && currentDisplayedInvestments.map((inv: any) => {
          const userFullName = inv.userId ? `${inv.userId.firstName || ''} ${inv.userId.lastName || ''}`.trim() : 'System Operator'
          const isActionable = inv.status === 'PENDING'
          
          // Fallback checking to support both string tracking or global state variables
          const isThisRowProcessing = typeof processingId !== 'undefined' ? processingId === inv._id : false
          const isReviewingInProgress = typeof isReviewing !== 'undefined' ? isReviewing : false

          return (
            <tr key={inv._id} className="hover:bg-muted/10 transition-colors text-sm">
              {/* User Entity Context */}
              <td className="px-6 py-4">
                <div className="font-semibold text-foreground">{userFullName}</div>
                <div className="text-xs text-muted-foreground max-w-[170px] truncate">
                  {inv.userId?.email || 'N/A'}
                </div>
              </td>

              {/* Principal Volume */}
              <td className="px-6 py-4 font-mono font-bold text-foreground">
                ${(inv.amount ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </td>

              {/* Tier Architecture Plan */}
              <td className="px-6 py-4 font-medium text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <Briefcase size={14} className="text-slate-400 shrink-0" />
                  <div className="max-w-[180px] truncate" title={inv.planId?.name}>
                    {inv.planId?.name || 'Default Strategy'}
                  </div>
                </div>
              </td>

              {/* Status Lifecycle */}
              <td className="px-6 py-4">
                <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                  inv.status === 'ACTIVE' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                  inv.status === 'COMPLETED' ? 'bg-blue-500/10 text-blue-600 border-blue-500/20' :
                  'bg-rose-500/10 text-rose-600 border-rose-500/20'
                }`}>
                  {inv.status}
                </span>
              </td>

              {/* Return Matrix (ROI) */}
           <td className="px-6 py-4 vertical-align-top">
              <div className="space-y-1">
                {/* Rate & Duration Header Sub-Row */}
                <div className="font-bold text-emerald-600 flex items-center gap-1">
                  <span>{inv.planId?.roiPercentage ? `${inv.planId.roiPercentage}%` : '0%'}</span>
                  <span className="text-[10px] font-medium text-muted-foreground">
                    ({inv.planId?.durationDays || 0}d)
                  </span>
                </div>
                
             
              </div>
            </td>

              <td className="px-6 py-4 vertical-align-top">
              <div className="space-y-1">
 
                {/* Daily Accrual Metric Sub-Row */}
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="font-medium text-muted-foreground">Daily:</span>
                  <span className="font-bold text-foreground">${inv.dailyProfit ?? '0.00'}</span>
                </div>
               
              </div>
            </td>

              <td className="px-6 py-4 vertical-align-top">
              <div className="space-y-1">
            
                
                {/* Aggregate Yield Target Sub-Row */}
                <div className="text-xs text-muted-foreground flex items-center gap-1">
                  <span className="font-medium text-muted-foreground">Est. Total:</span>
                  <span className="font-bold text-foreground">${(inv.totalExpectedReturn ?? 0).toLocaleString()}</span>
                </div>
              </div>
            </td>

              {/* Allocation Date */}
              <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap">
                <div className="space-y-0.5">
                  <div>Created: {inv.createdAt ? new Date(inv.createdAt).toLocaleDateString() : 'N/A'}</div>
                  {inv.approvedAt && (
                    <div className="text-[10px] text-emerald-600/80">
                      Approved: {new Date(inv.approvedAt).toLocaleDateString()}
                    </div>
                  )}
                </div>
              </td>

              {/* Workflow Options */}
              <td className="px-6 py-4 text-right">
                {isActionable ? (
                  <div className="flex items-center justify-end gap-2">
                    <Button 
                      size="sm"
                      onClick={() => handleReview(inv._id, 'APPROVE')}
                      disabled={isReviewingInProgress || isThisRowProcessing}
                      className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 text-white border-none h-8 px-2.5 text-xs font-bold uppercase flex items-center gap-1 shadow-sm"
                    >
                      {isThisRowProcessing ? <Loader2 size={12} className="animate-spin" /> : <Check size={12} />}
                      <span>Approve</span>
                    </Button>
                    <Button 
                      size="sm"
                      onClick={() => handleReview(inv._id, 'REJECT')}
                      disabled={isReviewingInProgress || isThisRowProcessing}
                      className="cursor-pointer bg-rose-600 hover:bg-rose-700 text-white border-none h-8 px-2.5 text-xs font-bold uppercase flex items-center gap-1 shadow-sm"
                    >
                      {isThisRowProcessing ? <Loader2 size={12} className="animate-spin" /> : <X size={12} />}
                      <span>Reject</span>
                    </Button>
                  </div>
                ) : (
                  <span className="text-xs font-semibold text-muted-foreground/50 italic pr-2 select-none">
                    Settled
                  </span>
                )}
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  </div>
</Card>

      {/* Standardized Reusable Pagination Controls hook placement */}
      <PaginationLedger
        totalItems={filteredInvestments.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  )
}
'use client'

import { useState } from 'react'

import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Check, 
  X, 
  RefreshCw, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  AlertCircle,
  Loader2,
  FileSpreadsheet
} from 'lucide-react'
import { useGetPendingTransactionsQuery, useReviewTransactionMutation } from '@/store/api/admin/transactionApiSlice'
import { PaginationLedger } from '@/components/ui/pagination-ledger'


export default function AdminTransactions() {
  const { data: transactions = [], isLoading: isFetching, isError, refetch } = useGetPendingTransactionsQuery()
  const [reviewTransaction, { isLoading: isReviewing }] = useReviewTransactionMutation()

  
  // 1. Set Pagination States
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // State Segments
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'PENDING' | 'COMPLETED' | 'FAILED'>('ALL')
  const [processingId, setProcessingId] = useState<string | null>(null)

  // Real-Time Action Handler for Approving / Rejecting Node Ledger Pay-ins
  // const handleReview = async (id: string, action: 'APPROVE' | 'REJECT') => {
  //   setProcessingId(id)
  //   try {
  //     await reviewTransaction({ id, action }).unwrap()
  //   } catch (err) {
  //     console.error(`[TRANSACTION_REVIEW_CRASH]: Failed executing ${action} process:`, err)
  //   } finally {
  //     setProcessingId(null)
  //   }
  // }

      const handleReview = async (id: string, action: 'APPROVE' | 'REJECT') => {
      // Add this safety layer
      const confirmed = window.confirm(`Are you sure you want to ${action} this transaction?`);
      if (!confirmed) return;

      setProcessingId(id);
      try {
        await reviewTransaction({ id, action }).unwrap();
      } catch (err) {
        console.error(`[TRANSACTION_REVIEW_CRASH]: Failed executing ${action} process:`, err);
      } finally {
        setProcessingId(null);
      }
    };

    // Dynamic Compound Processing: Multi-layer text + state filtering mapping
    const filteredTransactions = transactions.filter((tx:any) => {
      // Check Status Match
      if (statusFilter !== 'ALL' && tx.status !== statusFilter) return false

      // Compute String Matching Pools safely factoring in nested ChatUser structural references
      const userFirstName = tx.userId?.firstName || ''
      const userLastName = tx.userId?.lastName || ''
      const userEmail = tx.userId?.email || ''
      const fullName = `${userFirstName} ${userLastName}`.toLowerCase()
      const txType = (tx.type || '').toLowerCase()
      const reference = (tx.reference || '').toLowerCase()
      const search = searchTerm.toLowerCase()

      return (
        fullName.includes(search) || 
        userEmail.toLowerCase().includes(search) || 
        txType.includes(search) || 
        reference.includes(search)
      )
    })


    // 3. Slice data for the active view window
    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentData = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)


  // Export Local Filter Cache to CSV Structure safely
  const handleExportCSV = () => {
    if (filteredTransactions.length === 0) return
    
    const headers = ['Reference', 'User Name', 'User Email', 'Type', 'Amount', 'Status', 'Date']
    const rows = filteredTransactions.map(({ reference, userId, type, amount, status, createdAt }) => [
      reference,
      `${userId?.firstName || ''} ${userId?.lastName || ''}`,
      userId?.email || '',
      type,
      amount,
      status,
      new Date(createdAt).toLocaleDateString()
    ])

    const csvContent = 'data:text/csv;charset=utf-8,' 
      + [headers.join(','), ...rows.map(e => e.join(','))].join('\n')
    
    const encodedUri = encodeURI(csvContent)
    const link = document.createElement('a')
    link.setAttribute('href', encodedUri)
    link.setAttribute('download', `Transaction_Ledger_Export_${Date.now()}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }


  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-5">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">Financial Transaction Ledger</h1>
          <p className="text-muted-foreground mt-1">Audit, authorize, or reject live user capital deposits and withdrawal pipeline updates.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => refetch()} disabled={isFetching} title="Force Ledger Synchronizer">
            <RefreshCw size={16} className={isFetching ? "animate-spin" : ""} />
          </Button>
          {/* <Button 
            variant="outline" 
            onClick={handleExportCSV} 
            disabled={filteredTransactions.length === 0}
            className="gap-2 h-10 font-medium text-xs uppercase tracking-wider"
          >
            <FileSpreadsheet size={16} /> Export View
          </Button> */}
        </div>
      </div>

      {/* Control Navigation Filters & Search Engine Blocks */}
      <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
        <div className="relative w-full lg:max-w-md">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Filter metadata by name, email, type, or reference context..."
            className="pl-10 h-11 bg-background"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Tab-driven Segment Filters */}
        <div className="flex border p-1 bg-muted/40 rounded-lg space-x-1 w-full lg:w-auto overflow-x-auto">
          {(['ALL', 'PENDING', 'COMPLETED', 'FAILED'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setStatusFilter(tab)}
              className={`cursor-pointer px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-md transition-all whitespace-nowrap ${
                statusFilter === tab 
                  ? 'bg-background shadow-sm text-blue-600 border' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {tab === 'ALL' ? 'All Operations' : tab.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Primary Data Grid Segment */}
      <Card className="overflow-hidden border shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-muted/50 border-b border-border text-left">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Reference Tracking No</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">User Node Info</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Flow Type</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Financial Volume</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Status Flag</th>
                {/* <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Processing Date</th> */}
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Workflow Execution</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isFetching && (
                <tr>
                  <td colSpan={7} className="p-12 text-center text-sm font-medium text-muted-foreground">
                    <div className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin text-blue-600" size={18} />
                      Reading active transaction clusters...
                    </div>
                  </td>
                </tr>
              )}

              {isError && (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-sm font-medium text-destructive">
                    ⚠️ Fatal exception occurred parsing upstream network transactions buffer.
                  </td>
                </tr>
              )}
              
              {!isFetching && currentData.length === 0 && (
                <tr>
                  <td colSpan={7} className="p-16 text-center text-muted-foreground text-sm border-dashed">
                    <div className="max-w-xs mx-auto space-y-2">
                      <AlertCircle className="mx-auto text-muted-foreground/40" size={32} />
                      <p className="font-semibold text-foreground">No Records Matching Parameters</p>
                      <p className="text-xs text-muted-foreground">Verify spelling filters or cycle tracking parameters across other status tags.</p>
                    </div>
                  </td>
                </tr>
              )}

              {currentData.map((tx:any) => {
                const userFullName = tx.userId ? `${tx.userId.firstName || ''} ${tx.userId.lastName || ''}`.trim() : 'Anonymous Client'
                const isActionable = tx.status === 'PENDING'
                const isThisRowProcessing = processingId === tx._id

                return (
                  <tr key={tx._id} className={`hover:bg-muted/20 transition-colors text-sm ${tx.status === 'FAILED' ? 'opacity-70 bg-red-500/[0.01]' : ''}`}>
                    <td className="px-6 py-4 font-mono text-xs font-bold text-foreground select-all">
                      {tx.reference}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold text-foreground">{userFullName}</div>
                      <div className="text-xs text-muted-foreground max-w-[160px] truncate">{tx.userId?.email || 'Missing mail route'}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center font-bold text-[10px] uppercase tracking-wider px-2 py-0.5 rounded ${
                        tx.type === 'DEPOSIT' ? 'bg-blue-500/10 text-blue-600' :
                        tx.type === 'WITHDRAWAL' ? 'bg-purple-500/10 text-purple-600' :
                        'bg-slate-500/10 text-slate-600'
                      }`}>
                        {tx.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-foreground">
                      ${tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase border ${
                        tx.status === 'COMPLETED' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                        tx.status === 'PENDING' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                        'bg-rose-500/10 text-rose-600 border-rose-500/20'
                      }`}>
                        {tx.status === 'COMPLETED' ? <CheckCircle2 size={12} /> : 
                         tx.status === 'PENDING' ? <Clock size={12} /> : 
                         <XCircle size={12} />}
                        {tx.status}
                      </span>
                      {tx.adminNote && (
                        <p className="text-[11px] text-muted-foreground mt-0.5 italic line-clamp-1 max-w-[140px]" title={tx.adminNote}>
                          💬 {tx.adminNote}
                        </p>
                      )}
                    </td>
                    {/* <td className="px-6 py-4 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(tx.createdAt).toLocaleDateString(undefined, { 
                        year: 'numeric', 
                        month: 'short', 
                        day: 'numeric' 
                      })}
                    </td> */}
                    <td className="px-6 py-4 text-right">
                      {isActionable ? (
                       <div className="flex items-center justify-end gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleReview(tx._id, 'APPROVE')}
                                disabled={isReviewing || isThisRowProcessing}
                                className="cursor-pointer bg-emerald-600 hover:bg-emerald-700 hover:text-white text-white border-none h-8 px-3 py-1.5 shadow-sm shadow-emerald-600/10 flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase"
                                title="Approve Settlement"
                              >
                                {isThisRowProcessing ? (
                                  <Loader2 size={14} className="animate-spin" />
                                ) : (
                                  <>
                                    <Check size={14} />
                                    <span>Approve</span>
                                  </>
                                )}
                              </Button>
                              
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleReview(tx._id, 'REJECT')}
                                disabled={isReviewing || isThisRowProcessing}
                                className="cursor-pointer bg-rose-600 hover:bg-rose-700 hover:text-white text-white border-none h-8 px-3 py-1.5 shadow-sm shadow-rose-600/10 flex items-center gap-1.5 text-xs font-bold tracking-wide uppercase"
                                title="Decline Settlement"
                              >
                                {isThisRowProcessing ? (
                                  <Loader2 size={14} className="animate-spin" />
                                ) : (
                                  <>
                                    <X size={14} />
                                    <span>Reject</span>
                                  </>
                                )}
                              </Button>
                            </div>
                      ) : (
                        <span className="text-xs font-semibold text-muted-foreground/60 select-none cursor-not-allowed italic pr-2">
                          Settled
                        </span>
                      )}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>

          <PaginationLedger
              totalItems={filteredTransactions.length}
              itemsPerPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={setCurrentPage}
            />
        </div>
      </Card>

      {/* Pagination Dashboard Footer Details */}
      <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
        <p>Showing {filteredTransactions.length} of {transactions.length} active ledger vectors</p>
      </div>
    </div>
  )
}
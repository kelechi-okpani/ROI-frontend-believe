'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Wallet, 
  CheckCircle, 
  AlertCircle, 
  Loader2, 
  RefreshCw,
  X,
  PlusCircle,
  MinusCircle,
  Mail,
  UserCheck,
  ArrowUpRight,
  ArrowDownLeft,
  Key
} from 'lucide-react'
import { useAdjustUserWalletMutation, useGetAdminUsersQuery, useUpdateUserSystemProfileMutation } from '@/store/api/admin/adminUserApiSlice'
import { toast } from 'sonner'
import { PaginationLedger } from '@/components/ui/pagination-ledger'

export default function AdminUsers() {
  const { data: users = [], isLoading: isFetching, isError, refetch } = useGetAdminUsersQuery()
  const [updateProfile, { isLoading: isUpdatingProfile }] = useUpdateUserSystemProfileMutation()
  const [adjustWallet, { isLoading: isAdjustingWallet }] = useAdjustUserWalletMutation()

  // Pagination Ledger states
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // Interactivity States
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedUser, setSelectedUser] = useState<any | null>(null)
  
  // Wallet Adjust Form States
  const [walletAmount, setWalletAmount] = useState('')
  const [adjustType, setAdjustType] = useState<'balance' | 'profitBalance' | 'referralBalance' | 'totalInvested'>('balance')
  const [isIncrement, setIsIncrement] = useState(true)
  const [adjustNote, setAdjustNote] = useState('')

  // Filter logic across real backend schema properties
  const filteredUsers = users.filter((user: any) => {
    const fullName = `${user.firstName || ''} ${user.lastName || ''}`.toLowerCase()
    const email = (user.email || '').toLowerCase()
    const search = searchTerm.toLowerCase()
    return fullName.includes(search) || email.includes(search)
  })

  // Exact pagination slice boundaries mapping
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentData = filteredUsers.slice(indexOfFirstItem, indexOfLastItem)

  // Toggle user suspension status lifecycle
  const handleToggleSuspension = async (e: React.MouseEvent, userId: string, currentStatus: boolean) => {
    e.stopPropagation() 
    try {
      await updateProfile({
        id: userId,
        body: { isSuspended: !currentStatus }
      }).unwrap()
      
      toast.success(`Account access status updated successfully`)
      
      if (selectedUser && selectedUser._id === userId) {
        setSelectedUser((prev: any) => ({ ...prev, isSuspended: !currentStatus }))
      }
    } catch (err: any) {
      console.error("Failed to alter access status matrix:", err)
      toast.error(err?.data?.error || "Failed to update profile status")
    }
  }

  // Process administrative balance overrides
  const handleWalletSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedUser || !walletAmount) return

    const baseAmount = Number(walletAmount)
    const finalAmount = isIncrement ? baseAmount : -baseAmount

    try {
      await adjustWallet({
        userId: selectedUser._id,
        amount: finalAmount,
        type: adjustType as any, 
        note: adjustNote.trim() || `Admin manual adjustment allocation override`
      }).unwrap()

      toast.success("Ledger transactional modifications written successfully")

      setWalletAmount('')
      setAdjustNote('')
      setSelectedUser(null)
      refetch() 
    } catch (err: any) {
      console.error("Failed executing transactional matrix recalculation:", err)
      toast.error(err?.data?.error || "Modification adjustment matrix failed")
    }
  }

  return (
    <div className="space-y-6 relative max-w-[1600px] mx-auto p-2">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">User Base Ledger Matrix</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Audit global profiles, modify direct wallet positioning fields, and switch security access clearances.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 font-mono rounded-xl border-border/80" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw size={14} className={`mr-2 ${isFetching ? "animate-spin" : ""}`} /> REFRESH MATRIX
          </Button>
        </div>
      </div>

      {/* Filter / Search Console */}
      <div className="relative w-full">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Filter cryptographic profiles via full name string or secure email channels..."
          className="pl-10 h-11 bg-card border-border/80 rounded-xl font-medium placeholder:text-muted-foreground/60 text-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1) // Reset view index offset on keystroke filtering
          }}
        />
      </div>

      {/* Grid Layout Layout Container */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        
        {/* Users Data Grid Table Card Wrapper */}
        <Card className={`overflow-hidden xl:col-span-8 shadow-sm border border-border/80 rounded-2xl ${isFetching ? 'opacity-60' : ''}`}>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead className="bg-muted/40 border-b border-border text-left">
                <tr>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">User Identity Profile</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Compliance / KYC</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Current Liquidity Balance</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Total Invested</th>
                  <th className="px-5 py-3.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {isError && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-xs font-mono font-bold text-destructive">
                      CRITICAL ERROR: Failed to sync operational index clusters from remote cluster.
                    </td>
                  </tr>
                )}
                
                {!isFetching && currentData.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-12 text-center text-muted-foreground text-xs font-medium">
                      No matching user records available in active directory search buffer.
                    </td>
                  </tr>
                )}

                {currentData.map((user: any) => {
                  const isSuspended = user.isSuspended || false
                  return (
                    <tr 
                      key={user._id} 
                      onClick={() => setSelectedUser(user)} 
                      className={`cursor-pointer hover:bg-muted/[0.15] transition-colors ${isSuspended ? 'bg-red-500/[0.02] opacity-75' : ''} ${selectedUser?._id === user._id ? 'bg-blue-500/[0.03]' : ''}`}
                    >
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-0.5">
                          <div className="font-bold text-sm text-foreground flex items-center gap-1.5 tracking-tight">
                            {user.firstName} {user.lastName}
                            {isSuspended && <Badge className="text-[9px] font-mono bg-red-500/10 text-red-600 border-none px-1 rounded hover:bg-red-500/10">SUSPENDED</Badge>}
                            {user.role === "ADMIN" && <Badge className="text-[9px] font-mono bg-blue-500/10 text-blue-600 border-none px-1 rounded hover:bg-blue-500/10">ADMIN</Badge>}
                          </div>
                          <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                            <Mail size={11} className="text-muted-foreground/60" /> {user.email}
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-md text-[10px] font-bold font-mono tracking-wide border uppercase ${
                          user.kycStatus === 'VERIFIED' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20' :
                          user.kycStatus === 'PENDING' ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' :
                          'bg-zinc-500/10 text-zinc-600 border-zinc-500/20'
                        }`}>
                          {user.kycStatus === 'VERIFIED' ? <CheckCircle size={10} className="fill-emerald-500/10" /> : <AlertCircle size={10} />}
                          {user.kycStatus || 'UNVERIFIED'}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex flex-col gap-0.5 font-mono text-xs">
                          <div className="font-bold text-foreground">Main: ${(user.wallet?.balance ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                          <div className="text-[10px] text-muted-foreground">Profits: ${(user.wallet?.profitBalance ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</div>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-xs font-bold font-mono text-foreground/80">
                        ${(user.wallet?.totalInvested ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </td>
                      <td className="px-5 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1">
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="icon" 
                            className="h-8 w-8 rounded-lg hover:bg-blue-500/10 hover:text-blue-600"
                            onClick={() => setSelectedUser(user)}
                            title="Adjust Ledger Asset Values"
                          >
                            <Wallet size={14} />
                          </Button>
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="icon" 
                            className={`h-8 w-8 rounded-lg ${isSuspended ? 'hover:bg-emerald-500/10 text-emerald-600' : 'hover:bg-red-500/10 text-red-500'}`}
                            onClick={(e) => handleToggleSuspension(e, user._id, isSuspended)} 
                            disabled={isUpdatingProfile}
                            title={isSuspended ? "Re-Authorize User Account" : "Suspend Account Pipeline"}
                          >
                            {isSuspended ? <ShieldCheck size={14} /> : <ShieldAlert size={14} />}
                          </Button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
          <CardContent className="py-3 border-t border-border/60 bg-muted/20">
            <PaginationLedger
               totalItems={filteredUsers.length}
               itemsPerPage={itemsPerPage}
               currentPage={currentPage}
               onPageChange={setCurrentPage}
            />
          </CardContent>
        </Card>

        {/* Dynamic Ledger Adjustment Sheets Drawer Side Component Panel */}
        <div className="xl:col-span-4 w-full">
          {selectedUser ? (
            <Card className="border border-blue-500/20 shadow-md bg-card sticky top-6 rounded-2xl overflow-hidden animate-in slide-in-from-right-4 duration-200">
              <div className="p-4 border-b border-border/60 bg-muted/30 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm tracking-tight text-foreground uppercase">Ledger Audit Panel</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5 truncate max-w-[220px]">Target UUID: {selectedUser._id}</p>
                </div>
                <Button variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => setSelectedUser(null)}>
                  <X size={14} />
                </Button>
              </div>

              {/* Enhanced Complete Ledger Metrics Snapshot View */}
              <div className="p-4 bg-muted/10 border-b border-border/40 grid grid-cols-2 gap-3 font-mono text-center">
                <div className="bg-card p-2 rounded-xl border border-border/40">
                  <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">Main Balance</span>
                  <span className="font-black text-foreground text-xs">${(selectedUser.wallet?.balance ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="bg-card p-2 rounded-xl border border-border/40">
                  <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">Profits Earned</span>
                  <span className="font-black text-foreground text-xs">${(selectedUser.wallet?.profitBalance ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
                <div className="bg-card p-2 rounded-xl border border-border/40">
                  <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">Total Deposited</span>
                  <span className="font-black text-emerald-600 text-xs flex items-center justify-center gap-0.5">
                    <ArrowDownLeft size={10} /> ${(selectedUser.wallet?.totalDeposited ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="bg-card p-2 rounded-xl border border-border/40">
                  <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">Total Withdrawn</span>
                  <span className="font-black text-amber-600 text-xs flex items-center justify-center gap-0.5">
                    <ArrowUpRight size={10} /> ${(selectedUser.wallet?.totalWithdrawn ?? 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="bg-card p-2 rounded-xl border border-border/40 col-span-2">
                  <div className="flex justify-between items-center text-left px-1">
                    <div>
                      <span className="text-muted-foreground block text-[9px] font-bold uppercase tracking-wider">Referrals / Total Invested</span>
                      <span className="text-[11px] text-foreground/80 font-bold">Comm: ${(selectedUser.wallet?.referralBalance ?? 0).toLocaleString()} | Cap: ${(selectedUser.wallet?.totalInvested ?? 0).toLocaleString()}</span>
                    </div>
                    <Badge variant="outline" className="text-[9px] font-mono py-0 px-1.5 h-4 bg-muted border-border/80 text-foreground">{selectedUser.referralCode || 'N/A'}</Badge>
                  </div>
                </div>
              </div>

              {/* Form Actions Panel Layout Section */}
              <form onSubmit={handleWalletSubmit} className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Target Capital Segment</label>
                  <select 
                    value={adjustType} 
                    onChange={(e) => setAdjustType(e.target.value as any)}
                    className="w-full rounded-xl border border-border/80 bg-background px-3 h-10 text-xs font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
                  >
                    <option value="balance">Primary Main Balance</option>
                    <option value="profitBalance">Profit Earnings Balance</option>
                    <option value="referralBalance">Referral Commissions Balance</option>
                    <option value="totalInvested">Total Invested Volume Overrides</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Adjustment Direction</label>
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      type="button" 
                      variant={isIncrement ? 'default' : 'outline'} 
                      onClick={() => setIsIncrement(true)}
                      className={`h-9 text-xs font-bold gap-1 rounded-xl transition-all ${isIncrement ? 'bg-emerald-600 hover:bg-emerald-700 text-white border-transparent shadow-sm' : 'border-border/80 text-foreground'}`}
                    >
                      <PlusCircle size={13} /> Credit Asset
                    </Button>
                    <Button 
                      type="button" 
                      variant={!isIncrement ? 'default' : 'outline'} 
                      onClick={() => setIsIncrement(false)}
                      className={`h-9 text-xs font-bold gap-1 rounded-xl transition-all ${!isIncrement ? 'bg-red-600 hover:bg-red-700 text-white border-transparent shadow-sm' : 'border-border/80 text-foreground'}`}
                    >
                      <MinusCircle size={13} /> Debit Asset
                    </Button>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Transaction Volume Amount ($)</label>
                  <Input 
                    required 
                    type="number" 
                    min="0.01" 
                    step="0.01" 
                    placeholder="0.00" 
                    className="h-10 rounded-xl font-mono text-xs font-bold" 
                    value={walletAmount}
                    onChange={(e) => setWalletAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Internal Audit Subtext Note</label>
                  <Input 
                    placeholder="Provide compliance or update text reason parameters..." 
                    className="h-10 rounded-xl text-xs placeholder:text-muted-foreground/50" 
                    value={adjustNote}
                    onChange={(e) => setAdjustNote(e.target.value)}
                  />
                </div>

                <Button 
                  type="submit" 
                  disabled={isAdjustingWallet} 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 text-xs font-bold tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 mt-2"
                >
                  {isAdjustingWallet ? (
                    <Loader2 className="animate-spin" size={14} />
                  ) : (
                    <>Commit Ledger {isIncrement ? 'Credit' : 'Debit'}</>
                  )}
                </Button>
              </form>
            </Card>
          ) : (
            <Card className="p-6 border border-dashed rounded-2xl border-border/80 text-center hidden xl:flex flex-col items-center justify-center h-72 bg-muted/[0.04]">
              <div className="w-10 h-10 rounded-xl border bg-card flex items-center justify-center mb-2.5 shadow-sm text-muted-foreground/60">
                <Key size={16} />
              </div>
              <h4 className="font-bold text-xs tracking-tight uppercase text-foreground">No Account Inspected</h4>
              <p className="text-[11px] text-muted-foreground mt-1 max-w-[210px] mx-auto leading-normal">Select any specific entity row string or click the wallet actions block to initiate dynamic live mutation metrics overrides.</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
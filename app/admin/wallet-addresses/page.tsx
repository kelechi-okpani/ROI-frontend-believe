'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  Copy, 
  Check, 
  Layers, 
  Wallet, 
  Coins, 
  Activity, 
  ShieldAlert, 
  Loader2, 
  RefreshCw,
  ExternalLink
} from 'lucide-react'
import { toast } from 'sonner'
import { useCreateAdminWalletAddressMutation, useGetAdminWalletAddressesQuery } from '@/store/api/admin/walletAddressApiSlice'




export default function AdminWalletsManager() {
  const { data: wallets = [], isLoading: isFetching, isError, refetch } = useGetAdminWalletAddressesQuery()
  const [createWalletAddress, { isLoading: isCreating }] = useCreateAdminWalletAddressMutation()

  // Form State parameters
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [network, setNetwork] = useState('')
  const [isActive, setIsActive] = useState(true)

  // Copy-to-Clipboard tracking state
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleCopyAddress = (id: string, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    toast.success('Address copied to clipboard ledger')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim() || !address.trim() || !network.trim()) {
      toast.error('Please fulfill all required target protocol fields')
      return
    }

    try {
      await createWalletAddress({
        name: name.trim(),
        address: address.trim(),
        network: network.trim().toUpperCase(),
        isActive
      }).unwrap()

      toast.success('New deposit node deployed successfully to system registry')
      
      // Reset configuration form elements
      setName('')
      setAddress('')
      setNetwork('')
    } catch (err: any) {
      console.error('Failed deploying system endpoint address:', err)
      toast.error(err?.data?.message || err?.data?.error || 'Failed to deploy address node configuration')
    }
  }

  return (
    <div className="space-y-6 max-w-[1400px] mx-auto p-2">
      
      {/* Dashboard Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border/60 pb-5">
        <div>
          <h1 className="text-2xl font-black text-foreground tracking-tight uppercase">
            System Ingress Node Registry
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Configure systemic settlement public gateway values and toggle routing visibility channels.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 font-mono rounded-xl border-border/80" onClick={() => refetch()} disabled={isFetching}>
            <RefreshCw size={13} className={`mr-2 ${isFetching ? 'animate-spin' : ''}`} /> REFRESH METRICS
          </Button>
          <Badge variant="outline" className="font-mono bg-blue-500/10 text-blue-600 border-none px-2.5 py-1 text-xs font-bold rounded-lg">
            SYSTEM CONTROL MODE
          </Badge>
        </div>
      </div>

      {/* Main Split Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: Add New Wallet Panel */}
        <Card className="lg:col-span-6 border border-border/80 rounded-2xl shadow-sm bg-card overflow-hidden">
          <CardHeader className="bg-muted/30 border-b border-border/50">
            <CardTitle className="text-sm font-bold uppercase tracking-wide flex items-center gap-2">
              <Coins size={16} className="text-blue-500" /> Deploy Ingress Settlement Node
            </CardTitle>
            <CardDescription className="text-xs text-muted-foreground">
              Register a new underlying blockchain wallet reference address to accept deposits.
            </CardDescription>
          </CardHeader>
          <CardContent className="p-5">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Unique Identifier Name</label>
                <Input 
                  required 
                  placeholder="e.g., Corporate Bitcoin (BTC) Main" 
                  className="h-10 rounded-xl text-xs bg-background/50"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Target Network Specification</label>
                <Input 
                  required 
                  placeholder="e.g., TRC20, ERC20, NATIVE BITCOIN" 
                  className="h-10 rounded-xl font-mono text-xs uppercase placeholder:lowercase bg-background/50"
                  value={network}
                  onChange={(e) => setNetwork(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Blockchain Public Address Sequence</label>
                <Input 
                  required 
                  placeholder="0x... or Address Hash" 
                  className="h-10 rounded-xl font-mono text-xs bg-background/50"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Registry Visibility Status</label>
                <select 
                  value={isActive ? 'true' : 'false'} 
                  onChange={(e) => setIsActive(e.target.value === 'true')}
                  className="w-full rounded-xl border border-border/80 bg-background/50 px-3 h-10 text-xs font-semibold focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-600"
                >
                  <option value="true">Active & Visible on Client Frontend</option>
                  <option value="false">Hidden / Maintenance Mode</option>
                </select>
              </div>

              <Button 
                type="submit" 
                disabled={isCreating} 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-10 text-xs font-bold tracking-wider uppercase rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5 pt-0.5 mt-2"
              >
                {isCreating ? (
                  <Loader2 className="animate-spin" size={14} />
                ) : (
                  <>Deploy Address Endpoint <Plus size={14} /></>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* RIGHT COLUMN: Active List Interface */}
        <div className="lg:col-span-6 space-y-4">
          
          {isError && (
            <div className="p-4 border border-destructive/20 bg-destructive/5 rounded-xl flex items-center gap-3 text-xs font-mono font-bold text-destructive">
              <ShieldAlert size={16} /> CRITICAL ENGINE ERROR: Failed to fetch payment system address data grids.
            </div>
          )}

          {!isFetching && wallets.length === 0 && (
            <Card className="p-12 border border-dashed border-border/80 text-center rounded-2xl bg-muted/[0.02]">
              <Wallet className="text-muted-foreground/30 mx-auto mb-3" size={36} />
              <h4 className="font-bold text-sm tracking-tight text-foreground uppercase">No Gateway Channels Available</h4>
              <p className="text-xs text-muted-foreground max-w-[280px] mx-auto mt-1 leading-normal">
                There are no blockchain payment interfaces registered yet inside this remote cluster.
              </p>
            </Card>
          )}

          {/* Grid mapping items cleanly */}
          <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
            {wallets.map((wallet) => (
              <Card 
                key={wallet._id} 
                className={`border border-border/80 shadow-sm rounded-xl overflow-hidden transition-all duration-150 hover:border-border/100 ${
                  !wallet.isActive ? 'bg-red-500/[0.01] opacity-75' : 'bg-card'
                }`}
              >
                <div className="p-4 bg-muted/20 border-b border-border/40 flex items-center justify-between">
                  <div className="space-y-0.5">
                    <h3 className="font-bold text-sm text-foreground tracking-tight">{wallet.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1 text-[10px] font-mono font-black tracking-wide text-blue-600 bg-blue-500/10 px-1.5 py-0.5 rounded">
                        <Layers size={10} /> {wallet.network}
                      </span>
                      <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold font-mono tracking-wide px-1.5 py-0.5 rounded ${
                        wallet.isActive ? 'bg-emerald-500/10 text-emerald-600' : 'bg-red-500/10 text-red-600'
                      }`}>
                        <Activity size={9} /> {wallet.isActive ? 'PUBLIC' : 'HIDDEN'}
                      </span>
                    </div>
                  </div>
                  <Wallet size={16} className="text-muted-foreground/40" />
                </div>
                
                <div className="p-4 space-y-3 bg-card">
                  <div className="space-y-1">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground/80 block">Public Target Address</span>
                    <div className="flex items-center gap-1 bg-muted/40 p-2 rounded-xl border border-border/40">
                      <code className="text-xs font-mono font-bold text-foreground/90 break-all select-all flex-1 pr-2 line-clamp-1">
                        {wallet.address}
                       {/* {wallet.address.slice(0, 30)}........{wallet.address.slice(-4)} */}
                      </code>
                      <Button 
                        type="button"
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8 rounded-lg shrink-0 hover:bg-muted text-muted-foreground hover:text-foreground"
                        onClick={() => handleCopyAddress(wallet._id, wallet.address)}
                      >
                        {copiedId === wallet._id ? <Check size={14} className="text-emerald-600" /> : <Copy size={13} />}
                      </Button>
                    </div>
                  </div>

                  <div className="pt-1 flex items-center justify-between text-[10px] text-muted-foreground font-mono">
                    <span>Added: {new Date(wallet.createdAt).toLocaleDateString(undefined, {month: 'short', day: 'numeric'})}</span>
                    <span className="flex items-center gap-0.5 hover:text-foreground cursor-pointer transition-colors">
                      Block Explorer <ExternalLink size={10} />
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
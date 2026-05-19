'use client'

import { useMemo, useState } from 'react'
import { BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useGetAdminStatsQuery } from '@/store/api/admin/adminStatsApiSlice'
import { TrendingUp, Users, DollarSign, ArrowUp, AlertCircle, RefreshCw } from 'lucide-react'

const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444']

export default function AdminDashboard() {
  const { data: serverResponse, isLoading, isError, refetch } = useGetAdminStatsQuery() as any
      
  // Safely extract parts from your structured API design
  const statsSummary = serverResponse?.summary
  const rawData = serverResponse?.rawData

  // 1. Helper function to format numbers gracefully as localized currency figures
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(value)
  }

  // 2. Compute Monthly Time-Series Matrix for Area, Bar, and Line Charts
  const processedChartData = useMemo(() => {
    if (!rawData) return []

    const monthsOrder = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
    const monthlyMap: Record<string, { month: string; revenue: number; users: number; investments: number }> = {}

    // Initialize map using actual document timestamps to avoid rendering empty breaks
    const allItems = [...(rawData.users || []), ...(rawData.transactions || []), ...(rawData.investments || [])]
    allItems.forEach(item => {
      if (!item?.createdAt) return
      const date = new Date(item.createdAt)
      const monthStr = monthsOrder[date.getMonth()]
      
      if (!monthlyMap[monthStr]) {
        monthlyMap[monthStr] = { month: monthStr, revenue: 0, users: 0, investments: 0 }
      }
    })

    // Populate user registration timelines
    rawData.users?.forEach((user:any) => {
      const m = monthsOrder[new Date(user.createdAt).getMonth()]
      if (monthlyMap[m]) monthlyMap[m].users += 1
    })

    // Populate transaction volume (revenue defined as completed deposit streams here)
    rawData.transactions?.forEach((tx:any) => {
      const m = monthsOrder[new Date(tx.createdAt).getMonth()]
      if (monthlyMap[m] && tx.status === 'COMPLETED' && tx.type === 'DEPOSIT') {
        monthlyMap[m].revenue += tx.amount || 0
      }
    })

    // Populate Active Investment aggregates
    rawData.investments?.forEach((inv:any) => {
      const m = monthsOrder[new Date(inv.createdAt).getMonth()]
      if (monthlyMap[m] && inv.status === 'ACTIVE') {
        monthlyMap[m].investments += inv.amount || 1 // Fallback to item count increments if amount doesn't exist
      }
    })

    return Object.values(monthlyMap).sort((a, b) => monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month))
  }, [rawData])

  // 3. Compute Real Distribution Status for the Pie Chart
  const processedPieData = useMemo(() => {
    if (!rawData?.transactions) return []



    
    const statusCounts: Record<string, number> = {}
    rawData.transactions.forEach((tx:any) => {
      const status = tx.status || 'UNKNOWN'
      statusCounts[status] = (statusCounts[status] || 0) + 1
    })

    const totalTx = rawData.transactions.length || 1
    return Object.entries(statusCounts).map(([name, value]) => ({
      name: name.charAt(0) + name.slice(1).toLowerCase(),
      value: Math.round((value / totalTx) * 100)
    }))
  }, [rawData])



  // 4. Map top stats panel items
  const statsConfig = [
    {
      label: 'Total Users',
      value: isLoading ? '...' : statsSummary?.totalUsers?.toLocaleString() || '0',
      change: 'Live Platform',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Total Deposit Volume',
      value: isLoading ? '...' : formatCurrency(statsSummary?.totalDepositVolume || 0),
      change: 'Settled',
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
    },
    {
      label: 'Active Investments',
      value: isLoading ? '...' : statsSummary?.activeInvestments?.toLocaleString() || '0',
      change: 'Running Pool',
      icon: TrendingUp,
      color: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Pending Tasks / Approvals',
      value: isLoading ? '...' : statsSummary?.pendingTasks?.toLocaleString() || '0',
      change: 'Action Required',
      icon: AlertCircle,
      color: 'from-orange-500 to-orange-600',
    },
  ]

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's your platform overview.</p>
        </div>
        <Button variant="outline" size="sm" onClick={() => refetch()} className="w-fit gap-2">
          <RefreshCw size={16} className={`${isLoading ? 'animate-spin' : ''}`} />
          Force Sync
        </Button>
      </div>

      {isError && (
        <Card className="p-4 border-destructive/50 bg-destructive/5 flex items-center gap-3 text-destructive">
          <AlertCircle size={20} />
          <p className="text-sm font-medium">Failed to parse latest engine telemetry. Check database link.</p>
        </Card>
      )}

      {/* Stats Cards Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsConfig.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className="p-4 hover:shadow-lg transition-shadow relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div className={`bg-gradient-to-br ${stat.color} p-3 rounded-lg text-white`}>
                  <Icon size={24} />
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${stat.label.includes('Pending') && statsSummary?.pendingTasks && statsSummary.pendingTasks > 0 ? 'text-amber-600 animate-pulse' : 'text-muted-foreground'}`}>
                  {stat.change}
                </div>
              </div>
              <p className="text-muted-foreground text-sm font-medium mb-1">{stat.label}</p>
              
              {isLoading ? (
                <div className="h-9 w-28 bg-muted animate-pulse rounded mt-1" />
              ) : (
                <p className="text-3xl font-bold text-foreground tracking-tight">{stat.value}</p>
              )}
            </Card>
          )
        })}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="lg:col-span-2 p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground mb-1">Revenue Trend</h2>
            <p className="text-sm text-muted-foreground">Monthly volume metrics matching completed deposits</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {processedChartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">No historical records found</div>
            ) : (
              <AreaChart data={processedChartData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1e40af" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#1e40af" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="opacity-50" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip formatter={(value) => [`$${value}`, 'Revenue']} contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }} />
                <Area type="monotone" dataKey="revenue" stroke="#1e40af" fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            )}
          </ResponsiveContainer>
        </Card>

      
      </div>
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground mb-1">Transaction Status</h2>
            <p className="text-sm text-muted-foreground">Current system-wide allocation breakdown</p>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            {processedPieData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">No transaction data available</div>
            ) : (
              <PieChart>
                <Pie
                  data={processedPieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {processedPieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            )}
          </ResponsiveContainer>
        </Card>

      {/* Additional Growth Profiles Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground mb-1">User Growth</h2>
            <p className="text-sm text-muted-foreground">New accounts registered per month</p>
          </div>
          <ResponsiveContainer width="20%" height={250}>
            {processedChartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">No accounts detected</div>
            ) : (
              <BarChart data={processedChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="opacity-50" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }} />
                <Bar dataKey="users" name="New Registrations" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </Card>

        <Card className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-bold text-foreground mb-1">Active Pools Activity</h2>
            <p className="text-sm text-muted-foreground">Real-time investment velocity indicators</p>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            {processedChartData.length === 0 ? (
              <div className="h-full flex items-center justify-center text-sm text-muted-foreground">No active pools tracking</div>
            ) : (
              <LineChart data={processedChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" className="opacity-50" />
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb' }} />
                <Line type="monotone" dataKey="investments" name="Active Investments" stroke="#10b981" strokeWidth={2} dot={{ fill: '#10b981' }} />
              </LineChart>
            )}
          </ResponsiveContainer>
        </Card>
      </div>

      {/* Control Panel Footer */}
      <Card className="p-6">
        <h2 className="text-xl font-bold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button variant="outline" className="h-12">Manage Users</Button>
          <Button variant="outline" className="h-12">Review Transactions</Button>
          <Button variant="outline" className="h-12">View Reports</Button>
          <Button variant="outline" className="h-12">System Settings</Button>
        </div>
      </Card>
    </div>
  )
}
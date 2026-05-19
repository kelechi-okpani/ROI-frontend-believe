"use client";

import { useState, useMemo } from "react";
import { DashboardHeader } from "@/components/dashboard/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowUpCircle,
  ArrowDownCircle,
  TrendingUp,
  Users,
  RefreshCw,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  Loader2,
  SlidersHorizontal,
} from "lucide-react";
import { format } from "date-fns";
import { useGetTransactionsQuery, useGetWalletQuery } from "@/store/api/transactionApiSlice";
import { PaginationLedger } from "@/components/ui/pagination-ledger";

const getTypeIcon = (type: string = "") => {
  switch (type?.toLowerCase()) {
    case "deposit":
      return <ArrowUpCircle className="w-4 h-4 text-emerald-500" />;
    case "withdrawal":
      return <ArrowDownCircle className="w-4 h-4 text-destructive" />;
    case "profit":
      return <TrendingUp className="w-4 h-4 text-blue-500" />;
    case "referral":
      return <Users className="w-4 h-4 text-primary" />;
    case "adjustment":
      return <SlidersHorizontal className="w-4 h-4 text-amber-500" />;
    default:
      return <RefreshCw className="w-4 h-4 text-muted-foreground" />;
  }
};

const getStatusBadge = (status: string = "") => {
  switch (status?.toLowerCase()) {
    case "completed":
    case "success":
      return (
        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-600 border-emerald-200">
          <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
        </Badge>
      );
    case "pending":
    case "processing":
      return (
        <Badge variant="outline" className="bg-amber-500/10 text-amber-600 border-amber-200">
          <Clock className="w-3 h-3 mr-1" /> Pending
        </Badge>
      );
    case "failed":
      return (
        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
          <XCircle className="w-3 h-3 mr-1" /> Failed
        </Badge>
      );
    default:
      return <Badge variant="secondary" className="capitalize">{status?.toLowerCase() || "Unknown"}</Badge>;
  }
};


export default function TransactionsPage() {
  const { data: walletData, isLoading: walletLoading } = useGetWalletQuery(undefined);
  const { data: transactionsData, isLoading } = useGetTransactionsQuery(undefined);
  const transactions = transactionsData || [];

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 10

  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    if (!transactions) return [];

    return transactions.filter((tx: any) => {
      const txId = tx?._id?.toLowerCase() ?? "";
      const txMethod = tx?.method?.toLowerCase() ?? "";
      const txType = tx?.type?.toLowerCase() ?? "";
      const txStatus = tx?.status?.toLowerCase() ?? "";
      const adminNote = tx?.adminNote?.toLowerCase() ?? "";
      
      const search = searchQuery.toLowerCase();

      const matchesSearch = txId.includes(search) || txMethod.includes(search) || adminNote.includes(search);
      const matchesType = typeFilter === "all" || txType === typeFilter.toLowerCase();
      const matchesStatus = statusFilter === "all" || txStatus === statusFilter.toLowerCase();
      
      return matchesSearch && matchesType && matchesStatus;
    });
  }, [transactions, searchQuery, typeFilter, statusFilter]);


      const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentData = filteredTransactions.slice(indexOfFirstItem, indexOfLastItem)


  const summary = useMemo(() => {
    return {
      totalDeposits: transactions
        .filter((t: any) => {
          const type = t?.type?.toLowerCase();
          const status = t?.status?.toLowerCase();
          return type === "deposit" && (status === "completed" || status === "success");
        })
        .reduce((acc: number, t: any) => acc + (t?.amount || 0), 0),
      totalWithdrawals: transactions
        .filter((t: any) => {
          const type = t?.type?.toLowerCase();
          const status = t?.status?.toLowerCase();
          return type === "withdrawal" && (status === "completed" || status === "success");
        })
        .reduce((acc: number, t: any) => acc + (t?.amount || 0), 0),
      totalProfit: transactions
        .filter((t: any) => t?.type?.toLowerCase() === "profit")
        .reduce((acc: number, t: any) => acc + (t?.amount || 0), 0),
      totalReferral: transactions
        .filter((t: any) => t?.type?.toLowerCase() === "referral")
        .reduce((acc: number, t: any) => acc + (t?.amount || 0), 0),
    };
  }, [transactions]);

  if (isLoading || walletLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] gap-4">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
        <p className="text-muted-foreground text-sm">Loading transaction history...</p>
      </div>
    );
  }

  return (
    <>
      <DashboardHeader
        title="Transactions"
        description="View and manage your complete financial history"
      />

      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Deposits", val: summary.totalDeposits, icon: ArrowUpCircle, color: "text-emerald-500" },
            { label: "Total Withdrawals", val: summary.totalWithdrawals, icon: ArrowDownCircle, color: "text-destructive" },
            { label: "Total Profit", val: summary.totalProfit, icon: TrendingUp, color: "text-blue-500", prefix: "+" },
            { label: "Referral Earnings", val: summary.totalReferral, icon: Users, color: "text-primary" },
          ].map((item, i) => (
            <Card key={i} className="bg-card border-border">
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <item.icon className={`w-5 h-5 ${item.color}`} />
                  <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                    {item.label}
                  </span>
                </div>
                <p className="text-2xl font-bold">
                  {item.prefix}${item.val.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <CardTitle>Transaction History</CardTitle>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search ID, Method, Note..." 
                    className="pl-9 h-9" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-[130px] h-9">
                    <SelectValue placeholder="All Types" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="deposit">Deposits</SelectItem>
                    <SelectItem value="withdrawal">Withdrawals</SelectItem>
                    <SelectItem value="profit">Profits</SelectItem>
                    <SelectItem value="referral">Referrals</SelectItem>
                    <SelectItem value="adjustment">Adjustments</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[130px] h-9">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="failed">Failed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border border-border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/30">
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead className="hidden lg:table-cell">Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentData.length > 0 ? (
                    currentData.map((tx: any) => {
                      const isWithdrawal = tx?.type?.toLowerCase() === "withdrawal";
                      const isAdjustment = tx?.type?.toLowerCase() === "adjustment";
                      
                      return (
                        <TableRow key={tx._id || Math.random().toString()}>
                          <TableCell className="font-mono text-[10px] uppercase text-muted-foreground">
                            {tx?._id?.slice(-8) ?? "N/A"}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {getTypeIcon(tx?.type)}
                              <span className="capitalize text-sm font-medium">
                                {tx?.type?.toLowerCase() || "N/A"}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className={`font-semibold ${isWithdrawal ? "text-destructive" : isAdjustment ? "text-amber-600" : "text-emerald-600"}`}>
                              {isWithdrawal ? "-" : "+"}${tx?.amount?.toLocaleString() ?? "0"}
                            </span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell text-sm text-muted-foreground max-w-[200px] truncate">
                            {tx?.method?.replace("_", " ") || "N/A"}
                            {tx?.adminNote && (
                              <span className="block text-[10px] text-amber-500 truncate" title={tx.adminNote}>
                                {tx.adminNote}
                              </span>
                            )}
                          </TableCell>
                          <TableCell>{getStatusBadge(tx?.status)}</TableCell>
                          <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                            {tx?.createdAt ? format(new Date(tx.createdAt), "MMM dd, yyyy HH:mm") : (tx?.date || "N/A")}
                          </TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" className="h-8">View</Button>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  ) : (
                    <TableRow>
                      <TableCell colSpan={7} className="h-32 text-center text-muted-foreground">
                        No transactions found matching your filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>

                        <PaginationLedger
                            totalItems={filteredTransactions.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                          />
            </div>

            <div className="flex items-center justify-between mt-4">
              <p className="text-xs text-muted-foreground">
                Showing {filteredTransactions.length} of {transactions.length} total entries
              </p>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="h-8" disabled>Previous</Button>
                <Button variant="outline" size="sm" className="h-8" disabled>Next</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
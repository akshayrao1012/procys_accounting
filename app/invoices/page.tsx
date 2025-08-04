"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Send,
  Download,
  Edit,
  ArrowLeft,
  Euro,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  Hash,
  FileText,
  QrCode,
  RefreshCw,
  Lock,
} from "lucide-react"
import Link from "next/link"

// Mock invoice data with VeriFactu compliance
const invoices = [
  {
    id: "INV-2024-156",
    sequentialNumber: 156,
    customer: "Acme Corp S.L.",
    customerNIF: "B12345678",
    amount: 2450.0,
    currency: "EUR",
    status: "paid",
    verifactuStatus: "submitted",
    date: "2024-01-18",
    time: "10:30:15",
    dueDate: "2024-02-17",
    paidDate: "2024-02-15",
    hash: "sha256:a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6",
    aeatSubmissionId: "AEAT-1705574415",
    digitalSignature: "rsa:x1y2z3a4b5c6d7e8f9g0h1i2j3k4l5m6",
    qrCode: "QR:a1b2c3d4e5f6g7h8",
    isImmutable: true,
  },
  {
    id: "INV-2024-155",
    sequentialNumber: 155,
    customer: "Tech Solutions S.A.",
    customerNIF: "A87654321",
    amount: 1890.5,
    currency: "EUR",
    status: "pending",
    verifactuStatus: "submitted",
    date: "2024-01-17",
    time: "14:22:30",
    dueDate: "2024-02-16",
    paidDate: null,
    hash: "sha256:e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0",
    aeatSubmissionId: "AEAT-1705488150",
    digitalSignature: "rsa:n6o7p8q9r0s1t2u3v4w5x6y7z8a9b0c1",
    qrCode: "QR:e5f6g7h8i9j0k1l2",
    isImmutable: true,
  },
  {
    id: "INV-2024-154",
    sequentialNumber: 154,
    customer: "Innovation SpA",
    customerNIF: "C11223344",
    amount: 3200.0,
    currency: "EUR",
    status: "paid",
    verifactuStatus: "failed",
    date: "2024-01-16",
    time: "09:15:45",
    dueDate: "2024-02-15",
    paidDate: "2024-02-14",
    hash: "sha256:i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4",
    aeatSubmissionId: null,
    digitalSignature: "rsa:d2e3f4g5h6i7j8k9l0m1n2o3p4q5r6s7",
    qrCode: "QR:i9j0k1l2m3n4o5p6",
    isImmutable: true,
    aeatError: "Connection timeout to AEAT servers",
  },
  {
    id: "INV-2024-153",
    sequentialNumber: 153,
    customer: "Digital Services B.V.",
    customerNIF: "B55667788",
    amount: 1650.75,
    currency: "EUR",
    status: "overdue",
    verifactuStatus: "submitted",
    date: "2024-01-15",
    time: "16:45:20",
    dueDate: "2024-02-14",
    paidDate: null,
    hash: "sha256:u1v2w3x4y5z6a7b8c9d0e1f2g3h4i5j6",
    aeatSubmissionId: "AEAT-1705315520",
    digitalSignature: "rsa:t8u9v0w1x2y3z4a5b6c7d8e9f0g1h2i3",
    qrCode: "QR:u1v2w3x4y5z6a7b8",
    isImmutable: true,
  },
  {
    id: "INV-2024-152",
    sequentialNumber: 152,
    customer: "Swiss Tech AG",
    customerNIF: "D99887766",
    amount: 4200.0,
    currency: "EUR",
    status: "draft",
    verifactuStatus: "not_submitted",
    date: "2024-01-14",
    time: "11:20:10",
    dueDate: "2024-02-13",
    paidDate: null,
    hash: null,
    aeatSubmissionId: null,
    digitalSignature: null,
    qrCode: null,
    isImmutable: false,
  },
]

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [verifactuFilter, setVerifactuFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      paid: { variant: "default" as const, color: "bg-green-500", label: "Paid" },
      pending: { variant: "secondary" as const, color: "bg-yellow-500", label: "Pending" },
      overdue: { variant: "destructive" as const, color: "bg-red-500", label: "Overdue" },
      draft: { variant: "secondary" as const, color: "bg-gray-500", label: "Draft" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    return (
      <Badge variant={config.variant}>
        <div className={`w-2 h-2 rounded-full ${config.color} mr-1`} />
        {config.label}
      </Badge>
    )
  }

  const getVeriFactuBadge = (status: string) => {
    const statusConfig = {
      submitted: { variant: "default" as const, icon: CheckCircle, label: "Submitted", color: "text-green-600" },
      failed: { variant: "destructive" as const, icon: AlertTriangle, label: "Failed", color: "text-red-600" },
      pending: { variant: "secondary" as const, icon: Clock, label: "Pending", color: "text-yellow-600" },
      not_submitted: { variant: "outline" as const, icon: Send, label: "Not Submitted", color: "text-gray-600" },
    }

    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon

    return (
      <Badge variant={config.variant}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    )
  }

  const filteredInvoices = invoices.filter((invoice) => {
    const matchesSearch =
      invoice.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.customerNIF.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || invoice.status === statusFilter
    const matchesVeriFactu = verifactuFilter === "all" || invoice.verifactuStatus === verifactuFilter
    return matchesSearch && matchesStatus && matchesVeriFactu
  })

  const totalAmount = filteredInvoices.reduce((sum, invoice) => sum + invoice.amount, 0)
  const paidAmount = filteredInvoices
    .filter((inv) => inv.status === "paid")
    .reduce((sum, invoice) => sum + invoice.amount, 0)
  const submittedCount = filteredInvoices.filter((inv) => inv.verifactuStatus === "submitted").length
  const failedCount = filteredInvoices.filter((inv) => inv.verifactuStatus === "failed").length

  const retryAEATSubmission = (invoiceId: string) => {
    console.log(`Retrying AEAT submission for ${invoiceId}`)
    // Would implement actual retry logic
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold">VeriFactu Invoices</h1>
                <p className="text-sm text-gray-600">Manage compliant invoices with immutable records</p>
              </div>
            </div>
            <Button asChild>
              <Link href="/invoices/create">
                <Plus className="w-4 h-4 mr-2" />
                New Invoice
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Euro className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Value</p>
                  <p className="text-lg font-semibold">€{totalAmount.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Euro className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Paid Amount</p>
                  <p className="text-lg font-semibold">€{paidAmount.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">AEAT Submitted</p>
                  <p className="text-lg font-semibold">{submittedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-red-100 rounded-lg">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Failed Submissions</p>
                  <p className="text-lg font-semibold">{failedCount}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Hash className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Immutable Records</p>
                  <p className="text-lg font-semibold">{filteredInvoices.filter((inv) => inv.isImmutable).length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by customer, invoice number, or NIF..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>

              <Select value={verifactuFilter} onValueChange={setVerifactuFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="VeriFactu status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All VeriFactu</SelectItem>
                  <SelectItem value="submitted">Submitted</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="not_submitted">Not Submitted</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="date">Date Created</SelectItem>
                  <SelectItem value="sequential">Sequential Number</SelectItem>
                  <SelectItem value="amount">Amount</SelectItem>
                  <SelectItem value="customer">Customer</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Invoices Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
            <CardDescription>
              {filteredInvoices.length} invoice{filteredInvoices.length !== 1 ? "s" : ""} found • All records are
              immutable and VeriFactu compliant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>VeriFactu</TableHead>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Hash</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <div>
                          <span className="font-mono">{invoice.id}</span>
                          <div className="text-xs text-gray-500">#{invoice.sequentialNumber}</div>
                        </div>
                        {invoice.isImmutable && <Lock className="w-3 h-3 text-green-500" />}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{invoice.customer}</div>
                        <div className="text-xs text-gray-500">{invoice.customerNIF}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">
                        {invoice.currency === "EUR" ? "€" : invoice.currency}
                        {invoice.amount.toFixed(2)}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        {getVeriFactuBadge(invoice.verifactuStatus)}
                        {invoice.aeatSubmissionId && (
                          <div className="text-xs text-gray-500 font-mono">{invoice.aeatSubmissionId}</div>
                        )}
                        {invoice.aeatError && (
                          <div className="text-xs text-red-500" title={invoice.aeatError}>
                            Error: {invoice.aeatError.substring(0, 20)}...
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{new Date(invoice.date).toLocaleDateString()}</div>
                        <div className="text-xs text-gray-500">{invoice.time}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {invoice.hash ? (
                        <div className="font-mono text-xs text-gray-600" title={invoice.hash}>
                          {invoice.hash.substring(7, 23)}...
                        </div>
                      ) : (
                        <span className="text-xs text-gray-400">No hash (draft)</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          {!invoice.isImmutable && (
                            <DropdownMenuItem>
                              <Edit className="w-4 h-4 mr-2" />
                              Edit Draft
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Download className="w-4 h-4 mr-2" />
                            Download PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <FileText className="w-4 h-4 mr-2" />
                            Download FacturaE XML
                          </DropdownMenuItem>
                          {invoice.qrCode && (
                            <DropdownMenuItem>
                              <QrCode className="w-4 h-4 mr-2" />
                              Show QR Code
                            </DropdownMenuItem>
                          )}
                          {invoice.hash && (
                            <DropdownMenuItem>
                              <Hash className="w-4 h-4 mr-2" />
                              Verify Hash
                            </DropdownMenuItem>
                          )}
                          {invoice.verifactuStatus === "failed" && (
                            <DropdownMenuItem onClick={() => retryAEATSubmission(invoice.id)}>
                              <RefreshCw className="w-4 h-4 mr-2" />
                              Retry AEAT Submission
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

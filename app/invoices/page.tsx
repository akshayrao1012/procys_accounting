"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, Eye, Download, MoreHorizontal, FileText, Euro, Calendar, ArrowRight, Shield, QrCode, Send, Hash, Lock, RefreshCw, AlertTriangle, CheckCircle } from 'lucide-react'
import Link from "next/link"
import QRCodePopup from "@/components/qr-code-popup"
import { generatePdf } from "@/lib/pdf-generator"
import { generateFacturaEXML } from "@/lib/verifactu-core"

// Mock data for invoices
const mockInvoices = [
  {
    id: "INV-2024-001",
    clientName: "Acme Corp S.L.",
    clientNIF: "B12345678",
    amount: 1250.00,
    status: "paid",
    date: "2024-07-15",
    dueDate: "2024-08-14",
    verifactuStatus: "submitted",
    verifactuHash: "sha256:a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
    verifactuQR: "QR:a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6",
    aeatSubmissionId: "AEAT-1705574415",
  },
  {
    id: "INV-2024-002",
    clientName: "Tech Solutions S.A.",
    clientNIF: "A87654321",
    amount: 890.50,
    status: "pending",
    date: "2024-07-10",
    dueDate: "2024-08-09",
    verifactuStatus: "pending",
    verifactuHash: "sha256:b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3",
    verifactuQR: "QR:b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7",
    aeatSubmissionId: null,
  },
  {
    id: "INV-2024-003",
    clientName: "Innovation SpA",
    clientNIF: "C11223344",
    amount: 2100.00,
    status: "overdue",
    date: "2024-06-20",
    dueDate: "2024-07-20",
    verifactuStatus: "failed",
    verifactuHash: "sha256:c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4",
    verifactuQR: "QR:c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6a7b8",
    aeatSubmissionId: null,
  },
  {
    id: "INV-2024-004",
    clientName: "Global Corp",
    clientNIF: "D55667788",
    amount: 500.00,
    status: "draft",
    date: "2024-07-18",
    dueDate: "2024-08-17",
    verifactuStatus: "not_submitted",
    verifactuHash: null,
    verifactuQR: null,
    aeatSubmissionId: null,
  },
]

const getStatusBadge = (status: string) => {
  const statusConfig = {
    paid: { variant: "default" as const, color: "bg-green-500", label: "Paid" },
    pending: { variant: "secondary" as const, color: "bg-yellow-500", label: "Pending" },
    overdue: { variant: "destructive" as const, color: "bg-red-500", label: "Overdue" },
    draft: { variant: "outline" as const, color: "bg-gray-500", label: "Draft" },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft
  return (
    <Badge variant={config.variant} className="capitalize">
      <div className={`w-2 h-2 rounded-full ${config.color} mr-2`} />
      {config.label}
    </Badge>
  )
}

const getVeriFactuBadge = (status: string) => {
  const statusConfig = {
    submitted: { variant: "default" as const, icon: CheckCircle, label: "Submitted" },
    failed: { variant: "destructive" as const, icon: AlertTriangle, label: "Failed" },
    pending: { variant: "secondary" as const, icon: RefreshCw, label: "Pending" },
    not_submitted: { variant: "outline" as const, icon: Send, label: "Not Submitted" },
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

export default function InvoicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showQrCodePopup, setShowQrCodePopup] = useState(false)
  const [currentQrCodeData, setCurrentQrCodeData] = useState<string | null>(null)
  const [isLoadingPdf, setIsLoadingPdf] = useState(false)
  const [isLoadingXml, setIsLoadingXml] = useState(false)

  const filteredInvoices = mockInvoices.filter((invoice) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      invoice.clientNIF.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || invoice.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleViewPdf = async (invoice: typeof mockInvoices[0]) => {
    setIsLoadingPdf(true)
    try {
      // Mock invoice data for PDF generation (should be fetched from backend in real app)
      const invoiceData = {
        invoiceNumber: invoice.id,
        invoiceDate: invoice.date,
        dueDate: invoice.dueDate,
        client: {
          name: invoice.clientName,
          nif: invoice.clientNIF,
          address: "Client Address Mock",
          email: "client@example.com",
        },
        items: [
          { description: "Service A", quantity: 1, unitPrice: invoice.amount / 1.21, taxRate: 21 }, // Simplified
        ],
        notes: "Thank you for your business!",
        paymentMethod: "Bank Transfer",
        subtotal: invoice.amount / 1.21,
        totalTax: invoice.amount - (invoice.amount / 1.21),
        totalAmount: invoice.amount,
        verifactuHash: invoice.verifactuHash,
        verifactuQR: invoice.verifactuQR,
      }
      const pdfBlob = await generatePdf(invoiceData)
      const pdfUrl = URL.createObjectURL(pdfBlob)
      window.open(pdfUrl, "_blank")
    } catch (error) {
      console.error("Failed to generate PDF:", error)
      alert("Failed to generate PDF. Please try again.")
    } finally {
      setIsLoadingPdf(false)
    }
  }

  const handleDownloadFacturaE = async (invoice: typeof mockInvoices[0]) => {
    setIsLoadingXml(true)
    try {
      if (!invoice.verifactuHash || !invoice.verifactuQR) {
        alert("This invoice does not have complete VeriFactu data for FacturaE generation.")
        setIsLoadingXml(false)
        return
      }

      // Mock invoice data for FacturaE generation (should be fetched from backend in real app)
      const invoiceData = {
        invoiceNumber: invoice.id,
        invoiceDate: invoice.date,
        dueDate: invoice.dueDate,
        client: {
          name: invoice.clientName,
          nif: invoice.clientNIF,
          address: "Client Address Mock",
          city: "Client City Mock",
          postalCode: "Client Postal Code Mock",
          country: "ES",
        },
        items: [
          { description: "Service A", quantity: 1, unitPrice: invoice.amount / 1.21, taxRate: 21 }, // Simplified
        ],
        totalAmount: invoice.amount,
        company: {
          name: "Your Company Name", // Replace with actual company data
          vatId: "ES12345678Z",
          address: "Your Company Address",
          city: "Your City",
          postalCode: "Your Postal Code",
          country: "ES",
        },
      }

      const facturaEXML = await generateFacturaEXML(invoiceData)
      const blob = new Blob([facturaEXML], { type: "application/xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `FacturaE-${invoice.id}.xml`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Failed to generate FacturaE XML:", error)
      alert("Failed to generate FacturaE XML. Please try again.")
    } finally {
      setIsLoadingXml(false)
    }
  }

  const handleShowQrCode = (qrData: string) => {
    setCurrentQrCodeData(qrData)
    setShowQrCodePopup(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard">
                  <ArrowRight className="w-4 h-4 mr-2 rotate-180" />
                  Back to Dashboard
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Invoices</h1>
                <p className="text-sm text-gray-600">Manage your sales invoices</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button asChild>
                <Link href="/invoices/create">
                  <Plus className="w-4 h-4 mr-2" />
                  New Invoice
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Invoice List</CardTitle>
            <CardDescription>Overview of all your generated invoices.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search invoices by ID or client..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Status: {filterStatus === "all" ? "All" : filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>All</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("paid")}>Paid</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>Pending</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("overdue")}>Overdue</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("draft")}>Draft</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice ID</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>VeriFactu</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>
                      <p className="font-medium">{invoice.clientName}</p>
                      <p className="text-sm text-gray-500">{invoice.clientNIF}</p>
                    </TableCell>
                    <TableCell>€{invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell>{invoice.date}</TableCell>
                    <TableCell>{invoice.dueDate}</TableCell>
                    <TableCell>
                      {invoice.verifactuStatus ? (
                        getVeriFactuBadge(invoice.verifactuStatus)
                      ) : (
                        <Badge variant="outline">N/A</Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewPdf(invoice)} disabled={isLoadingPdf}>
                            <Eye className="w-4 h-4 mr-2" />
                            {isLoadingPdf ? "Loading PDF..." : "View PDF"}
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleDownloadFacturaE(invoice)} disabled={isLoadingXml || !invoice.verifactuHash}>
                            <Download className="w-4 h-4 mr-2" />
                            {isLoadingXml ? "Generating XML..." : "Download FacturaE XML"}
                          </DropdownMenuItem>
                          {invoice.verifactuQR && (
                            <DropdownMenuItem onClick={() => handleShowQrCode(invoice.verifactuQR!)}>
                              <QrCode className="w-4 h-4 mr-2" />
                              View QR Code
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuItem>
                            <Send className="w-4 h-4 mr-2" />
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Euro className="w-4 h-4 mr-2" />
                            Mark as Paid
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </main>
      {currentQrCodeData && (
        <QRCodePopup qrCodeData={currentQrCodeData} isOpen={showQrCodePopup} onClose={() => setShowQrCodePopup(false)} />
      )}
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Plus, Trash2, Search, CheckCircle, AlertTriangle, Eye, Send, Save, Calculator, Shield, Hash, Lock, FileText, Download, QrCode, Clock, AlertCircle } from 'lucide-react'
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Switch } from "@/components/ui/switch"

interface InvoiceItem {
  id: string
  description: string
  quantity: number
  unitPrice: number
  vatRate: number
  vatAmount: number
  totalAmount: number
}

interface Customer {
  id: string
  name: string
  nif: string
  address: string
  city: string
  postalCode: string
  country: string
  email: string
}

const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Acme Corp S.L.",
    nif: "B12345678",
    address: "Calle Mayor 123",
    city: "Madrid",
    postalCode: "28001",
    country: "ES",
    email: "facturacion@acme.es",
  },
  {
    id: "2",
    name: "Tech Solutions S.A.",
    nif: "A87654321",
    address: "Passeig de Gràcia 456",
    city: "Barcelona",
    postalCode: "08007",
    country: "ES",
    email: "contabilidad@techsolutions.es",
  },
]

export default function CreateInvoicePage() {
  const router = useRouter()
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [showVeriFactuData, setShowVeriFactuData] = useState(false)
  const [verifactuData, setVerifactuData] = useState<any>(null)
  const [createAsVerifactu, setCreateAsVerifactu] = useState(true)

  // Get next sequential number (would come from backend)
  const [nextSequentialNumber] = useState(157)
  const currentDate = new Date()
  const currentTime = currentDate.toTimeString().split(" ")[0]

  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-2024-${nextSequentialNumber.toString().padStart(3, "0")}`,
    issueDate: currentDate.toISOString().split("T")[0],
    issueTime: currentTime,
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    currency: "EUR" as const,
    notes: "",
    paymentTerms: "30",
    tags: [] as string[],
  })

  const [items, setItems] = useState<InvoiceItem[]>([
    {
      id: "1",
      description: "Servicios de desarrollo web",
      quantity: 40,
      unitPrice: 75.0,
      vatRate: 21,
      vatAmount: 630.0,
      totalAmount: 3630.0,
    },
  ])

  const [companyData] = useState({
    nif: "B98765432",
    name: "Mi Empresa S.L.",
    address: "Calle Empresa 789",
    city: "Madrid",
    postalCode: "28002",
    country: "ES",
  })

  const processingSteps = [
    "Validating invoice data",
    "Generating sequential number",
    "Creating cryptographic hash",
    "Generating digital signature",
    "Creating FacturaE XML",
    "Generating QR code",
    "Logging immutable audit entry",
    "Submitting to AEAT VeriFactu",
  ]

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: "",
      quantity: 1,
      unitPrice: 0,
      vatRate: 21,
      vatAmount: 0,
      totalAmount: 0,
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          const updated = { ...item, [field]: value }
          if (field === "quantity" || field === "unitPrice" || field === "vatRate") {
            const subtotal = updated.quantity * updated.unitPrice
            updated.vatAmount = (subtotal * updated.vatRate) / 100
            updated.totalAmount = subtotal + updated.vatAmount
          }
          return updated
        }
        return item
      }),
    )
  }

  const calculateTotals = () => {
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
    const totalVAT = items.reduce((sum, item) => sum + item.vatAmount, 0)
    const totalAmount = subtotal + totalVAT

    return { subtotal, totalVAT, totalAmount }
  }

  const { subtotal, totalVAT, totalAmount } = calculateTotals()

  const validateInvoice = () => {
    const errors = []
    if (!selectedCustomer) errors.push("Customer must be selected")
    if (!invoiceData.invoiceNumber) errors.push("Invoice number is required")
    if (items.length === 0) errors.push("At least one line item is required")
    if (items.some((item) => !item.description || item.quantity <= 0 || item.unitPrice <= 0)) {
      errors.push("All line items must have description, quantity > 0, and unit price > 0")
    }
    return errors
  }

  const createVeriFactuInvoice = async () => {
    const validationErrors = validateInvoice()
    if (validationErrors.length > 0) {
      alert("Please fix validation errors:\n" + validationErrors.join("\n"))
      return
    }

    setIsProcessing(true)
    setProcessingStep(0)

    try {
      // Step 1: Validate invoice data
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProcessingStep(1)

      // Step 2: Generate sequential number (already done)
      await new Promise((resolve) => setTimeout(resolve, 300))
      setProcessingStep(2)

      // Step 3: Create cryptographic hash
      await new Promise((resolve) => setTimeout(resolve, 800))
      const hash = `sha256:${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`
      setProcessingStep(3)

      // Step 4: Generate digital signature
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const signature = `rsa:${Math.random().toString(36).substring(2, 20)}${Math.random().toString(36).substring(2, 20)}`
      setProcessingStep(4)

      // Step 5: Create FacturaE XML
      await new Promise((resolve) => setTimeout(resolve, 600))
      const xmlData = generateFacturaEXML()
      setProcessingStep(5)

      // Step 6: Generate QR code
      await new Promise((resolve) => setTimeout(resolve, 400))
      const qrCode = `QR:${hash.substring(7, 23)}`
      setProcessingStep(6)

      // Step 7: Log audit entry
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProcessingStep(7)

      // Step 8: Submit to AEAT
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create VeriFactu data
      const mockVerifactuData = {
        id: invoiceData.invoiceNumber,
        sequentialNumber: nextSequentialNumber,
        fiscalYear: new Date().getFullYear(),
        timestamp: new Date().toISOString(),
        previousHash: "sha256:prev123456789abcdef",
        hash,
        digitalSignature: signature,
        xmlData,
        qrCode,
        aeatSubmissionStatus: Math.random() > 0.2 ? "submitted" : "failed",
        aeatSubmissionId: `AEAT-${Date.now()}`,
        aeatSubmissionTimestamp: new Date().toISOString(),
        isImmutable: true,
        certificateId: "CERT-2024-001",
      }

      setVerifactuData(mockVerifactuData)
      setShowVeriFactuData(true)
    } catch (error) {
      console.error("VeriFactu processing failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const handleFinalizeStandardInvoice = async () => {
    const validationErrors = validateInvoice()
    if (validationErrors.length > 0) {
      alert("Please fix validation errors:\n" + validationErrors.join("\n"))
      return
    }

    // Simulate invoice creation process
    setIsProcessing(true)
    setProcessingStep(0)

    try {
      // Simulate validation
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProcessingStep(1)

      // Simulate generating invoice data
      await new Promise((resolve) => setTimeout(resolve, 800))
      setProcessingStep(2)

      // Simulate saving to database
      await new Promise((resolve) => setTimeout(resolve, 1000))
      setProcessingStep(3)

      // Simulate generating PDF
      await new Promise((resolve) => setTimeout(resolve, 600))
      setProcessingStep(4)

      // Simulate sending email
      await new Promise((resolve) => setTimeout(resolve, 400))
      setProcessingStep(5)

      // Finalize
      await new Promise((resolve) => setTimeout(resolve, 2000))

      alert("Standard invoice created successfully!")
      router.push("/invoices")
    } catch (error) {
      console.error("Standard invoice creation failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const generateFacturaEXML = () => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<fe:Facturae xmlns:fe="http://www.facturae.gob.es/formato/Versiones/Facturaev3_2_2.xml">
<FileHeader>
  <SchemaVersion>3.2.2</SchemaVersion>
  <Modality>I</Modality>
  <InvoiceIssuerType>EM</InvoiceIssuerType>
</FileHeader>
<Parties>
  <SellerParty>
    <TaxIdentification>
      <PersonTypeCode>J</PersonTypeCode>
      <ResidenceTypeCode>R</ResidenceTypeCode>
      <TaxIdentificationNumber>${companyData.nif}</TaxIdentificationNumber>
    </TaxIdentification>
    <LegalEntity>
      <CorporateName>${companyData.name}</CorporateName>
      <AddressInSpain>
        <Address>${companyData.address}</Address>
        <PostCode>${companyData.postalCode}</PostCode>
        <Town>${companyData.city}</Town>
        <CountryCode>${companyData.country}</CountryCode>
      </AddressInSpain>
    </LegalEntity>
  </SellerParty>
  <BuyerParty>
    <TaxIdentification>
      <PersonTypeCode>J</PersonTypeCode>
      <ResidenceTypeCode>R</ResidenceTypeCode>
      <TaxIdentificationNumber>${selectedCustomer?.nif || "N/A"}</TaxIdentificationNumber>
    </TaxIdentification>
    <LegalEntity>
      <CorporateName>${selectedCustomer?.name || "Cliente"}</CorporateName>
      <AddressInSpain>
        <Address>${selectedCustomer?.address || ""}</Address>
        <PostCode>${selectedCustomer?.postalCode || ""}</PostCode>
        <Town>${selectedCustomer?.city || ""}</Town>
        <CountryCode>${selectedCustomer?.country || "ES"}</CountryCode>
      </AddressInSpain>
    </LegalEntity>
  </BuyerParty>
</Parties>
<Invoices>
  <Invoice>
    <InvoiceHeader>
      <InvoiceNumber>${invoiceData.invoiceNumber}</InvoiceNumber>
      <InvoiceDocumentType>FC</InvoiceDocumentType>
      <InvoiceClass>OO</InvoiceClass>
    </InvoiceHeader>
    <InvoiceIssueData>
      <IssueDate>${invoiceData.issueDate}</IssueDate>
      <InvoiceCurrencyCode>${invoiceData.currency}</InvoiceCurrencyCode>
      <LanguageName>es</LanguageName>
    </InvoiceIssueData>
    <InvoiceTotals>
      <TotalGrossAmount>${subtotal.toFixed(2)}</TotalGrossAmount>
      <TotalTaxOutputs>${totalVAT.toFixed(2)}</TotalTaxOutputs>
      <InvoiceTotal>${totalAmount.toFixed(2)}</InvoiceTotal>
    </InvoiceTotals>
  </Invoice>
</Invoices>
</fe:Facturae>`
  }

  const handleSave = () => {
    // Save as draft
    router.push("/invoices")
  }

  const handlePreview = () => {
    // Open preview modal
    console.log("Preview invoice")
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
                <h1 className="text-xl font-semibold">
                  Create {createAsVerifactu ? "VeriFactu" : "Standard"} Invoice
                </h1>
                <p className="text-sm text-gray-600">
                  Invoice #{invoiceData.invoiceNumber} • Sequential: {nextSequentialNumber}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleSave}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button variant="outline" onClick={handlePreview}>
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
              <Button
                onClick={createAsVerifactu ? createVeriFactuInvoice : handleFinalizeStandardInvoice}
                disabled={isProcessing}
              >
                <Send className="w-4 h-4 mr-2" />
                {isProcessing ? "Processing..." : "Create & Submit"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Processing Status */}
        {isProcessing && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-blue-500 animate-spin" />
                <span>Creating {createAsVerifactu ? "VeriFactu-Compliant" : "Standard"} Invoice</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>
                    Processing step {processingStep + 1} of {processingSteps.length}
                  </span>
                  <span>{Math.round(((processingStep + 1) / processingSteps.length) * 100)}%</span>
                </div>
                <Progress value={((processingStep + 1) / processingSteps.length) * 100} />
                <p className="text-sm text-gray-600">{processingSteps[processingStep]}</p>
              </div>
            </CardContent>
          </Card>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Seller Information (Read-only) */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5" />
                  <span>Seller Information (Immutable)</span>
                </CardTitle>
                <CardDescription>Company information as registered with AEAT</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Company Name</Label>
                    <Input value={companyData.name} readOnly className="bg-gray-50" />
                  </div>
                  <div className="space-y-2">
                    <Label>NIF</Label>
                    <Input value={companyData.nif} readOnly className="bg-gray-50" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Fiscal Address</Label>
                  <Input
                    value={`${companyData.address}, ${companyData.postalCode} ${companyData.city}`}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Customer Selection */}
            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>Select or add a customer for this invoice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Select
                    onValueChange={(value) => {
                      const customer = mockCustomers.find((c) => c.id === value)
                      setSelectedCustomer(customer || null)
                    }}
                  >
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Search customers by name or NIF..." />
                    </SelectTrigger>
                    <SelectContent>
                      {mockCustomers.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          <div className="flex items-center justify-between w-full">
                            <span>{customer.name}</span>
                            <Badge variant="outline" className="ml-2">
                              {customer.nif}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Button variant="outline">
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                {selectedCustomer && (
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">{selectedCustomer.name}</p>
                        <p className="text-gray-600">{selectedCustomer.address}</p>
                        <p className="text-gray-600">
                          {selectedCustomer.postalCode} {selectedCustomer.city}
                        </p>
                      </div>
                      <div>
                        <p>
                          <span className="font-medium">NIF:</span> {selectedCustomer.nif}
                        </p>
                        <p>
                          <span className="font-medium">Email:</span> {selectedCustomer.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Invoice Details */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
                <CardDescription>Sequential numbering and timestamps (immutable once created)</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Input
                      id="invoiceNumber"
                      value={invoiceData.invoiceNumber}
                      readOnly
                      className="bg-gray-50 font-mono"
                    />
                    <p className="text-xs text-gray-600">Auto-generated sequential number</p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issueDate">Issue Date</Label>
                    <Input
                      id="issueDate"
                      type="date"
                      value={invoiceData.issueDate}
                      onChange={(e) => setInvoiceData({ ...invoiceData, issueDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="issueTime">Issue Time</Label>
                    <Input
                      id="issueTime"
                      type="time"
                      value={invoiceData.issueTime}
                      onChange={(e) => setInvoiceData({ ...invoiceData, issueTime: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dueDate">Due Date</Label>
                    <Input
                      id="dueDate"
                      type="date"
                      value={invoiceData.dueDate}
                      onChange={(e) => setInvoiceData({ ...invoiceData, dueDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={invoiceData.currency} disabled>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="EUR">EUR - Euro (Required by Spanish law)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Line Items */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Line Items</CardTitle>
                    <CardDescription>Products or services with VAT breakdown</CardDescription>
                  </div>
                  <Button onClick={addItem} size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Item
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Description</TableHead>
                      <TableHead className="w-[100px]">Qty</TableHead>
                      <TableHead className="w-[120px]">Unit Price</TableHead>
                      <TableHead className="w-[100px]">VAT %</TableHead>
                      <TableHead className="w-[120px]">VAT Amount</TableHead>
                      <TableHead className="w-[120px]">Total</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {items.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <Input
                            value={item.description}
                            onChange={(e) => updateItem(item.id, "description", e.target.value)}
                            placeholder="Item description"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.quantity}
                            onChange={(e) => updateItem(item.id, "quantity", Number.parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.01"
                          />
                        </TableCell>
                        <TableCell>
                          <Input
                            type="number"
                            value={item.unitPrice}
                            onChange={(e) => updateItem(item.id, "unitPrice", Number.parseFloat(e.target.value) || 0)}
                            min="0"
                            step="0.01"
                          />
                        </TableCell>
                        <TableCell>
                          <Select
                            value={item.vatRate.toString()}
                            onValueChange={(value) => updateItem(item.id, "vatRate", Number.parseInt(value))}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="0">0% (Exempt)</SelectItem>
                              <SelectItem value="4">4% (Reduced)</SelectItem>
                              <SelectItem value="10">10% (Reduced)</SelectItem>
                              <SelectItem value="21">21% (General)</SelectItem>
                            </SelectContent>
                          </Select>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">€{item.vatAmount.toFixed(2)}</span>
                        </TableCell>
                        <TableCell>
                          <span className="font-medium">€{item.totalAmount.toFixed(2)}</span>
                        </TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            disabled={items.length === 1}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Separator className="my-4" />

                {/* Totals */}
                <div className="flex justify-end">
                  <div className="w-64 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Total VAT:</span>
                      <span>€{totalVAT.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total Amount:</span>
                      <span>€{totalAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Additional Information */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    value={invoiceData.notes}
                    onChange={(e) => setInvoiceData({ ...invoiceData, notes: e.target.value })}
                    placeholder="Add any additional notes or payment instructions..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select
                    value={invoiceData.paymentTerms}
                    onValueChange={(value) => setInvoiceData({ ...invoiceData, paymentTerms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Due immediately</SelectItem>
                      <SelectItem value="15">Net 15 days</SelectItem>
                      <SelectItem value="30">Net 30 days</SelectItem>
                      <SelectItem value="60">Net 60 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* VeriFactu Compliance Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="w-5 h-5 text-green-500" />
                  <span>VeriFactu Compliance</span>
                </CardTitle>
                <CardDescription>Spanish tax authority compliance features</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Create as VeriFactu compliant</span>
                  <Switch id="verifactu" checked={createAsVerifactu} onCheckedChange={setCreateAsVerifactu} />
                </div>
                {createAsVerifactu && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Sequential Numbering</span>
                      <Badge variant="default">
                        <CheckCircle className="w-3 h-3 mr-1" />#{nextSequentialNumber}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Immutable Storage</span>
                      <Badge variant="default">
                        <Lock className="w-3 h-3 mr-1" />
                        Ready
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Digital Signature</span>
                      <Badge variant="default">
                        <Hash className="w-3 h-3 mr-1" />
                        RSA-2048
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">AEAT Submission</span>
                      <Badge variant="secondary">
                        <Clock className="w-3 h-3 mr-1" />
                        Pending
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">FacturaE Format</span>
                      <Badge variant="default">
                        <FileText className="w-3 h-3 mr-1" />
                        v3.2.2
                      </Badge>
                    </div>
                  </div>
                )}

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    Once created, this invoice will be immutable and automatically submitted to AEAT for VeriFactu
                    compliance.
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>

            {/* Invoice Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calculator className="w-5 h-5" />
                  <span>Invoice Summary</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Line Items:</span>
                    <span>{items.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total VAT:</span>
                    <span>€{totalVAT.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium">
                    <span>Total Amount:</span>
                    <span>€{totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Validation Status */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span>Validation Status</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {validateInvoice().length === 0 ? (
                    <div className="text-sm text-green-600">
                      <p className="font-medium">✓ Invoice is valid</p>
                      <p>Ready for VeriFactu processing</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {validateInvoice().map((error, index) => (
                        <div key={index} className="text-sm text-red-600 flex items-start space-x-2">
                          <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                          <span>{error}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* VeriFactu Data Display Dialog */}
        <Dialog open={showVeriFactuData} onOpenChange={setShowVeriFactuData}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-green-500" />
                <span>VeriFactu Invoice Created Successfully</span>
              </DialogTitle>
              <DialogDescription>
                Invoice has been created with full VeriFactu compliance and submitted to AEAT
              </DialogDescription>
            </DialogHeader>

            {verifactuData && (
              <div className="space-y-6">
                {/* Compliance Status */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <div>
                      <p className="text-sm font-medium">Immutable Record</p>
                      <p className="text-xs text-gray-600">Protected</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Hash className="w-4 h-4 text-blue-500" />
                    <div>
                      <p className="text-sm font-medium">Digital Signature</p>
                      <p className="text-xs text-gray-600">Verified</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-purple-500" />
                    <div>
                      <p className="text-sm font-medium">Sequential #</p>
                      <p className="text-xs text-gray-600">{verifactuData.sequentialNumber}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <QrCode className="w-4 h-4 text-orange-500" />
                    <div>
                      <p className="text-sm font-medium">QR Code</p>
                      <p className="text-xs text-gray-600">Generated</p>
                    </div>
                  </div>
                </div>

                {/* Technical Details */}
                <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium">Invoice Hash:</p>
                      <p className="font-mono text-xs text-gray-600 break-all">{verifactuData.hash}</p>
                    </div>
                    <div>
                      <p className="font-medium">Previous Hash:</p>
                      <p className="font-mono text-xs text-gray-600 break-all">{verifactuData.previousHash}</p>
                    </div>
                    <div>
                      <p className="font-medium">Timestamp:</p>
                      <p className="text-xs text-gray-600">{new Date(verifactuData.timestamp).toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="font-medium">Certificate ID:</p>
                      <p className="font-mono text-xs text-gray-600">{verifactuData.certificateId}</p>
                    </div>
                  </div>
                </div>

                {/* AEAT Submission Status */}
                <div className="space-y-3">
                  <h4 className="font-medium">AEAT Submission Status</h4>
                  <div className="flex items-center space-x-2">
                    {verifactuData.aeatSubmissionStatus === "submitted" ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Successfully submitted to AEAT</span>
                        <Badge variant="default">ID: {verifactuData.aeatSubmissionId}</Badge>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-4 h-4 text-red-500" />
                        <span className="text-sm">AEAT submission failed</span>
                        <Badge variant="destructive">Error</Badge>
                      </>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    View PDF
                  </Button>
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download FacturaE XML
                  </Button>
                  <Button variant="outline">
                    <QrCode className="w-4 h-4 mr-2" />
                    Show QR Code
                  </Button>
                  <Button variant="outline">
                    <FileText className="w-4 h-4 mr-2" />
                    Audit Trail
                  </Button>
                  <Button onClick={() => router.push("/invoices")}>
                    <CheckCircle className="w-4 h-4 mr-2" />
                    Complete
                  </Button>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  )
}

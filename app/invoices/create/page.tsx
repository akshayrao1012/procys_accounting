"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Plus, Minus, CalendarIcon, FileText, Euro, Percent, Hash, Info, Shield, QrCode, Download, Eye, X } from 'lucide-react'
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { generateVerifactuInvoice, generateFacturaEXML } from "@/lib/verifactu-core"
import { generatePdf } from "@/lib/pdf-generator"
import QRCodePopup from "@/components/qr-code-popup"

// Mock data for clients
const mockClients = [
  { id: "1", name: "Acme Corp S.L.", nif: "B12345678", address: "Calle Mayor 123, Madrid", email: "acme@example.com" },
  { id: "2", name: "Tech Solutions S.A.", nif: "A87654321", address: "Passeig de Gràcia 456, Barcelona", email: "tech@example.com" },
  { id: "3", name: "Global Innovations GmbH", nif: "DE987654321", address: "Berliner Str. 1, Berlin", email: "global@example.com" },
]

// Mock data for products/services
const mockProducts = [
  { id: "p1", name: "Consulting Services", price: 120.00, unit: "hour" },
  { id: "p2", name: "Software Development", price: 800.00, unit: "project" },
  { id: "p3", name: "Monthly Subscription", price: 50.00, unit: "month" },
  { id: "p4", name: "Hardware Installation", price: 350.00, unit: "unit" },
]

// Mock settings for compliance (these would come from user settings)
const mockComplianceSettings = {
  verifactuEnabled: true, // This would be fetched from user settings
  aeatSubmissionEnabled: true, // This would be fetched from user settings
  developerTaxId: "B12345678",
  developerName: "Procys Technologies S.L.",
  softwareVersion: "1.0.0",
  certificateNumber: "CERT12345",
}

export default function CreateInvoicePage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const clientIdFromUrl = searchParams.get("clientId")

  const [invoiceDate, setInvoiceDate] = useState<Date | undefined>(new Date())
  const [dueDate, setDueDate] = useState<Date | undefined>(() => {
    const d = new Date()
    d.setDate(d.getDate() + 30)
    return d
  })
  const [selectedClient, setSelectedClient] = useState<typeof mockClients[0] | null>(null)
  const [invoiceItems, setInvoiceItems] = useState([
    { id: 1, description: "", quantity: 1, unitPrice: 0, taxRate: 21 },
  ])
  const [notes, setNotes] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer")
  const [invoiceNumber, setInvoiceNumber] = useState("INV-2024-001") // Mock invoice number
  const [isVerifactuInvoice, setIsVerifactuInvoice] = useState(mockComplianceSettings.verifactuEnabled)
  const [isAEATSubmissionEnabled, setIsAEATSubmissionEnabled] = useState(mockComplianceSettings.aeatSubmissionEnabled)
  const [verifactuHash, setVerifactuHash] = useState<string | null>(null)
  const [verifactuQR, setVerifactuQR] = useState<string | null>(null)
  const [showQrCodePopup, setShowQrCodePopup] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (clientIdFromUrl) {
      const client = mockClients.find((c) => c.id === clientIdFromUrl)
      if (client) {
        setSelectedClient(client)
      }
    }
  }, [clientIdFromUrl])

  const addItem = () => {
    setInvoiceItems([...invoiceItems, { id: invoiceItems.length + 1, description: "", quantity: 1, unitPrice: 0, taxRate: 21 }])
  }

  const removeItem = (id: number) => {
    setInvoiceItems(invoiceItems.filter((item) => item.id !== id))
  }

  const updateItem = (id: number, field: string, value: any) => {
    setInvoiceItems(
      invoiceItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)),
    )
  }

  const subtotal = invoiceItems.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0)
  const totalTax = invoiceItems.reduce(
    (sum, item) => sum + item.quantity * item.unitPrice * (item.taxRate / 100),
    0,
  )
  const totalAmount = subtotal + totalTax

  const handleGenerateInvoice = async () => {
    setError(null)
    setIsLoading(true)
    setVerifactuHash(null)
    setVerifactuQR(null)

    if (!selectedClient || !invoiceDate || !dueDate || invoiceItems.length === 0) {
      setError("Please fill in all required fields (Client, Dates, and at least one item).")
      setIsLoading(false)
      return
    }

    try {
      let finalInvoiceData: any = {
        invoiceNumber,
        invoiceDate: format(invoiceDate, "yyyy-MM-dd"),
        dueDate: format(dueDate, "yyyy-MM-dd"),
        client: selectedClient,
        items: invoiceItems,
        notes,
        paymentMethod,
        subtotal,
        totalTax,
        totalAmount,
      }

      if (isVerifactuInvoice) {
        // Simulate VeriFactu compliance generation
        const verifactuOutput = await generateVerifactuInvoice({
          invoiceData: finalInvoiceData,
          complianceSettings: mockComplianceSettings,
        })
        finalInvoiceData = { ...finalInvoiceData, ...verifactuOutput }
        setVerifactuHash(verifactuOutput.verifactuHash)
        setVerifactuQR(verifactuOutput.verifactuQR)
      }

      // Simulate saving invoice to database
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Invoice Generated:", finalInvoiceData)

      // Generate PDF
      const pdfBlob = await generatePdf(finalInvoiceData)
      const pdfUrl = URL.createObjectURL(pdfBlob)
      window.open(pdfUrl, "_blank")

      setIsLoading(false)
      router.push("/invoices") // Redirect to invoices list
    } catch (err: any) {
      setError(`Failed to generate invoice: ${err.message || "Unknown error"}`)
      setIsLoading(false)
    }
  }

  const handleGenerateFacturaE = async () => {
    setError(null)
    setIsLoading(true)
    if (!selectedClient || !invoiceDate || !dueDate || invoiceItems.length === 0) {
      setError("Please fill in all required fields (Client, Dates, and at least one item).")
      setIsLoading(false)
      return
    }

    try {
      const facturaEXML = await generateFacturaEXML({
        invoiceNumber,
        invoiceDate: format(invoiceDate, "yyyy-MM-dd"),
        dueDate: format(dueDate, "yyyy-MM-dd"),
        client: selectedClient,
        items: invoiceItems,
        totalAmount,
        company: {
          name: "Your Company Name", // Replace with actual company data
          vatId: "ES12345678Z",
          address: "Your Company Address",
          city: "Your City",
          postalCode: "Your Postal Code",
          country: "ES",
        },
      })

      const blob = new Blob([facturaEXML], { type: "application/xml" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `FacturaE-${invoiceNumber}.xml`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
      setIsLoading(false)
    } catch (err: any) {
      setError(`Failed to generate FacturaE XML: ${err.message || "Unknown error"}`)
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/invoices">
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Create New Invoice</h1>
                <p className="text-sm text-gray-600">Generate a new invoice for your clients</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={handleGenerateInvoice} disabled={isLoading}>
                <FileText className="w-4 h-4 mr-2" />
                {isLoading ? "Generating..." : "Generate Invoice"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
              <CardDescription>Basic information about the invoice</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoiceNumber">Invoice Number</Label>
                <Input id="invoiceNumber" value={invoiceNumber} onChange={(e) => setInvoiceNumber(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="client">Client</Label>
                <Select
                  value={selectedClient?.id || ""}
                  onValueChange={(value) => setSelectedClient(mockClients.find((c) => c.id === value) || null)}
                >
                  <SelectTrigger id="client">
                    <SelectValue placeholder="Select a client" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockClients.map((client) => (
                      <SelectItem key={client.id} value={client.id}>
                        {client.name} ({client.nif})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceDate">Invoice Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !invoiceDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {invoiceDate ? format(invoiceDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={invoiceDate} onSelect={setInvoiceDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !dueDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {dueDate ? format(dueDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Items</CardTitle>
              <CardDescription>Add products or services to your invoice</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-[100px]">Qty</TableHead>
                    <TableHead className="w-[120px]">Unit Price</TableHead>
                    <TableHead className="w-[80px]">Tax (%)</TableHead>
                    <TableHead className="w-[120px] text-right">Amount</TableHead>
                    <TableHead className="w-[50px]"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoiceItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <Input
                          value={item.description}
                          onChange={(e) => updateItem(item.id, "description", e.target.value)}
                          placeholder="Item description"
                        />
                        <Select
                          onValueChange={(value) => {
                            const product = mockProducts.find((p) => p.id === value)
                            if (product) {
                              updateItem(item.id, "description", product.name)
                              updateItem(item.id, "unitPrice", product.price)
                            }
                          }}
                        >
                          <SelectTrigger className="mt-2">
                            <SelectValue placeholder="Select a product/service" />
                          </SelectTrigger>
                          <SelectContent>
                            {mockProducts.map((product) => (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name} (€{product.price}/{product.unit})
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, "quantity", parseFloat(e.target.value))}
                          min="1"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value))}
                          min="0"
                          step="0.01"
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.taxRate}
                          onChange={(e) => updateItem(item.id, "taxRate", parseFloat(e.target.value))}
                          min="0"
                          max="100"
                        />
                      </TableCell>
                      <TableCell className="text-right">
                        €{(item.quantity * item.unitPrice * (1 + item.taxRate / 100)).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                          <Minus className="w-4 h-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <Button variant="outline" className="mt-4 w-full" onClick={addItem}>
                <Plus className="w-4 h-4 mr-2" />
                Add Item
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
              <CardDescription>Notes and payment method</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea
                  id="notes"
                  placeholder="Any additional notes for the client..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                  <SelectTrigger id="paymentMethod">
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    <SelectItem value="credit_card">Credit Card</SelectItem>
                    <SelectItem value="paypal">PayPal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium">€{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-medium">€{totalTax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>Total Amount</span>
                <span>€{totalAmount.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Compliance Options</CardTitle>
              <CardDescription>
                Enable VeriFactu compliance for this invoice if required by regulations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verifactuCompliance"
                  checked={isVerifactuInvoice}
                  onCheckedChange={(checked) => setIsVerifactuInvoice(checked as boolean)}
                />
                <Label htmlFor="verifactuCompliance">
                  <div className="flex items-center space-x-1">
                    <Shield className="w-4 h-4 text-blue-600" />
                    <span>Enable VeriFactu Compliance</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Digitally sign and ensure immutability (required by RD 1007/2023)
                  </p>
                </Label>
              </div>
              {isVerifactuInvoice && (
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="aeatSubmission"
                    checked={isAEATSubmissionEnabled}
                    onCheckedChange={(checked) => setIsAEATSubmissionEnabled(checked as boolean)}
                  />
                  <Label htmlFor="aeatSubmission">
                    <div className="flex items-center space-x-1">
                      <Send className="w-4 h-4 text-green-600" />
                      <span>Submit to AEAT (SII)</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      Real-time submission to Spanish Tax Agency (requires certificate)
                    </p>
                  </Label>
                </div>
              )}
            </CardContent>
          </Card>

          {verifactuHash && verifactuQR && isVerifactuInvoice && (
            <Card>
              <CardHeader>
                <CardTitle>VeriFactu Details</CardTitle>
                <CardDescription>Compliance information for the generated invoice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-gray-600" />
                  <Label>VeriFactu Hash:</Label>
                  <span className="font-mono text-sm break-all">{verifactuHash}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <QrCode className="w-4 h-4 text-gray-600" />
                  <Label>QR Code Data:</Label>
                  <span className="font-mono text-sm break-all">{verifactuQR}</span>
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" className="w-full" onClick={() => setShowQrCodePopup(true)}>
                    <Eye className="w-4 h-4 mr-2" />
                    View QR Code
                  </Button>
                  <Button variant="outline" className="w-full" onClick={handleGenerateFacturaE} disabled={isLoading}>
                    <Download className="w-4 h-4 mr-2" />
                    Download FacturaE XML
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      {verifactuQR && (
        <QRCodePopup qrCodeData={verifactuQR} isOpen={showQrCodePopup} onClose={() => setShowQrCodePopup(false)} />
      )}
    </div>
  )
}

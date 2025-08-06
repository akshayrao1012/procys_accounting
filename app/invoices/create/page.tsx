"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Plus, X, Save, CheckCircle, ArrowLeft } from 'lucide-react'
import Link from "next/link"
import { VerifactuInvoiceForm } from "@/components/verifactu-invoice-form"

// Mock data for clients and products
const mockClients = [
  { id: "1", name: "Acme Corp S.L.", nif: "B12345678" },
  { id: "2", name: "Tech Solutions S.A.", nif: "A87654321" },
  { id: "3", name: "Innovation SpA", nif: "C98765432" },
]

const mockProducts = [
  { id: "1", name: "Consulting Services", unitPrice: 100 },
  { id: "2", name: "Software Development", unitPrice: 150 },
  { id: "3", name: "Maintenance Contract", unitPrice: 50 },
]

export default function CreateInvoicePage() {
  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: `INV-${Math.floor(Math.random() * 10000)}`,
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    client: '',
    clientNIF: '',
    clientAddress: '',
    clientCity: '',
    clientPostalCode: '',
    clientCountry: '',
    companyName: 'Procys Technologies S.L.', // Mock company name
    companyVatId: 'B12345678', // Mock company VAT ID
    items: [{ description: '', quantity: 1, unitPrice: 0, vatRate: 21 }],
    notes: '',
    subtotal: 0,
    vatAmount: 0,
    total: 0,
  })

  // For demonstration, assume Verifactu is enabled by default.
  // In a real app, this would come from user settings (e.g., from a context or API call).
  const [verifactuEnabled, setVerifactuEnabled] = useState(true)
  const [invoiceCreated, setInvoiceCreated] = useState(false)
  const [verifactuComplianceData, setVerifactuComplianceData] = useState<any>(null)

  const calculateTotals = () => {
    let newSubtotal = 0
    let newVatAmount = 0
    invoiceDetails.items.forEach(item => {
      const itemTotal = item.quantity * item.unitPrice
      newSubtotal += itemTotal
      newVatAmount += itemTotal * (item.vatRate / 100)
    })
    setInvoiceDetails(prev => ({
      ...prev,
      subtotal: newSubtotal,
      vatAmount: newVatAmount,
      total: newSubtotal + newVatAmount,
    }))
  }

  useState(() => {
    calculateTotals()
  }, [invoiceDetails.items])

  const handleAddItem = () => {
    setInvoiceDetails(prev => ({
      ...prev,
      items: [...prev.items, { description: '', quantity: 1, unitPrice: 0, vatRate: 21 }],
    }))
  }

  const handleRemoveItem = (index: number) => {
    setInvoiceDetails(prev => {
      const newItems = prev.items.filter((_, i) => i !== index)
      return { ...prev, items: newItems }
    })
  }

  const handleItemChange = (index: number, field: string, value: any) => {
    setInvoiceDetails(prev => {
      const newItems = [...prev.items]
      newItems[index] = { ...newItems[index], [field]: value }
      return { ...prev, items: newItems }
    })
  }

  const handleClientChange = (clientId: string) => {
    const selectedClient = mockClients.find(client => client.id === clientId)
    if (selectedClient) {
      setInvoiceDetails(prev => ({
        ...prev,
        client: selectedClient.name,
        clientNIF: selectedClient.nif,
        // Mock address details for selected client
        clientAddress: 'Calle Falsa 123',
        clientCity: 'Sevilla',
        clientPostalCode: '41001',
        clientCountry: 'ES',
      }))
    }
  }

  const handleInvoiceCreated = (verifactuData: any) => {
    setVerifactuComplianceData(verifactuData)
    setInvoiceCreated(true)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/invoices">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Invoices
                </Link>
              </Button>
              <div>
                <h1 className="text-xl font-semibold">Create New Invoice</h1>
                <p className="text-sm text-gray-600">Generate a new invoice for your clients</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => setVerifactuEnabled(!verifactuEnabled)} variant="outline">
                {verifactuEnabled ? 'Disable Verifactu' : 'Enable Verifactu'}
              </Button>
              <Button onClick={() => setInvoiceCreated(false)}>
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {!invoiceCreated ? (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
                <CardDescription>Basic information for your invoice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Input id="invoiceNumber" value={invoiceDetails.invoiceNumber} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, invoiceNumber: e.target.value })} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" value={invoiceDetails.date} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, date: e.target.value })} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input id="dueDate" type="date" value={invoiceDetails.dueDate} onChange={(e) => setInvoiceDetails({ ...invoiceDetails, dueDate: e.target.value })} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Client Information</CardTitle>
                <CardDescription>Select an existing client or enter new details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client">Select Client</Label>
                  <Select onValueChange={handleClientChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a client" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockClients.map(client => (
                        <SelectItem key={client.id} value={client.id}>{client.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {invoiceDetails.client && (
                  <div className="space-y-2">
                    <Label>Selected Client Details</Label>
                    <div className="p-3 border rounded-md bg-gray-50 text-sm">
                      <p className="font-medium">{invoiceDetails.client}</p>
                      <p>NIF: {invoiceDetails.clientNIF}</p>
                      <p>{invoiceDetails.clientAddress}, {invoiceDetails.clientCity}</p>
                      <p>{invoiceDetails.clientPostalCode}, {invoiceDetails.clientCountry}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoice Items</CardTitle>
                <CardDescription>Add products or services to your invoice</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {invoiceDetails.items.map((item, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-6 gap-4 items-end border-b pb-4 last:border-b-0">
                    <div className="md:col-span-2 space-y-2">
                      <Label htmlFor={`description-${index}`}>Description</Label>
                      <Input
                        id={`description-${index}`}
                        value={item.description}
                        onChange={(e) => handleItemChange(index, 'description', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`quantity-${index}`}>Quantity</Label>
                      <Input
                        id={`quantity-${index}`}
                        type="number"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, 'quantity', parseInt(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`unitPrice-${index}`}>Unit Price</Label>
                      <Input
                        id={`unitPrice-${index}`}
                        type="number"
                        value={item.unitPrice}
                        onChange={(e) => handleItemChange(index, 'unitPrice', parseFloat(e.target.value))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`vatRate-${index}`}>VAT (%)</Label>
                      <Select
                        value={item.vatRate.toString()}
                        onValueChange={(value) => handleItemChange(index, 'vatRate', parseFloat(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0">0%</SelectItem>
                          <SelectItem value="7">7%</SelectItem>
                          <SelectItem value="19">19%</SelectItem>
                          <SelectItem value="21">21%</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex items-center justify-end">
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveItem(index)}>
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" onClick={handleAddItem}>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Item
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Totals</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal:</span>
                  <span className="font-medium">€{invoiceDetails.subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">VAT Amount:</span>
                  <span className="font-medium">€{invoiceDetails.vatAmount.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span>€{invoiceDetails.total.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Additional Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  placeholder="Add any additional notes or terms here..."
                  value={invoiceDetails.notes}
                  onChange={(e) => setInvoiceDetails({ ...invoiceDetails, notes: e.target.value })}
                />
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button onClick={() => handleInvoiceCreated(null)}>
                <CheckCircle className="w-4 h-4 mr-2" />
                Create Invoice
              </Button>
            </div>
          </>
        ) : (
          <VerifactuInvoiceForm
            invoiceData={invoiceDetails}
            onInvoiceCreated={setVerifactuComplianceData}
            verifactuEnabled={verifactuEnabled}
          />
        )}
      </div>
    </div>
  )
}

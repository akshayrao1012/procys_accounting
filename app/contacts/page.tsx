"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Search, Filter, Eye, Edit, Trash2, MoreHorizontal, FileText, Mail, Phone, MapPin, ArrowRight } from 'lucide-react'
import Link from "next/link"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Mock data for clients (contacts)
const mockClients = [
  {
    id: "1",
    name: "Acme Corp S.L.",
    nif: "B12345678",
    email: "admin@acmecorp.es",
    phone: "+34 91 123 4567",
    address: "Calle Mayor 123, 28001 Madrid, Spain",
    status: "active",
    invoiceCount: 12,
    totalRevenue: 29400,
    lastInvoice: "2024-01-18",
    paymentTerms: "30 days",
    notes: "Key client, always pays on time.",
  },
  {
    id: "2",
    name: "Tech Solutions S.A.",
    nif: "A87654321",
    email: "billing@techsolutions.es",
    phone: "+34 93 987 6543",
    address: "Passeig de Gràcia 456, 08007 Barcelona, Spain",
    status: "active",
    invoiceCount: 8,
    totalRevenue: 15120,
    lastInvoice: "2024-01-17",
    paymentTerms: "45 days",
    notes: "Requires detailed reports.",
  },
  {
    id: "3",
    name: "Innovation SpA",
    nif: "C11223344",
    email: "contact@innovation.it",
    phone: "+39 02 1234 5678",
    address: "Via Roma 1, 20121 Milano, Italy",
    status: "inactive",
    invoiceCount: 3,
    totalRevenue: 5000,
    lastInvoice: "2023-11-01",
    paymentTerms: "60 days",
    notes: "Slow payer, follow up regularly.",
  },
]

const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: { variant: "default" as const, color: "bg-green-500", label: "Active" },
    inactive: { variant: "secondary" as const, color: "bg-gray-500", label: "Inactive" },
  }

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.inactive
  return (
    <Badge variant={config.variant} className="capitalize">
      <div className={`w-2 h-2 rounded-full ${config.color} mr-2`} />
      {config.label}
    </Badge>
  )
}

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showClientModal, setShowClientModal] = useState(false)
  const [editingClient, setEditingClient] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [clientForm, setClientForm] = useState({
    name: "",
    nif: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
    paymentTerms: "30",
    notes: "",
  })

  const resetClientForm = () => {
    setClientForm({
      name: "",
      nif: "",
      email: "",
      phone: "",
      address: "",
      status: "active",
      paymentTerms: "30",
      notes: "",
    })
  }

  const handleSaveClient = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Saving client:", clientForm)
    setIsLoading(false)
    setShowClientModal(false)
    setEditingClient(null)
    resetClientForm()
  }

  const handleEditClient = (client: any) => {
    setEditingClient(client)
    setClientForm({
      name: client.name,
      nif: client.nif,
      email: client.email,
      phone: client.phone,
      address: client.address,
      status: client.status,
      paymentTerms: client.paymentTerms.split(" ")[0],
      notes: client.notes,
    })
    setShowClientModal(true)
  }

  const handleCreateInvoice = (client: any) => {
    // Navigate to invoice creation with pre-selected client
    window.location.href = `/invoices/create?clientId=${client.id}`
  }

  const filteredClients = mockClients.filter((client) => {
    const matchesSearch =
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.nif.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === "all" || client.status === filterStatus
    return matchesSearch && matchesStatus
  })

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
                <h1 className="text-xl font-semibold">Contacts</h1>
                <p className="text-sm text-gray-600">Manage your client and vendor contacts</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => setShowClientModal(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add New Contact
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>Contact List</CardTitle>
            <CardDescription>Overview of all your contacts.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search contacts by name, NIF, or email..."
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
                  <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("inactive")}>Inactive</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Contact Name</TableHead>
                  <TableHead>Contact Info</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Total Billed</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">
                      {client.name}
                      <p className="text-sm text-gray-500">{client.nif}</p>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Mail className="w-3 h-3 text-gray-500" />
                        <span className="text-sm">{client.email}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-gray-500" />
                        <span className="text-sm">{client.phone}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3 text-gray-500" />
                        <span className="text-sm">{client.address}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell>€{client.totalRevenue.toLocaleString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleEditClient(client)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleCreateInvoice(client)}>
                            <FileText className="w-4 h-4 mr-2" />
                            Create Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
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

      <Dialog open={showClientModal} onOpenChange={setShowClientModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingClient ? "Edit Contact" : "Add New Contact"}</DialogTitle>
            <DialogDescription>
              {editingClient ? "Update contact information" : "Enter contact details to add them to your database"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Company/Contact Name *</Label>
                <Input
                  id="name"
                  value={clientForm.name}
                  onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                  placeholder="Acme Corp S.L."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nif">NIF/CIF</Label>
                <Input
                  id="nif"
                  value={clientForm.nif}
                  onChange={(e) => setClientForm({ ...clientForm, nif: e.target.value })}
                  placeholder="B12345678"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={clientForm.email}
                  onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })}
                  placeholder="contact@acme.es"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={clientForm.phone}
                  onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })}
                  placeholder="+34 91 123 4567"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={clientForm.address}
                onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })}
                placeholder="Calle Mayor 123, 28001 Madrid, Spain"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select
                  value={clientForm.status}
                  onValueChange={(value) => setClientForm({ ...clientForm, status: value })}
                >
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="paymentTerms">Default Payment Terms (days)</Label>
                <Select
                  value={clientForm.paymentTerms}
                  onValueChange={(value) => setClientForm({ ...clientForm, paymentTerms: value })}
                >
                  <SelectTrigger id="paymentTerms">
                    <SelectValue placeholder="Select terms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="15">15 days</SelectItem>
                    <SelectItem value="30">30 days</SelectItem>
                    <SelectItem value="45">45 days</SelectItem>
                    <SelectItem value="60">60 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                value={clientForm.notes}
                onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })}
                placeholder="Additional notes about this client..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => {
                  setShowClientModal(false)
                  setEditingClient(null)
                  resetClientForm()
                }}
              >
                Cancel
              </Button>
              <Button onClick={handleSaveClient} disabled={isLoading}>
                {isLoading ? "Saving..." : editingClient ? "Update Contact" : "Save Contact"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

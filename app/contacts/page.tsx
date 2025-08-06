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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import {
  Plus,
  Search,
  MoreHorizontal,
  Eye,
  Edit,
  ArrowLeft,
  Users,
  Building,
  Mail,
  Phone,
  MapPin,
  Upload,
  Download,
} from "lucide-react"
import Link from "next/link"

// Mock contacts data
const contacts = [
  {
    id: "1",
    name: "Acme Corp GmbH",
    type: "company",
    vatId: "DE123456789",
    email: "billing@acme.de",
    phone: "+49 30 12345678",
    address: "Hauptstraße 123",
    city: "Berlin",
    postalCode: "10115",
    country: "DE",
    peppol: "0088:7300010000001",
    invoiceCount: 15,
    totalAmount: 45600.0,
    lastInvoice: "2024-01-15",
  },
  {
    id: "2",
    name: "Tech Solutions SAS",
    type: "company",
    vatId: "FR987654321",
    email: "comptabilite@techsolutions.fr",
    phone: "+33 1 23456789",
    address: "Rue de la Paix 45",
    city: "Paris",
    postalCode: "75001",
    country: "FR",
    peppol: "0009:12345678901",
    invoiceCount: 8,
    totalAmount: 23400.0,
    lastInvoice: "2024-01-16",
  },
  {
    id: "3",
    name: "Innovation SpA",
    type: "company",
    vatId: "IT11223344556",
    email: "fatturazione@innovation.it",
    phone: "+39 02 87654321",
    address: "Via Roma 100",
    city: "Milano",
    postalCode: "20121",
    country: "IT",
    peppol: "0211:IT11223344556",
    invoiceCount: 12,
    totalAmount: 38200.0,
    lastInvoice: "2024-01-17",
  },
  {
    id: "4",
    name: "Digital Services BV",
    type: "company",
    vatId: "NL123456789B01",
    email: "finance@digitalservices.nl",
    phone: "+31 20 1234567",
    address: "Keizersgracht 123",
    city: "Amsterdam",
    postalCode: "1015 CJ",
    country: "NL",
    peppol: "0106:NL123456789B01",
    invoiceCount: 6,
    totalAmount: 19800.0,
    lastInvoice: "2024-01-10",
  },
  {
    id: "5",
    name: "John Smith Consulting",
    type: "individual",
    vatId: "CH-123.456.789",
    email: "john@smithconsulting.ch",
    phone: "+41 44 1234567",
    address: "Bahnhofstrasse 50",
    city: "Zürich",
    postalCode: "8001",
    country: "CH",
    peppol: null,
    invoiceCount: 3,
    totalAmount: 12600.0,
    lastInvoice: "2024-01-12",
  },
]

export default function ContactsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [typeFilter, setTypeFilter] = useState("all")
  const [countryFilter, setCountryFilter] = useState("all")
  const [isAddContactOpen, setIsAddContactOpen] = useState(false)

  const getCountryFlag = (country: string) => {
    const flags = {
      DE: "🇩🇪",
      FR: "🇫🇷",
      IT: "🇮🇹",
      NL: "🇳🇱",
      ES: "🇪🇸",
      CH: "🇨🇭",
    }
    return flags[country as keyof typeof flags] || "🌍"
  }

  const getTypeBadge = (type: string) => {
    return type === "company" ? (
      <Badge variant="default">
        <Building className="w-3 h-3 mr-1" />
        Company
      </Badge>
    ) : (
      <Badge variant="secondary">
        <Users className="w-3 h-3 mr-1" />
        Individual
      </Badge>
    )
  }

  const filteredContacts = contacts.filter((contact) => {
    const matchesSearch =
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.vatId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = typeFilter === "all" || contact.type === typeFilter
    const matchesCountry = countryFilter === "all" || contact.country === countryFilter
    return matchesSearch && matchesType && matchesCountry
  })

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
                <h1 className="text-xl font-semibold">Contacts</h1>
                <p className="text-sm text-gray-600">Manage your customers and suppliers</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Import
              </Button>
              <Dialog open={isAddContactOpen} onOpenChange={setIsAddContactOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Contact
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>Add New Contact</DialogTitle>
                    <DialogDescription>Create a new customer or supplier contact</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="contactName">Company/Name *</Label>
                      <Input id="contactName" placeholder="Acme Corporation" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactType">Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="company">Company</SelectItem>
                          <SelectItem value="individual">Individual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="vatId">VAT ID *</Label>
                      <Input id="vatId" placeholder="DE123456789" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country *</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="DE">Germany</SelectItem>
                          <SelectItem value="FR">France</SelectItem>
                          <SelectItem value="IT">Italy</SelectItem>
                          <SelectItem value="ES">Spain</SelectItem>
                          <SelectItem value="NL">Netherlands</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input id="email" type="email" placeholder="billing@company.com" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="+49 30 12345678" />
                    </div>
                    <div className="space-y-2 col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Street address" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Berlin" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postalCode">Postal Code</Label>
                      <Input id="postalCode" placeholder="10115" />
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" onClick={() => setIsAddContactOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={() => setIsAddContactOpen(false)}>Add Contact</Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Users className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Contacts</p>
                  <p className="text-lg font-semibold">{contacts.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Building className="w-4 h-4 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Companies</p>
                  <p className="text-lg font-semibold">{contacts.filter((c) => c.type === "company").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Users className="w-4 h-4 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Individuals</p>
                  <p className="text-lg font-semibold">{contacts.filter((c) => c.type === "individual").length}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <MapPin className="w-4 h-4 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Countries</p>
                  <p className="text-lg font-semibold">{new Set(contacts.map((c) => c.country)).size}</p>
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
                  placeholder="Search contacts by name, VAT ID, or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="company">Companies</SelectItem>
                  <SelectItem value="individual">Individuals</SelectItem>
                </SelectContent>
              </Select>

              <Select value={countryFilter} onValueChange={setCountryFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by country" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Countries</SelectItem>
                  <SelectItem value="DE">Germany</SelectItem>
                  <SelectItem value="FR">France</SelectItem>
                  <SelectItem value="IT">Italy</SelectItem>
                  <SelectItem value="NL">Netherlands</SelectItem>
                  <SelectItem value="CH">Switzerland</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Contacts Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Contacts</CardTitle>
            <CardDescription>
              {filteredContacts.length} contact{filteredContacts.length !== 1 ? "s" : ""} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>VAT ID</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Invoices</TableHead>
                  <TableHead>Total Amount</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredContacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center space-x-2">
                        <span>{contact.name}</span>
                        {contact.peppol && (
                          <Badge variant="outline" className="text-xs">
                            Peppol
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(contact.type)}</TableCell>
                    <TableCell className="font-mono text-sm">{contact.vatId}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span>{getCountryFlag(contact.country)}</span>
                        <span>{contact.country}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1 text-sm">
                          <Mail className="w-3 h-3 text-gray-400" />
                          <span>{contact.email}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-600">
                          <Phone className="w-3 h-3 text-gray-400" />
                          <span>{contact.phone}</span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">{contact.invoiceCount}</span>
                    </TableCell>
                    <TableCell>
                      <span className="font-medium">€{contact.totalAmount.toLocaleString()}</span>
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
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit Contact
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Plus className="w-4 h-4 mr-2" />
                            Create Invoice
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
      </div>
    </div>
  )
}

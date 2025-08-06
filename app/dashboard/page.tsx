"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Users, Euro, TrendingUp, FileText, Eye, Settings, Search, Filter, Edit, Trash2, UserPlus, BarChart3, PieChart, Calendar, CheckCircle } from 'lucide-react'
import Link from "next/link"
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

// Mock data
const mockClients = [
  {
    id: "1",
    name: "Acme Corp S.L.",
    nif: "B12345678",
    email: "admin@acmecorp.es",
    phone: "+34 91 123 4567",
    address: "Calle Mayor 123, 28001 Madrid",
    status: "active",
    invoiceCount: 12,
    totalRevenue: 29400,
    lastInvoice: "2024-07-18",
    paymentTerms: "30 days",
  },
  {
    id: "2",
    name: "Tech Solutions S.A.",
    nif: "A87654321",
    email: "billing@techsolutions.es",
    phone: "+34 93 987 6543",
    address: "Passeig de Gràcia 456, 08007 Barcelona",
    status: "active",
    invoiceCount: 8,
    totalRevenue: 15120,
    lastInvoice: "2024-07-17",
    paymentTerms: "45 days",
  },
]

const mockUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@company.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-07-18T10:30:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@company.com",
    role: "User",
    status: "active",
    lastLogin: "2024-07-18T09:15:00Z",
    createdAt: "2024-01-05T00:00:00Z",
  },
]

const dashboardData = {
  overview: {
    totalInvoices: 156,
    monthlyInvoices: 23,
    totalRevenue: 139800,
    monthlyRevenue: 18450,
    totalClients: 45,
    activeClients: 32,
    paymentRate: 91.2,
  },
  recentInvoices: [
    {
      id: "INV-2024-156",
      client: "Acme Corp S.L.",
      amount: 2450.0,
      status: "paid",
      date: "2024-07-18",
    },
    {
      id: "INV-2024-155",
      client: "Tech Solutions S.A.",
      amount: 1890.5,
      status: "pending",
      date: "2024-07-17",
    },
    {
      id: "INV-2024-154",
      client: "Innovation SpA",
      amount: 3200.0,
      status: "overdue",
      date: "2024-06-16",
    },
  ],
  monthlyData: [
    { month: "Apr", invoices: 18, revenue: 15600 },
    { month: "May", invoices: 22, revenue: 19200 },
    { month: "Jun", invoices: 25, revenue: 21800 },
    { month: "Jul", invoices: 23, revenue: 18450 },
  ],
}

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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showClientModal, setShowClientModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [editingClient, setEditingClient] = useState<any>(null)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)

  const [currentUserRole] = useState("Admin")

  const [clientForm, setClientForm] = useState({
    name: "",
    nif: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postalCode: "",
    country: "ES",
    paymentTerms: "30",
    notes: "",
  })

  const [userForm, setUserForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    role: "User",
  })

  const resetClientForm = () => {
    setClientForm({
      name: "",
      nif: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "ES",
      paymentTerms: "30",
      notes: "",
    })
  }

  const resetUserForm = () => {
    setUserForm({ firstName: "", lastName: "", email: "", role: "User" })
  }

  const handleSaveClient = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Saving client:", clientForm)
    setIsLoading(false)
    setShowClientModal(false)
    setEditingClient(null)
    resetClientForm()
  }

  const handleSaveUser = async () => {
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Saving user:", userForm)
    setIsLoading(false)
    setShowUserModal(false)
    setEditingUser(null)
    resetUserForm()
  }

  const handleEditClient = (client: any) => {
    setEditingClient(client)
    setClientForm({
      name: client.name,
      nif: client.nif,
      email: client.email,
      phone: client.phone,
      address: client.address.split(",")[0],
      city: client.address.split(",")[1]?.trim() || "",
      postalCode: "",
      country: "ES",
      paymentTerms: client.paymentTerms.split(" ")[0],
      notes: "",
    })
    setShowClientModal(true)
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setUserForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, role: user.role })
    setShowUserModal(true)
  }

  const isAdmin = currentUserRole === "Admin"

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <h1 className="text-2xl font-bold text-blue-600">PROCYS</h1>
            </div>
            <div className="flex items-center space-x-3">
              <Button asChild>
                <Link href="/invoices/create">
                  <Plus className="w-4 h-4 mr-2" />
                  New Invoice
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/settings">
                  <Settings className="w-4 h-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${isAdmin ? "grid-cols-4" : "grid-cols-3"}`}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="clients">Clients</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            {isAdmin && <TabsTrigger value="users">Users</TabsTrigger>}
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <Euro className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€{dashboardData.overview.totalRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">
                    +€{dashboardData.overview.monthlyRevenue.toLocaleString()} this month
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Invoices</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.overview.totalInvoices}</div>
                  <p className="text-xs text-muted-foreground">+{dashboardData.overview.monthlyInvoices} this month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Clients</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.overview.activeClients}</div>
                  <p className="text-xs text-muted-foreground">out of {dashboardData.overview.totalClients} total</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Payment Rate</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.overview.paymentRate}%</div>
                  <p className="text-xs text-muted-foreground">Paid on time</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <RechartsBarChart data={dashboardData.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis tickFormatter={(value) => `€${value / 1000}k`} />
                      <Tooltip formatter={(value: number) => `€${value.toLocaleString()}`} />
                      <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                    </RechartsBarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Invoices</CardTitle>
                  <CardDescription>Your latest invoices.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentInvoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{invoice.client}</p>
                          <p className="text-sm text-gray-600">{invoice.id}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">€{invoice.amount.toFixed(2)}</p>
                          {getStatusBadge(invoice.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full mt-4" asChild>
                    <Link href="/invoices">View All Invoices</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="clients" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Client Directory</CardTitle>
                  <Button onClick={() => setShowClientModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Client
                  </Button>
                </div>
                <CardDescription>Manage your client database.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search clients..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Total Billed</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockClients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>
                          <div className="font-medium">{client.name}</div>
                          <div className="text-sm text-muted-foreground">{client.nif}</div>
                        </TableCell>
                        <TableCell>{client.email}</TableCell>
                        <TableCell>€{client.totalRevenue.toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => handleEditClient(client)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {isAdmin && (
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>User Management</CardTitle>
                    <Button onClick={() => setShowUserModal(true)}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                  <CardDescription>Manage system users and their roles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback>{`${user.firstName.substring(0, 1)}${user.lastName.substring(0, 1)}`.toUpperCase()}</AvatarFallback>
                              </Avatar>
                            <div>
                                <p className="font-medium">{user.firstName} {user.lastName}</p>
                                <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.role === "Admin" ? "default" : "secondary"}>{user.role}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.status === "active" ? "default" : "secondary"}>{user.status}</Badge>
                        </TableCell>
                        <TableCell>{new Date(user.lastLogin).toLocaleString()}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Button variant="ghost" size="icon" onClick={() => handleEditUser(user)}>
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="icon">
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        )}

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Revenue</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">€18,450</p>
                  <p className="text-xs text-green-600">+15.3% vs last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Avg. Invoice Value</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">€802.17</p>
                  <p className="text-xs text-red-600">-5.1% vs last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Avg. Collection Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">28 days</p>
                  <p className="text-xs text-green-600">2 days faster</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Top Client</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-lg font-bold">Acme Corp S.L.</p>
                  <p className="text-xs text-muted-foreground">€29,400 total</p>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>More Analytics</CardTitle>
                <CardDescription>Detailed performance metrics will be displayed here.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500 border-2 border-dashed rounded-lg">
                  <p>Advanced charts coming soon.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <Dialog open={showClientModal} onOpenChange={setShowClientModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingClient ? "Edit Client" : "Add New Client"}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name *</Label>
                  <Input id="name" value={clientForm.name} onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nif">NIF/CIF</Label>
                  <Input id="nif" value={clientForm.nif} onChange={(e) => setClientForm({ ...clientForm, nif: e.target.value })} />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input id="email" type="email" value={clientForm.email} onChange={(e) => setClientForm({ ...clientForm, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" value={clientForm.phone} onChange={(e) => setClientForm({ ...clientForm, phone: e.target.value })} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" value={clientForm.address} onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" value={clientForm.notes} onChange={(e) => setClientForm({ ...clientForm, notes: e.target.value })} />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => { setShowClientModal(false); setEditingClient(null); resetClientForm(); }}>Cancel</Button>
                <Button onClick={handleSaveClient} disabled={isLoading}>{isLoading ? "Saving..." : "Save Client"}</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {isAdmin && (
          <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={userForm.firstName}
                      onChange={(e) => setUserForm({ ...userForm, firstName: e.target.value })}
                      placeholder="John"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={userForm.lastName}
                      onChange={(e) => setUserForm({ ...userForm, lastName: e.target.value })}
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email *</Label>
                  <Input id="userEmail" type="email" value={userForm.email} onChange={(e) => setUserForm({ ...userForm, email: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userRole">Role *</Label>
                  <Select value={userForm.role} onValueChange={(value) => setUserForm({ ...userForm, role: value })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => { setShowUserModal(false); setEditingUser(null); resetUserForm(); }}>Cancel</Button>
                  <Button onClick={handleSaveUser} disabled={isLoading}>{isLoading ? "Saving..." : "Save User"}</Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

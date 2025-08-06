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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Plus, Users, Euro, TrendingUp, FileText, Shield, CheckCircle, AlertTriangle, Eye, Settings, RefreshCw, Search, Filter, Edit, Trash2, UserPlus, Server, Activity, AlertCircle, Calendar, BarChart3, PieChart, Hash, QrCode, Send, Lock, Globe, Award, Database } from 'lucide-react'
import Link from "next/link"
import { Progress } from "@/components/ui/progress"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"

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
    lastInvoice: "2024-01-18",
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
    lastInvoice: "2024-01-17",
    paymentTerms: "45 days",
  },
]

const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@company.com",
    role: "Admin",
    status: "active",
    lastLogin: "2024-01-18T10:30:00Z",
    createdAt: "2024-01-01T00:00:00Z",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.com",
    role: "User",
    status: "active",
    lastLogin: "2024-01-18T09:15:00Z",
    createdAt: "2024-01-05T00:00:00Z",
  },
  {
    id: "3",
    name: "Carlos Rodriguez",
    email: "carlos.rodriguez@company.com",
    role: "User",
    status: "inactive",
    lastLogin: "2024-01-10T14:20:00Z",
    createdAt: "2024-01-10T00:00:00Z",
  },
]

const mockAEATLogs = [
  {
    id: "1",
    invoiceId: "INV-2024-156",
    timestamp: "2024-01-18T10:30:15Z",
    status: "success",
    submissionId: "AEAT-1705574415",
    responseTime: "2.3s",
    message: "Invoice successfully submitted to AEAT",
  },
  {
    id: "2",
    invoiceId: "INV-2024-155",
    timestamp: "2024-01-17T14:22:30Z",
    status: "success",
    submissionId: "AEAT-1705488150",
    responseTime: "1.8s",
    message: "Invoice successfully submitted to AEAT",
  },
  {
    id: "3",
    invoiceId: "INV-2024-154",
    timestamp: "2024-01-16T09:15:45Z",
    status: "failed",
    submissionId: null,
    responseTime: "30.0s",
    message: "Connection timeout to AEAT servers",
    retryCount: 2,
  },
]

// Mock data for dashboard with comprehensive VeriFactu compliance
const dashboardData = {
  overview: {
    totalInvoices: 156,
    monthlyInvoices: 23,
    totalRevenue: 139800,
    monthlyRevenue: 18450,
    totalClients: 45,
    activeClients: 32,
    averageInvoiceValue: 896.15,
    paymentRate: 91.2,
  },
  compliance: {
    verifactuEnabled: true,
    aeatSubmissions: 142,
    failedSubmissions: 3,
    pendingSubmissions: 11,
    integrityScore: 98.1,
    lastIntegrityCheck: "2024-01-18T10:30:00Z",
    auditLogEntries: 624,
    immutableInvoices: 156,
    sequentialIntegrityValid: true,
    hashChainIntact: true,
    ntpSyncStatus: "active",
    lastNTPSync: "2024-01-18T11:00:00Z",
    backupStatus: "current",
    lastBackup: "2024-01-18T02:00:00Z",
    retentionCompliance: true,
    softwareCertified: true,
    certificateExpiry: "2025-07-15",
  },
  recentInvoices: [
    {
      id: "INV-2024-156",
      client: "Acme Corp S.L.",
      clientNIF: "B12345678",
      amount: 2450.0,
      status: "paid",
      verifactuStatus: "submitted",
      date: "2024-01-18",
      hash: "sha256:a1b2c3d4...",
      sequentialNumber: 156,
      uuid: "550e8400-e29b-41d4-a716-446655440000",
      qrCode: "QR:a1b2c3d4e5f6g7h8",
      aeatSubmissionId: "AEAT-1705574415",
    },
    {
      id: "INV-2024-155",
      client: "Tech Solutions S.A.",
      clientNIF: "A87654321",
      amount: 1890.5,
      status: "pending",
      verifactuStatus: "submitted",
      date: "2024-01-17",
      hash: "sha256:e5f6g7h8...",
      sequentialNumber: 155,
      uuid: "550e8400-e29b-41d4-a716-446655440001",
      qrCode: "QR:e5f6g7h8i9j0k1l2",
      aeatSubmissionId: "AEAT-1705488150",
    },
    {
      id: "INV-2024-154",
      client: "Innovation SpA",
      clientNIF: "C11223344",
      amount: 3200.0,
      status: "paid",
      verifactuStatus: "failed",
      date: "2024-01-16",
      hash: "sha256:i9j0k1l2...",
      sequentialNumber: 154,
      uuid: "550e8400-e29b-41d4-a716-446655440002",
      qrCode: "QR:i9j0k1l2m3n4o5p6",
      aeatSubmissionId: null,
      aeatError: "Connection timeout to AEAT servers",
    },
  ],
  monthlyData: [
    { month: "Oct", invoices: 18, revenue: 15600, aeatSubmissions: 16, integrityChecks: 3 },
    { month: "Nov", invoices: 22, revenue: 19200, aeatSubmissions: 20, integrityChecks: 3 },
    { month: "Dec", invoices: 25, revenue: 21800, aeatSubmissions: 23, integrityChecks: 3 },
    { month: "Jan", invoices: 23, revenue: 18450, aeatSubmissions: 21, integrityChecks: 3 },
  ],
  complianceBreakdown: [
    { name: "Submitted to AEAT", value: 142, color: "#10b981" },
    { name: "Failed Submission", value: 3, color: "#ef4444" },
    { name: "Pending Submission", value: 11, color: "#f59e0b" },
  ],
  auditTrail: [
    {
      id: "audit-001",
      timestamp: "2024-01-18T10:30:15Z",
      operation: "create",
      invoiceId: "INV-2024-156",
      userId: "admin@company.com",
      userRole: "administrator",
      details: "Invoice created with VeriFactu compliance",
      hash: "sha256:audit001...",
    },
    {
      id: "audit-002",
      timestamp: "2024-01-18T10:30:45Z",
      operation: "transmit",
      invoiceId: "INV-2024-156",
      userId: "system",
      userRole: "system",
      details: "Successfully submitted to AEAT",
      hash: "sha256:audit002...",
    },
    {
      id: "audit-003",
      timestamp: "2024-01-18T09:15:22Z",
      operation: "view",
      invoiceId: "INV-2024-155",
      userId: "manager@company.com",
      userRole: "manager",
      details: "Invoice viewed by user",
      hash: "sha256:audit003...",
    },
  ],
}

// Define a type for client data
type Client = {
  id: string
  name: string
  nif: string
  email: string
  phone: string
  address: string
  city: string
  postalCode: string
  country: string
  invoiceCount: number
  totalAmount: number
  lastInvoice: string
  status: string
  paymentTerms: string
  taxRate?: string // Added for the form
  notes?: string // Added for the form
}

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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState("overview")
  const [showClientModal, setShowClientModal] = useState(false)
  const [showUserModal, setShowUserModal] = useState(false)
  const [showAEATModal, setShowAEATModal] = useState(false)
  const [editingClient, setEditingClient] = useState<any>(null)
  const [editingUser, setEditingUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [integrityCheckRunning, setIntegrityCheckRunning] = useState(false)
  const [lastIntegrityCheckUpdate, setLastIntegrityCheckUpdate] = useState(new Date())

  // Current user role (in real app, this would come from auth context)
  const [currentUserRole] = useState("Admin") // or "User"

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
    defaultTaxRate: "21",
    notes: "",
  })

  const [userForm, setUserForm] = useState({
    name: "",
    email: "",
    role: "User",
    password: "",
    confirmPassword: "",
  })

  const [aeatConfig, setAeatConfig] = useState({
    enabled: true,
    endpoint: "https://www2.agenciatributaria.gob.es/wlpl/SSII-FACT/ws/fe/SiiFactFEV1SOAP",
    certificatePath: "",
    certificatePassword: "",
    testMode: false,
    autoRetry: true,
    maxRetries: 3,
    retryDelay: 30,
  })

  const _resetClientForm = () => {
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
      defaultTaxRate: "21",
      notes: "",
    })
  }

  const resetUserForm = () => {
    setUserForm({
      name: "",
      email: "",
      role: "User",
      password: "",
      confirmPassword: "",
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
    _resetClientForm()
  }

  const handleSaveUser = async () => {
    if (userForm.password !== userForm.confirmPassword) {
      alert("Passwords do not match")
      return
    }

    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Saving user:", userForm)
    setIsLoading(false)
    setShowUserModal(false)
    setEditingUser(null)
    resetUserForm()
  }

  const handleSaveAEATConfig = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    console.log("Saving AEAT config:", aeatConfig)
    setIsLoading(false)
    setShowAEATModal(false)
  }

  const handleViewClient = (client: any) => {
    console.log("Viewing client:", client)
    alert(`Client Details:\nName: ${client.name}\nNIF: ${client.nif}\nEmail: ${client.email}`)
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
      defaultTaxRate: "21",
      notes: "",
    })
    setShowClientModal(true)
  }

  const handleEditUser = (user: any) => {
    setEditingUser(user)
    setUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      password: "",
      confirmPassword: "",
    })
    setShowUserModal(true)
  }

  const handleCreateInvoice = (client: any) => {
    // Navigate to invoice creation with pre-selected client
    window.location.href = `/invoices/create?clientId=${client.id}`
  }

  const handleRetryAEATSubmission = async (logId: string) => {
    setIsLoading(true)
    // Simulate retry
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log("Retrying AEAT submission for log:", logId)
    setIsLoading(false)
  }

  const runIntegrityCheck = async () => {
    setIntegrityCheckRunning(true)
    // Simulate integrity check
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIntegrityCheckRunning(false)
    setLastIntegrityCheckUpdate(new Date())
  }

  const performBackup = async () => {
    setIsLoading(true)
    // Simulate backup process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  const isAdmin = currentUserRole === "Admin"

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-gray-900">Procys</h1>
                  <p className="text-sm text-gray-600">VeriFactu Compliant Platform</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="default" className="bg-green-600">
                  <Award className="w-3 h-3 mr-1" />
                  AEAT Certified
                </Badge>
                <Badge variant="outline" className="border-blue-600 text-blue-600">
                  <Shield className="w-3 h-3 mr-1" />
                  VeriFactu Active
                </Badge>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" onClick={runIntegrityCheck} disabled={integrityCheckRunning}>
                <RefreshCw className={`w-4 h-4 mr-2 ${integrityCheckRunning ? "animate-spin" : ""}`} />
                {integrityCheckRunning ? "Checking..." : "Integrity Check"}
              </Button>
              <Button variant="outline" onClick={performBackup} disabled={isLoading}>
                <Database className={`w-4 h-4 mr-2 ${isLoading ? "animate-pulse" : ""}`} />
                {isLoading ? "Backing up..." : "Backup"}
              </Button>
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
        {/* VeriFactu Status Alert */}
        {dashboardData.compliance.verifactuEnabled ? (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <Shield className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              <div className="flex items-center justify-between">
                <div>
                  <strong>VeriFactu Compliance Active</strong> - All invoices are immutable with real-time AEAT
                  submission. Integrity Score: {dashboardData.compliance.integrityScore}% | Certificate expires:{" "}
                  {new Date(dashboardData.compliance.certificateExpiry).toLocaleDateString()}
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="default" className="bg-green-600">
                    <Globe className="w-3 h-3 mr-1" />
                    NTP Synced
                  </Badge>
                  <Badge variant="default" className="bg-blue-600">
                    <Database className="w-3 h-3 mr-1" />
                    Backed Up
                  </Badge>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        ) : (
          <Alert className="mb-6 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-red-800">
              <strong>VeriFactu Compliance Disabled</strong> - Enable VeriFactu in settings to ensure Spanish tax
              compliance and avoid penalties. Required by Real Decreto 1007/2023.
            </AlertDescription>
          </Alert>
        )}

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className={`grid w-full ${isAdmin ? "grid-cols-6" : "grid-cols-4"}`}>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="client">Client</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            {isAdmin && (
              <>
                <TabsTrigger value="users">Users</TabsTrigger>
                <TabsTrigger value="system">System</TabsTrigger>
              </>
            )}
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.overview.totalInvoices}</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />+{dashboardData.overview.monthlyInvoices} this month
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Sequential: #{dashboardData.overview.totalInvoices} • All immutable
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                  <Euro className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">€{dashboardData.overview.totalRevenue.toLocaleString()}</div>
                  <div className="flex items-center text-xs text-green-600">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    +€{dashboardData.overview.monthlyRevenue.toLocaleString()} this month
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Avg: €{dashboardData.overview.averageInvoiceValue.toFixed(2)} per invoice
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">AEAT Submissions</CardTitle>
                  <Send className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.compliance.aeatSubmissions}</div>
                  <div className="text-xs text-green-600">
                    {Math.round(
                      (dashboardData.compliance.aeatSubmissions / dashboardData.overview.totalInvoices) * 100,
                    )}
                    % success rate
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {dashboardData.compliance.failedSubmissions} failed • {dashboardData.compliance.pendingSubmissions}{" "}
                    pending
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Integrity Score</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.compliance.integrityScore}%</div>
                  <Progress value={dashboardData.compliance.integrityScore} className="mt-2" />
                  <div className="text-xs text-gray-600 mt-1">Hash chain intact • Sequential verified</div>
                </CardContent>
              </Card>
            </div>

            {/* Charts and Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Performance</CardTitle>
                  <CardDescription>Invoice count, revenue, and AEAT submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={dashboardData.monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="invoices" fill="#3b82f6" name="Invoices" />
                      <Bar dataKey="aeatSubmissions" fill="#10b981" name="AEAT Submissions" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Recent Invoices */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Invoices</CardTitle>
                  <CardDescription>Latest VeriFactu compliant invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.recentInvoices.map((invoice) => (
                      <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium font-mono">{invoice.id}</span>
                            <Badge variant="outline" className="text-xs">
                              #{invoice.sequentialNumber}
                            </Badge>
                            {getStatusBadge(invoice.status)}
                            {getVeriFactuBadge(invoice.verifactuStatus)}
                          </div>
                          <p className="text-sm text-gray-600">{invoice.client}</p>
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            <span className="font-mono">{invoice.hash}</span>
                            <span>UUID: {invoice.uuid.substring(0, 8)}...</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">€{invoice.amount.toFixed(2)}</div>
                          <div className="text-sm text-gray-600">{new Date(invoice.date).toLocaleDateString()}</div>
                          <div className="flex items-center space-x-1 mt-1">
                            <QrCode className="w-3 h-3 text-gray-400" />
                            <Hash className="w-3 h-3 text-gray-400" />
                            <Lock className="w-3 h-3 text-green-500" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4">
                    <Button variant="outline" className="w-full bg-transparent" asChild>
                      <Link href="/invoices">
                        <Eye className="w-4 h-4 mr-2" />
                        View All Invoices
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Client Tab */}
          <TabsContent value="client" className="space-y-6">
            {/* Client Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Users className="w-5 h-5 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Total Clients</p>
                      <p className="text-xl font-bold">45</p>
                      <p className="text-xs text-green-600">+3 this month</p>
                      <p className="text-xs text-gray-500">32 active clients</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Active Clients</p>
                      <p className="text-xl font-bold">32</p>
                      <p className="text-xs text-green-600">71% active rate</p>
                      <p className="text-xs text-gray-500">13 inactive</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <Euro className="w-5 h-5 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600">Avg Invoice Value</p>
                      <p className="text-xl font-bold">€896</p>
                      <p className="text-xs text-green-600">+12.5% vs last month</p>
                      <p className="text-xs text-gray-500">Per client average</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Payment Rate</p>
                      <p className="text-xl font-bold">94%</p>
                      <p className="text-xs text-green-600">On-time payments</p>
                      <p className="text-xs text-gray-500">Avg 28 days</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Client Directory */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Client Directory</CardTitle>
                    <CardDescription>Manage your client database</CardDescription>
                  </div>
                  <Button onClick={() => setShowClientModal(true)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Client
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input placeholder="Search clients by name or NIF..." className="pl-10" />
                  </div>
                  <Button variant="outline">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>

                <div className="space-y-4">
                  {mockClients.map((client) => (
                    <div key={client.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h3 className="font-medium">{client.name}</h3>
                            <Badge variant={client.status === "active" ? "default" : "secondary"}>
                              {client.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">
                            {client.nif} • {client.email}
                          </p>
                          <p className="text-sm text-gray-500">{client.address}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <p className="font-medium">€{client.totalRevenue.toLocaleString()}</p>
                          <p className="text-sm text-gray-600">{client.invoiceCount} invoices</p>
                          <p className="text-xs text-gray-500">Last: {client.lastInvoice}</p>
                          <p className="text-xs text-gray-500">Terms: {client.paymentTerms}</p>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Button variant="ghost" size="sm" onClick={() => handleViewClient(client)}>
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleEditClient(client)}>
                            <Settings className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => handleCreateInvoice(client)}>
                            <FileText className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Users Tab (Admin Only) */}
          {isAdmin && (
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>Manage system users and their roles</CardDescription>
                    </div>
                    <Button onClick={() => setShowUserModal(true)}>
                      <UserPlus className="w-4 h-4 mr-2" />
                      Add User
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Login</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <Avatar>
                                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{user.name}</p>
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
                          <TableCell>
                            <p className="text-sm">{new Date(user.lastLogin).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-600">{new Date(user.lastLogin).toLocaleTimeString()}</p>
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{new Date(user.createdAt).toLocaleDateString()}</p>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-1">
                              <Button variant="ghost" size="sm" onClick={() => handleEditUser(user)}>
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
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

          {/* System Tab (Admin Only) */}
          {isAdmin && (
            <TabsContent value="system" className="space-y-6">
              {/* AEAT Configuration */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center space-x-2">
                        <Server className="w-5 h-5" />
                        <span>AEAT Configuration</span>
                      </CardTitle>
                      <CardDescription>Configure AEAT credentials and submission settings</CardDescription>
                    </div>
                    <Button onClick={() => setShowAEATModal(true)}>
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-3 h-3 rounded-full ${aeatConfig.enabled ? "bg-green-500" : "bg-red-500"}`}
                      ></div>
                      <div>
                        <p className="text-sm font-medium">Status</p>
                        <p className="text-xs text-gray-600">{aeatConfig.enabled ? "Enabled" : "Disabled"}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-blue-500" />
                      <div>
                        <p className="text-sm font-medium">Certificate</p>
                        <p className="text-xs text-gray-600">{aeatConfig.certificatePath ? "Configured" : "Not Set"}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Activity className="w-4 h-4 text-green-500" />
                      <div>
                        <p className="text-sm font-medium">Mode</p>
                        <p className="text-xs text-gray-600">{aeatConfig.testMode ? "Test" : "Production"}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RefreshCw className="w-4 h-4 text-orange-500" />
                      <div>
                        <p className="text-sm font-medium">Auto Retry</p>
                        <p className="text-xs text-gray-600">{aeatConfig.autoRetry ? "Enabled" : "Disabled"}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* AEAT Submission Logs */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="w-5 h-5" />
                    <span>AEAT Submission Logs</span>
                  </CardTitle>
                  <CardDescription>Monitor AEAT submission status and retry failed submissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Invoice</TableHead>
                        <TableHead>Timestamp</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Response Time</TableHead>
                        <TableHead>Submission ID</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAEATLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-mono">{log.invoiceId}</TableCell>
                          <TableCell>
                            <p className="text-sm">{new Date(log.timestamp).toLocaleDateString()}</p>
                            <p className="text-xs text-gray-600">{new Date(log.timestamp).toLocaleTimeString()}</p>
                          </TableCell>
                          <TableCell>
                            <Badge variant={log.status === "success" ? "default" : "destructive"}>
                              {log.status === "success" ? (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              ) : (
                                <AlertTriangle className="w-3 h-3 mr-1" />
                              )}
                              {log.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.responseTime}</TableCell>
                          <TableCell>
                            {log.submissionId ? (
                              <span className="font-mono text-xs">{log.submissionId}</span>
                            ) : (
                              <span className="text-gray-400">-</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <p className="text-sm">{log.message}</p>
                            {log.retryCount && <p className="text-xs text-gray-600">Retries: {log.retryCount}</p>}
                          </TableCell>
                          <TableCell>
                            {log.status === "failed" && (
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleRetryAEATSubmission(log.id)}
                                disabled={isLoading}
                              >
                                <RefreshCw className="w-3 h-3 mr-1" />
                                Retry
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          )}

          {/* Compliance Tab */}
          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">VeriFactu Status</p>
                      <p className="text-xl font-bold">Active</p>
                      <p className="text-xs text-green-600">98.7% compliance rate</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Hash className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Digital Signatures</p>
                      <p className="text-xl font-bold">156</p>
                      <p className="text-xs text-blue-600">All verified</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <QrCode className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600">QR Codes</p>
                      <p className="text-xl font-bold">142</p>
                      <p className="text-xs text-purple-600">AEAT validated</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Overview</CardTitle>
                <CardDescription>VeriFactu compliance status and requirements</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <CheckCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your system is fully compliant with Spanish VeriFactu regulations. All invoices are digitally signed
                    and submitted to AEAT.
                  </AlertDescription>
                </Alert>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Compliance Features</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Sequential invoice numbering</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Immutable invoice records</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Digital signatures (RSA-2048)</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">AEAT real-time submission</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">QR code verification</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Audit Trail</h4>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Complete audit logging</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Tamper-proof records</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">6-year data retention</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Automated backups</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <span className="text-sm">Hash chain integrity</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="w-8 h-8 text-blue-500" />
                    <div>
                      <p className="text-sm text-gray-600">Monthly Revenue</p>
                      <p className="text-xl font-bold">€12,450</p>
                      <p className="text-xs text-green-600">+15.3% vs last month</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <PieChart className="w-8 h-8 text-green-500" />
                    <div>
                      <p className="text-sm text-gray-600">Payment Rate</p>
                      <p className="text-xl font-bold">94%</p>
                      <p className="text-xs text-green-600">On-time payments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-8 h-8 text-purple-500" />
                    <div>
                      <p className="text-sm text-gray-600">Growth Rate</p>
                      <p className="text-xl font-bold">+23%</p>
                      <p className="text-xs text-purple-600">Year over year</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-8 h-8 text-orange-500" />
                    <div>
                      <p className="text-sm text-gray-600">Avg Collection</p>
                      <p className="text-xl font-bold">28 days</p>
                      <p className="text-xs text-orange-600">2 days faster</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Revenue Analytics</CardTitle>
                <CardDescription>Detailed revenue and performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  <p>Revenue chart would be displayed here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Client Modal */}
        <Dialog open={showClientModal} onOpenChange={setShowClientModal}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingClient ? "Edit Client" : "Add New Client"}</DialogTitle>
              <DialogDescription>
                {editingClient ? "Update client information" : "Enter client details to add them to your database"}
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Company Name *</Label>
                  <Input
                    id="name"
                    value={clientForm.name}
                    onChange={(e) => setClientForm({ ...clientForm, name: e.target.value })}
                    placeholder="Acme Corp S.L."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nif">NIF/CIF *</Label>
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
                <Label htmlFor="address">Address *</Label>
                <Input
                  id="address"
                  value={clientForm.address}
                  onChange={(e) => setClientForm({ ...clientForm, address: e.target.value })}
                  placeholder="Calle Mayor 123"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={clientForm.city}
                    onChange={(e) => setClientForm({ ...clientForm, city: e.target.value })}
                    placeholder="Madrid"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={clientForm.postalCode}
                    onChange={(e) => setClientForm({ ...clientForm, postalCode: e.target.value })}
                    placeholder="28001"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Select
                    value={clientForm.country}
                    onValueChange={(value) => setClientForm({ ...clientForm, country: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ES">Spain</SelectItem>
                      <SelectItem value="FR">France</SelectItem>
                      <SelectItem value="IT">Italy</SelectItem>
                      <SelectItem value="DE">Germany</SelectItem>
                      <SelectItem value="PT">Portugal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="paymentTerms">Payment Terms</Label>
                  <Select
                    value={clientForm.paymentTerms}
                    onValueChange={(value) => setClientForm({ ...clientForm, paymentTerms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="45">45 days</SelectItem>
                      <SelectItem value="60">60 days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="defaultTaxRate">Default Tax Rate</Label>
                  <Select
                    value={clientForm.defaultTaxRate}
                    onValueChange={(value) => setClientForm({ ...clientForm, defaultTaxRate: value })}
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
                    _resetClientForm()
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleSaveClient} disabled={isLoading}>
                  {isLoading ? "Saving..." : editingClient ? "Update Client" : "Save Client"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>

        {/* User Modal (Admin Only) */}
        {isAdmin && (
          <Dialog open={showUserModal} onOpenChange={setShowUserModal}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
                <DialogDescription>
                  {editingUser ? "Update user information and role" : "Create a new user account"}
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="userName">Full Name *</Label>
                  <Input
                    id="userName"
                    value={userForm.name}
                    onChange={(e) => setUserForm({ ...userForm, name: e.target.value })}
                    placeholder="John Doe"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userEmail">Email *</Label>
                  <Input
                    id="userEmail"
                    type="email"
                    value={userForm.email}
                    onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    placeholder="john.doe@company.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="userRole">Role *</Label>
                  <Select value={userForm.role} onValueChange={(value) => setUserForm({ ...userForm, role: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="User">User</SelectItem>
                      <SelectItem value="Admin">Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowUserModal(false)
                      setEditingUser(null)
                      resetUserForm()
                    }}
                  >
                    Cancel
                  </Button>
                  <Button onClick={handleSaveUser} disabled={isLoading}>
                    {isLoading ? "Saving..." : editingUser ? "Update User" : "Create User"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}

        {/* AEAT Configuration Modal (Admin Only) */}
        {isAdmin && (
          <Dialog open={showAEATModal} onOpenChange={setShowAEATModal}>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>AEAT Configuration</DialogTitle>
                <DialogDescription>
                  Configure AEAT credentials and submission settings for VeriFactu compliance
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    id="aeatEnabled"
                    checked={aeatConfig.enabled}
                    onCheckedChange={(checked) => setAeatConfig({ ...aeatConfig, enabled: checked })}
                  />
                  <Label htmlFor="aeatEnabled">Enable AEAT Submissions</Label>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="aeatEndpoint">AEAT Endpoint</Label>
                  <Input
                    id="aeatEndpoint"
                    value={aeatConfig.endpoint}
                    onChange={(e) => setAeatConfig({ ...aeatConfig, endpoint: e.target.value })}
                    placeholder="https://www2.agenciatributaria.gob.es/..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="certificatePath">Certificate Path</Label>
                    <Input
                      id="certificatePath"
                      value={aeatConfig.certificatePath}
                      onChange={(e) => setAeatConfig({ ...aeatConfig, certificatePath: e.target.value })}
                      placeholder="/path/to/certificate.p12"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="certificatePassword">Certificate Password</Label>
                    <Input
                      id="certificatePassword"
                      type="password"
                      value={aeatConfig.certificatePassword}
                      onChange={(e) => setAeatConfig({ ...aeatConfig, certificatePassword: e.target.value })}
                      placeholder="Certificate password"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="testMode"
                    checked={aeatConfig.testMode}
                    onCheckedChange={(checked) => setAeatConfig({ ...aeatConfig, testMode: checked })}
                  />
                  <Label htmlFor="testMode">Test Mode</Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="autoRetry"
                    checked={aeatConfig.autoRetry}
                    onCheckedChange={(checked) => setAeatConfig({ ...aeatConfig, autoRetry: checked })}
                  />
                  <Label htmlFor="autoRetry">Auto Retry Failed Submissions</Label>
                </div>

                {aeatConfig.autoRetry && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="maxRetries">Max Retries</Label>
                      <Input
                        id="maxRetries"
                        type="number"
                        value={aeatConfig.maxRetries}
                        onChange={(e) => setAeatConfig({ ...aeatConfig, maxRetries: Number.parseInt(e.target.value) })}
                        min="1"
                        max="10"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="retryDelay">Retry Delay (seconds)</Label>
                      <Input
                        id="retryDelay"
                        type="number"
                        value={aeatConfig.retryDelay}
                        onChange={(e) => setAeatConfig({ ...aeatConfig, retryDelay: Number.parseInt(e.target.value) })}
                        min="10"
                        max="300"
                      />
                    </div>
                  </div>
                )}

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Changes to AEAT configuration will affect all future invoice submissions. Test your configuration in
                    test mode before enabling production submissions.
                  </AlertDescription>
                </Alert>

                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAEATModal(false)}>
                    Cancel
                  </Button>
                  <Button onClick={handleSaveAEATConfig} disabled={isLoading}>
                    {isLoading ? "Saving..." : "Save Configuration"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </div>
  )
}

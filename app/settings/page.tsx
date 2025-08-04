"use client"

import { Progress } from "@/components/ui/progress"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  ArrowLeft,
  User,
  Building,
  Bell,
  Shield,
  CreditCard,
  Globe,
  Upload,
  Download,
  Key,
  Trash2,
  CheckCircle,
  AlertCircle,
  Settings,
  Save,
  Eye,
  EyeOff,
  Users,
} from "lucide-react"
import Link from "next/link"
import { VerifactuSettings } from "@/components/verifactu-settings"

// Mock user and company data
const userData = {
  firstName: "John",
  lastName: "Doe",
  email: "john.doe@company.com",
  phone: "+49 30 12345678",
  avatar: "",
  role: "Administrator",
  lastLogin: "2024-01-18T10:30:00Z",
  twoFactorEnabled: true,
}

const companyData = {
  name: "Acme Corporation GmbH",
  vatId: "DE123456789",
  taxId: "HRB 12345",
  address: "Hauptstraße 123",
  city: "Berlin",
  postalCode: "10115",
  country: "DE",
  phone: "+49 30 87654321",
  email: "billing@acme.de",
  website: "https://acme.de",
  logo: "",
  peppolId: "0088:7300010000001",
  peppolEnabled: true,
  defaultCurrency: "EUR",
  defaultPaymentTerms: "30",
  defaultVatRate: "19",
  invoicePrefix: "INV",
  invoiceNumbering: "sequential",
  language: "en",
  timezone: "Europe/Berlin",
}

const subscriptionData = {
  plan: "Professional",
  status: "active",
  billingCycle: "monthly",
  nextBilling: "2024-02-18",
  amount: 49.99,
  currency: "EUR",
  invoicesUsed: 156,
  invoicesLimit: 500,
  contactsUsed: 45,
  contactsLimit: 1000,
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    user: { ...userData },
    company: { ...companyData },
  })

  const [notifications, setNotifications] = useState({
    emailInvoiceSent: true,
    emailPaymentReceived: true,
    emailOverdue: true,
    emailWeeklyReport: false,
    pushInvoiceSent: true,
    pushPaymentReceived: true,
    pushOverdue: true,
    smsOverdue: false,
  })

  const [verifactuConfig, setVerifactuConfig] = useState({
    enabled: false,
    aeatSubmissionEnabled: false,
    developerTaxId: "B12345678",
    developerName: "Procys Technologies S.L.",
    softwareVersion: "1.0.0",
    certificateNumber: "",
    complianceDeclaration: {
      date: new Date().toISOString().split("T")[0],
      version: "1.0.0",
      responsible: "John Doe, CTO",
    },
  })

  const handleSave = async (section: string) => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    // Show success message
  }

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Handle file upload
      console.log("Uploading avatar:", file)
    }
  }

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      // Handle file upload
      console.log("Uploading logo:", file)
    }
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
                <h1 className="text-xl font-semibold">Settings</h1>
                <p className="text-sm text-gray-600">Manage your account and company preferences</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={() => handleSave(activeTab)} disabled={isLoading}>
                <Save className="w-4 h-4 mr-2" />
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="company" className="flex items-center space-x-2">
              <Building className="w-4 h-4" />
              <span className="hidden sm:inline">Company</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">Notifications</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Security</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center space-x-2">
              <CreditCard className="w-4 h-4" />
              <span className="hidden sm:inline">Billing</span>
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center space-x-2">
              <Globe className="w-4 h-4" />
              <span className="hidden sm:inline">Integrations</span>
            </TabsTrigger>
            <TabsTrigger value="verifactu" className="flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span className="hidden sm:inline">Verifactu</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Personal Information</CardTitle>
                    <CardDescription>Update your personal details and contact information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Avatar className="w-20 h-20">
                        <AvatarImage src={formData.user.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-lg">
                          {formData.user.firstName[0]}
                          {formData.user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Label htmlFor="avatar">Profile Picture</Label>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <label htmlFor="avatar" className="cursor-pointer">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload
                            </label>
                          </Button>
                          <input
                            id="avatar"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleAvatarUpload}
                          />
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.user.firstName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              user: { ...formData.user, firstName: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.user.lastName}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              user: { ...formData.user, lastName: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.user.email}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            user: { ...formData.user, email: e.target.value },
                          })
                        }
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={formData.user.phone}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            user: { ...formData.user, phone: e.target.value },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Change Password</CardTitle>
                    <CardDescription>Update your password to keep your account secure</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="currentPassword"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter current password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>

                    <Button>Update Password</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Role</span>
                      <Badge variant="default">{formData.user.role}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Last Login</span>
                      <span className="text-sm text-gray-600">
                        {new Date(formData.user.lastLogin).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Two-Factor Auth</span>
                      <Badge variant={formData.user.twoFactorEnabled ? "default" : "secondary"}>
                        {formData.user.twoFactorEnabled ? "Enabled" : "Disabled"}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Download className="w-4 h-4 mr-2" />
                      Export Account Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Key className="w-4 h-4 mr-2" />
                      Generate API Key
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="w-full justify-start">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete Account
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete your account and remove all your
                            data from our servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete Account</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Company Tab */}
          <TabsContent value="company" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Company Information</CardTitle>
                    <CardDescription>Update your company details for invoicing and compliance</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                        {formData.company.logo ? (
                          <img
                            src={formData.company.logo || "/placeholder.svg"}
                            alt="Company Logo"
                            className="w-full h-full object-contain"
                          />
                        ) : (
                          <Building className="w-8 h-8 text-gray-400" />
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="logo">Company Logo</Label>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" asChild>
                            <label htmlFor="logo" className="cursor-pointer">
                              <Upload className="w-4 h-4 mr-2" />
                              Upload
                            </label>
                          </Button>
                          <input
                            id="logo"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleLogoUpload}
                          />
                          <Button variant="ghost" size="sm">
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name</Label>
                      <Input
                        id="companyName"
                        value={formData.company.name}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company: { ...formData.company, name: e.target.value },
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="vatId">VAT ID</Label>
                        <Input
                          id="vatId"
                          value={formData.company.vatId}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: { ...formData.company, vatId: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="taxId">Tax ID / Registration Number</Label>
                        <Input
                          id="taxId"
                          value={formData.company.taxId}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: { ...formData.company, taxId: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.company.address}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company: { ...formData.company, address: e.target.value },
                          })
                        }
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.company.city}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: { ...formData.company, city: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={formData.company.postalCode}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: { ...formData.company, postalCode: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country">Country</Label>
                        <Select
                          value={formData.company.country}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              company: { ...formData.company, country: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="DE">Germany</SelectItem>
                            <SelectItem value="FR">France</SelectItem>
                            <SelectItem value="IT">Italy</SelectItem>
                            <SelectItem value="ES">Spain</SelectItem>
                            <SelectItem value="NL">Netherlands</SelectItem>
                            <SelectItem value="BE">Belgium</SelectItem>
                            <SelectItem value="AT">Austria</SelectItem>
                            <SelectItem value="CH">Switzerland</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="companyPhone">Phone</Label>
                        <Input
                          id="companyPhone"
                          value={formData.company.phone}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: { ...formData.company, phone: e.target.value },
                            })
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="companyEmail">Email</Label>
                        <Input
                          id="companyEmail"
                          type="email"
                          value={formData.company.email}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: { ...formData.company, email: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={formData.company.website}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company: { ...formData.company, website: e.target.value },
                          })
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Invoice Settings</CardTitle>
                    <CardDescription>Configure default settings for your invoices</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="defaultCurrency">Default Currency</Label>
                        <Select
                          value={formData.company.defaultCurrency}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              company: { ...formData.company, defaultCurrency: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EUR">EUR - Euro</SelectItem>
                            <SelectItem value="USD">USD - US Dollar</SelectItem>
                            <SelectItem value="GBP">GBP - British Pound</SelectItem>
                            <SelectItem value="CHF">CHF - Swiss Franc</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="defaultPaymentTerms">Default Payment Terms (days)</Label>
                        <Select
                          value={formData.company.defaultPaymentTerms}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              company: { ...formData.company, defaultPaymentTerms: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">Due immediately</SelectItem>
                            <SelectItem value="15">Net 15</SelectItem>
                            <SelectItem value="30">Net 30</SelectItem>
                            <SelectItem value="60">Net 60</SelectItem>
                            <SelectItem value="90">Net 90</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="defaultVatRate">Default VAT Rate (%)</Label>
                        <Select
                          value={formData.company.defaultVatRate}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              company: { ...formData.company, defaultVatRate: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="0">0%</SelectItem>
                            <SelectItem value="7">7%</SelectItem>
                            <SelectItem value="19">19%</SelectItem>
                            <SelectItem value="20">20%</SelectItem>
                            <SelectItem value="21">21%</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="invoicePrefix">Invoice Number Prefix</Label>
                        <Input
                          id="invoicePrefix"
                          value={formData.company.invoicePrefix}
                          onChange={(e) =>
                            setFormData({
                              ...formData,
                              company: { ...formData.company, invoicePrefix: e.target.value },
                            })
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="language">Default Language</Label>
                        <Select
                          value={formData.company.language}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              company: { ...formData.company, language: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="de">Deutsch</SelectItem>
                            <SelectItem value="fr">Français</SelectItem>
                            <SelectItem value="it">Italiano</SelectItem>
                            <SelectItem value="es">Español</SelectItem>
                            <SelectItem value="nl">Nederlands</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Select
                          value={formData.company.timezone}
                          onValueChange={(value) =>
                            setFormData({
                              ...formData,
                              company: { ...formData.company, timezone: value },
                            })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Europe/Berlin">Europe/Berlin</SelectItem>
                            <SelectItem value="Europe/Paris">Europe/Paris</SelectItem>
                            <SelectItem value="Europe/Rome">Europe/Rome</SelectItem>
                            <SelectItem value="Europe/Madrid">Europe/Madrid</SelectItem>
                            <SelectItem value="Europe/Amsterdam">Europe/Amsterdam</SelectItem>
                            <SelectItem value="Europe/Zurich">Europe/Zurich</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Compliance Status</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Peppol Network</span>
                      <Badge variant={formData.company.peppolEnabled ? "default" : "secondary"}>
                        {formData.company.peppolEnabled ? "Connected" : "Disconnected"}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">VAT Validation</span>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">EN 16931 Compliance</span>
                      <Badge variant="default">Certified</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">GDPR Compliance</span>
                      <Badge variant="default">Compliant</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Peppol Configuration</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="peppolId">Peppol ID</Label>
                      <Input
                        id="peppolId"
                        value={formData.company.peppolId}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            company: { ...formData.company, peppolId: e.target.value },
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="peppolEnabled"
                        checked={formData.company.peppolEnabled}
                        onCheckedChange={(checked) =>
                          setFormData({
                            ...formData,
                            company: { ...formData.company, peppolEnabled: checked },
                          })
                        }
                      />
                      <Label htmlFor="peppolEnabled">Enable Peppol Delivery</Label>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      Test Peppol Connection
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Choose how you want to be notified about important events</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Email Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailInvoiceSent">Invoice Sent</Label>
                        <p className="text-sm text-gray-600">Get notified when an invoice is successfully sent</p>
                      </div>
                      <Switch
                        id="emailInvoiceSent"
                        checked={notifications.emailInvoiceSent}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailInvoiceSent: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailPaymentReceived">Payment Received</Label>
                        <p className="text-sm text-gray-600">Get notified when a payment is received</p>
                      </div>
                      <Switch
                        id="emailPaymentReceived"
                        checked={notifications.emailPaymentReceived}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailPaymentReceived: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailOverdue">Overdue Invoices</Label>
                        <p className="text-sm text-gray-600">Get notified when invoices become overdue</p>
                      </div>
                      <Switch
                        id="emailOverdue"
                        checked={notifications.emailOverdue}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, emailOverdue: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="emailWeeklyReport">Weekly Reports</Label>
                        <p className="text-sm text-gray-600">Receive weekly summary reports</p>
                      </div>
                      <Switch
                        id="emailWeeklyReport"
                        checked={notifications.emailWeeklyReport}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, emailWeeklyReport: checked })
                        }
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Push Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushInvoiceSent">Invoice Sent</Label>
                        <p className="text-sm text-gray-600">Browser notifications for sent invoices</p>
                      </div>
                      <Switch
                        id="pushInvoiceSent"
                        checked={notifications.pushInvoiceSent}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, pushInvoiceSent: checked })}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushPaymentReceived">Payment Received</Label>
                        <p className="text-sm text-gray-600">Browser notifications for payments</p>
                      </div>
                      <Switch
                        id="pushPaymentReceived"
                        checked={notifications.pushPaymentReceived}
                        onCheckedChange={(checked) =>
                          setNotifications({ ...notifications, pushPaymentReceived: checked })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="pushOverdue">Overdue Invoices</Label>
                        <p className="text-sm text-gray-600">Browser notifications for overdue invoices</p>
                      </div>
                      <Switch
                        id="pushOverdue"
                        checked={notifications.pushOverdue}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, pushOverdue: checked })}
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">SMS Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="smsOverdue">Overdue Invoices</Label>
                        <p className="text-sm text-gray-600">SMS alerts for critical overdue invoices</p>
                      </div>
                      <Switch
                        id="smsOverdue"
                        checked={notifications.smsOverdue}
                        onCheckedChange={(checked) => setNotifications({ ...notifications, smsOverdue: checked })}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Two-Factor Authentication</CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Status</p>
                      <p className="text-sm text-gray-600">
                        {formData.user.twoFactorEnabled ? "Two-factor authentication is enabled" : "Not enabled"}
                      </p>
                    </div>
                    <Badge variant={formData.user.twoFactorEnabled ? "default" : "secondary"}>
                      {formData.user.twoFactorEnabled ? "Enabled" : "Disabled"}
                    </Badge>
                  </div>
                  <Button variant={formData.user.twoFactorEnabled ? "destructive" : "default"}>
                    {formData.user.twoFactorEnabled ? "Disable 2FA" : "Enable 2FA"}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>API Access</CardTitle>
                  <CardDescription>Manage API keys for integrations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Active API Keys</Label>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between p-2 border rounded">
                        <div>
                          <p className="font-medium">Production Key</p>
                          <p className="text-sm text-gray-600">Created Jan 15, 2024</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  <Button variant="outline">
                    <Key className="w-4 h-4 mr-2" />
                    Generate New Key
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Login Sessions</CardTitle>
                  <CardDescription>Manage your active login sessions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">Current Session</p>
                        <p className="text-sm text-gray-600">Berlin, Germany • Chrome</p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <p className="font-medium">Mobile App</p>
                        <p className="text-sm text-gray-600">Last active 2 hours ago</p>
                      </div>
                      <Button variant="ghost" size="sm">
                        Revoke
                      </Button>
                    </div>
                  </div>
                  <Button variant="destructive" className="w-full">
                    Sign Out All Devices
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Data & Privacy</CardTitle>
                  <CardDescription>Control your data and privacy settings</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Download className="w-4 h-4 mr-2" />
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Settings className="w-4 h-4 mr-2" />
                    Privacy Settings
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="destructive" className="w-full justify-start">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete All Data
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete All Data</AlertDialogTitle>
                        <AlertDialogDescription>
                          This will permanently delete all your invoices, contacts, and account data. This action cannot
                          be undone.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700">Delete All Data</AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Current Plan</CardTitle>
                    <CardDescription>Manage your subscription and billing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{subscriptionData.plan} Plan</h3>
                        <p className="text-sm text-gray-600">
                          €{subscriptionData.amount}/{subscriptionData.billingCycle}
                        </p>
                      </div>
                      <Badge variant="default">{subscriptionData.status}</Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Invoices Used</p>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={(subscriptionData.invoicesUsed / subscriptionData.invoicesLimit) * 100}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium">
                            {subscriptionData.invoicesUsed}/{subscriptionData.invoicesLimit}
                          </span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Contacts Used</p>
                        <div className="flex items-center space-x-2">
                          <Progress
                            value={(subscriptionData.contactsUsed / subscriptionData.contactsLimit) * 100}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium">
                            {subscriptionData.contactsUsed}/{subscriptionData.contactsLimit}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <span>Next billing date</span>
                      <span className="font-medium">{new Date(subscriptionData.nextBilling).toLocaleDateString()}</span>
                    </div>

                    <div className="flex space-x-2">
                      <Button>Upgrade Plan</Button>
                      <Button variant="outline">Change Billing Cycle</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Manage your payment information</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <CreditCard className="w-4 h-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">•••• •••• •••• 4242</p>
                          <p className="text-sm text-gray-600">Expires 12/25</p>
                        </div>
                      </div>
                      <Badge variant="default">Primary</Badge>
                    </div>
                    <Button variant="outline">Add Payment Method</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Usage This Month</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm">Invoices Sent</span>
                      <span className="font-medium">23</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">API Calls</span>
                      <span className="font-medium">1,247</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm">Storage Used</span>
                      <span className="font-medium">2.3 GB</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Billing History</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Jan 2024</p>
                        <p className="text-sm text-gray-600">Professional Plan</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">€49.99</p>
                        <Button variant="ghost" size="sm">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Dec 2023</p>
                        <p className="text-sm text-gray-600">Professional Plan</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">€49.99</p>
                        <Button variant="ghost" size="sm">
                          <Download className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full bg-transparent">
                      View All Invoices
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Integrations Tab */}
          <TabsContent value="integrations" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>Peppol Network</span>
                  </CardTitle>
                  <CardDescription>Connected to the European e-invoicing network</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>Status</span>
                    <Badge variant="default">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Participant ID</span>
                    <span className="font-mono text-sm">{formData.company.peppolId}</span>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Test Connection
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span>Accounting Software</span>
                  </CardTitle>
                  <CardDescription>Connect your accounting software for seamless sync</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Building className="w-4 h-4 mr-2" />
                      Connect SAP
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Building className="w-4 h-4 mr-2" />
                      Connect QuickBooks
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Building className="w-4 h-4 mr-2" />
                      Connect Xero
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span>Payment Gateways</span>
                  </CardTitle>
                  <CardDescription>Enable online payments for your invoices</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Connect Stripe
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Connect PayPal
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Connect SEPA Direct Debit
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span>VAT Validation</span>
                  </CardTitle>
                  <CardDescription>Automatic VAT number validation service</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span>EU VIES Service</span>
                    <Badge variant="default">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Validations This Month</span>
                    <span className="font-medium">47</span>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    View Validation Log
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span>Document Storage</span>
                  </CardTitle>
                  <CardDescription>Connect cloud storage for document archiving</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Globe className="w-4 h-4 mr-2" />
                      Connect Google Drive
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Globe className="w-4 h-4 mr-2" />
                      Connect Dropbox
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Globe className="w-4 h-4 mr-2" />
                      Connect OneDrive
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertCircle className="w-5 h-5 text-yellow-500" />
                    <span>CRM Integration</span>
                  </CardTitle>
                  <CardDescription>Sync contacts with your CRM system</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="w-4 h-4 mr-2" />
                      Connect Salesforce
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="w-4 h-4 mr-2" />
                      Connect HubSpot
                    </Button>
                    <Button variant="outline" className="w-full justify-start bg-transparent">
                      <Users className="w-4 h-4 mr-2" />
                      Connect Pipedrive
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Verifactu Tab */}
          <TabsContent value="verifactu" className="space-y-6">
            <VerifactuSettings config={verifactuConfig} onConfigChange={setVerifactuConfig} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

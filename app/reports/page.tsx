"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Euro,
  Calendar,
  FileText,
  Download,
  BarChart3,
  PieChart,
  Activity,
} from "lucide-react"
import Link from "next/link"

// Mock data for reports
const reportData = {
  overview: {
    totalRevenue: 139800,
    totalInvoices: 44,
    avgInvoiceValue: 3177,
    paymentRate: 91.2,
    avgPaymentTime: 18,
    overdueAmount: 8450,
  },
  monthlyData: [
    { month: "Jan", revenue: 45600, invoices: 15, paid: 42300 },
    { month: "Feb", revenue: 38200, invoices: 12, paid: 35800 },
    { month: "Mar", revenue: 56000, invoices: 17, paid: 48200 },
  ],
  countryBreakdown: [
    { country: "DE", flag: "🇩🇪", revenue: 52400, invoices: 18, percentage: 37.5 },
    { country: "FR", flag: "🇫🇷", revenue: 31200, invoices: 11, percentage: 22.3 },
    { country: "IT", flag: "🇮🇹", revenue: 28600, invoices: 8, percentage: 20.5 },
    { country: "NL", flag: "🇳🇱", revenue: 19800, invoices: 5, percentage: 14.2 },
    { country: "CH", flag: "🇨🇭", revenue: 7800, invoices: 2, percentage: 5.5 },
  ],
  complianceMetrics: {
    peppolDeliveries: 38,
    validationErrors: 2,
    avgProcessingTime: 1.2,
    successRate: 95.5,
  },
}

export default function ReportsPage() {
  const [dateRange, setDateRange] = useState("3months")
  const [reportType, setReportType] = useState("overview")

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
                <h1 className="text-xl font-semibold">Reports & Analytics</h1>
                <p className="text-sm text-gray-600">Track your business performance and compliance</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1month">Last Month</SelectItem>
                  <SelectItem value="3months">Last 3 Months</SelectItem>
                  <SelectItem value="6months">Last 6 Months</SelectItem>
                  <SelectItem value="1year">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <Euro className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">€{reportData.overview.totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +12.5% from last period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Invoices</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.overview.totalInvoices}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="w-3 h-3 mr-1" />
                +8.2% from last period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.overview.paymentRate}%</div>
              <Progress value={reportData.overview.paymentRate} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Payment Time</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{reportData.overview.avgPaymentTime} days</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingDown className="w-3 h-3 mr-1" />
                -3 days improvement
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Reports */}
        <Tabs defaultValue="financial" className="space-y-6">
          <TabsList>
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="geographic">Geographic</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Monthly Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="w-5 h-5" />
                    <span>Monthly Revenue Trend</span>
                  </CardTitle>
                  <CardDescription>Revenue and invoice count over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {reportData.monthlyData.map((month, index) => (
                      <div key={month.month} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{month.month} 2024</span>
                          <div className="text-right">
                            <div className="font-semibold">€{month.revenue.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">{month.invoices} invoices</div>
                          </div>
                        </div>
                        <Progress value={(month.revenue / 60000) * 100} className="h-2" />
                        <div className="flex justify-between text-xs text-gray-600">
                          <span>Paid: €{month.paid.toLocaleString()}</span>
                          <span>{Math.round((month.paid / month.revenue) * 100)}% collected</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Invoice Status Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <PieChart className="w-5 h-5" />
                    <span>Invoice Status Breakdown</span>
                  </CardTitle>
                  <CardDescription>Current status of all invoices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>Paid</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">32 invoices</div>
                        <div className="text-sm text-gray-600">€126,400</div>
                      </div>
                    </div>
                    <Progress value={72.7} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <span>Pending</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">8 invoices</div>
                        <div className="text-sm text-gray-600">€21,200</div>
                      </div>
                    </div>
                    <Progress value={18.2} className="h-2" />

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <span>Overdue</span>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">4 invoices</div>
                        <div className="text-sm text-gray-600">€8,450</div>
                      </div>
                    </div>
                    <Progress value={9.1} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="geographic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue by Country</CardTitle>
                <CardDescription>Geographic distribution of your business</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.countryBreakdown.map((country) => (
                    <div key={country.country} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{country.flag}</span>
                          <span className="font-medium">{country.country}</span>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">€{country.revenue.toLocaleString()}</div>
                          <div className="text-sm text-gray-600">{country.invoices} invoices</div>
                        </div>
                      </div>
                      <Progress value={country.percentage} className="h-2" />
                      <div className="text-xs text-gray-600 text-right">{country.percentage}% of total revenue</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Metrics</CardTitle>
                  <CardDescription>E-invoicing compliance performance</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Peppol Deliveries</span>
                    <Badge variant="default">{reportData.complianceMetrics.peppolDeliveries}</Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Validation Errors</span>
                    <Badge variant={reportData.complianceMetrics.validationErrors > 0 ? "destructive" : "default"}>
                      {reportData.complianceMetrics.validationErrors}
                    </Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Success Rate</span>
                    <Badge variant="default">{reportData.complianceMetrics.successRate}%</Badge>
                  </div>

                  <div className="flex justify-between items-center">
                    <span>Avg Processing Time</span>
                    <Badge variant="outline">{reportData.complianceMetrics.avgProcessingTime}s</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Format Distribution</CardTitle>
                  <CardDescription>Invoice formats used by country</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>🇩🇪 XRechnung</span>
                    <span className="font-medium">18 invoices</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🇫🇷 Chorus Pro</span>
                    <span className="font-medium">11 invoices</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🇮🇹 FatturaPA</span>
                    <span className="font-medium">8 invoices</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🇳🇱 Peppol BIS</span>
                    <span className="font-medium">5 invoices</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🇨🇭 Standard</span>
                    <span className="font-medium">2 invoices</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Customers</CardTitle>
                  <CardDescription>By total invoice value</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Acme Corp GmbH</span>
                    <span>€45,600</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Innovation SpA</span>
                    <span>€38,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Tech Solutions SAS</span>
                    <span>€31,200</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Digital Services BV</span>
                    <span>€19,800</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Performance</CardTitle>
                  <CardDescription>Average days to payment</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>🇩🇪 Germany</span>
                    <span className="font-medium">15 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🇳🇱 Netherlands</span>
                    <span className="font-medium">18 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🇫🇷 France</span>
                    <span className="font-medium">22 days</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>🇮🇹 Italy</span>
                    <span className="font-medium">28 days</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Growth</CardTitle>
                  <CardDescription>Revenue growth rate</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>January</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>+15.2%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>February</span>
                    <div className="flex items-center text-red-600">
                      <TrendingDown className="w-4 h-4 mr-1" />
                      <span>-8.1%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>March</span>
                    <div className="flex items-center text-green-600">
                      <TrendingUp className="w-4 h-4 mr-1" />
                      <span>+22.4%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

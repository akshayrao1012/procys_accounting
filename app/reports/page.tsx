"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts"
import { CalendarIcon, Download, FileText, Euro, Users, TrendingUp, BarChart3, PieChartIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { ArrowRight } from 'lucide-react'

// Mock Data
const revenueData = [
  { month: "Jan", total: 12000, paid: 10000, pending: 2000 },
  { month: "Feb", total: 15000, paid: 13000, pending: 2000 },
  { month: "Mar", total: 13000, paid: 11000, pending: 2000 },
  { month: "Apr", total: 16000, paid: 14000, pending: 2000 },
  { month: "May", total: 18000, paid: 16000, pending: 2000 },
  { month: "Jun", total: 17000, paid: 15000, pending: 2000 },
]

const invoiceStatusData = [
  { name: "Paid", value: 120, color: "#10b981" },
  { name: "Pending", value: 30, color: "#f59e0b" },
  { name: "Overdue", value: 10, color: "#ef4444" },
  { name: "Draft", value: 5, color: "#6b7280" },
]

const topClientsData = [
  { id: 1, name: "Acme Corp S.L.", totalBilled: 29400, paid: 28000, pending: 1400 },
  { id: 2, name: "Tech Solutions S.A.", totalBilled: 15120, paid: 14000, pending: 1120 },
  { id: 3, name: "Global Innovations GmbH", totalBilled: 10500, paid: 9000, pending: 1500 },
  { id: 4, name: "Future Systems Inc.", totalBilled: 8200, paid: 8200, pending: 0 },
  { id: 5, name: "Creative Minds Agency", totalBilled: 7000, paid: 6500, pending: 500 },
]

const expenseCategoryData = [
  { name: "Software Subscriptions", value: 2500, color: "#3b82f6" },
  { name: "Office Supplies", value: 800, color: "#8b5cf6" },
  { name: "Travel", value: 1200, color: "#ec4899" },
  { name: "Marketing", value: 1500, color: "#f97316" },
  { name: "Utilities", value: 600, color: "#14b8a6" },
]

export default function ReportsPage() {
  const [reportType, setReportType] = useState("revenue")
  const [dateRange, setDateRange] = useState<Date | undefined>(new Date())

  const handleDownloadReport = () => {
    alert(`Downloading ${reportType} report for ${dateRange ? format(dateRange, "MMM yyyy") : "selected period"}.`)
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
                <h1 className="text-xl font-semibold">Reports</h1>
                <p className="text-sm text-gray-600">Generate and analyze your financial reports</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button onClick={handleDownloadReport}>
                <Download className="w-4 h-4 mr-2" />
                Download Report
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Report Filters</CardTitle>
            <CardDescription>Select the type of report and date range</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="reportType">Report Type</Label>
              <Select value={reportType} onValueChange={setReportType}>
                <SelectTrigger id="reportType">
                  <SelectValue placeholder="Select report type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="revenue">Revenue Overview</SelectItem>
                  <SelectItem value="invoiceStatus">Invoice Status Breakdown</SelectItem>
                  <SelectItem value="topClients">Top Clients by Revenue</SelectItem>
                  <SelectItem value="expenses">Expense Categories</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateRange">Date Range</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateRange && "text-muted-foreground",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateRange ? format(dateRange, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar mode="single" selected={dateRange} onSelect={setDateRange} initialFocus />
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>

        {reportType === "revenue" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Revenue Overview</span>
              </CardTitle>
              <CardDescription>Monthly total, paid, and pending revenue.</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={(value) => `€${value}`} />
                  <Tooltip formatter={(value: number) => `€${value.toLocaleString()}`} />
                  <Legend />
                  <Bar dataKey="total" fill="#3b82f6" name="Total Revenue" />
                  <Bar dataKey="paid" fill="#10b981" name="Paid Revenue" />
                  <Bar dataKey="pending" fill="#f59e0b" name="Pending Revenue" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {reportType === "invoiceStatus" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChartIcon className="w-5 h-5" />
                <span>Invoice Status Breakdown</span>
              </CardTitle>
              <CardDescription>Distribution of invoices by their current status.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={invoiceStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {invoiceStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `${value.toLocaleString()} invoices`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {reportType === "topClients" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>Top Clients by Revenue</span>
              </CardTitle>
              <CardDescription>Clients with the highest total billed amounts.</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client Name</TableHead>
                    <TableHead>Total Billed</TableHead>
                    <TableHead>Paid</TableHead>
                    <TableHead>Pending</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topClientsData.map((client) => (
                    <TableRow key={client.id}>
                      <TableCell className="font-medium">{client.name}</TableCell>
                      <TableCell>€{client.totalBilled.toLocaleString()}</TableCell>
                      <TableCell className="text-green-600">€{client.paid.toLocaleString()}</TableCell>
                      <TableCell className="text-yellow-600">€{client.pending.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {reportType === "expenses" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Euro className="w-5 h-5" />
                <span>Expense Categories</span>
              </CardTitle>
              <CardDescription>Breakdown of expenses by category.</CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={expenseCategoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {expenseCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => `€${value.toLocaleString()}`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  )
}

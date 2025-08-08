"use client"

import React from 'react';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowLeft, Plus, Search, Filter, MoreHorizontal, Eye, Edit, Trash2, Send } from 'lucide-react'
import Link from "next/link"

// Mock data for invoices
const mockInvoices = [
  { id: 'INV-2024-156', client: 'Acme Corp S.L.', amount: 2450.00, date: '2024-07-18', dueDate: '2024-08-17', status: 'paid' },
  { id: 'INV-2024-155', client: 'Tech Solutions S.A.', amount: 1890.50, date: '2024-07-17', dueDate: '2024-08-16', status: 'pending' },
  { id: 'INV-2024-154', client: 'Innovation SpA', amount: 3200.00, date: '2024-06-16', dueDate: '2024-07-16', status: 'overdue' },
  { id: 'INV-2024-153', client: 'Global Exports', amount: 1500.75, date: '2024-07-15', dueDate: '2024-08-14', status: 'pending' },
  { id: 'INV-2024-152', client: 'Acme Corp S.L.', amount: 1800.00, date: '2024-06-12', dueDate: '2024-07-12', status: 'paid' },
  { id: 'INV-2024-151', client: 'Creative Minds', amount: 950.00, date: '2024-07-10', dueDate: '2024-08-09', status: 'draft' },
  { id: 'INV-2024-150', client: 'Tech Solutions S.A.', amount: 2100.00, date: '2024-06-05', dueDate: '2024-07-05', status: 'paid' },
  { id: 'INV-2024-149', client: 'Market Leaders', amount: 4500.00, date: '2024-05-20', dueDate: '2024-06-19', status: 'overdue' },
];

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

const InvoicesPage = () => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredInvoices = mockInvoices.filter(invoice =>
    invoice.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    invoice.client.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
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
                <h1 className="text-xl font-semibold">Invoices</h1>
                <p className="text-sm text-gray-600">Manage all your invoices in one place</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button asChild>
                <Link href="/invoices/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Invoice
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Card>
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
            <CardDescription>A complete list of all your invoices.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2 mb-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Search by invoice # or client..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Invoice #</TableHead>
                  <TableHead>Client</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium">{invoice.id}</TableCell>
                    <TableCell>{invoice.client}</TableCell>
                    <TableCell>€{invoice.amount.toFixed(2)}</TableCell>
                    <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                    <TableCell>{new Date(invoice.dueDate).toLocaleDateString()}</TableCell>
                    <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            View PDF
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="w-4 h-4 mr-2" />
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
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
      </div>
    </div>
  );
};

export default InvoicesPage;

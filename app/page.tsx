"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Shield,
  CheckCircle,
  Lock,
  Hash,
  FileText,
  Clock,
  Users,
  Database,
  QrCode,
  AlertTriangle,
  Calendar,
  Send,
  Eye,
  ArrowRight,
  Award,
  Zap,
} from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">P</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Procys Accounting</h1>
                <p className="text-sm text-gray-600">VeriFactu Certified Platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Badge variant="default" className="bg-green-600">
                <Award className="w-3 h-3 mr-1" />
                AEAT Certified
              </Badge>
              <Button asChild>
                <Link href="/dashboard">
                  <Shield className="w-4 h-4 mr-2" />
                  Access Platform
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <div className="flex justify-center space-x-2 mb-6">
            <Badge variant="outline" className="bg-blue-50 border-blue-200">
              <Shield className="w-3 h-3 mr-1" />
              VeriFactu Compliant
            </Badge>
            <Badge variant="outline" className="bg-green-50 border-green-200">
              <CheckCircle className="w-3 h-3 mr-1" />
              Real Decreto 1007/2023
            </Badge>
            <Badge variant="outline" className="bg-purple-50 border-purple-200">
              <Lock className="w-3 h-3 mr-1" />
              Immutable Records
            </Badge>
          </div>

          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Spanish Tax Compliant
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
              Invoicing Platform
            </span>
          </h1>

          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Complete VeriFactu compliance with immutable invoice storage, real-time AEAT integration, and tamper-proof
            audit trails. Built specifically for Spanish tax regulations.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-gradient-to-r from-blue-600 to-green-600">
              <Link href="/dashboard">
                <Zap className="w-5 h-5 mr-2" />
                Start Creating Invoices
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/demo">
                <Eye className="w-5 h-5 mr-2" />
                View Demo
              </Link>
            </Button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Hash className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Cryptographic Security</h3>
              <p className="text-gray-600">SHA-256 hashing with RSA-2048 digital signatures</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Real-time AEAT</h3>
              <p className="text-gray-600">Automatic submission to Spanish Tax Authority</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Database className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Immutable Storage</h3>
              <p className="text-gray-600">WORM-compliant audit trails and invoice records</p>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Complete VeriFactu Compliance</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Every feature required by Spanish tax law, implemented with enterprise-grade security
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tamper-proof Log */}
            <Card className="border-2 hover:border-blue-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Database className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Tamper-proof Log</CardTitle>
                    <CardDescription>Bitácora de eventos</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Non-modifiable event log</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>WORM-compliant storage</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Complete audit trail</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Sequential Numbering */}
            <Card className="border-2 hover:border-green-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Hash className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Sequential Numbering</CardTitle>
                    <CardDescription>No gaps allowed</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Chronologically ordered</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Non-repetitive numbers</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>No backdating allowed</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* VeriFactu XML */}
            <Card className="border-2 hover:border-purple-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <FileText className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">VeriFactu XML</CardTitle>
                    <CardDescription>AEAT specifications</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Complete tax breakdown</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Unique UUID per invoice</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Digital hash included</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Digital Signatures */}
            <Card className="border-2 hover:border-orange-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Lock className="w-5 h-5 text-orange-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Digital Signatures</CardTitle>
                    <CardDescription>Hash chain linking</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>SHA-256 cryptographic hash</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>RSA-2048 signatures</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Invoice chain linking</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Real-time AEAT */}
            <Card className="border-2 hover:border-red-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <Send className="w-5 h-5 text-red-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">Real-time AEAT</CardTitle>
                    <CardDescription>Automatic submission</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Instant submission</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Status tracking</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Error handling & retry</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* QR Codes */}
            <Card className="border-2 hover:border-indigo-200 transition-colors">
              <CardHeader>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center">
                    <QrCode className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">QR Verification</CardTitle>
                    <CardDescription>AEAT verification</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Compressed invoice data</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>AEAT verification link</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Verification label</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Technical Specifications</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Enterprise-grade security and compliance features</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Security & Integrity</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center mt-0.5">
                    <Hash className="w-3 h-3 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Cryptographic Hashing</h4>
                    <p className="text-gray-600 text-sm">
                      SHA-256 hash generation with chain linking for tamper detection
                    </p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                    <Lock className="w-3 h-3 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Digital Signatures</h4>
                    <p className="text-gray-600 text-sm">RSA-2048 digital signatures with certificate validation</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center mt-0.5">
                    <Clock className="w-3 h-3 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">NTP Synchronization</h4>
                    <p className="text-gray-600 text-sm">Network Time Protocol sync to prevent backdating fraud</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center mt-0.5">
                    <Database className="w-3 h-3 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">WORM Storage</h4>
                    <p className="text-gray-600 text-sm">Write Once, Read Many compliant immutable storage</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Compliance & Regulations</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                    <Shield className="w-3 h-3 text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Real Decreto 1007/2023</h4>
                    <p className="text-gray-600 text-sm">Full compliance with VeriFactu regulation requirements</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-100 rounded-full flex items-center justify-center mt-0.5">
                    <AlertTriangle className="w-3 h-3 text-yellow-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">Ley Antifraude 11/2021</h4>
                    <p className="text-gray-600 text-sm">Anti-fraud law compliance with sequential numbering</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-indigo-100 rounded-full flex items-center justify-center mt-0.5">
                    <FileText className="w-3 h-3 text-indigo-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">FacturaE v3.2.2</h4>
                    <p className="text-gray-600 text-sm">Standard XML format for B2G transactions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-pink-100 rounded-full flex items-center justify-center mt-0.5">
                    <Calendar className="w-3 h-3 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900">6-Year Retention</h4>
                    <p className="text-gray-600 text-sm">Automatic data retention for tax audit requirements</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Spanish Businesses</h2>
            <p className="text-lg text-gray-600">Join thousands of companies using VeriFactu compliant invoicing</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">10,000+</div>
              <div className="text-gray-600">Invoices Generated</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">99.8%</div>
              <div className="text-gray-600">AEAT Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-gray-600">Compliance Score</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600">System Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-green-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start Creating VeriFactu Compliant Invoices Today</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join the future of Spanish invoicing with complete tax compliance, immutable records, and real-time AEAT
            integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/dashboard">
                <Shield className="w-5 h-5 mr-2" />
                Access Platform
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/contact">
                <Users className="w-5 h-5 mr-2" />
                Contact Sales
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="text-xl font-bold">Procys Accounting</span>
              </div>
              <p className="text-gray-400 text-sm">
                VeriFactu certified invoicing platform for Spanish businesses. Complete tax compliance with enterprise
                security.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Platform</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/dashboard" className="hover:text-white">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link href="/invoices" className="hover:text-white">
                    Invoices
                  </Link>
                </li>
                <li>
                  <Link href="/contacts" className="hover:text-white">
                    Contacts
                  </Link>
                </li>
                <li>
                  <Link href="/reports" className="hover:text-white">
                    Reports
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Compliance</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <span>VeriFactu Certified</span>
                </li>
                <li>
                  <span>Real Decreto 1007/2023</span>
                </li>
                <li>
                  <span>Ley Antifraude 11/2021</span>
                </li>
                <li>
                  <span>FacturaE v3.2.2</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/help" className="hover:text-white">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-white">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-white">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/status" className="hover:text-white">
                    System Status
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <Separator className="my-8 bg-gray-800" />

          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Procys Accounting. All rights reserved. VeriFactu Certified Platform.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <Badge variant="outline" className="border-green-600 text-green-400">
                <CheckCircle className="w-3 h-3 mr-1" />
                AEAT Certified
              </Badge>
              <Badge variant="outline" className="border-blue-600 text-blue-400">
                <Shield className="w-3 h-3 mr-1" />
                ISO 27001
              </Badge>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

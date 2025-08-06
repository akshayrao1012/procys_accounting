"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Shield, FileText, CheckCircle, AlertTriangle, Download, Upload, Key, Clock, Database, Info } from 'lucide-react'

interface VerifactuSettingsProps {
  config: {
    enabled: boolean
    aeatSubmissionEnabled: boolean
    developerTaxId: string
    developerName: string
    softwareVersion: string
    certificateNumber?: string
    complianceDeclaration: {
      date: string
      version: string
      responsible: string
    }
  }
  onConfigChange: (config: any) => void
}

export function VerifactuSettings({ config, onConfigChange }: VerifactuSettingsProps) {
  const [isGeneratingKeys, setIsGeneratingKeys] = useState(false)
  const [showDeclaration, setShowDeclaration] = useState(false)

  const handleConfigChange = (field: string, value: any) => {
    onConfigChange({
      ...config,
      [field]: value,
    })
  }

  const generateKeyPair = async () => {
    setIsGeneratingKeys(true)
    // Simulate key generation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsGeneratingKeys(false)
    // In real implementation, this would generate RSA key pair
  }

  const complianceDeclarationText = `
DECLARACIÓN DE RESPONSABILIDAD - VERIFACTU

Por la presente, ${config.developerName} (NIF: ${config.developerTaxId}), 
como desarrollador del software "Procys Accounting" versión ${config.softwareVersion}, 
DECLARA BAJO SU RESPONSABILIDAD que:

1. El software cumple con todos los requisitos técnicos establecidos en el 
   Reglamento de Verifactu (Real Decreto 1007/2023).

2. Las facturas generadas por este software incluyen:
   - Numeración secuencial única e inmutable
   - Marca de tiempo de expedición
   - Hash criptográfico de integridad
   - Firma digital para autenticación
   - Referencia al hash de la factura anterior

3. El software implementa un sistema de trazabilidad completo (bitácora) 
   que registra todas las acciones realizadas sobre las facturas.

4. Los registros de facturas son inmutables una vez emitidos, impidiendo 
   su modificación o eliminación.

5. El software permite la comunicación opcional con la AEAT a través de 
   los servicios web de Verifactu.

6. Se mantiene un control de versiones del software y se garantiza el 
   cumplimiento normativo en cada actualización.

Fecha de declaración: ${config.complianceDeclaration.date}
Responsable: ${config.complianceDeclaration.responsible}
Versión del software: ${config.complianceDeclaration.version}

Esta declaración se emite en cumplimiento del artículo 11 del Reglamento 
de Verifactu y tiene validez legal conforme a la normativa española.
  `

  return (
    <div className="space-y-6">
      {/* Verifactu Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>Verifactu Compliance Status</span>
          </CardTitle>
          <CardDescription>Spanish tax authority compliance for invoice integrity and traceability</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="verifactuEnabled">Enable Verifactu Compliance</Label>
              <p className="text-sm text-gray-600">Activate immutable invoice records and digital signatures</p>
            </div>
            <Switch
              id="verifactuEnabled"
              checked={config.enabled}
              onCheckedChange={(checked) => handleConfigChange("enabled", checked)}
            />
          </div>

          {config.enabled && (
            <>
              <Separator />
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Invoice Immutability</span>
                  <Badge variant="default">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Digital Signatures</span>
                  <Badge variant="default">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Audit Trail (Bitácora)</span>
                  <Badge variant="default">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Sequential Numbering</span>
                  <Badge variant="default">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Active
                  </Badge>
                </div>
              </div>
            </>
          )}
        </CardContent>
      </Card>

      {config.enabled && (
        <>
          {/* Developer Information */}
          <Card>
            <CardHeader>
              <CardTitle>Developer Information</CardTitle>
              <CardDescription>Required information for AEAT submissions and compliance declarations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="developerName">Developer Name/Company</Label>
                  <Input
                    id="developerName"
                    value={config.developerName}
                    onChange={(e) => handleConfigChange("developerName", e.target.value)}
                    placeholder="Procys Technologies S.L."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="developerTaxId">Developer Tax ID (NIF/CIF)</Label>
                  <Input
                    id="developerTaxId"
                    value={config.developerTaxId}
                    onChange={(e) => handleConfigChange("developerTaxId", e.target.value)}
                    placeholder="B12345678"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="softwareVersion">Software Version</Label>
                  <Input
                    id="softwareVersion"
                    value={config.softwareVersion}
                    onChange={(e) => handleConfigChange("softwareVersion", e.target.value)}
                    placeholder="1.0.0"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="certificateNumber">AEAT Certificate Number (Optional)</Label>
                  <Input
                    id="certificateNumber"
                    value={config.certificateNumber || ""}
                    onChange={(e) => handleConfigChange("certificateNumber", e.target.value)}
                    placeholder="CERT-2024-001"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AEAT Integration */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <FileText className="w-5 h-5" />
                <span>AEAT Integration</span>
              </CardTitle>
              <CardDescription>Configure automatic submission to Spanish Tax Authority (opt-in)</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  AEAT submission is optional. You can enable it to automatically report invoices to the Spanish Tax
                  Authority's Verifactu system.
                </AlertDescription>
              </Alert>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="aeatSubmission">Enable AEAT Submission</Label>
                  <p className="text-sm text-gray-600">Automatically submit invoices to AEAT Verifactu API</p>
                </div>
                <Switch
                  id="aeatSubmission"
                  checked={config.aeatSubmissionEnabled}
                  onCheckedChange={(checked) => handleConfigChange("aeatSubmissionEnabled", checked)}
                />
              </div>

              {config.aeatSubmissionEnabled && (
                <div className="space-y-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Real-time invoice submission enabled</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Submission tracking and error handling active</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Database className="w-4 h-4 text-purple-500" />
                    <span className="text-sm">Offline mode with queued sync available</span>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Digital Signatures */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Key className="w-5 h-5" />
                <span>Digital Signatures</span>
              </CardTitle>
              <CardDescription>Manage cryptographic keys for invoice signing and verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Private Key Status</Label>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Configured
                    </Badge>
                    <span className="text-sm text-gray-600">RSA-2048</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Public Key Status</Label>
                  <div className="flex items-center space-x-2">
                    <Badge variant="default">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Available
                    </Badge>
                    <span className="text-sm text-gray-600">For verification</span>
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button variant="outline" onClick={generateKeyPair} disabled={isGeneratingKeys}>
                  <Key className="w-4 h-4 mr-2" />
                  {isGeneratingKeys ? "Generating..." : "Generate New Key Pair"}
                </Button>
                <Button variant="outline">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Keys
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Export Public Key
                </Button>
              </div>

              <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  Keep your private key secure and backed up. Loss of the private key will prevent invoice verification.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Compliance Declaration */}
          <Card>
            <CardHeader>
              <CardTitle>Compliance Declaration</CardTitle>
              <CardDescription>Declaration of Responsibility as required by Verifactu regulations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="declarationDate">Declaration Date</Label>
                  <Input
                    id="declarationDate"
                    type="date"
                    value={config.complianceDeclaration.date}
                    onChange={(e) =>
                      handleConfigChange("complianceDeclaration", {
                        ...config.complianceDeclaration,
                        date: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="responsible">Responsible Person</Label>
                  <Input
                    id="responsible"
                    value={config.complianceDeclaration.responsible}
                    onChange={(e) =>
                      handleConfigChange("complianceDeclaration", {
                        ...config.complianceDeclaration,
                        responsible: e.target.value,
                      })
                    }
                    placeholder="John Doe, CTO"
                  />
                </div>
              </div>

              <div className="flex space-x-2">
                <Dialog open={showDeclaration} onOpenChange={setShowDeclaration}>
                  <DialogTrigger asChild>
                    <Button variant="outline">
                      <FileText className="w-4 h-4 mr-2" />
                      View Declaration
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Compliance Declaration - Verifactu</DialogTitle>
                      <DialogDescription>
                        Legal declaration of software compliance with Spanish regulations
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <Textarea
                        value={complianceDeclarationText}
                        readOnly
                        className="min-h-[400px] font-mono text-sm"
                      />
                      <div className="flex space-x-2">
                        <Button onClick={() => navigator.clipboard.writeText(complianceDeclarationText)}>
                          Copy Declaration
                        </Button>
                        <Button variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          Download PDF
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Generate Certificate
                </Button>
              </div>

              <Alert>
                <Info className="h-4 w-4" />
                <AlertDescription>
                  This declaration must be maintained and presented during tax audits. It certifies that your software
                  complies with Verifactu requirements.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          {/* Audit & Compliance Reports */}
          <Card>
            <CardHeader>
              <CardTitle>Audit & Compliance Reports</CardTitle>
              <CardDescription>Generate reports for tax audits and compliance verification</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">156</div>
                  <div className="text-sm text-gray-600">Total Invoices</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">142</div>
                  <div className="text-sm text-gray-600">AEAT Submitted</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">624</div>
                  <div className="text-sm text-gray-600">Audit Log Entries</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-600">100%</div>
                  <div className="text-sm text-gray-600">Integrity Verified</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Audit Trail Report
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Compliance Summary
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  AEAT Submission Log
                </Button>
                <Button variant="outline">
                  <Download className="w-4 h-4 mr-2" />
                  Integrity Verification
                </Button>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

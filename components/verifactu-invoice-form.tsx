"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Shield, CheckCircle, AlertTriangle, Clock, Hash, FileText, Send, Eye, Download, QrCode } from 'lucide-react'
import { QRCodePopup } from "./qr-code-popup"
import { VeriFactuPDFGenerator } from "@/lib/pdf-generator"

interface VerifactuInvoiceFormProps {
  invoiceData: any
  onInvoiceCreated: (verifactuData: any) => void
  verifactuEnabled: boolean
}

export function VerifactuInvoiceForm({ invoiceData, onInvoiceCreated, verifactuEnabled }: VerifactuInvoiceFormProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [processingStep, setProcessingStep] = useState(0)
  const [verifactuData, setVerifactuData] = useState<any>(null)
  const [showXMLPreview, setShowXMLPreview] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [aeatSubmissionStatus, setAeatSubmissionStatus] = useState<"idle" | "submitting" | "success" | "failed">("idle")

  const processingSteps = [
    "Generating sequential number",
    "Creating cryptographic hash",
    "Generating digital signature",
    "Creating Verifactu XML",
    "Logging audit entry",
    "Submitting to AEAT (optional)",
  ]

  const handleCreateVerifactuInvoice = async () => {
    if (!verifactuEnabled) {
      onInvoiceCreated(null)
      return
    }

    setIsProcessing(true)
    setProcessingStep(0)

    try {
      // Step 1: Generate sequential number
      await new Promise((resolve) => setTimeout(resolve, 500))
      setProcessingStep(1)

      // Step 2: Create cryptographic hash
      await new Promise((resolve) => setTimeout(resolve, 800))
      const hash = `sha256:${Math.random().toString(36).substring(2, 15)}...`
      setProcessingStep(2)

      // Step 3: Generate digital signature
      await new Promise((resolve) => setTimeout(resolve, 1000))
      const signature = `rsa:${Math.random().toString(36).substring(2, 20)}...`
      setProcessingStep(3)

      // Step 4: Create Verifactu XML
      await new Promise((resolve) => setTimeout(resolve, 600))
      const xmlData = generateMockXML(invoiceData)
      setProcessingStep(4)

      // Step 5: Log audit entry
      await new Promise((resolve) => setTimeout(resolve, 400))
      setProcessingStep(5)

      const mockVerifactuData = {
        id: invoiceData.invoiceNumber,
        uuid: crypto.randomUUID(),
        sequentialNumber: Math.floor(Math.random() * 1000) + 1,
        timestamp: new Date().toISOString(),
        previousHash: "sha256:prev123...",
        hash,
        digitalSignature: signature,
        xmlData,
        qrCodeData: {
          invoiceId: invoiceData.invoiceNumber,
          nif: invoiceData.companyVatId || "DE123456789",
          amount: invoiceData.total || 1210,
          date: invoiceData.date || new Date().toISOString().split("T")[0],
          hash: hash.substring(7, 23), // Remove 'sha256:' prefix and truncate
          aeatUrl: `https://sede.agenciatributaria.gob.es/Sede/verificafactu/consulta?nif=${invoiceData.companyVatId || "DE123456789"}&num=${Math.floor(Math.random() * 1000) + 1}&fecha=${invoiceData.date || new Date().toISOString().split("T")[0]}&importe=${invoiceData.total || 1210}`,
        },
        aeatSubmissionStatus: "pending" as const,
        integrityVerified: true,
        auditLogId: `audit-${Date.now()}`,
        ntpSyncTimestamp: new Date().toISOString(),
      }

      setVerifactuData(mockVerifactuData)

      // Step 6: Submit to AEAT (if enabled)
      setAeatSubmissionStatus("submitting")
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Simulate random success/failure
      const submissionSuccess = Math.random() > 0.2
      setAeatSubmissionStatus(submissionSuccess ? "success" : "failed")

      if (submissionSuccess) {
        mockVerifactuData.aeatSubmissionStatus = "submitted"
        mockVerifactuData.aeatSubmissionId = `AEAT-${Date.now()}`
        mockVerifactuData.aeatSubmissionTimestamp = new Date().toISOString()
      } else {
        mockVerifactuData.aeatSubmissionStatus = "failed"
        mockVerifactuData.aeatErrorMessage = "Connection timeout to AEAT servers"
      }

      onInvoiceCreated(mockVerifactuData)
    } catch (error) {
      console.error("Verifactu processing failed:", error)
    } finally {
      setIsProcessing(false)
    }
  }

  const generateMockXML = (data: any) => {
    return `<?xml version="1.0" encoding="UTF-8"?>
<RegistroFacturacion xmlns="https://www2.agenciatributaria.gob.es/static_files/common/internet/dep/aplicaciones/es/aeat/ssii/fact/ws/RegistroLRFacturasEmitidas.xsd">
  <Cabecera>
    <IDVersionSii>1.1</IDVersionSii>
    <Titular>
      <NombreRazon>${data.companyName || "Acme Corporation GmbH"}</NombreRazon>
      <NIF>${data.companyVatId || "DE123456789"}</NIF>
    </Titular>
    <TipoComunicacion>A0</TipoComunicacion>
  </Cabecera>
  
  <RegistroLRFacturasEmitidas>
    <PeriodoLiquidacion>
      <Ejercicio>${new Date().getFullYear()}</Ejercicio>
      <Periodo>${String(new Date().getMonth() + 1).padStart(2, "0")}</Periodo>
    </PeriodoLiquidacion>
    
    <IDFactura>
      <IDEmisorFactura>${data.companyVatId || "DE123456789"}</IDEmisorFactura>
      <NumSerieFacturaEmisor>${data.invoiceNumber}</NumSerieFacturaEmisor>
      <FechaExpedicionFacturaEmisor>${data.date || new Date().toISOString().split("T")[0]}</FechaExpedicionFacturaEmisor>
    </IDFactura>
    
    <FacturaExpedida>
      <TipoFactura>F1</TipoFactura>
      <ClaveRegimenEspecialOTrascendencia>01</ClaveRegimenEspecialOTrascendencia>
      <DescripcionOperacion>Servicios profesionales</DescripcionOperacion>
      
      <Contraparte>
        <NombreRazon>${data.clientName || "Cliente Ejemplo S.L."}</NombreRazon>
        <NIF>${data.clientVatId || "ES987654321"}</NIF>
      </Contraparte>
      
      <TipoDesglose>
        <DesgloseFactura>
          <Sujeta>
            <NoExenta>
              <TipoNoExenta>S1</TipoNoExenta>
              <DesgloseIVA>
                <DetalleIVA>
                  <TipoImpositivo>21.00</TipoImpositivo>
                  <BaseImponible>${data.subtotal || 1000}</BaseImponible>
                  <CuotaImpuesto>${data.vatAmount || 210}</CuotaImpuesto>
                </DetalleIVA>
              </DesgloseIVA>
            </NoExenta>
          </Sujeta>
        </DesgloseFactura>
      </TipoDesglose>
      
      <ImporteTotal>${data.total || 1210}</ImporteTotal>
      
      <DatosVeriFactu>
        <UUID>${verifactuData?.uuid || crypto.randomUUID()}</UUID>
        <NumeroSecuencial>${verifactuData?.sequentialNumber || Math.floor(Math.random() * 1000) + 1}</NumeroSecuencial>
        <FechaHoraGeneracion>${new Date().toISOString()}</FechaHoraGeneracion>
        <HashFactura>${verifactuData?.hash || "sha256:mock-hash"}</HashFactura>
        <HashFacturaAnterior>${verifactuData?.previousHash || ""}</HashFacturaAnterior>
        <FirmaDigital>${verifactuData?.digitalSignature || "rsa:mock-signature"}</FirmaDigital>
        <SincronizacionNTP>${new Date().toISOString()}</SincronizacionNTP>
      </DatosVeriFactu>
    </FacturaExpedida>
  </RegistroLRFacturasEmitidas>
</RegistroFacturacion>`
  }

  const handleViewPDF = async () => {
    if (!verifactuData) return

    try {
      const pdfGenerator = new VeriFactuPDFGenerator()
      const pdfBlob = await pdfGenerator.generateVeriFactuPDF({
        invoice: invoiceData,
        verifactuData,
        qrCodeData: verifactuData.qrCodeData,
      })

      // Create download link
      const url = URL.createObjectURL(pdfBlob)
      const link = document.createElement("a")
      link.href = url
      link.download = `factura-verifactu-${invoiceData.invoiceNumber}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error generating PDF:", error)
    }
  }

  const handleDownloadXML = () => {
    if (!verifactuData?.xmlData) return

    const blob = new Blob([verifactuData.xmlData], { type: "application/xml" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = `facturae-${invoiceData.invoiceNumber}.xml`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleShowQRCode = () => {
    setShowQRCode(true)
  }

  useEffect(() => {
    if (verifactuEnabled) {
      handleCreateVerifactuInvoice()
    }
  }, [verifactuEnabled])

  if (!verifactuEnabled) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-gray-400" />
            <span>Verifactu Compliance</span>
          </CardTitle>
          <CardDescription>
            Verifactu compliance is disabled. Enable it in settings for Spanish tax compliance.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This invoice will be created without Verifactu compliance features. To enable immutable records and AEAT
              integration, activate Verifactu in your settings.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Processing Status */}
      {isProcessing && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-blue-500 animate-spin" />
              <span>Creating Verifactu-Compliant Invoice</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>
                  Processing step {processingStep + 1} of {processingSteps.length}
                </span>
                <span>{Math.round(((processingStep + 1) / processingSteps.length) * 100)}%</span>
              </div>
              <Progress value={((processingStep + 1) / processingSteps.length) * 100} />
              <p className="text-sm text-gray-600">{processingSteps[processingStep]}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verifactu Data Display */}
      {verifactuData && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-500" />
              <span>Verifactu Compliance Data</span>
            </CardTitle>
            <CardDescription>Invoice created with full Verifactu compliance and integrity protection</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Compliance Status */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">Immutable Record</p>
                  <p className="text-xs text-gray-600">Protected</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Hash className="w-4 h-4 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">Digital Signature</p>
                  <p className="text-xs text-gray-600">Verified</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4 text-purple-500" />
                <div>
                  <p className="text-sm font-medium">Sequential #</p>
                  <p className="text-xs text-gray-600">{verifactuData.sequentialNumber}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <QrCode className="w-4 h-4 text-orange-500" />
                <div>
                  <p className="text-sm font-medium">QR Code</p>
                  <p className="text-xs text-gray-600">Generated</p>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium">Invoice Hash:</p>
                  <p className="font-mono text-xs text-gray-600 break-all">{verifactuData.hash}</p>
                </div>
                <div>
                  <p className="font-medium">Previous Hash:</p>
                  <p className="font-mono text-xs text-gray-600 break-all">{verifactuData.previousHash}</p>
                </div>
                <div>
                  <p className="font-medium">Timestamp:</p>
                  <p className="text-xs text-gray-600">{new Date(verifactuData.timestamp).toLocaleString()}</p>
                </div>
                <div>
                  <p className="font-medium">Certificate ID:</p>
                  <p className="font-mono text-xs text-gray-600">CERT-2024-001</p>
                </div>
              </div>
            </div>

            {/* AEAT Submission Status */}
            <div className="space-y-3">
              <h4 className="font-medium">AEAT Submission Status</h4>
              <div className="flex items-center space-x-2">
                {aeatSubmissionStatus === "submitting" && (
                  <>
                    <Clock className="w-4 h-4 text-blue-500 animate-spin" />
                    <span className="text-sm">Submitting to AEAT...</span>
                  </>
                )}
                {aeatSubmissionStatus === "success" && (
                  <>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm">Successfully submitted to AEAT</span>
                    <Badge variant="default">ID: {verifactuData.aeatSubmissionId}</Badge>
                  </>
                )}
                {aeatSubmissionStatus === "failed" && (
                  <>
                    <AlertTriangle className="w-4 h-4 text-red-500" />
                    <span className="text-sm">AEAT submission failed</span>
                    <Badge variant="destructive">Error</Badge>
                  </>
                )}
              </div>

              {verifactuData.aeatErrorMessage && (
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>{verifactuData.aeatErrorMessage}</AlertDescription>
                </Alert>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" onClick={handleViewPDF}>
                <Eye className="w-4 h-4 mr-2" />
                View PDF
              </Button>
              <Button variant="outline" onClick={handleDownloadXML}>
                <Download className="w-4 h-4 mr-2" />
                Download FacturaE XML
              </Button>
              <Button variant="outline" onClick={handleShowQRCode}>
                <QrCode className="w-4 h-4 mr-2" />
                Show QR Code
              </Button>
              <Button variant="outline" onClick={() => setShowXMLPreview(true)}>
                <FileText className="w-4 h-4 mr-2" />
                Audit Trail
              </Button>
              {aeatSubmissionStatus === "failed" && (
                <Button variant="outline">
                  <Send className="w-4 h-4 mr-2" />
                  Retry AEAT Submission
                </Button>
              )}
              <Button>
                <CheckCircle className="w-4 h-4 mr-2" />
                Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* XML Preview Dialog */}
      <Dialog open={showXMLPreview} onOpenChange={setShowXMLPreview}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Verifactu XML Data</DialogTitle>
            <DialogDescription>Generated XML in AEAT Verifactu format for this invoice</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <pre className="bg-gray-100 p-4 rounded-lg text-xs overflow-x-auto">
              <code>{verifactuData?.xmlData}</code>
            </pre>
            <div className="flex space-x-2">
              <Button onClick={() => navigator.clipboard.writeText(verifactuData?.xmlData || "")}>Copy XML</Button>
              <Button variant="outline" onClick={handleDownloadXML}>
                <Download className="w-4 h-4 mr-2" />
                Download XML
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* QR Code Popup */}
      {verifactuData && (
        <QRCodePopup
          open={showQRCode}
          onOpenChange={setShowQRCode}
          qrCodeData={verifactuData.qrCodeData}
          invoiceData={invoiceData}
          verifactuData={verifactuData}
        />
      )}
    </div>
  )
}

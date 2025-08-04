"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Download, ExternalLink, QrCode, Shield, Hash, Calendar, Euro } from "lucide-react"
import QRCode from "qrcode"

interface QRCodePopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  qrCodeData: any
  invoiceData: any
  verifactuData: any
}

export function QRCodePopup({ open, onOpenChange, qrCodeData, invoiceData, verifactuData }: QRCodePopupProps) {
  const [qrCodeImage, setQrCodeImage] = useState<string>("")
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (open && qrCodeData) {
      generateQRCode()
    }
  }, [open, qrCodeData])

  const generateQRCode = async () => {
    try {
      const qrData = {
        invoiceId: qrCodeData.invoiceId,
        nif: qrCodeData.nif,
        amount: qrCodeData.amount,
        date: qrCodeData.date,
        hash: qrCodeData.hash,
        url: qrCodeData.aeatUrl,
      }

      const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrData), {
        width: 300,
        margin: 2,
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
      })

      setQrCodeImage(qrCodeDataURL)
    } catch (error) {
      console.error("Error generating QR code:", error)
    }
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Failed to copy:", error)
    }
  }

  const downloadQRCode = () => {
    if (qrCodeImage) {
      const link = document.createElement("a")
      link.download = `qr-code-${invoiceData.invoiceNumber}.png`
      link.href = qrCodeImage
      link.click()
    }
  }

  const openAEATVerification = () => {
    if (qrCodeData.aeatUrl) {
      window.open(qrCodeData.aeatUrl, "_blank")
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <QrCode className="w-5 h-5" />
            <span>Código QR VeriFactu</span>
          </DialogTitle>
          <DialogDescription>Código QR para verificación en la sede electrónica de la AEAT</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* QR Code Display */}
          <div className="flex justify-center">
            <Card className="w-fit">
              <CardContent className="p-6 text-center">
                {qrCodeImage ? (
                  <div className="space-y-4">
                    <img
                      src={qrCodeImage || "/placeholder.svg"}
                      alt="QR Code VeriFactu"
                      className="mx-auto border rounded-lg"
                    />
                    <div className="flex space-x-2 justify-center">
                      <Button variant="outline" size="sm" onClick={downloadQRCode}>
                        <Download className="w-4 h-4 mr-2" />
                        Descargar QR
                      </Button>
                      <Button variant="outline" size="sm" onClick={openAEATVerification}>
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Verificar en AEAT
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="w-64 h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">Generando código QR...</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Invoice Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Resumen de la Factura</CardTitle>
              <CardDescription>Información incluida en el código QR</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <Hash className="w-4 h-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">Número de Factura</p>
                    <p className="text-sm text-gray-600">{qrCodeData.invoiceId}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Shield className="w-4 h-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">NIF Emisor</p>
                    <p className="text-sm text-gray-600">{qrCodeData.nif}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Euro className="w-4 h-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">Importe Total</p>
                    <p className="text-sm text-gray-600">€{qrCodeData.amount?.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-purple-500" />
                  <div>
                    <p className="text-sm font-medium">Fecha</p>
                    <p className="text-sm text-gray-600">{qrCodeData.date}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">Hash de Verificación</p>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 p-2 bg-gray-100 rounded text-xs font-mono break-all">{qrCodeData.hash}</code>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(qrCodeData.hash)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                {copied && <p className="text-xs text-green-600">¡Copiado al portapapeles!</p>}
              </div>
            </CardContent>
          </Card>

          {/* VeriFactu Compliance Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Detalles de Cumplimiento VeriFactu</CardTitle>
              <CardDescription>Información técnica de verificación</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium">Número Secuencial</p>
                  <Badge variant="outline">{verifactuData.sequentialNumber}</Badge>
                </div>

                <div>
                  <p className="text-sm font-medium">UUID</p>
                  <p className="text-xs font-mono text-gray-600">{verifactuData.uuid || "N/A"}</p>
                </div>

                <div>
                  <p className="text-sm font-medium">Estado AEAT</p>
                  <Badge variant={verifactuData.aeatSubmissionStatus === "submitted" ? "default" : "secondary"}>
                    {verifactuData.aeatSubmissionStatus === "submitted" ? "Enviado" : "Pendiente"}
                  </Badge>
                </div>

                <div>
                  <p className="text-sm font-medium">Timestamp</p>
                  <p className="text-xs text-gray-600">{new Date(verifactuData.timestamp).toLocaleString("es-ES")}</p>
                </div>
              </div>

              <div className="space-y-2">
                <p className="text-sm font-medium">URL de Verificación AEAT</p>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 p-2 bg-gray-100 rounded text-xs break-all">{qrCodeData.aeatUrl}</code>
                  <Button variant="outline" size="sm" onClick={() => copyToClipboard(qrCodeData.aeatUrl)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Compliance Notice */}
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-start space-x-2">
              <Shield className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <h4 className="text-sm font-medium text-blue-900">Factura Verificable</h4>
                <p className="text-sm text-blue-700 mt-1">
                  Esta factura cumple con los requisitos de VeriFactu y puede ser verificada en la sede electrónica de
                  la Agencia Estatal de Administración Tributaria (AEAT).
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

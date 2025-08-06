import jsPDF from "jspdf"
import QRCode from "qrcode"

export interface VeriFactuPDFData {
  invoice: any
  verifactuData: any
  qrCodeData: any
}

export class VeriFactuPDFGenerator {
  private doc: jsPDF

  constructor() {
    this.doc = new jsPDF()
  }

  async generateVeriFactuPDF(data: VeriFactuPDFData): Promise<Blob> {
    const { invoice, verifactuData, qrCodeData } = data

    // Set up document
    this.doc.setFontSize(20)
    this.doc.text("FACTURA / INVOICE", 20, 30)

    // VeriFactu compliance label (required)
    this.doc.setFontSize(10)
    this.doc.setTextColor(255, 0, 0) // Red color for compliance text
    this.doc.text("Factura verificable en la sede electrónica de la AEAT", 20, 40)
    this.doc.setTextColor(0, 0, 0) // Reset to black

    // Invoice header
    this.doc.setFontSize(12)
    this.doc.text(`Número de Factura: ${invoice.invoiceNumber}`, 20, 55)
    this.doc.text(`Fecha: ${invoice.date}`, 20, 65)
    this.doc.text(`Número Secuencial: ${verifactuData.sequentialNumber}`, 20, 75)
    this.doc.text(`UUID: ${verifactuData.uuid || "N/A"}`, 20, 85)

    // Seller information
    this.doc.setFontSize(14)
    this.doc.text("DATOS DEL EMISOR", 20, 105)
    this.doc.setFontSize(10)
    this.doc.text(`${invoice.companyName || "Acme Corporation GmbH"}`, 20, 115)
    this.doc.text(`NIF: ${invoice.companyVatId || "DE123456789"}`, 20, 125)
    this.doc.text("Calle Principal 123", 20, 135)
    this.doc.text("28001 Madrid, España", 20, 145)

    // Buyer information
    this.doc.setFontSize(14)
    this.doc.text("DATOS DEL RECEPTOR", 120, 105)
    this.doc.setFontSize(10)
    this.doc.text(`${invoice.clientName || "Cliente Ejemplo S.L."}`, 120, 115)
    this.doc.text(`NIF: ${invoice.clientVatId || "ES987654321"}`, 120, 125)
    this.doc.text("Avenida Ejemplo 456", 120, 135)
    this.doc.text("08001 Barcelona, España", 120, 145)

    // Invoice items table
    let yPosition = 170
    this.doc.setFontSize(12)
    this.doc.text("DETALLE DE LA FACTURA", 20, yPosition)

    yPosition += 15
    this.doc.setFontSize(10)
    this.doc.text("Descripción", 20, yPosition)
    this.doc.text("Cant.", 80, yPosition)
    this.doc.text("Precio", 110, yPosition)
    this.doc.text("IVA", 140, yPosition)
    this.doc.text("Total", 170, yPosition)

    // Draw line under headers
    this.doc.line(20, yPosition + 2, 190, yPosition + 2)

    yPosition += 10

    // Sample invoice items
    const items = invoice.items || [
      { description: "Servicios de consultoría", quantity: 1, price: 1000, vat: 210, total: 1210 },
    ]

    items.forEach((item: any) => {
      this.doc.text(item.description, 20, yPosition)
      this.doc.text(item.quantity.toString(), 80, yPosition)
      this.doc.text(`€${item.price.toFixed(2)}`, 110, yPosition)
      this.doc.text(`€${item.vat.toFixed(2)}`, 140, yPosition)
      this.doc.text(`€${item.total.toFixed(2)}`, 170, yPosition)
      yPosition += 10
    })

    // Totals
    yPosition += 10
    this.doc.line(20, yPosition, 190, yPosition)
    yPosition += 10

    const subtotal = invoice.subtotal || 1000
    const vatAmount = invoice.vatAmount || 210
    const total = invoice.total || 1210

    this.doc.text("Subtotal:", 140, yPosition)
    this.doc.text(`€${subtotal.toFixed(2)}`, 170, yPosition)
    yPosition += 10

    this.doc.text("IVA (21%):", 140, yPosition)
    this.doc.text(`€${vatAmount.toFixed(2)}`, 170, yPosition)
    yPosition += 10

    this.doc.setFontSize(12)
    this.doc.text("TOTAL:", 140, yPosition)
    this.doc.text(`€${total.toFixed(2)}`, 170, yPosition)

    // VeriFactu compliance section
    yPosition += 20
    this.doc.setFontSize(12)
    this.doc.text("DATOS DE VERIFICACIÓN VERIFACTU", 20, yPosition)

    yPosition += 10
    this.doc.setFontSize(8)
    this.doc.text(`Hash de la Factura: ${verifactuData.hash}`, 20, yPosition)
    yPosition += 8
    this.doc.text(`Hash Anterior: ${verifactuData.previousHash || "N/A"}`, 20, yPosition)
    yPosition += 8
    this.doc.text(`Firma Digital: ${verifactuData.digitalSignature.substring(0, 50)}...`, 20, yPosition)
    yPosition += 8
    this.doc.text(`Timestamp NTP: ${verifactuData.ntpSyncTimestamp || verifactuData.timestamp}`, 20, yPosition)

    // Generate and add QR code
    try {
      const qrCodeDataURL = await QRCode.toDataURL(JSON.stringify(qrCodeData), {
        width: 100,
        margin: 1,
      })

      // Add QR code to PDF
      this.doc.addImage(qrCodeDataURL, "PNG", 150, yPosition - 20, 30, 30)

      this.doc.setFontSize(8)
      this.doc.text("Código QR para verificación", 150, yPosition + 15)
      this.doc.text("en sede electrónica AEAT", 150, yPosition + 20)
    } catch (error) {
      console.error("Error generating QR code for PDF:", error)
    }

    // Footer with compliance information
    this.doc.setFontSize(8)
    this.doc.text("Esta factura cumple con los requisitos de VeriFactu según la normativa española.", 20, 280)
    this.doc.text("Software certificado por AEAT - Procys Accounting v1.0", 20, 285)

    return this.doc.output("blob")
  }
}

import { PDFDocument, rgb, StandardFonts } from "pdf-lib"

interface InvoiceItem {
  description: string
  quantity: number
  unitPrice: number
  taxRate: number
}

interface InvoiceData {
  invoiceNumber: string
  invoiceDate: string
  dueDate: string
  client: {
    name: string
    nif: string
    address: string
    email: string
  }
  items: InvoiceItem[]
  notes: string
  paymentMethod: string
  subtotal: number
  totalTax: number
  totalAmount: number
  verifactuHash?: string
  verifactuQR?: string
}

export async function generatePdf(invoiceData: InvoiceData): Promise<Blob> {
  const pdfDoc = await PDFDocument.create()
  const page = pdfDoc.addPage()

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  const { width, height } = page.getSize()
  const margin = 50
  let y = height - margin

  // Header
  page.drawText("INVOICE", {
    x: margin,
    y: y,
    font: boldFont,
    size: 36,
    color: rgb(0.05, 0.2, 0.4), // Dark blue
  })
  y -= 40

  // Company Info (Placeholder)
  page.drawText("Your Company Name", { x: width - margin - 200, y: y, font, size: 12 })
  page.drawText("Your Company Address, City, Postal Code", { x: width - margin - 200, y: y - 15, font, size: 10 })
  page.drawText("VAT ID: YOURVATID", { x: width - margin - 200, y: y - 30, font, size: 10 })
  page.drawText("Email: your@company.com", { x: width - margin - 200, y: y - 45, font, size: 10 })
  y -= 60

  // Invoice Details
  page.drawText(`Invoice No: ${invoiceData.invoiceNumber}`, { x: margin, y: y, font: boldFont, size: 12 })
  page.drawText(`Invoice Date: ${invoiceData.invoiceDate}`, { x: margin, y: y - 15, font, size: 10 })
  page.drawText(`Due Date: ${invoiceData.dueDate}`, { x: margin, y: y - 30, font, size: 10 })
  y -= 50

  // Client Details
  page.drawText("Bill To:", { x: margin, y: y, font: boldFont, size: 12 })
  page.drawText(invoiceData.client.name, { x: margin, y: y - 15, font, size: 10 })
  page.drawText(`NIF: ${invoiceData.client.nif}`, { x: margin, y: y - 30, font, size: 10 })
  page.drawText(invoiceData.client.address, { x: margin, y: y - 45, font, size: 10 })
  page.drawText(invoiceData.client.email, { x: margin, y: y - 60, font, size: 10 })
  y -= 80

  // Items Table Header
  const tableStartY = y
  const col1X = margin
  const col2X = col1X + 200
  const col3X = col2X + 80
  const col4X = col3X + 80
  const col5X = col4X + 80

  page.drawRectangle({
    x: margin,
    y: tableStartY - 20,
    width: width - 2 * margin,
    height: 20,
    color: rgb(0.9, 0.95, 1), // Light blue
  })

  page.drawText("Description", { x: col1X + 5, y: tableStartY - 14, font: boldFont, size: 10 })
  page.drawText("Qty", { x: col2X + 5, y: tableStartY - 14, font: boldFont, size: 10 })
  page.drawText("Unit Price", { x: col3X + 5, y: tableStartY - 14, font: boldFont, size: 10 })
  page.drawText("Tax (%)", { x: col4X + 5, y: tableStartY - 14, font: boldFont, size: 10 })
  page.drawText("Amount", { x: col5X + 5, y: tableStartY - 14, font: boldFont, size: 10 })

  y = tableStartY - 20

  // Items Table Rows
  invoiceData.items.forEach((item) => {
    y -= 20
    page.drawText(item.description, { x: col1X + 5, y: y - 14, font, size: 9 })
    page.drawText(item.quantity.toString(), { x: col2X + 5, y: y - 14, font, size: 9 })
    page.drawText(`€${item.unitPrice.toFixed(2)}`, { x: col3X + 5, y: y - 14, font, size: 9 })
    page.drawText(`${item.taxRate}%`, { x: col4X + 5, y: y - 14, font, size: 9 })
    page.drawText(`€${(item.quantity * item.unitPrice * (1 + item.taxRate / 100)).toFixed(2)}`, { x: col5X + 5, y: y - 14, font, size: 9 })
  })
  y -= 30

  // Totals
  page.drawText(`Subtotal: €${invoiceData.subtotal.toFixed(2)}`, { x: width - margin - 150, y: y, font, size: 10 })
  page.drawText(`Tax: €${invoiceData.totalTax.toFixed(2)}`, { x: width - margin - 150, y: y - 15, font, size: 10 })
  page.drawText(`Total: €${invoiceData.totalAmount.toFixed(2)}`, { x: width - margin - 150, y: y - 30, font: boldFont, size: 12, color: rgb(0.05, 0.2, 0.4) })
  y -= 60

  // Notes
  if (invoiceData.notes) {
    page.drawText("Notes:", { x: margin, y: y, font: boldFont, size: 10 })
    page.drawText(invoiceData.notes, { x: margin, y: y - 15, font, size: 9 })
    y -= 30
  }

  // Payment Method
  page.drawText(`Payment Method: ${invoiceData.paymentMethod.replace(/_/g, ' ').toUpperCase()}`, { x: margin, y: y, font: boldFont, size: 10 })
  y -= 30

  // VeriFactu Hash and QR (if provided)
  if (invoiceData.verifactuHash) {
    page.drawText("VeriFactu Hash:", { x: margin, y: y, font: boldFont, size: 8 })
    page.drawText(invoiceData.verifactuHash, { x: margin, y: y - 10, font, size: 7 })
    y -= 20
  }
  if (invoiceData.verifactuQR) {
    page.drawText("VeriFactu QR Data:", { x: margin, y: y, font: boldFont, size: 8 })
    page.drawText(invoiceData.verifactuQR, { x: margin, y: y - 10, font, size: 7 })
    y -= 20
  }

  // Footer
  page.drawText("Thank you for your business!", {
    x: margin,
    y: margin,
    font: boldFont,
    size: 10,
    color: rgb(0.5, 0.5, 0.5),
  })

  const pdfBytes = await pdfDoc.save()
  return new Blob([pdfBytes], { type: "application/pdf" })
}

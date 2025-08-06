"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import QRCode from "qrcode.react"
import { Button } from "@/components/ui/button"
import { Copy, Download } from 'lucide-react'
import { useState } from "react"

interface QRCodePopupProps {
  qrCodeData: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function QRCodePopup({ qrCodeData, isOpen, onClose }: QRCodePopupProps) {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCodeData);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
  };

  const handleDownload = () => {
    const canvas = document.getElementById("qrcode-canvas") as HTMLCanvasElement;
    if (canvas) {
      const pngUrl = canvas.toDataURL("image/png");
      const downloadLink = document.createElement("a");
      downloadLink.href = pngUrl;
      downloadLink.download = "qrcode.png";
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>VeriFactu QR Code</DialogTitle>
          <DialogDescription>
            Scan this QR code to verify the invoice details.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center justify-center p-4 space-y-4">
          {qrCodeData ? (
            <QRCode
              id="qrcode-canvas"
              value={qrCodeData}
              size={256}
              level="H"
              includeMargin={true}
              renderAs="canvas"
            />
          ) : (
            <div className="w-64 h-64 bg-gray-200 flex items-center justify-center text-gray-500">
              No QR Code Data
            </div>
          )}
          <p className="text-sm text-center text-gray-600 break-all font-mono">
            {qrCodeData}
          </p>
          <div className="flex space-x-2 w-full">
            <Button variant="outline" className="flex-1" onClick={handleCopy}>
              <Copy className="w-4 h-4 mr-2" />
              {copySuccess ? "Copied!" : "Copy Data"}
            </Button>
            <Button className="flex-1" onClick={handleDownload}>
              <Download className="w-4 h-4 mr-2" />
              Download QR
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

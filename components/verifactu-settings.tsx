"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Shield, AlertCircle, CheckCircle, Upload, Download, Key } from 'lucide-react'
import type { VerifactuConfig } from "@/lib/verifactu"
import React from "react"

interface VerifactuSettingsProps {
  config: VerifactuConfig;
  onConfigChange: (config: VerifactuConfig) => void;
}

export function VerifactuSettings({ config, onConfigChange }: VerifactuSettingsProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    onConfigChange({ ...config, [id]: value });
  };

  const handleSwitchChange = (id: keyof VerifactuConfig, checked: boolean) => {
    onConfigChange({ ...config, [id]: checked });
  };

  const handleCertificateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Uploading certificate:", file.name);
      // In a real application, you would upload this to a secure storage
      // and store a reference/path in the config.
      onConfigChange({ ...config, certificateNumber: `UPLOADED-${Date.now()}` }); // Mock update
    }
  };

  const handleComplianceDeclarationChange = (field: string, value: string) => {
    onConfigChange({
      ...config,
      complianceDeclaration: {
        ...config.complianceDeclaration,
        [field]: value,
      },
    });
  };

  return (
    <div className="space-y-6">
      <Alert className="border-blue-200 bg-blue-50">
        <Shield className="h-4 w-4 text-blue-600" />
        <AlertTitle className="text-blue-800">VeriFactu Compliance</AlertTitle>
        <AlertDescription className="text-blue-800">
          Configure your system to comply with Spanish VeriFactu regulations (Real Decreto 1007/2023).
          This ensures all invoices are digitally signed, immutable, and can be submitted to the AEAT.
        </AlertDescription>
      </Alert>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
          <CardDescription>Enable or disable VeriFactu compliance for your invoices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="enabled">Enable VeriFactu Compliance</Label>
              <p className="text-sm text-gray-600">
                When enabled, all new invoices will be generated with VeriFactu requirements.
              </p>
            </div>
            <Switch
              id="enabled"
              checked={config.enabled}
              onCheckedChange={(checked) => handleSwitchChange("enabled", checked)}
            />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="aeatSubmissionEnabled">Enable AEAT Real-time Submission (SII)</Label>
              <p className="text-sm text-gray-600">
                Automatically submit invoices to the Spanish Tax Agency (AEAT) in real-time.
              </p>
            </div>
            <Switch
              id="aeatSubmissionEnabled"
              checked={config.aeatSubmissionEnabled}
              onCheckedChange={(checked) => handleSwitchChange("aeatSubmissionEnabled", checked)}
              disabled={!config.enabled}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Developer & Software Information</CardTitle>
          <CardDescription>Details required for VeriFactu software identification.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="developerTaxId">Developer Tax ID (NIF)</Label>
            <Input
              id="developerTaxId"
              value={config.developerTaxId}
              onChange={handleInputChange}
              placeholder="e.g., B12345678"
              disabled={!config.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="developerName">Developer Name</Label>
            <Input
              id="developerName"
              value={config.developerName}
              onChange={handleInputChange}
              placeholder="e.g., Procys Technologies S.L."
              disabled={!config.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="softwareVersion">Software Version</Label>
            <Input
              id="softwareVersion"
              value={config.softwareVersion}
              onChange={handleInputChange}
              placeholder="e.g., 1.0.0"
              disabled={!config.enabled}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Digital Certificate</CardTitle>
          <CardDescription>Upload and manage your digital certificate for signing invoices.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="certificateNumber">Certificate Number</Label>
            <Input
              id="certificateNumber"
              value={config.certificateNumber}
              onChange={handleInputChange}
              placeholder="Automatically populated after upload"
              readOnly
              disabled={!config.enabled}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" asChild disabled={!config.enabled}>
              <label htmlFor="certificateUpload" className="cursor-pointer flex items-center">
                <Upload className="w-4 h-4 mr-2" />
                Upload Certificate (.p12/.pfx)
              </label>
            </Button>
            <input
              id="certificateUpload"
              type="file"
              accept=".p12,.pfx"
              className="hidden"
              onChange={handleCertificateUpload}
              disabled={!config.enabled}
            />
            {config.certificateNumber && (
              <Button variant="ghost" disabled={!config.enabled}>
                <Download className="w-4 h-4 mr-2" />
                Download Current
              </Button>
            )}
          </div>
          {config.certificateNumber && (
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-800">
                Certificate is configured. Number: {config.certificateNumber}
              </AlertDescription>
            </Alert>
          )}
          {!config.certificateNumber && config.enabled && (
            <Alert className="border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                No certificate uploaded. Digital signing will not work without a valid certificate.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Compliance Declaration</CardTitle>
          <CardDescription>Information about the person responsible for compliance.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="declarationDate">Declaration Date</Label>
            <Input
              id="declarationDate"
              type="date"
              value={config.complianceDeclaration.date}
              onChange={(e) => handleComplianceDeclarationChange("date", e.target.value)}
              disabled={!config.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="declarationVersion">Declaration Version</Label>
            <Input
              id="declarationVersion"
              value={config.complianceDeclaration.version}
              onChange={(e) => handleComplianceDeclarationChange("version", e.target.value)}
              placeholder="e.g., 1.0.0"
              disabled={!config.enabled}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="declarationResponsible">Responsible Person</Label>
            <Input
              id="declarationResponsible"
              value={config.complianceDeclaration.responsible}
              onChange={(e) => handleComplianceDeclarationChange("responsible", e.target.value)}
              placeholder="e.g., John Doe, CTO"
              disabled={!config.enabled}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

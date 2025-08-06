"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowRight, CheckCircle, XCircle } from 'lucide-react'
import Link from "next/link"

export default function OnboardingPage() {
  const [step, setStep] = useState(1)
  const [companyName, setCompanyName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [currency, setCurrency] = useState("EUR")
  const [timezone, setTimezone] = useState("Europe/Berlin")
  const [termsAccepted, setTermsAccepted] = useState(false)
  const [privacyAccepted, setPrivacyAccepted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const totalSteps = 3
  const progress = (step / totalSteps) * 100

  const handleNext = async () => {
    setError("")
    setIsLoading(true)

    // Simulate API call or validation
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (step === 1) {
      if (!companyName || !email || !password || !confirmPassword) {
        setError("All fields are required.")
      } else if (password !== confirmPassword) {
        setError("Passwords do not match.")
      } else {
        setStep(step + 1)
      }
    } else if (step === 2) {
      if (!currency || !timezone) {
        setError("Please select a currency and timezone.")
      } else {
        setStep(step + 1)
      }
    } else if (step === 3) {
      if (!termsAccepted || !privacyAccepted) {
        setError("You must accept the terms and privacy policy.")
      } else {
        // Final submission logic
        console.log("Onboarding complete!", { companyName, email, currency, timezone })
        // Redirect to dashboard or success page
        window.location.href = "/dashboard"
      }
    }
    setIsLoading(false)
  }

  const handleBack = () => {
    setError("")
    setStep(step - 1)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <h1 className="text-3xl font-bold text-blue-600">PROCYS</h1>
          </div>
          <CardTitle className="text-2xl">Welcome to Procys</CardTitle>
          <CardDescription>Let's get your accounting setup in a few simple steps.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="progress">Progress</Label>
            <Progress value={progress} className="w-full" />
            <p className="text-sm text-right text-gray-500">
              Step {step} of {totalSteps}
            </p>
          </div>

          {error && (
            <div className="flex items-center space-x-2 text-red-600 text-sm">
              <XCircle className="w-4 h-4" />
              <span>{error}</span>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Company & Account Details</h2>
              <div className="space-y-2">
                <Label htmlFor="companyName">Company Name</Label>
                <Input
                  id="companyName"
                  placeholder="Your Company Inc."
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@yourcompany.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Regional Settings</h2>
              <div className="space-y-2">
                <Label htmlFor="currency">Default Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger id="currency">
                    <SelectValue placeholder="Select currency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="GBP">GBP - British Pound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="timezone">Timezone</Label>
                <Select value={timezone} onValueChange={setTimezone}>
                  <SelectTrigger id="timezone">
                    <SelectValue placeholder="Select timezone" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Europe/Berlin">Europe/Berlin</SelectItem>
                    <SelectItem value="America/New_York">America/New York</SelectItem>
                    <SelectItem value="Asia/Tokyo">Asia/Tokyo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Terms & Privacy</h2>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={termsAccepted}
                  onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                />
                <Label htmlFor="terms">
                  I agree to the <Link href="#" className="text-blue-600 hover:underline">Terms of Service</Link>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="privacy"
                  checked={privacyAccepted}
                  onCheckedChange={(checked) => setPrivacyAccepted(checked as boolean)}
                />
                <Label htmlFor="privacy">
                  I agree to the <Link href="#" className="text-blue-600 hover:underline">Privacy Policy</Link>
                </Label>
              </div>
              <div className="flex items-center space-x-2 text-green-600 font-medium">
                <CheckCircle className="w-5 h-5" />
                <span>You're all set! Click finish to start.</span>
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4">
            {step > 1 && (
              <Button variant="outline" onClick={handleBack} disabled={isLoading}>
                Back
              </Button>
            )}
            <Button onClick={handleNext} disabled={isLoading} className="ml-auto">
              {isLoading ? "Processing..." : step < totalSteps ? "Next Step" : "Finish Setup"}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

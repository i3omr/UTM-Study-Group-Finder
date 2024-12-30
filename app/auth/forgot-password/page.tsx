"use client";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [securityQuestion, setSecurityQuestion] = useState("")
  const [securityAnswer, setSecurityAnswer] = useState("")
  const [showSecurityQuestion, setShowSecurityQuestion] = useState(false)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState("")

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch("/api/get-security-question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (data.success) {
        setSecurityQuestion(data.securityQuestion);
        setShowSecurityQuestion(true);
        setStatus('idle');
      } else {
        setStatus('error');
        setMessage("Email not found");
      }
    } catch (error) {
      setStatus('error');
      setMessage("An error occurred");
    }
  }

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      // First verify security answer
      const verifyResponse = await fetch("/api/verify-security-answer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, answer: securityAnswer }),
      });

      const verifyData = await verifyResponse.json();

      if (!verifyData.success) {
        setStatus('error');
        setMessage("Incorrect security answer");
        return;
      }

      // If verified, send reset email
      const response = await fetch("/api/send-reset-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      
      if (data.success) {
        setStatus('success');
        setMessage("Check your email for a password reset link");
      } else {
        setStatus('error');
        setMessage(data.error || "Failed to send reset email");
      }
    } catch (error) {
      setStatus('error');
      setMessage("An error occurred");
    }
  }

  return (
    <form onSubmit={showSecurityQuestion ? handleResetSubmit : handleEmailSubmit}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Forgot Password</CardTitle>
          <CardDescription>
            {showSecurityQuestion 
              ? "Answer your security question to receive a reset link"
              : "Enter your email address to continue"
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          {message && (
            <div className={`mb-4 p-2 text-sm rounded ${
              status === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
            }`}>
              {message}
            </div>
          )}
          <div className="grid gap-4">
            {!showSecurityQuestion ? (
              <div className="grid gap-2">
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            ) : (
              <div className="grid gap-2">
                <div className="text-sm font-medium mb-2">{securityQuestion}</div>
                <Input
                  id="answer"
                  type="text"
                  placeholder="Your answer"
                  value={securityAnswer}
                  onChange={(e) => setSecurityAnswer(e.target.value)}
                  required
                />
              </div>
            )}
            <Button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? "Processing..." : 
               showSecurityQuestion ? "Submit Answer" : "Continue"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}

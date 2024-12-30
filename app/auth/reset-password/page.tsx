
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setStatus('error');
      setMessage("Passwords don't match");
      return;
    }

    if (password.length < 8) {
      setStatus('error');
      setMessage("Password must be at least 8 characters");
      return;
    }

    setStatus('loading');

    try {
      const response = await fetch("/api/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await response.json();

      if (data.success) {
        setStatus('success');
        setMessage("Password updated successfully! Redirecting to login...");
        setTimeout(() => {
          router.push('/auth/login');
          router.refresh();
        }, 1500);
      } else {
        setStatus('error');
        setMessage(data.message || "Failed to reset password");
      }
    } catch (error) {
      console.error('Error resetting password:', error);
      setStatus('error');
      setMessage("An error occurred. Please try again.");
    }
  };

  if (!token) {
    return (
      <Card className="mx-auto max-w-sm">
        <CardContent className="pt-6">
          <div className="text-center text-red-500">
            Invalid reset link. Please request a new password reset.
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Reset Password</CardTitle>
          <CardDescription>
            Enter your new password below
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
            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                placeholder="New password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                minLength={8}
              />
            </div>
            <Button type="submit" disabled={status === 'loading'}>
              {status === 'loading' ? "Updating..." : "Reset Password"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

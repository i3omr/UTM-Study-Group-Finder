"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link"; // Corrected import for Next.js Link
import { useState } from "react";
import { useRouter } from "next/navigation";

const Login = () => {
  const [showVerification, setShowVerification] = useState(false);
  const [emailState, setEmailState] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({
          email: showVerification ? emailState : formData.get('email'),
          password: formData.get('password'),
          code: formData.get('code')
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();

      if (data.errors) {
        setError(data.errors);
        return;
      }

      if (data.needsVerification) {
        setShowVerification(true);
        setEmailState(data.email);
      }

      if (data.success) {
        // Redirect to dashboard after successful login
        router.push('/dashboard');
      }
    } catch (err) {
      setError('An error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">
            {showVerification ? "Enter Verification Code" : "Login"}
          </CardTitle>
          <CardDescription>
            {showVerification
              ? "Check your email for the verification code"
              : "Enter your email below to login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 p-2 text-sm text-white bg-red-500 rounded">
              {error}
            </div>
          )}
          <div className="grid gap-4">
            {!showVerification ? (
              <>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                  </div>
                  <Input id="password" type="password" name="password" required />
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm text-muted-foreground hover:underline"
                >
                  Forgot password?
                </Link>
              </>
            ) : (
              <div className="grid gap-2">
                <Label htmlFor="verificationCode">Verification Code</Label>
                <Input
                  id="verificationCode"
                  type="text"
                  name="code"
                  placeholder="Enter verification code"
                  required
                />
              </div>
            )}
            <Button type="submit" className="w-full">
              {showVerification ? "Verify" : "Login"}
            </Button>
          </div>
          {!showVerification && (
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/auth/sign-up" className="underline">
                Sign up
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </form>
  );
};

export default Login;

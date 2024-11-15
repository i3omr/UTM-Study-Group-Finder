'use client'
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useActionState, useState } from "react"
import { login } from "../actions"


import React from 'react'

const Login = () => {
   // const [showToast, setShowToast] = useState<{ message: string; visible: boolean }>({ message: '', visible: false });
   const initialState = {
    email: '',
    password: ''
    
  }
  const [state, formAction, isPending] = useActionState(login, initialState);
  return (
    <form action={formAction}>
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
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
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input id="password" type="password" name="password" required />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account - {" "}
          <Link href="#" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
    </form>
  )
}

export default Login

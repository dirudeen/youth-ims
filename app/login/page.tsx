"use client";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import type React from "react";
import { useState } from "react";
import { loginAction } from "../../lib/actions/auth-actions";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const { success, error: resErr } = await loginAction({ email, password });
    if (!success) {
      setError(resErr);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Branding */}
        <div className="hidden lg:flex flex-col items-center justify-center space-y-8">
          <div className="text-center space-y-6">
            <div className="mx-auto w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg p-2">
              <img
                src="/images/moys-logo.jpg"
                alt="Ministry of Youth and Sports Logo"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
            <div className="space-y-2">
              <h1 className="text-4xl font-bold text-gray-800">Youth IMS</h1>
              <p className="text-xl text-gray-600">
                Information Management System
              </p>
              <div className="w-16 h-1 bg-gradient-to-r from-blue-500 to-indigo-600 mx-auto rounded-full"></div>
            </div>
          </div>
          <div className="text-center space-y-4 max-w-md">
            <h2 className="text-2xl font-semibold text-gray-700">
              Department of Youth and Sports
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Empowering youth through comprehensive data management and
              strategic development initiatives across The Gambia.
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Secure • Reliable • Efficient</span>
            </div>
          </div>
          <p className="text-red-800 leading-relaxed">
            Supported by: Actionaid International The Gambia
          </p>
        </div>

        {/* Right side - Login Form */}
        <div className="flex items-center justify-center">
          <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="space-y-4 text-center pb-6">
              <div className="mx-auto w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg lg:hidden p-2">
                <img
                  src="/images/moys-logo.jpg"
                  alt="Ministry of Youth and Sports Logo"
                  className="w-full h-full object-contain rounded-full"
                />
              </div>
              <div>
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Welcome Back
                </CardTitle>
                <CardDescription className="text-gray-600 mt-2">
                  Sign in to access the Youth Information Management System (The
                  Gambia)
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="h-12 border-gray-200 focus:border-blue-400 focus:ring-blue-400 bg-white/50"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="password"
                    className="text-sm font-medium text-gray-700"
                  >
                    Password
                  </Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 pr-10 border-gray-200 focus:border-blue-400 focus:ring-blue-400 bg-white/50"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </Button>
                  </div>
                </div>

                {error && (
                  <Alert
                    variant="destructive"
                    className="bg-red-50 border-red-200"
                  >
                    <div className="h-4 w-4 text-red-700">⚠</div>
                    <AlertDescription className="text-red-700">
                      {error}
                    </AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-medium shadow-lg transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Signing in...</span>
                    </div>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </form>
              <div className="text-center text-xs text-gray-500 pt-4 border-t border-gray-100">
                <p>© 2025 Department of Youth and Sports, The Gambia</p>
                <p className="mt-1">All rights reserved</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

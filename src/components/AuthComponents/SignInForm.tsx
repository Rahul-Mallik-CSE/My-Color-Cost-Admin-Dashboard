/** @format */

"use client";

import { useState } from "react";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useLoginMutation } from "@/redux/feature/authAPI";
import { saveTokens } from "@/service/authService";

export const SignInForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading }] = useLoginMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();

      if (res?.success) {
        const { access, refresh, user } = res.data;

        // Save token in cookie (server-side)
        await saveTokens(access);

        // Save tokens in localStorage (client-side)
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        localStorage.setItem("user", JSON.stringify(user));

        toast.success(res?.message || "Login successful!");
        router.push("/");
      } else {
        toast.error(res?.message || "Login failed");
      }
    } catch (error: unknown) {
      // Clear all auth data on login failure
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      localStorage.removeItem("email");
      document.cookie =
        "accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      const err = error as { data?: { message?: string }; message?: string };
      const message =
        err?.data?.message || err?.message || "Login failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-b from-[#ff6c95] to-[#e993fd]  ">
      {/* Form Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="z-10 w-full px-4 md:px-0 flex items-center justify-center"
      >
        <Card
          className="w-full max-w-[550px] bg-white border border-[#DDDDDD] rounded-[24px] p-0"
          style={{
            boxShadow:
              "0px 5px 11px 0px #0000000D, 0px 19px 19px 0px #0000000D, 0px 43px 26px 0px #0000000D, 0px 77px 31px 0px #00000003, 0px 120px 34px 0px #00000000",
          }}
        >
          <CardContent className="p-8 md:p-[40px]">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col items-center gap-4">
                <Image
                  src="/color-cost-logo.png"
                  alt="Register Icon"
                  width={160}
                  height={120}
                  className=""
                  priority
                />
                <h1 className="text-3xl md:text-4xl font-bold text-foreground text-center">
                  Login
                </h1>

                <div className="w-full flex flex-col gap-4">
                  {/* Email Field */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="email"
                      className="text-xl font-normal text-foreground"
                    >
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-14 rounded-xl text-base text-foreground border-[#3B3B3B]"
                      disabled={isLoading}
                    />
                  </div>

                  {/* Password Field */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="password"
                      className="text-xl font-normal text-foreground"
                    >
                      Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password.."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="h-14 rounded-xl text-base pr-12 text-foreground border-[#3B3B3B]"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showPassword ? (
                          <Eye className="w-6 h-6" />
                        ) : (
                          <EyeOff className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Remember & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rememberMe"
                        className="w-5 h-5 md:w-6 md:h-6 border-gray-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                      />
                      <Label
                        htmlFor="rememberMe"
                        className="text-base font-normal text-foreground cursor-pointer select-none"
                      >
                        Remember
                      </Label>
                    </div>
                    <Link
                      href="/forgot-password"
                      className="text-base font-semibold text-[#FD7AA1] hover:text-[#FD7AA1]/80 hover:underline transition-colors"
                    >
                      Forget Password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-13 bg-[#FD7AA1] hover:bg-[#FD7AA1]/80 text-white text-lg font-bold rounded-xl shadow-none mt-2"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : null}
                    {isLoading ? "Logging in..." : "Login"}
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

/** @format */

"use client";

import { EyeOff } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";

export const SignInForm = () => {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-b from-[#ff6c95] to-[#e993fd]  ">
      {/* Background Shape */}
      {/* <div className="absolute inset-0 w-full h-full z-0">
        <Image
          src="/icons/shape.png"
          alt="Background Shape"
          fill
          className="object-cover"
          priority
        />
      </div> */}

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
                    className="h-14 rounded-xl text-base text-foreground border-[#3B3B3B]"
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
                      type="password"
                      placeholder="Enter your password.."
                      className="h-14 rounded-xl text-base pr-12 text-foreground border-[#3B3B3B]"
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                    >
                      <EyeOff className="w-6 h-6" />
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
                    className="text-base font-semibold text-primary hover:text-primary/80 hover:underline transition-colors"
                  >
                    Forget Password?
                  </Link>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full h-13 bg-primary hover:bg-primary/90 text-white text-lg font-bold rounded-xl shadow-none mt-2"
                >
                  Login
                </Button>

                {/* Sign Up Link */}
                <div className="flex items-center justify-center gap-2 mt-2">
                  <span className="text-base font-normal text-foreground">
                    Don&apos;t have account?
                  </span>
                  <Link
                    href="/signup"
                    className="text-base font-semibold text-[#fb4f79] hover:text-[#fb4f79]/80 hover:underline transition-colors"
                  >
                    Sign Up Now
                  </Link>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

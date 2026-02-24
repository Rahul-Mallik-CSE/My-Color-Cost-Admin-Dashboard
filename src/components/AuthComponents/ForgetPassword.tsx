/** @format */

"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useForgetPasswordMutation } from "@/redux/feature/authAPI";

const ForgetPassword = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [forgetPassword, { isLoading }] = useForgetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const res = await forgetPassword({ email }).unwrap();

      if (res?.success) {
        // Store email for OTP verification
        localStorage.setItem("email", email);
        toast.success(res?.message || "OTP sent to your email!");
        router.push("/verify-otp");
      } else {
        toast.error(res?.message || "Failed to send OTP");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      const message =
        err?.data?.message ||
        err?.message ||
        "Something went wrong. Please try again.";
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
                  Forgot Password
                </h1>

                <div className="w-full flex flex-col gap-6">
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

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-13 bg-[#FD7AA1] hover:bg-[#FD7AA1]/80 text-white text-lg font-bold rounded-xl shadow-none"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : null}
                    {isLoading ? "Sending..." : "Send OTP"}
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

export default ForgetPassword;

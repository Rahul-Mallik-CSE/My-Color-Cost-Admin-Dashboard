/** @format */

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  useVerifyOtpMutation,
  useResendOtpMutation,
} from "@/redux/feature/authAPI";
import { saveTokens } from "@/service/authService";

const VerifyOtp = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [email] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("email") || "";
    }
    return "";
  });
  const [verifyOtp, { isLoading }] = useVerifyOtpMutation();
  const [resendOtp, { isLoading: isResending }] = useResendOtpMutation();

  useEffect(() => {
    if (!email) {
      toast.error("No email found. Please go back to forgot password.");
      router.push("/forgot-password");
    }
  }, [email, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!otp || otp.length !== 6) {
      toast.error("Please enter the complete 6-digit OTP");
      return;
    }

    try {
      const res = await verifyOtp({ email, otp_code: otp }).unwrap();

      if (res?.success) {
        const { access, refresh, user } = res.data;

        // Save token in cookie (server-side)
        await saveTokens(access);

        // Save tokens in localStorage (client-side)
        localStorage.setItem("accessToken", access);
        localStorage.setItem("refreshToken", refresh);
        if (user) {
          localStorage.setItem("user", JSON.stringify(user));
        }

        toast.success(res?.message || "OTP verified successfully!");
        router.push("/reset-password");
      } else {
        toast.error(res?.message || "OTP verification failed");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      const message =
        err?.data?.message ||
        err?.message ||
        "OTP verification failed. Please try again.";
      toast.error(message);
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      toast.error("No email found.");
      return;
    }

    try {
      const res = await resendOtp({ email }).unwrap();

      if (res?.success) {
        toast.success(res?.message || "OTP resent successfully!");
        setOtp("");
      } else {
        toast.error(res?.message || "Failed to resend OTP");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      const message =
        err?.data?.message ||
        err?.message ||
        "Failed to resend OTP. Please try again.";
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
                  Verify with OTP
                </h1>
                <p className="text-sm text-gray-500 text-center">
                  OTP sent to <span className="font-medium">{email}</span>
                </p>

                <div className="w-full flex flex-col items-center gap-8">
                  <div className="w-full flex justify-center">
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={(value) => setOtp(value)}
                      disabled={isLoading}
                    >
                      <InputOTPGroup className="gap-2 md:gap-4">
                        {[...Array(6)].map((_, index) => (
                          <InputOTPSlot
                            key={index}
                            index={index}
                            className="w-10 h-10 md:w-12 md:h-12 rounded-xl border border-gray-300 first:rounded-xl last:rounded-xl text-lg md:text-xl"
                          />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isLoading || otp.length !== 6}
                    className="w-full h-13 bg-[#FD7AA1] hover:bg-[#FD7AA1]/80 text-white text-lg font-bold rounded-xl shadow-none"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                    ) : null}
                    {isLoading ? "Verifying..." : "Verify"}
                  </Button>

                  {/* Resend Link */}
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-base font-normal text-foreground">
                      Don&apos;t receive the OTP?
                    </span>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      disabled={isResending}
                      className="text-base font-semibold text-[#FD7AA1] hover:text-[#FD7AA1]/80 hover:underline transition-colors focus:outline-none disabled:opacity-50"
                    >
                      {isResending ? "Resending..." : "Resend"}
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;

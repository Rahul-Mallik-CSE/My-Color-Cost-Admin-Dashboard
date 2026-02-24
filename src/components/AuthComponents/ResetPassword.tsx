/** @format */

"use client";

import { useState } from "react";
import { EyeOff, Eye, Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "react-toastify";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { useResetPasswordMutation } from "@/redux/feature/authAPI";

const ResetPassword = () => {
  const router = useRouter();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    try {
      const res = await resetPassword({ new_password: newPassword }).unwrap();

      if (res?.success) {
        toast.success(res?.message || "Password reset successfully!");

        // Clear stored email
        localStorage.removeItem("email");

        router.push("/signin");
      } else {
        toast.error(res?.message || "Password reset failed");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; message?: string };
      const message =
        err?.data?.message ||
        err?.message ||
        "Password reset failed. Please try again.";
      toast.error(message);
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-linear-to-b from-[#ff6c95] to-[#e993fd] ">
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
              "0px 5px 11px 0px #0000000D, 0px 19px 19px 0px #0000000D, 0px 43px 26px 0px #000000D, 0px 77px 31px 0px #00000003, 0px 120px 34px 0px #00000000",
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
                  Reset Password
                </h1>
                <p className="text-base text-gray-500 font-normal text-center mt-[-15px]">
                  Create your new password for your account
                </p>

                <div className="w-full flex flex-col gap-4">
                  {/* New Password */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="newPassword"
                      className="text-xl font-normal text-foreground"
                    >
                      New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={showNewPassword ? "text" : "password"}
                        placeholder="Enter your password.."
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="h-14 rounded-xl text-base pr-12 text-foreground border-[#3B3B3B]"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showNewPassword ? (
                          <Eye className="w-6 h-6" />
                        ) : (
                          <EyeOff className="w-6 h-6" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div className="space-y-3">
                    <Label
                      htmlFor="confirmPassword"
                      className="text-xl font-normal text-foreground"
                    >
                      Re-enter New Password
                    </Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter new password.."
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="h-14 rounded-xl text-base pr-12 text-foreground border-[#3B3B3B]"
                        disabled={isLoading}
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                      >
                        {showConfirmPassword ? (
                          <Eye className="w-6 h-6" />
                        ) : (
                          <EyeOff className="w-6 h-6" />
                        )}
                      </button>
                    </div>
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
                    {isLoading ? "Resetting..." : "Reset Password"}
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

export default ResetPassword;

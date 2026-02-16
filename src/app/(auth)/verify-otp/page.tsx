/** @format */

import { Suspense } from "react";
import VerifyOtp from "../../../components/AuthComponents/VerifyOtp";

export default function VerifyOtpPage() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <VerifyOtp />
      </Suspense>
    </div>
  );
}

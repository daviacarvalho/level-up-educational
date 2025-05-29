"use client";

import { ResetPasswordForm } from "@/components/auth/resetPasswordForm";
import { useParams } from "next/navigation";

export default function ResetPasswordPage() {
  const params = useParams();
  const token = params.token;

  return <ResetPasswordForm token={token} />;
}

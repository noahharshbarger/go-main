import React from "react";
import ResetPassword from "@/components/Auth/ResetPassword";

const ResetPasswordPage = async (props: { params: Promise<{ token: string }> }) => {
  const params = await props.params;
  return <ResetPassword token={params.token} />;
};

export default ResetPasswordPage;

import { type Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ResetPasswordForm } from "@/components/auth"
import { Container } from "@/components/custom"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Enter your email to reset your password",
}

const ResetPasswordPage = async () => {
  return (
    <Container className="maw-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter your email address and we will send you a verification code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </Container>
  )
}

export default ResetPasswordPage
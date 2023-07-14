import { type Metadata } from "next"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ResetPasswordStep2Form } from "@/components/auth"
import { Container } from "@/components/custom"

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Enter a new password and verification code",
}

const ResetPasswordStep2Page = () => {
  return (
    <Container className="maw-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Reset password</CardTitle>
          <CardDescription>
            Enter a new password and verification code
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordStep2Form />
        </CardContent>
      </Card>
    </Container>
  )
}

export default ResetPasswordStep2Page
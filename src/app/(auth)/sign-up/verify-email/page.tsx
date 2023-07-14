import { type Metadata } from "next"
//import dotenv from "dotenv"

import {
  Card,
  CardContent,
  CardDescription,  
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { VerifyEmailForm } from "@/components/auth"
import { Container } from "@/components/custom"

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Verify your email address to continue with your sign up"
}

const VerifyEmailPage = async () => {
  return (
    <Container className="maw-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Verify email</CardTitle>
          <CardDescription>
            Verify your email address to complete your account creation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <VerifyEmailForm />
        </CardContent>
      </Card>
    </Container>
  )
}

export default VerifyEmailPage
import { type Metadata } from "next"
import Link from "next/link"
import { redirect } from "next/navigation"
//import dotenv from "dotenv"
import { currentUser } from "@clerk/nextjs"

import {
  Card,
  CardContent,
  CardDescription,  
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { SignInForm, OAuthSignIn } from "@/components/auth"
import { Container } from "@/components/custom"

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in for an account"
}

const SignInPage = async () => {
  // const user = await currentUser()
  // if (user) redirect("/")

  return (
    <Container className="max-w-lg">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Sign in</CardTitle>
          <CardDescription>
            Choose your preferred sign in method
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <OAuthSignIn />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="px-2 bg-background text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-wrap items-center justify-between gap-2">
          <div className="text-sm text-muted-foreground">
            <span className="hidden mr-1 sm:inline-block">
              Don&apos;t have an account?
            </span>
            <Link
              aria-label="Sign up"
              href={"/sign-up"}
              className="text-primary underline-offset-4 hover:underline"
            >
              Sign up
            </Link>
          </div>
          <Link
            aria-label="Reset password"
            href="/sign-in/reset-password"
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            Reset password
          </Link>
        </CardFooter>
      </Card>
    </Container>
  )
}

export default SignInPage
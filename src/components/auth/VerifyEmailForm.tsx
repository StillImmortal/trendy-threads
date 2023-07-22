"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@/constants/icons"
import { useSignUp } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { verifyEmailSchema } from "@/lib/validations/auth"
import { authError } from "@/lib/validations/authError"

import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"

type Inputs = z.infer<typeof verifyEmailSchema>

const VerifyEmailForm = () => {
  const router = useRouter()
  const { signUp, isLoaded, setActive } = useSignUp()
  const [isPending, startTransition] = useTransition()

  // React-Hook-Form with Zod
  const form = useForm<Inputs>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: "",
    },
  })

  // Verifying an email
  const onSubmit = ({ code }: Inputs) => {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code,
        })

        if (completeSignUp.status !== "complete") {
          /*  investigate the response, to see if there was an error
          or if the user needs to complete more steps.*/
          console.log(JSON.stringify(completeSignUp, null, 2))
          toast.error("Invalid varification code! Please try again.")
        }

        if (completeSignUp.status === "complete") {
          await setActive({ session: completeSignUp.createdSessionId })
          router.push(`${window.location.origin}/`)
        }
      } catch (error) {
        authError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => form.handleSubmit(onSubmit)(...args)}
        className="grid gap-4"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder=""
                  onChange={(e) => {
                    e.target.value = e.target.value.trim()
                    field.onChange(e)
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} type="submit">
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Create account
          <span className="sr-only">Create account</span>
        </Button>
      </form>
    </Form>
  )
}

export default VerifyEmailForm

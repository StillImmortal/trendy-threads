"use client"

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSignIn } from '@clerk/nextjs'
import { toast } from 'sonner'

import { 
  Form, 
  FormField, 
  FormItem,
  FormLabel,
  FormControl,
  FormMessage, 
} from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { authError } from '@/lib/validations/authError'
import { Icons } from '@/constants/icons'
import { checkEmailSchema } from '@/lib/validations/auth'

type Inputs = z.infer<typeof checkEmailSchema>

const ResetPasswordForm = () => {
  const router = useRouter()
  const { signIn, isLoaded } = useSignIn()
  const [isPending, startTransition] = useTransition()

  // React-Hook-Form with Zod 
  const form = useForm<Inputs>({
    resolver: zodResolver(checkEmailSchema),
    defaultValues: {
      email: ""
    }
  })

  // Verifying an email
  const onSubmit = ({ email }: Inputs) => {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const firstFactor = await signIn.create({
          strategy: "reset_password_email_code",
          identifier: email
        })

        if (firstFactor.status === "needs_first_factor") {
          router.push("/sign-in/reset-password/step2")
          toast.message("Check your email", {
            description: "We sent you a 6-digit verification code.",
          })
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
        className='grid gap-4'
      >
        <FormField 
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input 
                  {...field} 
                  placeholder="email@example.com" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          disabled={isPending}
          type="submit"
        >
          {isPending && (
            <Icons.spinner
              className="w-4 h-4 mr-2 animate-spin"
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">Continue to reset password verification</span>
        </Button>
      </form>
    </Form>
  )
}

export default ResetPasswordForm
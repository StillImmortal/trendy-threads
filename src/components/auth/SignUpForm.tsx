"use client"

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useSignUp } from '@clerk/nextjs'
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
import { authSchema } from '@/lib/validations/auth'
import { authError } from '@/lib/validations/authError'
import { Icons } from '@/constants/icons'
import PasswordInput from './PasswordInput'

type Inputs = z.infer<typeof authSchema>

export default function SignUpForm () {
  const router = useRouter()
  const { isLoaded, signUp } = useSignUp()
  const [isPending, startTransition] = useTransition()

  // React-Hook-Form with Zod 
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  // Submitting an authorization
  const onSubmit = ({ email, password }: Inputs) => {
    if (!isLoaded) return
    
    startTransition(async () => {
      try {
        await signUp.create({
          emailAddress: email,
          password
        })
        
        // Send email verification
        await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

        router.push("/sign-up/verify-email")
        toast.message("Check your email", {
          description: "We sent you a 6-digit verification code.",
        })
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
        <FormField 
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <PasswordInput 
                  {...field} 
                  placeholder="**********" 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="w-4 h-4 mr-2 animate-spin"
              aria-hidden="true"
            />
          )}
          Continue
          <span className="sr-only">Continue to email verification page</span>
        </Button>
      </form>
    </Form>
  )
}

//export default SignUpForm
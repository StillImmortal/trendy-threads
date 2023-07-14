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
import { authSchema } from '@/lib/validations/auth'
import { authError } from '@/lib/validations/authError'
import { Icons } from '@/constants/icons'
import PasswordInput from './PasswordInput'

type Inputs = z.infer<typeof authSchema>

const SignInForm = () => {
  const router = useRouter()
  const { signIn, isLoaded, setActive } = useSignIn()
  const [isPending, startTransition] = useTransition()

  // React-Hook-Form with Zod 
  const form = useForm<Inputs>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  // Submitting a sign in
  const onSubmit = async ({ email, password }: Inputs) => {
    if (!isLoaded) return

    startTransition(async () => {
      try {
        const result = await signIn.create({
          identifier: email,
          password
        })
        
        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId })
          router.push(`${window.location.origin}/`)
        } else {
          /*Investigate why the login hasn't completed */
          console.log(result)
          toast.error("Invalid credentials. Please try again.")
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
          Sign in
          <span className="sr-only">Sign in</span>
        </Button>
      </form>
    </Form>
  )
}

export default SignInForm
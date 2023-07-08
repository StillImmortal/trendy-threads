"use client"

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import * as z from "zod"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
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
import { useSignUp } from '@clerk/nextjs'

const formSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8).max(32).refine((value) => /^[A-Za-z0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+$/.test(value), {
    message: "Password should be between 8 and 32, also consists of A-Z, a-z, 0-9 and special symbols"
  })
})

const codeSchema = z.object({
  code: z.string()
})

const SignUpForm = () => {
  const router = useRouter()
  const { isLoaded, signUp, setActive } = useSignUp()
  const [pendingVerification, setPendingVerification] = useState<boolean>(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: ""
    }
  })

  const code = useForm<z.infer<typeof codeSchema>>({
    resolver: zodResolver(codeSchema),
    defaultValues: {
      code: ""
    }
  })

  const onSubmit = async ({ email, password }: z.infer<typeof formSchema>) => {
    if (!isLoaded) return
    try {
      await signUp.create({
        emailAddress: email,
        password: password
      })

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification(true)
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  const handleVerify = async ({ code } : z.infer<typeof codeSchema>) => {
    if (!isLoaded) return

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code
      })
      if (completeSignUp.status !== "complete") {
        console.log(JSON.stringify(completeSignUp, null, 2));
      }
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId })
        router.push("/");
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2));
    }
  }

  return (
    <>
      {!pendingVerification && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-2'
          >
            <FormField 
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
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
                    <Input 
                      {...field} 
                      type="password" 
                      placeholder="example" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
      {pendingVerification && (
        <Form {...code}>
          <form
            onSubmit={code.handleSubmit(handleVerify)}
            className='space-y-2'
          >
            <FormField 
              control={code.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input 
                      {...field} 
                      placeholder="" 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      )}
    </>
  )
}

export default SignUpForm
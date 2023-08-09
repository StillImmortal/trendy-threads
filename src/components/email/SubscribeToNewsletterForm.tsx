"use client"

import { useTransition } from "react"
import { Icons } from "@/constants/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { emailSchema } from "@/lib/validations/email"

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

type Inputs = z.infer<typeof emailSchema>

const SubscribeToNewsletterForm = () => {
  const [isPending, startTransition] = useTransition()

  // React-Hook-Form with Zod
  const form = useForm<Inputs>({
    resolver: zodResolver(emailSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = ({ email }: Inputs) => {
    startTransition(async () => {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        body: JSON.stringify({
          email,
          token: crypto.randomUUID(),
          subject: "Welcome to Trendy Threads",
        }),
      })

      if (response.status === 409)
        toast.error("You are already subscribed to our newsletter.")

      if (response.status === 422) toast.error("Invalid input.")

      if (response.status === 429)
        toast.error("The daily email limit has been reached.")

      if (response.status === 500)
        toast.error("Something went wrong. Please try again later.")

      if (response.ok) {
        toast.success("You have been subscribed to our newsletter.")
        form.reset()
      }
    })
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full"
        onSubmit={(...args) => form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="relative">
              <FormLabel className="sr-only">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@gmail.com"
                  className="pr-12"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <Button
                className="absolute right-[6px] top-[6px] z-20 h-7 w-7"
                size="icon"
                disabled={isPending}
              >
                {isPending ? (
                  <Icons.spinner
                    className="h-[14px] w-[14px] animate-spin"
                    aria-hidden="true"
                  />
                ) : (
                  <Icons.send
                    className="h-[14px] w-[14px]"
                    aria-hidden="true"
                  />
                )}
              </Button>
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}

export default SubscribeToNewsletterForm

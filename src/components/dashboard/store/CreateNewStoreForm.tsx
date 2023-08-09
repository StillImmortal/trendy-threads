"use client"

import { useTransition } from "react"
import { useRouter } from "next/navigation"
import { Icons } from "@/constants/icons"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import * as z from "zod"

import { catchError } from "@/lib/utils"
import { storeSchema } from "@/lib/validations/store"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { addStore } from "@/app/_actions/store"

interface CreateNewStoreFormProps {
  userId: string
}

type Inputs = z.infer<typeof storeSchema>

const CreateNewStoreForm = ({ userId }: CreateNewStoreFormProps) => {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()

  // React-Hook-Form with Zod
  const form = useForm<Inputs>({
    resolver: zodResolver(storeSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  })

  const onSubmit = (data: Inputs) => {
    startTransition(async () => {
      try {
        await addStore({ ...data, userId })
        form.reset()
        toast.success("Store added successfully.")
        router.push("/dashboard/stores")
      } catch (error) {
        catchError(error)
      }
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => form.handleSubmit(onSubmit)(...args)}
        className="grid w-full max-w-xl gap-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Type store name here..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Type store description here..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-fit" disabled={isPending}>
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Create Store
          <span className="sr-only">Add Store</span>
        </Button>
      </form>
    </Form>
  )
}

export default CreateNewStoreForm

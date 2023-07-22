import Link from "next/link"

import { cn } from "@/lib/utils"

import { buttonVariants } from "../ui/button"

const CreateStoreBanner = () => {
  return (
    <section
      id="create-a-store-banner"
      aria-labelledby="create-a-store-banner-heading"
      className="grid place-items-center gap-6 rounded-lg border bg-card px-6 py-16 text-center text-card-foreground shadow-sm"
    >
      <h2 className="text-2xl font-medium sm:text-3xl">
        Do you want to sell your products on our website?
      </h2>
      <Link href="/dashboard/stores">
        <div className={cn(buttonVariants())}>
          Create a store
          <span className="sr-only">Create a store</span>
        </div>
      </Link>
    </section>
  )
}

export default CreateStoreBanner

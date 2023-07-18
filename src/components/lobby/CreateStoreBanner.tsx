import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'
import Link from 'next/link'

const CreateStoreBanner = () => {
  return (
    <section
      id="create-a-store-banner"  
      aria-labelledby='create-a-store-banner-heading'
      className='grid gap-6 px-6 py-16 text-center border rounded-lg shadow-sm place-items-center bg-card text-card-foreground'
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
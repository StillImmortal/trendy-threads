//import Image from 'next/image'
import Balance from "react-wrap-balancer"
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { buttonVariants } from '../ui/button'

const Hero = () => {
  return (
    <section 
      id="hero"  
      aria-labelledby='hero-heading'
      className='mx-auto flex w-full max-w-[64rem] flex-col items-center justify center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-32'
    >
      <h1 className='text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]'>
        An e-commerce clothing shop built with everything new in Next.js 13
      </h1>
      <Balance className="max-w-[46rem] text-lg text-muted-foreground sm:text-xl">
        Buy and sell clothing products from independent brands and stores around the world
      </Balance>
      <div className='flex flex-wrap items-center justify-center gap-4'>
        <Link
          href="/products"
          className={cn(
            buttonVariants({
              size: "lg",
            })
          )}
        >
          Buy Now
        </Link>
        <Link
          href="/dashboard/stores"
          className={cn(
            buttonVariants({
              size: "lg",
              variant: "outline"
            })
          )}
        >
          Sell Now
        </Link>
      </div>
    </section>
  )
}

export default Hero
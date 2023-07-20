import { productCategories } from '@/config'
import Link from 'next/link'
import React from 'react'
import Balance from "react-wrap-balancer"
import { AspectRatio } from '../ui/aspect-ratio'
import Image from 'next/image'

const Categories = () => {
  return (
    <section
      id="categories"
      aria-labelledby="categories-heading"
      className="py-6 space-y-6 md:pt-10 lg:pt-32"
    >
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="text-3xl font-bold leading-[1.1] sm:text-3xl md:text-5xl">
          Categories
        </h2>
        <Balance className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Explore our categories and find the best products for you
        </Balance>
      </div>
      <div className='grid grid-cols-1 gap-12 mx-auto sm:grid-cols-2 md:grid-cols-3'>
        {productCategories.map((category) => (
          <Link
            key={category.title}
            aria-label={`Go to ${category.image}`}
            href={`/categories/${category.title}`}
          >
            <div className='relative overflow-hidden rounded-md group'>
              <AspectRatio ratio={4 / 5}>
                <div className='absolute inset-0 z-10 transition-colors bg-black/60 group-hover:bg-black/70' />
                <Image
                  src={category.image}
                  alt={category.title}
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
                  fill
                  className='object-cover transition-transform group-hover:scale-105'
                  priority
                />
              </AspectRatio>
              <div className='absolute inset-0 z-20 flex items-center justify-center'>
                <h3 className='text-3xl font-medium capitalize text-slate-100 md:text-2xl'> 
                  {category.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

export default Categories
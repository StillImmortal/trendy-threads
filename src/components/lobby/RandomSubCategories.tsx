import Link from 'next/link'

import { Badge } from '../ui/badge'
import { productCategories } from '@/config'

const RandomSubCategories = () => {
  return (
    <section
      id='random-subcategories'
      aria-label='random-subcategories-heading'
      className="flex flex-wrap items-center justify-center gap-4 pb-4"
    >
      {productCategories[
        Math.floor(Math.random() * productCategories.length)
      ]?.subCategories.map((subCategory) => (
        <Link
          key={subCategory.slug}
          href={`/categories/${String(productCategories[0]?.title)}/${subCategory.slug}`}
        >
          <Badge variant="secondary" className="px-3 py-1 rounded">
            {subCategory.title}
          </Badge>
          <span className="sr-only">{subCategory.title}</span>
        </Link>
      ))}
    </section>
  )
}

export default RandomSubCategories
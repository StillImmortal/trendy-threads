import { ElementType, HTMLAttributes } from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const containerVariants = cva(["grid items-center gap-8 pb-8 pt-6 md:py-8"], {
  variants: {
    variant: {
      default: "container",
      sidebar: "",
      centered: "mx-auto my-16 max-w-md justify-center",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ContainerProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {
  as?: ElementType
}

const Container = ({
  className,
  as: Comp = "section",
  variant,
  ...props
}: ContainerProps) => {
  return (
    <Comp
      className={cn(containerVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Container, containerVariants }

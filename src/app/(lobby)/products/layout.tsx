import { ReactNode } from "react"

interface ProductsLayoutProps {
  children: ReactNode
}

const ProductsLayout = ({ children }: ProductsLayoutProps) => {
  return <>{children}</>
}

export default ProductsLayout

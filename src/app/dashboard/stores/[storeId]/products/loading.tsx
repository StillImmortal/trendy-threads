import { DataTableLoading } from "@/components/data-table"

export default function ProductsLoading() {
  return (
    <DataTableLoading
      columnCount={6}
      isNewRowCreatable={true}
      isRowsDeletable={true}
    />
  )
}

import { NextRequest, NextResponse } from "next/server";

import { ProductService } from "@/services";

export const GET = async (req: NextRequest, res: NextResponse) => {
  const result = await ProductService.getAllProducts()
  return NextResponse.json(JSON.stringify(result))
}
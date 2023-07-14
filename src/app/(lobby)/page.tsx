"use client"

import React from 'react'
import { Toaster, toast } from 'sonner'
import { Button } from '@/components/ui/button'

const page = () => {
  return (
    <div>
      <Button onClick={() => toast.message("Hello")}>
        Toast
      </Button>
    </div>
  )
}

export default page
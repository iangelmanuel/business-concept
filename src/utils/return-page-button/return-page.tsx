'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components'
import { CornerDownLeft } from 'lucide-react'

export const ReturnPage = () => {
  const router = useRouter()
  return (
    <Button
      variant="ghost"
      onClick={() => router.back()}
    >
      <CornerDownLeft size={24} />
    </Button>
  )
}

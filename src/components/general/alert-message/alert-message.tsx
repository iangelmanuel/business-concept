import { Alert, AlertDescription, AlertTitle } from '@/components'
import { InfoIcon } from 'lucide-react'

type Props = {
  variant: 'default' | 'destructive' | 'success' | null | undefined
  title: string
  description: string
  className?: string
}

export const AlertMessage = ({
  variant,
  title,
  description,
  className = ''
}: Props) => {
  return (
    <>
      <Alert
        variant={variant}
        className={className}
      >
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>{title}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </>
  )
}

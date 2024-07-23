import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  ContactDeleteButton,
  Skeleton
} from '@/components'
import { titleFont } from '@/config'
import type { ContactAllType } from '@/types'
import { Inbox, Mail, Phone } from 'lucide-react'

interface Props {
  contact: ContactAllType
}

export const ContactInfoGrid = ({ contact }: Props) => {
  return (
    <Card className="flex min-h-full flex-col justify-center">
      <CardHeader>
        <h3 className={`${titleFont.className} font-bold`}>
          Número de rádicado: {contact.id}
        </h3>

        <h4>
          <span className="text-muted-foreground">Enviado por:</span>{' '}
          <span className={`${titleFont.className} font-bold`}>
            {contact.fullName}
          </span>
        </h4>
      </CardHeader>

      <CardContent className="space-y-1">
        <CardDescription className="flex items-center gap-2 truncate">
          <Mail size={16} /> {contact.email}
        </CardDescription>

        <CardDescription className="flex items-center gap-2 truncate">
          <Phone size={16} /> {contact.phone}
        </CardDescription>

        <div className="flex items-center gap-2">
          <CardDescription>
            <Inbox size={16} />
          </CardDescription>

          <CardDescription className="truncate">
            {contact.ContactMessage[0].message}
          </CardDescription>
        </div>
      </CardContent>

      <ContactDeleteButton contactId={contact.id} />
    </Card>
  )
}

export const ContactInfoGridSkeleton = () => {
  return (
    <Card className="flex min-h-full flex-col justify-center">
      <CardHeader>
        <Skeleton className="mb-3 h-5 w-3/4" />

        <Skeleton className="mb-3 h-5 w-2/4" />

        <Skeleton className="h-5 w-3/4" />
      </CardHeader>

      <CardContent className="space-y-1">
        <div className="flex items-center gap-2 truncate">
          <Skeleton className="h-5 w-5 rounded-full" />{' '}
          <Skeleton className="h-5 w-10" />
        </div>

        <div className="flex items-center gap-2 truncate">
          <Skeleton className="h-5 w-5 rounded-full" />{' '}
          <Skeleton className="h-5 w-8" />
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-5 w-5 rounded-full" />

          <Skeleton className="h-5 w-3/4" />
        </div>
      </CardContent>

      <CardFooter>
        <Skeleton className="h-10 w-20" />
      </CardFooter>
    </Card>
  )
}

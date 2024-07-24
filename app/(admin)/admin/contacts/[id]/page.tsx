import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getContactById } from '@/actions'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Card,
  CardFooter,
  CardHeader,
  SendEmail
} from '@/components'
import { titleFont } from '@/config'
import type { ContactType } from '@/types'
import { ReturnPage, formatDate, getLettersName } from '@/utils'
import { Calendar, Mail, Phone, User, User2 } from 'lucide-react'

export async function generateMetadata({
  params
}: {
  params: { id: ContactType['id'] }
}): Promise<Metadata> {
  const { id } = params
  const contactData = await getContactById(id)
  if (!contactData) notFound()

  return {
    title: `Contacto ${contactData.fullName} - Business Concept`,
    description: `Información de contacto de ${contactData.fullName} en Business Concept`
  }
}

export default async function ContactIdPage({
  params
}: {
  params: { id: ContactType['id'] }
}) {
  const { id } = params
  const contactData = await getContactById(id)
  if (!contactData) notFound()

  const userName = contactData.fullName.split(' ')[0]
  const userLastName = contactData.fullName.split(' ')[1]

  const isUser = !!contactData.ContactMessage[0].userId
  const isUserText = isUser ? 'Usuario registrado' : 'Usuario anónimo'

  const userId = contactData.ContactMessage[0].userId

  return (
    <article>
      <h1 className={`${titleFont.className} mb-3 text-2xl font-bold`}>
        Número de radicado: {contactData.id}
      </h1>
      <ReturnPage />

      <section>
        <h2 className="mb-3 text-lg font-bold">Información del contacto</h2>
        <Card>
          <CardHeader className="mt-2 flex flex-col items-center justify-between space-y-5 border-b md:flex-row md:space-y-0">
            <div className="flex flex-col items-center">
              <User />

              {isUser ? (
                <Link
                  href={`/admin/users/${userId}`}
                  className="hover:underline"
                >
                  {contactData.fullName}
                </Link>
              ) : (
                contactData.fullName
              )}
            </div>

            <div className="flex flex-col items-center">
              <Mail />{' '}
              <SendEmail
                email={contactData.email}
                userFullName={`${userName} ${userLastName}`}
              />
            </div>

            <div className="flex flex-col items-center">
              <Phone /> {contactData.phone}
            </div>

            <div className="flex flex-col items-center">
              <Calendar /> {formatDate(contactData.createdAt)}
            </div>

            <div className="flex flex-col items-center">
              <User2 /> {isUserText}
            </div>
          </CardHeader>

          <CardFooter className="mt-5 flex items-center gap-2">
            <section>
              <Avatar>
                <AvatarImage
                  src="/images/avatar.jpg"
                  alt="avatar"
                />
                <AvatarFallback>
                  {getLettersName(userName, userLastName)}
                </AvatarFallback>
              </Avatar>
            </section>
            <ul>
              {contactData.ContactMessage.map((message) => (
                <li
                  key={message.id}
                  className="mb-2"
                >
                  <p>{message.message}</p>
                </li>
              ))}
            </ul>
          </CardFooter>
        </Card>
      </section>
    </article>
  )
}

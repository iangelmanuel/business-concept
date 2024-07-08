import {
  Body,
  Container,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Text
} from '@react-email/components'
import process from 'process'

const { VERCEL_URL } = process.env

type DropboxResetPasswordEmailProps = {
  userFullName: string
  message: string
}

const baseUrl = VERCEL_URL ? `https://${VERCEL_URL}` : ''

export const UserEmailTemplate = ({
  userFullName,
  message
}: DropboxResetPasswordEmailProps) => {
  return (
    <Html>
      <Head />
      <Preview>Nos hemos puesto en contacto contigo</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`${baseUrl}/logo.png`}
            width="40"
            height="33"
            alt="Business Concept Logo"
          />
          <Section>
            <Text style={text}>Hola {userFullName},</Text>
            <Text style={text}>
              Uno de nuestros asesores se ha contactado contigo para brindarte
              la mejor atención posible.
            </Text>

            {message.includes('\n') ? (
              message.split('\n').map((line, i) => (
                <Text
                  key={i}
                  style={text}
                >
                  {line}
                </Text>
              ))
            ) : (
              <Text style={text}>{message}</Text>
            )}

            <Text style={text}>
              Si tienes alguna pregunta, no dudes en ponerte en contacto con
              nosotros por medio de
              <Link
                style={anchor}
                href={`${baseUrl}/contact`}
              >
                este enlace
              </Link>
            </Text>

            <Text style={text}>Gracias por confiar en nosotros.</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

const main = {
  backgroundColor: '#f6f9fc',
  padding: '10px 0'
}

const container = {
  backgroundColor: '#ffffff',
  border: '1px solid #f0f0f0',
  padding: '45px'
}

const text = {
  fontSize: '16px',
  fontFamily:
    "'Open Sans', 'HelveticaNeue-Light', 'Helvetica Neue Light', 'Helvetica Neue', Helvetica, Arial, 'Lucida Grande', sans-serif",
  fontWeight: '300',
  color: '#404040',
  lineHeight: '26px'
}

const anchor = {
  textDecoration: 'underline'
}

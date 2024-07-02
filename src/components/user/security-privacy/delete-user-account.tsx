'use client'

import { deleteUserAccount, logoutUser } from '@/actions'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { titleFont } from '@/config'
import { useSession } from 'next-auth/react'
import { useState, useTransition } from 'react'
import { toast } from 'sonner'

export function DeleteUserAccount() {
  const [emailConfirmation, setEmailConfirmation] = useState('')
  const [textConfirmation, setTextConfirmation] = useState('')
  const [isPeding, startTransition] = useTransition()

  const { data: session } = useSession()
  const user = session?.user

  const isFormValid =
    emailConfirmation === user?.email && textConfirmation === 'BORRAR CUENTA'

  const handleClickDeleteAccount = () => {
    startTransition(async () => {
      const response = await deleteUserAccount(user?.id)
      if (response.ok) {
        toast.success(response.message, {
          duration: 3000,
          position: 'top-right'
        })
        await logoutUser()
        window.location.replace('/auth/login')
      } else {
        toast.error(response.message)
      }
    })
  }

  return (
    <section className="mx-auto mt-20 flex max-w-screen-md flex-col items-center justify-between sm:flex-row">
      <div>
        <h2 className={`${titleFont.className} text-xl font-bold`}>
          Eliminar cuenta
        </h2>
        <p>Si deseas eliminar tu cuenta, haz clic en el botón.</p>
      </div>

      <div>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">Eliminar cuenta</Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>
                ¿Estás seguro que quieres eliminar tu cuenta?
              </DialogTitle>
              <DialogDescription>
                Si deseas eliminar la cuenta sigue las siguientes instrucciones.
              </DialogDescription>
            </DialogHeader>
            <div className="mb-5 flex flex-col">
              <Label
                htmlFor="email-confirmer"
                className="mb-2"
              >
                Escribe tu correo{' '}
                <span className="font-bold">&quot;{user?.email}&quot;</span>{' '}
                para confirmar
              </Label>
              <Input
                id="email-confirmer"
                autoComplete="off"
                placeholder={`${user?.email}`}
                value={emailConfirmation}
                onChange={(e) => setEmailConfirmation(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <Label
                htmlFor="text-confirmer"
                className="mb-2"
              >
                Escribe{' '}
                <span className="font-bold">&quot;BORRAR CUENTA&quot;</span>{' '}
                para confirmar
              </Label>
              <Input
                id="text-confirmer"
                autoComplete="off"
                placeholder="BORRAR CUENTA"
                value={textConfirmation}
                onChange={(e) => setTextConfirmation(e.target.value)}
              />
            </div>
            <DialogFooter>
              <Button
                type="submit"
                variant="destructive"
                disabled={!isFormValid || isPeding}
                onClick={handleClickDeleteAccount}
              >
                Eliminar cuenta
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

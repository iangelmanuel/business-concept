"use server"

import { signOut } from "@/auth.config"

export const logoutUser = async () => await signOut()

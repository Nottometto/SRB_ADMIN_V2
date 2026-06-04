"use server"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { prisma } from "./db"
import * as z from "zod"

const signupSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string(),
})

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
})


export async function getSession(){
    return await auth.api.getSession({
    headers: await headers()
  });
}

export async function getSignUpEmail(formData:FormData){
    const data = Object.fromEntries(formData.entries())
    const parsedData = signupSchema.safeParse(data)
    if (!parsedData.success){
        return { error: "Invalid data format." }
    }

    const { name, email, password, confirmPassword} = parsedData.data
    const existingUser = await prisma.user.findUnique({ where: { email } })
    if (existingUser) {
        return { error: "An account with this email already exists." }
    }
    if(password !== confirmPassword){
        return { error: "Passwords do not match" }
    }

    try{
        await auth.api.signUpEmail({
            body: { name, email, password },
            headers: await headers()
        })
    }
    catch{
        return { error: "Something went wrong when signing up, please try again later." }
    }
    redirect("/login")
}


export async function getSignInEmail(formData:FormData){
    const data = Object.fromEntries(formData.entries())
    const parsedData = loginSchema.safeParse(data)
    if (!parsedData.success){
        return { error: "Invalid data format." }
    }

    const { email, password } = parsedData.data
    const existingUser = await prisma.user.findUnique({ where: { email } })

    if (!existingUser) {
        return { error: "No account found with this email." }
    }

    if (!existingUser.emailVerified) {
    return { error: "Please verify your email before signing in." }
    }

    try {
        await auth.api.signInEmail({
            body: { email, password },
            headers: await headers()
        })
    }
    catch {
        return { error: "Incorrect email or password." }
    }

    const session = await getSession()
    if (session?.user?.admin === true){
        redirect("/pages")
    }

    redirect("https://tp-cen-srb.github.io/RecycleTP/")
    
}

export async function getSignOut(){
    await auth.api.signOut({
        headers: await headers(),
    });

    redirect("/")
}




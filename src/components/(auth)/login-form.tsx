"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import Image from "next/image"

import * as z from "zod"; 
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { getSignInEmail } from "@/lib/auth-server"
import Link from "next/link"

const loginSchema = z.object({
  email: z.email({ error: "Email is required." }),
  password: z.string().min(8, { error: "Password must be at least 8 characters long." }),
})

type LoginFormValue = z.infer<typeof loginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit,setError, formState: { errors, isSubmitting }} = useForm<LoginFormValue>({resolver: zodResolver(loginSchema),})

  const onSubmitLogin = async (data: LoginFormValue) => {
    const formData = new FormData()
    formData.append("email", data.email)
    formData.append("password", data.password)
    
    const result = await getSignInEmail(formData)

    if (result.error){
      setError("root", { message: result.error })
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmitLogin)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-muted-foreground">
                  Login to your smart recycling bin account
                </p>
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  {...register("email")}
                />
                {errors.email && (<p className="text-sm text-destructive">{errors.email.message}</p>)}
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input id="password" type="password" {...register("password")} />
                {errors.password && (<p className="text-sm text-destructive">{errors.password.message}</p>)}
              </Field>
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Logging in..." : "Login"}
                </Button>
                {errors.root && (<p className="text-sm text-destructive text-center">{errors.root.message}</p>)}
              </Field>
              <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card"/>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link href="/signup">Sign up</Link>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <Image
              src="/recycling.png"
              alt="Recycling cover image"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover dark:brightness-[0.7]"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

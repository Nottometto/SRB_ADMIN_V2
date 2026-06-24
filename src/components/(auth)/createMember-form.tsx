"use client"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { VerifiedIcon } from "lucide-react"
import Image from "next/image"

import {signupSchema, SignupFormValue} from "@/components/(auth)/signup-schema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { useRouter } from "next/navigation"
import { getSignUpEmail } from "@/lib/auth-server"
import { updateCreateUser } from "@/lib/auth-member"

export function CreateMemberForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const { register, handleSubmit,setError, formState: { errors, isSubmitting }} = useForm<SignupFormValue>({resolver: zodResolver(signupSchema),})
    const router = useRouter()
    const onSubmitRegister = async (data: SignupFormValue) => {
      const formData = new FormData()
      formData.append("name", data.name)  
      formData.append("email", data.email)
      formData.append("password", data.password)
      formData.append("confirmPassword", data.confirmPassword)
      formData.append("school", data.school)
      formData.append("role", data.role)
      const result = await getSignUpEmail(formData)
      if (result.error){
        setError("root", { message: result.error })
      }
      if (result.success){
        await updateCreateUser()
        router.push("/admin/members")
      }
    }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={handleSubmit(onSubmitRegister)}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create Member</h1>
                <p className="text-sm text-balance text-muted-foreground">
                  Enter details below to create account
                </p>
              </div>

              <Field>
                <FieldLabel htmlFor="name">Full Name</FieldLabel>
                <Input
                  id="name"
                  type="name"
                  placeholder="John"
                  {...register("name")}
                />
                {errors.name && (<p className="text-sm text-destructive">{errors.name.message}</p>)}
              </Field>

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

              <Field className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="school">School</FieldLabel>
                  <select
                    id="school"
                    defaultValue=""
                    className="bg-muted rounded-md border h-6 px-2"
                    {...register("school")}
                  >
                    <option value="" disabled className="text-muted-foreground">Select School</option>
                    <option value="ENG">ENG</option>
                    <option value="BUS">BUS</option>
                    <option value="ASC">ASC</option>
                    <option value="DES">DES</option>
                    <option value="HSS">HSS</option>
                    <option value="IIT">IIT</option>
                    <option value="NIL">NIL</option>
                  </select>
                  {errors.school && (<p className="text-sm text-destructive">{errors.school.message}</p>)}
                </Field>
                
                <Field>
                  <FieldLabel htmlFor="role">Role</FieldLabel>
                  <select
                    id="role"
                    defaultValue=""
                    className="bg-muted rounded-md border h-6 px-2"
                    {...register("role")}
                  >
                    <option value="" className="text-muted-foreground" disabled>Select Role</option>
                    <option value="Student">Student</option>
                    <option value="Staff">Staff</option>
                  </select>
                  {errors.role && (<p className="text-sm text-destructive">{errors.role.message}</p>)}
                </Field>
              </Field>

              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input id="password" type="password" {...register("password")}/>
                    {errors.password && (<p className="text-sm text-destructive">{errors.password.message}</p>)}
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input id="confirm-password" type="password" {...register("confirmPassword")}/>
                    {errors.confirmPassword && (<p className="text-sm text-destructive">{errors.confirmPassword.message}</p>)}
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>  
              <Field>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Creating..." : "Create Account"}
                </Button>
                {errors.root && (<p className="text-sm text-destructive text-center">{errors.root.message}</p>)}
              </Field>
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

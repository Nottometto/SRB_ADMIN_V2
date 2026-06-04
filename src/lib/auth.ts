import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db"
import { resend } from "./resend"
import { nextCookies } from "better-auth/next-js";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql"
    }),

    user: {
    additionalFields: {
      admin: {
                type: "boolean",
                defaultValue: false,
            }
        }
    },

    emailAndPassword: { 
        enabled: true, 
        requireEmailVerification: true,
    },

    emailVerification: {
        sendVerificationEmail: async ({ user, url }) => {
            await resend.emails.send({
                from: "onboarding@resend.dev",
                to: user.email,
                subject: "Verify your email address",
                html: `
                  <h2>Welcome!</h2>
                  <p>Please verify your email by clicking the link below:</p>
                  <a href="${url}">Verify my email</a>`,
            });
        }
    },
    
    plugins:[nextCookies()]
});
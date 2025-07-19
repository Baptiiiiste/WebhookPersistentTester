import { z } from 'zod'

export const signInSchema = z.object({
  email: z
    .string({ required_error: 'Veuillez saisir votre adresse email' })
    .email("L'adresse email n'est pas valide"),
  password: z.string({ required_error: 'Veuillez saisir votre mot de passe' }),
})

export type SignInSchema = z.infer<typeof signInSchema>

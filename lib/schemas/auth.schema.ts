import { z } from 'zod'

export const signInSchema = z.object({
  email: z.email("L'adresse email n'est pas valide"),
  password: z.string('Le mot de passe est requis'),
})

export type SignInSchema = z.infer<typeof signInSchema>

export const signUpSchema = z.object({
  username: z
    .string('Le nom est requis')
    .min(4, 'Le nom doit contenir au moins 4 caractères')
    .max(16, 'Le nom ne doit pas dépasser 16 caractères'),

  email: z.email("L'adresse email n'est pas valide"),

  password: z
    .string('Le mot de passe est requis')
    .min(8, 'Le mot de passe doit contenir au moins 8 caractères')
    .max(64, 'Le mot de passe ne doit pas dépasser 64 caractères')
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/,
      'Le mot de passe doit contenir au moins une majuscule, une minuscule, un chiffre et un caractère spécial',
    ),
})

export type SignUpSchema = z.infer<typeof signUpSchema>

import { z } from 'zod';


const UserSchema  = z.object({
    username: z.string().min(3),
    name: z.string().min(3),
    passwordHash:z.string(),
    email:z.string().email()
})


export type  ZUser =  z.infer<typeof UserSchema> 
import { z } from "zod";

export const loginSchema = z.object({
    email: z.string ().email(),
    password: z.string().min(8)
});

export const registerSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    email: z.string(),
    password: z.string().min(8),
    passwordConfirm: z.string()
}).refine ((data) => data.password === data.passwordConfirm,{
    message: 'password do not match',
    path: ['passwordConfirm']
});

export const courseSchema = z.object({
    title: z.string().min(1),
    description: z.string(),
    descriptionForm: z.string(),
    imageUrl: z.string(),
    price: z.number({ coerce:true }),
    isPublished: z.boolean(),
    category: z.string()
});

export const titleSchema = courseSchema.pick({title:true});
export const descriptionSchema = courseSchema.pick({description:true});
export type CourseSchema = z.infer<typeof courseSchema>

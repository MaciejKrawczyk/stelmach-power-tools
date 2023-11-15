import { z } from 'zod'

export const TypeAttributeSchema = z.object({
    id: z.number().optional(),
    name: z.string().min(1),
    itemTypeId: z.number().optional()
})

export type ITypeAttribute = z.infer<typeof TypeAttributeSchema>
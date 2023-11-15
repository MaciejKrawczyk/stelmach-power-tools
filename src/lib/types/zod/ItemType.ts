import { z } from 'zod'

export const ItemTypeSchema = z.object({
    id: z.number().optional(),
    name: z.string(),
    list: z.array(z.string())
});


export type IItemType = z.infer<typeof ItemTypeSchema>

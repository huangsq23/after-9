import { z } from 'zod'

export const diningSchema = z.object({
  date: z.string()
    .min(1, 'Please select a date')
    .refine(val => {
      if (!val) return true
      const [y, m, d] = val.split('-').map(Number)
      return new Date(y, m - 1, d).getDay() !== 2
    }, 'We are closed on Tuesdays. Please choose another day.'),
  time: z.string().min(1, 'Please select a time'),
  guests: z.number().min(1, 'At least 1 guest required').max(50, 'Maximum 50 guests'),
  name: z.string().min(2, 'Full name is required'),
  phone: z.string().min(7, 'Valid phone number required'),
  email: z.string().email('Valid email address required'),
  dietary: z.string().optional(),
  hp: z.string().optional(),
})

export type DiningFormData = z.infer<typeof diningSchema>

export const DINING_TIME_SLOTS = [
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
  '20:00', '20:30', '21:00', '21:30', '22:00', '22:30',
  '23:00', '23:30', '00:00', '00:30', '01:00', '01:30',
]

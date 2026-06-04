import { z } from 'zod'

export const karaokeSchema = z.object({
  roomType: z.enum(['small', 'medium', 'large', 'venue']),
  date: z.string()
    .min(1, 'Please select a date')
    .refine(val => {
      if (!val) return true
      const [y, m, d] = val.split('-').map(Number)
      return new Date(y, m - 1, d).getDay() !== 2
    }, 'We are closed on Tuesdays. Please choose another day.'),
  startTime: z.string().min(1, 'Please select a start time'),
  duration: z.number().min(1).max(9),
  guests: z.number().min(1, 'At least 1 guest required'),
  name: z.string().min(2, 'Full name is required'),
  phone: z.string().min(7, 'Valid phone number required'),
  notes: z.string().optional(),
  hp: z.string().optional(),
})

export type KaraokeFormData = z.infer<typeof karaokeSchema>

export const ROOM_CONFIG = {
  small:  { label: 'Small',  capacity: 8,  price: 30 },
  medium: { label: 'Medium', capacity: 14, price: 40 },
  large:  { label: 'Large',  capacity: 20, price: 50 },
} as const

export const TIME_SLOTS = [
  '17:00', '18:00', '19:00', '20:00', '21:00', '22:00',
  '23:00', '00:00', '01:00',
]

interface SportEvent {
  createdAt: string
  name: string
  eventDate: Date
  ticketsCount: number
  description: string
  image: string
  ticketPrice: number
  country: string
  id: string
}

export type { SportEvent }

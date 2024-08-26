import { FC, memo } from 'react'
import { Link } from 'react-router-dom'

import { Box } from '@mui/material'

import { APP_ROUTE } from '@/types/enums/route'
import { SportEvent } from '@/types/event'
import { Button } from '@/ui-components/button'
import { CalendarIcon, ClockIcon, DollarIcon, PlaceIcon, TicketIcon } from '@/ui-components/icons'
import { Typography } from '@/ui-components/typography'

import { ContentItem } from './content-item'
import styles from './styles.module.scss'

type Props = {
  event: SportEvent
  handleOpen: (value: SportEvent) => void
}

const Card: FC<Props> = memo(({ event, handleOpen }) => {
  const date = new Date(event.eventDate)
  const day = date.getUTCDate()
  const month = date.toLocaleString('en-US', { month: 'long' })
  const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' })
  const year = date.getUTCFullYear()
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  })

  event.ticketPrice
  return (
    <Box className={styles.card} key={event.id}>
      <Box className={styles['card-image']}>
        <img src={event.image} alt={event.name} className={styles.image} loading="lazy" />

        <Box className={styles['card-overlay']}>
          <Link to={`${APP_ROUTE.EDIT_EVENT}/${event.id}`} className={styles['card-overlay-text']}>
            More details
          </Link>
        </Box>
      </Box>

      <Box className={styles['card-content']}>
        <Typography variant="h4" variantWeight="semibold" className={styles.title}>
          {event.name}
        </Typography>

        <ContentItem icon={<CalendarIcon />}>{`${day} ${month} ${year}`}</ContentItem>

        <ContentItem icon={<ClockIcon />}>{`${time} ${dayOfWeek}`}</ContentItem>

        <ContentItem icon={<PlaceIcon />}>{`Place: ${event.country}`}</ContentItem>

        <ContentItem icon={<DollarIcon />}>
          {'Ticket price: '}

          <span className={styles.span}>{event.ticketPrice}</span>
        </ContentItem>

        <ContentItem icon={<TicketIcon />}>
          {'Tickets left: '}

          <span className={styles.span}>{event.ticketsCount}</span>
        </ContentItem>

        <Button disabled={event.ticketsCount === 0} onClick={() => handleOpen(event)}>
          Buy tickets
        </Button>
      </Box>
    </Box>
  )
})

export { Card }

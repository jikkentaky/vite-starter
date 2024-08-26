import { FC, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Box, Modal } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import debounce from 'lodash.debounce'

import { useAppDispatch, useAppSelector } from '@/store'
import { fetchEvents, updateEvent } from '@/store/slices/events.slice'
import { SportEvent } from '@/types/event'
import { Button } from '@/ui-components/button'
import { CustomInput } from '@/ui-components/custom-input'
import { Typography } from '@/ui-components/typography'

import { Card } from './card'
import styles from './styles.module.scss'

type Props = {
  sortValue?: string
}

const EventsList: FC<Props> = ({ sortValue }) => {
  const [searchParams] = useSearchParams()
  const searchEvents = useAppSelector((state) => state.events.searchEvent)
  const [open, setOpen] = useState(false)
  const [currentEvent, setCurrentEvent] = useState<SportEvent | null>(null)
  const [tickets, setTickets] = useState(0)

  const handleSetTickets = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTickets(Number(event.target.value))
  }

  const handleOpen = useCallback((value: SportEvent) => {
    setOpen(true)
    setCurrentEvent(value)
  }, [])

  const handleClose = () => setOpen(false)

  const dispatch = useAppDispatch()
  const { events, isLoading } = useAppSelector((state) => state.events)

  const fetchDebouncedEvents = useCallback(
    debounce((query: string) => {
      dispatch(fetchEvents(query))
    }, 1000),
    [dispatch],
  )

  useEffect(() => {
    const urlParameters: Record<string, string> = {
      name: searchParams.get('name') || '',
      country: searchParams.get('country') || '',
      orderby: searchParams.get('orderby') || '',
    }

    const queryParams = Object.keys(urlParameters)
      .filter((key) => urlParameters[key])
      .map((key) => `${key}=${urlParameters[key]}`)
      .join('&')

    if (!queryParams && events) {
      return
    }

    fetchDebouncedEvents(queryParams)
  }, [searchEvents, fetchDebouncedEvents, sortValue])

  const handleBuyTicket = () => {
    if (!currentEvent) return

    if (tickets > currentEvent.ticketsCount) {
      alert('The number of tickets exceeds the amount of available tickets')
      return
    }

    dispatch(
      updateEvent({
        ...currentEvent,
        ticketsCount: currentEvent.ticketsCount - tickets,
      }),
    )

    handleClose()
  }

  return (
    <Box className={styles['events-list']}>
      {!isLoading &&
        events?.map((event) => <Card event={event} key={event.id} handleOpen={handleOpen} />)}

      {isLoading &&
        Array.from(new Array(8)).map((_, index) => (
          <Skeleton key={index} variant="rounded" width={270} height={485} animation="wave" />
        ))}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={styles['modal-wrapper']}>
          <Typography variant="h4" className={styles['modal-title']}>
            Purchase Ticket
          </Typography>

          <Typography variant="p" className={styles['modal-description']}>
            Please fill in the details below to purchase your ticket.
          </Typography>

          <Box className={styles['ticket-wrapper']}>
            <CustomInput
              variant="outlined"
              value={tickets}
              onChange={handleSetTickets}
              type="number"
              className={styles['ticket-field']}
            />
          </Box>

          <Button onClick={handleBuyTicket}>Purchase</Button>
        </Box>
      </Modal>
    </Box>
  )
}

export { EventsList }

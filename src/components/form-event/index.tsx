import { useEffect } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { useLocation, useParams } from 'react-router'

import { yupResolver } from '@hookform/resolvers/yup'
import { Checkbox, Textarea } from '@mui/joy'
import { Box, FormControl, FormLabel, Typography } from '@mui/material'
import { DatePicker } from 'rsuite'
import 'rsuite/DatePicker/styles/index.css'
import * as yup from 'yup'

import { useAppDispatch, useAppSelector } from '@/store'
import { createEvent, fetchEventById, updateEvent } from '@/store/slices/events.slice'
import { Button } from '@/ui-components/button'
import { CustomInput } from '@/ui-components/custom-input'

import styles from './styles.module.scss'

const schema = yup
  .object({
    name: yup.string().required(),
    description: yup.string().required(),
    eventDate: yup.date().required(),
    country: yup.string().required(),
    image: yup.string().required(),
    ticketPrice: yup.number().positive('must be > 0').integer().required('required'),
    ticketsCount: yup.number().positive('must be > 0').integer().required('required'),
    isTopEvent: yup.boolean().required(),
  })
  .required()

const today = new Date()

const defaultValues = {
  name: '',
  description: '',
  eventDate: today,
  country: '',
  image: '',
  ticketPrice: 0,
  ticketsCount: 0,
  isTopEvent: false,
}

const FormEvent = () => {
  const { id } = useParams()
  const { pathname } = useLocation()
  const dispatch = useAppDispatch()
  const { selectedEvent, isLoading } = useAppSelector((store) => store.events)

  useEffect(() => {
    if (id) {
      dispatch(fetchEventById(id))
    }
  }, [id, dispatch])

  const {
    register,
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<typeof defaultValues>({
    defaultValues,
    resolver: yupResolver(schema),
  })

  const isEdit = pathname.includes('edit')

  useEffect(() => {
    if (selectedEvent && isEdit) {
      reset({
        name: selectedEvent.name,
        description: selectedEvent.description,
        eventDate: new Date(selectedEvent.eventDate),
        country: selectedEvent.country,
        image: selectedEvent.image,
        ticketPrice: Math.round(selectedEvent.ticketPrice / 1e6),
        ticketsCount: selectedEvent.ticketsCount,
        isTopEvent: selectedEvent.isTopEvent,
      })
    } else {
      reset(defaultValues)
    }
  }, [selectedEvent, reset, pathname])

  const onSubmit = (data: typeof defaultValues) => {
    if (selectedEvent) {
      const updatedEvent = {
        ...selectedEvent,
        ...data,
      }
      dispatch(updateEvent(updatedEvent))
    } else {
      dispatch(createEvent(data))
    }
  }

  const shouldDisableDate = (date: Date) => {
    return date < today
  }

  return (
    <>
      {!isLoading && (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <CustomInput
            label="Event title"
            variant="outlined"
            placeholder={'Event title'}
            defaultValue={selectedEvent?.name || ''}
            {...register('name')}
            name="name"
            errorMessage={errors.name?.message}
          />

          <CustomInput
            label="Event image URL"
            variant="outlined"
            placeholder={'Event image URL'}
            defaultValue={defaultValues.image}
            {...register('image')}
            name="image"
            errorMessage={errors.image?.message}
          />

          <CustomInput
            label="Event country"
            variant="outlined"
            placeholder={'Event country'}
            defaultValue={defaultValues.country}
            {...register('country')}
            name="country"
            errorMessage={errors.country?.message}
          />

          <Controller
            name="eventDate"
            control={control}
            render={({ field }) => (
              <DatePicker
                format="yyyy/MM/dd HH:mm"
                placeholder="Select Date"
                shouldDisableDate={shouldDisableDate}
                {...field}
              />
            )}
          />

          <Box className={styles.wrapper}>
            <CustomInput
              label="Ticket price"
              variant="outlined"
              type="number"
              placeholder={'Ticket price'}
              defaultValue={defaultValues.ticketPrice}
              {...register('ticketPrice')}
              name="ticketPrice"
              className={styles['ticket-field']}
              errorMessage={errors.ticketPrice?.message}
            />

            <CustomInput
              label="Tickets count"
              variant="outlined"
              type="number"
              placeholder={'Tickets count'}
              defaultValue={defaultValues.ticketsCount}
              {...register('ticketsCount')}
              name="ticketsCount"
              className={styles['ticket-field']}
              errorMessage={errors.ticketsCount?.message}
            />

            <Checkbox {...register('isTopEvent')} name="isTopEvent" label="Top event" />
          </Box>

          <FormControl>
            <FormLabel>Event description</FormLabel>

            <Textarea
              variant="outlined"
              minRows={2}
              placeholder="Event description"
              defaultValue={defaultValues.description}
              {...register('description')}
              name="description"
            />

            <Typography className={styles['error-message']}>
              {errors.description?.message && errors.description?.message}
            </Typography>
          </FormControl>

          <Button type="submit">{isEdit ? 'Edit event' : 'Create event'}</Button>
        </form>
      )}
    </>
  )
}

export { FormEvent }

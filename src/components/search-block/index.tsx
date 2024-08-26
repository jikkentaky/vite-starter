import { ChangeEvent, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { Box } from '@mui/material'

import { useAppDispatch, useAppSelector } from '@/store'
import { fetchEvents, setSearchEvent } from '@/store/slices/events.slice'
import { ButtonGroupRadio } from '@/ui-components/button-group-radio'
import { CustomInput } from '@/ui-components/custom-input'

import styles from './styles.module.scss'

const filterOptions = [
  { value: 'name', label: 'Title' },
  { value: 'country', label: 'Country' },
]

const searchOptions = [
  { value: 'name', label: 'Title' },
  { value: 'country', label: 'Country' },
  { value: 'eventDate', label: 'Date' },
  { value: 'ticketPrice', label: 'Price' },
  { value: 'ticketsCount', label: 'Tickets left' },
]

type Props = {
  sortValue: string
  setSortValue: (value: string) => void
}

const SearchBlock: React.FC<Props> = ({ sortValue, setSortValue }) => {
  const [filterValue, setFilterValue] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const dispatch = useAppDispatch()
  const searchEvents = useAppSelector((state) => state.events.searchEvent)

  const handleSearch = (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    dispatch(setSearchEvent(event.target.value))
    const urlParams = {
      name: searchParams.get('name') || '',
      country: searchParams.get('country') || '',
      orderby: searchParams.getAll('orderby') || [],
    }

    setSearchParams({ ...urlParams, [filterValue]: event.target.value })
  }

  const handleChangeFilter = (_event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue) {
      setFilterValue(newValue)

      if (searchEvents) {
        dispatch(fetchEvents())
      }

      dispatch(setSearchEvent(''))
      setSearchParams({ orderby: searchParams.getAll('orderby'), [newValue]: '' })
    }
  }

  const handleChangeSort = (_event: React.MouseEvent<HTMLElement>, newValue: string | null) => {
    if (newValue) {
      const urlParams = {
        name: searchParams.get('name') || '',
        country: searchParams.get('country') || '',
        orderby: searchParams.getAll('orderby') || [],
      }

      setSortValue(newValue)
      setSearchParams({ ...urlParams, orderby: newValue })
    }
  }

  const searchPlaceholder = filterValue === filterOptions[1].value ? 'country' : 'title'

  return (
    <Box className={styles['search-wrapper']}>
      <ButtonGroupRadio
        buttons={filterOptions}
        value={filterValue}
        handleChange={handleChangeFilter}
        label="Search by:"
      />

      <CustomInput
        variant="outlined"
        placeholder={filterValue ? `Search by ${searchPlaceholder}` : `Search by...`}
        value={searchEvents}
        onChange={handleSearch}
        className={styles['search-field']}
        disabled={!filterValue}
      />

      <ButtonGroupRadio
        className={styles.sort}
        buttons={searchOptions}
        value={sortValue}
        isExclusive={false}
        handleChange={handleChangeSort}
        label="Sort by:"
      />
    </Box>
  )
}

export { SearchBlock }

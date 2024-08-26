import { useState } from 'react'

import { Box } from '@mui/material'

import { EventsList } from '@/components/events-list'
import { SearchBlock } from '@/components/search-block'

import styles from './styles.module.scss'

const MainPage = () => {
  const [sortValue, setSortValue] = useState('')

  return (
    <Box className={styles.container}>
      <SearchBlock setSortValue={setSortValue} sortValue={sortValue} />

      <EventsList sortValue={sortValue} />
    </Box>
  )
}

export { MainPage }

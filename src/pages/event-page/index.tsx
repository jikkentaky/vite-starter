import { Box } from '@mui/material'

import { FormEvent } from '@/components/form-event'

import styles from './styles.module.scss'

const EventPage = () => {
  return (
    <Box className={styles.container}>
      <FormEvent />
    </Box>
  )
}

export { EventPage }

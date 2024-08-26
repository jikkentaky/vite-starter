import { FC } from 'react'

import { Box } from '@mui/material'

import { Typography } from '@/ui-components/typography'

import styles from './styles.module.scss'

type Props = {
  icon: JSX.Element
  children: React.ReactNode
}
const ContentItem: FC<Props> = ({ icon, children }) => {
  return (
    <Box className={styles['date-wrapper']}>
      {icon}

      <Typography variant="p" className={styles.date}>
        {children}
      </Typography>
    </Box>
  )
}

export { ContentItem }

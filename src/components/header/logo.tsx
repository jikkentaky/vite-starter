import { Box } from '@mui/material'

import { LogoIcon } from '@/ui-components/icons'
import { Typography } from '@/ui-components/typography'

import styles from './styles.module.scss'

const Logo = () => {
  return (
    <Box className={styles['logo-wrapper']}>
      <LogoIcon />

      <Typography variant="h1" variantWeight="semibold" className={styles.title}>
        Football Events
      </Typography>
    </Box>
  )
}

export { Logo }

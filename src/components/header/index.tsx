import { Box } from '@mui/material'

import { Logo } from '@/components/header/logo'
import { NavList } from '@/components/header/nav-list'

import styles from './styles.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <Box className={styles['header-wrapper']}>
        <Logo />

        <NavList />
      </Box>
    </header>
  )
}

export { Header }

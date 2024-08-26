import { Link } from 'react-router-dom'

import { APP_ROUTE } from '@/types/enums/route'

import styles from './styles.module.scss'

const NavList = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles['nav-list']}>
        <li className={styles['nav-item']}>
          <Link to={APP_ROUTE.ROOT} className={styles['nav-link']}>
            all events
          </Link>
        </li>

        <li>
          <Link to={APP_ROUTE.CREATE_EVENT} className={styles['nav-link']}>
            add event
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export { NavList }

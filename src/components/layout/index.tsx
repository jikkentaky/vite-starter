import { Route, Routes } from 'react-router-dom'

import { Header } from '@/components/header'
import { EventPage } from '@/pages/event-page'
import { MainPage } from '@/pages/main-page'
import { APP_ROUTE } from '@/types/enums/route'

const ROUTES = [
  {
    path: APP_ROUTE.ROOT,
    element: <MainPage />,
  },
  {
    path: APP_ROUTE.CREATE_EVENT,
    element: <EventPage />,
  },
  {
    path: `${APP_ROUTE.EDIT_EVENT}/:id`,
    element: <EventPage />,
  },
]

const Layout = () => {
  return (
    <>
      <Header />

      <Routes>
        {ROUTES.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </>
  )
}

export { Layout }

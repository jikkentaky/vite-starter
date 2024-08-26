import { FC, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'
import { BrowserRouter as Router } from 'react-router-dom'

import { Layout } from '@/components/layout'
import { useAppSelector } from '@/store'

const App: FC = () => {
  const errorMessage = useAppSelector((state) => state.events.errorMessage)

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage)
    }
  }, [errorMessage])

  return (
    <>
      <Router>
        <Layout />
      </Router>

      <Toaster />
    </>
  )
}

export { App }

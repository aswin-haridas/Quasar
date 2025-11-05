import { Outlet } from 'react-router-dom'
import { Header } from '../components/ui'
import { Toaster } from 'sonner'

export default function MainLayout() {
  return (
    <main className="h-screen w-screen">
      <Toaster
        position="top-center"
        visibleToasts={1}
        toastOptions={{
          style: {
            color: 'blue',
          },
        }}
      />
      <Header />
      <div className="h-full w-full">
        <Outlet />
      </div>
    </main>
  )
}

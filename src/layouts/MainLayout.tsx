import { Outlet } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Header } from '../components/ui'

export default function MainLayout() {
  return (
    <main className="flex h-screen w-screen flex-col overflow-hidden">
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
      <div className="w-full flex-1 overflow-hidden">
        <Outlet />
      </div>
    </main>
  )
}

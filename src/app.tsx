import { BrowserRouter, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/main-layout'
import Profile from './pages/profile'
import Workplace from './pages/workplace'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Workplace />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

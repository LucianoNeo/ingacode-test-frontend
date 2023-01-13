import { Route, Routes } from 'react-router-dom'
import { RequireAuth } from './contexts/RequireAuth'
import Home from './pages/Home'
import Login from './pages/Login'



export default function Router() {
    return (
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/home' element={
                <RequireAuth>
                    <Home />
                </RequireAuth>
            } />
        </Routes>
    )
}

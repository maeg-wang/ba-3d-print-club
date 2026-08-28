import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Gallery from './pages/Gallery'
import Register from './pages/Register'
import Admin from './pages/Admin'

function App() {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/register" element={<Register />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
            <footer className="footer">
                <p>© 2026 学校3D打印社团 · React + GitHub Pages</p>
            </footer>
        </div>
    )
}

export default App
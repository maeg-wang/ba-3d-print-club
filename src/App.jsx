import { Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
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
                <p>© 2026 北京中学 3D打印社团 · React + Cloudflare Pages + Cloudflare Workers · <Link to="https://github.com/maeg-wang/ba-3d-print-club">🔗GitHub</Link></p>
            </footer>
        </div>
    )
}

export default App
import { NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    return (
        <nav className="navbar">
            <div className="nav-container">
                <div className="logo">
                    <NavLink to="https://www.beijingacademy.com.cn/"><img src="./logo1.png" alt="北京中学" className="logo"></img></NavLink>
                    <NavLink to="/" className="logo">3D打印社团</NavLink>
                </div>
                <ul className="nav-links">
                    <li><NavLink to="/" className={({ isActive }) => isActive ? 'active' : ''}>首页</NavLink></li>
                    <li><NavLink to="/about" className={({ isActive }) => isActive ? 'active' : ''}>关于我们</NavLink></li>
                    <li><NavLink to="/gallery" className={({ isActive }) => isActive ? 'active' : ''}>作品展示</NavLink></li>
                    <li><NavLink to="/register" className={({ isActive }) => isActive ? 'active' : ''}>打印登记</NavLink></li>
                    <li><NavLink to="/admin" className={({ isActive }) => isActive ? 'active' : ''} style={{ color: '#dc2626', fontWeight: 700 }}>管理</NavLink></li>
                </ul>
            </div>
        </nav>
    )
}

export default Navbar
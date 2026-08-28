import { NavLink } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './Navbar.css'
function Navbar() {
    const [theme, setTheme] = useState(() => {
        const saved = localStorage.getItem('theme')
        if (saved === 'light' || saved === 'dark')
            return saved
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    })
    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)
    }, [theme])
    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light')
    }
    return (
        <nav className='navbar'>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink to='https://www.beijingacademy.com.cn/'>
                        <img src='./logo1.png' alt='北京中学' className='logo-img'></img>
                    </NavLink>
                    <NavLink to='/' className='logo-text'>3D打印社团</NavLink>
                </div>
                <ul className='nav-links'>
                    <li><NavLink to='/' className={({ isActive }) => isActive ? 'active' : ''}>首页</NavLink></li>
                    <li><NavLink to='/about' className={({ isActive }) => isActive ? 'active' : ''}>关于我们</NavLink></li>
                    <li><NavLink to='/gallery' className={({ isActive }) => isActive ? 'active' : ''}>作品展示</NavLink></li>
                    <li><NavLink to='/register' className={({ isActive }) => isActive ? 'active' : ''}>打印登记</NavLink></li>
                    <li><NavLink to='/admin' className={({ isActive }) => isActive ? 'active' : ''} style={{ color: 'var(--primary)', fontWeight: 700 }}>管理</NavLink></li>
                    <li> <button className='theme-toggle' onClick={toggleTheme} title={theme === 'light' ? '切换到深色模式' : '切换到浅色模式'}> {theme === 'light' ? '🌙' : '☀️'} </button> </li>
                </ul>
            </div>
        </nav>)
} export default Navbar
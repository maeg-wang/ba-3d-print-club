import { useState, useEffect } from 'react'
import './Admin.css'

const API_BASE = 'https://ba-3d-print-api.wangzenfa2022.workers.dev'

// 从 sessionStorage 读取密码（关闭标签页失效，比 localStorage 安全）
const getStoredKey = () => sessionStorage.getItem('admin_key') || ''
const setStoredKey = (key) => sessionStorage.setItem('admin_key', key)

const STATUS_MAP = {
    pending: { label: '待处理', class: 'status-pending' },
    claimed: { label: '已认领', class: 'status-claimed' },
    printing: { label: '打印中', class: 'status-printing' },
    completed: { label: '已完成', class: 'status-completed' },
    cancelled: { label: '已取消', class: 'status-cancelled' }
}

const STATUS_OPTIONS = [
    { value: 'pending', label: '待处理' },
    { value: 'claimed', label: '已认领' },
    { value: 'printing', label: '打印中' },
    { value: 'completed', label: '已完成' },
    { value: 'cancelled', label: '已取消' }
]
function Admin() {
    const [adminKey, setAdminKey] = useState(getStoredKey)
    const [inputKey, setInputKey] = useState('')
    const [authError, setAuthError] = useState(false)

    const [jobs, setJobs] = useState([])
    const [filter, setFilter] = useState('all')
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)

    // 带密码的 fetch 封装
    const fetchWithAuth = (url, options = {}) => {
        return fetch(url, {
            ...options,
            headers: {
                ...options.headers,
                'X-Admin-Key': adminKey
            }
        })
    }

    const verifyAndLoad = async (key) => {
        setLoading(true)
        setAuthError(false)
        try {
            const res = await fetch(`${API_BASE}/jobs?status=all`, {
                headers: { 'X-Admin-Key': key }
            })
            if (res.status === 401) {
                setAuthError(true)
                setLoading(false)
                return false
            }
            const data = await res.json()
            setJobs(data.jobs || [])
            setAdminKey(key)
            setStoredKey(key)
            return true
        } catch (err) {
            alert('连接失败: ' + err.message)
            setLoading(false)
            return false
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (adminKey) {
            const timer = setTimeout(() => verifyAndLoad(adminKey), 0)
            return () => clearTimeout(timer)
        }
    }, [])

    const handleLogin = (e) => {
        e.preventDefault()
        verifyAndLoad(inputKey)
    }

    const fetchJobs = async () => {
        if (!adminKey) return
        setLoading(true)
        try {
            const res = await fetchWithAuth(`${API_BASE}/jobs?status=all`)
            if (res.status === 401) {
                setAdminKey('')
                setStoredKey('')
                return
            }
            const data = await res.json()
            setJobs(data.jobs || [])
        } catch (err) {
            alert('加载失败: ' + err.message)
        } finally {
            setLoading(false)
        }
    }

    // 如果未登录，显示密码输入界面
    if (!adminKey) {
        return (
            <div className="admin-login-wrap">
                <div className="admin-login-box">
                    <h2>🔒 管理后台</h2>
                    <p>请输入管理员密钥</p>
                    <form onSubmit={handleLogin}>
                        <input
                            type="password"
                            placeholder="管理密码"
                            value={inputKey}
                            onChange={e => { setInputKey(e.target.value); setAuthError(false) }}
                            autoFocus
                        />
                        {authError && <div className="auth-error">密码错误，请重试</div>}
                        <button type="submit" className="btn btn-primary">进入</button>
                    </form>
                </div>
            </div>
        )
    }

    // 后面的 stats、filter、table 代码完全不变...
    // 只需要把原来直接 fetch 的地方改成 fetchWithAuth

    const updateStatus = async (jobId, newStatus) => {
        try {
            await fetchWithAuth(`${API_BASE}/jobs/${jobId}/status`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus })
            })
            fetchJobs()
        } catch (err) {
            alert('更新失败: ' + err.message)
        }
    }

    const deleteJob = async (jobId) => {
        if (!confirm('确定删除这条记录？此操作不可恢复。')) return
        try {
            await fetchWithAuth(`${API_BASE}/jobs/${jobId}`, { method: 'DELETE' })
            fetchJobs()
        } catch (err) {
            alert('删除失败: ' + err.message)
        }
    }

    const filteredJobs = jobs.filter(job => {
        const matchStatus = filter === 'all' || job.status === filter
        const keyword = search.trim().toLowerCase()
        const matchSearch = !keyword ||
            job.applicant_name?.toLowerCase().includes(keyword) ||
            job.class_name?.toLowerCase().includes(keyword) ||
            job.job_id?.toLowerCase().includes(keyword)
        return matchStatus && matchSearch
    })

    const stats = {
        total: jobs.length,
        pending: jobs.filter(j => j.status === 'pending').length,
        active: jobs.filter(j => j.status === 'claimed' || j.status === 'printing').length,
        completed: jobs.filter(j => j.status === 'completed').length
    }

    const formatDate = (iso) => {
        if (!iso) return '-'
        const d = new Date(iso)
        return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
    }

    const formatSize = (bytes) => {
        if (!bytes) return '-'
        return (bytes / 1024 / 1024).toFixed(2) + ' MB'
    }

    return (
        <div>
            <section className="hero admin-hero">
                <h1>管理后台</h1>
                <p>查看和处理所有 3D 打印登记记录</p>
            </section>

            <section className="container">
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-value">{stats.total}</div>
                        <div className="stat-label">总任务</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{stats.pending}</div>
                        <div className="stat-label">待处理</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{stats.active}</div>
                        <div className="stat-label">进行中</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">{stats.completed}</div>
                        <div className="stat-label">已完成</div>
                    </div>
                </div>

                <div className="filter-bar">
                    <select value={filter} onChange={e => setFilter(e.target.value)}>
                        <option value="all">全部状态</option>
                        {STATUS_OPTIONS.map(s => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="搜索姓名、班级或任务编号..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="table-wrap">
                    {loading ? (
                        <div className="loading">加载中...</div>
                    ) : filteredJobs.length === 0 ? (
                        <div className="empty">暂无记录</div>
                    ) : (
                        <table className="admin-table">
                            <thead>
                                <tr>
                                    <th>任务编号</th>
                                    <th>申请人</th>
                                    <th>班级</th>
                                    <th>联系方式</th>
                                    <th>材料</th>
                                    <th>尺寸</th>
                                    <th>文件名</th>
                                    <th>紧急度</th>
                                    <th>状态</th>
                                    <th>提交时间</th>
                                    <th>操作</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredJobs.map(job => (
                                    <tr key={job.job_id}>
                                        <td title={job.job_id}>{job.job_id.slice(0, 8)}...</td>
                                        <td>{job.applicant_name}</td>
                                        <td>{job.class_name}</td>
                                        <td>{job.contact || '-'}</td>
                                        <td>{job.material}</td>
                                        <td>{job.dimensions || '-'}</td>
                                        <td title={job.file_name}>{job.file_name ? job.file_name.slice(0, 12) + '...' : '-'}</td>
                                        <td className={job.priority === 'urgent' ? 'priority-urgent' : ''}>
                                            {job.priority === 'urgent' ? '🔴 加急' : '普通'}
                                        </td>
                                        <td>
                                            <span className={`status-badge ${STATUS_MAP[job.status]?.class || ''}`}>
                                                {STATUS_MAP[job.status]?.label || job.status}
                                            </span>
                                        </td>
                                        <td>{formatDate(job.created_at)}</td>
                                        <td>
                                            <select
                                                className="action-select"
                                                value={job.status}
                                                onChange={e => updateStatus(job.job_id, e.target.value)}
                                            >
                                                {STATUS_OPTIONS.map(s => (
                                                    <option key={s.value} value={s.value}>{s.label}</option>
                                                ))}
                                            </select>
                                            <button className="btn-delete" onClick={() => deleteJob(job.job_id)}>删除</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </section>
        </div>
    )
}

export default Admin
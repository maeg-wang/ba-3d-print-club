import { Link } from 'react-router-dom'
import './Home.css'

function Home() {
    return (
        <div>
            <section className="hero">
                <h1>将想象变为现实</h1>
                <p>学校3D打印社团官方平台，提供设备预约、模型分享与技术交流</p>
                <Link to="/register" className="btn btn-accent">立即登记打印</Link>
            </section>

            <section className="container">
                <h2 className="section-title">快速入口</h2>
                <div className="grid entry-grid">
                    <div className="card entry-card">
                        <div className="card-icon">📋</div>
                        <h3>打印登记</h3>
                        <p>提交你的3D模型，预约打印时间与设备。</p>
                        <br />
                        <Link to="/register" className="btn btn-primary">去登记</Link>
                    </div>
                    <div className="card entry-card">
                        <div className="card-icon">🎨</div>
                        <h3>作品展示</h3>
                        <p>浏览社团成员的优秀3D打印作品。</p>
                        <br />
                        <Link to="/gallery" className="btn btn-primary">看作品</Link>
                    </div>
                    <div className="card entry-card">
                        <div className="card-icon">👥</div>
                        <h3>加入社团</h3>
                        <p>了解社团活动安排与招新信息。</p>
                        <br />
                        <Link to="/about" className="btn btn-primary">了解我们</Link>
                    </div>
                </div>
            </section>

            <section className="container features">
                <h2 className="section-title">社团服务</h2>
                <div className="feature-list">
                    <div className="feature-item">FDM 3D打印机免费使用</div>
                    <div className="feature-item">光固化打印（SLA）高精度模型</div>
                    <div className="feature-item">建模软件教学（Fusion 360, Blender）</div>
                    <div className="feature-item">模型切片与打印参数优化指导</div>
                    <div className="feature-item">耗材提供（PLA/PETG/树脂）</div>
                    <div className="feature-item">每周技术分享会</div>
                </div>
            </section>
        </div>
    )
}

export default Home
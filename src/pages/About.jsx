import './About.css'

function About() {
    return (
        <div>
            <section className="hero about-hero">
                <h1>关于社团</h1>
                <p>致力于推广3D打印技术与创客文化</p>
            </section>

            <section className="container">
                <div className="grid">
                    <div className="card">
                        <h3>社团宗旨</h3>
                        <p>让每位同学都能接触并掌握3D打印技术，将创意从屏幕带入现实。倡导开源分享、动手实践、协作创新。</p>
                    </div>
                    <div className="card">
                        <h3>现有设备</h3>
                        <p>• 拓竹H2C × 1台<br />• 拓竹H2S × 1台<br />• 拓竹A1 × 3台<br />• TINA2s × 1台</p>
                    </div>
                    <div className="card">
                        <h3>开放时间</h3>
                        <p>周一至周五：16:30 - 20:00<br /><del>周六周日：09:00 - 17:00</del><br />节假日另行通知</p>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default About
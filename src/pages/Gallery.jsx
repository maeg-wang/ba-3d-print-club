import './Gallery.css'

const works = [
    { id: 1, emoji: '🤖', title: '机械齿轮组', author: '张三', time: '8h', material: 'PLA', gradient: 'linear-gradient(135deg,#667eea,#764ba2)' },
    { id: 2, emoji: '🏛️', title: '建筑模型', author: '李四', time: '12h', material: '树脂', gradient: 'linear-gradient(135deg,#f093fb,#f5576c)' },
    { id: 3, emoji: '🎭', title: '艺术面具', author: '王五', time: '5h', material: 'PETG', gradient: 'linear-gradient(135deg,#4facfe,#00f2fe)' },
]

function Gallery() {
    return (
        <div className="container">
            <h2 className="section-title">优秀作品</h2>
            <div className="gallery-grid">
                {works.map(work => (
                    <div className="gallery-item" key={work.id}>
                        <div className="gallery-thumb" style={{ background: work.gradient }}>
                            <span className="gallery-emoji">{work.emoji}</span>
                        </div>
                        <div className="gallery-info">
                            <h3>{work.title}</h3>
                            <p>作者：{work.author} | 打印时长：{work.time} | 材料：{work.material}</p>
                        </div>
                    </div>
                ))}
            </div>
            <p className="gallery-tip">💡 提示：把图片放入 public/images/ 文件夹，然后把上面的色块替换成 &lt;img src="/images/xxx.jpg" /&gt; 即可展示真实作品</p>
        </div>
    )
}

export default Gallery
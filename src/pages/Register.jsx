import './Register.css'

function Register() {
    return (
        <div className="container">
            <h2 className="section-title">3D打印登记</h2>

            <div className="register-box">
                <div className="notice">
                    <strong>📢 登记须知：</strong><br />
                    1. 请确保模型文件为 .stl 或 .obj 格式<br />
                    2. 尺寸不超过 200×200×200mm（FDM）或 120×68×150mm（光固化）<br />
                    3. 提交后社团管理员会在24小时内审核并联系你
                </div>

                <div className="placeholder-form">
                    <div className="placeholder-icon">🚧</div>
                    <h3>登记系统建设中</h3>
                    <p>表单服务正在接入中，敬请期待...</p>
                    <p className="placeholder-contact">如需紧急打印，请联系社团管理员</p>
                </div>
            </div>
        </div>
    )
}

export default Register
import { useState } from 'react';
import './Register.css';

const API_BASE = 'https://3d-api.maegwang.dpdns.org'

function Register() {
    const [form, setForm] = useState({
        applicant_name: '',
        class_name: '',
        contact: '',
        material: 'PLA',
        dimensions: '',
        file_name: '',
        file_size: 0,
        purpose: '',
        priority: 'normal',
        notes: ''
    });
    const [submitting, setSubmitting] = useState(false);
    const [result, setResult] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            const ext = file.name.split('.').pop().toLowerCase()
            if (!['stl', 'obj', '3mf'].includes(ext)) {
                alert('请上传 .stl 或 .obj 或 .3mf 格式的模型文件')
                e.target.value = ''  // 清空选择
                return
            }
            setForm(prev => ({
                ...prev,
                file_name: file.name,
                file_size: file.size
            }))
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!form.applicant_name || !form.class_name) {
            alert('请填写姓名和班级');
            return;
        }

        setSubmitting(true);
        try {
            const res = await fetch(`${API_BASE}/api/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form)
            });
            const data = await res.json();
            setResult(data);
            if (data.success) {
                setForm({
                    applicant_name: '', class_name: '', contact: '',
                    material: 'PLA', dimensions: '', file_name: '',
                    file_size: 0, purpose: '', priority: 'normal', notes: ''
                });
            }
        } catch (err) {
            alert('提交失败: ' + err.message);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="container">
            <h2 className="section-title">3D打印登记</h2>

            <div className="register-box">
                <div className="notice">
                    <strong>📢 登记须知：</strong><br />
                    1. 请确保模型文件为 .stl 或 .obj 或 .3mf格式<br />
                    2. 尺寸不超过 256mm*256mm*256mm（A1）或 300mm*320mm*320mm（H2C）<br />
                    3. 提交后请<strong>线下将文件拷贝给社团管理员</strong>，管理员会放入实体机队列
                </div>

                <form onSubmit={handleSubmit} className="register-form">
                    <div className="form-row">
                        <div className="form-group">
                            <label>姓名 *</label>
                            <input name="applicant_name" value={form.applicant_name} onChange={handleChange} required />
                        </div>
                        <div className="form-group">
                            <label>班级 *</label>
                            <input name="class_name" value={form.class_name} onChange={handleChange} placeholder="如：高二3班" required />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>联系方式</label>
                        <input name="contact" value={form.contact} onChange={handleChange} placeholder="手机号/微信" />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>材料偏好</label>
                            <select name="material" value={form.material} onChange={handleChange}>
                                <option value="PLA">PLA</option>
                                <option value="PETG">PETG</option>
                                <option value="其他">其他</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>模型尺寸</label>
                            <input name="dimensions" value={form.dimensions} onChange={handleChange} placeholder="如：120x80x60mm" />
                        </div>
                    </div>

                    <div className="form-group">
                        <label>模型文件（仅登记文件名，线下交接）</label>
                        <input type="file" accept=".stl,.obj,.3mf" onChange={handleFileChange} />
                        {form.file_name && <span className="file-tag">📎 {form.file_name} ({(form.file_size / 1024 / 1024).toFixed(2)} MB)</span>}
                    </div>

                    <div className="form-group">
                        <label>打印用途</label>
                        <textarea name="purpose" value={form.purpose} onChange={handleChange} rows="3" placeholder="简述用途和特殊要求..." />
                    </div>

                    <div className="form-row">
                        <div className="form-group">
                            <label>紧急程度</label>
                            <select name="priority" value={form.priority} onChange={handleChange}>
                                <option value="normal">普通</option>
                                <option value="urgent">加急</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>备注</label>
                            <input name="notes" value={form.notes} onChange={handleChange} placeholder="其他说明" />
                        </div>
                    </div>

                    <button type="submit" className="btn btn-primary" disabled={submitting}>
                        {submitting ? '提交中...' : '提交登记'}
                    </button>
                </form>

                {result && (
                    <div className={`result-box ${result.success ? 'success' : 'error'}`}>
                        {result.success ? (
                            <>
                                ✅ <strong>登记成功！</strong><br />
                                任务编号：{result.jobId}<br />
                                <small>请记下编号，线下交接文件时告知管理员</small>
                            </>
                        ) : (
                            <>❌ 提交失败：{result.message}</>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Register;
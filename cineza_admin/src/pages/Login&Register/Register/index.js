import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './register.css';

const Register = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState(null);

  const handleRegister = () => {
    // Xử lý đăng ký ở đây
  };

  return (
    <div className='wrapper-register'>
      <div className="container-register">
        <h1>Đăng Ký</h1>
        <form>
          <label>Họ Tên:</label>
          <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />

          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>Mật Khẩu:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

          <label>Ngày Sinh:</label>
          <DatePicker selected={birthDate} onChange={(date) => setBirthDate(date)} />

          <button type="button" onClick={handleRegister}>
            Đăng Ký
          </button>
        </form>
        <p className="login-prompt">
          Bạn đã có tài khoản? <a href="/cineza/admin/login">Đăng nhập ngay</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
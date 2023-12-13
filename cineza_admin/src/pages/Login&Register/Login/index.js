import React from "react";

import "./login.css";

import { useEffect, useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState("");
  const [disableLogin, setDisableLogin] = useState(false);

  useEffect(() => {
    const validateInput = () => {
      let messengeError = {};

      if (!email) {
        messengeError.errorEmail = 'Email không được bỏ trống'
      } else if (!/\S+@\S+\.\S+/.test(email)) {
        messengeError.errorEmail = 'Email không đúng'
      }

      if (!password) {
        messengeError.errorPassword = 'Mật khẩu không được bỏ trống'
      } else if (password.length < 6) {
        messengeError.errorPassword = 'Mật khẩu ít nhất 6 ký tự'
      }

      setErrors(messengeError);
      setDisableLogin(Object.keys(messengeError).length === 0);
    }
    validateInput();
  }, [email, password])


  const onClickLogin = async () => {
    if (disableLogin) {
      try {
        console.log(email, password)
        const result = await axios.get(`http://localhost:9000/cineza/api/v1/user/login/${email}/${password}`);
        console.log(result.data)
        if (result.data != "") {
          if (result.data.type == "ADMIN") {
            console.log(result.data)
            localStorage.setItem("userAdmin", JSON.stringify(result.data));
            window.location.href = "/cineza/admin/home";
          } else {
            setErrors({ ...errors, errorType: 'Không có quyền truy cập' })
          }
        } else {
          setErrors({ ...errors, errorType: 'Sai tài khoản hoặc mật khẩu' })
        }

      } catch (error) {
        console.log("error check role user: ", error);
      }
    }
  };
  const onClickForget = async () => {
    window.location.href = "/cineza/admin/forget";
  };
  const onClickRegister = async () => {
    window.location.href = "/cineza/admin/register";
  };

  const handleOnChangePassword = (text) => {
    setPassword(text.target.value);
  };
  const handleOnChangeEmail = (text) => {
    setEmail(text.target.value);
  };
  return (
    <div className="container">
      <div style={{ height: 20 }}></div>
      <div className="login-container">
        <h2 id="headerTitle">Đăng nhập</h2>

        <div className="row">
          <span style={{ color: "red" }}>{errors.errorType}</span>
          <label>Email</label>
          <input type="text" placeholder="Nhập email" onChange={handleOnChangeEmail} />
          <span style={{ paddingBottom: "20px", color: "red" }}>{errors.errorEmail}</span>
          <label>Mật khẩu</label>
          <input type="text" placeholder="Nhập mật khẩu" onChange={handleOnChangePassword} />
          <span style={{ color: "red" }}>{errors.errorPassword}</span>
          <button onClick={onClickLogin} style={disableLogin ? {} : { background: "rgb(160, 160, 160)" }}>Đăng nhập</button>
        </div>
        <div className="forget">
          <div onClick={onClickForget}>Quên mật khẩu?</div>
        </div>

        {/* <div className="row">
          <div className="register" onClick={onClickRegister}>
            Đăng ký
          </div>
        </div> */}
        <div id="alternativeLogin"></div>
      </div>
    </div>
  );
};

export default Login;

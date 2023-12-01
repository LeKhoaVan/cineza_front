import React from "react";

import "./forgetPassword.css";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const ForgetPassword = () => {
  const onClickLogin = async () => {
    window.location.href = "/cineza/admin/login";
  };
  const onClickChange = async () => {
    window.location.href = "/cineza/admin/change";
  };
  const onClickRegister = async () => {
    window.location.href = "/cineza/admin/register";
  };
  return (
    <div className="container">
      <div style={{ height: 20 }}></div>
      <div className="login-container">
        <h2 id="headerTitle">Quên mật khẩu</h2>

        <div class="row">
          <label>Email</label>
          <input type="text" placeholder="Nhập email" />

          <button onClick={onClickChange}>Xác nhận</button>
        </div>

        <div class="forget">
          <div onClick={onClickLogin}>Đăng nhập</div>
        </div>

        <div class="forget-register">
          <div onClick={onClickRegister}>Đăng ký</div>
        </div>
        <div id="alternativeLogin"></div>
      </div>
    </div>
  );
};

export default ForgetPassword;

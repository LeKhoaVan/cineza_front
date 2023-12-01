import React from "react";

import "./changePassword.css";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

const ChangePassword = () => {
  const onClickRegister = async () => {
    window.location.href = "/cineza/admin/register";
  };
  const onClickLogin = async () => {
    window.location.href = "/cineza/admin/login";
  };

  return (
    <div className="container">
      <div style={{ height: 20 }}></div>
      <div className="login-container">
        <h2 id="headerTitle">Đổi mật khẩu</h2>

        <div class="row">
          <label>Mật khẩu</label>
          <input type="text" placeholder="Nhập mật khẩu" />
          <label>Xác nhận mật khẩu</label>
          <input type="text" placeholder="Nhập lại mật khẩu" />
          <button onClick={onClickLogin}>Đổi mật khẩu</button>
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

export default ChangePassword;

import React from "react";
import ReactDOM from "react-dom";

import iconClose from "../../assets/imageButtons/iconClose.png";
import "./confirmAlert.css"; // Import file CSS cho component (đảm bảo bạn đã tạo file CSS này)

const ConfirmAlert = ({ message, onClose, onHandle }) => {
  return ReactDOM.createPortal(
    <div className="confirm-alert-overlay">
      <div className="confirm-alert">
        <div className="confirm-alert-container">
          <div className="header-close">
            <img
              className="icon-close"
              src={iconClose}
              alt="close"
              onClick={onClose}
            />
          </div>
          <div className="confirm-alert-body">
            <p>{message}</p>
            <button style={{ marginTop: 30 }} onClick={onHandle}>
              Xác nhận
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ConfirmAlert;

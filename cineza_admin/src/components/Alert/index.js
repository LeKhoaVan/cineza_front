import React from "react";
import ReactDOM from "react-dom";
import "./Alert.css"; // Import file CSS cho component (đảm bảo bạn đã tạo file CSS này)

const Alert = ({ message, onClose }) => {
  return ReactDOM.createPortal(
    <div className="alert-overlay">
      <div className="alert">
        <p>{message}</p>
        <button style={{ marginTop: 30, width: "80%" }} onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>,
    document.body
  );
};

export default Alert;

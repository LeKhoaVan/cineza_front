import React from "react";

import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import iconDetail from "../../assets/imageButtons/iconDetail.png";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import Table from "../../components/Table";
import Alert from "../../components/Alert";
import "./orderDetail.css";
import RoomDetail from "../RoomDetail";

import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatDateHandle } from "../../components/util/index";
// import TimePicker from "rc-time-picker";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
// import "rc-time-picker/assets/index.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { parse, format } from "date-fns";
import vi from "date-fns/locale/vi";
import axios from "axios";
registerLocale("vi", vi);

const dataStatus = [
  { id: "Hoạt động", value: "Hoạt động" },
  { id: "Khóa tạm thời", value: "Khóa tạm thời" },
  { id: "Hủy", value: "Hủy" },
];

const titleColumn = [
  {
    title: "Tên phim",
    data: "movieName",
  },
  {
    title: "Tên rạp",
    data: "rapName",
  },
  {
    title: "Phòng",
    data: "roomName",
  },
  {
    title: "Vị trí ghế",
    data: "position",
  },
  {
    title: "Giá vé",
    data: "priceItemOrder",
  },
  {
    title: "Ngày thanh toán",
    data: "datePay",
  },
];

const OrderDetail = ({ codeOrder, onClickHandleClose }) => {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState("");

  const [orders, setOrders] = useState([]);
  const [codeRoom, setCodeRoom] = useState("");
  const [openModalOrder, setOpenModalOrder] = useState(true);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  //handle order detail
  const handleRowClick = (row) => {
    console.log(row);
    // setCodeRoom(row);
    // setOpenModalDetail(!openModalDetail);
    // setOpenModalOrder(!openModalOrder);
  };

  const onClickHandleCloseP = async () => {
    // window.location.href = "/cineza/admin/rap";
    setOpenModalDetail(false);
    setOpenModelAdd(false);
    setOpenModalOrder(true);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
    setOpenModalOrder(!openModalOrder);
  };


  const handleChangeComboboxStatus = (event) => {
    setStatus(event.target.value);
  };
  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };

  useEffect(() => {
    onHandleFocusCode();
  }, [code]);

  const onHandleFocusCode = () => {
    if (editCode || edit) {
      if (code == undefined || code.length <= 0) {
        setIsValidCode(true);
      } else {
        setIsValidCode(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusStatus();
  }, [status]);

  const onHandleFocusStatus = () => {
    if (editCode || edit) {
      if (status == undefined || status.length == 0) {
        setIsValidStatus(true);
      } else {
        setIsValidStatus(false);
      }
    }
  };

  //get order detail by code order
  useEffect(() => {
    const getRooms = async () => {
      try {
        const result = await axios.get(
          `http://localhost:9000/cineza/api/v1/order/get-by-code/${codeOrder}`
        );
        if (result.status === 200) {
          const dataResult = result.data.map((item) => {
            return {
              ...item,
              datePay: `${formatDateHandle(item.datePay)} ${new Date(item.datePay).getHours()}:${new Date(item.datePay).getMinutes()}`,
              priceItemOrder: item.priceItemOrder.toLocaleString('vi-VN')
            };
          });
          setOrders(dataResult);
          // console.log(result.data);
        }
      } catch (error) {
        console.error("error get all room by rap: " + error);
      }
    };
    getRooms();
  }, []);

  return (
    <div className="order-detail-background">
      <div className="order-detail-container">
        <div className="order-detail-header">
          <div className="order-detail-header-edit">
            <div className="order-detail-header-name">
              <span>{orders[0]?.fullName} -- {orders[0]?.description}</span>
            </div>
            <div
              className="order-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
        </div>


        <div className="order-detail-container-page">
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              paddingRight: "10px",
              alignItems: "center",
            }}
          >
            <h2>Danh sách hóa đơn chi tiết</h2>
          </div>
          <div className="order-detail-table-page">
            <Table
              column={titleColumn}
              data={orders}
              onRowClick={handleRowClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;

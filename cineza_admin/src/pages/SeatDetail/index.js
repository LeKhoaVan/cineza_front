import React from "react";

import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import Alert from "../../components/Alert";
import "./seatDetail.css";

import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";

const dataStatus = [
  { id: "Hoạt động", value: "Hoạt động" },
  { id: "Khóa tạm thời", value: "Khóa tạm thời" },
  { id: "Hủy", value: "Hủy" },
];

const dataIsBook = [
  { id: "SELECTED", value: "SELECTED" },
  { id: "NOTSELECTED", value: "NOTSELECTED" },
];

// const dataLevel = [
//   { id: "COMUNITY", value: "COMUNITY" },
//   { id: "VIP", value: "VIP" },
//   { id: "SWEET", value: "SWEET" },
// ];

const SeatDetail = ({ codeSeat, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [position, setPosition] = useState("");
  const [codeRoom, setCodeRoom] = useState("");
  const [codeType, setCodeType] = useState("");
  const [status, setStatus] = useState("");
  const [isBook, setIsBook] = useState("");

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [dataRoom, setDataRoom] = useState([]);
  const [dataTypeSeat, setDataTypeSeat] = useState([]);

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidPosition, setIsValidPosition] = useState(false);
  const [isValidCodeType, setIsValidCodeType] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);
  const [isValidIsBook, setIsValidIsBook] = useState(false);
  const [isValidCodeRoom, setIsValidCodeRoom] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleChangeComboboxStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeComboboxIsBook = (event) => {
    setIsBook(event.target.value);
  };

  const handleChangeComboboxCodeType = (event) => {
    setCodeType(event.target.value);
  };

  const handleChangeComboboxCodeRoom = (event) => {
    setCodeRoom(event.target.value);
  };

  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };
  const onChangeHandlePosition = (text) => {
    setPosition(text.target.value);
  };

  useEffect(() => {
    onHandleFocusCode();
  }, [code]);

  const onHandleFocusCode = () => {
    if (editCode || edit) {
      if (code == undefined || code.trim().length <= 0) {
        setIsValidCode(true);
      } else {
        setIsValidCode(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusPosition();
  }, [position]);

  const onHandleFocusPosition = () => {
    if (editCode || edit) {
      if (position == undefined || position.trim().length <= 0) {
        setIsValidPosition(true);
      } else {
        setIsValidPosition(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusIsBook();
  }, [isBook]);

  const onHandleFocusIsBook = () => {
    if (editCode || edit) {
      if (isBook == undefined || isBook.length == 0) {
        setIsValidIsBook(true);
      } else {
        setIsValidIsBook(false);
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

  useEffect(() => {
    onHandleFocusCodeRoom();
  }, [codeRoom]);

  const onHandleFocusCodeRoom = () => {
    if (editCode || edit) {
      if (codeRoom == undefined || codeRoom.length == 0) {
        setIsValidCodeRoom(true);
      } else {
        setIsValidCodeRoom(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusCodeType();
  }, [codeType]);

  const onHandleFocusCodeType = () => {
    if (editCode || edit) {
      if (codeType == undefined || codeType.length == 0) {
        setIsValidCodeType(true);
      } else {
        setIsValidCodeType(false);
      }
    }
  };

  useEffect(() => {
    const getSeat = async () => {
      const result = await axios.get(
        `http://localhost:9000/cineza/api/v1/seat/get-by-code/${codeSeat}`
      );
      if (result.status === 200) {
        setCode(result.data.code);
        setPosition(result.data.position);
        setCodeRoom(result.data.codeRoom);
        setCodeType(result.data.codeTypeSeat);
        setStatus(result.data.status);
        // console.log(result.data.name);
      }
    };
    getSeat();
  }, []);

  const onClickHandleEdit = () => {
    setUpdate(true);
    setCreateNew(false);
    setEdit(true);
    setEditCode(false);
  };

  const onClickHandleSave = async () => {
    const seat = {
      code: code,
      position: position,
      codeRoom: codeRoom,
      codeTypeSeat: codeType,
      status: status,
      isBook: "SELECTED",
    };
    onHandleFocusStatus();
    if (!isValidStatus) {
      try {
        console.log(seat);
        if (editCode) {
          const response = await axios.post(
            `http://localhost:9000/cineza/api/v1/seat/create`,
            seat
          );
          if (response.status === 201) {
            setMessage("Lưu thành công");
            setShowAlert(true);
          } else {
            setMessage("Lưu thất bại");
            setShowAlert(true);
          }
        } else if (update) {
          const response = await axios.put(
            `http://localhost:9000/cineza/api/v1/seat/put/` + code,
            seat
          );
          if (response.status === 200) {
            console.log("save success");
            setMessage("Cập nhật thành công");
            setShowAlert(true);
          } else {
            setMessage("Cập thất bại");
            setShowAlert(true);
          }
        }
      } catch (error) {
        console.log("save address fail: " + error);
        setMessage("Lưu thất bại");
        setShowAlert(true);
      }
    } else {
      console.log("lưu sai");
      setMessage("Vui lòng nhập đầy đủ");
      setShowAlert(true);
    }
  };

  return (
    <div className="seat-detail-background">
      <div className="seat-detail-container">
        <div className="seat-detail-header">
          <div className="seat-detail-header-edit">
            <div
              className="seat-detail-header-edit-save"
              onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="seat-detail-header-edit-update"
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <div
              className="seat-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
          <div className="seat-detail-header-name">
            <span>{code} -- </span>
            {/* <span>-{} </span> */}
          </div>
        </div>

        <div className="seat-detail-content">
          <div className="seat-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}
            <div className="seat-detail-input">
              <label>Mã ghế</label>
              <div className="seat-detail-input-dem"></div>

              <div className="input-seat-container">
                <input
                  className="input-seat"
                  value={code}
                  readOnly={!editCode}
                  style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleCode(text)}
                  onFocus={onHandleFocusCode}
                />
                {isValidCode && (
                  <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                )}
              </div>
            </div>
            <div className="seat-detail-input">
              <label>Vị trí</label>
              <div className="seat-detail-input-dem"></div>
              <div className="input-seat-container">
                <input
                  className="input-seat"
                  value={position}
                  readOnly={!editCode}
                  style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandlePosition(text)}
                  onFocus={onHandleFocusPosition}
                />
                {isValidPosition && (
                  <p style={{ color: "red" }}>"Không để trống"</p>
                )}
              </div>
            </div>
            <div className="seat-detail-input">
              <label>Mã phòng</label>
              <div className="seat-detail-input-dem"></div>
              <div className="input-seat-container">
                <input
                  className="input-seat"
                  value={codeRoom}
                  readOnly={!editCode}
                  style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                // onChange={(text) => onChangeHandleCodeRap(text)}
                // onFocus={onHandleFocusPosition}
                />
              </div>
            </div>
          </div>

          <div className="seat-detail-content-right">
            <div className="seat-detail-input">
              <label>Loại</label>
              <div className="seat-detail-input-dem"></div>
              <div className="input-seat-container">
                <input
                  className="input-seat"
                  value={codeType}
                  readOnly={!editCode}
                  style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                // onChange={(text) => onChangeHandleCodeRap(text)}
                // onFocus={onHandleFocusPosition}
                />
              </div>
            </div>

            <div className="seat-detail-input">
              <label>Trạng thái</label>
              <div className="seat-detail-input-dem"></div>
              <div className="input-seat-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={status}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                    onChange={handleChangeComboboxStatus}
                    onFocus={onHandleFocusStatus}
                  >
                    {dataStatus.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.id}>
                          {st.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {isValidStatus && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatDetail;

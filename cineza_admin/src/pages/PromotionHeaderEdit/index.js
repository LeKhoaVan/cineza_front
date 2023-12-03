import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import iconDetail from "../../assets/imageButtons/iconDetail.png";
import Alert from "../../components/Alert";
import "./promotionHeaderEdit.css";
import {
  formatDateHandle,
  formatFromObjectToDate,
} from "../../components/util/index";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { parse, format } from "date-fns";
import vi from "date-fns/locale/vi";
registerLocale("vi", vi);

const dataStatus = [
  { id: "Hoạt động", value: "Hoạt động" },
  { id: "Khóa tạm thời", value: "Khóa tạm thời" },
  { id: "Hủy", value: "Hủy" },
];

const dataTypePromotion = [
  { id: "DISCOUNT", value: "DISCOUNT" },
  { id: "PROMOTION", value: "PROMOTION" },
  { id: "FREEBIES", value: "FREEBIES" },
];

const PromotionHeaderEdit = ({ codePromotion, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [startDayShow, setStartDayShow] = useState("");
  const [endDayShow, setEndDayShow] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [isValidCode, setIsValidCode] = useState(false);
  //const [isValidStartDay, setIsValidStartDay] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);
  const [isValidDescription, setIsValidDescription] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };
  const onChangeHandleStartDate = (text) => {
    setStartDay(text);
    setStartDayShow(text);
    console.log(startDay);
  };
  const onChangeHandleEndDate = (text) => {
    setEndDay(text);
    setEndDayShow(text);
  };

  const handleChangeDescription = (text) => {
    setDescription(text.target.value);
  };
  const handleChangeComboboxStatus = (text) => {
    setStatus(text.target.value);
  };

  useEffect(() => {
    onHandleFocusCode();
  }, [code]);

  const onHandleFocusCode = () => {
    if (editCode || edit) {
      if (code.trim().length <= 0) {
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
      if (status.trim().length <= 0) {
        setIsValidStatus(true);
      } else {
        setIsValidStatus(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusDescription();
  }, [description]);

  const onHandleFocusDescription = () => {
    if (editCode || edit) {
      if (description.trim().length <= 0) {
        setIsValidDescription(true);
      } else {
        setIsValidDescription(false);
      }
    }
  };

  const onClickHandleEdit = () => {
    setUpdate(true);
    setCreateNew(false);
    setEdit(true);
    setEditCode(false);
  };

  const onClickHandleNew = () => {
    setUpdate(false);
    setCreateNew(true);
    setEditCode(true);
    setEdit(true);

    setCode("");
    setDescription("");
    setStatus("");
    setStartDayShow(new Date());
    setEndDayShow(new Date());
    setStartDay(new Date());
    setEndDay(new Date());
  };

  const onClickHandleSave = async () => {
    const promotionHeader = {
      code: code,
      startDay: startDayShow,
      endDay: endDayShow,
      description: description,
      promotionStatus: status,
    };
    try {
      console.log(promotionHeader);
      if (editCode) {
        const response = await axios.post(
          `http://localhost:9000/cineza/api/v1/promotion-header/create`,
          promotionHeader
        );
        if (response.status === 201) {
          setMessage("Lưu thành công");
          setShowAlert(true);
        } else {
          setMessage("Lưu thất bại");
          setShowAlert(true);
        }
      } else if (update) {
        // const response = await axios.put(
        //     `http://localhost:9000/cineza/api/v1/value/user/put/` + codeUser,
        //     user
        // );
        // if (response.status === 200) {
        //     console.log("save success");
        //     setMessage("Cập nhật thành công");
        //     setShowAlert(true);
        // } else {
        //     setMessage("Cập thất bại");
        //     setShowAlert(true);
        // }
      }
    } catch (error) {
      console.log("save address fail: " + error);
      setMessage("Lưu thất bại");
      setShowAlert(true);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      if (addBtn) {
        setUpdate(false);
        setCreateNew(true);
        setEditCode(true);
        setEdit(true);

        setCode("");
        setDescription("");
        setStatus("");
        setStartDayShow(new Date());
        setEndDayShow(new Date());
        setStartDay(new Date());
        setEndDay(new Date());
      }
      try {
        const response = await axios.get(
          `http://localhost:9000/cineza/api/v1/promotion-header/get-code/${codePromotion}`
        );
        if (response.status === 200) {
          setCode(response.data.code);
          setStartDay(response.data.startDay);
          setEndDay(response.data.endDay);
          setStartDayShow(new Date(Date.parse(response.data.startDay)));
          setEndDayShow(new Date(Date.parse(response.data.endDay)));
          setStatus(response.data.promotionStatus);
          setDescription(response.data.description);
          console.log(new Date(Date.parse(response.data.startDay)));
        } else {
          console.log("get user fail");
        }
      } catch (error) {
        console.log("error get user: " + error);
      }
    };

    getUser();
  }, []);

  return (
    <div className="promotion-detail-background">
      <div className="promotion-detail-container">
        <div className="promotion-detail-header">
          <div className="promotion-detail-header-edit">
            <div
              className="promotion-detail-header-edit-save"
              onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="promotion-detail-header-edit-update"
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <Link
              className="promotion-detail-header-edit-detail"
              to={"/promotion/code?code=" + code}
            >
              <img className="icon-detail" src={iconDetail} alt="update" />
              <p>Chương trình</p>
            </Link>
            <div
              className="promotion-detail-header-edit-new-delete"
              onClick={onClickHandleNew}
            >
              <div className="promotion-detail-header-edit-new">
                <img className="iconNew" src={iconCreateNew} alt="create new" />
                <p>Tạo mới</p>
              </div>
              <div className="promotion-detail-header-edit-delete">
                <img className="iconDelete" src={iconDelete} alt="delete" />
                <p>Xóa</p>
              </div>
            </div>
            <div
              className="promotion-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
          <div className="promotion-detail-header-name">
            <p>
              {code}: Từ ngày {formatDateHandle(startDayShow)} Đến ngày{" "}
              {formatDateHandle(endDayShow)}{" "}
            </p>
          </div>
        </div>

        <div className="promotion-detail-content">
          <div className="promotion-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}
            <div className="promotion-detail-input">
              <label>Mã chương trình</label>
              <div className="promotion-detail-input-dem"></div>

              <div className="input-promotion-container">
                <input
                  className="input-promotion"
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
            <div className="promotion-detail-input">
              <label>Ngày bắt đầu</label>
              <div className="promotion-detail-input-dem"></div>
              <DatePicker
                // locale="vi"
                dateFormat="dd-MM-yyyy"
                selected={startDayShow}
                readOnly={!edit}
                onChange={(date) => onChangeHandleStartDate(date)}
                fixedHeight="60px"
                portalId="root-portal"
                className="date-picker"
              />
            </div>

            <div className="promotion-detail-input">
              <label>Ngày Kết thúc</label>
              <div className="promotion-detail-input-dem"></div>

              <DatePicker
                locale="vi"
                dateFormat="dd-MM-yyyy"
                selected={endDayShow}
                readOnly={!edit}
                onChange={(date) => onChangeHandleEndDate(date)}
                fixedHeight="60px"
                portalId="root-portal"
                className="date-picker"
              />
            </div>
            <div className="promotion-detail-input">
              <label>Mô tả chương trình</label>
              <div className="promotion-detail-input-dem"></div>
              {/* <input className="input-promotion" value={status} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(text) => onChangeHandleStatus(text)} /> */}
              <div className="input-promotion-container">
                <textarea
                  className="input-promotion"
                  value={description}
                  readOnly={!edit}
                  style={
                    edit
                      ? { height: "70px" }
                      : { height: "70px", background: "rgb(196, 196, 196)" }
                  }
                  onChange={(text) => handleChangeDescription(text)}
                  onFocus={onHandleFocusDescription}
                />
                {isValidDescription && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>
          </div>
          <div className="user-detail-content-right">
            <div className="user-detail-input">
              <label>Trạng thái</label>
              <div className="user-detail-input-dem"></div>
              {/* <input className="input-user" value={status} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(text) => onChangeHandleStatus(text)} /> */}
              <div className="input-user-container">
                <FormControl
                  sx={{ width: "100%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Status</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={status}
                    label="Status"
                    onChange={handleChangeComboboxStatus}
                    onFocus={onHandleFocusStatus}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
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

export default PromotionHeaderEdit;

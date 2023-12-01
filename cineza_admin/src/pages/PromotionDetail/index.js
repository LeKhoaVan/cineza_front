import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import Alert from "../../components/Alert";
import "./promotionDetail.css";
import { formatDateHandle } from "../../components/util/index";

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

const dataTypeTicket = [
  { id: "VIP", value: "VIP" },
  { id: "THUONG", value: "THUONG" },
  { id: "DOI", value: "DOI" },
];

const PromotionDetail = ({ codePromotion, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [startDay, setStartDay] = useState("");
  const [endDay, setEndDay] = useState("");
  const [startDayShow, setStartDayShow] = useState("");
  const [endDayShow, setEndDayShow] = useState("");
  const [codeHeader, setCodeHeader] = useState("");
  const [status, setStatus] = useState("");
  const [typePromotion, settypePromotion] = useState("");

  const [codeMovie, setCodeMovie] = useState("");
  const [purchaseValue, setPurchaseValue] = useState(null);
  const [promotionValue, setPromotionValue] = useState(null);
  const [numberTicket, setNumberTicket] = useState(null);
  const [typeTicket, setTypeTicket] = useState(null);
  const [numberTicketGift, setNumberTicketGift] = useState(null);
  const [maxMoney, setMaxMoney] = useState("");
  const [maxTurn, setMaxTurn] = useState("");

  const [dataMovie, setDataMovie] = useState([]);

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});
  const [FREEBIES, setFREEBIES] = useState(false);
  const [PROMOTION, setPROMOTION] = useState(false);
  const [money, setMoney] = useState(true);

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidCodeHeader, setIsValidCodeHeader] = useState(false);
  const [isValidTypePromotion, setIsValidTypePromotion] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);

  const [dataPromotionHeader, setDataPromotioHeader] = useState([]);

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
  };
  const onChangeHandleEndDate = (text) => {
    setEndDay(text);
    setEndDayShow(text);
  };
  const handleChangeComboboxHeader = (text) => {
    setCodeHeader(text.target.value);
  };
  const handleChangeComboboxTypePromotion = (text) => {
    settypePromotion(text.target.value);
    if (text.target.value == "FREEBIES") {
      setPROMOTION(false);
      setFREEBIES(true);
    } else if (text.target.value == "PROMOTION") {
      setPROMOTION(true);
      setFREEBIES(false);
      setMoney(true);
    } else {
      setPROMOTION(true);
      setFREEBIES(false);
      setMoney(false);
    }
  };
  const handleChangeComboboxStatus = (text) => {
    setStatus(text.target.value);
  };

  const onChangeHandleNumberTicket = (txt) => {
    setNumberTicket(txt.target.value);
  };
  const handleChangeComboboxTypeTicket = (txt) => {
    setTypeTicket(txt.target.value);
  };
  const onChangeHandleTicketGift = (txt) => {
    setNumberTicketGift(txt.target.value);
  };
  const handleChangeComboboxMovie = (text) => {
    setCodeMovie(text.target.value);
  };
  const onChangeHandlePurchaseValue = (text) => {
    setPurchaseValue(text.target.value);
  };
  const onChangeHandlePromotionValue = (text) => {
    setPromotionValue(text.target.value);
  };

  const onChangeHandleNumberMaxMoney = (text) => {
    setMaxMoney(text.target.value);
  };
  const onChangeHandleNumberNumberTurn = (text) => {
    setMaxTurn(text.target.value);
  };

  useEffect(() => {
    const getAllMovie = async () => {
      const response = await axios.get(
        `http://13.212.32.129:9000/cineza/api/v1/movie/get-all`
      );
      if (response.status == 200) {
        setDataMovie(response.data);
      } else {
        console.error("error get all movie");
      }
    };
    getAllMovie();
  }, []);

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
    onHandleFocusCodeHeader();
  }, [codeHeader]);

  const onHandleFocusCodeHeader = () => {
    if (editCode || edit) {
      if (codeHeader.length <= 0) {
        setIsValidCodeHeader(true);
      } else {
        setIsValidCodeHeader(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusTypePromotion();
  }, [typePromotion]);

  const onHandleFocusTypePromotion = () => {
    if (editCode || edit) {
      if (typePromotion.length <= 0) {
        setIsValidTypePromotion(true);
      } else {
        setIsValidTypePromotion(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusStatus();
  }, [status]);

  const onHandleFocusStatus = () => {
    if (editCode || edit) {
      if (status.length <= 0) {
        setIsValidStatus(true);
      } else {
        setIsValidStatus(false);
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
    setCodeHeader("");
    settypePromotion("");
    setStatus("");
  };

  const onClickHandleSave = async () => {
    const promotionLine = {
      code: code,
      startDay: startDayShow,
      endDay: endDayShow,
      promotionLineStatus: status,
      typePromotion: typePromotion,
      promotionHeaderCode: codeHeader,
      maxMoney: maxMoney,
      maxTurn: maxTurn,
    };

    try {
      if (editCode) {
        const response = await axios.post(
          `http://13.212.32.129:9000/cineza/api/v1/promotion-line/create`,
          promotionLine
        );

        const promotionDetail = {
          promotionLineCode: await response.data.code,
          movieCode: codeMovie,
          purchaseValue: purchaseValue,
          promotionValue: promotionValue,
          numberTicket: numberTicket,
          typeTicket: typeTicket,
          numberGiftTiket: numberTicketGift,
        };
        console.log(response);
        console.log(promotionDetail);

        const responseDetail = await axios.post(
          `http://13.212.32.129:9000/cineza/api/v1/promotion-detail/create`,
          promotionDetail
        );

        if ((response.status == 201) & (responseDetail.status == 201)) {
          setMessage("Lưu thành công");
          setShowAlert(true);
        } else {
          setMessage("Lưu thất bại");
          setShowAlert(true);
        }
      } else if (update) {
        // const response = await axios.put(
        //     `http://13.212.32.129:9000/cineza/api/v1/value/user/put/` + codeUser,
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
        setCodeHeader("");
        settypePromotion("");
        setStatus("");
        setStartDay(new Date());
        setEndDay(new Date());
      }
      try {
        const response = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/promotion-line/get-by-code/` +
          codePromotion
        );

        if (response.status === 200) {
          setCode(response.data.code);
          setStartDay(response.data.startDay);
          setEndDay(response.data.endDay);
          setStartDayShow(new Date(response.data.startDay));
          setEndDayShow(new Date(response.data.endDay));
          setCodeHeader(response.data.promotionHeaderCode);
          setStatus(response.data.promotionLineStatus);
          settypePromotion(response.data.typePromotion);
          setMaxMoney(response.data.maxMoney);
          setMaxTurn(response.data.maxTurn);
          if (response.data.typePromotion != "PROMOTION") {
            setMoney(false);
          }

          const responseDetail = await axios.get(
            `http://13.212.32.129:9000/cineza/api/v1/promotion-detail/get-all/` +
            response.data.code
          );
          console.log(responseDetail);

          if (responseDetail.status === 200) {
            setCodeMovie(responseDetail.data[0].movieCode);

            if (responseDetail.data[0].purchaseValue != null) {
              setPurchaseValue(responseDetail.data[0].purchaseValue);
            }
            if (responseDetail.data[0].promotionValue != null) {
              setPromotionValue(responseDetail.data[0].promotionValue);
            }
            if (responseDetail.data[0].numberTicket != null) {
              setNumberTicket(responseDetail.data[0].numberTicket);
            }
            if (responseDetail.data[0].typeTicket != null) {
              setTypeTicket(responseDetail.data[0].typeTicket);
            }
            if (responseDetail.data[0].numberGiftTiket != null) {
              setNumberTicketGift(responseDetail.data[0].numberGiftTiket);
            }
          }
        } else {
          console.log("get user fail");
        }
      } catch (error) {
        console.log("error get user: " + error);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const getAllPromotionHeader = async () => {
      try {
        const allPromotionHeader = await axios.get(
          "http://13.212.32.129:9000/cineza/api/v1/promotion-header/get-all"
        );
        if (allPromotionHeader.status === 200) {
          setDataPromotioHeader(allPromotionHeader.data);
        } else {
          console.error("error get promotion header");
        }
      } catch (error) {
        console.error("error get all promotion header: " + error);
      }
    };
    getAllPromotionHeader();
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
              {code}: Từ ngày {formatDateHandle(startDay)} Đến ngày{" "}
              {formatDateHandle(endDay)}{" "}
            </p>
          </div>
        </div>

        <div className="promotion-detail-content">
          <div className="promotion-detail-content-left">
            {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )}
            <div className="promotion-detail-input">
              <label>Mã chi tiết</label>
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
              {/* <input className="input-promotion" value={dateOfBirth} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                onChange={(text) => onChangeHandleDate(text)} /> */}
              <DatePicker
                locale="vi"
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
              <label>Thuộc chương trình</label>
              <div className="promotion-detail-input-dem"></div>
              {/* <input className="input-promotion" value={status} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(text) => onChangeHandleStatus(text)} /> */}
              <div className="input-promotion-container">
                <FormControl
                  sx={{ width: "100%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">
                    Thuộc chương trình
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={codeHeader}
                    label="Thuộc chương trình"
                    onChange={handleChangeComboboxHeader}
                    onFocus={onHandleFocusCodeHeader}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataPromotionHeader.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.code}>
                          {st.code}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {isValidCodeHeader && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>
            <div
              className="promotion-detail-input"
              style={{ paddingTop: "100px" }}
            >
              <label>Số vé tối thiểu</label>
              <div className="promotion-detail-input-dem"></div>

              <div className="input-promotion-container">
                <input
                  className="input-promotion"
                  value={numberTicket}
                  readOnly={!edit || PROMOTION}
                  style={
                    edit & !PROMOTION
                      ? {}
                      : { background: "rgb(196, 196, 196)" }
                  }
                  onChange={(text) => onChangeHandleNumberTicket(text)}
                  onFocus={onHandleFocusCode}
                />
                {isValidCode && (
                  <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="promotion-detail-input">
              <label>Loại vé</label>
              <div className="promotion-detail-input-dem"></div>
              <div className="input-promotion-container">
                <FormControl
                  sx={{ width: "100%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Loại vé</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={typeTicket}
                    label="Loại vé"
                    onChange={handleChangeComboboxTypeTicket}
                    onFocus={onHandleFocusStatus}
                    readOnly={!edit || PROMOTION}
                    style={
                      edit & !PROMOTION
                        ? {}
                        : { background: "rgb(196, 196, 196)" }
                    }
                  >
                    {dataTypeTicket.map((st, index) => {
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

            <div className="promotion-detail-input">
              <label>Số vé khuyến mãi</label>
              <div className="promotion-detail-input-dem"></div>

              <div className="input-promotion-container">
                <input
                  className="input-promotion"
                  value={numberTicketGift}
                  readOnly={!edit || PROMOTION}
                  style={
                    edit & !PROMOTION
                      ? {}
                      : { background: "rgb(196, 196, 196)" }
                  }
                  onChange={(text) => onChangeHandleTicketGift(text)}
                  onFocus={onHandleFocusCode}
                />
                {isValidCode && (
                  <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                )}
              </div>
            </div>
          </div>
          <div className="promotion-detail-content-right">
            <div className="promotion-detail-input">
              <label>Loại hình</label>
              <div className="promotion-detail-input-dem"></div>
              {/* <input className="input-promotion" value={status} readOnly={!edit} style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                                onChange={(text) => onChangeHandleStatus(text)} /> */}
              <div className="input-promotion-container">
                <FormControl
                  sx={{ width: "100%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">
                    Loại hình khuyến mãi
                  </InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={typePromotion}
                    label="Loại hình khuyến mãi"
                    onChange={handleChangeComboboxTypePromotion}
                    onFocus={onHandleFocusTypePromotion}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataTypePromotion.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.id}>
                          {st.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {isValidTypePromotion && (
                  <p style={{ color: "red" }}>Không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="promotion-detail-input">
              <label>Trạng thái</label>
              <div className="promotion-detail-input-dem"></div>
              <div className="input-promotion-container">
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

            <div className="promotion-detail-input">
              <label>Số tiền lớn nhất</label>
              <div className="promotion-detail-input-dem"></div>

              <div className="input-promotion-container">
                <input
                  className="input-promotion"
                  value={maxMoney}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleNumberMaxMoney(text)}
                  onFocus={onHandleFocusCode}
                />
                {isValidCode && (
                  <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                )}
              </div>
            </div>

            <div className="promotion-detail-input">
              <label>Số lần</label>
              <div className="promotion-detail-input-dem"></div>

              <div className="input-promotion-container">
                <input
                  className="input-promotion"
                  value={maxTurn}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleNumberNumberTurn(text)}
                  onFocus={onHandleFocusCode}
                />
                {isValidCode && (
                  <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                )}
              </div>
            </div>

            <div
              className="promotion-detail-input"
              style={{ paddingTop: "40px" }}
            >
              <label style={{ fontSize: 18, fontWeight: 600 }}>
                Cơ cấu khuyến mãi
              </label>
              <div className="promotion-detail-input-dem"></div>
            </div>

            <div className="promotion-detail-input">
              <label>Phim khuyến mãi</label>
              <div className="promotion-detail-input-dem"></div>
              <div className="input-promotion-container">
                <FormControl
                  sx={{ width: "100%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Phim</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    value={codeMovie}
                    label="Phim"
                    onChange={handleChangeComboboxMovie}
                    onFocus={onHandleFocusStatus}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataMovie?.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.code}>
                          {st.movieName}
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

            <div className="promotion-detail-input">
              <label>Số tiền tối thiểu</label>
              <div className="promotion-detail-input-dem"></div>

              <div className="input-promotion-container">
                <input
                  className="input-promotion"
                  value={purchaseValue}
                  readOnly={!editCode || FREEBIES}
                  style={
                    edit & !FREEBIES ? {} : { background: "rgb(196, 196, 196)" }
                  }
                  onChange={(text) => onChangeHandlePurchaseValue(text)}
                  onFocus={onHandleFocusCode}
                />
                {isValidCode && (
                  <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                )}
              </div>
            </div>
            <div className="promotion-detail-input">
              <label>
                {money != ""
                  ? "Giá trị khuyến mãi (tiền)"
                  : "Giá trị khuyến mãi (%)"}
              </label>
              <div className="promotion-detail-input-dem"></div>

              <div className="input-promotion-container">
                <input
                  className="input-promotion"
                  value={promotionValue}
                  readOnly={!editCode || FREEBIES}
                  style={
                    edit & !FREEBIES ? {} : { background: "rgb(196, 196, 196)" }
                  }
                  onChange={(text) => onChangeHandlePromotionValue(text)}
                  onFocus={onHandleFocusCode}
                />
                {isValidCode && (
                  <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromotionDetail;

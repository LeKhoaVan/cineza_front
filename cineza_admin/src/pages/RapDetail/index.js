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
import ConfirmAlert from "../../components/ConfirmAlert";
import "./rapDetail.css";
import RoomDetail from "../RoomDetail";

import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatDateHandle } from "../../components/util/index";
import { formatDayHandle } from "../../components/util/index";
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
    title: "Code",
    data: "code",
  },
  {
    title: "Tên phòng",
    data: "name",
  },
  {
    title: "Tên rap",
    data: "nameRap",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
];

const RapDetail = ({ codeRapBy, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [numberRap, setNumberRap] = useState("");
  const [openTime, setOpenTime] = useState("");
  const [closeTime, setCloseTime] = useState("");
  const [status, setStatus] = useState("");

  const [country, setCountry] = useState([]);
  const [countryId, setCountryId] = useState("");
  const [city, setCity] = useState([]);
  const [cityId, setCityId] = useState("");
  const [district, setDistrict] = useState([]);
  const [districtId, setDistrictId] = useState("");
  const [ward, setWard] = useState([]);
  const [wardId, setWardId] = useState("");

  const [openModalRapDetail, setOpenModalRapDetail] = useState(true);

  const [rooms, setRooms] = useState([]);
  const [codeRoom, setCodeRoom] = useState("");
  const [openModalRoomDetail, setOpenModalRoomDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});
  const [editCity, setEditCity] = useState(false);
  const [editDistrict, setEditDistrict] = useState(false);
  const [editWard, setEditWard] = useState(false);

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidNumberRap, setIsValidNumberRap] = useState(false);
  const [isValidOpenTime, setIsValidOpenTime] = useState(false);
  const [isValidCloseTime, setIsValidCloseTime] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);
  const [isValidAddress, setIsValidAddress] = useState(false);
  const [errorAddress, setErrorAddress] = useState(false);

  const [showAlert, setShowAlert] = useState(false);
  const [message, setMessage] = useState("");
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const [showConfirmAlert, setShowConfirmAlert] = useState(false);
  const handleCloseConfirmAlert = () => {
    setShowConfirmAlert(false);
  };

  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const handleCancel = () => {
    setIsOpenDialog(false);
  };

  //handle rooms
  const handleRowClick = (row) => {
    console.log(row);
    setCodeRoom(row);
    setOpenModalRapDetail(false);
    setOpenModalRoomDetail(true);
  };

  const onClickHandleCloseP = async (codeRap) => {
    // window.location.href = "/cineza/admin/rap";
    setOpenModalRoomDetail(false);
    setOpenModalRapDetail(true);
    setOpenModelAdd(false);

    if (codeRap != null) {
      try {
        const result = await axios.get(
          `http://localhost:9000/cineza/api/v1/room/get-all-by-code/${codeRap}`
        );
        if (result.status === 200) {
          setRooms(result.data);
          // console.log(result.data);
        }
      } catch (error) {
        console.error("error get all room by rap: " + error);
      }
    }

  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
    setOpenModalRapDetail(false);
  };

  const handleChangeComboboxStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeComboboxCountry = (event) => {
    setCityId("");
    setDistrictId("");
    setWardId("");
    setEditCity(true);
    setCountryId(event.target.value);
  };
  const handleChangeComboboxCity = (event) => {
    setEditDistrict(true);
    setCityId(event.target.value);
  };
  const handleChangeComboboxDistrict = (event) => {
    setEditWard(true);
    setDistrictId(event.target.value);
  };
  const handleChangeComboboxWard = (event) => {
    setWardId(event.target.value);
  };
  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };
  const onChangeHandleName = (text) => {
    setName(text.target.value);
  };

  const onChangeHandleNumberRap = (text) => {
    setNumberRap(text.target.value);
  };
  const onChangeHandleOpenTime = (text) => {
    setOpenTime(text);
    console.log(text);
  };
  const onChangeHandleCloseTime = (text) => {
    setCloseTime(text);
    console.log(text);
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
    onHandleFocusName();
  }, [name]);

  const onHandleFocusName = () => {
    if (editCode || edit) {
      if (name == undefined || name.length <= 0) {
        setIsValidName(true);
      } else {
        setIsValidName(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusOpenTime();
  }, [openTime]);

  const onHandleFocusOpenTime = () => {
    if (editCode || edit) {
      if (openTime == undefined || openTime.length <= 0) {
        setIsValidOpenTime(true);
      } else {
        setIsValidOpenTime(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusCloseTime();
  }, [closeTime, openTime]);

  const onHandleFocusCloseTime = () => {
    if (editCode || edit) {
      if (closeTime <= openTime) {
        setIsValidCloseTime(true);
      } else {
        setIsValidCloseTime(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusNumberRap();
  }, [numberRap]);

  const onHandleFocusNumberRap = () => {
    if (editCode || edit) {
      if (numberRap == undefined || numberRap.length <= 0) {
        setIsValidNumberRap(true);
      } else {
        setIsValidNumberRap(false);
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
    onHandleFocusAddress();
  }, [countryId, cityId, wardId, districtId]);

  const onHandleFocusAddress = () => {
    if (editCode || edit) {
      if (countryId == undefined || countryId.length == 0) {
        setErrorAddress("Không bỏ trống Quốc Gia");
        setIsValidAddress(true);
      } else if (cityId == undefined || cityId.length == 0) {
        setErrorAddress("Không bỏ trống tỉnh/thành phố");
        setIsValidAddress(true);
      } else if (districtId == undefined || districtId.length == 0) {
        setErrorAddress("Không bỏ trống quận/huyện");
        setIsValidAddress(true);
      } else if (wardId == undefined || wardId.length == 0) {
        setErrorAddress("Không bỏ trống phường/xã");
        setIsValidAddress(true);
      } else {
        setIsValidAddress(false);
      }
    }
  };

  useEffect(() => {
    if (addBtn) {
      setEditCode(true);
      setEdit(true);
      setCreateNew(true);
    }
    const getRap = async () => {
      const result = await axios.get(
        `http://localhost:9000/cineza/api/v1/rap/get-by-code/${codeRapBy}`
      );
      if (result.status === 200) {
        setCode(result.data.code);
        setName(result.data.name);
        setNumberRap(result.data.numberRap);
        setOpenTime(result.data.openTime);
        setCloseTime(result.data.closeTime);
        setStatus(result.data.status);

        setCountryId(result.data.countryAddress);
        setCityId(result.data.cityAddress);
        setDistrictId(result.data.districtAddress);
        setWardId(result.data.wardAddress);
      }
    };
    getRap();
  }, []);

  //combobox country
  useEffect(() => {
    const getAllCountry = async () => {
      try {
        const allCountry = await axios.get(
          `http://localhost:9000/cineza/api/v1/address/get-by-level?levelAddress=QUOCGIA`
        );
        if (allCountry.status === 200) {
          setCountry(allCountry.data);
        } else {
          console.error("get all country error");
        }
      } catch (error) {
        console.error("get all country error: " + error);
      }
    };
    getAllCountry();
  }, []);

  //combobox city
  useEffect(() => {
    const getAllCountry = async () => {
      try {
        const allCity = await axios.get(
          `http://localhost:9000/cineza/api/v1/address/get-by-level?levelAddress=TINH/TP`
        );
        if (allCity.status === 200) {
          setCity(allCity.data);
        } else {
          console.error("get all city error");
        }
      } catch (error) {
        console.error("get all country error: " + error);
      }
    };
    getAllCountry();
  }, []);

  //combobox district
  useEffect(() => {
    const getAllCountry = async () => {
      try {
        const allDistrict = await axios.get(
          `http://localhost:9000/cineza/api/v1/address/get-by-level?levelAddress=HUYEN/QUAN`
        );
        if (allDistrict.status === 200) {
          setDistrict(allDistrict.data);
        } else {
          console.error("get all country error");
        }
      } catch (error) {
        console.error("get all country error: " + error);
      }
    };
    getAllCountry();
  }, []);

  //combobox ward
  useEffect(() => {
    const getAllCountry = async () => {
      try {
        const allWard = await axios.get(
          `http://localhost:9000/cineza/api/v1/address/get-by-level?levelAddress=XA/PHUONG`
        );
        if (allWard.status === 200) {
          setWard(allWard.data);
        } else {
          console.error("get all country error");
        }
      } catch (error) {
        console.error("get all country error: " + error);
      }
    };
    getAllCountry();
  }, []);

  useEffect(() => {
    if (countryId != "") {
      const getCity = async () => {
        const response = await axios.get(
          `http://localhost:9000/cineza/api/v1/address/get-by-parent/${countryId}`
        );
        if (response.status == 200) {
          setCity(response.data);
        } else {
          console.log("error combobox city");
        }
      };
      getCity();
    }
  }, [countryId]);

  useEffect(() => {
    if (cityId != "") {
      const getDistrict = async () => {
        const response = await axios.get(
          `http://localhost:9000/cineza/api/v1/address/get-by-parent/${cityId}`
        );
        if (response.status == 200) {
          setDistrict(response.data);
        } else {
          console.log("error combobox city");
        }
      };
      getDistrict();
    }
  }, [cityId]);

  useEffect(() => {
    if (districtId != "") {
      const getDistrict = async () => {
        const response = await axios.get(
          `http://localhost:9000/cineza/api/v1/address/get-by-parent/${districtId}`
        );
        if (response.status == 200) {
          setWard(response.data);
        } else {
          console.log("error combobox city");
        }
      };
      getDistrict();
    }
  }, [districtId]);

  //get phòng by code rạp
  const getRooms = async () => {
    if (codeRapBy != null) {
      try {
        const result = await axios.get(
          `http://localhost:9000/cineza/api/v1/room/get-all-by-code/${codeRapBy}`
        );
        if (result.status === 200) {
          setRooms(result.data);
          // console.log(result.data);
        }
      } catch (error) {
        console.error("error get all room by rap: " + error);
      }
    }
  };

  useEffect(() => {
    getRooms();
  }, []);

  // useEffect(() => {
  //   getRooms();
  // }, [openModelAdd]);

  // useEffect(() => {
  //   getRooms();
  // }, [openModalRoomDetail]);

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
    setName("");
    setStatus("");
    setNumberRap("");
    setOpenTime("");
    setCloseTime("");
    setCountryId("");
    setCityId("");
    setDistrictId("");
    setWardId("");

    setRooms([]);
  };

  const onClickSave = async () => {
    if (update) {
      setShowConfirmAlert(true);
      setMessage("Chỉnh sửa rạp");
    } else {
      setShowConfirmAlert(true);
      setMessage("Thêm rạp");
    }
  };

  const onClickHandleSave = async () => {
    setShowConfirmAlert(false);
    const rap = {
      code: code,
      name: name,
      numberRap: numberRap,
      openTime: openTime,
      closeTime: closeTime,
      countryAddress: countryId,
      cityAddress: cityId,
      districtAddress: districtId,
      wardAddress: wardId,
      status: status,
    };
    onHandleFocusCode();
    onHandleFocusName();
    onHandleFocusNumberRap();
    onHandleFocusStatus();
    onHandleFocusAddress();
    if (
      !isValidCode &
      !isValidName &
      !isValidOpenTime &
      !isValidCloseTime &
      !isValidNumberRap &
      !isValidStatus &
      !isValidAddress
    ) {
      try {
        // console.log(rap);
        if (editCode) {
          const response = await axios.post(
            `http://localhost:9000/cineza/api/v1/rap/create`,
            rap
          );
          if (response.status === 201) {
            setMessage("Lưu thành công");
            setShowAlert(true);

            // onClickHandleNew();
          } else {
            setMessage("Lưu thất bại");
            setShowAlert(true);
          }
        } else if (update) {
          const getShow = await axios.get(
            `http://localhost:9000/cineza/api/v1/show/get-all-by-rap/${code}`
          );
          const currentDate = new Date();
          let newArray = [];

          //formatDayHandle(currentDate) <= formatDayHandle(item.showDate)
          getShow.data.forEach((item) => {
            let date = `${new Date(item.showDate).getFullYear()}-${String(
              new Date(item.showDate).getMonth() + 1
            ).padStart(2, "0")}-${String(
              new Date(item.showDate).getDate()
            ).padStart(2, "0")}`;

            if (formatDayHandle(currentDate) <= date) {
              console.log(`Ngày chiếu: ${date}`);
              newArray = { ...item };
            }
          });
          if (newArray.length === 0) {
            const response = await axios.put(
              `http://localhost:9000/cineza/api/v1/rap/put/` + code,
              rap
            );
            if (response.status === 200) {
              console.log("save success");
              setMessage("Cập nhật thành công");
              setShowAlert(true);
            } else {
              setMessage("Cập thất bại");
              setShowAlert(true);
            }
          } else {
            // console.log("co suất chiếu trung")
            setMessage("Còn lịch chiếu. Không thể cập nhật trạng thái!");
            setIsOpenDialog(true);
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
    <div className="rap-detail-background">
      {openModalRapDetail && (
        <div className="rap-detail-container">
          <div className="rap-detail-header">
            <div className="rap-detail-header-edit">
              <div
                className="rap-detail-header-edit-save"
                onClick={onClickSave}
              >
                <img className="icon-save" src={iconSave} alt="update" />
                <p>Lưu</p>
              </div>
              <div
                className="rap-detail-header-edit-update"
                onClick={onClickHandleEdit}
              >
                <img className="icon-update" src={iconPen} alt="update" />
                <p>Chỉnh sửa</p>
              </div>
              <div
                className="rap-detail-header-edit-update"
                onClick={onClickHandleNew}
              >
                <img className="iconNew" src={iconCreateNew} alt="create new" />
                <p>Tạo mới</p>
              </div>
              <div
                className="rap-detail-header-close"
                onClick={onClickHandleClose}
              >
                <img className="iconClose" src={iconClose} alt="close" />
              </div>
            </div>
            <div className="rap-detail-header-name">
              <span>{code} - </span> <span>-{name} </span>
            </div>
          </div>

          <div className="rap-detail-content">
            <div className="rap-detail-content-left">
              {showAlert && (
                <Alert message={message} onClose={handleCloseAlert} />
              )}
              {showConfirmAlert && (
                <ConfirmAlert
                  message={message}
                  onClose={handleCloseConfirmAlert}
                  onHandle={onClickHandleSave}
                />
              )}
              {isOpenDialog && (
                <div className="confirm-dialog-overlay">
                  <div className="confirm-dialog">
                    <div className="confirm-dialog-container">
                      <div className="header-close">
                        <img
                          className="icon-close"
                          src={iconClose}
                          alt="close"
                          onClick={handleCancel}
                        />
                      </div>
                      <div className="confirm-dialog-body">
                        <p>{message}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div className="rap-detail-input">
                <label>Mã rạp</label>
                <div className="rap-detail-input-dem"></div>

                <div className="input-rap-container">
                  <input
                    className="input-rap"
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
              <div className="rap-detail-input">
                <label>Tên rạp</label>
                <div className="rap-detail-input-dem"></div>
                <div className="input-rap-container">
                  <input
                    className="input-rap"
                    value={name}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                    onChange={(text) => onChangeHandleName(text)}
                    onFocus={onHandleFocusName}
                  />
                  {isValidName && (
                    <p style={{ color: "red" }}>Không để trống</p>
                  )}
                </div>
              </div>
              <div className="rap-detail-input">
                <label>Vị trí</label>
                <div className="rap-detail-input-dem"></div>
                <div className="input-rap-container">
                  <input
                    className="input-rap"
                    value={numberRap}
                    readOnly={!edit}
                    style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                    onChange={(text) => onChangeHandleNumberRap(text)}
                    onFocus={onHandleFocusNumberRap}
                  />
                  {isValidNumberRap && (
                    <p style={{ color: "red" }}>Không để trống</p>
                  )}
                </div>
              </div>
              {/* {editCode && (
              
            )} */}
            </div>

            <div className="rap-detail-content-right">
              <div className="rap-detail-input">
                <label>Thời gian mở</label>
                <div className="rap-detail-input-dem"></div>
                <div className="input-rap-container">
                  <TimePicker
                    format="hh:mm a"
                    disabled={!edit}
                    openClockOnFocus={false}
                    value={openTime}
                    onChange={(text) => onChangeHandleOpenTime(text)}
                    onFocus={onHandleFocusOpenTime}
                  />
                  {isValidOpenTime && (
                    <p style={{ color: "red" }}>Chưa chọn thời gian mở</p>
                  )}
                </div>
              </div>
              <div className="rap-detail-input">
                <label>Thời gian đóng</label>
                <div className="rap-detail-input-dem"></div>
                <div className="input-rap-container">
                  <TimePicker
                    format="hh:mm a"
                    value={closeTime}
                    disabled={!edit}
                    openClockOnFocus={false}
                    onChange={(e) => onChangeHandleCloseTime(e)}
                    onFocus={onHandleFocusCloseTime}
                  />
                  {isValidCloseTime && (
                    <p style={{ color: "red" }}>
                      Thời gian đóng phải lớn hơn thời gian mở
                    </p>
                  )}
                </div>
              </div>
              <div className="rap-detail-input">
                <label>Trạng thái</label>
                <div className="rap-detail-input-dem"></div>
                <div className="input-rap-container">
                  <FormControl
                    sx={{ width: "52%", marginRight: "80px" }}
                    size="small"
                  >
                    {/* <InputLabel id="demo-select-small-label">Status</InputLabel> */}
                    <Select
                      labelId="demo-select-small-label"
                      id="demo-select-small"
                      value={status}
                      // label="Status"
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

              <div className="rap-detail-input">
                <div className="rap-detail-input-dem"></div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                  }}
                >
                  <div className="input-address-rap">
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: 5,
                        width: "22%",
                      }}
                    >
                      <label style={{ marginBottom: 5 }}>Quốc gia</label>
                      <FormControl
                        className="input-address-rap-combobox"
                        sx={{ width: "100%", marginRight: "10px" }}
                        size="small"
                      >
                        {/* <InputLabel id="demo-select-small-label">Quốc gia</InputLabel> */}
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={countryId}
                          // label="Quốc gia"
                          onChange={handleChangeComboboxCountry}
                          readOnly={!edit}
                          onFocus={onHandleFocusAddress}
                          style={
                            edit ? {} : { background: "rgb(196, 196, 196)" }
                          }
                        >
                          {country?.map((st, index) => {
                            return (
                              <MenuItem key={index} value={st.code}>
                                {st.fullName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: 5,
                        width: "22%",
                      }}
                    >
                      <label style={{ marginBottom: 5 }}>Tỉnh/Thành</label>
                      <FormControl
                        className="input-address-rap-combobox"
                        sx={{ width: "100%", marginRight: "10px" }}
                        size="small"
                      >
                        {/* <InputLabel id="demo-select-small-label">Tỉnh/TP</InputLabel> */}
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={cityId}
                          // label="Tinh/TP"
                          onChange={handleChangeComboboxCity}
                          onFocus={onHandleFocusAddress}
                          readOnly={!edit || !editCity}
                          style={
                            edit == false || editCity == false
                              ? { background: "rgb(196, 196, 196)" }
                              : {}
                          }
                        >
                          {city?.map((st, index) => {
                            return (
                              <MenuItem key={index} value={st.code}>
                                {st.fullName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        marginRight: 5,
                        width: "22%",
                      }}
                    >
                      <label style={{ marginBottom: 5 }}>Quận/Huyện</label>
                      <FormControl
                        className="input-address-rap-combobox"
                        sx={{ width: "100%", marginRight: "10px" }}
                        size="small"
                      >
                        {/* <InputLabel id="demo-select-small-label">
                    Quận/Huyện
                  </InputLabel> */}
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={districtId}
                          // label="Quân./Huyện"
                          onChange={handleChangeComboboxDistrict}
                          onFocus={onHandleFocusAddress}
                          readOnly={!edit || !editDistrict}
                          style={
                            edit == false || editDistrict == false
                              ? { background: "rgb(196, 196, 196)" }
                              : {}
                          }
                        >
                          {district?.map((st, index) => {
                            return (
                              <MenuItem key={index} value={st.code}>
                                {st.fullName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "22%",
                      }}
                    >
                      <label style={{ marginBottom: 5 }}>Phường/Xã</label>
                      <FormControl
                        className="input-address-rap-combobox"
                        sx={{ width: "100%", marginRight: "10px" }}
                        size="small"
                      >
                        {/* <InputLabel id="demo-select-small-label">
                    Phường/Xã
                  </InputLabel> */}
                        <Select
                          labelId="demo-select-small-label"
                          id="demo-select-small"
                          value={wardId}
                          // label="Phường/Xã"
                          onChange={handleChangeComboboxWard}
                          onFocus={onHandleFocusAddress}
                          readOnly={!edit || !editWard}
                          style={
                            edit == false || editWard == false
                              ? { background: "rgb(196, 196, 196)" }
                              : {}
                          }
                        >
                          {ward?.map((st, index) => {
                            return (
                              <MenuItem key={index} value={st.code}>
                                {st.fullName}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div style={{ height: "20px" }}></div>
                  {isValidAddress && (
                    <p style={{ color: "red", width: "40%" }}>{errorAddress}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              marginLeft: -20,
              paddingRight: 40,
              width: "100%",
              height: "10px",
              marginTop: 20,
              borderBottom: "10px solid rgb(228, 228, 228)",
            }}
          ></div>
          <div className="rap-detail-container-page">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                paddingRight: "10px",
                alignItems: "center",
              }}
            >
              <h2>Danh sách phòng</h2>
              <img
                src={iconAdd}
                alt="btn-add"
                className="room-btn-add"
                onClick={onClickHandleBtnAdd}
              />
            </div>
            <div className="rap-detail-table-page">
              <Table
                column={titleColumn}
                data={rooms}
                onRowClick={handleRowClick}
              />
              {/*  */}
            </div>
          </div>
        </div>
      )}
      {openModalRoomDetail && (
        <RoomDetail
          onClickHandleClose={onClickHandleCloseP}
          codeRoom={codeRoom}
          rapCode={code}
        />
      )}
      {openModelAdd && (
        <RoomDetail
          addBtn={true}
          // codeRoom={codeRoom}
          rapCode={code}
          onClickHandleClose={onClickHandleCloseP}
        />
      )}
    </div>
  );
};

export default RapDetail;

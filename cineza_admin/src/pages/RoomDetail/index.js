import React from "react";
import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import iconDetail from "../../assets/imageButtons/iconDetail.png";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import Alert from "../../components/Alert";
import ConfirmAlert from "../../components/ConfirmAlert";
import Table from "../../components/Table";
import "./roomDetail.css";
import SeatDetail from "../SeatDetail";
import { formatDayHandle } from "../../components/util";
import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import FlatList from "flatlist-react/lib";
import Select from "@mui/material/Select";
import axios from "axios";

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
    title: "Vị trí",
    data: "position",
  },
  {
    title: "Tên phòng",
    data: "nameRoom",
  },
  {
    title: "Loại",
    data: "typeSeat",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
];

const RoomDetail = ({ rapCode, codeRoom, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [codeRap, setCodeRap] = useState("");
  const [status, setStatus] = useState("");

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [dataRap, setDataRap] = useState([]);

  const [seats, setSeats] = useState([]);
  const [comunitySeats, setComunitySeats] = useState([]);
  const [vipSeats, setVipSeats] = useState([]);
  const [codeSeat, setCodeSeat] = useState("");
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidName, setIsValidName] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);
  const [isValidCodeRap, setIsValidCodeRap] = useState(false);

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

  //handle seats
  const handleRowClick = (row) => {
    console.log(row);
    setCodeSeat(row);
    setOpenModalDetail(!openModalDetail);
  };

  const handleSeatClick = (item) => {
    console.log(item);
    setCodeSeat(item.code);
    setOpenModalDetail(!openModalDetail);
  };

  const onClickHandleCloseP = async () => {
    // window.location.href = "/cineza/admin/rap";
    setOpenModalDetail(false);
    setOpenModelAdd(false);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
    console.log(openModelAdd);
  };

  const handleChangeComboboxStatus = (event) => {
    setStatus(event.target.value);
  };
  // const handleChangeComboboxCodeRap = (text) => {
  //   setCodeRap(text.target.value);
  // };

  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };
  const onChangeHandleName = (text) => {
    setName(text.target.value);
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
    onHandleFocusName();
  }, [name]);

  const onHandleFocusName = () => {
    if (editCode || edit) {
      if (name == undefined || name.trim().length <= 0) {
        setIsValidName(true);
      } else {
        setIsValidName(false);
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

  // useEffect(() => {
  //   onHandleFocusCodeRap();
  // }, [codeRap]);

  // const onHandleFocusCodeRap = () => {
  //   if (editCode || edit) {
  //     if (codeRap == undefined || codeRap.length == 0) {
  //       setIsValidCodeRap(true);
  //     } else {
  //       setIsValidCodeRap(false);
  //     }
  //   }
  // };

  useEffect(() => {
    if (addBtn) {
      setEditCode(true);
      setEdit(true);
      setCreateNew(true);
      setCodeRap(rapCode);
    } else {
      const getRoom = async () => {
        const result = await axios.get(
          `http://localhost:9000/cineza/api/v1/room/get-by-code/${codeRoom}`
        );
        if (result.status === 200) {
          setCode(result.data.code);
          setName(result.data.name);
          setCodeRap(result.data.codeRap);
          setStatus(result.data.status);
        }
      };
      getRoom();
    }
  }, []);

  //all rap
  // useEffect(() => {
  //   const getAllRap = async () => {
  //     try {
  //       const allRap = await axios.get(
  //         "http://localhost:9000/cineza/api/v1/rap/get-all"
  //       );
  //       if (allRap.status === 200) {
  //         setDataRap(allRap.data);
  //       } else {
  //         console.error("error get rap");
  //       }
  //     } catch (error) {
  //       console.error("error get all rap: " + error);
  //     }
  //   };
  //   getAllRap();
  // }, []);

  //get ghế by code phòng
  useEffect(() => {
    const getSeats = async () => {
      try {
        const result = await axios.get(
          `http://localhost:9000/cineza/api/v1/seat/get-all-by-room/${codeRoom}`
        );
        if (result.status === 200) {
          setSeats(result.data);
          // console.log(result.data);
        }
      } catch (error) {
        console.error("error get all room by rap: " + error);
      }
    };
    getSeats();
  }, []);

  //get ghế thường by code phòng
  useEffect(() => {
    const getSeats = async () => {
      try {
        const result = await axios.get(
          `http://localhost:9000/cineza/api/v1/seat/get-all-by-room-type/ts01/${codeRoom}`
        );
        if (result.status === 200) {
          setComunitySeats(result.data);
          // console.log(result.data);
        }
      } catch (error) {
        console.error("error get all room by rap: " + error);
      }
    };
    getSeats();
  }, []);

  //get ghế vip by code phòng
  useEffect(() => {
    const getSeats = async () => {
      try {
        const result = await axios.get(
          `http://localhost:9000/cineza/api/v1/seat/get-all-by-room-type/ts02/${codeRoom}`
        );
        if (result.status === 200) {
          setVipSeats(result.data);
          // console.log(result.data);
        }
      } catch (error) {
        console.error("error get all room by rap: " + error);
      }
    };
    getSeats();
  }, []);

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
    setCodeRap(codeRap);
    setSeats([]);
    setComunitySeats([]);
    setVipSeats([]);
  };

  const onClickSave = async () => {
    if (update) {
      setShowConfirmAlert(true);
      setMessage("Chỉnh sửa phòng");
    } else {
      setShowConfirmAlert(true);
      setMessage("Thêm phòng");
    }
  };

  const onClickHandleSave = async () => {
    setShowConfirmAlert(false);
    const room = {
      code: code,
      name: name,
      codeRap: codeRap,
      status: status,
    };
    onHandleFocusCode();
    onHandleFocusName();
    onHandleFocusStatus();
    if (!isValidCode & !isValidName & !isValidStatus) {
      try {
        console.log(room);
        if (editCode) {
          const response = await axios.post(
            `http://localhost:9000/cineza/api/v1/room/create`,
            room
          );
          if (response.status === 201) {
            setMessage("Lưu thành công");
            setShowAlert(true);

            onClickHandleNew();
          } else {
            setMessage("Lưu thất bại. Mã đã tồn tại");
            setShowAlert(true);
          }
        } else if (update) {
          const getShow = await axios.get(
            `http://localhost:9000/cineza/api/v1/show/get-all-by-room/${code}`
          );
          const currentDate = new Date();
          let newArray = [];
          let dataShow = getShow.data.map((s) => {
            let newDate = new Date(s.showDate);

            s.showDate = `${newDate.getFullYear()}-${String(
              newDate.getMonth() + 1
            ).padStart(2, "0")}-${String(newDate.getDate()).padStart(2, "0")}`;

            return s;
          });
          dataShow.forEach((item) => {
            if (
              formatDayHandle(currentDate) < formatDayHandle(item.showDate) ||
              formatDayHandle(currentDate) == formatDayHandle(item.showDate)
            ) {
              newArray = [...newArray, item];
            }

            console.log(
              formatDayHandle(currentDate),
              formatDayHandle(item.showDate),
              formatDayHandle(currentDate) == formatDayHandle(item.showDate)
            );
          });

          console.log(newArray.length);
          if (newArray.length === 0) {
            const response = await axios.put(
              `http://localhost:9000/cineza/api/v1/room/put/` + code,
              room
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
        console.log("save room fail: " + error);
        setMessage("Lưu thất bại. Mã đã tồn tại");
        setShowAlert(true);
      }
    } else {
      console.log("lưu sai");
      setMessage("Chưa nhập đầy đủ thông tin hoặc thông tin nhập chưa đúng!");
      setShowAlert(true);
    }
  };

  return (
    <div className="room-detail-background">
      <div className="room-detail-container">
        <div className="room-detail-header">
          <div className="room-detail-header-edit">
            <div className="room-detail-header-edit-save" onClick={onClickSave}>
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="room-detail-header-edit-update"
              onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <div
              className="room-detail-header-edit-update"
              onClick={onClickHandleNew}
            >
              <img className="iconNew" src={iconCreateNew} alt="create new" />
              <p>Tạo mới</p>
            </div>
            <div
              className="room-detail-header-close"
              onClick={() => onClickHandleClose(codeRap)}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
          <div className="room-detail-header-name">
            <span>{code} - </span> <span>-{name} </span>
          </div>
        </div>

        <div className="room-detail-content">
          <div className="room-detail-content-left">
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

            <div className="room-detail-input">
              <label>Mã phòng</label>
              <div className="room-detail-input-dem"></div>

              <div className="input-room-container">
                <input
                  className="input-room"
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
            <div className="room-detail-input">
              <label>Tên phòng</label>
              <div className="room-detail-input-dem"></div>
              <div className="input-room-container">
                <input
                  className="input-room"
                  value={name}
                  readOnly={!edit}
                  style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  onChange={(text) => onChangeHandleName(text)}
                  onFocus={onHandleFocusName}
                />
                {isValidName && (
                  <p style={{ color: "red" }}>"Không để trống"</p>
                )}
              </div>
            </div>
            <div className="room-detail-input">
              <label>Mã rap</label>
              <div className="room-detail-input-dem"></div>
              <div className="input-room-container">
                <input
                  className="input-room"
                  value={codeRap}
                  readOnly={true}
                  style={{ background: "rgb(196, 196, 196)" }}
                // onChange={(text) => onChangeHandleCodeRap(text)}
                // onFocus={onHandleFocusPosition}
                />
              </div>
            </div>

            <div className="room-detail-input">
              <label>Trạng thái</label>
              <div className="room-detail-input-dem"></div>
              <div className="input-room-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  {/* <InputLabel id="demo-select-small-label">Status</InputLabel> */}
                  <Select
                    // labelId="demo-select-small-label"
                    // id="demo-select-small"
                    value={status}
                    // label="Status"
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

          <div className="room-detail-content-right"></div>
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
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingRight: "10px",
            alignItems: "center",
          }}
        >
          <h2>Danh sách ghế</h2>
        </div>
        <div
          style={{
            width: "99%",
            display: "flex",
            flexDirection: "row",
          }}
        >
          <div className="room-detail-container-page-left">
            <div className="room-detail-table-page">
              <Table
                column={titleColumn}
                data={seats}
                onRowClick={handleRowClick}
              />
              {/*  */}
            </div>
            {openModalDetail && (
              <SeatDetail
                onClickHandleClose={onClickHandleCloseP}
                codeSeat={codeSeat}
              />
            )}
            {/* {openModelAdd && (
              <SeatDetail
                addBtn={true}
                onClickHandleClose={onClickHandleCloseP}
              />
            )} */}
          </div>
          <div className="room-detail-container-page-right">
            <FlatList
              list={comunitySeats}
              renderWhenEmpty={() => <div></div>}
              renderItem={(item) => (
                <div className="room-detail-container-page-right-comunity">
                  <b>{item.position}</b>
                </div>
              )}
            />
            <FlatList
              list={vipSeats}
              renderWhenEmpty={() => <div></div>}
              renderItem={(item) => (
                <div
                  className="room-detail-container-page-right-vip"
                // onClick={handleSeatClick(item)}
                >
                  <b>{item.position}</b>
                </div>
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;

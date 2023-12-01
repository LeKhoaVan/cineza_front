import React from "react";
import moment from "moment";

import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import iconRoom from "../../assets/imageButtons/iconRoom.png";
import iconBack from "../../assets/imageButtons/iconBack.png";
import Alert from "../../components/Alert";
import ConfirmAlert from "../../components/ConfirmAlert";
import TableInPage from "../../components/TableInPage";
import "./showDetail.css";

import { useEffect, useState } from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import axios from "axios";
import { formatDateHandle, formatTimeHandle } from "../../components/util";
import { flushSync } from "react-dom";

const dataStatus = [
  { id: "Hoạt động", value: "Hoạt động" },
  { id: "Khóa tạm thời", value: "Khóa tạm thời" },
  { id: "Hủy", value: "Hủy" },
];

const column = [
  { title: "Tên người dùng", data: "fullName" },
  { title: "Phim", data: "movieName" },
  { title: "Ngày chiếu", data: "showDate" },
  { title: "Giờ chiếu", data: "showStart" },
  { title: "Rap", data: "rapName" },
  { title: "Phòng", data: "roomName" },
  { title: "Ghế", data: "codeSeat" },
  { title: "Ngày đặt vé", data: "bookAt" },
  { title: "Trạng thái", data: "status" },
];

const ShowDetail = ({ codeShow, onClickHandleClose, addBtn }) => {
  const [code, setCode] = useState("");
  const [showStart, setShowStart] = useState("");
  const [showEnd, setShowEnd] = useState("");
  const [codeMovie, setCodeMovie] = useState("");
  const [codeRap, setCodeRap] = useState("");
  const [codeRoom, setCodeRoom] = useState("");
  const [showDate, setShowDate] = useState("");
  const [status, setStatus] = useState("");
  const [dataTicket, setDataTicket] = useState([]);
  const [dataSeatVip, setDataSeatVip] = useState([]);
  const [dataSeatThuong, setDataSeatThuong] = useState([]);
  const [dataSeatTicketVip, setDataSeatTicketVip] = useState([]);
  const [dataSeatTicketThuong, setDataSeatTicketThuong] = useState([]);

  const [rapName, setRapName] = useState("");
  const [roomName, setRoomName] = useState("");
  const [movieName, setMovieName] = useState("");
  const [totalSeat, setTotalSeat] = useState(0);
  const [totalBook, setTotalBook] = useState(0);
  const [codeTicket, setCodeTicket] = useState("");
  const [ticket, setTicket] = useState("");

  const [edit, setEdit] = useState(false);
  const [editCode, setEditCode] = useState(false);
  const [update, setUpdate] = useState(false);
  const [createNew, setCreateNew] = useState(false);
  const [errors, setErrors] = useState({});

  const [dataMovie, setDataMovie] = useState([]);
  const [dataRap, setDataRap] = useState([]);
  const [dataRoom, setDataRoom] = useState([]);
  const [dates, setDates] = useState([]);
  // const [dataTicket, setDataTicket] = useState([]);

  const [isValidCode, setIsValidCode] = useState(false);
  const [isValidShowStart, setIsValidShowStart] = useState(false);
  const [isValidCodeMovie, setIsValidCodeMovie] = useState(false);
  const [isValidCodeRap, setIsValidCodeRap] = useState(false);
  const [isValidShowDate, setIsValidShowDate] = useState(false);
  const [isValidCodeRoom, setIsValidCodeRoom] = useState(false);
  const [isValidStatus, setIsValidStatus] = useState(false);

  const [showDetail, setShowDetail] = useState(true);
  const [showRoom, setShowRoom] = useState(false);
  const [showTicket, setShowTicket] = useState(false);

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

  const handleOnClickBack = () => {
    setShowRoom(false);
    setShowTicket(false);
    setShowDetail(true);
  };

  const handleOnClickBackTicket = () => {
    setShowRoom(false);
    setShowTicket(false);
    setShowDetail(true);
  };

  const handleChangeComboboxStatus = (event) => {
    setStatus(event.target.value);
  };
  const handleChangeComboboxCodeMovie = (event) => {
    setCodeMovie(event.target.value);
  };

  const handleChangeComboboxCodeRap = (event) => {
    setCodeRap(event.target.value);
  };
  const handleChangeComboboxCodeRoom = (event) => {
    setCodeRoom(event.target.value);
  };
  const onChangeHandleCode = (text) => {
    setCode(text.target.value);
  };
  const onChangeHandleShowStart = (text) => {
    setShowStart(text);
    // console.log(text);
  };

  const handleChangeComboboxShowDate = (text) => {
    setShowDate(text.target.value);
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
    onHandleFocusCodeMovie();
    if (codeMovie != "") {
      const getDate = async () => {
        const resutlDate = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/movie/${codeMovie}`
        );
        if (resutlDate.status === 200) {
          const startDate = moment(resutlDate.data.startDate);
          const endDate = moment(resutlDate.data.endDate);

          const daysInRange = [];

          let currentDate = moment();
          while (currentDate.isSameOrBefore(endDate, "day")) {
            daysInRange.push(currentDate.format("DD-MM-YYYY"));
            currentDate.add(1, "days");
          }
          setDates(daysInRange);
        } else {
          console.log("error get date by movie");
        }
      };
      getDate();
    }
  }, [codeMovie]);

  const onHandleFocusCodeMovie = () => {
    if (editCode || edit) {
      if (codeMovie == undefined || codeMovie.length <= 0) {
        setIsValidCodeMovie(true);
      } else {
        setIsValidCodeMovie(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusCodeRap();
  }, [codeRap]);

  const onHandleFocusCodeRap = () => {
    if (editCode || edit) {
      if (codeRap == undefined || codeRap.length <= 0) {
        setIsValidCodeRap(true);
      } else {
        setIsValidCodeRap(false);
      }
    }
  };

  useEffect(() => {
    onHandleFocusCodeRoom();
  }, [codeRoom]);

  const onHandleFocusCodeRoom = () => {
    if (editCode || edit) {
      if (codeRoom == undefined || codeRoom.length <= 0) {
        setIsValidCodeRoom(true);
      } else {
        setIsValidCodeRoom(false);
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
    onHandleFocusShowDate();
  }, [showDate]);

  const onHandleFocusShowDate = () => {
    if (editCode || edit) {
      if (showDate == undefined || showDate.length == 0) {
        setIsValidShowDate(true);
      } else {
        setIsValidShowDate(false);
      }
    }
  };

  useEffect(() => {
    if (addBtn) {
      setEditCode(true);
      setEdit(true);
      setCreateNew(true);
    } else {
      const getShow = async () => {
        const result = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/show/get-by-code/${codeShow}`
        );
        if (result.status === 200) {
          setCode(result.data.code);
          let date = `${new Date(result.data.showStart).getHours()}:${new Date(
            result.data.showStart
          ).getMinutes()}`;
          let dateEnd = `${new Date(result.data.showEnd).getHours()}:${new Date(
            result.data.showEnd
          ).getMinutes()}`;

          setShowStart(date);
          setShowEnd(dateEnd);

          setStatus(result.data.status);

          const inputDateTime = new Date(result.data.showDate);
          // Đặt múi giờ châu Á (UTC+7)
          const timeZoneOffset = 7 * 60; // UTC offset in minutes
          const asiaTime = new Date(
            inputDateTime.getTime() + timeZoneOffset * 60000
          );
          // Định dạng ngày theo "DD-MM-YYYY"
          const day = asiaTime.getDate();
          const month = asiaTime.getMonth() + 1;
          const year = asiaTime.getFullYear();
          const formattedDateTime = `${day < 10 ? "0" : ""}${day}-${month < 10 ? "0" : ""
            }${month}-${year}`;
          setShowDate(formattedDateTime);

          setCodeMovie(result.data.codeMovie);
          setCodeRap(result.data.codeRap);
          setCodeRoom(result.data.codeRoom);

          setRapName(result.data.nameRap);
          setRoomName(result.data.nameRoom);
          setMovieName(result.data.movieName);
        }
      };
      getShow();
    }
  }, [codeShow]);

  //get ticket by code show
  useEffect(() => {
    const getAllTicket = async () => {
      const allTicket = await axios.get(
        `http://13.212.32.129:9000/cineza/api/v1/ticket/get-by-showing/${codeShow}`
      );
      if (allTicket.status === 200) {
        const resultTickets = allTicket.data.map((t) => {
          return {
            ...t,
            showDate: formatDateHandle(t.showDate),
            showStart: `${new Date(t.showStart).getHours()}:${new Date(
              t.showStart
            ).getMinutes()}`,
            bookAt: formatDateHandle(t.bookAt),
          };
        });
        setDataTicket(resultTickets);
      } else {
        console.error("get all ticket in showing");
      }
    };

    getAllTicket();
  }, []);

  useEffect(() => {
    if (codeRoom != "") {
      const getAllSeat = async () => {
        const allSeat = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/seat/get-all-by-room/${codeRoom}`
        );
        const allTicket = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/ticket/get-by-showing/${codeShow}`
        );
        if (allSeat.status === 200) {
          const result = allSeat.data;

          // do du lieu ghe vao so do
          let resultVip = [];
          let resultThuong = [];
          let totalSeatTam = 0;
          result.forEach((seat, idx) => {
            totalSeatTam = idx;
            let newSeat = { ...seat, booked: false };
            if (seat.typeSeat == "VIP") {
              resultVip = [...resultVip, newSeat];
            } else if (seat.typeSeat == "Thường") {
              resultThuong = [...resultThuong, newSeat];
            }
          });
          setTotalSeat(totalSeatTam + 1);

          let totalBookTam = 0;
          if (allTicket.status === 200) {
            //check ghe thuong da duoc book hay chua
            resultThuong = resultThuong.map((thuong) => {
              const foundTicket = allTicket.data.find(
                (ticket) => thuong.code === ticket.codeSeat
              );

              if (foundTicket) {
                totalBookTam++;
                return { ...thuong, booked: true };
              } else {
                return { ...thuong, booked: false };
              }
            });

            //check ghe thuong da duoc book hay chua
            resultVip = resultVip.map((vip) => {
              const foundTicket = allTicket.data.find(
                (ticket) => vip.code === ticket.codeSeat
              );

              if (foundTicket) {
                totalBookTam++;
                return { ...vip, booked: true };
              } else {
                return { ...vip, booked: false };
              }
            });
          }
          setTotalBook(totalBookTam);

          setDataSeatVip(resultVip);
          setDataSeatThuong(resultThuong);
        } else {
          console.error("error get all seat in show detail");
        }
      };
      getAllSeat();
    }
  }, [codeRoom]);

  //combobox movie
  useEffect(() => {
    const getAllMovie = async () => {
      try {
        const allMovie = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/movie/get-all`
        );
        if (allMovie.status === 200) {
          setDataMovie(allMovie.data);
        } else {
          console.error("get all movie error");
        }
      } catch (error) {
        console.error("get all movie error: " + error);
      }
    };
    getAllMovie();
  }, []);

  //combobox rap
  useEffect(() => {
    const getAllRap = async () => {
      try {
        const allRap = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/rap/get-all`
        );
        if (allRap.status === 200) {
          setDataRap(allRap.data);
          setDataRoom([]);
        } else {
          console.error("get all Rap error");
        }
      } catch (error) {
        console.error("get all Rap error: " + error);
      }
    };
    getAllRap();
  }, []);

  //combobox room
  useEffect(() => {
    const getAllRoom = async () => {
      try {
        if (codeRap != "") {
          const allRoom = await axios.get(
            `http://13.212.32.129:9000/cineza/api/v1/room/get-all-by-code/${codeRap}`
          );
          if (allRoom.status === 200) {
            setDataRoom(allRoom.data);
          } else {
            console.error("get all Room error");
          }
        }
      } catch (error) {
        console.error("get all Room error: " + error);
      }
    };
    getAllRoom();
  }, [codeRap]);

  const onClickHandleEdit = () => {
    if (dataTicket.length == 0) {
      setUpdate(true);
      setCreateNew(false);
      setEdit(true);
      setEditCode(false);
    } else {
      setMessage("Đã có vé không thể chỉnh sửa");
      setShowAlert(true);
    }
  };

  const onClickHandleNew = () => {
    setUpdate(false);
    setCreateNew(true);
    setEditCode(true);
    setEdit(true);

    setCode("");
    setStatus("");
    setShowStart("");
    setShowEnd("");
    setCodeMovie("");
    setCodeRap("");
    setShowDate("");
    setDates([]);
    setCodeRoom("");

    setDataTicket([]);
  };

  const onClickSave = async () => {
    if (update) {
      setShowConfirmAlert(true);
      setMessage("Chỉnh sửa suất chiếu");
    } else {
      setShowConfirmAlert(true);
      setMessage("Thêm suất chiếu");
    }
  };

  const onClickHandleSave = async () => {
    setShowConfirmAlert(false);
    const show = {
      code: code,
      showStart: showStart,
      status: status,
      codeMovie: codeMovie,
      showDate: moment(showDate, "DD-MM-YYYY").format("YYYY-MM-DD"),
      codeRap: codeRap,
      codeRoom: codeRoom,
    };
    onHandleFocusCode();
    onHandleFocusCodeMovie();
    onHandleFocusCodeRap();
    onHandleFocusCodeRoom();
    onHandleFocusStatus();
    if (
      !isValidCode &
      !isValidCodeMovie &
      !isValidCodeRap &
      !isValidStatus &
      !isValidCodeRoom
    ) {
      try {
        if (editCode) {
          let movieTime = "";
          let showEnd = "";
          const dateCheck = moment(showDate, "DD-MM-YYYY").format("YYYY-MM-DD");
          const timeMovie = await axios.get(
            `http://13.212.32.129:9000/cineza/api/v1/movie/${codeMovie}`
          );
          if (timeMovie.data != "not found!") {
            const startTime = new Date();
            const [startHours, startMinutes] = showStart.split(":").map(Number);
            startTime.setHours(startHours, startMinutes);

            movieTime = timeMovie.data.movieTime;
            const hours = Math.floor(movieTime / 60);
            const minutes = movieTime % 60;
            // const startTam = showStart;
            showEnd = startTime.setHours(
              startTime.getHours() + hours,
              startTime.getMinutes() + minutes
            );

            const dateObject = new Date(showEnd);

            const hours1 = dateObject.getHours();
            const minutes1 = dateObject.getMinutes();
            const timeEnd1 = `${hours1}:${minutes1}`;

            const checkTime = await axios.get(
              `http://13.212.32.129:9000/cineza/api/v1/show/check-show/${codeRap}/${codeRoom}/${dateCheck}/${showStart}/${timeEnd1}`
            );
            console.log(dateCheck);
            console.log(checkTime.data.length);
            if (checkTime.data.length === 0) {
              const response = await axios.post(
                `http://13.212.32.129:9000/cineza/api/v1/show/create`,
                show
              );
              if (response.status === 201) {
                console.log(showStart);
                setMessage("Lưu thành công");
                setShowAlert(true);

                onClickHandleNew();
              } else {
                setMessage("Lưu thất bại");
                setShowAlert(true);
              }
            } else {
              // console.log("co suất chiếu trung")
              setMessage("Có suất chiếu trùng. Không thể tạo suất chiếu!");
              setIsOpenDialog(true);
            }
          }
        } else if (update) {
          let movieTime = "";
          let showEnd = "";
          const dateCheck = moment(showDate, "DD-MM-YYYY").format("YYYY-MM-DD");
          const timeMovie = await axios.get(
            `http://13.212.32.129:9000/cineza/api/v1/movie/${codeMovie}`
          );
          if (timeMovie.data != "not found!") {
            const startTime = new Date();
            const [startHours, startMinutes] = showStart.split(":").map(Number);
            startTime.setHours(startHours, startMinutes);

            movieTime = timeMovie.data.movieTime;
            const hours = Math.floor(movieTime / 60);
            const minutes = movieTime % 60;
            // const startTam = showStart;
            showEnd = startTime.setHours(
              startTime.getHours() + hours,
              startTime.getMinutes() + minutes
            );

            const dateObject = new Date(showEnd);

            const hours1 = dateObject.getHours();
            const minutes1 = dateObject.getMinutes();
            const timeEnd1 = `${hours1}:${minutes1}`;

            console.log("-------------test show end-----------");
            console.log(showStart);
            console.log(timeEnd1);
            const checkTime = await axios.get(
              `http://13.212.32.129:9000/cineza/api/v1/show/check-show/${codeRap}/${codeRoom}/${dateCheck}/${showStart}/${timeEnd1}`
            );

            if (checkTime.data.length === 0) {
              const response = await axios.put(
                `http://13.212.32.129:9000/cineza/api/v1/show/put/` + code,
                show
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
              setMessage("Có suất chiếu trùng. Không thể cập nhật suất chiếu!");
              setIsOpenDialog(true);
            }
          }
        }
      } catch (error) {
        console.log("save fail: " + error);
        setMessage("Lưu thất bại");
        setShowAlert(true);
      }
    } else {
      console.log("lưu sai");
      setMessage("Vui lòng nhập đầy đủ");
      setShowAlert(true);
    }
  };

  const onClickHandleShowRoom = () => {
    setShowDetail(false);
    setShowTicket(false);
    console.log(showStart);
    setShowRoom(true);
  };

  const handleOnClickRow = (code) => {
    setShowDetail(false);
    setShowRoom(false);
    setShowTicket(true);
    setCodeTicket(code);
  };

  useEffect(() => {
    if (codeTicket != "") {
      const getTicket = async () => {
        const allSeat = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/seat/get-all-by-room/${codeRoom}`
        );
        const ticket = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/ticket/get-by-code/${codeTicket}`
        );
        if (ticket.status === 200) {
          setTicket(ticket.data);
          if (allSeat.status === 200) {
            let resultVip = [];
            let resultThuong = [];
            const result = allSeat.data;

            result.forEach((seat, idx) => {
              let newSeat = { ...seat, booked: false };
              if (seat.typeSeat == "VIP") {
                resultVip = [...resultVip, newSeat];
              } else if (seat.typeSeat == "Thường") {
                resultThuong = [...resultThuong, newSeat];
              }
            });

            resultThuong = resultThuong.map((thuong) => {
              if (thuong.code == ticket.data.codeSeat) {
                return { ...thuong, booked: true };
              } else {
                return { ...thuong, booked: false };
              }
            });

            //check ghe thuong da duoc book hay chua
            resultVip = resultVip.map((vip) => {
              if (vip.code == ticket.data.codeSeat) {
                return { ...vip, booked: true };
              } else {
                return { ...vip, booked: false };
              }
            });

            setDataSeatTicketThuong(resultThuong);
            setDataSeatTicketVip(resultVip);
          }
        } else {
          console.error("error get ticket in show ");
        }
      };
      getTicket();
    }
  }, [codeTicket]);

  useEffect(() => {
    if (
      (edit == true || editCode == true) &&
      codeMovie != "" &&
      showStart != ""
    ) {
      const getTimeMovie = async () => {
        const timeMovie = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/movie/${codeMovie}`
        );
        if (timeMovie.data != "not found!") {
          const startTime = new Date();
          if (showStart != null) {
            const [startHours, startMinutes] = showStart.split(":").map(Number);
            startTime.setHours(startHours, startMinutes);

            let movieTime = timeMovie.data.movieTime;
            const hours = Math.floor(movieTime / 60);
            const minutes = movieTime % 60;
            // const startTam = showStart;
            let showEndTam = startTime.setHours(
              startTime.getHours() + hours,
              startTime.getMinutes() + minutes
            );

            const dateObject = new Date(showEndTam);

            const hours1 = dateObject.getHours();
            const minutes1 = dateObject.getMinutes();
            const timeEnd1 = `${hours1}:${minutes1}`;

            console.log(timeEnd1);
            setShowEnd(timeEnd1);
          }
        }
      };
      getTimeMovie();
    }
  }, [showStart, codeMovie]);

  return (
    <div className="show-detail-background">
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
      {showRoom && (
        <div className="show-room-container">
          <div className="show-room-diagram">
            <img
              src={iconBack}
              onClick={handleOnClickBack}
              className="show-room-iconBack"
              alt="icon-back"
            />
            <h3>Sơ đồ ghế</h3>
            <div
              style={{
                marginLeft: "-5px",
                paddingRight: "-20px",
                width: "97%",
                height: 20,
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "10px solid black",
              }}
            >
              <h4
                style={{
                  paddingLeft: "45%",
                }}
              >
                Màn hình chiếu
              </h4>
            </div>
            <div className="seat-show-container">
              {dataSeatThuong?.map((seat, index) => (
                <div
                  key={index}
                  className={`seat-show ${seat?.booked ? "occupied-show" : "seat-thuong"
                    }`}
                // onClick={() => toggleSeat(index, seat)}
                >
                  Ghế {seat?.position}
                </div>
              ))}

              {dataSeatVip?.map((seat, index) => (
                <div
                  key={index}
                  className={`seat-show ${seat?.booked ? "occupied-show" : "seat-vip"
                    }`}
                // onClick={() => toggleSeat(index, seat)}
                >
                  Ghế {seat?.position}
                </div>
              ))}
            </div>
            <div className="show-color-status">
              <div className="color-vip">Ghế VIP</div>
              <div className="color-thuong">Ghế Thường</div>
              <div className="color-booked">Ghế đã đặt</div>
            </div>
          </div>

          <div className="show-room-detail">
            <div className="show-room-title">
              <h3>Thông tin phòng</h3>
            </div>
            <div className="show-room-text">
              <p>Rạp: {rapName}</p>
              <p>Phòng: {roomName}</p>
              <p>Phim: {movieName}</p>
              <p>Ngày chiếu: {showDate == "" ? "" : showDate.toString()}</p>
              <p>
                Giờ chiếu: {showStart == "" ? "" : showStart}
                {/* {showStart == "" ? "" : showStart.getMinutes()} */}
              </p>
              <p>
                Giờ kết thúc: {showEnd == "" ? "" : showEnd}
                {/* {showEnd == "" ? "" : showEnd.getMinutes()} */}
              </p>
              <p>Tổng số ghế: {totalSeat}</p>
              <p>Tổng số ghế được đặt: {totalBook}</p>
              <p>Tổng số ghế trống: {totalSeat - totalBook}</p>
              <p>Trạng thái: {status}</p>
            </div>
          </div>
        </div>
      )}

      {showTicket && (
        <div className="show-room-container">
          <div className="show-room-diagram">
            <img
              src={iconBack}
              onClick={handleOnClickBackTicket}
              className="show-room-iconBack"
              alt="icon-back"
            />
            <h3>Sơ đồ ghế</h3>
            <div
              style={{
                marginLeft: "-5px",
                paddingRight: "-20px",
                width: "97%",
                height: 20,
                alignItems: "center",
                justifyContent: "center",
                borderBottom: "20px solid black",
              }}
            >
              <h4
                style={{
                  paddingLeft: "45%",
                }}
              >
                Màn hình chiếu
              </h4>
            </div>
            <div className="seat-show-container">
              {dataSeatTicketThuong?.map((seat, index) => (
                <div
                  key={index}
                  className={`seat-show ${seat?.booked ? "occupied-show" : "seat-thuong"
                    }`}
                // onClick={() => toggleSeat(index, seat)}
                >
                  Ghế {seat?.position}
                </div>
              ))}

              {dataSeatTicketVip?.map((seat, index) => (
                <div
                  key={index}
                  className={`seat-show ${seat?.booked ? "occupied-show" : "seat-vip"
                    }`}
                // onClick={() => toggleSeat(index, seat)}
                >
                  Ghế {seat?.position}
                </div>
              ))}
            </div>
            <div className="show-color-status">
              <div className="color-vip">Ghế VIP</div>
              <div className="color-thuong">Ghế Thường</div>
              <div className="color-booked">Ghế đã đặt</div>
            </div>
          </div>

          <div className="show-room-detail">
            <div className="show-room-title">
              <h3>Thông tin vé</h3>
            </div>
            <div className="show-room-text">
              <p>Khách hàng: {ticket.fullName}</p>
              <p>Phim: {ticket.movieName}</p>
              <p>Ngày chiếu: {formatDateHandle(new Date(ticket.showDate))}</p>
              <p>
                Giờ chiếu: {new Date(ticket.showStart).getHours()}:
                {new Date(ticket.showStart).getMinutes()}{" "}
              </p>
              <p>Rạp: {ticket.rapName}</p>
              <p>Phòng: {ticket.roomName}</p>
              <p>
                ghế: {ticket.codeSeat} - {ticket.position}
              </p>
              <p>Trạng thái: {ticket.status}</p>
            </div>
            <div className="show-room-btn">
              <button className="btn-cancel">Hủy vé</button>
            </div>
          </div>
        </div>
      )}

      {showDetail == undefined
        ? true
        : showDetail && (
          <div className="show-detail-container">
            <div className="show-detail-header">
              <div className="show-detail-header-edit">
                <div
                  className="show-detail-header-edit-save"
                  onClick={onClickSave}
                >
                  <img className="icon-save" src={iconSave} alt="update" />
                  <p>Lưu</p>
                </div>
                <div
                  className="show-detail-header-edit-update"
                  onClick={onClickHandleEdit}
                >
                  <img className="icon-update" src={iconPen} alt="update" />
                  <p>Chỉnh sửa</p>
                </div>

                <div
                  className="show-detail-header-edit-update"
                  onClick={onClickHandleNew}
                >
                  <img
                    className="iconNew"
                    src={iconCreateNew}
                    alt="create new"
                  />
                  <p>Tạo mới</p>
                </div>

                <div
                  className="show-detail-header-edit-show-room"
                  onClick={onClickHandleShowRoom}
                >
                  <img className="iconDetail" src={iconRoom} alt="update" />
                  <p>Phòng chiếu</p>
                </div>
                <div className="show-detail-header-close">
                  <img
                    className="iconClose"
                    onClick={onClickHandleClose}
                    src={iconClose}
                    alt="close"
                  />
                </div>
              </div>
            </div>
            <div className="show-detail-content">
              <div className="show-detail-content-left">
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
                <div className="show-detail-input">
                  <label>Mã xuất chiếu</label>
                  <div className="show-detail-input-dem"></div>

                  <div className="input-show-detail-container">
                    <input
                      className="input-show-detail"
                      value={code}
                      readOnly={!editCode}
                      style={
                        editCode ? {} : { background: "rgb(196, 196, 196)" }
                      }
                      onChange={(text) => onChangeHandleCode(text)}
                      onFocus={onHandleFocusCode}
                    />
                    {isValidCode && (
                      <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                    )}
                  </div>
                </div>
                <div className="show-detail-input">
                  <label>Thời gian chiếu</label>
                  <div className="show-detail-input-dem"></div>
                  <div className="input-show-detail-container">
                    <TimePicker
                      format="HH:mm" // Định dạng hiển thị 24 giờ
                      openClockOnFocus={false}
                      disabled={!edit}
                      value={showStart}
                      onChange={(text) => onChangeHandleShowStart(text)}
                      className="show-detail-time-picker"
                    />
                  </div>
                </div>

                <div className="show-detail-input">
                  <label>Thời gian kết thúc</label>
                  <div className="show-detail-input-dem"></div>
                  <div className="input-show-detail-container">
                    <TimePicker
                      format="HH:mm" // Định dạng hiển thị 24 giờ
                      openClockOnFocus={false}
                      disabled={true}
                      value={showEnd}
                      // clockClassName="show-detail-time-picker"
                      className="show-detail-time-picker"
                    />
                  </div>
                </div>

                <div className="show-detail-input">
                  <label>Trạng thái</label>
                  <div className="show-detail-input-dem"></div>
                  <div className="input-show-detail-container">
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
                        style={
                          edit ? {} : { background: "rgb(196, 196, 196)" }
                        }
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

              <div className="show-detail-content-right">
                <div className="show-detail-input">
                  <label>Tên phim</label>
                  <div className="show-detail-input-dem"></div>
                  <div className="input-show-detail-container">
                    <FormControl
                      sx={{ width: "52%", marginRight: "80px" }}
                      size="small"
                    >
                      {/* <InputLabel id="demo-select-small-label">
                          Tên phim
                        </InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={codeMovie}
                        // label="Tên phim"
                        onChange={handleChangeComboboxCodeMovie}
                        onFocus={onHandleFocusCodeMovie}
                        readOnly={!edit}
                        style={
                          edit ? {} : { background: "rgb(196, 196, 196)" }
                        }
                      >
                        {dataMovie.map((st, index) => {
                          return (
                            <MenuItem key={index} value={st.code}>
                              {st.movieName}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    {isValidCodeMovie && (
                      <p style={{ color: "red" }}>Không được bỏ trống</p>
                    )}
                  </div>
                </div>

                <div className="show-detail-input">
                  <label>Ngày chiếu</label>
                  <div className="show-detail-input-dem"></div>
                  <div className="input-show-detail-container">
                    <FormControl
                      sx={{ width: "52%", marginRight: "80px" }}
                      size="small"
                    >
                      {/* <InputLabel id="demo-select-small-label">
                          Ngày chiếu
                        </InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={showDate}
                        // label="Ngày chiếu"
                        onChange={handleChangeComboboxShowDate}
                        onFocus={onHandleFocusShowDate}
                        readOnly={!edit}
                        style={
                          edit ? {} : { background: "rgb(196, 196, 196)" }
                        }
                      >
                        {dates.map((st, index) => {
                          return (
                            <MenuItem key={index} value={st}>
                              {st}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    {isValidShowDate && (
                      <p style={{ color: "red" }}>Không được bỏ trống</p>
                    )}
                  </div>
                </div>

                <div className="show-detail-input">
                  <label>Mã rạp</label>
                  <div className="show-detail-input-dem"></div>
                  <div className="input-show-detail-container">
                    <FormControl
                      sx={{ width: "52%", marginRight: "80px" }}
                      size="small"
                    >
                      {/* <InputLabel id="demo-select-small-label">mã rạp</InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={codeRap}
                        // label="mã rạp"
                        onChange={handleChangeComboboxCodeRap}
                        onFocus={onHandleFocusCodeRap}
                        readOnly={!edit}
                        style={
                          edit ? {} : { background: "rgb(196, 196, 196)" }
                        }
                      >
                        {dataRap.map((st, index) => {
                          return (
                            <MenuItem key={index} value={st.code}>
                              {st.code}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    {isValidCodeRap && (
                      <p style={{ color: "red" }}>Không được bỏ trống</p>
                    )}
                  </div>
                </div>

                <div className="show-detail-input">
                  <label>Mã phòng</label>
                  <div className="show-detail-input-dem"></div>
                  <div className="input-show-detail-container">
                    <FormControl
                      sx={{ width: "52%", marginRight: "80px" }}
                      size="small"
                    >
                      {/* <InputLabel id="demo-select-small-label">mã phòng</InputLabel> */}
                      <Select
                        labelId="demo-select-small-label"
                        id="demo-select-small"
                        value={codeRoom}
                        // label="mã phòng"
                        onChange={handleChangeComboboxCodeRoom}
                        onFocus={onHandleFocusCodeRoom}
                        readOnly={!edit}
                        style={
                          edit ? {} : { background: "rgb(196, 196, 196)" }
                        }
                      >
                        {dataRoom.map((st, index) => {
                          return (
                            <MenuItem key={index} value={st.code}>
                              {st.code}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    {isValidCodeRoom && (
                      <p style={{ color: "red" }}>Không được bỏ trống</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <h3>Danh sách vé</h3>
            <div className="show-detail-table-content">
              <TableInPage
                data={dataTicket}
                column={column}
                onClickRow={handleOnClickRow}
              />
            </div>
          </div>
        )}
    </div>
  );
};

export default ShowDetail;

import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import TicketDetail from "../TicketDetail";
import { formatDateHandle } from "../../components/util";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import iconFind from "../../assets/imageButtons/iconFind.png";
import iconBack from "../../assets/imageButtons/iconBack.png";
import "./ticket.css";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DatePicker from "react-datepicker";

const columns = [
  {
    title: "Khách hàng",
    data: "fullName",
  },
  {
    title: "Phim",
    data: "movieName",
  },
  {
    title: "Ngày chiếu",
    data: "showDate",
  },
  {
    title: "Giờ chiếu",
    data: "showStart",
  },
  {
    title: "Rap",
    data: "rapName",
  },
  {
    title: "Phòng",
    data: "roomName",
  },
  {
    title: "Ghế",
    data: "position",
  },
  {
    title: "Ngày đặt",
    data: "bookAt",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
];
const Ticket = () => {
  const [context, setContext] = useState([]);

  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [openAllTicket, setOpenAllTicket] = useState(true);
  const [code, setCode] = useState("");

  const [dataSeatTicketVip, setDataSeatTicketVip] = useState([]);
  const [dataSeatTicketThuong, setDataSeatTicketThuong] = useState([]);
  const [selectTicket, setSelectTicket] = useState("");

  const [showDate, setShowDate] = useState("");
  const [dataShowDate, setDataShowDate] = useState([]);
  const [movieName, setMovieName] = useState("");

  const [dataRap, setDataRap] = useState([]);
  const [valueRap, setValueRap] = useState("");

  const onChangeHandleDate = (text) => {
    setShowDate(text.target.value);
  };

  const onChangeHandleMovieName = (text) => {
    setMovieName(text.target.value);
  };

  const onHandleSelect = (row) => {
    setCode(row);
    setOpenAllTicket(false);
    setOpenModelAdd(false);
    setOpenModalDetail(true);
  };

  const onClickHandleCloseP = () => {
    // window.location.href = "/cineza/admin/ticket";
    setOpenModalDetail(false);
    setOpenModelAdd(false);
    setOpenAllTicket(true);
  };

  const handleOnClickBackTicket = () => {
    setOpenModalDetail(false);
    setOpenModelAdd(false);
    setOpenAllTicket(true);
  };

  const onClickHandleBtnAdd = () => {
    setOpenAllTicket(false);
    setOpenModalDetail(false);
    setOpenModelAdd(true);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [openModalDetail]);

  useEffect(() => {
    getData();
  }, [openModelAdd]);

  //lọc theo tên phim
  useEffect(() => {
    const findTicket = async () => {
      const tickets = await axios.get(
        `http://localhost:9000/cineza/api/v1/ticket/get-all?movieName=${movieName}&showDate=`
      );
      if (tickets.status == 200) {
        const dataResult = tickets.data.map((item) => {
          const inputTime = new Date(item.showStart);
          const hour = inputTime.getHours();
          const minute = inputTime.getMinutes();
          const minuteResult = `${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""
            }${minute}`;
          return {
            ...item,
            showStart: minuteResult,
            // `${new Date(item.showStart).getHours()}:${new Date(
            //   item.showStart
            // ).getMinutes()}`,
            showDate: formatDateHandle(item.showDate),
            bookAt: formatDateHandle(item.bookAt),
          };
        });
        setContext(dataResult);
        console.error(" get ticket :");
      } else {
        console.error("error get ticket :");
      }
    };
    findTicket();
  }, [movieName]);

  const getData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:9000/cineza/api/v1/ticket/get-all"
      );
      if (result.status == 200) {
        const dataResult = result.data.map((item) => {
          const inputTime = new Date(item.showStart);
          const hour = inputTime.getHours();
          const minute = inputTime.getMinutes();
          const minuteResult = `${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""
            }${minute}`;
          return {
            ...item,
            showStart: minuteResult,
            showDate: formatDateHandle(item.showDate),
            bookAt: `${formatDateHandle(item.bookAt)} ${new Date(
              item.bookAt
            ).getHours()}:${new Date(item.bookAt).getMinutes()}`,
          };
        });
        setContext(dataResult);
        // console.log(result.data);
      }
    } catch (error) {
      console.log("error get api all ticket " + error);
    }
  };

  useEffect(() => {
    if (code != "") {
      const getTicket = async () => {
        const ticket = await axios.get(
          `http://localhost:9000/cineza/api/v1/ticket/get-by-code/${code}`
        );
        if (ticket.status === 200) {
          setSelectTicket(ticket.data);
          const allSeat = await axios.get(
            `http://localhost:9000/cineza/api/v1/seat/get-all-by-room/${ticket.data.roomCode}`
          );
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
  }, [code]);

  return (
    <div className="ticket-wrapper">
      <div className="ticket-container">
        {openAllTicket && (
          <div className="ticket-content">
            <div
              style={{
                width: "100%",
                height: "15%",
                display: "flex",
                flexDirection: "row",
                // paddingRight: "10px",
                alignItems: "center",
                boxShadow: "2px 5px 5px #575353",
              }}
            >
              <h3 style={{ paddingLeft: 10 }}>Danh sách vé</h3>
              {/* <img
                src={iconAdd}
                alt="btn-add"
                className="ticket-btn-add"
                onClick={onClickHandleBtnAdd}
              /> */}

              <div className="ticket-find-container">
                <input
                  id="find"
                  className="ticket-input-find"
                  placeholder="tên phim"
                  onChange={onChangeHandleMovieName}
                />
                <img
                  className="ticket-button-img"
                  src={iconFind}
                  alt="tìm kiếm"
                  htmlFor="find"
                />
                {/* <FormControl
                  sx={{ width: "30%", marginLeft: "5%" }}
                  size="small"
                >
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                  // value={codeMovie}
                  // label="Tên phim"
                  // onChange={handleChangeComboboxCodeMovie}
                  // onFocus={onHandleFocusCodeMovie}
                  // readOnly={!edit}
                  // style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataRap?.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.rapName}>
                          {st.rapName}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl> */}
              </div>
            </div>
            {/* <div
              style={{
                marginLeft: "-20px",
                paddingRight: "8%",
                width: "100%",
                height: 5,
                borderBottom: "10px solid rgb(228, 228, 228)",
              }}
            ></div> */}
            <div
              style={{
                width: "100%",
                height: "85%",
                boxShadow: "2px 5px 5px #575353",
                overflowY: "auto",
              }}
            >
              <div className="table-all-ticket">
                <Table
                  column={columns}
                  data={context}
                  onRowClick={onHandleSelect}
                />
              </div>
            </div>
          </div>
        )}

        {openModalDetail && (
          <div className="show-detail-background">
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
                  <p>Khách hàng: {selectTicket.fullName}</p>
                  <p>Phim: {selectTicket.movieName}</p>
                  <p>
                    Ngày chiếu:{" "}
                    {formatDateHandle(new Date(selectTicket.showDate))}
                  </p>
                  <p>
                    Giờ chiếu: {String(new Date(selectTicket.showStart).getHours()).padStart(2, '0')}:
                    {String(new Date(selectTicket.showStart).getMinutes()).padStart(2, '0')}{" "}
                  </p>
                  <p>Rạp: {selectTicket.rapName}</p>
                  <p>Phòng: {selectTicket.roomName}</p>
                  <p>
                    ghế: {selectTicket.codeSeat} - {selectTicket.position}
                  </p>
                  <p>Trạng thái: {selectTicket.status}</p>
                </div>
                {/* <div className="show-room-btn">
                  <button className="btn-cancel">Hủy vé</button>
                </div> */}
              </div>
            </div>
          </div>
        )}
        {openModelAdd && (
          <TicketDetail
            addBtn={true}
            codeTicket={code}
            onClickHandleClose={onClickHandleCloseP}
          />
        )}
      </div>
    </div>
  );
};

export default Ticket;

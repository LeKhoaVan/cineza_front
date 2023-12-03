import React from "react";
import "./seat.css";
import Table from "../../components/Table";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import iconBack from "../../assets/imageButtons/iconBack.png";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import SeatDetail from "../SeatDetail";

// import { formatDateHandle } from "../../components/util";

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

const Seat = () => {
  const [seat, setSeat] = useState([]);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [codeSeat, setCodeSeat] = useState("");

  const location = useLocation();
  const codeRoomURI = new URLSearchParams(location.search).get("code");

  const handleRowClick = (row) => {
    console.log(row);
    setCodeSeat(row);
    setOpenModalDetail(!openModalDetail);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "/cineza/admin/room/code?code=" + seat[0].codeRoom;
    setOpenModalDetail(false);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
    console.log(openModelAdd);
  };

  useEffect(() => {
    const getSeats = async () => {
      try {
        const result = await axios.get(
          `http://localhost:9000/cineza/api/v1/seat/get-all-by-room/${codeRoomURI}`
        );
        if (result.status === 200) {
          setSeat(result.data);
          // console.log(result.data);
        }
      } catch (error) {
        console.error("error get all room by rap: " + error);
      }
    };
    getSeats();
  }, []);

  return (
    <div className="seats-container">
      <div className="seat-content">
        <Link to={"/rap"}>
          <img src={iconBack} className="img-btn-sidebar" />
        </Link>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingRight: "10px",
            alignItems: "center",
          }}
        >
          <h3>Danh sách ghế</h3>
          <img
            src={iconAdd}
            alt="btn-add"
            className="seat-btn-add"
            onClick={onClickHandleBtnAdd}
          />
        </div>

        <div className="table-all-seat">
          <Table column={titleColumn} data={seat} onRowClick={handleRowClick} />
        </div>
      </div>
      {openModalDetail && (
        <SeatDetail
          codeSeat={codeSeat}
          onClickHandleClose={onClickHandleCloseP}
        />
      )}
      {openModelAdd && (
        <SeatDetail addBtn={true} onClickHandleClose={onClickHandleCloseP} />
      )}
    </div>
  );
};

export default Seat;

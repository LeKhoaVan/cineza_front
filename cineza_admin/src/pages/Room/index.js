import React from "react";
import "./room.css";
import Table from "../../components/Table";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import iconBack from "../../assets/imageButtons/iconBack.png";

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import RoomDetail from "../RoomDetail";

// import { formatDateHandle } from "../../components/util";

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

const Room = () => {
  const [room, setRoom] = useState([]);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [codeRoom, setCodeRoom] = useState("");

  const location = useLocation();
  const codeRapURI = new URLSearchParams(location.search).get("code");

  const handleRowClick = (row) => {
    console.log(row);
    setCodeRoom(row);
    setOpenModalDetail(!openModalDetail);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "/cineza/admin/rap/code?code=" + room[0].codeRap;
    setOpenModalDetail(false);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
    console.log(openModelAdd);
  };

  useEffect(() => {
    const getRooms = async () => {
      try {
        const result = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/room/get-all-by-code/${codeRapURI}`
        );
        if (result.status === 200) {
          setRoom(result.data);
          console.log(result.data);
        }
      } catch (error) {
        console.error("error get all room by rap: " + error);
      }
    };
    getRooms();
  }, []);

  return (
    <div className="room-container">
      <div className="room-content">
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
          <h3>Danh sách phòng</h3>
          <img
            src={iconAdd}
            alt="btn-add"
            className="room-btn-add"
            onClick={onClickHandleBtnAdd}
          />
        </div>

        <div className="table-all-room">
          <Table column={titleColumn} data={room} onRowClick={handleRowClick} />
        </div>
      </div>
      {openModalDetail && (
        <RoomDetail
          onClickHandleClose={onClickHandleCloseP}
          codeRoom={codeRoom}
        />
      )}
      {openModelAdd && (
        <RoomDetail addBtn={true} onClickHandleClose={onClickHandleCloseP} />
      )}
    </div>
  );
};

export default Room;

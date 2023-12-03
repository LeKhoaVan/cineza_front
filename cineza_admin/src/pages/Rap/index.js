import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import RapDetail from "../RapDetail";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import "./rap.css";
import axios from "axios";
import { Button } from "@mui/material";

const columns = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Tên",
    data: "name",
  },
  {
    title: "Thời gian mở ",
    data: "openTime",
  },
  {
    title: "Thời gian đóng",
    data: "closeTime",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
];
// const data = [
//   {
//     code: "rap1",
//     cinemaName: "Vincom Gò Vấp",
//     openTime: "8:00",
//     closeTime: "23:00",
//     cinemaStatus: "ACTIVE",
//   },
// ];
const Rap = () => {
  const [context, setContext] = useState([]);

  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [code, setCode] = useState("");

  const onHandleSelect = (row) => {
    // console.log(row);
    setCode(row);
    setOpenModelAdd(false);
    setOpenModalDetail(true);
  };

  const onClickHandleCloseP = async () => {
    setOpenModelAdd(false);
    setOpenModalDetail(false);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModalDetail(false);
    setOpenModelAdd(true);
  };

  // get all rap
  const getData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:9000/cineza/api/v1/rap/get-all"
      );
      if (result.status == 200) {
        const resutlData = result.data.map((r) => {
          let time = r.openTime.split(":");
          r.openTime = `${time[0]}:${time[1]}`;

          time = r.closeTime.split(":");
          r.closeTime = `${time[0]}:${time[1]}`;
          return r;
        });
        setContext(resutlData);

        // console.log(result.data);
      }
    } catch (error) {
      console.log("error get api all rap " + error);
    }
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

  return (
    <div className="rap-container">
      <div className="rap-container-content">
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
          <h3 style={{ paddingLeft: 10 }}>Rap chiếu phim</h3>
          <img
            src={iconAdd}
            alt="btn-add"
            className="rap-btn-add"
            onClick={onClickHandleBtnAdd}
          />
        </div>
        {/* <div
          style={{
            marginLeft: "-20px",
            paddingRight: "8%",
            width: "98%",
            height: 5,
            borderBottom: "10px solid rgb(228, 228, 228)",
          }}
        ></div> */}

        <div
          style={{
            width: "100%",
            height: "85%",
            boxShadow: "2px 5px 5px #575353",
          }}
        >
          <div className="table-all-rap">
            <Table
              column={columns}
              data={context}
              onRowClick={onHandleSelect}
            />
            {openModalDetail && (
              <RapDetail
                codeRapBy={code}
                onClickHandleClose={onClickHandleCloseP}
              />
            )}
            {openModelAdd && (
              <RapDetail
                addBtn={true}
                onClickHandleClose={onClickHandleCloseP}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rap;

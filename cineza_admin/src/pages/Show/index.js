import React, { useEffect, useState } from "react";
import Table from "../../components/Table";
import ShowDetail from "../ShowDetail";
import { formatDateHandle, formatTimeHandle } from "../../components/util";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import iconFind from "../../assets/imageButtons/iconFind.png";
import "./show.css";
import axios from "axios";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const columns = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Giờ chiếu",
    data: "showStart",
  },
  {
    title: "Giờ kết thúc",
    data: "showEnd",
  },
  {
    title: "Ngày chiếu",
    data: "showDate",
  },
  {
    title: "Tên phim",
    data: "nameMovie",
  },
  {
    title: "Tên rạp",
    data: "nameRap",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
];

const ShowTime = () => {
  const [context, setContext] = useState([]);

  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [code, setCode] = useState("");

  const [movieName, setMovieName] = useState("");
  const onChangeHandleMovieName = (text) => {
    setMovieName(text.target.value);
  };

  const onHandleSelect = (row) => {
    // console.log(row);
    setCode(row);
    setOpenModalDetail(!openModalDetail);
  };

  const onClickHandleCloseP = async () => {
    // window.location.href = "/cineza/admin/show";
    setOpenModalDetail(false);
    setOpenModelAdd(false);
  };

  const onClickHandleBtnAdd = () => {
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
    const findShow = async () => {
      const result = await axios.get(
        `http://13.212.32.129:9000/cineza/api/v1/show/get-all?movieName=${movieName}`
      );
      if (result.status == 200) {
        const dataResult = result.data.map((item) => {
          const inputDateTime = new Date(item.showDate);
          const day = inputDateTime.getDate();
          const month = inputDateTime.getMonth() + 1;
          const year = inputDateTime.getFullYear();
          const formattedDateTime = `${day < 10 ? "0" : ""}${day}-${month < 10 ? "0" : ""
            }${month}-${year}`;

          const inputTime = new Date(item.showStart);
          const hour = inputTime.getHours();
          const minute = inputTime.getMinutes();
          const minuteResult = `${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""}${minute}`;

          const inputTimeEnd = new Date(item.showEnd);
          const hourEnd = inputTimeEnd.getHours();
          const minuteEnd = inputTimeEnd.getMinutes();
          const minuteResultEnd = `${hourEnd < 10 ? "0" : ""}${hourEnd}:${minuteEnd < 10 ? "0" : ""}${minuteEnd}`;

          return {
            ...item,
            showDate: formattedDateTime,
            showStart: minuteResult,
            showEnd: minuteResultEnd,
          };
        });
        setContext(dataResult);
      } else {
        console.error("error get ticket :");
      }
    };
    findShow();
  }, [movieName]);

  const getData = async () => {
    try {
      const result = await axios.get(
        "http://13.212.32.129:9000/cineza/api/v1/show/get-all"
      );
      if (result.status == 200) {
        const dataResult = result.data.map((item) => {
          const inputDateTime = new Date(item.showDate);
          const day = inputDateTime.getDate();
          const month = inputDateTime.getMonth() + 1;
          const year = inputDateTime.getFullYear();
          const formattedDateTime = `${day < 10 ? "0" : ""}${day}-${month < 10 ? "0" : ""
            }${month}-${year}`;

          const inputTime = new Date(item.showStart);
          const hour = inputTime.getHours();
          const minute = inputTime.getMinutes();
          const minuteResult = `${hour < 10 ? "0" : ""}${hour}:${minute < 10 ? "0" : ""
            }${minute}`;

          const inputTimeEnd = new Date(item.showEnd);
          const hourEnd = inputTimeEnd.getHours();
          const minuteEnd = inputTimeEnd.getMinutes();
          const minuteResultEnd = `${hourEnd < 10 ? "0" : ""}${hourEnd}:${minuteEnd < 10 ? "0" : ""}${minuteEnd}`;

          return {
            ...item,
            showDate: formattedDateTime,
            showStart: minuteResult,
            showEnd: minuteResultEnd,
          };
        });
        setContext(dataResult);
        // console.log(result.data);
      }
    } catch (error) {
      console.log("error get api all show " + error);
    }
  };

  return (
    <div className="show-wrapper">
      <div className="show-container">
        <div
          style={{
            width: "100%",
            height: "15%",
            boxShadow: "2px 5px 5px #575353",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <h3 style={{ paddingLeft: 10 }}>Suất chiếu phim</h3>
          <img
            src={iconAdd}
            alt="btn-add"
            className="show-btn-add"
            onClick={onClickHandleBtnAdd}
          />
          <div className="showing-find-container">
            <input
              id="find"
              className="showing-input-find"
              placeholder="Tên phim"
              onChange={onChangeHandleMovieName}
            />
            <img
              className="showing-button-img"
              src={iconFind}
              alt="tìm kiếm"
              htmlFor="find"
            />
            {/* <FormControl
              sx={{ width: "45%", marginLeft: "30px", marginTop: "2%" }}
              size="small"
            >
              <InputLabel id="demo-select-small-label">Tên Rạp</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                // value={codeMovie}
                label="Tên phim"
              // onChange={handleChangeComboboxCodeMovie}
              // onFocus={onHandleFocusCodeMovie}
              // readOnly={!edit}
              // style={edit ? {} : { background: "rgb(196, 196, 196)" }}
              >
                {[].map((st, index) => {
                  return (
                    <MenuItem key={index} value={st.code}>
                      {st.movieName}
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
          <div className="table-all-show">
            <Table
              column={columns}
              data={context}
              onRowClick={onHandleSelect}
            />
          </div>
        </div>
      </div>
      {openModalDetail && (
        <ShowDetail codeShow={code} onClickHandleClose={onClickHandleCloseP} />
      )}
      {openModelAdd && (
        <ShowDetail addBtn={true} onClickHandleClose={onClickHandleCloseP} />
      )}
    </div>
  );
};

export default ShowTime;

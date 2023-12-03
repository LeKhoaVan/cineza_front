import { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import { formatDateHandle } from "../../components/util";
import PriceHeaderDetail from "../PriceHeaderDetail";

import "./priceHeader.css";
const columns = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Ngày bắt đầu",
    data: "startDay",
  },
  {
    title: "Ngày kết thúc",
    data: "endDay",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
  {
    title: "Mô tả",
    data: "description",
  },
];

const PriceHeader = () => {
  const [context, setContext] = useState([]);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [openModelDetail, setOpenModelDetail] = useState(false);
  const [codeHeader, setCodeHeader] = useState("");
  const onHandleSelect = (row) => {
    setCodeHeader(row);
    setOpenModelAdd(false);
    setOpenModelDetail(true);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelDetail(false);
    setOpenModelAdd(true);
  };

  const onClickHandleCloseP = () => {
    setOpenModelAdd(false);
    setOpenModelDetail(false);
  };

  const getData = async () => {
    try {
      const result = await axios.get(
        "http://localhost:9000/cineza/api/v1/price-header/get-all"
      );
      if (result.status == 200) {
        const dataResult = result.data.map((item) => {
          const inputStartDay = new Date(item.startDay);
          const dayStart = inputStartDay.getDate();
          const monthStart = inputStartDay.getMonth() + 1;
          const yearStart = inputStartDay.getFullYear();
          const formattedStartDay = `${dayStart < 10 ? "0" : ""}${dayStart}-${monthStart < 10 ? "0" : ""
            }${monthStart}-${yearStart}`;
          const inputEndDay = new Date(item.endDay);
          const dayEnd = inputEndDay.getDate();
          const monthEnd = inputEndDay.getMonth() + 1;
          const yearEnd = inputEndDay.getFullYear();
          const formattedEndDay = `${dayEnd < 10 ? "0" : ""}${dayEnd}-${monthEnd < 10 ? "0" : ""
            }${monthEnd}-${yearEnd}`;
          return {
            ...item,
            startDay: formattedStartDay,
            endDay: formattedEndDay,
          };
        });
        setContext(dataResult);
      }
    } catch (error) {
      console.log("error get api all price header " + error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [openModelAdd]);

  useEffect(() => {
    getData();
  }, [openModelDetail]);

  return (
    <div className="price-header-container">
      <div className="price-header-content">
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
          <h3 style={{ paddingLeft: 10 }}>Bảng giá Header</h3>
          <img
            src={iconAdd}
            alt="btn-add"
            className="price-btn-add"
            onClick={onClickHandleBtnAdd}
          />
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
          }}
        >
          <div className="table-all-price-header">
            <Table
              column={columns}
              data={context}
              onRowClick={onHandleSelect}
            />
            {openModelDetail && (
              <PriceHeaderDetail
                codePriceHeader={codeHeader}
                onClickHandleClose={onClickHandleCloseP}
              />
            )}
            {openModelAdd && (
              <PriceHeaderDetail
                addBtn={true}
                codePriceHeader={""}
                onClickHandleClose={onClickHandleCloseP}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceHeader;

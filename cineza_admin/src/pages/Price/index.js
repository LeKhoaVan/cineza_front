import { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import iconBack from "../../assets/imageButtons/iconBack.png";
import { formatDateHandle } from "../../components/util";
import PriceDetail from "../PriceDetail";

import { Link, useLocation } from "react-router-dom";

import "./price.css";
const columns = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Giá",
    data: "value",
  },
  {
    title: "Bảng giá header",
    data: "nameHeader",
  },
  {
    title: "Loại ghế",
    data: "typeSeat",
  },
];

const Price = () => {
  const [context, setContext] = useState([]);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [openModelDetail, setOpenModelDetail] = useState(false);
  const [code, setCode] = useState("");
  const location = useLocation();
  const codePriceHeaderURI = new URLSearchParams(location.search).get("code");
  const onHandleSelect = (row) => {
    setCode(row);
    setOpenModelAdd(false)
    setOpenModelDetail(true);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelDetail(false)
    setOpenModelAdd(true);
  };

  const onClickHandleCloseP = async () => {
    // window.location.href =
    //   "/cineza/admin/price/code?code=" + context[0].codeHeader;
    setOpenModelDetail(false);
    setOpenModelAdd(false)
  };


  const getData = async () => {
    try {
      const result = await axios.get(
        `http://13.212.32.129:9000/cineza/api/v1/price/get-all-by-header/${codePriceHeaderURI}`
      );
      if (result.status == 200) {
        setContext(result.data);
      }
    } catch (error) {
      console.log("error get api all price " + error);
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
      <div className="price-container">
        <Link to={"/price"}>
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
          <h3>Bảng giá</h3>
          <img
            src={iconAdd}
            alt="btn-add"
            className="price-btn-add"
            onClick={onClickHandleBtnAdd}
          />
        </div>

        <div className="table-all-price">
          <Table column={columns} data={context} onRowClick={onHandleSelect} />
          {openModelDetail && (
            <PriceDetail
              codePrice={code}
              onClickHandleClose={onClickHandleCloseP}
            />
          )}
          {openModelAdd && (
            <PriceDetail
              addBtn={true}
              onClickHandleClose={onClickHandleCloseP}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Price;

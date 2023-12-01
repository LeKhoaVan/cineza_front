import "./promotionLine.css";
import Table from "../../components/Table";
import PromotionDetail from "../PromotionDetail";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import iconBack from "../../assets/imageButtons/iconBack.png";

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { formatDateHandle } from "../../components/util";

const titleColumn = [
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
    title: "Thuộc chương trình",
    data: "promotionHeaderCode",
  },
  {
    title: "Tổng tiền",
    data: "maxMoney"
  },
  {
    title: "Số lần",
    data: "maxTurn"
  },
  {
    title: "Trạng thái",
    data: "promotionLineStatus",
  },
  {
    title: "Loại",
    data: "typePromotion",
  },
];

const PromotionLine = () => {
  const [promotion, setPromotion] = useState([]);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalDetailAdd, setOpenModalDetailAdd] = useState(false);
  const [codePromotion, setCodePromotion] = useState("");
  const [uriCode, setUriCode] = useState("");

  const location = useLocation();
  const codePromotionURI = new URLSearchParams(location.search).get("code");

  const onClickHandleBack = () => {
    window.location.href = "http://13.212.32.129:3000/cineza/admin/promotions";
  }

  const onClickHandleBtnAdd = () => {
    setOpenModalDetailAdd(true)
  }
  const handleRowClick = (row) => {
    console.log(row);
    setCodePromotion(row);
    setOpenModalDetail(!openModalDetail);
  };

  const onClickHandleCloseP = async () => {
    window.location.href =
      "/cineza/admin/promotion/code?code=" + uriCode;
    setOpenModalDetail(false);
  };

  useEffect(() => {
    const getAllPromotionLine = async () => {
      try {
        setUriCode(codePromotionURI)
        const response = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/promotion-line/get-all-by-header/${codePromotionURI}`
        );
        if (response.status === 200) {
          const dataResult = response.data.map((item) => {
            return {
              ...item,
              startDay: formatDateHandle(item.startDay),
              endDay: formatDateHandle(item.endDay),
            };
          });
          setPromotion(dataResult);
        }
      } catch (error) {
        console.error("error get all promotion line by header: " + error);
      }
    };
    getAllPromotionLine();
  }, []);

  return (
    <div className="promotion-line-container">
      <div className="promotion-line-content">
        <img src={iconBack} className="vtdllevl-btn-back" onClick={onClickHandleBack} />
        <div style={{ display: "flex", flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <h3>Chương trình chi tiết</h3>
          <img
            src={iconAdd}
            alt="btn-add"
            className="user-btn-add"
            onClick={onClickHandleBtnAdd}
          />
        </div>
        <div className="table-all-promotion-line">
          <Table
            column={titleColumn}
            data={promotion}
            onRowClick={handleRowClick}
          />
        </div>
      </div>
      {openModalDetail && (
        <PromotionDetail
          onClickHandleClose={onClickHandleCloseP}
          codePromotion={codePromotion}
        />
      )}
      {openModalDetailAdd && (
        <PromotionDetail
          onClickHandleClose={onClickHandleCloseP}
          codePromotion={codePromotion}
          addBtn={true}
        />
      )}
    </div>
  );
};

export default PromotionLine;

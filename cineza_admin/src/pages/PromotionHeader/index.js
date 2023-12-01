import { useEffect, useState } from "react";
import Table from "../../components/Table";
import axios from "axios";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import { formatDateHandle } from "../../components/util";
import PromotionHeaderEdit from "../PromotionHeaderEdit";

import "./promotionHeader.css";
const columns = [
  {
    title: "Code",
    data: "code",
    // sortable: true
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
    data: "promotionStatus",
  },
  {
    title: "Mô tả",
    data: "description",
  },
];
const PromotionHeader = () => {
  const [context, setContext] = useState([]);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [openModelDetail, setOpenModelDetail] = useState(false);
  const [codeHeader, setCodeHeader] = useState("");
  const onHandleSelect = (row) => {
    setCodeHeader(row);
    setOpenModelDetail(true);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "/cineza/admin/promotions";
    setOpenModelDetail(false);
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await axios.get(
          "http://13.212.32.129:9000/cineza/api/v1/promotion-header/get-all"
        );
        if (result.status == 200) {
          const dataResult = result.data.map((item) => {
            return {
              ...item,
              startDay: formatDateHandle(item.startDay),
              endDay: formatDateHandle(item.endDay),
            };
          });
          setContext(dataResult);
        }
      } catch (error) {
        console.log("error get api all user " + error);
      }
    };

    getData();
  }, []);

  return (
    <div className="promotion-header-container">
      <div className="promotion-container">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            paddingRight: "10px",
            alignItems: "center",
          }}
        >
          <h3>Chương trình khuyến mãi</h3>
          <img
            src={iconAdd}
            alt="btn-add"
            className="user-btn-add"
            onClick={onClickHandleBtnAdd}
          />
        </div>

        <div className="table-all-promotion">
          {/* toPromotion={"/promotion/code?code="}  */}
          <Table column={columns} data={context} onRowClick={onHandleSelect} />
          {openModelDetail && (
            <PromotionHeaderEdit
              codePromotion={codeHeader}
              onClickHandleClose={onClickHandleCloseP}
            />
          )}
          {openModelAdd && (
            <PromotionHeaderEdit
              addBtn={true}
              codePromotion={codeHeader}
              onClickHandleClose={onClickHandleCloseP}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PromotionHeader;

import "./userLevel.css";
import Table from "../../components/Table";
import VTDLDetail from "../VTDLDetail";

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

const titleColumn = [
  {
    title: "Code",
    data: "code",
  },
  {
    title: "Tên",
    data: "fullName",
  },
  {
    title: "Cấp người dùng",
    data: "level",
  },
];

const dataColumn = [
  {
    code: "ADMIN",
    fullName: "Admin",
    level: "ADMIN",
  },
  {
    code: "USER",
    fullName: "Khách hàng",
    level: "USER",
  },
];

const UserLevel = () => {
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [codeAddress, setCodeAddress] = useState("");

  const handleRowClick = (row) => {
    console.log(row);
    setCodeAddress(row);
    setOpenModalDetail(!openModalDetail);
  };

  // const onClickHandleCloseP = async () => {
  //     window.location.href = "/cineza/admin/vtdl/level?level=" + address[0].level
  //     setOpenModalDetail(false);
  // }

  // useEffect(() => {
  //     const getAddressByType = async () => {
  //         try {
  //             const response = await axios.get(`http://localhost:9000/cineza/api/v1/value/get-level?level=` + levelAddress);
  //             setAddress(response.data);
  //         } catch (error) {
  //             console.error("error get address by type in VTDLLevel: " + error);
  //         }
  //     }
  //     getAddressByType();
  // }, []);

  return (
    <div className="user-level-wrapper">
      <div className="user-level-container">
        <div className="user-level-content">
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
            <h3 style={{ paddingLeft: 10 }}>Cấp người dùng</h3>
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
            <div className="table-all-user">
              <Table
                column={titleColumn}
                data={dataColumn}
                onRowClick={handleRowClick}
                toLinkUser={"/user-level?level="}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLevel;

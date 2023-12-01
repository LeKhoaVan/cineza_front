import "./vtdlLevel.css";
import Table from "../../components/Table";
import VTDLDetail from "../VTDLDetail";
import iconBack from "../../assets/imageButtons/iconBack.png";

import iconAdd from "../../assets/imageButtons/iconAdd.png";

import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

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
    title: "Cấp hành chính",
    data: "level",
  },
  {
    title: "Trực thuộc",
    data: "fullNameParent",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
  {
    title: "Loại",
    data: "value",
  },
];

const VTDLLevel = () => {
  const [address, setAddress] = useState([]);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [btnAdd, setBtnAdd] = useState(false);
  const [codeAddress, setCodeAddress] = useState("");

  const location = useLocation();
  const levelAddress = new URLSearchParams(location.search).get("level");

  const navigate = useNavigate();
  const onClickHandleBack = () => {
    navigate('/vtdl');
  };

  const handleRowClick = (row) => {
    console.log(row);
    setCodeAddress(row);
    setBtnAdd(false)
    setOpenModalDetail(true);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModalDetail(false)
    setBtnAdd(true);
  };

  const onClickHandleCloseP = async () => {
    // window.location.href = "/cineza/admin/vtdl/level?level=" + address[0].level;
    setOpenModalDetail(false);
    setBtnAdd(false);
  };

  const getAddressByType = async () => {
    if (levelAddress != undefined) {
      try {
        const response = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/address/get-by-level?levelAddress=${levelAddress}`
        );
        setAddress(response.data);
      } catch (error) {
        console.error("error get address by type in VTDLLevel: " + error);
      }
    } else {
      try {
        const response = await axios.get(
          `http://13.212.32.129:9000/cineza/api/v1/address/get-by-level?levelAddress=${address[0].level}`
        );
        setAddress(response.data);
      } catch (error) {
        console.error("error get address by type in VTDLLevel: " + error);
      }
    }
  };

  useEffect(() => {
    getAddressByType();
  }, []);

  useEffect(() => {
    getAddressByType();
  }, [openModalDetail]);

  useEffect(() => {
    getAddressByType();
  }, [btnAdd]);

  return (
    <div className="address-level-wrapper">
      <div className="address-level-container">
        <div className="address-level-content">
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
            <img
              src={iconBack}
              className="vtdllevl-btn-back"
              onClick={onClickHandleBack}
            />
            <h3>Vị trí địa lý</h3>
            <img
              src={iconAdd}
              alt="btn-add"
              className="vtdl-btn-add"
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
            <div className="table-all-address">
              <Table
                column={titleColumn}
                data={address}
                onRowClick={handleRowClick}
              />
            </div>
          </div>
        </div>
        {openModalDetail && (
          <VTDLDetail
            codeAddressBy={codeAddress}
            level={levelAddress}
            onClickHandleClose={onClickHandleCloseP}
            to={address[0].level}
          />
        )}
        {btnAdd && (
          <VTDLDetail
            addBtn={true}
            levelAr={levelAddress}
            onClickHandleClose={onClickHandleCloseP}
            to={address[0].level}
          />
        )}
      </div>
    </div>
  );
};

export default VTDLLevel;

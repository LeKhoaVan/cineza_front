import { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "react-data-table-component";
import Table from "../../components/Table";
import UserDetail from "../UserDetail";
import { formatDateHandle } from "../../components/util/index";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import iconBack from "../../assets/imageButtons/iconBack.png";
import { useLocation, useNavigate } from "react-router-dom";
import "./user.css";

const columns = [
  {
    title: "Code",
    data: "code",
    // sortable: true
  },
  {
    title: "Tên",
    data: "fullName",
  },
  {
    title: "Địa chỉ mail",
    data: "numberPhone",
  },
  {
    title: "Loại tài khoản",
    data: "type",
  },
  {
    title: "Ngày sinh",
    data: "dateOfBirth",
  },
  {
    title: "Trạng thái",
    data: "status",
  },
];

const User = () => {
  const [context, setContext] = useState([]);

  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [codeUser, setCodeUser] = useState("");

  const location = useLocation();
  const levelUser = new URLSearchParams(location.search).get("level");

  const onHandleSelect = (row) => {
    setCodeUser(row);
    setOpenModelAdd(false);
    setOpenModalDetail(true);
  };

  const onClickHandleCloseP = () => {
    // window.location.href = "/cineza/admin/user-level?level=" + context[0].level;
    setOpenModelAdd(false)
    setOpenModalDetail(false);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModalDetail(false);
    setOpenModelAdd(true);
  };

  const navigate = useNavigate();
  const onClickHandleBack = () => {
    navigate("/users")
  };

  const getData = async () => {

    try {
      if (levelUser != null) {
        const result = await axios.get(
          `http://localhost:9000/cineza/api/v1/user/get-by-type/${levelUser}`
        );
        console.log(result)
        if (result.status == 200) {
          const dataSetup = result?.data.map((item) => {
            return {
              ...item,
              dateOfBirth: formatDateHandle(item.dateOfBirth),
            };
          });
          setContext(dataSetup);
        }
      } else {
        const result = await axios.get(
          `http://localhost:9000/cineza/api/v1/user/get-by-type/${context[0].type}`
        );
        console.log(result)
        if (result.status == 200) {
          const dataSetup = result?.data.map((item) => {
            return {
              ...item,
              dateOfBirth: formatDateHandle(item.dateOfBirth),
            };
          });
          setContext(dataSetup);
        }
      }
    } catch (error) {
      console.log("error get api all user " + error);
    }
  };


  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    getData();
  }, [openModelAdd]);

  useEffect(() => {
    console.log("tesst", levelUser)
    getData();
  }, [openModalDetail]);

  return (
    <div className="user-wrapper">
      <div className="user-container">
        <div className="user-content">
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
            <h3>Người dùng</h3>
            <img
              src={iconAdd}
              alt="btn-add"
              className="user-btn-add"
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
            <div className="table-all-user">
              <Table
                column={columns}
                data={context}
                onRowClick={onHandleSelect}
              />
              {openModalDetail && (
                <UserDetail
                  codeUserBy={codeUser}
                  onClickHandleClose={onClickHandleCloseP}
                />
              )}
              {openModelAdd && (
                <UserDetail
                  levelU={levelUser}
                  addBtn={true}
                  codeUserBy={codeUser}
                  onClickHandleClose={onClickHandleCloseP}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

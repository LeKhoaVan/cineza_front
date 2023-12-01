import React, { useEffect, useState } from "react";
import OtherProductDetail from "../OtherProductDetail";
import iconAdd from "../../assets/imageButtons/iconAdd.png";
import "./otherProduct.css";
import axios from "axios";

const data = [
  {
    id: "1",
    title: "Combo bắp + 1 nước ngọt",
    image: "https://img.ws.mms.shopee.vn/sg-11134201-22100-pns7444vl4ivc4",
    description: "Crispy Veg Double Patty + Crispy Veg Double Patty",
    price: "180.000đ",
    status: "ACTIVE",
  },
  {
    id: "2",
    title: "Combo bắp + 2 coca",
    image:
      "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/07/gia-bap-nuoc-cgv-1.jpg",
    description: "Lit Whopper Jr Veg + Lit Whopper Jr Veg",
    price: "250.000đ",
    status: "ACTIVE",
  },
  {
    id: "3",
    title: "Combo bắp + 2 nước ngọt",
    image:
      "https://salt.tikicdn.com/cache/280x280/ts/product/65/56/40/917357f489e95a095c5657532b484aa2.jpg",
    description: "Crsipy Chicken Double Patty + Crsipy Chicken Double Patty",
    price: "250.000đ",
    status: "ACTIVE",
  },
  {
    id: "4",
    title: "Combo bắp + 2 pepsi",
    image:
      "https://down-vn.img.susercontent.com/file/5178202fa8a147917d01aedc379736d0",
    description: "Chicken Whopper + Chicken Whopper",
    price: "250.000đ",
    status: "ACTIVE",
  },
  {
    id: "5",
    title: "Combo bắp + snacks",
    image: "https://www.lottecinemavn.com/LCMS/Image/Thum/@thum_goods.png",
    description: "2 Crispy Veg Double Patty + 1 King Fries + 1 Veggie Strips",
    price: "150.000đ",
    status: "ACTIVE",
  },
  {
    id: "6",
    title: "Combo bắp",
    image:
      "https://stc.shopiness.vn/deal/2018/09/19/d/8/f/d/1537333532684_540.png",
    description: "2 Lite Whopper Jr Veg + 1 King Fries",
    price: "90.000đ",
    status: "ACTIVE",
  },
];
const OtherProduct = () => {
  // const [context, setContext] = useState([]);

  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModelAdd, setOpenModelAdd] = useState(false);
  const [code, setCode] = useState("");

  const handleOnClick = (otherProduct) => {
    console.log(otherProduct);
    setCode(otherProduct);
    setOpenModalDetail(true);
  };

  const onClickHandleCloseP = async () => {
    window.location.href = "/cineza/admin/other-product";
    setOpenModalDetail(false);
  };

  const onClickHandleBtnAdd = () => {
    setOpenModelAdd(true);
    console.log(openModelAdd);
  };

  // useEffect(() => {
  //   const getData = async () => {
  //     try {
  //       const result = await axios.get(
  //         "http://13.212.32.129:9000/cineza/api/v1/rap/get-all"
  //       );
  //       if (result.status == 200) {
  //         setContext(result.data);
  //         // console.log(result.data);
  //       }
  //     } catch (error) {
  //       console.log("error get api all rap " + error);
  //     }
  //   };

  //   getData();
  // }, []);
  return (
    <div className="other-product-container">
      <div className="other-product-content">
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
          <h3 style={{ paddingLeft: 10 }}>Đồ đi kèm</h3>
          <img
            src={iconAdd}
            alt="btn-add"
            className="other-product-btn-add"
            onClick={onClickHandleBtnAdd}
          />
        </div>
        <div
          style={{
            // marginLeft: "-20px"
            paddingRight: "8%",
            width: "95%",
            height: 5,
            borderBottom: "10px solid rgb(228, 228, 228)",
          }}
        ></div>
        <div className="other-product-list-container">
          <div className="other-product-list">
            {data.map((otherProduct, index) => (
              <div
                className="other-product-card"
                key={otherProduct.id}
                onClick={() => handleOnClick(otherProduct)}
              >
                <img
                  src={otherProduct.image}
                  alt={otherProduct.title}
                  style={{ width: 120 }}
                />
                <div className="other-product-details">
                  <h2>{otherProduct.title}</h2>
                  <p>Giá: {otherProduct.price}</p>
                  <p>Mô tả: {otherProduct.description}</p>
                  <p>Trạng thái: {otherProduct.status}</p>
                </div>
              </div>
            ))}
          </div>
          {openModalDetail && (
            <OtherProductDetail
              codeOtherProduct={code}
              onClickHandleClose={onClickHandleCloseP}
            />
          )}
          {openModelAdd && (
            <OtherProductDetail
              addBtn={true}
              onClickHandleClose={onClickHandleCloseP}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default OtherProduct;

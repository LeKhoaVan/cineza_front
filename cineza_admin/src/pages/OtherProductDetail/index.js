import iconPen from "../../assets/imageButtons/iconPen.png";
import iconCreateNew from "../../assets/imageButtons/iconCreateNew.png";
import iconDelete from "../../assets/imageButtons/iconDelete.png";
import iconClose from "../../assets/imageButtons/iconClose.png";
import iconSave from "../../assets/imageButtons/iconSave.png";
import Alert from "../../components/Alert";
import "./otherProductDetail.css";

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { formatDateHandle } from "../../components/util/index";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from "react-datepicker";
import { parse, format } from "date-fns";
import vi from "date-fns/locale/vi";
registerLocale("vi", vi);

const dataStatus = [
  { id: "Hoạt động", value: "Hoạt động" },
  { id: "Khóa tạm thời", value: "Khóa tạm thời" },
  { id: "Hủy", value: "Hủy" },
];

const OtherProductDetail = ({
  codeOtherProduct,
  onClickHandleClose,
  addBtn,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setSelectedImage(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedImage(null);
    }
  };

  return (
    <div className="other-product-detail-background">
      <div className="other-product-detail-container">
        <div className="other-product-detail-header">
          <div className="other-product-detail-header-edit">
            <div
              className="other-product-detail-header-edit-save"
              //   onClick={onClickHandleSave}
            >
              <img className="icon-save" src={iconSave} alt="update" />
              <p>Lưu</p>
            </div>
            <div
              className="other-product-detail-header-edit-update"
              //   onClick={onClickHandleEdit}
            >
              <img className="icon-update" src={iconPen} alt="update" />
              <p>Chỉnh sửa</p>
            </div>
            <div
              className="other-product-detail-header-edit-update"
              //   onClick={onClickHandleNew}
            >
              <img className="iconNew" src={iconCreateNew} alt="create new" />
              <p>Tạo mới</p>
            </div>
            <div
              className="other-product-detail-header-close"
              onClick={onClickHandleClose}
            >
              <img className="iconClose" src={iconClose} alt="close" />
            </div>
          </div>
          <div className="other-product-detail-header-name">
            {/* <span>{codeUser} - </span> <span>-{nameUser} </span> */}
          </div>
        </div>

        <div className="other-product-detail-content">
          <div className="other-product-detail-content-left">
            {/* {showAlert && (
              <Alert message={message} onClose={handleCloseAlert} />
            )} */}
            <div className="other-product-detail-input">
              <label>Mã sản phẩm</label>
              <div className="other-product-detail-input-dem"></div>

              <div className="input-other-product-container">
                <input
                  className="input-other-product"
                  //   value={codeUser}
                  //   readOnly={!editCode}
                  //   style={editCode ? {} : { background: "rgb(196, 196, 196)" }}
                  //   onChange={(text) => onChangeHandleCode(text)}
                  //   onFocus={onHandleFocusCode}
                />
                {/* {isValidCode && (
                  <p style={{ color: "red" }}>Mã không được bỏ trống</p>
                )} */}
              </div>

              {/* {isValid && (
                <p style={{ color: "red" }}>Mã người dùng không được trống.</p>
              )} */}
            </div>
            <div className="other-product-detail-input">
              <label>Tên combo sản phẩm</label>
              <div className="other-product-detail-input-dem"></div>
              <div className="input-other-product-container">
                <input
                  className="input-other-product"
                  //   value={nameUser}
                  //   readOnly={!edit}
                  //   style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  //   onChange={(text) => onChangeHandleName(text)}
                  //   onFocus={onHandleFocusName}
                />
                {/* {isValidName && (
                  <p style={{ color: "red" }}>"Tên tối thiểu 3 ký tự chữ"</p>
                )} */}
              </div>
            </div>

            <div className="other-product-detail-input">
              <label>Chọn ảnh</label>
              <div className="other-product-detail-input-dem"></div>
              <div className="input-other-product-container">
                <div className="other-product-detail-poster">
                  <input
                    type="file"
                    accept="image/*" // Chỉ cho phép chọn ảnh
                    onChange={handleImageChange}
                  />
                </div>

                {/* {isValidHome && <p style={{ color: "red" }}>Không bỏ trống</p>} */}
              </div>
            </div>

            <div className="other-product-detail-input">
              <label>Ảnh sản phẩm</label>
              <div className="other-product-detail-input-dem"></div>
              <div className="input-other-product-container">
                <div className="other-product-detail-poster">
                  {selectedImage && (
                    <img
                      src={selectedImage}
                      alt="Ảnh đã chọn"
                      style={{ maxWidth: "300px" }}
                    />
                  )}
                </div>

                {/* {isValidHome && <p style={{ color: "red" }}>Không bỏ trống</p>} */}
              </div>
            </div>
          </div>
          <div className="other-product-detail-content-right">
            <div className="other-product-detail-input">
              <label>Giá</label>
              <div className="other-product-detail-input-dem"></div>
              <div className="input-other-product-container">
                <input
                  className="input-other-product"
                  //   value={phoneUser}
                  //   readOnly={!edit}
                  //   style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  //   onChange={(text) => onChangeHandlePhone(text)}
                  //   onFocus={onHandleFocusPhone}
                />
                {/* {isValidPhone && (
                  <p style={{ color: "red" }}>Số điện thoại không đúng</p>
                )} */}
              </div>
            </div>

            <div className="other-product-detail-input">
              <label>Mô tả</label>
              <div className="other-product-detail-input-dem"></div>

              <div className="input-other-product-container">
                <textarea
                  style={{ height: "50px" }}
                  className="input-other-product"
                  //   value={numberHome}
                  //   readOnly={!edit}
                  //   style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  //   onChange={(text) => onChangeHandleNumberHome(text)}
                  //   onFocus={onHandleFocusHome}
                />
                {/* {isValidHome && <p style={{ color: "red" }}>Không bỏ trống</p>} */}
              </div>
            </div>

            <div className="other-product-detail-input">
              <label>Trạng thái</label>
              <div className="other-product-detail-input-dem"></div>
              <div className="input-other-product-container">
                <FormControl
                  sx={{ width: "52%", marginRight: "80px" }}
                  size="small"
                >
                  <InputLabel id="demo-select-small-label">Status</InputLabel>
                  <Select
                    labelId="demo-select-small-label"
                    id="demo-select-small"
                    // value={status}
                    // label="Status"
                    // onChange={handleChangeComboboxStatus}
                    // onFocus={onHandleFocusStatus}
                    // readOnly={!edit}
                    // style={edit ? {} : { background: "rgb(196, 196, 196)" }}
                  >
                    {dataStatus.map((st, index) => {
                      return (
                        <MenuItem key={index} value={st.id}>
                          {st.value}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                {/* {isValidStatus && (
                                    <p style={{ color: "red" }}>Không được bỏ trống</p>
                                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OtherProductDetail;

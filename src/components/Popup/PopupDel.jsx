import React, { useEffect, useState } from "react";
import store from "../../store";
import api from "zmp-sdk";
import "./Popup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function PopupDel(props) {
  const [param, setParam] = useState("");
  const [userLink, setUserLink] = useState(false);
  //   const [userData, setUserData] = useState([]);

  //https://s.sbh.so/verify/hsPexxmRYm0
  const handleDelete = (value) => {
    props.dataUser.splice(value, 1);

    api.setStorage({
      data: {
        key1: props.dataUser,
      },
      success: (data) => {
        props.setIsSuccess(true);
        const { errorKeys } = data;
      },
      fail: (error) => {
        console.log(error);
      },
    });
    toast.success("Xóa thành công", {
      position: toast.POSITION.BOTTOM_RIGHT,
      autoClose: 1500,
    });
    props.setTrigger(false);
  };

  const handleClose = () => {
    props.setTrigger(false);
    props.setIsSuccess(true);
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <label
          style={{
            fontSize: "16px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Bạn có chắc muốn xóa không ?
        </label>
        <div className="popup-btn">
          <button
            className="btn btn-accept"
           
            onClick={() => handleDelete(props.indexDel)}
          >
            Xác nhận
          </button>
          <button
           
            className="btn btn-close"
            onClick={handleClose}
            // onClick={handleClick}
          >
            Từ chối
          </button>
        </div>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopupDel;

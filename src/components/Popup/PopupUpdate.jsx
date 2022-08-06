import React, { useEffect, useState } from "react";
import store from "../../store";
import api from "zmp-sdk";
import "./Popup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

function PopupUpdate(props) {
  const [param, setParam] = useState("");
  const [userLink, setUserLink] = useState("");
  //   const [userData, setUserData] = useState([]);
  //   console.log(userData[0].customer);
  // console.log(userData);
  //   setUserData(props.dataUser);

  const handleUpdate = (index) => {
    props.dataUser[index].customer = param;
    props.setDataUser(props.dataUser);
    const regex = /[a-zA-Z]/g;

    if (param.match(regex) !== null) {
      props.dataUser[index].customer = param;
      console.log(index);
      api.setStorage({
        data: {
          key1: props.dataUser,
        },

        success: (data) => {
          props.setIsSuccess(true);
          const { errorKeys } = data;
          l;
        },
        fail: (error) => {
          console.log(error);
        },
      });
      toast.success("Cập nhập thành công", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    } else {
      toast.warning("Vui lòng nhập tên !", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    }

    props.setTrigger(false);
    setParam("");
  };

  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <form className="popup-form">
          <input
            style={{ fontSize: "16px" }}
            className="popup-input"
            type="text"
            value={param}
            onChange={(e) => {
              setParam(e.target.value);
            }}
            placeholder="Nhập tên khách hàng"
          />
        </form>
        <div className="popup-btn">
          <button
            className="btn btn-accept"
            onClick={() => handleUpdate(props.indexUpd)}
          >
            Xác nhận
          </button>
          <button
            className="btn btn-close"
            onClick={() => props.setTrigger(false)}
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

export default PopupUpdate;

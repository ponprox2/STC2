import React from "react";

import api from "zmp-sdk";
import "./Popup.css";

// import "react-toastify/dist/ReactToastify.css";

function PopupLogout(props) {
  const HandleLogout = () => {
    api.removeStorage({
      keys: ["Phone"],
      success: (data) => {
        api.closeApp({
          success: (res) => {},
          fail: (error) => {
            console.log(error);
          },
        });
      },
      fail: (error) => {
        console.log(error);
      },
    });
  };
  return props.openPopupLogout ? (
    <div className="popup">
      <div className="popup-inner">
        <label
          style={{
            fontSize: "16px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          Bạn có chắc muốn thoát không ?
        </label>
        <div className="popup-btn">
          <button className="btn btn-accept" onClick={HandleLogout}>
            Xác nhận{" "}
          </button>
          <button
            className="btn btn-close"
            onClick={() => props.setOpenPopupLogout(false)}
          >
            Từ chối
          </button>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default PopupLogout;

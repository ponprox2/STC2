import React, { useEffect, useState } from "react";
import store from "../../store";
import api from "zmp-sdk";
import "./Popup.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { zmp } from "zmp-framework/react";
toast.configure();

function Popup(props) {
  const [param, setParam] = useState("");
  const [boolean, setBoolean] = useState(false);
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    api.getStorage({
      keys: ["key1"],
      success: (data) => {
        const { key1 } = data;
        var phone = [...key1];
        setUserData([...phone]);
      },
      fail: (error) => {},
    });
  }, [props.isSuccess]);
  const handleAdd = () => {
    const random = Math.floor(Math.random() * 10000 + 1);
    const temp = { customer: `Khách hàng: ${random}`, link: param };
    const regex = "https://s.sbh.so";
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].link === param) {
        setTimeout(() => {
          api.openWebview(
            {
              url: param,
              success: (res) => {},
              fail: (error) => {
                console.log(error);
              },
            },
            500
          );
        });
        setBoolean(true);
        return;
      }
      setBoolean(false);
    }
    if (boolean === true) {
      return null;
    }
    if (param.match(regex) !== null) {
      api.getStorage({
        keys: ["key1"],
        success: (data) => {
          const { key1 } = data;
          var phone = [...key1, temp];
          setUserData([...phone]);

          api.setStorage({
            data: {
              key1: phone,
            },
            success: (data) => {
              props.setIsSuccess(true);
              const { errorKeys } = data;
              setTimeout(() => {
                api.openWebview({
                  url: param,
                  success: (res) => {},
                  fail: (error) => {
                    console.log(error);
                  },
                });
              }, 500);
            },
            fail: (error) => {
              console.log(error);
            },
          });
        },
        fail: (error) => {
          console.log(error);
        },
      });
    } else {
      toast.warning("Vui lòng nhập đúng định dạng !", {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 1500,
      });
    }
    setParam("");
    props.setTrigger(false);
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
            placeholder="https://s.sbh.so"
          />
        </form>
        <div className="popup-btn">
          <button className="btn btn-accept" onClick={handleAdd}>
            Xác nhận{" "}
          </button>
          <button
            className="btn btn-close"
            onClick={() => props.setTrigger(false)}
          >
            Từ chối{" "}
          </button>
        </div>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;

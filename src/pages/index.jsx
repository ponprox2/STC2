import React, { useState, useEffect } from "react";
import { SpeedDial, SpeedDialIcon, Avatar } from "@mui/material";
import {
  Page,
  useStore,
  Button,
  Icon,
  zmp,
  Tabbar,
  Link,
} from "zmp-framework/react";
import api from "zmp-sdk";
import "../css/index.css";
import image from "../img/bg.png";
import Popup from "../components/Popup/Popup";
import Swipe from "../components/Swipe/Swipe";
import PopupZma from "../components/Popup/PopupZma";
import btn from "../img/btn.png";

import { toast } from "react-toastify";
import PopupLogout from "../components/Popup/PopupLogout";
// import HandleLink from "../components/Link/handleLink"

export const Profile = () => {
  const [openPopupLogout, setOpenPopupLogout] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const profileUser = useStore("profileUser");
  const phoneNumberUser = useStore("phoneNumber");
  useEffect(() => {
    if (phoneNumberUser.number) {
      const phone = phoneNumberUser.number.split(")");

      setPhoneNumber(`0${phone[1].trim("")}`);
    }
  }, [phoneNumberUser]);

  if (!profileUser) return null;
  return (
    <>
      <div className="listView">
        <div className="listView-top">
          <Avatar
            onClick={() => setOpenPopupLogout(true)}
            style={{ width: "55px", height: "55px" }}
            src={profileUser.avatar}
          ></Avatar>
          <div className="listView-name">
            <label style={{ color: "white", fontSize: "20px" }}>
              {profileUser.name}
            </label>
            {phoneNumber !== "" && (
              <label style={{ color: "white" }}>{phoneNumber}</label>
            )}
          </div>
        </div>
        <PopupLogout
          openPopupLogout={openPopupLogout}
          setOpenPopupLogout={setOpenPopupLogout}
        />
      </div>
    </>
  );
};

const HomePage = () => {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [userData, setUserData] = useState([]);
  const [boolean, setBoolean] = useState(false);
  const length = userData.length;

  useEffect(() => {
    const closeBackDrop = (e) => {
      // console.log(e)
      if (e.path[0].tagName !== "IMG" && e.path[0].tagName !== "INPUT") {
        setButtonPopup(false);
      }
    };
    document.body.addEventListener("click", closeBackDrop);

    return () => document.body.addEventListener("click", closeBackDrop);
  }, [buttonPopup]);

  useEffect(() => {
    setTimeout(() => {
      if (isSuccess) {
        api.getStorage({
          keys: ["key1"],
          success: (data) => {
            const { key1 } = data;
            var phone = [...key1];
            setUserData([...phone]);
          },
          fail: (error) => {
            api.setStorage({
              data: {
                key1: "",
              },
              success: (data) => {
                const { errorKeys } = data;
              },
              fail: (error) => {
                console.log(error);
              },
            });
          },
        });
        setIsSuccess(false);
      }
    }, 200);
  }, [isSuccess]);
  useEffect(() => {
    const params = api.getRouteParams();
    const type = params.type;
    const url = params.url;
    const id = params.id;
    const env = "?env=stc";
    const newUrl = "https://" + url + "/verify/" + id + env;

    const random = Math.floor(Math.random() * 10000 + 1);

    const temp = { customer: `khách hàng: ${random}`, link: newUrl };
    setTimeout(() => {
      if (type === "dedt" && url === "s.sbh.so") {
        api.getStorage({
          keys: ["key1"],
          success: (data) => {
            const { key1 } = data;
            for (let i = 0; i < key1.length; i++) {
              if (key1[i].link === newUrl) {
                setTimeout(() => {
                  api.openWebview(
                    {
                      url: newUrl,
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
            var phone = [...key1, temp];
            setUserData([...phone]);

            api.setStorage({
              data: {
                key1: phone,
              },
              success: (data) => {
                const { errorKeys } = data;
                setTimeout(() => {
                  api.openWebview(
                    {
                      url: newUrl,
                      success: (res) => {},
                      fail: (error) => {
                        console.log(error);
                      },
                    },
                    500
                  );
                });
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
      }
    }, 1000);
  }, []);

  const handlePop = () => {
    setButtonPopup(true);
    console.log("object");
  };
  const navigateWithoutAnimation = (path) => {
    zmp.views.main.router.navigate(path, {
      animate: false,
    });
  };
  const handleOpenSTC = () => {
    api.openWebview({
      url: "https://s.sbh.so/cashbook/home",
      success: (res) => {
        // xử lý khi gọi api thành công
      },
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  };
  return (
    <Page name="home" navbarLarge>
      <Profile></Profile>

      <div className="listView-title">
        <label>Danh sách nhắc nợ đã truy cập</label>
      </div>
      {(length && (
        <div className="listView-bottom">
          {userData.map((value, index) => (
            <div>
              <Swipe
                pagination={50}
                key={index}
                value={value}
                index={index}
                setIsSuccess={setIsSuccess}
              ></Swipe>
            </div>
          ))}
        </div>
      )) || (
        <div className="content">
          <img src={image} alt="" width={100} height={100} />
          <i style={{ paddingTop: "10px" }}>
            (Nhấn dấu cộng để thêm đơn nợ mới)
          </i>
        </div>
      )}

      <img
        onClick={() => setButtonPopup(true)}
        src={btn}
        alt=""
        width={70}
        height={67}
        style={{
          position: "fixed",
          bottom: "45px",
          zIndex: 999999,
          right: "10px",
          borderRadius: "50%",
        }}
      ></img>
      <Popup
        setDataUser={setUserData}
        dataUser={userData}
        trigger={buttonPopup}
        isSuccess={isSuccess}
        setTrigger={setButtonPopup}
        setIsSuccess={setIsSuccess}
      ></Popup>
      <Tabbar bottom>
        <Link key="/" onClick={() => navigateWithoutAnimation("/")}>
          Trang chủ
        </Link>
        <Link key="/" onClick={handleOpenSTC}>
          Sổ thu chi
        </Link>
      </Tabbar>
    </Page>
  );
};
export default HomePage;

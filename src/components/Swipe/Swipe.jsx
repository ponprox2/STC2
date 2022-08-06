import React, { useEffect, useState } from "react";
import "./Swipe.css";
import Popup from "../Popup/Popup";
import api from "zmp-sdk";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PopupDel from "../Popup/PopupDel";
import PopupUpdate from "../Popup/PopupUpdate";
import { Swiper, SwiperSlide, Icon, zmp } from "zmp-framework/react";

toast.configure();

// const style = {
//   slide1: {
//     // backgroundColor: "green",
//     height: 63,
//   },
//   slide3: {
//     backgroundColor: "#eb610e",
//     height: 63,
//   },
// };
export default function Swipe(props) {
  const [buttonPopup, setButtonPopup] = useState(false);
  const [buttonPopupDel, setButtonPopupDel] = useState(false);
  const [buttonPopupUpd, setButtonPopupUpd] = useState(false);
  const [index, setIndex] = useState("");

  // const [isSuccess, setIsSuccess] = useState(true);

  const [userData, setUserData] = useState([]);
  const list = JSON.parse(localStorage.getItem("key1"));
  const handleLink = (link) => {
    api.openWebview({
      url: link,
      success: (res) => {},
      fail: (error) => {
        console.log(error);
      },
    });
  };

  useEffect(() => {
    const closeBackDrop = (e) => {
      if (
        e.path[0].tagName !== "LABEL" &&
        e.path[0].tagName !== "INPUT" &&
        e.path[0].tagName !== "BUTTON"
      ) {
        setButtonPopupUpd(false);
        setButtonPopupDel(false);
      }
    };
    document.body.addEventListener("click", closeBackDrop);

    return () => document.body.addEventListener("click", closeBackDrop);
  }, []);

  useEffect(() => {
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
            console.log("swipe", error);
          },
        });
      },
    });
  }, []);
  const handleDelete = (index) => {
    // const temp = `.swipe${index}`
    const swiper = zmp.swiper.get(`.swipe${index}`);
    if (swiper) {
      swiper.slideTo(0);
    }
    setButtonPopupDel(true);
    setIndex(index);
    api.getStorage({
      keys: ["key1"],
      success: (data) => {
        const { key1 } = data;
        var phone = [...key1];
        setUserData([...phone]);
      },
      fail: (error) => {
        // api.setStorage({
        //   data: {
        //     key1: "",
        //   },
        //   success: (data) => {
        //     const { errorKeys } = data;
        //   },
        //   fail: (error) => {
        //     console.log(error);
        //   },
        // });
      },
    });
  };
  const handleUpdate = (index) => {
    setButtonPopupUpd(true);
    setIndex(index);
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
  };
  return (
    <div>
      <Swiper
        // autoplay={true}
        // allowSlideNext={true}
        // allowTouchMove={false}
        // centeredSlides={false}
        // slidesPerView={1}
        // pagination navigation scrollbar
        onSlideChange={() => {
          handleDelete(props.index);
        }}
        className={`swipe${props.index} swipe`}
        style={{
          borderBottom: "1.5px solid rgba(145, 158, 171, 0.24)",
          paddingBottom: "8px",
        }}
        speed={200}
      >
        <SwiperSlide>
          <div className="swipe-customer">
            <div className="swipe-customer-name">
              <label
                onClick={() => {
                  handleUpdate(props.index);
                }}
              >
                {props.value.customer}
              </label>
            </div>
            <button
              className="swipe-button"
              onClick={() => handleLink(props.value.link)}
            >
              Xem chi tiết{" "}
            </button>
          </div>
        </SwiperSlide>
        <SwiperSlide
          style={{
            borderBottom: "1.5px solid rgba(145, 158, 171, 0.24)",
            fontSize: "16px",
            border: "none",
            backgroundColor: "#00AD4F",
            color: "white",
            height: "100%",
            paddingBottom: "8px",
          }}
          className="swipe-button-del"
        >
          {" "}
          <Icon
            zmp="zi-delete"
            size={35}
            style={{
              color: "white",
            }}
          ></Icon>
          Xoá
        </SwiperSlide>
      </Swiper>
      {/* <SwipeableViews
      
       onTransitionEnd={() => handleDelete(props.index)}
        style={{ borderBottom: "1.5px solid rgba(145, 158, 171, 0.24)" }}
      > */}
      {/* <div style={Object.assign({}, style.slide1)} className="swipe"> */}
      {/* {userData.map((value, index) => (
            
          ))} */}

      {/* </div> */}

      {/* <div
          style={Object.assign({}, style.slide3)}
          className="swipe-button-del"
        >
          <button
            style={{
              fontSize: "16px",
              border: "none",
              backgroundColor: "#eb610e",
              color: "white",
            }}
          >
            Xóa{" "}
           
          </button>
        </div> */}
      {/* </SwipeableViews> */}
      <Popup
        trigger={buttonPopup}
        setTrigger={setButtonPopup}
        setIsSuccess={props.setIsSuccess}
      ></Popup>
      <PopupDel
        setDataUser={setUserData}
        dataUser={userData}
        trigger={buttonPopupDel}
        setTrigger={setButtonPopupDel}
        setIsSuccess={props.setIsSuccess}
        indexDel={index}
      ></PopupDel>
      <PopupUpdate
        setDataUser={setUserData}
        dataUser={userData}
        trigger={buttonPopupUpd}
        setTrigger={setButtonPopupUpd}
        setIsSuccess={props.setIsSuccess}
        indexUpd={index}
      ></PopupUpdate>
    </div>
  );
}

import React from "react";
import {
  Page,
  Card,
  Navbar,
  Swiper,
  SwiperSlide,
  Button,
  zmp,
  Box,
  Tabbar,
  useStore,
  Link,
} from "zmp-framework/react";
// import "../css/page2.css"
import api from "zmp-sdk";

export default () => {
  const navigateWithoutAnimation = (path) => {
    zmp.views.main.router.navigate(path, {
      animate: false,
    });
  };

  const token = useStore("token");
  console.log(token);

  const handleClick = () => {
    api.login({
      success: async () => {
        // xử lý khi gọi api thành công
        api.getAccessToken({
          success: (accessToken) => {
            console.log(accessToken);
            // xử lý khi gọi api thành công
          },
          fail: (error) => {
            // xử lý khi gọi api thất bại
            console.log(error);
          },
        });
      },
    });
  };

  const handleFollow = () => {
    api.followOA({
      id: "3368896473237223254",
      success: (res) => {
        console.log("duoc cua lo'")
      },
      fail: (err) => {},
    });
  };
  return (
    <Page>
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={handleFollow}>Bấm vào đê</button>
      </div>

      <Tabbar bottom>
        <Link key="/" onClick={() => navigateWithoutAnimation("/")}>
          Trang chủ
        </Link>
        <Link key="/" onClick={() => navigateWithoutAnimation("/page2")}>
          Page2
        </Link>
      </Tabbar>
    </Page>
  );
};

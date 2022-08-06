import React, { useState, useEffect } from "react";
import { Page, useStore, Button, Tabbar, Link, zmp } from "zmp-framework/react";
import api from "zmp-sdk";
import store from "../store";
import { useParams, useNavigate } from "react";

export const Profile = () => {
  const profileUser = useStore("profileUser");
  const phone = useStore("phoneNumber");
  const token = useStore("token");

  if (!profileUser) return null;
  return (
    <>
      <h2>tên người dùng: {profileUser.name}</h2>
      <img src={profileUser.avatar} />
      <br />
      token: {token.token1}
      <br />
      phone number: {phone.number}
      <br />
      {/* x:{location.x} - y:{location.y} */}
    </>
  );
};
export const userdata = () => {};

const Page1 = () => {
  const phoneNumberCus = useStore("phoneNumberCus");
  const [sdt, setSdt] = useState("");
  const [userData, setUserData] = useState([]);
  const handleLink = () => {
    api.openWebview({
      url: "https://s.sbh.so/verify/hsPexxmR02d",
      success: (res) => {},
      fail: (error) => {
        console.log(error);
      },
    });
  };
  //   export default function Details2() {
  //  const params = useParams();

  //  let z = fetch(`https://mini.zalo.me/docs/api/setStorage/`,{
  //   method: "GET",
  //   mode: 'no-cors'
  // })
  //     .then((response) => {
  //      console.log(response.json())
  //     })

  useEffect(() => {
    api.getStorage({
      keys: ["key1"],
      success: (data) => {
        const { key1 } = data;
        var phone = [...key1];
        setUserData([...phone]);
        console.log(userData);
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
  }, []);

  const handleAdd = () => {
    const temp = { phoneNumber: sdt };
    store.dispatch("setPhoneNumberCustomer", temp);

    api.getStorage({
      keys: ["key1"],
      success: (data) => {
        const { key1 } = data;
        var phone = [...key1, temp];
        setUserData([...phone]);
        console.log(userData);
        api.setStorage({
          data: {
            key1: phone,
          },
          success: (data) => {
            const { errorKeys } = data;
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
  };
  const handleOpen = () => {
    api.openMiniApp({
      appId: "978997582391772884",
      params: {
        key: "/env=TESTING&version=18",
      },
      success: (res) => {},
      fail: (error) => {
        // xử lý khi gọi api thất bại
        console.log(error);
      },
    });
  };
  // const { key } = api.getRouteParams();
  // console.log(key)
  const navigateWithoutAnimation = (path) => {
    zmp.views.main.router.navigate(path, {
      animate: false,
    });
  };

  return (
    <Page name="page1" className="page-inputs page-with-navbar">
      <iframe
        src="https://s.sbh.so/verify/hsPexxmR02d"
        title="W3Schools Free Online Web Tutorials"
        style={{ width: "100%", heigth: "100%" }}
      ></iframe>
      <Tabbar>
        <Link key="/page2" onClick={() => navigateWithoutAnimation("https://mui.com/material-ui/react-text-field/#api")}>
          page2
        </Link>
      </Tabbar>
    </Page>
  );
};
export default Page1;

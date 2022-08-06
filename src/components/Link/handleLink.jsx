import React, { useState, useEffect } from "react";
import { SpeedDial, SpeedDialIcon, Avatar } from "@mui/material";
import {
  Page,
  useStore,
  Button,
  Icon,

} from "zmp-framework/react";
import api from "zmp-sdk";

const HandleLink = (props)=>{
    const [boolean, setBoolean] = useState(false);
    const [userData, setUserData] = useState([]);
    // console.log(userData);
    useEffect(() => {
      api.getStorage({
        keys: ["key1"],
        success: (data) => {
          const { key1 } = data;
          var phone = [...key1];
          setUserData([...phone]);
        },
        fail: (error) => {
     
        },
      });
    }, []);

    
}


export default HandleLink;
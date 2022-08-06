import React, { useState, useEffect } from "react";
import { zmp, zmpready, App, View } from "zmp-framework/react";
import store from "../store";

const MyApp = () => {
  // ZMP Parameters
  const zmpparams = {
    name: "ZMP", // App name
    theme: "auto", // Automatic theme detection
    // App store
    store: store,
  };

  zmpready(() => {
    // Call ZMP APIs here
    // store.dispatch("open");
    store.dispatch("login");
  });

  return (
    <App {...zmpparams}>
      {/* Your main view, should have "view-main" class */}
      <View main className="safe-areas" url="/" />
    </App>
  );
};
export default MyApp;

import React from "react";
import { Home } from "../Home/Home";
// import { Login } from "../Login/Login";
// import { Profile } from "../Profile/Profile";
// import { Register } from "../Register/Register";

import { Routes, Route, Navigate } from "react-router-dom";
// import { NewAppointment } from "../NewAppointment/NewAppointment";
// import { MyAppointments } from "../MyAppointments/MyAppointments";
// import { CheckAllAppointment } from "../CheckAppointment/CheckAllAppointment";
// import { GetAllClients } from "../GetAllClients/GetAllClients";

export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/profile" element={<Profile />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/newappointment" element={<NewAppointment />} /> */}
        {/* <Route path="/myappointments" element={<MyAppointments />} /> */}
        {/* <Route path="/allappointments" element={<CheckAllAppointment />} /> */}
        {/* <Route path="/getallclients" element={<GetAllClients />} /> */}
      </Routes>
    </>
  );
};

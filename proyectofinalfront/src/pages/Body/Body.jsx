import React from "react";
import { Home } from "../Home/Home";
import { Login } from "../Login/Login";
import { Profile } from "../Profile/Profile";
import { Register } from "../Register/Register";

import { Routes, Route, Navigate } from "react-router-dom";

import { GetAllUsers } from "../GetAllUsers/GetAllUsers";
import { GetAllVideogames } from "../GetAllVideogames/GetAllVideogames";
import { AddVideogame } from "../AddVideogame/AddVideogame";
import { UpdateVideogame } from "../UpdateVideogame/UpdateVideogame";


export const Body = () => {
  return (
    <>
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />
        <Route path="/getallusers" element={<GetAllUsers />} />
        <Route path="/getallvideogames" element={<GetAllVideogames />} />
        <Route path="/addvideogame" element={<AddVideogame />} />
        <Route path="/updatevideogame" element={<UpdateVideogame />} />

      </Routes>
    </>
  );
};

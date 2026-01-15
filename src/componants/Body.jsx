import React from "react";
import { Outlet } from "react-router-dom";

const Body = () => {
  return (
    <div>
      <p className="my-16">MatchMyPet</p>
      <Outlet />
    </div>
  );
};

export default Body;

import React from "react";
import SideBar from "../../components/Admin/SideBar/SideBar";
import Coupon from "../../components/Admin/Coupon/Coupon";

function CouponPage() {
  return (
    <div className="flex">
      <SideBar />
      <Coupon />
    </div>
  );
}

export default CouponPage;

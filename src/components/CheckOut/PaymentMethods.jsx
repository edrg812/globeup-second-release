import React from "react";
import card from "/assets/payments_img/card.png";
import bkash from "/assets/payments_img/bkash.png";
import nagad from "/assets/payments_img/nagad.png";
import rocket from "/assets/payments_img/rocket.png";
const PaymentMethods = () => {
  return (
    <div>
      <p className="text-sm font-medium mb-1">We Accept</p>
      <div className="flex items-center gap-2">
        <img src={card} alt="Visa" className="w-8" />
        <img src={bkash} alt="bKash" className="w-8" />
        <img src={nagad} alt="Nagad" className="w-8" />
        <img src={rocket} alt="Rocket" className="w-8" />
        <img
          src="https://cdn-icons-png.flaticon.com/128/1554/1554401.png"
          alt="cash on delivery"
          className="w-8"
        />
      </div>
    </div>
  );
};

export default PaymentMethods;

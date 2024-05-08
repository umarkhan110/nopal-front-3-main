"use client";

import { useEffect, useState } from "react";
import getStripe from "@/utils/stripe";
import { Elements } from "@stripe/react-stripe-js";
import { useTheme } from "next-themes";
import { useStore } from "@/store/store";
import {
  getAllTotalAmount,
  getTaxAmount,
  getTipAmount,
} from "@/utils/calculateHelper";

const CartPaymentElementProvider = ({ configData, children }) => {
  const { theme } = useTheme();
  const { orderType } = useStore();
  const deliveryFee = orderType === "pickup" ? 0 : configData?.delivery_charge;
  const taxPercentage = configData?.service_fee_estimated_tax;

  const [cartTotalAmount, setCartTotalAmount] = useState();

  // *Total tax amount
  const getTotalTaxAmount = getTaxAmount(taxPercentage);
  const totalTaxAmount = getTotalTaxAmount();

  // *Total tip amount
  const getTotalTipAmount = getTipAmount();
  const tipAmount = getTotalTipAmount();

  // *Total amount including the tax and tip
  const getTotalAmount = getAllTotalAmount();
  const totalAmount = getTotalAmount(totalTaxAmount, tipAmount, deliveryFee);

  // *convert the total amount into the cents
  useEffect(() => {
    if (!isNaN(totalAmount)) {
      setCartTotalAmount(totalAmount * 1000);
    }
  }, [totalAmount]);

  const appearance = {
    theme: theme === "light" ? "stripe" : "night",
    variables: {
      colorPrimary: "#697b18",
      fontFamily: '"Manrope", sans-serif',
    },
    // labels: "floating",
  };

  const options = {
    mode: "payment",
    currency: "usd",
    amount: cartTotalAmount === 0 ? 1000 : cartTotalAmount,
    appearance,
    paymentMethodCreation: "manual",
    payment_method_types: ["card"],
  };

  return (
    <>
      <Elements options={options} stripe={getStripe()}>
        {children}
      </Elements>
    </>
  );
};

export default CartPaymentElementProvider;

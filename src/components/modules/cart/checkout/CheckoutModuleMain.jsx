"use client";

import { useState } from "react";
import FinalCheckoutForm from "@/components/modules/cart/checkout/FinalCheckoutForm";
import { useStore } from "@/store/store";
import FinalCheckoutSidebar from "./FinalCheckoutSidebar";
import { getDaysFromToday, getTimeIntervals } from "@/utils";
import { useFormContext } from "react-hook-form";
import Services from "@/config/services";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { baseID, connectedAccountId } from "@/config/constant";
import { errorToast, successToast } from "@/utils/toaster";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import {
  getAllTotalAmount,
  getTaxAmount,
  getTipAmount,
} from "@/utils/calculateHelper";
import { cleanAndFormatPhoneNumber } from "@/utils/formatHelper";

const CheckoutModuleMain = ({ popularItems, configData }) => {
  const { handleSubmit, setError } = useFormContext();
  const router = useRouter();
  const { setStorageItem } = useLocalStorage();
  const {
    cartItems,
    totalAmount,
    user,
    setUser,
    resetCart,
    currentBranch,
    orderType,
    setOrderType,
    staffTipAmount,
    setStaffTipAmount,
    setStaffOtherAmount,
  } = useStore();
  const stripe = useStripe();
  const elements = useElements();
  const restaurantAddress = configData?.restaurant_address;
  const minOrderAmount = configData?.minimum_order_value;

  const deliveryFee = orderType === "pickup" ? 0 : configData?.delivery_charge;
  const taxPercentage = configData?.service_fee_estimated_tax;

  // *For order dropdown states
  const [selectedDate, setSelectedDate] = useState(getDaysFromToday()[0].value);
  const [selectedTime, setSelectedTime] = useState(getTimeIntervals()[0].value);

  // *For delivery info states
  const [currentDistance, setCurrentDistance] = useState("");
  const [addressAutoPlacesDetail, setAddressAutoPlacesDetail] = useState();

  // *For place order states
  const [placeOrderLoading, setPlaceOrderLoading] = useState(false);

  // *Total tax amount
  const getTotalTaxAmount = getTaxAmount(taxPercentage);
  const totalTaxAmount = getTotalTaxAmount();

  // *Total tip amount
  const getTotalTipAmount = getTipAmount();
  const tipAmount = getTotalTipAmount();

  // *Total amount including the tax and tip
  const getTotalAmount = getAllTotalAmount();
  const cartTotalAmount = getTotalAmount(
    totalTaxAmount,
    tipAmount,
    deliveryFee
  );

  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
  };

  const handleAddStaffTip = (label) => {
    setStaffTipAmount(label);
  };

  const handleOtherStaffAmount = (e) => {
    setStaffOtherAmount(e.target.value);
  };

  // *For getting user info
  const getUserInfoRequest = async () => {
    try {
      const response = await Services.getUserInfo();
      if (response?.id) {
        setStorageItem("user", response);
        setUser(response);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  // *For place order request
  const handlePlaceOrderRequest = async (data) => {
    setPlaceOrderLoading(true);
    try {
      // *Trigger form validation and wallet collection
      const { error: submitError } = await elements.submit();
      if (submitError) {
        return submitError;
      }

      if (currentBranch?.coverage < currentDistance) {
        setError(
          "address",
          { message: "Address is not serviceable for delivery" },
          { shouldFocus: true }
        );
        return;
      }
      if (orderType === "delivery" && totalAmount < minOrderAmount)
        return errorToast(
          `Minimum amount should be ${minOrderAmount} for delivery`
        );

      if (!selectedTime) return errorToast("Please select the time");
      if (!selectedDate) return errorToast("Please select the date");

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        elements,
        params: {
          type: "card",
        },
      });

      if (error) {
        return errorToast(error);
      }

      const createPaymentPayload = {
        amount: cartTotalAmount,
        source: paymentMethod.id,
        connectedAccountId: connectedAccountId,
        customer_name: data.f_name,
        customer_email: data.email,
      };

      const paymentResponse = await Services.createPayment(
        createPaymentPayload
      );

      if (paymentResponse?.original?.success === false) {
        return errorToast(paymentResponse?.original?.message);
      }

      // *If payment method is created successfully, proceed with placing the order
      const placeOrderPayload = {
        ...data,
        cart: cartItems?.map((items) => {
          return {
            product_id: items?.id,
            price: items?.price,
            discount_amount: 0,
            // choice_options: choice_options,
          };
        }),
        address_type: "Home",
        restaurant_id: baseID,
        payment_method: "stripe",
        branch_id: currentBranch?.id,
        order_type: orderType,
        distance: currentDistance,
        delivery_date: selectedDate,
        delivery_time: selectedTime,
        user_id: user?.id,
        latitude: addressAutoPlacesDetail?.lat,
        longitude: addressAutoPlacesDetail?.lng,
        total_tax_amount: totalTaxAmount,
        order_tip_amount: tipAmount,
        order_amount: cartTotalAmount,
        contact_person_number: cleanAndFormatPhoneNumber(data?.phone),
        phone: cleanAndFormatPhoneNumber(data?.phone),
      };

      delete placeOrderPayload.expiry_date;
      if (orderType === "pickup") {
        delete placeOrderPayload.address;
        delete placeOrderPayload.house;
        delete placeOrderPayload.road;
        delete placeOrderPayload.latitude;
        delete placeOrderPayload.longitude;
        delete placeOrderPayload.distance;
      }

      if (user?.email) {
        delete placeOrderPayload.phone;
        delete placeOrderPayload.f_name;
        delete placeOrderPayload.l_name;
        delete placeOrderPayload.email;
      }

      let placeOrderResponse;
      if (paymentResponse?.id) {
        placeOrderResponse = await Services.placeOrder(placeOrderPayload);
      }
      if (placeOrderResponse?.order_id) {
        if (!user?.email) {
          getUserInfoRequest();
        }
        router.push("/menu");
        successToast(placeOrderResponse?.message);
        resetCart();
      }
    } catch (error) {
      errorToast(error);
    } finally {
      setPlaceOrderLoading(false);
    }
  };

  return (
    <>
      <div className="w-full lg:h-screen absolute lg:fixed top-0 right-0 bg-background z-[999] flex flex-col lg:flex-row">
        <FinalCheckoutForm
          orderType={orderType}
          setOrderType={setOrderType}
          handleOrderTypeChange={handleOrderTypeChange}
          staffTipAmount={staffTipAmount}
          handleAddStaffTip={handleAddStaffTip}
          handleOtherStaffAmount={handleOtherStaffAmount}
          restaurantAddress={restaurantAddress}
          cartTotalAmount={cartTotalAmount}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          selectedTime={selectedTime}
          setSelectedTime={setSelectedTime}
          setAddressAutoPlacesDetail={setAddressAutoPlacesDetail}
          placeOrderLoading={placeOrderLoading}
          currentBranch={currentBranch}
          currentDistance={currentDistance}
          setCurrentDistance={setCurrentDistance}
          onClick={handleSubmit(handlePlaceOrderRequest)}
        />
        <FinalCheckoutSidebar
          placeOrderLoading={placeOrderLoading}
          popularItems={popularItems}
          totalTaxAmount={totalTaxAmount}
          tipAmount={tipAmount}
          deliveryFee={deliveryFee}
          cartTotalAmount={cartTotalAmount}
          orderType={orderType}
          onClick={handleSubmit(handlePlaceOrderRequest)}
        />
      </div>
    </>
  );
};

export default CheckoutModuleMain;

"use client";

import { useState } from "react";
import ButtonUI from "@/components/common/ButtonUI";
import ScrollShadowUI from "@/components/common/ScrollShadowUI";
import MenuCheckoutCard from "../../menu/MenuCheckoutCard";
import DrawerUI from "@/components/common/DrawerUI";
import InputUI from "@/components/common/InputUI";
import { useRouter } from "next/navigation";
import { useStore } from "@/store/store";
import { getFixedValue } from "@/utils";
import { useForm } from "react-hook-form";
import { X } from "lucide-react";
import Services from "@/config/services";
import { errorToast, successToast } from "@/utils/toaster";

const CheckoutSidebar = ({
  isCheckoutSidebarOpen,
  setIsCheckoutSidebarOpen,
}) => {
  const { cartItems, totalAmount, setCouponDiscount } = useStore();
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    clearErrors,
  } = useForm();

  const [isCouponFieldVisible, setIsCouponFieldVisible] = useState(false);
  const [applyCouponLoading, setApplyCouponLoading] = useState(false);

  const handleCloseCheckoutSidebar = () => {
    setIsCheckoutSidebarOpen(false);
  };

  const handleCheckoutContinue = () => {
    setIsCheckoutSidebarOpen(false);
    router.push("/cart/check-out");
  };

  const onShowCouponField = () => {
    setIsCouponFieldVisible(!isCouponFieldVisible);
    setValue("code", "");
    clearErrors("code");
  };

  const onAddCouponCode = async (data) => {
    setApplyCouponLoading(true);
    try {
      const response = await Services.applyCouponCode(data.code);
      if (response?.id && totalAmount < response?.discount) {
        errorToast("Please add more items to avail coupon discount");
      } else {
        setCouponDiscount(response?.discount);
        successToast("Congrats on your coupon discount");
        setValue("code", "");
        setIsCouponFieldVisible(false);
      }
    } catch (error) {
      errorToast(error);
      setValue("code", "");
    } finally {
      setApplyCouponLoading(false);
    }
  };

  return (
    <>
      <DrawerUI
        isOpen={isCheckoutSidebarOpen}
        onClose={setIsCheckoutSidebarOpen}
      >
        <div className="flex flex-col justify-between h-full">
          <ScrollShadowUI>
            <div className="flex items-center justify-between p-6 border-b border_lightDark">
              <h6 className="text-xl font-semibold">Your Order</h6>
              <ButtonUI
                color="default"
                isIconOnly
                onClick={handleCloseCheckoutSidebar}
              >
                <X />
              </ButtonUI>
            </div>
            <div className="px-6 divide-y divide_lightDark">
              {cartItems?.map((items) => (
                <MenuCheckoutCard key={items?.id} items={items} />
              ))}
            </div>
          </ScrollShadowUI>
          <div className="w-full p-6 space-y-4 border-t bgSecondary_lightDark border_lightDark">
            <span
              className={`text-sm underline ${
                cartItems.length ? "cursor-pointer" : "cursor-not-allowed"
              }`}
              onClick={cartItems.length ? onShowCouponField : null}
            >
              Add Promo Code
            </span>
            {isCouponFieldVisible && (
              <div className="flex items-center gap-2">
                <InputUI
                  name="code"
                  placeholder="Enter promo code"
                  size="sm"
                  variant="bordered"
                  control={control}
                />
                <ButtonUI
                  size="lg"
                  isLoading={applyCouponLoading}
                  onClick={handleSubmit(onAddCouponCode)}
                  className={errors?.code?.type === "required" ? "mb-6" : ""}
                >
                  Submit
                </ButtonUI>
              </div>
            )}
            <ButtonUI
              fullWidth
              size="lg"
              className="flex justify-between"
              onClick={handleCheckoutContinue}
              disabled={!cartItems?.length}
            >
              <span>Checkout</span>
              <span>${getFixedValue(totalAmount)}</span>
            </ButtonUI>
          </div>
        </div>
      </DrawerUI>
    </>
  );
};

export default CheckoutSidebar;

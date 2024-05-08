import { getFixedValue } from "./index";
import { useStore } from "@/store/store";

export function getTaxAmount(taxPercentage) {
  const { cartItems } = useStore();

  return () => {
    const totalTaxAmount = cartItems?.reduce((accumulator, item) => {
      const taxAmountPerItem = item.price * (taxPercentage / 100);
      const itemTotalTax = taxAmountPerItem * item.quantity;
      return accumulator + itemTotalTax;
    }, 0);

    return getFixedValue(totalTaxAmount);
  };
}

export function getTipAmount() {
  const { cartItems, staffTipAmount, staffOtherAmount } = useStore();

  return () => {
    const finalValue = !cartItems?.length
      ? 0
      : staffTipAmount === "Other"
      ? staffOtherAmount
      : staffTipAmount;
    return getFixedValue(finalValue);
  };
}

export function getAllTotalAmount() {
  const { totalAmount } = useStore();

  return (totalTaxAmount, tipAmount, deliveryFee) => {
    const allTotal =
      Number(totalAmount) +
      Number(deliveryFee) +
      Number(totalTaxAmount) +
      Number(tipAmount);
    return getFixedValue(allTotal);
  };
}

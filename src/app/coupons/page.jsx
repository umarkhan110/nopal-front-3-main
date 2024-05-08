import CouponsModuleMain from "@/components/modules/coupons/CouponsModuleMain";
import { getCouponList } from "@/config/api/server/order.api";

export const metadata = {
  title: "Coupons",
};

async function CouponsMain() {
  const couponData = await getCouponList();
  return (
    <>
      <CouponsModuleMain couponData={couponData} />
    </>
  );
}

export default CouponsMain;

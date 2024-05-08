import { CouponIcon } from "@/config/data/Icons";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { useStore } from "@/store/store";
import { successToast } from "@/utils/toaster";
import dayjs from "dayjs";

const CouponsCard = ({ items }) => {
  const { copyToClipboard } = useCopyToClipboard();
  const { setCouponType, addToCart } = useStore();

  const onCopyCouponCode = (coupon) => {
    if (coupon?.coupon_type === "default") {
      copyToClipboard(coupon?.code);
      setCouponType(coupon?.coupon_type);
      successToast("Code copied successfully!");
    } else {
      addToCart(coupon?.product);
    }
  };
  return (
    <>
      <div className="relative flex items-center p-5 rounded-lg bgTertiary_lightDark md:px-14">
        <CouponIcon
          className={items?.is_expired ? "fill-[#6B6C6B]" : "fill-primary"}
        />
        <div
          className="absolute flex items-center ml-6 cursor-pointer xs:ml-12 lg:ml-24"
          onClick={() => onCopyCouponCode(items)}
        >
          <hr className="h-20 border-white border-dashed border-l-3" />
          <div className="ml-5">
            <h3 className="font-semibold text-background">{items?.title}</h3>
            <h3 className="text-sm text-white">{items?.code}</h3>
            <h3 className="font-semibold text-background">
              {items?.coupon_type}
            </h3>
            <h3 className="text-sm text-white">
              Valid till&nbsp;
              {dayjs(items?.expire_date).format("D MMM, YYYY")}
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default CouponsCard;

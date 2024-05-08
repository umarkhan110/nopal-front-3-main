import NextImage from "@/components/common/NextImage";
import ButtonUI from "@/components/common/ButtonUI";
import BannerSlider from "./BannerSlider";
import { useRouter } from "next/navigation";
import MobilePopup from "./MobilePopup";

function Banner({ configData, locationModalState }) {
  const router = useRouter();
  const playStoreLink = configData?.play_store_config?.link;
  const appStoreLink = configData?.play_store_config?.link;
  const bannerData = configData?.banner_for_restaurant_web_app?.filter(
    (items) => items?.banner_type === "header"
  );

  const handleRedirectMenu = () => {
    if (configData?.branches?.length > 1) {
      locationModalState.onOpen();
    } else {
      router.push("/menu");
    }
  };

  return (
    <>
      <BannerSlider bannerData={bannerData[0]} onClick={handleRedirectMenu} />
      <div className="container flex flex-col items-center space-y-5">
        <div className="w-20 h-1 bg-black dark:bg-white" />
        <h2 className="text-center primary_title">
          {configData?.restaurant_name}
        </h2>
        <ButtonUI
          size="xl"
          className="dark:text-white px-7"
          variant="bordered"
          onClick={handleRedirectMenu}
        >
          Order Now
        </ButtonUI>
      </div>
      <MobilePopup
        playStoreLink={playStoreLink}
        appStoreLink={appStoreLink}
        restaurantName={configData?.restaurant_name}
      />
    </>
  );
}

export default Banner;

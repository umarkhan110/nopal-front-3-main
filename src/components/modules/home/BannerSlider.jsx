import { Fragment } from "react";
import { SwiperSlide } from "swiper/react";
import { EffectFade, Pagination, Autoplay } from "swiper/modules";
import ButtonUI from "@/components/common/ButtonUI";
import NextImage from "@/components/common/NextImage";
import { useStore } from "@/store/store";
import ReactSlider from "@/components/common/ReactSlider";
import { bannerImageBaseUrl } from "@/config/constant";

const BannerSlider = ({ bannerData, onClick }) => {
  const { user } = useStore();

  return (
    <>
      <ReactSlider
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop={true}
        effect={"fade"}
        modules={[Autoplay, EffectFade, Pagination]}
      >
        {bannerData?.image?.map((items, index) => {
          const first_title = bannerData?.title
            ?.split(" ")
            ?.splice(0, 2)
            ?.join(" ");
          const second_title = bannerData?.title?.split(" ")?.splice(2);
          return (
            <Fragment key={index}>
              <SwiperSlide>
                <div className="relative w-full">
                  <div
                    className={`relative w-full h-96 sm:h-[500px] ${
                      user?.id
                        ? "md:h-[calc(100vh-80px)]"
                        : "md:h-[calc(100vh-120px)]"
                    }`}
                  >
                    <NextImage
                      src={`${bannerImageBaseUrl}${items}`}
                      alt={bannerData?.title}
                      className="object-cover"
                    />
                  </div>
                  <div className="absolute top-0 flex flex-col justify-center w-full h-full bg-black/20">
                    <div className="container">
                      <div className="space-y-5">
                        <div className="w-20 h-1 bg-white" />
                        <h1 className="text-white primary_title">
                          {first_title}
                          <br />
                          {second_title}
                        </h1>
                        <h3 className="text-lg font-bold text-white">
                          {bannerData?.description}
                        </h3>
                        <div className="flex gap-4">
                          <ButtonUI
                            size="xl"
                            className="w-full px-8 sm:w-auto"
                            onClick={onClick}
                          >
                            Order Now
                          </ButtonUI>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            </Fragment>
          );
        })}
      </ReactSlider>
    </>
  );
};

export default BannerSlider;

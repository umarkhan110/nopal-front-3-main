import ButtonUI from "@/components/common/ButtonUI";
import NextImage from "@/components/common/NextImage";
import { useRouter } from "next/navigation";

const CateringSection = () => {
  const router = useRouter();
  return (
    <>
      <div className="relative w-full">
        <div className="relative w-full h-[300px] md:h-[400px] lg:h-[500px]">
          <NextImage
            src="/images/catering.png"
            alt="lowerBanner"
            className="object-cover"
          />
        </div>
        <div className="container absolute top-0 flex flex-col items-center justify-end h-full pb-4 md:pb-8 lg:pb-12">
          {/* <h2 className="text-white primary_title">Catering & Events</h2>
          <h3 className="max-w-lg mt-5 font-bold text-white md:text-xl">
            Spice up your corporate and private events with Talkin' Tacos! Our
            flavorful and festive catering services bring the fiesta to your
            workplace and private events, ensuring a memorable experience for
            all your colleagues and family!
          </h3> */}
          <ButtonUI
            size="lg"
            variant="bordered"
            className="w-full mt-8 text-white sm:w-auto sm:px-20"
            onClick={() => router.push("/contact-us")}
          >
            Arrange Your Fiesta!
          </ButtonUI>
        </div>
      </div>
    </>
  );
};

export default CateringSection;

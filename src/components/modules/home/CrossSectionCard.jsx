"use client";

import ButtonUI from "@/components/common/ButtonUI";
import NextImage from "@/components/common/NextImage";
import { getBannerImageBaseUrl } from "@/utils/imagesPath";
import { useRouter } from "next/navigation";
import Link from "next/link";

const CrossSectionCard = ({ items, playStoreLink, appStoreLink, index }) => {
  const router = useRouter();
  const bannerImageBaseUrl = getBannerImageBaseUrl();
  return (
    <>
      <div
        className={`flex ${
          index % 2 === 0
            ? "flex-col lg:flex-row"
            : "flex-col lg:flex-row-reverse"
        } gap-8 lg:gap-16 ${index > 0 ? "mt-10 lg:mt-28" : ""}`}
        key={index}
      >
        {(playStoreLink || appStoreLink) && items?.is_mobile_view === 1 ? (
          <div className="min-w-[50%] p-10 apps_linearBg center rounded-md">
            <div className="relative w-96 h-80 md:h-96">
              <NextImage
                src={`${bannerImageBaseUrl}${items?.image[0]}`}
                alt={items?.title}
                className="object-contain rounded-md"
              />
            </div>
          </div>
        ) : items?.is_mobile_view === 0 ? (
          <div className="relative min-w-[50%] h-64 sm:h-80 md:h-96 lg:h-[500px]">
            <NextImage
              src={`${bannerImageBaseUrl}${items?.image[0]}`}
              alt={items?.title}
              className={`rounded-md object-cover`}
            />
          </div>
        ) : null}
        <div>
          {((items?.is_mobile_view === 1 && (playStoreLink || appStoreLink)) ||
            items?.is_mobile_view === 0) && (
            <>
              <h2 className="primary_title">{items.title}</h2>
              <p className="mt-6 text-xl lg:text-2xl textSecondary_lightDark">
                {items.description}
              </p>
              {items?.button_text && (
                <ButtonUI
                  fullWidth
                  size="xl"
                  variant="bordered"
                  className="max-w-full mt-10 dark:text-white md:max-w-sm"
                  onClick={() => router.push(items.button_link)}
                >
                  {items.button_text}
                </ButtonUI>
              )}
            </>
          )}
          {(playStoreLink || appStoreLink) && items?.is_mobile_view === 1 ? (
            <div className="flex flex-col items-center gap-4 mt-5 xs:flex-row">
              {playStoreLink && (
                <Link href={playStoreLink} target="_blank">
                  <div className="relative h-12 w-36">
                    <NextImage
                      src="/images/playStore.png"
                      alt="googlePlay"
                      className="rounded-md"
                    />
                  </div>
                </Link>
              )}
              {appStoreLink && (
                <Link href={appStoreLink} target="_blank">
                  <div className="relative h-12 w-36">
                    <NextImage
                      src="/images/appStore.png"
                      alt="appleStore"
                      className="rounded-md"
                    />
                  </div>
                </Link>
              )}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default CrossSectionCard;

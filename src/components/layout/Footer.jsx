"use client";

import React from "react";
import Link from "next/link";
import ButtonUI from "../common/ButtonUI";
import {
  FbIcon,
  InstIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@/config/data/Icons";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/store";
import PrivacyLinks from "./PrivacyLinks";
import { footerPagesData } from "@/config/data";
import LocationModal from "../modules/home/LocationModal";
import { useDisclosure } from "@nextui-org/react";

const Footer = ({ configData }) => {
  const currentPathname = usePathname();
  const locationModalState = useDisclosure();
  const { currentBranch } = useStore();

  const fbLink = configData?.social_media_link?.find(
    (items) => items?.name === "facebook"
  )?.link;
  const instLink = configData?.social_media_link?.find(
    (items) => items?.name === "instagram"
  )?.link;
  const twitterLink = configData?.social_media_link?.find(
    (items) => items?.name === "twitter"
  )?.link;
  const linkedinLink = configData?.social_media_link?.find(
    (items) => items?.name === "linkedin"
  )?.link;

  return (
    <>
      <div className={`container ${currentPathname !== "/" && "mt-10"}`}>
        <div className="grid gap-5 py-8 border-t border-b md:grid-cols-12 border_lightDark">
          {fbLink || instLink || twitterLink || linkedinLink ? (
            <div className="col-span-4 lg:col-span-5">
              <h3 className="text-xl font-bold">Social</h3>
              <div className="flex items-center mt-5">
                {fbLink && (
                  <Link href={fbLink} target="_blank">
                    <ButtonUI
                      isIconOnly
                      variant="light"
                      size="sm"
                      color="default"
                    >
                      <FbIcon />
                    </ButtonUI>
                  </Link>
                )}
                {instLink && (
                  <Link href={instLink} target="_blank">
                    <ButtonUI
                      isIconOnly
                      variant="light"
                      size="sm"
                      color="default"
                    >
                      <InstIcon />
                    </ButtonUI>
                  </Link>
                )}
                {twitterLink && (
                  <Link href={twitterLink} target="_blank">
                    <ButtonUI
                      isIconOnly
                      variant="light"
                      size="sm"
                      color="default"
                    >
                      <TwitterIcon />
                    </ButtonUI>
                  </Link>
                )}
                {linkedinLink && (
                  <Link href={linkedinLink} target="_blank">
                    <ButtonUI
                      isIconOnly
                      variant="light"
                      size="sm"
                      color="default"
                    >
                      <LinkedinIcon />
                    </ButtonUI>
                  </Link>
                )}
              </div>
            </div>
          ) : null}
          {currentBranch?.id && (
            <div className="col-span-6 lg:col-span-5">
              <h3 className="text-xl font-bold">Get in touch</h3>
              <ul className="mt-5 space-y-2">
                <li className="flex flex-col items-start md:flex-row md:items-center">
                  <div className="font-semibold md:min-w-24">Call:</div>
                  <div className="textSecondary_lightDark">
                    <a href={`tel:${currentBranch.phone}`}>
                      {currentBranch.phone}
                    </a>
                  </div>
                </li>
                {/* <li className="flex flex-col items-start md:flex-row md:items-center">
                  <div className="font-semibold md:min-w-24">Email:</div>
                  <div className="textSecondary_lightDark">
                    <a href={`mailto:${currentBranch.email}`}>
                      {currentBranch.email}
                    </a>
                  </div>
                </li> */}
                <li className="flex flex-col items-start md:flex-row">
                  <div className="font-semibold md:min-w-24">Address:</div>
                  <div className="textSecondary_lightDark max-w-60">
                    <a
                      href={`https://www.google.com/maps?q=${currentBranch?.latitude},${currentBranch?.longitude}`}
                      target="_blank"
                    >
                      {currentBranch.address}
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          )}
          <div className="col-span-2">
            <h3 className="text-xl font-bold">Pages</h3>
            <ul className="mt-5 space-y-2">
              {footerPagesData.map((items) => (
                <li
                  className="font-semibold textSecondary_lightDark hover:underline w-fit"
                  key={items.label}
                >
                  <Link href={items.link}>{items.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col justify-between py-8 md:items-center md:flex-row">
          <ul className="flex flex-col gap-2 md:gap-6 md:flex-row">
            <PrivacyLinks />
          </ul>
          <span className="mt-5 font-semibold text-primary md:mt-0">
            <Link href="https://cafescale.com" target="_blank">
              Made with Cafescale.com
            </Link>
          </span>
        </div>
      </div>
      {currentPathname === "/menu" && <div className="block h-28 md:hidden" />}
      <LocationModal
        branches={configData?.branches}
        isOpen={locationModalState.isOpen}
        onOpenChange={locationModalState.onOpenChange}
        onClose={locationModalState.onClose}
      />
    </>
  );
};

export default Footer;

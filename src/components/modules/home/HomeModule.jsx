"use client";

import { useQuery } from "@tanstack/react-query";
import Banner from "./Banner";
import CateringSection from "./CateringSection";
import CrossSection from "./CrossSection";
import HomeLocations from "./HomeLocations";
import LocationModal from "./LocationModal";
import { useDisclosure } from "@nextui-org/react";
// import { getAllConfigDataRequest } from "@/config/api/server/menu.api";
import useHomeQuery from "@/hooks/use-home-query";

const HomeModule = () => {
  const  { data } = useHomeQuery()
  const configData = data;
  // const { data:configData } = useQuery(useHomeQuery())
  const locationModalState = useDisclosure();
console.log("line 17",data)
  return (
    <>
      <div className="space-y-10 md:space-y-20">
        <Banner
          configData={configData}
          locationModalState={locationModalState}
        />
        <CrossSection
          configData={configData}
          locationModalState={locationModalState}
        />
        <CateringSection />
        <HomeLocations
          branches={configData?.branches}
          coordinates={configData?.restaurant_location_coverage}
          locationModalState={locationModalState}
        />
      </div>
      <LocationModal
        branches={configData?.branches}
        isOpen={locationModalState.isOpen}
        onOpenChange={locationModalState.onOpenChange}
        onClose={locationModalState.onClose}
      />
    </>
  );
};

export default HomeModule;

"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { navList } from "@/config/data";
import ButtonUI from "../common/ButtonUI";
import { ShoppingCart } from "lucide-react";
import Sidebar from "./Sidebar";
import { usePathname } from "next/navigation";
import { useStore } from "@/store/store";
import { useQuery } from "@tanstack/react-query";
import Services from "@/config/services";
import CheckoutSidebar from "../modules/cart/checkout/CheckoutSidebar";
import SignUpSidebar from "../modules/auth/SignUpSidebar";
import WebLogo from "../common/WebLogo";
import BottomNav from "./BottomNav";
import NavRightContent from "./NavRightContent";
import LocationModal from "../modules/home/LocationModal";
import { useDisclosure } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import useHomeQuery from "@/hooks/use-home-query";

const Navbar = ({ configData }) => {
  const locationModalState = useDisclosure();
  const currentPathname = usePathname();
  const router = useRouter();

  const { user, cartItems, setConfigData, currentBranch, setCurrentBranch } =
    useStore();

  let filteredNavList = navList.filter(
    (items) =>
      user?.id || (items.link !== "/orders" && items.link !== "/rewards")
  );

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isCheckoutSidebarOpen, setIsCheckoutSidebarOpen] = useState(false);
  const [isAuthSidebarOpen, setIsAuthSidebarOpen] = useState(false);

  // const { data, isSuccess, isLoading } = useQuery({
  //   queryKey: ["config"],
  //   queryFn: () => Services.getAllConfigData(),
  // });

  const  { data, isSuccess, isLoading } = useHomeQuery()
  console.log("line 18",data)

  const handleCartClick = () => {
    setIsCheckoutSidebarOpen(true);
  };

  // *set config data in the global state and first branch if not selected
  useEffect(() => {
    if (isSuccess) {
      setConfigData(data);
      if (
        currentBranch &&
        data?.branches?.filter((items) => items.id === currentBranch?.id)
          ?.length > 0
      ) {
        setCurrentBranch(currentBranch);
      } else if (
        data?.branches?.filter((items) => items.id !== currentBranch?.id)
          ?.length > 0
      ) {
        setCurrentBranch(data?.branches[0]);
      }
    }
  }, [isSuccess]);

  const handleRedirectMenu = () => {
    if (configData?.branches?.length > 1) {
      locationModalState.onOpen();
    } else {
      router.push("/menu");
    }
  };

  return (
    <>
      <nav className="sticky top-0 z-40 w-full bg-white shadow dark:bg-dark">
        <div className="container flex items-center justify-between h-20 transition-all">
          <div className="flex items-center gap-4 lg:gap-8">
            <WebLogo />
            <div className="hidden md:block">
              <ul className="flex items-center gap-4 lg:gap-8 list_items">
                {filteredNavList.map((items, index) => (
                  <li key={index} className="text-sm">
                    <Link
                      href={items.link}
                      className={`text-sm ${
                        currentPathname === items.link ? "text-primary" : ""
                      }`}
                    >
                      {items.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <NavRightContent
            setIsSidebarOpen={setIsSidebarOpen}
            setIsCheckoutSidebarOpen={setIsCheckoutSidebarOpen}
            setIsAuthSidebarOpen={setIsAuthSidebarOpen}
            onClick={handleRedirectMenu}
          />
        </div>
      </nav>
      {!user?.id && configData?.ongoing_offer_text && (
        <BottomNav
          isLoading={isLoading}
          content={configData?.ongoing_offer_text}
          setIsAuthSidebarOpen={setIsAuthSidebarOpen}
        />
      )}
      {currentPathname === "/menu" && (
        <div className="fixed bottom-0 z-50 block w-full p-5 border-t bgSecondary_lightDark md:hidden border_lightDark">
          <ButtonUI
            fullWidth
            size="lg"
            startContent={<ShoppingCart />}
            onClick={handleCartClick}
          >
            Cart {cartItems?.length > 0 && `(${cartItems?.length})`}
          </ButtonUI>
        </div>
      )}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        setIsAuthSidebarOpen={setIsAuthSidebarOpen}
        navList={filteredNavList}
        currentPathname={currentPathname}
        userId={user?.id}
      />
      <CheckoutSidebar
        isCheckoutSidebarOpen={isCheckoutSidebarOpen}
        setIsCheckoutSidebarOpen={setIsCheckoutSidebarOpen}
      />
      <SignUpSidebar
        isAuthSidebarOpen={isAuthSidebarOpen}
        setIsAuthSidebarOpen={setIsAuthSidebarOpen}
      />
      <LocationModal
        branches={configData?.branches}
        isOpen={locationModalState.isOpen}
        onOpenChange={locationModalState.onOpenChange}
        onClose={locationModalState.onClose}
      />
    </>
  );
};

export default Navbar;

import React, { useEffect } from "react";
import { useDisclosure, Switch } from "@nextui-org/react";
import ButtonUI from "../common/ButtonUI";
import { Menu, MoonIcon, SunIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { CartIcon } from "@/config/data/Icons";
import { useStore } from "@/store/store";
import { useTheme } from "next-themes";
import UserMenu from "./UserMenu";
import dayjs from "dayjs";

const NavRightContent = ({
  setIsSidebarOpen,
  setIsCheckoutSidebarOpen,
  setIsAuthSidebarOpen,
  onClick,
}) => {
  const currentPathname = usePathname();
  const logoutModalState = useDisclosure();
  const { user, cartItems } = useStore();
  const { theme, setTheme } = useTheme();

  const handleCartClick = () => {
    setIsCheckoutSidebarOpen(true);
  };

  // Change theme every 12 hours
  const shouldSwitchTheme = () => {
    const currentHour = dayjs().hour();
    return currentHour >= 12;
  };

  // useEffect(() => {
  //   const theme = shouldSwitchTheme() ? "dark" : "light";
  //   setTheme(theme);
  // }, []);
  return (
    <>
      <div className="flex items-center gap-4">
        <Switch
          startContent={<SunIcon />}
          endContent={<MoonIcon />}
          isSelected={theme === "dark" ? true : false}
          onValueChange={(e) => setTheme(e ? "dark" : "light")}
        />
        {!user?.id && currentPathname === "/menu" && (
          <div className="hidden md:block">
            <ButtonUI
              color="default"
              variant="light"
              onClick={() => setIsAuthSidebarOpen(true)}
            >
              Login
            </ButtonUI>
          </div>
        )}
        <div className="hidden md:block">
          {currentPathname === "/menu" && (
            <ButtonUI startContent={<CartIcon />} onClick={handleCartClick}>
              Cart {cartItems?.length > 0 && `(${cartItems?.length})`}
            </ButtonUI>
          )}
          {currentPathname !== "/menu" && (
            <ButtonUI onClick={onClick}>Order Now</ButtonUI>
          )}
        </div>
        {user?.id && (
          <UserMenu user={user} logoutModalState={logoutModalState} />
        )}
        <div className="block md:hidden">
          <ButtonUI
            isIconOnly
            variant="light"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu />
          </ButtonUI>
        </div>
      </div>
    </>
  );
};

export default NavRightContent;

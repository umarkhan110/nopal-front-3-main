import { getUserImageBaseUrl } from "@/utils/imagesPath";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  useDisclosure,
} from "@nextui-org/react";
import Link from "next/link";
import LogoutModal from "../modules/auth/LogoutModal";

const UserMenu = ({ user }) => {
  const userImageBaseUrl = getUserImageBaseUrl();
  const logoutModalState = useDisclosure();

  return (
    <>
      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            showFallback
            as="button"
            size="sm"
            className="transition-transform"
            src={
              user?.image
                ? `${userImageBaseUrl}${user?.image}`
                : "/images/user.png"
            }
            alt={user?.f_name}
          />
        </DropdownTrigger>
        <DropdownMenu aria-label="Profile Actions" variant="flat">
          {user?.email && (
            <DropdownItem key="profile" className="gap-2 h-14">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">{user?.email}</p>
            </DropdownItem>
          )}
          <DropdownItem key="settings">
            <Link href="/profile" className="block">
              My Profile
            </Link>
          </DropdownItem>
          <DropdownItem key="coupons">
            <Link href="/coupons" className="block">
              Coupons
            </Link>
          </DropdownItem>
          <DropdownItem key="orders">
            <Link href="/orders" className="block">
              Orders
            </Link>
          </DropdownItem>
          <DropdownItem
            key="logout"
            color="danger"
            onClick={() => logoutModalState.onOpen()}
          >
            Log Out
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
      <LogoutModal
        isOpen={logoutModalState.isOpen}
        onOpenChange={logoutModalState.onOpenChange}
        onClose={logoutModalState.onClose}
      />
    </>
  );
};

export default UserMenu;

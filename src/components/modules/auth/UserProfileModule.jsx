"use client";

import { useEffect, useRef, useState } from "react";
import ButtonUI from "@/components/common/ButtonUI";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import useImageUploadAndPreview from "@/hooks/useImageUploadAndPreview";
import Services from "@/config/services";
import { useStore } from "@/store/store";
import { errorToast, successToast } from "@/utils/toaster";
import InputUI from "@/components/common/InputUI";
import SpinnerUI from "@/components/common/SpinnerUI";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { Avatar, useDisclosure } from "@nextui-org/react";
import { getUserImageBaseUrl } from "@/utils/imagesPath";
import DeleteModal from "@/components/common/DeleteModal";
import { useRouter } from "next/navigation";
import PhoneInputUI from "@/components/common/PhoneInputUI";
import { showFormattedPhoneNumber } from "@/utils/formatHelper";

const UserProfileModule = () => {
  const router = useRouter();
  const imageRef = useRef(null);
  const userImageBaseUrl = getUserImageBaseUrl();
  const deleteModalState = useDisclosure();
  const { user, setUser, logout } = useStore();
  const { setStorageItem } = useLocalStorage();
  const { handleSubmit, setValue, control } = useForm();
  const { handleFileChange, imageUrl } = useImageUploadAndPreview();

  const [updateProfileLoading, setUpdateProfileLoading] = useState(false);
  const [deleteAccountLoading, setDeleteAccountLoading] = useState(false);

  // *For getting user info
  const getUserInfoRequest = async () => {
    try {
      const response = await Services.getUserInfo();
      if (response?.id) {
        setStorageItem("user", response);
        setUser(response);
      }
    } catch (error) {
      errorToast(error);
    }
  };

  const handleProfileSubmit = async (data) => {
    const formData = new FormData();
    imageUrl && formData.append("image", imageUrl);
    for (var key in data) {
      formData.append(key, data[key]);
    }

    setUpdateProfileLoading(true);
    try {
      const response = await Services.updateProfile(formData);
      if (response?.message) {
        successToast(response.message);
        getUserInfoRequest();
      }
    } catch (error) {
      errorToast(error);
    } finally {
      setUpdateProfileLoading(false);
    }
  };

  const deleteAccountRequest = async () => {
    setDeleteAccountLoading(true);
    try {
      const response = await Services.deleteAccount();
      if (response?.status_code === 200) {
        successToast(response.message);
        logout();
        deleteModalState.onClose();
        router.push("/");
      }
    } catch (error) {
      errorToast(error?.message);
    } finally {
      setDeleteAccountLoading(false);
    }
  };

  const setDefaultValues = (userData) => {
    setValue("f_name", userData?.f_name);
    setValue("l_name", userData?.l_name);
    setValue("email", userData?.email);
    setValue("phone", showFormattedPhoneNumber(userData?.phone));
  };

  useEffect(() => {
    if (user?.id) {
      setDefaultValues(user);
    }
  }, [user?.id]);
  return (
    <>
      <div className="container mt-10">
        <div className="p-5 lg:p-10 rounded-2xl bgSecondary_lightDark">
          {!user?.id ? (
            <SpinnerUI />
          ) : (
            <div className="flex flex-col items-center">
              <div className="group relative w-[100px] h-[100px]">
                <div
                  className="absolute top-0 right-0 z-10 invisible w-full h-full rounded-full cursor-pointer center bg-black/50 group-hover:visible"
                  onClick={() => imageRef.current?.click()}
                >
                  <Camera size={30} className="textSecondary_lightDark" />
                </div>
                {imageUrl ? (
                  <Avatar
                    src={imageUrl}
                    className="object-cover w-full h-full"
                    alt={user?.f_name}
                    isBordered
                  />
                ) : (
                  <Avatar
                    isBordered
                    showFallback
                    className="object-cover w-full h-full"
                    src={`${userImageBaseUrl}${user.image}`}
                    alt={user?.f_name}
                  />
                )}
              </div>
              <input
                ref={imageRef}
                type="file"
                hidden
                onChange={handleFileChange}
              />
              {user?.f_name && (
                <h1 className="mt-5 text-2xl font-bold md:text-3xl">
                  {`${user?.f_name} ${user?.l_name}`}
                </h1>
              )}
              <form
                className="w-full mx-auto mt-10 md:mt-20"
                onSubmit={handleSubmit(handleProfileSubmit)}
              >
                <div className="grid gap-5 sm:grid-cols-2 md:gap-x-20">
                  <InputUI
                    name="f_name"
                    label="First Name"
                    placeholder="Enter first name"
                    placement="outside"
                    size="lg"
                    control={control}
                  />
                  <InputUI
                    name="l_name"
                    label="Last Name"
                    placeholder="Enter last name"
                    placement="outside"
                    size="lg"
                    control={control}
                  />
                  <InputUI
                    name="email"
                    label="Email"
                    placeholder="Enter email"
                    placement="outside"
                    size="lg"
                    disabled={user?.email}
                    control={control}
                  />
                  <PhoneInputUI
                    name="phone"
                    label="Phone"
                    placement="outside"
                    size="lg"
                    disabled
                    control={control}
                  />
                </div>
                <div className="flex flex-col items-center gap-4 mt-7 md:mt-14">
                  <ButtonUI
                    color="danger"
                    size="lg"
                    className="w-full md:w-fit md:px-28"
                    onClick={() => deleteModalState.onOpen()}
                    disabled={updateProfileLoading}
                  >
                    Delete Account
                  </ButtonUI>
                  <ButtonUI
                    size="lg"
                    className="w-full md:w-fit md:px-28"
                    type="submit"
                    isLoading={updateProfileLoading}
                  >
                    Update Profile
                  </ButtonUI>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
      <DeleteModal
        isOpen={deleteModalState.isOpen}
        onOpenChange={deleteModalState.onOpenChange}
        onClose={deleteModalState.onClose}
        onClick={deleteAccountRequest}
        loading={deleteAccountLoading}
      />
    </>
  );
};

export default UserProfileModule;

"use client";

import NextImage from "@/components/common/NextImage";
import { useMutation } from "@tanstack/react-query";
import { errorToast, successToast } from "@/utils/toaster";
import { getProductImageBaseUrl } from "@/utils/imagesPath";
import Services from "@/config/services";
import { Heart } from "lucide-react";

const FavoritesCard = ({ items, isFavorites, userId }) => {
  const productImageBaseUrl = getProductImageBaseUrl();
  const { mutate } = useMutation({
    mutationFn: Services.addWishlist,
    onSuccess: (data) => {
      successToast(data.message);
    },
    onError: (data) => {
      errorToast(data);
    },
  });

  const handleAddWishlistRequest = (id) => {
    mutate({ product_id: id });
  };
  return (
    <>
      <div className="flex items-center justify-between p-4 border rounded-lg border_lightDark">
        <div className="flex gap-5">
          <div className="relative min-w-[100px] h-[100px]">
            <NextImage
              src={`${productImageBaseUrl}${items?.image}`}
              className="object-cover rounded-lg"
              alt={items?.name}
            />
          </div>
          <div className="space-y-1">
            <h3 className="text-xl font-semibold">{items?.name}</h3>
            {userId && (
              <h6 className="textSecondary_lightDark">
                {items?.loyalty_points} hearts
              </h6>
            )}
          </div>
        </div>
        {isFavorites && (
          <div>
            <Heart
              size={40}
              className={`cursor-pointer text-primary hover:fill-primary ${
                isFavorites && "fill-primary"
              }`}
              onClick={() =>
                isFavorites ? null : handleAddWishlistRequest(items?.id)
              }
            />
          </div>
        )}
      </div>
    </>
  );
};

export default FavoritesCard;

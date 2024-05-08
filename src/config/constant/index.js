export const metaTitle = "Nopal Dos";
export const metaDescription = "best restaurant in USA";
export const ogImage = "/images/logo.svg";
export const siteURL = "http://nopaldos.com";

export const passwordValidations =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{6,}$/;
export const emailValidations = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
export const phoneValidations =
  /^\+?1?[- ]?\(?([0-9]{3})\)?[- ]?([0-9]{3})[- ]?([0-9]{4})$/;
export const baseID = process.env.NEXT_PUBLIC_RESTAURANT_ID;
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const stripePublishableKey =
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
export const connectedAccountId =
  process.env.NEXT_PUBLIC_STRIPE_CONNECT_ACCOUNT_ID;
export const productImageBaseUrl = `https://storage.googleapis.com/cafescale_restaurants_backend_bucket/product/restaurant_id_${baseID}/`;
export const bannerImageBaseUrl =
  "https://storage.googleapis.com/cafescale_restaurants_backend_bucket/banner/";
export const userImageBaseUrl =
  "http://cafescale.site/storage/app/public/profile/";

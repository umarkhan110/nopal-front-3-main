import CheckoutModuleMain from "@/components/modules/cart/checkout/CheckoutModuleMain";
import {
  getAllConfigDataRequest,
  getAllPopularItems,
} from "@/config/api/server/menu.api";
import CartFormProvider from "@/config/provider/CartFormProvider";
import CartPaymentElementProvider from "@/config/provider/CartPaymentElementProvider";

async function CheckoutNewMain() {
  const [{ products }, configData] = await Promise.all([
    getAllPopularItems(),
    getAllConfigDataRequest(),
  ]);
  return (
    <>
      <CartFormProvider>
        <CartPaymentElementProvider configData={configData}>
          <CheckoutModuleMain popularItems={products} configData={configData} />
        </CartPaymentElementProvider>
      </CartFormProvider>
    </>
  );
}

export default CheckoutNewMain;

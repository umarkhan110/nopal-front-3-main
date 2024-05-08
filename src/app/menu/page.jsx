import MenuModuleMain from "@/components/modules/menu/MenuModuleMain";
import {
  getAllCategoriesData,
  getAllCategoriesList,
  getAllPopularItems,
} from "@/config/api/server/menu.api";

export const metadata = {
  title: "Menu",
};

async function MenuMain() {
  const [categoriesList, popularItemsList, allCategoriesData] =
    await Promise.all([
      getAllCategoriesList(),
      getAllPopularItems(),
      getAllCategoriesData(),
    ]);
  return (
    <>
      <MenuModuleMain
        categoriesList={categoriesList}
        popularItemsList={popularItemsList}
        allCategoriesData={allCategoriesData}
      />
    </>
  );
}

export default MenuMain;

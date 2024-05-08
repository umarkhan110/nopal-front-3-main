import CrossSectionCard from "./CrossSectionCard";

const CrossSection = ({ configData }) => {
  const playStoreLink = configData?.play_store_config?.link;
  const appStoreLink = configData?.play_store_config?.link;
  const crossSectionData = configData?.banner_for_restaurant_web_app?.filter(
    (items) =>
      items?.banner_type === "simple" || items?.banner_type === "product"
  );

  return (
    <>
      <div className="container">
        {crossSectionData?.map((items, index) => (
          <CrossSectionCard
            key={index}
            items={items}
            playStoreLink={playStoreLink}
            appStoreLink={appStoreLink}
            index={index}
          />
        ))}
      </div>
    </>
  );
};

export default CrossSection;

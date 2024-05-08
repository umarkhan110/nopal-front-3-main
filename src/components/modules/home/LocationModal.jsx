import ModalUI from "@/components/common/ModalUI";
import ButtonUI from "@/components/common/ButtonUI";
import { LocationIcon, PhoneIcon } from "@/config/data/Icons";
import { useStore } from "@/store/store";
import { useRouter } from "next/navigation";

const LocationModal = ({ branches, isOpen, onOpenChange, onClose }) => {
  const router = useRouter();
  const { currentBranch, setCurrentBranch } = useStore();

  const handleSetCurrentBranch = (branch) => {
    setCurrentBranch(branch);
    onClose();
    router.push("/menu");
  };
  return (
    <>
      <ModalUI
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton={true}
        size="xl"
        className="py-6"
      >
        <div>
          <h2 className="text-3xl font-bold">Select a location</h2>
          <div className="">
            {branches?.map((items) => (
              <div
                className={`flex flex-col justify-between gap-5 py-5 border-b last:border-b-0 sm:items-center sm:flex-row ${
                  currentBranch?.id === items?.id && "border-primary"
                }`}
                key={items?.id}
              >
                <div>
                  <h2 className="text-lg font-bold">{items?.name}</h2>
                  <div className="mt-5 space-y-3">
                    {items?.phone && (
                      <div className="flex items-center gap-3">
                        <PhoneIcon />
                        <a
                          href={`tel:${items.phone}`}
                          className="textSecondary_lightDark"
                        >
                          {items.phone}
                        </a>
                      </div>
                    )}
                    <div className="flex items-start gap-1">
                      <LocationIcon />
                      <a
                        href={`https://www.google.com/maps?q=${items?.latitude},${items?.longitude}`}
                        target="_blank"
                        className="textSecondary_lightDark"
                      >
                        {items.address}
                      </a>
                    </div>
                  </div>
                </div>
                <ButtonUI
                  size="lg"
                  onClick={() => handleSetCurrentBranch(items)}
                >
                  Select
                </ButtonUI>
              </div>
            ))}
          </div>
        </div>
      </ModalUI>
    </>
  );
};

export default LocationModal;

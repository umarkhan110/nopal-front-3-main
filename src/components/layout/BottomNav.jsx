import { MoveRight } from "lucide-react";

const BottomNav = ({ content, setIsAuthSidebarOpen }) => {
  return (
    <>
      <div className="p-2 bg-primary center">
        <div
          className="gap-2 text-center text-white cursor-pointer w-fit center"
          onClick={() => setIsAuthSidebarOpen(true)}
        >
          <h2 className="font-normal">{content}</h2>
          <div>
            <MoveRight />
          </div>
        </div>
      </div>
    </>
  );
};

export default BottomNav;

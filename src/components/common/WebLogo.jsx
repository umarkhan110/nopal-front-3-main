import NextImage from "./NextImage";
import Link from "next/link";

const WebLogo = ({ className }) => {
  return (
    <>
      <Link href="/">
        <div className={`relative ${className ?? "w-12 h-16"}`}>
          <NextImage src="/images/logo.svg" alt="Nopal-Dos-logo" />
        </div>
      </Link>
    </>
  );
};

export default WebLogo;

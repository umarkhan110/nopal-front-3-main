// import useHomeQuery from "@/hooks/use-home-query";
import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ children }) => {
  // const  { data } = useHomeQuery()
  // const configData = data;
  return (
    <>
      <Navbar  />
      <div className="viewport_height">{children}</div>
      <Footer  />
    </>
  );
};

export default Layout;

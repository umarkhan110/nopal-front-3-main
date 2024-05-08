import Footer from "./Footer";
import Navbar from "./Navbar";

const Layout = ({ configData, children }) => {
  return (
    <>
      <Navbar configData={configData} />
      <div className="viewport_height">{children}</div>
      <Footer configData={configData} />
    </>
  );
};

export default Layout;

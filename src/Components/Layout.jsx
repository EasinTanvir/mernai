import Navbars from "./Navbars";

const Layout = ({ children }) => {
  return (
    <div className="mains">
      <Navbars />

      <main>{children}</main>
    </div>
  );
};

export default Layout;

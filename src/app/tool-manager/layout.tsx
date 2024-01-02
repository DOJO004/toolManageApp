import Navbar from "../ui/navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-2 md:flex">
      <div className="m-2 mx-auto md:mx-0">
        <Navbar />
      </div>
      <div className="m-2 mx-auto ">{children}</div>
    </div>
  );
};

export default Layout;

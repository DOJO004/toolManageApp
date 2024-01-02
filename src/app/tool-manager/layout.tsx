import Navbar from "../ui/navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className=" md:flex">
      <div className="max-w-xl m-2 mx-auto md:mx-0">
        <Navbar />
      </div>
      <div className="max-w-xl m-2 mx-auto md:mx-auto">{children}</div>
    </div>
  );
};

export default Layout;

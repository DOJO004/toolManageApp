import Navbar from "../ui/navbar/navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="md:flex">
      <div className="m-2">
        <Navbar />
      </div>
      <div className="m-2 md:w-full">{children}</div>
    </div>
  );
};

export default Layout;

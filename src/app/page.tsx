import Navbar from "@/ui/navbar/page";
import ToolStatus from "@/app/toolStatus/page";

export default function Home() {
  return (
    <div className="bg-gray-800 p-2">
      <Navbar />
      <ToolStatus />
    </div>
  );
}

import { ReceiveToolSkeleton } from "@/app/components/skeletons";

export default function Loading() {
  return (
    <div className="w-full max-w-4xl">
      <ReceiveToolSkeleton />
    </div>
  );
}

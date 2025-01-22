import { Skeleton } from "@/components/ui/skeleton";

const WritePageSekeleton = () => {
  return (
    <div className="flex flex-col justify-center min-w-96 min-h-96 p-8 gap-4">
      <Skeleton className="w-full h-96" />
    </div>
  );
};

export default WritePageSekeleton;

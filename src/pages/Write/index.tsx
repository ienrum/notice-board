import Header, { HeaderHome, HeaderProfile } from "@/components/ui/header";
import DetailFormCard from "@/pages/Write/components/DetailFormCard";
import WritePageSekeleton from "@/pages/Write/components/WritePageSkeleton";
import { Suspense } from "react";

const WritePage = () => {
  return (
    <>
      <Header left={<HeaderHome />} right={<HeaderProfile />} />
      <Suspense fallback={<WritePageSekeleton />}>
        <div className="flex justify-center min-w-96 min-h-96 p-8 gap-4">
          <DetailFormCard />
        </div>
      </Suspense>
    </>
  );
};

export default WritePage;

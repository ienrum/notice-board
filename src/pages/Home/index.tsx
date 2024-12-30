import ThreadList from "@/pages/Home/components/ThreadList";
import ThreadPostFormModal from "@/pages/Home/components/ThreadPostModal";
import { Suspense } from "react";

const HomePage = () => {
  return (
    <div className="p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <ThreadList />
      </Suspense>
      <div className="p-4 flex justify-end">
        <ThreadPostFormModal />
      </div>
    </div>
  );
};

export default HomePage;

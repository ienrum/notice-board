import ThreadList from "@/pages/Home/components/ThreadList";
import { Suspense } from "react";

const Home = () => {
  return (
    <div className="p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <ThreadList />
      </Suspense>
    </div>
  );
};

export default Home;

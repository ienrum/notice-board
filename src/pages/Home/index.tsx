import Header, { HeaderProfile } from "@/components/ui/header";
import ThreadList from "@/pages/Home/components/ThreadList";
import ThreadPostFormModal from "@/pages/Home/components/ThreadPostModal";

const HomePage = () => {
  return (
    <>
      <Header right={<HeaderProfile />} />
      <div className="p-8">
        <ThreadList />
        <div className="p-4 flex justify-end">
          <ThreadPostFormModal />
        </div>
      </div>
    </>
  );
};

export default HomePage;

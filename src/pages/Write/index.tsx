import Header, { HeaderHome } from "@/components/ui/header";
import DetailFormCard from "@/pages/Write/components/DetailFormCard";

const WritePage = () => {
  return (
    <>
      <Header left={<HeaderHome />} />
      <div className="flex justify-center min-w-96 min-h-96 p-8 gap-4">
        <DetailFormCard />
      </div>
    </>
  );
};

export default WritePage;

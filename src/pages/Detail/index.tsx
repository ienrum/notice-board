import Header, { HeaderHome } from "@/components/ui/header";
import DetailCard from "@/pages/Detail/components/DetailCard";

const DetailPage = () => {
  return (
    <>
      <Header left={<HeaderHome />} />
      <div className="flex justify-center min-w-96 min-h-96 p-8 gap-4">
        <DetailCard />
      </div>
    </>
  );
};

export default DetailPage;
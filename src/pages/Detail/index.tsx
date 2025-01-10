import Header, { HeaderHome } from "@/components/ui/header";
import CommentForm from "@/pages/Detail/components/CommentForm";
import CommentList from "@/pages/Detail/components/CommentList";
import DetailCard from "@/pages/Detail/components/DetailCard";

const DetailPage = () => {
  return (
    <>
      <Header left={<HeaderHome />} />
      <div className="flex flex-col justify-center min-w-96 min-h-96 p-8 gap-4">
        <DetailCard />
        <CommentForm />
        <CommentList />
      </div>
    </>
  );
};

export default DetailPage;

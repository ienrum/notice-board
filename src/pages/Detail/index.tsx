import Header, { HeaderHome } from "@/components/ui/header";
import CommentForm from "@/pages/Detail/components/comment/CommentForm";
import CommentList from "@/pages/Detail/components/comment/CommentList";
import FileUpload from "@/pages/Detail/components/file-upload/FileUpload";
import DetailCard from "@/pages/Detail/components/thread/DetailCard";

const DetailPage = () => {
  return (
    <>
      <Header left={<HeaderHome />} />
      <div className="flex flex-col justify-center min-w-96 min-h-96 p-8 gap-4">
        <DetailCard />
        <FileUpload />
        <CommentForm />
        <CommentList />
      </div>
    </>
  );
};

export default DetailPage;

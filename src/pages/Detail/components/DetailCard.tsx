import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import UpdateDeleteDialog from "@/pages/Detail/components/UpdateDeleteDialog";
import { useFetchThread } from "@/pages/Home/apis/fetchThread";
import { useParams } from "react-router-dom";

const DetailCard = () => {
  const threadId = useParams().id as string;
  const {
    data: { title, content, author, isMyThread },
  } = useFetchThread(Number(threadId));

  return (
    <Card className="w-full p-8 flex ">
      <div className="flex flex-col w-[80%] gap-4 grow">
        <CardHeader>
          <CardTitle className=" text-3xl">{title}</CardTitle>
          <div className="flex gap-4 justify-between w-full pt-4">
            <p className="flex items-center">작성자: {author.name}</p>
            {isMyThread && <UpdateDeleteDialog />}
          </div>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default DetailCard;

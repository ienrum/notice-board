import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useFetchThread } from "@/pages/Home/apis/fetchThread";
import { useParams } from "react-router-dom";

const DetailCard = () => {
  const threadId = useParams().id as string;
  const {
    data: { title, content, author },
  } = useFetchThread(Number(threadId));

  return (
    <Card className="w-full p-8 flex ">
      <div className="flex flex-col w-[80%] gap-4 grow">
        <CardHeader>
          <CardTitle className=" text-3xl">{title}</CardTitle>
          <p className="w-full flex justify-end">작성자: {author}</p>
        </CardHeader>
        <CardContent>
          <p>{content}</p>
        </CardContent>
      </div>
    </Card>
  );
};

export default DetailCard;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { useDeleteThread } from "@/pages/Detail/apis/useDeleteThread";
import { useFetchThread } from "@/pages/Home/apis/fetchThread";
import { useNavigate, useParams } from "react-router-dom";

const DetailCard = () => {
  const threadId = useParams().id as string;
  const navigate = useNavigate();

  const {
    data: { title, content, author },
  } = useFetchThread(Number(threadId));
  const { mutate: deleteThread } = useDeleteThread(Number(threadId), () =>
    navigate("/")
  );

  const handleDelete = () => {
    deleteThread();
  };

  const handleUpdate = () => {
    navigate(`/write/${threadId}`);
  };

  return (
    <Card className="w-full p-8 flex ">
      <div className="flex flex-col w-[80%] gap-4 grow">
        <CardHeader>
          <CardTitle className=" text-3xl">{title}</CardTitle>
          <div className="flex gap-4 justify-between w-full pt-4">
            <p className="flex items-center">작성자: {author.name}</p>
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

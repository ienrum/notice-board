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
            <p className="flex items-center">작성자: {author}</p>
            <div className="flex">
              <Dialog>
                <DialogTrigger>
                  <Button variant="link" className="w-fit">
                    삭제
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogDescription>
                      정말로 삭제하시겠습니까?
                    </DialogDescription>
                  </DialogHeader>
                  <Button onClick={handleDelete} variant="destructive">
                    확인
                  </Button>
                </DialogContent>
              </Dialog>
              <Button variant="link" className="w-fit" onClick={handleUpdate}>
                수정
              </Button>
            </div>
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

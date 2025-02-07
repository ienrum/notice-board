import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useDeleteThread } from "@/pages/Detail/apis/thread/useDeleteThread";
import { useNavigate, useParams } from "react-router-dom";

const UpdateDeleteDialog = () => {
  const threadId = useParams().id as string;

  const navigate = useNavigate();

  const { mutate: deleteThread, isPending } = useDeleteThread(
    Number(threadId),
    () => {
      navigate("/");
    }
  );

  const handleDelete = () => {
    deleteThread();
  };

  const handleUpdate = () => {
    navigate(`/write/${threadId}`);
  };

  return (
    <div className="flex">
      <Dialog>
        <DialogTrigger>
          <Button variant="link" className="w-fit">
            삭제
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>정말로 삭제하시겠습니까?</DialogDescription>
          </DialogHeader>
          <Button
            onClick={handleDelete}
            variant="destructive"
            disabled={isPending}
          >
            확인
          </Button>
        </DialogContent>
      </Dialog>
      <Button variant="link" className="w-fit" onClick={handleUpdate}>
        수정
      </Button>
    </div>
  );
};

export default UpdateDeleteDialog;

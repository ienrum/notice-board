import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePostThread } from "@/pages/Home/apis/usePostThread";
import { FormEvent, useRef, useState } from "react";

interface ThreadPostFormModalProps {
  TriggerComponent?: React.FC;
}

const ThreadPostFormModal = ({
  TriggerComponent = () => <Button>글 작성</Button>,
}: ThreadPostFormModalProps) => {
  const [open, setOpen] = useState(false);

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const { mutate: postThread } = usePostThread({
    onSuccess: () => setOpen(false),
    onError: () => alert("로그인 후 이용해주세요."),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!titleRef.current?.value || !contentRef.current?.value) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    postThread({
      title: titleRef.current?.value,
      content: contentRef.current?.value,
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TriggerComponent />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>글 작성</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
          <Label htmlFor="title">제목</Label>
          <Input id="title" type="text" ref={titleRef} />
          <Label htmlFor="content">내용</Label>
          <Textarea id="content" className="resize-none" ref={contentRef} />
          <Button type="submit">작성</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ThreadPostFormModal;

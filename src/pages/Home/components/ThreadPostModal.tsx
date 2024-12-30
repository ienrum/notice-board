import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePostThread } from "@/pages/Home/apis/usePostThread";
import { DialogTitle } from "@radix-ui/react-dialog";
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
  const authorRef = useRef<HTMLInputElement>(null);

  const { mutate: postThread } = usePostThread(() => setOpen(false));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      !titleRef.current?.value ||
      !contentRef.current?.value ||
      !authorRef.current?.value
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    postThread({
      title: titleRef.current?.value,
      content: contentRef.current?.value,
      author: authorRef.current?.value,
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
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 ">
            <label>
              제목
              <Input type="text" ref={titleRef} />
            </label>
            <label>
              내용
              <Textarea className="resize-none" ref={contentRef} />
            </label>
            <label>
              작성자
              <Input type="text" ref={authorRef} />
            </label>
            <Button type="submit">작성</Button>
          </form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ThreadPostFormModal;

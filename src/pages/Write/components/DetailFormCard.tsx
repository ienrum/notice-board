import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFetchThread } from "@/pages/Home/apis/fetchThread";
import { useUpdateThread } from "@/pages/Write/apis/useUpdateThread";
import { FormEvent, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

const DetailFormCard = () => {
  const threadId = useParams().id as string;
  const navigate = useNavigate();
  const { mutate: updateThread } = useUpdateThread(Number(threadId), () =>
    navigate(`/thread/${threadId}`)
  );

  const {
    data: { title, content, author },
  } = useFetchThread(Number(threadId));

  const titleRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!titleRef.current || !contentRef.current) {
      return;
    }

    updateThread({
      title: titleRef.current.value,
      content: contentRef.current.value,
    });
  };

  return (
    <Card className="w-full p-8 flex">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[80%] gap-4 grow items-end"
      >
        <CardHeader className="w-full">
          <CardTitle className=" text-3xl">
            <Input ref={titleRef} defaultValue={title} />
          </CardTitle>
          <p className="w-full flex justify-end">작성자: {author.name}</p>
        </CardHeader>
        <CardContent className="w-full">
          <Textarea ref={contentRef} defaultValue={content} />
        </CardContent>

        <Button type="submit" className="w-fit">
          수정
        </Button>
      </form>
    </Card>
  );
};

export default DetailFormCard;

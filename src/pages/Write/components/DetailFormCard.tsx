import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useFetchThread } from "@/pages/Home/apis/fetchThread";
import { useUpdateThread } from "@/pages/Write/apis/useUpdateThread";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "3글자 이상 입력해주세요." })
    .max(20, { message: "20글자 이하로 입력해주세요." }),
  content: z
    .string()
    .min(10, { message: "10글자 이상 입력해주세요." })
    .max(255, { message: "255글자 이하로 입력해주세요." }),
});

const DetailFormCard = () => {
  const threadId = useParams().id as string;
  const navigate = useNavigate();
  const { mutate: updateThread } = useUpdateThread(Number(threadId), () =>
    navigate(`/thread/${threadId}`)
  );

  const {
    data: { title, content, author },
  } = useFetchThread(Number(threadId));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title, content },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    updateThread({
      title: values.title,
      content: values.content,
    });
  };

  return (
    <Card className="w-full p-8 flex">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col w-[80%] gap-4 grow items-end"
        >
          <CardHeader className="w-full">
            <CardTitle className=" text-3xl">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>제목</FormLabel>
                    <FormControl>
                      <Input {...field} id="title" type="text" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardTitle>
            <p className="w-full flex justify-end">작성자: {author.name}</p>
          </CardHeader>
          <CardContent className="w-full">
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>내용</FormLabel>
                  <FormControl>
                    <Textarea {...field} id="content" className="resize-none" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>

          <Button type="submit" className="w-fit">
            수정
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default DetailFormCard;

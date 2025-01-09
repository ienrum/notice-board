import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { usePostThread } from "@/pages/Home/apis/usePostThread";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "@/hooks/use-toast";

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

interface ThreadPostFormModalProps {
  TriggerComponent?: React.FC;
}

const ThreadPostFormModal = ({
  TriggerComponent = () => <Button>글 작성</Button>,
}: ThreadPostFormModalProps) => {
  const [open, setOpen] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { title: "", content: "" },
  });

  const { mutate: postThread } = usePostThread({
    onSuccess: () => setOpen(false),
    onError: (error) => {
      if (error.response?.status === 401) {
        toast({
          variant: "destructive",
          description: "로그인이 필요합니다.",
        });
      }
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    postThread({
      title: values.title,
      content: values.content,
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-4 "
          >
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
            <Button type="submit">작성</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ThreadPostFormModal;

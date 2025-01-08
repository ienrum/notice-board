import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useSignup } from "@/pages/Signup/apis/useSignup";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  name: z
    .string()
    .min(3, { message: "3글자 이상 입력해주세요." })
    .max(20, { message: "20글자 이하로 입력해주세요." }),
  password: z
    .string()
    .min(8, { message: "6글자 이상 입력해주세요." })
    .max(20, {
      message: "20글자 이하로 입력해주세요.",
    })
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[a-zA-Z\d!@#$%^&*]{8,}$/,
      {
        message:
          "비밀번호는 최소 하나의 대문자, 소문자, 숫자, 특수문자를 포함해야합니다.",
      }
    ),
});

const Signup = () => {
  const navigate = useNavigate();

  const { mutate: signup } = useSignup(() => navigate("/signin"));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", password: "" },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    signup({
      name: values.name,
      password: values.password,
    });
  };

  return (
    <div className="flex justify-center items-center h-full w-full p-8">
      <Card className="w-full">
        <CardHeader>Sign up</CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="flex flex-col gap-4"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>닉네임</FormLabel>
                    <FormControl>
                      <Input {...field} id="name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>비밀번호</FormLabel>
                    <FormControl>
                      <Input {...field} id="password" type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Sign up</Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant="link" onClick={() => navigate("/signin")}>
            Sign in
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signup;

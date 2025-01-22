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
import { toast } from "@/hooks/use-toast";
import { useSignin } from "@/pages/Signin/apis/useSignin";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { useNavigate } from "react-router-dom";
import { z } from "zod";

const formSchema = z.object({
  name: z.string({ message: "이름을 입력해주세요." }),
  password: z.string({ message: "비밀번호를 입력해주세요." }),
});

const Signin = () => {
  const navigate = useNavigate();

  const { mutate: signin, isPending } = useSignin({
    onSuccess: () => navigate("/"),
    onError: (error) => {
      if (error?.response?.status === 404) {
        toast({
          variant: "destructive",
          description: "존재하지 않는 사용자입니다.",
        });
      } else if (error?.response?.status === 403) {
        toast({
          variant: "destructive",
          description: "비밀번호가 일치하지 않습니다.",
        });
      }
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "", password: "" },
  });

  const saveSharedPref = (prefKey: string, prefValue: string) => {
    if (window.Android && window.Android.saveString) {
      window.Android.saveString(prefKey, prefValue);
    }

    return null;
  };

  const loadSharedPref = (prefKey: string) => {
    if (window.Android && window.Android.getString) {
      return window.Android.getString(prefKey);
    }

    return null;
  };

  useEffect(() => {
    const loadData = async () => {
      const name = loadSharedPref("name");
      const password = loadSharedPref("password");

      if (name && password) {
        signin({ name, password });
      }
    };

    loadData();
  }, [signin]);

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    saveSharedPref("name", values.name);
    saveSharedPref("password", values.password);

    signin({
      name: values.name,
      password: values.password,
    });
  };

  return (
    <div className="flex justify-center items-center h-full w-full p-8">
      <Card className="w-full">
        <CardHeader>Sign in</CardHeader>
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
                      <Input {...field} id="name" type="text" />
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
              <Button type="submit" disabled={isPending}>
                Sign in
              </Button>
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <Button variant="link" onClick={() => navigate("/signup")}>
            Sign up
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Signin;

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignin } from "@/pages/Signin/apis/useSignin";
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { mutate: signin } = useSignin(() => navigate("/"));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!nameRef.current?.value || !passwordRef.current?.value) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    signin({
      name: nameRef.current?.value,
      password: passwordRef.current?.value,
    });
  };

  return (
    <div className="flex justify-center items-center h-full w-full p-8">
      <Card className="w-full">
        <CardHeader>Sign in</CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Label htmlFor="name">닉네임</Label>
            <Input ref={nameRef} id="name" type="text" />
            <Label htmlFor="password">비밀번호</Label>
            <Input ref={passwordRef} id="password" type="password" />
            <Button type="submit">로그인</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signin;

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignup } from "@/pages/Signup/apis/useSignup";
import { FormEvent, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const checkPasswordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { mutate: signup } = useSignup(() => navigate("/signin"));

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (
      !nameRef.current?.value ||
      !passwordRef.current?.value ||
      !checkPasswordRef.current?.value
    ) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    if (passwordRef.current?.value !== checkPasswordRef.current?.value) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    signup({
      name: nameRef.current?.value,
      password: passwordRef.current?.value,
    });
  };

  return (
    <Card>
      <CardHeader>Sign up</CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <Label htmlFor="name">닉네임</Label>
          <Input id="name" type="text" />
          <Label htmlFor="password">비밀번호</Label>
          <Input id="password" type="password" />
          <Label htmlFor="checkPassword">비밀번호 확인</Label>
          <Input id="checkPassword" type="password" />
        </form>
      </CardContent>
    </Card>
  );
};

export default Signup;

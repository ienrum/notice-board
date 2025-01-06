import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useSignin } from "@/pages/Signin/apis/useSignin";
import { FormEvent, useEffect, useRef } from "react";

import { useNavigate } from "react-router-dom";

const Signin = () => {
  const nameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { mutate: signin } = useSignin(() => navigate("/"));

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!nameRef.current?.value || !passwordRef.current?.value) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    saveSharedPref("name", nameRef.current?.value);
    saveSharedPref("password", passwordRef.current?.value);

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

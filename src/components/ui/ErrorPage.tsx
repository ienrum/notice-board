import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <h1>404</h1>
      <p>페이지를 찾을 수 없습니다</p>
      <Button variant="link" size="lg">
        <Link to="/">홈으로 가기</Link>
      </Button>
    </div>
  );
};

export default ErrorPage;

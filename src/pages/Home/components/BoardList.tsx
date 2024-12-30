import { useFetchBoardList } from "@/pages/Home/apis/fetchBoardList";
import BoardItem from "@/pages/Home/components/BoardItem";
import { Suspense } from "react";

const BoardList = () => {
  const { data } = useFetchBoardList();

  return (
    <div className="flex flex-col gap-[1px]">
      <Suspense fallback={<span>isLoading...</span>}>
        {data.map((thread) => (
          <BoardItem key={thread.id} {...thread} />
        ))}
      </Suspense>
    </div>
  );
};

export default BoardList;

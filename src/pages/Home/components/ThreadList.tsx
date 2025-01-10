import Pagination from "@/components/ui/pagination";
import { useFetchThreadList } from "@/pages/Home/apis/useFetchThreadList";
import ThreadItem from "@/pages/Home/components/ThreadItem";
import { useNavigate, useSearchParams } from "react-router-dom";

const ThreadList = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const page = Number(searchParams.get("page")) || 1;
  const setPage = (page: number) => {
    navigate({ search: `?page=${page}` });
  };

  const { data } = useFetchThreadList(page);

  return (
    <div className="flex flex-col gap-[1px] ">
      {data?.threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
      {data?.threads.length === 0 && (
        <div className="text-center">Thread is Empty</div>
      )}
      {data && data.totalPage > 0 && (
        <Pagination
          setPage={setPage}
          page={page}
          totalPage={data?.totalPage ?? 5}
        />
      )}
    </div>
  );
};

export default ThreadList;

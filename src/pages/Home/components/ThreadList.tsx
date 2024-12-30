import { useFetchThreadList } from "@/pages/Home/apis/useFetchThreadList";
import ThreadItem from "@/pages/Home/components/ThreadItem";

const ThreadList = () => {
  const { data } = useFetchThreadList();

  return (
    <div className="flex flex-col gap-[1px]">
      {data.map((thread) => (
        <ThreadItem key={thread.id} {...thread} />
      ))}
    </div>
  );
};

export default ThreadList;

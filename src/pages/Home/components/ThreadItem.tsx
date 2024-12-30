import { Link } from "react-router-dom";

interface ThreadItemProps {
  id: number;
  title: string;
  author: string;
}

const ThreadItem = ({ id, title, author }: ThreadItemProps) => {
  return (
    <Link
      className="flex gap-4 bg-slate-100 p-4 text-primary cursor-pointer"
      to={`/thread/${id}`}
    >
      <span>{title}</span>
      <span>{author}</span>
    </Link>
  );
};

export default ThreadItem;

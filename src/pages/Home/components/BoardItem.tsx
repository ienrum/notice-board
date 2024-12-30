import { Link } from "react-router-dom";

interface BaordItemProps {
  id: number;
  title: string;
  author: string;
}

const BoardItem = ({ id, title, author }: BaordItemProps) => {
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

export default BoardItem;

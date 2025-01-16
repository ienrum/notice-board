import { Button } from "@/components/ui/button";

const DownloadButton = ({ url }: { url: string }) => {
  return (
    <a href={url}>
      <Button variant="ghost" type="button">
        다운로드
      </Button>
    </a>
  );
};

const DeleteButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <Button variant="ghost" type="button" onClick={onClick}>
      삭제
    </Button>
  );
};

interface FilePreview {
  id: number;
  name: string;
  url?: string;
}
interface FilePreviewListProps {
  files: FilePreview[];
  render?: (file: FilePreview) => React.ReactNode;
}

const FilePreviewList = ({ files, render }: FilePreviewListProps) => {
  return (
    <ul>
      {files.map((file) => (
        <li key={file.id}>
          {file.name}
          {render ? render(file) : null}
        </li>
      ))}
    </ul>
  );
};

FilePreviewList.DownloadButton = DownloadButton;
FilePreviewList.DeleteButton = DeleteButton;

export default FilePreviewList;

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useFetchFiles } from "@/pages/Detail/apis/file/useFetchFiles";
import FilePreviewList from "@/pages/Detail/components/file-upload/FilePreviewList";
import useFileApi from "@/pages/Detail/hooks/useFileApi";
import { useState } from "react";
import { useParams } from "react-router-dom";

const FileUpload = () => {
  const threadId = useParams<{ id: string }>().id!;

  const {
    data: { files: fetchedFiles, isAuthor },
  } = useFetchFiles(Number(threadId));
  const [isEditing, setIsEditing] = useState(false);

  const {
    existFiles,
    previewFiles,
    handleSetNewFiles,
    handleResetFilesState,
    handleRemoveExistFile,
    handleSubmit,
  } = useFileApi({
    fetchedFiles,
    threadId,
    onSubmit: () => {
      setIsEditing(false);
    },
  });

  const handleToggleEditing = () => {
    setIsEditing((prev) => !prev);
    handleResetFilesState();
  };

  const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFilesArray = Array.from(files).map((file, i) => ({
        id: Date.now() + i,
        name: file.name,
        file,
      }));

      handleSetNewFiles(newFilesArray);
    }
  };

  return (
    <>
      {!isEditing && (
        <>
          {isAuthor && (
            <Button onClick={handleToggleEditing} variant="outline">
              업로드 및 삭제
            </Button>
          )}
          <FilePreviewList
            files={existFiles}
            render={(file) => (
              <FilePreviewList.DownloadButton url={file.url!} />
            )}
          />
        </>
      )}
      {isEditing && (
        <form onSubmit={handleSubmit}>
          <div className="flex justify-between items-center gap-2">
            <div className="flex gap-2">
              <Button onClick={handleToggleEditing} variant="destructive">
                취소
              </Button>
              <Button variant="outline" type="submit">
                업로드
              </Button>
            </div>
            <Input type="file" multiple onChange={handleChangeFileInput} />
          </div>
          <FilePreviewList
            files={previewFiles}
            render={(file) => (
              <FilePreviewList.DeleteButton
                onClick={() => handleRemoveExistFile(file.id)}
              />
            )}
          />
        </form>
      )}
    </>
  );
};

export default FileUpload;

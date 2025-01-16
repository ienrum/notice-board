import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useDeleteFile } from "@/pages/Detail/apis/useDeleteFile";
import { useFetchFiles } from "@/pages/Detail/apis/useFetchFiles";
import { useUploadFiles } from "@/pages/Detail/apis/useUploadFiles";
import FilePreviewList from "@/pages/Detail/components/file-upload/FilePreviewList";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface NewFile {
  id: number;
  name: string;
  file: File;
}

interface ExistFile {
  id: number;
  name: string;
  size: number;
  url: string;
}

interface DeleteFile {
  id: number;
}

const FileUpload = () => {
  const threadId = useParams<{ id: string }>().id!;

  const {
    data: { files: fetchedFiles, isAuthor },
  } = useFetchFiles(Number(threadId));
  const [isEditing, setIsEditing] = useState(false);
  const [existFiles, setExistFiles] = useState<ExistFile[]>(fetchedFiles || []);
  const [deleteFiles, setDeleteFiles] = useState<DeleteFile[]>([]);
  const [newFiles, setNewFiles] = useState<NewFile[]>([]);

  useEffect(() => {
    setExistFiles(fetchedFiles || []);
  }, [fetchedFiles]);

  const previewFiles = [...existFiles, ...newFiles];

  const { mutate: uploadFile } = useUploadFiles({
    threadId: Number(threadId),
  });
  const { mutate: deleteFile } = useDeleteFile({
    threadId: Number(threadId),
    onSucess: () => handleResetStates(),
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData();

    newFiles.forEach((file) => {
      formData.append("files", file.file);
    });

    uploadFile(formData);
    const deleteFilesIds = deleteFiles.map((file) => file.id);
    if (deleteFilesIds.length > 0) {
      deleteFile(deleteFilesIds);
    }

    handleToggleEditing();
  };

  const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      const newFilesArray = Array.from(files).map((file, i) => ({
        id: Date.now() + i,
        name: file.name,
        file,
      }));

      setNewFiles(newFilesArray);
    }
  };

  const handleToggleEditing = () => {
    setIsEditing(!isEditing);
    handleResetStates();
  };

  const handleResetStates = () => {
    setNewFiles([]);
    setDeleteFiles([]);
    setExistFiles(fetchedFiles || []);
  };

  const handleRemoveExistFile = (fileId: number) => {
    const isDeletFileInExistFiles = existFiles.find(
      (file) => file.id === fileId
    );
    if (!isDeletFileInExistFiles) {
      setNewFiles(newFiles.filter((file) => file.id !== fileId));
      return;
    }

    setExistFiles(existFiles.filter((file) => file.id !== fileId));
    setDeleteFiles([...deleteFiles, { id: fileId }]);
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

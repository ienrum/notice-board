import { toast } from "@/hooks/use-toast";
import { useDeleteFile } from "@/pages/Detail/apis/file/useDeleteFile";
import { useUploadFiles } from "@/pages/Detail/apis/file/useUploadFiles";
import { useEffect, useState } from "react";

interface NewFile {
  id: string;
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

interface UseFileUploadParams {
  fetchedFiles: ExistFile[];
  threadId: string;
  onSubmit: () => void;
}

const useFileApi = ({
  fetchedFiles,
  threadId,
  onSubmit,
}: UseFileUploadParams) => {
  const [existFiles, setExistFiles] = useState<ExistFile[]>(fetchedFiles || []);
  const [deleteFiles, setDeleteFiles] = useState<DeleteFile[]>([]);
  const [newFiles, setNewFiles] = useState<NewFile[]>([]);

  useEffect(() => {
    setExistFiles(fetchedFiles || []);
  }, [fetchedFiles]);

  const previewFiles = [...existFiles, ...newFiles];

  const { mutate: uploadFile } = useUploadFiles({
    threadId: Number(threadId),
    onSuccess: () => {
      toast({ description: "파일 업로드에 성공했습니다." });
    },
    onError: (error) => {
      const errorMessage = (error.response?.data as { message?: string })
        ?.message;
      if (errorMessage === "Too many files") {
        toast({
          description: "파일은 최대 10개까지 업로드 가능합니다.",
          variant: "destructive",
        });
      } else if (errorMessage === "File too large") {
        toast({
          description: "파일은 최대 1MB까지 업로드 가능합니다.",
          variant: "destructive",
        });
      }
    },
  });

  const { mutate: deleteFile } = useDeleteFile({
    threadId: Number(threadId),
    onSuccess: () => handleResetFilesState(),
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

    onSubmit();
    handleResetFilesState();
  };

  const handleResetFilesState = () => {
    setNewFiles([]);
    setDeleteFiles([]);
    setExistFiles(fetchedFiles || []);
  };

  const handleRemoveFile = (fileId: number | string) => {
    if (typeof fileId === "number") {
      handleRemoveExistFile(fileId);
    } else {
      handleRemoveNewFile(fileId);
    }
  };

  const handleRemoveExistFile = (fileId: number) => {
    setExistFiles(existFiles.filter((file) => file.id !== fileId));
    setDeleteFiles([...deleteFiles, { id: fileId }]);
  };

  const handleRemoveNewFile = (fileId: string) => {
    setNewFiles(newFiles.filter((file) => file.id !== fileId));
  };

  return {
    existFiles,
    previewFiles,
    handleSetNewFiles: setNewFiles,
    handleResetFilesState,
    handleRemoveFile,
    handleSubmit,
  };
};

export default useFileApi;

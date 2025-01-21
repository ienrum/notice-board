import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFetchFiles } from "@/pages/Detail/apis/file/useFetchFiles";
import FilePreviewList from "@/pages/Detail/components/file-upload/FilePreviewList";
import { fileUploadSchema } from "@/pages/Detail/components/file-upload/fileUploadSchema";
import useFileApi from "@/pages/Detail/hooks/useFileApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { v4 } from "uuid";
import { z } from "zod";

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
    handleRemoveFile,
    handleSubmit,
  } = useFileApi({
    fetchedFiles,
    threadId,
    onSubmit: () => {
      setIsEditing(false);
    },
    onFileChange: (files: File[]) => {
      form.setValue("files", files);

      const result = fileUploadSchema.safeParse({ files });
      if (!result.success) {
        form.setError("files", {
          message: result.error.errors[0].message,
        });
        return;
      }

      form.clearErrors("files");
    },
  });

  const form = useForm<z.infer<typeof fileUploadSchema>>({
    resolver: zodResolver(fileUploadSchema),
    defaultValues: { files: [] },
  });

  const handleToggleEditing = () => {
    setIsEditing((prev) => !prev);
    handleResetFilesState();
  };

  const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const newFilesArray = Array.from(files).map((file) => ({
      id: v4(),
      name: file.name,
      file,
    }));

    handleSetNewFiles(newFilesArray);

    form.setValue(
      "files",
      newFilesArray.map((file) => file.file)
    );
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
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <FormField
              control={form.control}
              name="files"
              render={() => (
                <FormItem>
                  <FormControl>
                    <div className="flex justify-between items-center gap-2">
                      <div className="flex gap-2">
                        <Button
                          onClick={handleToggleEditing}
                          variant="destructive"
                        >
                          취소
                        </Button>
                        <Button variant="outline">업로드</Button>
                      </div>
                      <Input
                        type="file"
                        multiple
                        onChange={handleChangeFileInput}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FilePreviewList
              files={previewFiles}
              render={(file) => (
                <FilePreviewList.DeleteButton
                  onClick={() => handleRemoveFile(file.id)}
                />
              )}
            />
          </form>
        </Form>
      )}
    </>
  );
};

export default FileUpload;

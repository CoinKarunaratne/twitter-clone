"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

type PostProps = {
  id?: string;
};

type Comments = {
  title: string;
  postId?: string;
};

const AddComments = ({ id }: PostProps) => {
  const [title, setTitle] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const queryClient = useQueryClient();
  let commentToastId: string;
  const { mutate } = useMutation(
    async (data: Comments) => axios.post("/api/posts/addComment", { data }),
    {
      onSuccess: (data) => {
        setTitle("");
        setDisabled(false);
        toast.success("Added your comment", { id: commentToastId });
        queryClient.invalidateQueries(["detail-post"]);
      },
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: commentToastId });
        }
        setDisabled(false);
      },
    }
  );

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    setDisabled(true);
    commentToastId = toast.loading("Adding Your Comment", {
      id: commentToastId,
    });
    mutate({ title, postId: id });
  };
  return (
    <form onSubmit={submitComment} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-2">
        <input
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Add your Comment"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        />
        <div className="flex items-center gap-2">
          <button
            disabled={isDisabled}
            className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
            type="submit"
          >
            Add Comment
          </button>
          <p
            className={`font-bold text-sm ${
              title.length > 300 ? "text-red-500" : "text-gray-700"
            }`}
          >{`${title.length}/300`}</p>
        </div>
      </div>
    </form>
  );
};

export default AddComments;

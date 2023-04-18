"use client";

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

let toastPost: string;

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [isDisabled, setDisabled] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (title: string) => await axios.post("/api/posts/addPost", { title }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast.error(error?.response?.data.message, { id: toastPost });
        }
        setDisabled(false);
      },
      onSuccess: (data) => {
        setTitle("");
        setDisabled(false);
        toast.success("Post has been made <Fire Emoji>", { id: toastPost });
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    toastPost = toast.loading("Creating your post", { id: toastPost });
    setDisabled(true);
    mutate(title);
  };
  return (
    <form onSubmit={submitForm} className="bg-white my-8 p-8 rounded-md">
      <div className="flex flex-col my-4">
        <textarea
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="What's on your mind?"
          className="p-4 text-lg rounded-md my-2 bg-gray-200"
        ></textarea>
        <div className="flex items-center justify-between gap-2">
          <p
            className={`font-bold text-sm ${
              title.length > 300 ? "text-red-500" : "text-gray-700"
            }`}
          >{`${title.length}/300`}</p>
          <button
            disabled={isDisabled}
            className="text-sm bg-teal-600 text-white py-2 px-6 rounded-xl disabled:opacity-25"
            type="submit"
          >
            Create a Post
          </button>
        </div>
      </div>
    </form>
  );
};

export default CreatePost;

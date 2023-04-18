"use client";

import Image from "next/image";
import { useState } from "react";
import Toggle from "./Toggle";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import toast from "react-hot-toast";

type EditProps = {
  id: string;
  avatar: string;
  name: string;
  title: string;
  key: string;
  comments?: {
    id: string;
    postId: string;
    userId: string;
  }[];
};

const EditPost = ({ avatar, name, title, comments, id }: EditProps) => {
  const [toggle, setToggle] = useState(false);
  const queryClient = useQueryClient();

  const deletePost = async () => {
    const loadingId = toast.loading("Deleting your Post...");
    try {
      await axios.delete(`/api/posts/deletePost?id=${id}`);
      toast.dismiss(loadingId);
      toast.success("Post has been deleted");
      queryClient.invalidateQueries(["auth-posts"]);
    } catch (error) {
      toast.dismiss(loadingId);
      toast.error("Error deleting Post");
    }
  };

  return (
    <>
      <div className="bg-white my-8 p-8 rounded-lg">
        <div className="flex items-center gap-2">
          <Image
            className="rounded-full"
            width={32}
            height={32}
            src={avatar}
            alt="avatar"
          />
          <h3 className="font-bold text-gray-700">{name}</h3>
        </div>
        <div className="my-8">
          <p className="break-all">{title}</p>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-sm font-bold text-gray-700">
            {comments.length} Comments
          </p>
          <button
            onClick={() => setToggle(true)}
            className="text-sm font-bold text-red-500"
          >
            Delete
          </button>
        </div>
      </div>
      {toggle && <Toggle deletePost={deletePost} setToggle={setToggle} />}
    </>
  );
};

export default EditPost;

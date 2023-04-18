"use client";

import AddComments from "@/app/components/AddComments";
import Post from "@/app/components/Posts";
import { PostsType } from "@/app/types/Posts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";

type URL = {
  params: {
    slug: string;
  };
};

const fetchDetails = async (slug: string) => {
  const response = await axios.get(`/api/posts/${slug}`);
  return response.data;
};

const PostDetails = (url: URL) => {
  const { data, isLoading } = useQuery<PostsType[]>({
    queryFn: () => fetchDetails(url.params.slug),
    queryKey: ["detail-post"],
  });
  if (isLoading) return "Loading...";
  return (
    <div>
      <Post
        key={data.id}
        name={data.user.name}
        avatar={data.user.image}
        postTitle={data.title}
        id={data.id}
        comments={data.Comment}
      />
      <AddComments id={data?.id} />
      {data?.Comment?.map((comment) => (
        <div key={comment.id} className="my-6 bg-white p-8 rounded-md">
          <div className="flex items-center gap-2">
            <Image
              width={24}
              height={24}
              src={comment?.user?.image}
              alt="Avatar"
              className="rounded-xl"
            />
            <h3 className="font-bold">{comment?.user?.name}</h3>
            <h2 className="text-sm">{comment.createdAt}</h2>
          </div>
          <div className="py-4">{comment.message}</div>
        </div>
      ))}
    </div>
  );
};

export default PostDetails;

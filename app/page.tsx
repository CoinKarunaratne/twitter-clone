"use client";

import CreatePost from "./components/AddPost";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Post from "./components/Posts";
import { PostType } from "./types/Post";

const allPosts = async () => {
  const response = await axios.get("api/posts/getPost");
  return response.data;
};

const Home = () => {
  const { data, error, isLoading } = useQuery<PostType[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading.....";
  console.log(data);
  return (
    <main className="">
      <CreatePost />
      {data?.map((posts) => (
        <Post
          key={posts.id}
          name={posts.user.name}
          avatar={posts.user.image}
          postTitle={posts.title}
          id={posts.id}
          comments={posts.Comment}
        />
      ))}
    </main>
  );
};

export default Home;

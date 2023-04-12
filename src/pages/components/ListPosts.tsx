import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const allPosts = async () => {
  const response = await axios.get("http://localhost:3005/posts");
  return response.data;
};

const ListPosts = () => {
  const { data, error, isLoading } = useQuery({
    queryFn: allPosts,
    queryKey: ["posts"],
  });

  return <div></div>;
};

export default ListPosts;

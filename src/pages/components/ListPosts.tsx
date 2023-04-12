import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  Box,
  StackDivider,
  CircularProgress,
} from "@chakra-ui/react";
import AlertError from "./AlertError";
import { Posts } from "@/types/Posts";
import Post from "./Post";
import apipost from "../helper/apipost";

const allPosts = async () => {
  const response = await apipost.get("/posts");
  return response.data;
};

const ListPosts = () => {
  const { data, error, isLoading } = useQuery<Posts[]>({
    queryFn: allPosts,
    queryKey: ["posts"],
  });

  if (error) return <AlertError />;

  if (isLoading) return <CircularProgress value={80} />;

  return (
    <Box mt={15}>
      <Card>
        <CardHeader>
          <Heading size="md">List Posts</Heading>
        </CardHeader>
        <CardBody>
          <Stack divider={<StackDivider />} spacing="4">
            {data?.map((e: Posts) => (
              <Post
                key={e.id}
                userId={1}
                id={e.id}
                title={e.title}
                body={e.body}
              />
            ))}
          </Stack>
        </CardBody>
      </Card>
    </Box>
  );
};

export default ListPosts;

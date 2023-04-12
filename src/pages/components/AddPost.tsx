import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
  Box,
  useToast,
} from "@chakra-ui/react";
import { Posts } from "@/types/Posts";
import apipost from "../helper/apipost";

interface PostType {
  title: string;
  body: string;
}

const AddPost = () => {
  const toast = useToast();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<PostType>();

  //Create a post/discust
  const { mutate } = useMutation(
    async ({ id, title, body }: Posts) =>
      await apipost.post("/posts", {
        id,
        title,
        body,
      }),
    {
      onError: (error) => {
        if (error instanceof AxiosError) {
          toast({
            title: `${error}`,
            status: "error",
            isClosable: true,
          });
        }
      },
      onSuccess: (data) => {
        toast({
          title: `Success Add Post ${JSON.stringify(data.data)}`,
          status: "success",
          isClosable: true,
        });
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  function onSubmit(values: any) {
    const now = new Date();
    const epochTime = now.getTime();
    const body = {
      id: epochTime,
      ...values,
    };
    mutate(body);
  }

  return (
    <Box mt={10}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={Boolean(errors.title)}>
          <FormLabel htmlFor="title">Post Title</FormLabel>
          <Input
            id="postTitleId"
            placeholder="Title"
            {...register("title", {
              required: "This is required",
              minLength: {
                value: 4,
                message: "Minimum length should be 4",
              },
            })}
          />
          <FormErrorMessage>
            {errors.title && errors.title.message}
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={Boolean(errors.body)}>
          <FormLabel htmlFor="post">Body</FormLabel>
          <Input
            id="bodyId"
            placeholder="Body"
            {...register("body", {
              required: "This is required",
              minLength: {
                value: 4,
                message: "Minimum length should be 4",
              },
            })}
          />
          <FormErrorMessage>
            {errors.body && errors.body.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default AddPost;

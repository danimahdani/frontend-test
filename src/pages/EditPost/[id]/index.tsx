import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import axios, { AxiosError } from "axios";
import { Posts } from "@/types/Posts";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface PostType {
  userId: string;
  id: string;
  title: string;
  body: string;
}

const EditPost = () => {
  const toast = useToast();
  const router = useRouter();
  const { query } = router;
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async ({ id, userId, title, body }: Posts) =>
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`, {
        id,
        userId,
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
          title: `Success Edit Post ${JSON.stringify(data.data)}`,
          status: "success",
          isClosable: true,
        });
        router.push("/");
        queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostType>();

  useEffect(() => {
    const getDetailPost = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/posts/${query.id}`
      );

      setValue("id", response.data?.id);
      setValue("userId", response.data?.userId);
      setValue("title", response.data?.title);
      setValue("body", response.data?.body);
    };

    setTimeout(() => {
      getDetailPost();
    }, 1500);
  });

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
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input type="hidden" {...register("userId")} />
        <Input type="hidden" {...register("id")} />
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
    </>
  );
};

export default EditPost;

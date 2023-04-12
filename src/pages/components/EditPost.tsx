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
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import apipost from "../helper/apipost";
import { AxiosError } from "axios";
import { Posts } from "@/types/Posts";

interface PostType {
  title: string;
  body: string;
}

const EditPost = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { mutate } = useMutation(
    async ({ id, title, body }: Posts) =>
      await apipost.patch("/posts", {
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
      },
    }
  );

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PostType>();

  setValue("title", "aljdhsfadjshfj");

  function onSubmit(values: any) {
    const now = new Date();
    const epochTime = now.getTime();
    const body = {
      id: epochTime,
      ...values,
    };
  }

  return (
    <>
      <Button colorScheme="teal" size="xs">
        Edit
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
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
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditPost;

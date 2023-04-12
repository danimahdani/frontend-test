import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Posts } from "@/types/Posts";
import axios from "axios";

const DetailPost = ({ id }: any) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [detailPost, setDetailPost] = useState<Posts>();

  const getDetailPost = async () => {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/posts/${id}`
    );
    setDetailPost(response.data);
    onOpen();
  };

  return (
    <>
      <Button colorScheme="blue" size="xs" onClick={() => getDetailPost()}>
        Detail
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{detailPost?.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontWeight="bold" mb="1rem">
              {detailPost?.body}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DetailPost;

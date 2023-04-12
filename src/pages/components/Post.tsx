import { Posts } from "@/types/Posts";
import React, { useRef } from "react";
import {
  Heading,
  Box,
  Button,
  Text,
  Flex,
  Spacer,
  ButtonGroup,
} from "@chakra-ui/react";
import EditPost from "./EditPost";
import DetailPost from "./DetailPost";
import Link from "next/link";

const Post = ({ id, userId, title, body }: Posts) => {
  return (
    <Box key={id}>
      <Flex>
        <Box>
          <Heading size="xs" textTransform="uppercase">
            {title}
          </Heading>
          <Text pt="2" fontSize="sm">
            {body}
          </Text>
        </Box>
        <Spacer />
        <ButtonGroup gap="1">
          <Link href={`/EditPost/${id}`}>
            <Button colorScheme="teal" size="xs">
              zxcv
            </Button>
          </Link>
          {/* <EditPost /> */}
          <DetailPost id={id} />
        </ButtonGroup>
      </Flex>
    </Box>
  );
};

export default Post;

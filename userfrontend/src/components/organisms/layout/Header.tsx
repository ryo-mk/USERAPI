import { VFC, memo } from "react";
import { Box, Link, Flex, Heading } from "@chakra-ui/react";

export const Header = () => {
  return (
    <>
      <Flex as="nav" bg="teal.500" color="gray.50" align="center" justify="space-between" padding={{ base: 3, md: 5 }}>
        <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }}>
          <Heading as="h1" fontSize={{ base: "md", md: "xl" }}>
            USERS
          </Heading>
        </Flex>
        <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
          <Box pr={4}>
            <Link>ユーザー管理</Link>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

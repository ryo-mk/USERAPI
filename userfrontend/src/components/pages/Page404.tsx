import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Link } from "@chakra-ui/react";

export const Page404 = () => {
  const navigate = useNavigate();
  const onClickHome = useCallback(() => navigate("/"), []);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box textAlign="center" bg="white" w="lg" h="md" p={10} borderRadius="lg" shadow="md">
        <Heading size="lg" mt="80px" mb="50px">
          該当ページが存在しません
        </Heading>
        <br />
        <Link as="a" textDecoration="underline" color="teal.500" _hover={{ textDecoration: "none", color: "teal.700" }} onClick={onClickHome}>
          TOPへ戻る
        </Link>
      </Box>
    </Flex>
  );
};

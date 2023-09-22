import { Box, Flex, Heading, Link } from "@chakra-ui/react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

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
        <Link
          as="a" // Linkをa要素としてレンダリング
          textDecoration="underline" // 下線を追加
          color="teal.500" // テキストカラーを変更
          _hover={{ textDecoration: "none", color: "teal.700" }}
          onClick={onClickHome}
        >
          TOPへ戻る
        </Link>
      </Box>
    </Flex>
  );
};

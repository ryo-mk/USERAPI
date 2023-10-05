import { Box, Button, Divider, Flex, Heading, Input, Stack, Text } from "@chakra-ui/react";
import axios from "axios";
import { FC, useCallback, useState } from "react";
import { useMessage } from "../../hooks/useMessage";

export const Register: FC = () => {
  const [userName, setUserName] = useState<string>("");
  const { showMessage } = useMessage();

  const onClickRegisterUser = useCallback(() => {
    const dataToSend = {
      name: userName,
    };
    console.log(dataToSend);
    axios
      .post("http://localhost:8080/users", dataToSend)
      .then((res) => showMessage({ title: "ユーザーを登録しました", status: "success" }))
      .catch(() => {
        showMessage({ title: "登録に失敗しました", status: "error" });
      });
    setUserName("");
  }, [userName, showMessage]);

  return (
    <>
      <Flex align="center" justify="center" height="100vh">
        <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
          <Heading as="h1" size="lg" textAlign="center">
            ユーザー登録
          </Heading>
          <Divider my={4} />
          <Stack spacing={3} py={4} px={10}>
            <Text textAlign="center">id:自動で割り当てられます</Text>
            <Input placeholder="名前を入力" value={userName} onChange={(e) => setUserName(e.target.value)}></Input>
            <Button bg="teal.400" color="white" _hover={{ opacity: 0.8 }} onClick={onClickRegisterUser}>
              登録
            </Button>
          </Stack>
        </Box>
      </Flex>
    </>
  );
};

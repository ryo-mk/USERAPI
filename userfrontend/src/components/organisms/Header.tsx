import { FC, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Flex, Heading, Link, useDisclosure } from "@chakra-ui/react";
import { MenuIconButton } from "../atoms/MenuIconButton";
import { MenuDrawer } from "../molecules/MenuDrawer";

export const Header: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const onClickHome = useCallback(() => {
    navigate("/");
    onClose();
  }, []);
  const onClickRegister = useCallback(() => {
    navigate("/register");
    onClose();
  }, []);
  const onClickHowToUse = useCallback(() => {
    navigate("/howtouse");
    onClose();
  }, []);

  return (
    <>
      <Flex as="nav" bg="teal.500" color="gray.50" align="center" justify="space-between" padding={{ base: 3, md: 5 }}>
        <Flex align="center" as="a" mr={8} _hover={{ cursor: "pointer" }} onClick={onClickHome}>
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>
            USERS
          </Heading>
        </Flex>
        <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex" }}>
          <Box pr={4}>
            <Link onClick={onClickRegister}>ユーザー登録</Link>
          </Box>
          <Link onClick={onClickHowToUse}>使い方</Link>
        </Flex>
        <MenuIconButton onOpen={onOpen} />
      </Flex>
      <MenuDrawer onClose={onClose} isOpen={isOpen} onClickHome={onClickHome} onClickRegister={onClickRegister} onClickHowToUse={onClickHowToUse} />
    </>
  );
};

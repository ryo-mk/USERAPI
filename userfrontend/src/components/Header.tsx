import { Flex, HStack, Heading, Link, Stack } from "@chakra-ui/react";
import { FC, ReactNode, useCallback } from "react";
import { useNavigate } from "react-router-dom";

type HeaderProps = {
  children: ReactNode;
};

export const Header: FC<HeaderProps> = (props) => {
  const { children } = props;
  const navigate = useNavigate();
  const onClickSearch = useCallback(() => navigate("/search"), []);
  const onClickUserManagement = useCallback(() => navigate("/usermanagement"), []);

  return (
    <>
      <HStack>
        <Flex as="a" _hover={{ cursor: "pointer" }} onClick={onClickSearch}>
          <Heading as="h1">USERS</Heading>
        </Flex>
        <Link onClick={onClickUserManagement}>ユーザー編集</Link>
      </HStack>
      {children}
    </>
  );
};

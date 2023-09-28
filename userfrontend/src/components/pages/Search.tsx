import { FC, memo, useCallback, useEffect, useState } from "react";
import { Button, Flex, HStack, Input, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";

import { UserCard } from "../organisms/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useFindById } from "../../hooks/useFindById";
import { UserDetailModal } from "../organisms/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";

export const Search: FC = memo(() => {
  const imageApiUrl = "https://source.unsplash.com/random";

  const [userId, setUserId] = useState<string>("");
  const [onSearch, setOnSearch] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users } = useAllUsers();
  const { getUser, user } = useFindById();
  const { onSelectUser, selectedUser } = useSelectUser();

  const onClickSearchReset = useCallback(() => {
    setOnSearch(false);
  }, []);

  const SearchIdUser = useCallback(() => {
    setOnSearch(true);
    setUserId("");
  }, []);

  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    [users, onSelectUser, onOpen]
  );

  useEffect(() => getUsers(), [users]);

  return (
    <>
      <HStack p={2} spacing={6} justify="center">
        <Button bg="gray.400" color="white" onClick={onClickSearchReset}>
          検索リセット
        </Button>
        <Flex>
          <Input placeholder="ユーザーIDを入力" value={userId} onChange={(e) => setUserId(e.target.value)} bg="white" />
          <Button
            bg="gray.300"
            borderRadius="md"
            mx={4}
            onClick={() => {
              getUser({ userId });
              SearchIdUser();
            }}
          >
            検索
          </Button>
        </Flex>
      </HStack>
      <Flex>
        {onSearch ? (
          <Wrap p={{ base: 4, md: 10 }}>
            {user && (
              <WrapItem>
                <UserCard imageApiUrl={imageApiUrl} id={user.id} name={user.name} onClick={onClickUser} />
              </WrapItem>
            )}
          </Wrap>
        ) : (
          <Wrap p={{ base: 4, md: 10 }}>
            {users.map((user) => (
              <WrapItem key={user.id} mx="auto">
                <UserCard imageApiUrl={imageApiUrl} id={user.id} name={user.name} onClick={onClickUser} />
              </WrapItem>
            ))}
          </Wrap>
        )}
      </Flex>
      <UserDetailModal user={selectedUser} isOpen={isOpen} onClose={onClose} />
    </>
  );
});

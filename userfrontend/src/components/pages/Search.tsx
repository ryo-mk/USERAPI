import { FC, memo, useCallback, useEffect, useState } from "react";
import { Button, Flex, HStack, Input, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";

import { UserCard } from "../organisms/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";

export const Search: FC = memo(() => {
  // console.log("再レンダリング");

  // ユーザーカードの画像を外部から取得
  const imageApiUrl = "https://source.unsplash.com/random";
  // 検索機能のon,offを切り替え
  const [onSearch, setOnSearch] = useState(false);
  // 入力された値を保持する
  const [inputId, setInputId] = useState<string>("");
  // 検索時のidを記憶
  const [userId, setUserId] = useState<string>("");
  // user情報の更新を監視する
  const [updateFlag, setUpdateFlag] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users } = useAllUsers();
  const { onSelectUser, selectedUser } = useSelectUser();

  // console.log("inpuId", inputId);
  // console.log("userId", userId);
  // console.log("search", users);
  // console.log("findUser", findUser);
  // console.log("Flag", updateFlag);

  useEffect(() => getUsers(), []);

  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    [users, onSelectUser, onOpen]
  );

  const onClickSearchReset = useCallback(() => {
    setOnSearch(false);
  }, []);

  const onClickSearchSubmit = useCallback(() => {
    console.log("onClickSearchSubmit called");
    setOnSearch(true);
    const inputElement = document.getElementById("userIdInput");
    if (inputElement instanceof HTMLInputElement) {
      setUserId(inputElement.value);
      inputElement.value = "";
    }
  }, []);

  return (
    <>
      <HStack p={2} spacing={6} justify="center">
        <Button bg="gray.400" color="white" onClick={onClickSearchReset}>
          検索リセット
        </Button>
        <Flex>
          <Input id="userIdInput" placeholder="ユーザーIDを入力" onChange={(e) => setInputId(e.target.value)} bg="white" />
          <Button bg="gray.300" borderRadius="md" mx={4} onClick={onClickSearchSubmit}>
            検索
          </Button>
        </Flex>
      </HStack>

      <Flex>
        {onSearch ? (
          <Wrap p={{ base: 4, md: 10 }}>
            {users
              .filter((user) => String(user.id) === userId)
              .map((user) => (
                <WrapItem key={user.id} mx="auto">
                  <UserCard imageApiUrl={imageApiUrl} id={user.id} name={user.name} onClick={onClickUser} />
                </WrapItem>
              ))}
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
      <UserDetailModal users={users} user={selectedUser} isOpen={isOpen} onClose={onClose} updateFlag={updateFlag} setUpdateFlag={setUpdateFlag} />
    </>
  );
});

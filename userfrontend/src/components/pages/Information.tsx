import { FC, memo, useCallback, useEffect, useState } from "react";
import { Button, Flex, HStack, Input, Wrap, WrapItem, useDisclosure } from "@chakra-ui/react";

import { UserCard } from "../organisms/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { UserDetailModal } from "../organisms/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";
import { useMessage } from "../../hooks/useMessage";
// import { useFindById } from "../../hooks/useFindById";

export const Information: FC = memo(() => {
  // ユーザーカードの画像を外部から取得
  const imageApiUrl = "https://source.unsplash.com/random";
  // 検索機能のon,offを切り替え
  const [onSearch, setOnSearch] = useState(false);
  // 入力された値を保持する
  const [inputId, setInputId] = useState<string>("");
  // 検索時のidを記憶
  const [userId, setUserId] = useState<string>("");
  // user情報の更新を監視する
  const [informationChangeFlag, setInformationChangeFlag] = useState(false);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const { getUsers, users } = useAllUsers();
  // const { getUser, findUser, setFindUser } = useFindById();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { showMessage } = useMessage();

  useEffect(() => getUsers(), [informationChangeFlag]);

  const onClickUser = useCallback(
    (id: number) => {
      onSelectUser({ id, users, onOpen });
    },
    [users, onSelectUser, onOpen]
  );

  const onClickSearchReset = useCallback(() => {
    setOnSearch(false);
    showMessage({ title: "検索結果をリセットしました", status: "success" });
  }, []);

  const onClickSearchSubmit = useCallback(() => {
    const inputElement = document.getElementById("userIdInput");

    if (inputElement instanceof HTMLInputElement) {
      const inputValue = inputElement.value;

      // id が存在するか確認
      if (inputValue.trim() !== "") {
        const isIdExists = users.some((user) => user.id === parseInt(inputValue));

        if (isIdExists) {
          setUserId(inputValue);
          setOnSearch(true);
        } else {
          showMessage({ title: "入力されたIDは存在しません", status: "error" });
        }
      } else {
        showMessage({ title: "入力が空です。IDを入力してください", status: "error" });
      }
      inputElement.value = ""; // 入力欄をクリア
    }
  }, [users]);

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
      <UserDetailModal users={users} user={selectedUser} isOpen={isOpen} onClose={onClose} informationChangeFlag={informationChangeFlag} setInformationChangeFlag={setInformationChangeFlag} setOnSearch={setOnSearch} />
    </>
  );
});

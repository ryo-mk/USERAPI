import { FC, memo, useCallback, useEffect, useState } from "react";
import { Button, Flex, HStack, Input, Link, Text, Wrap, WrapItem } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import { UserCard } from "../UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";
import { useFindById } from "../../hooks/useFindById";

export const Search: FC = memo(() => {
  const [userId, setUserId] = useState<string>("");
  const [onSearch, setOnSearch] = useState(false);

  const { getUsers, users } = useAllUsers();
  const { getUser, user } = useFindById();

  const onClickSearchReset = useCallback(() => {
    setOnSearch(false);
  }, []);

  useEffect(() => getUsers(), []);

  const SearchIdUser = () => {
    setOnSearch(true);
    setUserId("");
  };

  return (
    <>
      <HStack>
        <Button onClick={onClickSearchReset}>検索リセット</Button>
        <Flex>
          <Input placeholder="ユーザーIDを入力" value={userId} onChange={(e) => setUserId(e.target.value)} />
          <Button
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
          <Wrap>
            {user && (
              <WrapItem>
                <UserCard id={user.id} name={user.name} />
              </WrapItem>
            )}
          </Wrap>
        ) : (
          <Wrap>
            {users.map((user) => (
              <WrapItem key={user.id}>
                <UserCard id={user.id} name={user.name} />
              </WrapItem>
            ))}
          </Wrap>
        )}
      </Flex>
    </>
  );
});

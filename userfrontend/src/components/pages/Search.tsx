import { FC, memo, useCallback, useEffect, useState } from "react";
import { Button, Flex, HStack, Input, Link, Text, Wrap, WrapItem } from "@chakra-ui/react";

import { UserCard } from "../UserCard";
import { useAllUsers } from "../../hooks/useAllUsers";

import axios from "axios";
import { User } from "../../types/api/user";
import { FindByIdProps, useFindById } from "../../hooks/useFindById";

import { Navigate, useNavigate } from "react-router-dom";

export const Search: FC = memo(() => {
  const [userId, setUserId] = useState<string>("");

  const [onSearch, setOnSearch] = useState(false);
  const { getUsers, users } = useAllUsers();
  const { getUser, user } = useFindById();
  const navigate = useNavigate();
  const onClickHome = useCallback(() => {
    navigate("/search");
    setOnSearch(false);
  }, []);

  useEffect(() => getUsers(), []);

  const idUser = () => {
    setOnSearch(true);
  };

  return (
    <>
      <HStack>
        <Link onClick={onClickHome}>ユーザー一覧</Link>
        <Flex>
          <Input placeholder="ユーザーIDを入力" onChange={(e) => setUserId(e.target.value)} />
          <Button
            onClick={() => {
              getUser({ userId });
              idUser();
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

import { useCallback, useState } from "react";
import axios from "axios";

import type { User } from "../types/api/user";

// 全てのユーザー情報を取得するカスタムフック
export const useAllUsers = () => {
  const [users, setUsers] = useState<Array<User>>([]);

  const getUsers = useCallback(() => {
    axios
      .get<Array<User>>("http://localhost:8080/users")
      .then((res) => setUsers(res.data))
      .catch(() => {
        alert("ユーザーが見つかりませんでした");
      });
  }, []);

  return { getUsers, users };
};

import { useCallback, useState } from "react";
import axios from "axios";

import type { User } from "../types/api/user";

export type FindByIdProps = {
  userId: string;
};

// 入力されたidに該当するユーザーを取得するカスタムフック
export const useFindById = () => {
  const [user, setUser] = useState<User>();

  const getUser = useCallback((props: FindByIdProps) => {
    const { userId } = props;
    axios
      .get<User>(`http://localhost:8080/users/${userId}`)
      .then((res) => setUser(res.data))
      .catch(() => {
        alert("ユーザーが見つかりませんでした");
      });
  }, []);

  return { getUser, user };
};

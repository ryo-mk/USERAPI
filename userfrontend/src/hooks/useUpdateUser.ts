import { useCallback } from "react";
import axios from "axios";

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

type Props = {
  users: Array<User>;
  user: User | null;
  name: string;
  informationChangeFlag: boolean;
  setInformationChangeFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

// Modalから特定のユーザーの情報を更新するカスタムフック
export const useUpdateUser = () => {
  const { showMessage } = useMessage();

  const updateUser = useCallback((props: Props) => {
    const { users, user, name, informationChangeFlag, setInformationChangeFlag } = props;

    function changeUserName(id: number, newName: string): void {
      const index = users.findIndex((user) => user.id === id);
      // console.log("update", user);
      if (index !== -1) {
        users[index].name = newName;
      } else {
        console.error(`ID ${id} が見つかりませんでした。`);
      }
    }

    axios
      .patch(`http://localhost:8080/users/${user?.id}`, { name: name })
      .then((res) => {
        showMessage({ title: "ユーザー情報を更新しました", status: "success" });
        changeUserName(user!.id, name);
        setInformationChangeFlag(!informationChangeFlag);
      })
      .catch(() => {
        showMessage({ title: "更新に失敗しました", status: "error" });
      });
  }, []);

  return { updateUser };
};

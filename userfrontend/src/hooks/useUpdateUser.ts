import axios from "axios";

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";
import { useCallback } from "react";
import { useAllUsers } from "./useAllUsers";
import { useFindById } from "./useFindById";

type Props = {
  users: Array<User>;
  user: User | null;
  name: string;
  updateFlag: boolean;
  setUpdateFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

// Modalから特定のユーザーの情報を更新するカスタムフック
export const useUpdateUser = () => {
  const { showMessage } = useMessage();
  const { getUsers } = useAllUsers();
  const { findUser, setFindUser } = useFindById();

  const updateUser = useCallback(
    (props: Props) => {
      const { users, user, name, updateFlag, setUpdateFlag } = props;

      function changeUserName(id: number, newName: string): void {
        const index = users.findIndex((user) => user.id === id);
        // console.log("update", user);

        if (index !== -1) {
          // 見つかった場合、名前を変更
          users[index].name = newName;
        } else {
          console.error(`ID ${id} が見つかりませんでした。`);
        }
      }

      axios
        .patch(`http://localhost:8080/users/${user?.id}`, { name: name })
        .then((res) => {
          showMessage({ title: "ユーザー情報を更新しました", status: "success" });
          console.log("data", res.data);
          changeUserName(user!.id, name);
          setUpdateFlag(!updateFlag);
        })

        .catch(() => {
          showMessage({ title: "更新に失敗しました", status: "error" });
        });
    },
    [getUsers]
  );

  return { updateUser };
};

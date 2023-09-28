import axios from "axios";
import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

type Props = {
  user: User | null;
  name: string;
};

// Modalから特定のユーザーの情報を更新するカスタムフック
export const useUpdateUser = () => {
  const { showMessage } = useMessage();

  const updateUser = (props: Props) => {
    const { user, name } = props;

    axios
      .patch(`http://localhost:8080/users/${user?.id}`, { name })
      .then((res) => {
        showMessage({ title: "ユーザー情報を更新しました", status: "success" });
      })
      .catch(() => {
        showMessage({ title: "更新に失敗しました", status: "error" });
      });
  };

  return { updateUser };
};

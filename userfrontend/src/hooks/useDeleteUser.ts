import { useCallback } from "react";
import axios from "axios";

import { User } from "../types/api/user";
import { useMessage } from "./useMessage";

type Props = {
  user: User | null;
  setOnSearch: React.Dispatch<React.SetStateAction<boolean>>;
  informationChangeFlag: boolean;
  setInformationChangeFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

// 選択したユーザーModalからユーザーを削除するカスタムフック
export const useDeleteUser = () => {
  const { showMessage } = useMessage();
  const deleteUser = useCallback((props: Props) => {
    const { user, setOnSearch, informationChangeFlag, setInformationChangeFlag } = props;

    axios
      .delete(`http://localhost:8080/users/${user?.id}`)
      .then((res) => {
        showMessage({ title: "ユーザーを削除しました", status: "success" });
        setOnSearch(false);
        setInformationChangeFlag(!informationChangeFlag);
      })
      .catch(() => {
        showMessage({ title: "削除に失敗しました", status: "error" });
      });
  }, []);

  return { deleteUser };
};

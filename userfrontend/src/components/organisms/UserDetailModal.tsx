import { FC, useEffect, useState, ChangeEvent, useMemo } from "react";

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, FormControl, FormLabel, Input, ModalFooter, Button, FormHelperText, FormErrorMessage } from "@chakra-ui/react";

import type { User } from "../../types/api/user";
import { useUpdateUser } from "../../hooks/useUpdateUser";

type Props = {
  users: Array<User>;
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
  updateFlag: boolean;
  setUpdateFlag: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserDetailModal: FC<Props> = (props) => {
  const { users, user, isOpen, onClose, updateFlag, setUpdateFlag } = props;

  const [name, setName] = useState("");

  const { updateUser } = useUpdateUser();

  const isError = useMemo(() => name === "", [name]);

  useEffect(() => {
    setName(user?.name ?? "");
  }, [user]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onClickUpdate = () => {
    updateUser({ users, user, name, updateFlag, setUpdateFlag });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} autoFocus={false}>
      <ModalOverlay>
        <ModalContent pb={2}>
          <ModalHeader>ユーザー詳細</ModalHeader>
          <ModalCloseButton />
          <ModalBody mx={4}>
            <Stack spacing={4}>
              <FormControl>
                <FormLabel>id</FormLabel>
                <Input value={user?.id} isReadOnly />
              </FormControl>
              <FormControl isInvalid={isError}>
                <FormLabel>name</FormLabel>
                <Input value={name} onChange={onChangeName} />
                {!isError ? <FormHelperText>名前を入力してください(20文字以内)</FormHelperText> : <FormErrorMessage>*名前は必須です*</FormErrorMessage>}
              </FormControl>
              <FormControl>
                <FormLabel>mail</FormLabel>
                <Input value="sampl@sample.com" isReadOnly />
              </FormControl>
              <FormControl>
                <FormLabel>sales staff</FormLabel>
                <Input value="Sample Tarou" isReadOnly />
              </FormControl>
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button bg="teal.400" color="white" onClick={onClickUpdate}>
              更新
            </Button>
          </ModalFooter>
        </ModalContent>
      </ModalOverlay>
    </Modal>
  );
};

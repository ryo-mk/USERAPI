import { FC, useEffect, useState, ChangeEvent } from "react";

import { Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Stack, FormControl, FormLabel, Input, ModalFooter, Button } from "@chakra-ui/react";

import type { User } from "../../types/api/user";
import { useUpdateUser } from "../../hooks/useUpdateUser";
import { useAllUsers } from "../../hooks/useAllUsers";

type Props = {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
};

export const UserDetailModal: FC<Props> = (props) => {
  const [name, setName] = useState("");

  const { user, isOpen, onClose } = props;
  const { getUsers, users } = useAllUsers();
  const { updateUser } = useUpdateUser();

  useEffect(() => {
    setName(user?.name ?? "");
  }, [user]);

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const onClickUpdate = () => {
    updateUser({ user, name });
    onClose();
    getUsers();
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
              <FormControl>
                <FormLabel>name</FormLabel>
                <Input value={name} onChange={onChangeName} />
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

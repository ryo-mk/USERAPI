import { FC } from "react";
import { Button, Drawer, DrawerBody, DrawerContent, DrawerOverlay } from "@chakra-ui/react";

type Props = {
  onClose: () => void;
  isOpen: boolean;
  onClickHome: () => void;
  onClickSearch: () => void;
  onClickHowToUse: () => void;
};

export const MenuDrawer: FC<Props> = (props) => {
  const { onClose, isOpen, onClickHome, onClickSearch, onClickHowToUse } = props;

  return (
    <Drawer placement="left" size="xs" onClose={onClose} isOpen={isOpen}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerBody p={0} bg="gray.100">
            <Button w="100%" onClick={onClickHome}>
              TOP
            </Button>
            <Button w="100%" onClick={onClickSearch}>
              ユーザー一覧
            </Button>
            <Button w="100%" onClick={onClickHowToUse}>
              使い方
            </Button>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
};

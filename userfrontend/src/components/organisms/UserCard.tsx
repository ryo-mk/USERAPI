import { FC } from "react";
import { Box, Image, Stack, Text } from "@chakra-ui/react";

type Props = {
  imageApiUrl: string;
  id: number;
  name: string;
  onClick: (id: number) => void;
};

export const UserCard: FC<Props> = (props) => {
  const { id, name, imageApiUrl, onClick } = props;

  return (
    <Box w="260px" h="260px" p={4} bg="white" borderRadius="10px" shadow="md" _hover={{ cursor: "pointer", opacity: 0.8 }} onClick={() => onClick(id)}>
      <Stack textAlign="center">
        <Image src={imageApiUrl} alt={name} borderRadius="full" m="auto" boxSize="160px" />
        <Text fontSize="sm" color="gray">
          id:{id}
        </Text>
        <Text fontSize="lg" fontWeight="bold">
          name:{name}
        </Text>
      </Stack>
    </Box>
  );
};

import { FC, useEffect, useState } from "react";
import { Box, Image, Stack, Text } from "@chakra-ui/react";

import { User } from "../../types/api/user";

export const UserCard: FC<User> = (props) => {
  const { id, name } = props;
  const imageApiUrl = "https://source.unsplash.com/random";

  return (
    <Box bg="teal" w="260px" h="260px">
      <Stack textAlign="center">
        <Image src={imageApiUrl} m="auto" boxSize="160px" />
        <Text>id:{id}</Text>
        <Text>name:{name}</Text>
      </Stack>
    </Box>
  );
};

import { FC, useEffect, useState } from "react";
import { Box, Flex, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";

import { User } from "../types/api/user";

export const UserSheet: FC<User> = (props) => {
  const { id, name } = props;

  return (
    <>
      <Box>
        <Flex>
          <Text>id:{id}</Text>
          <Text>name:{id}</Text>
          <Text>email:{id}</Text>
          <Text>staff:{id}</Text>
        </Flex>
      </Box>

      {/* <Text>id:{id}</Text>
      <Text>name:{name}</Text>
      <Text>email:</Text>
      <Text>sales staff:</Text> */}
    </>
  );
};

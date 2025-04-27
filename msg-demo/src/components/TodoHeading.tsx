import { Heading, Stack, Highlight, Text } from "@chakra-ui/react";
import { FC } from "react";

const TodoHeading: FC = () => {
  return (
    <Stack mb={4}>
      <Heading size="2xl" letterSpacing="tight">
        <Highlight query="Repacked msg!" styles={{ color: "teal.600" }}>
          Todo App with Repacked msg!
        </Highlight>
      </Heading>
      <Text fontSize="md" color="fg.muted">
        A simple todo app to demonstrate the feature of repacked msg state
        manager.
      </Text>
    </Stack>
  );
};

export default TodoHeading;

import { Heading, Flex, Box, Button } from "@chakra-ui/react";
import { useApp } from "../contexts/AppContext";
import TodoItem from "../components/todoItem";
import CreateUpdate from "../components/createUpdate";

const TodoPage = () => {
  const { getData, toggleCreateUpdate, setUpdatedData } = useApp();

  return (
    <Box p="3">
      <Heading>Todo List</Heading>
      <Button
        colorScheme="blue"
        my="3"
        size="sm"
        onClick={() => {
          setUpdatedData();
          toggleCreateUpdate();
        }}
      >
        New
      </Button>
      <Flex gap="5">
        <Flex direction="column" flex="1" gap="3">
          {getData().map((data) => (
            <TodoItem key={data.id} data={data} />
          ))}
        </Flex>

        <CreateUpdate />
      </Flex>
    </Box>
  );
};

export default TodoPage;

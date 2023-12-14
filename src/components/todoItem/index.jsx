import { Flex, Button, Spacer, Text } from "@chakra-ui/react";
import { useApp } from "../../contexts/AppContext";

const TodoItem = ({ data }) => {
  const { deleteData, toggleCreateUpdate, setUpdatedData } = useApp();

  console.log(data);
  return (
    <Flex
      border="1px solid black"
      borderRadius="md"
      w="100%"
      p="3"
      gap="3"
      alignItems="center"
    >
      <Text>{data.name}</Text>
      <Spacer />
      <Button
        colorScheme="green"
        size="sm"
        onClick={() => {
          setUpdatedData(data);
          toggleCreateUpdate();
        }}
      >
        Edit
      </Button>
      <Button
        colorScheme="red"
        size="sm"
        onClick={() => {
          setUpdatedData();
          deleteData(data.id);
        }}
      >
        Delete
      </Button>
    </Flex>
  );
};

export default TodoItem;

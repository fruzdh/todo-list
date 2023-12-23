import { Flex, Button, Spacer, Text } from "@chakra-ui/react";
import { deleteData } from "../todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ name, index, setUpdatedData, setIsCreateUpdate }) => {
  const dispatch = useDispatch();

  return (
    <Flex
      borderRadius="md"
      w="100%"
      px="3"
      gap="3"
      alignItems="center"
      boxShadow="md"
      bgColor={index % 2 === 0 ? "darkturquoise" : "cyan.700"}
    >
      <Text textColor="white" fontWeight="bold">
        {name}
      </Text>
      <Spacer />
      <Button
        bgColor="lightgreen"
        textColor="white"
        my="3"
        size="sm"
        boxShadow="md"
        onClick={() => {
          setUpdatedData({ name: name, index: index });
          setIsCreateUpdate(true);
        }}
        _hover={{
          bgColor: "lightgreen",
          opacity: 0.9,
        }}
      >
        Edit
      </Button>
      <Button
        size="sm"
        bgColor="lightcoral"
        textColor="white"
        boxShadow="md"
        onClick={() => {
          dispatch(deleteData(index));
          setUpdatedData();
          setIsCreateUpdate(false);
        }}
        _hover={{
          bgColor: "lightcoral",
          opacity: 0.9,
        }}
      >
        Delete
      </Button>
    </Flex>
  );
};

export default TodoItem;

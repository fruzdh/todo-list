import {
  Flex,
  Button,
  Spacer,
  Text,
  Heading,
  Box,
  Tag,
} from "@chakra-ui/react";
import { deleteData } from "../todoSlice";
import { useDispatch } from "react-redux";

const TodoItem = ({ item, index, setUpdatedData, setIsCreateUpdate }) => {
  const dispatch = useDispatch();

  return (
    <Box
      borderRadius="md"
      w="100%"
      p="3"
      gap="3"
      boxShadow="md"
      bgColor={index % 2 === 0 ? "darkturquoise" : "cyan.700"}
      textColor="white"
    >
      <Heading fontSize="16px" noOfLines={2}>
        {item.name}
      </Heading>
      <Text fontSize="14px" noOfLines={5} my="2">
        {item.description}
      </Text>
      <Flex gap="3" flexWrap="wrap">
        <Tag bgColor="#FFD6A5" boxShadow="md">
          {item.status}
        </Tag>
        <Spacer />
        <Button
          bgColor="lightgreen"
          textColor="white"
          size="sm"
          boxShadow="md"
          minW="50px"
          onClick={() => {
            setUpdatedData({ ...item });
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
          minW="70px"
          onClick={() => {
            dispatch(deleteData(item.id));
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
    </Box>
  );
};

export default TodoItem;

import { Heading, Flex, Box, Button } from "@chakra-ui/react";
import CreateUpdate from "./components/CreateUpdate";
import TodoItem from "./components/TodoItem";
import { useSelector } from "react-redux";
import { selectTodo } from "./todoSlice";
import { useState } from "react";

const Todo = () => {
  const data = useSelector(selectTodo);
  const [isCreateUpdate, setIsCreateUpdate] = useState(false);
  const [updatedData, setUpdatedData] = useState();

  return (
    <Box p="3">
      <Flex gap="5">
        <Box w="50%">
          <Heading
            bgColor="lightblue"
            fontSize="xxx-large"
            p="5"
            borderRadius="lg"
            textColor="white"
            boxShadow="md"
          >
            Todo List
          </Heading>
          <Button
            bgColor="lightgreen"
            textColor="white"
            my="3"
            size="sm"
            boxShadow="md"
            onClick={() => {
              setUpdatedData();
              setIsCreateUpdate(true);
            }}
            _hover={{
              bgColor: "lightgreen",
              opacity: 0.9,
            }}
          >
            New
          </Button>
          <CreateUpdate
            isCreateUpdate={isCreateUpdate}
            setIsCreateUpdate={setIsCreateUpdate}
            updatedData={updatedData}
            setUpdatedData={setUpdatedData}
          />
        </Box>

        <Flex direction="column" w="50%" gap="3">
          {data.map((name, index) => (
            <TodoItem
              key={index}
              name={name}
              index={index}
              setUpdatedData={setUpdatedData}
              setIsCreateUpdate={setIsCreateUpdate}
            />
          ))}
        </Flex>
      </Flex>
    </Box>
  );
};

export default Todo;

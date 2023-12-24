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
      <Flex gap="5" flexWrap={{ base: "wrap", md: "nowrap" }}>
        <Box w={["50%", "100%"]}>
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

        <Flex direction="column" w={["50%", "100%"]} gap="3">
          {Object.keys(data)
            .map((key) => ({
              id: key,
              ...data[key],
              status: data[key].is_done
                ? "DONE"
                : new Date(data[key].deadline).getTime() < new Date().getTime()
                ? `(LATE) ${new Date(data[key].deadline).toString()}`
                : new Date(data[key].deadline).toString(),
            }))
            .sort((a, b) => {
              if (a.is_done && !b.is_done) {
                return 1;
              } else if (!a.is_done && b.is_done) {
                return -1;
              } else if (a.is_done && b.is_done) {
                return (
                  new Date(b.deadline).getTime() -
                  new Date(a.deadline).getTime()
                );
              } else {
                return (
                  new Date(a.deadline).getTime() -
                  new Date(b.deadline).getTime()
                );
              }
            })
            .map((item, index) => (
              <TodoItem
                key={item.id}
                item={item}
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

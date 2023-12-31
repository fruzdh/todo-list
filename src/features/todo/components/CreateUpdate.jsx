import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Switch,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { createData, updateData } from "../todoSlice";

const CreateUpdate = ({
  isCreateUpdate,
  setIsCreateUpdate,
  updatedData,
  setUpdatedData,
}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    setName(updatedData?.name || "");
    setDescription(updatedData?.description || "");
    setDeadline(updatedData?.deadline || "");
    setIsDone(updatedData?.is_done || false);
  }, [
    updatedData?.deadline,
    updatedData?.description,
    updatedData?.is_done,
    updatedData?.name,
  ]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (updatedData) {
      dispatch(
        updateData(updatedData?.id, name, description, deadline, isDone)
      );
    } else {
      dispatch(createData(name, description, deadline));
    }

    setName("");
    setDescription("");
    setDeadline("");
    setIsDone(false);
    setUpdatedData();
    setIsCreateUpdate(false);
  };

  const isDisabled = useMemo(() => {
    if (updatedData) {
      return (
        (name.length === 0 || name === updatedData?.name) &&
        (description.length === 0 ||
          description === updatedData?.description) &&
        (deadline === "" || deadline === updatedData?.deadline) &&
        isDone === updatedData?.is_done
      );
    } else {
      return name.length === 0 || description.length === 0 || deadline === "";
    }
  }, [deadline, description, isDone, name, updatedData]);

  return (
    <Box flex="1" display={isCreateUpdate ? "block" : "none"}>
      <form onSubmit={onSubmit}>
        <FormControl mb="3" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            _focusVisible={{
              boxShadow: "0 0 0 2px lightblue",
            }}
          />
        </FormControl>

        <FormControl mb="3" isRequired>
          <FormLabel>Description</FormLabel>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            _focusVisible={{
              boxShadow: "0 0 0 2px lightblue",
            }}
          />
        </FormControl>

        <FormControl mb="3" isRequired>
          <FormLabel>Deadline</FormLabel>
          <Input
            type="datetime-local"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            maxW="200px"
            _focusVisible={{
              boxShadow: "0 0 0 2px lightblue",
            }}
          />
        </FormControl>

        {updatedData && (
          <FormControl display="flex" alignItems="center" mb="3">
            <FormLabel>Done</FormLabel>
            <Switch
              isChecked={isDone}
              onChange={() => setIsDone(!isDone)}
              _checked={{
                ".chakra-switch__track": {
                  bgColor: "lightblue",
                },
              }}
              sx={{
                ".chakra-switch__track": {
                  bgColor: "darkgray",
                },
              }}
            />
          </FormControl>
        )}

        <Button
          size="sm"
          bgColor="lightcoral"
          textColor="white"
          boxShadow="md"
          mr="3"
          onClick={() => {
            setName("");
            setUpdatedData();
            setIsCreateUpdate(false);
          }}
          _hover={{
            bgColor: "lightcoral",
            opacity: 0.9,
          }}
        >
          Cancel
        </Button>

        <Button
          type="submit"
          size="sm"
          bgColor="lightgreen"
          textColor="white"
          boxShadow="md"
          _hover={{
            bgColor: "lightgreen",
            opacity: 0.9,
          }}
          isDisabled={isDisabled}
        >
          {updatedData ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateUpdate;

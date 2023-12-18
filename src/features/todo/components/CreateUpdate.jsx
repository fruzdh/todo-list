import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    setName(updatedData?.name || "");
  }, [updatedData?.name]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (updatedData) {
      dispatch(updateData(name, updatedData.index));
    } else {
      dispatch(createData(name));
    }

    setName("");
    setUpdatedData();
    setIsCreateUpdate(false);
  };

  return (
    <Box flex="1" display={isCreateUpdate ? "block" : "none"}>
      <form onSubmit={onSubmit}>
        <FormControl mb="3">
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
          isDisabled={name.length === 0 || name === updatedData?.name}
        >
          {updatedData ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateUpdate;

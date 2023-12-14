import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useApp } from "../../contexts/AppContext";
import { useEffect, useState } from "react";

const CreateUpdate = () => {
  const [name, setName] = useState("");
  const {
    createData,
    updateData,
    createUpdate,
    toggleCreateUpdate,
    updatedData,
    setUpdatedData,
  } = useApp();

  useEffect(() => {
    if (updatedData) {
      setName(updatedData.name);
    }
  }, [updatedData]);

  const onSubmit = (e) => {
    e.preventDefault();
    if (updatedData) {
      updateData(updatedData.id, name);
    } else {
      createData(name);
    }

    setUpdatedData();
    toggleCreateUpdate();
  };

  return (
    <Box flex="1" visibility={createUpdate ? "unset" : "hidden"}>
      <form onSubmit={onSubmit}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <Button
          type="submit"
          mt="3"
          size="sm"
          colorScheme="blue"
          isDisabled={name.length === 0 || name === updatedData?.name}
        >
          {updatedData ? "Update" : "Create"}
        </Button>
      </form>
    </Box>
  );
};

export default CreateUpdate;

import { createContext, useContext, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const AppContext = createContext({
  createData: () => {},
  getData: () => {},
  updateData: () => {},
  deleteData: () => {},
  createUpdate: false,
  toggleCreateUpdate: () => {},
  updatedData: {},
  setUpdatedData: () => {},
});

const AppProvider = (props) => {
  const [data, setData] = useState([]);
  const [createUpdate, setCreateUpdate] = useState(false);
  const [updatedData, setUpdatedData] = useState();

  const createData = (name) => {
    setData([...data, { id: uuidv4(), name: name }]);
  };

  const getData = () => {
    return data;
  };

  const updateData = (id, name) => {
    const temp = data;
    data.forEach((v, i) => {
      if (v.id === id) {
        temp[i].name = name;
      }
    });

    setData(temp);
  };

  const deleteData = (id) => {
    const temp = data.filter((v) => v.id !== id);
    setData(temp);
  };

  const toggleCreateUpdate = () => {
    setCreateUpdate(!createUpdate);
  };

  return (
    <AppContext.Provider
      value={{
        createData,
        getData,
        updateData,
        deleteData,
        createUpdate,
        toggleCreateUpdate,
        updatedData,
        setUpdatedData,
      }}
      {...props}
    />
  );
};

const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be inside AppProvider");
  }

  return context;
};

export { AppContext, AppProvider, useApp };

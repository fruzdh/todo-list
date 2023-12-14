import "./App.css";
import { AppProvider } from "./contexts/AppContext";
import TodoPage from "./page/todoPage";

function App() {
  return (
    <AppProvider>
      <TodoPage />
    </AppProvider>
  );
}

export default App;

import { StrictMode, FC } from "react";
import * as ReactDOM from "react-dom/client";
import { Provider } from "./components/ui/provider";
import { Box } from "@chakra-ui/react";
import TodoHeading from "./components/TodoHeading";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import CodeBlock from "./components/CodeBlock";

const App: FC = () => {
  return (
    <Box p={4} display={"flex"} minH={"100vh"} flexDirection={"column"} alignItems={"center"} maxW={"lg"} margin={"auto"}>
      <TodoHeading />
      <AddTodo />
      <TodoList />
      <CodeBlock/>
    </Box>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider defaultTheme="dark">
      <App />
    </Provider>
  </StrictMode>
);

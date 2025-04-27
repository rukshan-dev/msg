import { Button } from "@chakra-ui/react";
import { FC, useState } from "react";
import { CodeBlock as ReactCodeBlock, a11yDark } from "react-code-blocks";

const code: string = `import { createStore } from "@repacked-tools/msg";

type TodoStore = {
  current: {
    value: string;
  };
  todos: {
    id: number;
    completed: boolean;
    value: string;
  }[];
};

const defaultState: TodoStore = {
  current: {
    value: "",
  },
  todos: [],
};

const todoStore = createStore(defaultState, (state) => ({
    changeCurrent: (value: string) => {
      state.current.value = value;
    },
    addTodo: (value: string) => {
      state.todos.push({
        id: Date.now(),
        completed: false,
        value,
      });
      state.current.value = "";
    },
    removeTodo: (index: number) => {
      state.todos.splice(index, 1);
    },
    completeTodo: (index: number, completed: boolean) => {
      state.todos[index].completed = completed;
    },
  }))

export default todoStore;
`;

const CodeBlock: FC = () => {
  const [show, setShow] = useState(false);

  if (!show) {
    return (
      <Button width={"100%"} variant={"subtle"} onClick={() => setShow(true)}>
        Show Code
      </Button>
    );
  }
  return <ReactCodeBlock language="typescript" text={code} theme={a11yDark} />;
};

export default CodeBlock;

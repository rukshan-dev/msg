import { useSelector } from "@repacked-tools/msg-react";
import { FC } from "react";
import todoStore from "../todoStore";
import { Button, Card } from "@chakra-ui/react";
import { LuCheck, LuUndo } from "react-icons/lu";
import { keyframes } from "@emotion/react";

const highlightFade = keyframes`
  0% {
    border-color: #38bdf8;
    box-shadow: 0 0 10px #38bdf8;
  }
  100% {
    border-color: transparent;
    box-shadow: none;
  }
`;

const Todo: FC<{ index: number }> = ({ index }) => {
  const todo = useSelector(todoStore, (state) => state.todos[index]);

  const removeHandler = () => {
    todoStore.actions.removeTodo(index);
  };

  const handleComplete = () => {
    todoStore.actions.completeTodo(index, true);
  };

  const handleUndo = () => {
    todoStore.actions.completeTodo(index, false);
  };

  return (
    <Card.Root
      mb={2}
      width={"100%"}
      key={`${todo.completed}${todo.value}${index}`}
      animation={`${highlightFade} 1.5s ease-out`}
    >
      <Card.Body>
        <Card.Description>{todo.value}</Card.Description>
      </Card.Body>
      <Card.Footer>
        <Button
          variant="subtle"
          colorPalette="red"
          flex="1"
          onClick={removeHandler}
        >
          Delete
        </Button>
        {!todo.completed ? (
          <Button
            variant="subtle"
            colorPalette="blue"
            flex="1"
            onClick={handleComplete}
          >
            <LuCheck />
            Complete
          </Button>
        ) : (
          <Button
            variant="subtle"
            colorPalette="cyan"
            flex="1"
            onClick={handleUndo}
          >
            <LuUndo />
            Undo
          </Button>
        )}
      </Card.Footer>
    </Card.Root>
  );
};

export default Todo;

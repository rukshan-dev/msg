import { Button, Group, Input } from "@chakra-ui/react";
import { useSelector } from "@repacked-tools/msg-react";
import { FC } from "react";
import todoStore from "../todoStore";

const AddTodo: FC = () => {
  const currentTodo = useSelector(todoStore, (state) => state.current.value);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    todoStore.actions.changeCurrent(e.target.value);
  };

  const addTodoHandler = () => {
    todoStore.actions.addTodo(currentTodo);
  };

  return (
    <Group attached w="full" mb={3}>
      <Input
        placeholder="Add your Todo"
        value={currentTodo}
        onChange={onChange}
        variant="outline"
      />
      <Button bg="bg.subtle" variant="outline" onClick={addTodoHandler}>
        Add
      </Button>
    </Group>
  );
};

export default AddTodo;

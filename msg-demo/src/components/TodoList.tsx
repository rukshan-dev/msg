import { useSelector } from "@repacked-tools/msg-react";
import { FC, Fragment } from "react";
import todoStore from "../todoStore";
import Todo from "./Todo";

const TodoList: FC = () => {
  console.log("RENDER: TODO_LIST");
  const todoList = useSelector(todoStore, (state) => state.todos);

  return (
    <Fragment>
      {todoList.map((i, index) => {
        return <Todo index={index} key={index} />;
      })}
    </Fragment>
  );
};

export default TodoList;

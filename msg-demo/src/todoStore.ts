import {
  applyMiddlewares,
  createStore,
} from "@repacked-tools/msg";
import { get, set } from "./utils/storage";

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
  todos: [
    {
      id: 1,
      completed: false,
      value: `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
    },
  ],
};

const todoStore = applyMiddlewares(
  createStore(get("todos", defaultState), (state) => ({
    changeCurrent: (value: string) => {
      state.current.value = value;
    },
    addTodo: (value: string) => {
      state.todos.unshift({
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
)((store) => (dispatch) => (action, ...props) => {
  console.log({ action, props });
  dispatch(action, ...props);
  set("todos", store.getState());
});

export default todoStore;

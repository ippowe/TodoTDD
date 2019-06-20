import { ITodo } from "../components/TodoListItem";
import { getType, ActionType } from 'typesafe-actions';
import * as Actions from '../_actions/todoActions';

export interface IState {
  todos: ITodo[];
  nextId: number;
}


const defaultTodos: ITodo[] = [
];

const initState = {
  todos: defaultTodos,
  nextId: 1
}

export default (state: IState = initState, action: ActionType<typeof Actions>) => {
  switch (action.type) {
    case getType(Actions.CREATE): {
      const newTodo: ITodo = { id: state.nextId, text: action.payload.value, done: false };
      const todos = state.todos.concat(newTodo);
      const nextId = state.nextId + 1;
      return { todos, nextId };
    }
    case getType(Actions.REMOVE): {
      const { id } = action.payload;
      const todos: ITodo[] = state.todos.filter(todo => todo.id !== id);
      return { ...state, todos };
    }
    case getType(Actions.TOGGLE): {
      const { id } = action.payload;
      const todos: ITodo[] = state.todos.map(todo => todo.id === id ? { ...todo, done: !todo.done } : todo);
      return { ...state, todos };
    }
    default:
      return state;
  }
}

import React from 'react';
import { TodoList, TodoForm } from '../../components';
import { useSelector, useDispatch } from 'react-redux';
import * as Actions from '../../_actions/todoActions';
import { IStoreState } from '../../store';

const TodoApp: React.FC = props => {
  const { todos } = useSelector((state: IStoreState) => {
    const { todos } = state.todo;
    return { todos: todos }
  });

  const dispatch = useDispatch();

  const handleInsert = (value: string) => {
    dispatch(Actions.CREATE(value));
  }

  const handleToggle = (id: number) => {
    dispatch(Actions.TOGGLE(id));
  }

  const handleRemove = (id: number) => {
    dispatch(Actions.REMOVE(id));
  }

  return (
    <React.Fragment>
      <TodoForm onInsert={handleInsert} />
      <TodoList onToggle={handleToggle} todos={todos} onRemove={handleRemove} />
    </React.Fragment>
  );
}

export default TodoApp;

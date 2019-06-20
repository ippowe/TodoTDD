import React from 'react';
import { TodoListItem } from '../index';
import { ITodo } from '../TodoListItem';

export interface IProps {
  todos: ITodo[];
  onToggle?(id: number): void;
  onRemove?(id: number): void;
}

const TodoList: React.FC<IProps> = props => {
  const { onToggle, onRemove, todos } = props;

  const handleToggle = (id: number) => {
    onToggle && onToggle(id)
  }

  const handleRemove = (id: number) => {
    onRemove && onRemove(id);
  }

  return (
    <ul data-testid='todo-list'>
      {
        todos.map((todo: ITodo) => {
          return <TodoListItem todo={todo} key={todo.id} onToggle={handleToggle} onRemove={handleRemove} />
        })
      }
    </ul>
  )
}

export default TodoList;
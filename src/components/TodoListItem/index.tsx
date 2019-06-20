import React, { useCallback } from 'react';
import Styled from 'styled-components';

export interface ITodo {
  id: number;
  text: string;
  done: boolean;
}

export interface IProps {
  todo: ITodo;
  onToggle?(id: number): void;
  onRemove?(id: number): void;
}

const TodoListItem: React.FC<IProps> = props => {
  const { id, text, done } = props.todo;
  const { onToggle, onRemove } = props;

  const handleClick = useCallback((e: React.MouseEvent<HTMLElement>) => {
    onToggle && onToggle(id);
  }, [id, onToggle])

  const handleClickButton = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    onRemove && onRemove(id);
  }, [id, onRemove])

  return (
    <li data-testid='todo-list__item'>
      <Text
        onClick={handleClick}
        data-testid='item-text'
        className={done ? 'isdone' : ''}>
        {text}
      </Text>
      <button
        onClick={handleClickButton}
        data-testid='item-button'>
        삭제
      </button>
    </li>
  )
}

const Text = Styled('b')`
  cursor: pointer;
  user-select: none;

  &.isdone {
    text-decoration: line-through;
  }
`;


export default TodoListItem;
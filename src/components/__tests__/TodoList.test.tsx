import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoList, { IProps } from '../TodoList';

describe('<TodoList />', () => {
  const sampleTodos = [
    {
      id: 1,
      text: 'TDD 배우기',
      done: false,
    },
    {
      id: 2,
      text: 'TDD Todo 만들기',
      done: false,
    }
  ];

  const setUp = (props: IProps = { todos: sampleTodos }) => {
    const utils = render(<TodoList {...props} />);
    const { getByTestId, getAllByTestId } = utils;
    const list = getByTestId('todo-list');
    const listItems = getAllByTestId('todo-list__item');

    return {
      ...utils,
      list,
      listItems
    }
  };

  it('have list and listItems', () => {
    const { list, listItems } = setUp();
    expect(list).toBeTruthy();
    expect(listItems).toHaveLength(sampleTodos.length);
  });

  it('call onToggle and onRemove', () => {
    const onRemove = jest.fn();
    const onToggle = jest.fn();
    const { getAllByTestId } = setUp({ todos: sampleTodos, onToggle, onRemove });

    fireEvent.click(getAllByTestId('item-text')[0]);
    expect(onToggle).toBeCalledWith(sampleTodos[0].id);

    fireEvent.click(getAllByTestId('item-button')[0]);
    expect(onRemove).toBeCalledWith(sampleTodos[0].id);

  })
})
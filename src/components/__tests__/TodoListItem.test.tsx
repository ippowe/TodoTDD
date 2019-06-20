import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoListItem, { IProps } from '../TodoListItem';

describe('<TodoListItem/>', () => {
  const sampleTodo = {
    id: 1,
    text: 'TDD 배우기',
    done: false,
  }

  const setUp = (props: IProps = { todo: sampleTodo }) => {
    const utils = render(<TodoListItem {...props} />);
    const { getByTestId, getByText } = utils;
    const item = getByText(sampleTodo.text);
    const button = getByTestId('item-button');

    return {
      ...utils,
      item,
      button
    }
  }

  it('render item properly', () => {
    const { item, button } = setUp();
    expect(item).toBeTruthy();
    expect(button).toBeTruthy();
  });

  it('show line when done is true', () => {
    const { item } = setUp({ todo: { ...sampleTodo, done: true } });
    expect(item).toHaveStyle('text-decoration: line-through')
  });

  it('does not show line when done is false', () => {
    const { item } = setUp({ todo: { ...sampleTodo, done: false } });
    expect(item).not.toHaveStyle('text-decoration: line-through')
  });

  it('call onToggle', () => {
    const onToggle = jest.fn();
    const { item } = setUp({ onToggle, todo: sampleTodo });
    fireEvent.click(item);
    expect(onToggle).toBeCalledWith(sampleTodo.id);
  });

  it('call onRemove', () => {
    const onRemove = jest.fn();
    const { button } = setUp({ todo: sampleTodo, onRemove });
    fireEvent.click(button);
    expect(onRemove).toBeCalledWith(sampleTodo.id);
  });
});
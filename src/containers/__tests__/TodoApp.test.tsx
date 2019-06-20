import React from 'react';
import { fireEvent } from '@testing-library/react';
import renderWithRedux from '../../_utils/rederWithRedux';
import TodoApp from '../TodoApp';

const createTestDummy = (input: HTMLElement, button: HTMLElement) => {
  fireEvent.change(input, {
    target: {
      value: '테스트 항목 추가'
    }
  });
  fireEvent.click(button);
};

describe('<TodoApp />', () => {
  const setUp = (props = {}) => {
    const utils = renderWithRedux(<TodoApp {...props} />);
    const { getByTestId } = utils;
    const list = getByTestId('todo-list');
    const form = getByTestId('todo-form');

    const formInput = getByTestId('todo-form__input');
    const formButton = getByTestId('todo-form__button');

    return {
      ...utils,
      formInput,
      formButton,
      list,
      form
    }
  }

  it('render components properly', () => {
    const { list, form } = setUp();
    expect(list).toBeTruthy();
    expect(form).toBeTruthy();
  });


  it('change done when click item text', () => {
    const { getByTestId, formButton, formInput } = setUp();
    createTestDummy(formInput, formButton);

    const itemText = getByTestId('item-text');
    expect(itemText).not.toHaveStyle('text-decoration: line-through');
    fireEvent.click(itemText);
    expect(itemText).toHaveStyle('text-decoration: line-through');
    fireEvent.click(itemText);
    expect(itemText).not.toHaveStyle('text-decoration: line-through');
  });

  it('remove item when click item button', () => {
    const { getByTestId } = setUp();
    const item = getByTestId('todo-list__item');
    const itemButton = item.children[1];

    fireEvent.click(itemButton);
    expect(item).not.toBeInTheDocument();
  });

  it('create new todo', () => {
    const { getByText, formInput, formButton } = setUp();
    createTestDummy(formInput, formButton);
    expect(getByText('테스트 항목 추가')).toBeTruthy();
  });
});
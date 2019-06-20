import * as React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TodoForm, { IProps } from '../TodoForm';

describe('<TodoForm />', () => {
  const setUp = (props: IProps = {}) => {
    const utils = render(<TodoForm {...props} />)
    const { getByTestId } = utils;
    const input = getByTestId('todo-form__input');
    const button = getByTestId('todo-form__button');

    return {
      ...utils,
      button,
      input
    }
  }

  it('render input and buttons', () => {
    const { button, input } = setUp();
    expect(button).toBeTruthy();
    expect(input).toBeTruthy();
  });

  it('chagne input', () => {
    const { input } = setUp();
    fireEvent.change(input, {
      target: {
        value: 'TDD 배우기'
      }
    });
    expect(input).toHaveAttribute('value', 'TDD 배우기');
  });

  it('call onInsert and clear Input', () => {
    const onInsert = jest.fn();
    const { input, button } = setUp({ onInsert });
    fireEvent.change(input, {
      target: {
        value: 'TDD 배우기'
      }
    });
    fireEvent.click(button);
    expect(onInsert).toBeCalledWith('TDD 배우기');
    expect(input).toHaveAttribute('value', '');
  })

})
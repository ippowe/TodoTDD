import React, { useState, useCallback } from 'react';

export interface IProps {
  onInsert?(value: string): void;
}

const TodoForm: React.FC<IProps> = props => {
  const { onInsert } = props;
  const [value, setValue] = useState('');

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onInsert && onInsert(value);
    setValue('');
  }, [onInsert, value]);

  return (
    <form
      onSubmit={handleSubmit}
      data-testid='todo-form'>
      <input
        value={value}
        onChange={handleChange}
        data-testid='todo-form__input'
        placeholder='할 일을 입력하세요' />
      <button
        type='submit'
        data-testid='todo-form__button'>등록</button>
    </form>
  )
}

export default TodoForm;
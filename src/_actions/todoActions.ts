import { createAction } from 'typesafe-actions';


export const CREATE = createAction(
  '@TD/CREATE',
  resolve => (value: string) => { return resolve({ value }) }
)

export const REMOVE = createAction(
  '@TD/REMOVE',
  resolve => (id: number) => { return resolve({ id }) }
);

export const TOGGLE = createAction(
  '@TD/TOGGLE',
  resolve => (id: number) => { return resolve({ id }) }
)
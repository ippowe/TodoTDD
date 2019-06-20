import '@testing-library/react/cleanup-after-each';
import 'jest-dom/extend-expect';

// React 16.8에서 발생하는 에러 핸들링
const originalError = console.error;
beforeAll(() => {
  console.error = (...args: any[]) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});
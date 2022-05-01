import React from 'react';
import { render, screen } from '@testing-library/react';
import TodoPage from './TodoPage/TodoPage';


test('renders learn react link', () => {
  render(<TodoPage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

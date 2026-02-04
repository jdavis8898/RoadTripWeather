import { render, screen } from '@testing-library/react';
import React from 'react';

// Mock the components to avoid leaflet CSS issues in tests
jest.mock('./components/TextInputTab', () => {
  return function TextInputTab() {
    return <div>Text Input Tab</div>;
  };
});

jest.mock('./components/MapInputTab', () => {
  return function MapInputTab() {
    return <div>Map Input Tab</div>;
  };
});

// Import after mocking
import App from './App';

test('renders Road Trip Weather app', () => {
  render(<App />);
  const titleElement = screen.getByText(/Road Trip Weather/i);
  expect(titleElement).toBeInTheDocument();
});

test('renders tab buttons', () => {
  render(<App />);
  const buttons = screen.getAllByRole('button');
  expect(buttons.length).toBeGreaterThanOrEqual(2);
});

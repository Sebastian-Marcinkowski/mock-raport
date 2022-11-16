import { render, screen } from '@testing-library/react';
import App from './App';

describe("Main window test", () => {
  test('Does it render', () => {
    render(<App />);

    const linkElement = screen.getByTestId("app-div");
    expect(linkElement).toBeInTheDocument();
    
  });
});
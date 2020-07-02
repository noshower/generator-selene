import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Greeting from '../greeting';

test('Fetch makes an API call and displays the greeting', async () => {
  const url = '/api/greeting';
  const { getByText } = render(<Greeting url={url} />);
  fireEvent.click(screen.getByText(/fetch/i));

  await waitFor(() => getByText('hello there'));
});

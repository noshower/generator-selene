import 'whatwg-fetch';
import { setupServer } from 'msw/node';
import handlers from './handlers';

import('@testing-library/jest-dom/extend-expect');

jest.unmock('axios');

const upServer = setupServer(...handlers);

beforeAll(() => upServer.listen());

afterEach(() => upServer.resetHandlers());

afterAll(() => upServer.close());

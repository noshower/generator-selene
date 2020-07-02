import { rest } from 'msw';

export default [rest.get('/api/greeting', (req, res, ctx) => res(ctx.json({ greeting: 'hello there' })))];

import verifyToken from '../src/index';
import request from 'supertest';
import express, { Express, Request, Response, NextFunction } from 'express';

const createApp = () => {
  const app: Express = express();

  app.use(express.json());
  app.use(verifyToken);

  app.get('/protected', (req: Request, res: Response) => {
    res.json({ message: 'Protected route' });
  });

  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    res.status(500).json({ error: err.message });
  });

  return app;
};

describe('verifyToken middleware', () => {
  it('should return 401 if no token provided', async () => {
    const app = createApp();

    await request(app)
      .get('/protected')
      .expect(401, { error: 'No token provided' });
  });


  it('should pass through with a valid token', async () => {
    const validToken = 'mock-valid-token';

    const app = createApp();

    await request(app)
      .get('/protected')
      .set('Authorization', `Bearer ${validToken}`)
      .expect(200, { message: 'Protected route' });
  });
});

import { Router } from 'express';
import multer from 'multer';

import { AuthHandler } from '../handlers/AuthHandler';
import { AuthService } from '../services/AuthService';
import { LoggingDecorator } from '../decorators/LoggingDecorator';
import { AuthDecorator } from '../decorators/AuthDecorator';

import { AUTH_SERVICE } from '../types/index';

const router = Router();
const handler = new AuthHandler(AUTH_SERVICE);
//const handler = new AuthHandler(new AuthService());

router.post('/register', handler.register.bind(handler));
router.post('/login', handler.login.bind(handler));

export default router;

import { Router } from 'express';

import carsRouter from '../cars/routes';
import usersRouter from '../users/routes';

const router: Router = Router();

router.use(carsRouter);
router.use(usersRouter);

export { router };

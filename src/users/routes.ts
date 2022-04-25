import { Router } from 'express';

import { validationMiddleware } from '../middleware/validationMiddleware';
import { schemaCreate, schemaLogin } from './model';
import * as service from './service';

const router: Router = Router();

router.post('/register', validationMiddleware(schemaCreate), (req, res) => {
    service
        .saveUser(req.body)
        .then((token) => {
            res.status(201).json({ token: token });
        })
        .catch((error) => {
            res.status(error.statusCode).json(error.error);
        });
});

router.post('/login', validationMiddleware(schemaLogin), (req, res) => {
    service
        .login(req.body)
        .then((token) => {
            res.status(200).json({ token: token });
        })
        .catch((error) => {
            res.status(error.statusCode).json(error.error);
        });
});

export default router;

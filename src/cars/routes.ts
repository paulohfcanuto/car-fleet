import { Request, Response, Router } from 'express';

import { verifyToken } from '../middleware/auth';
import { validationMiddleware } from '../middleware/validationMiddleware';
import { schemaCreate, schemaUpdate } from './model';
import * as service from './service';

const router: Router = Router();

router.get('/cars', verifyToken, (req, res) => {
    service
        .getAllCars(req.query, req.fleetId)
        .then((car) => {
            if (Array.isArray(car) && car.length == 0) {
                res.status(404).json();
            }
            res.status(200).json(car);
        })
        .catch((error) => {
            res.status(error.statusCode).json(error.error);
        });
});

router.post(
    '/cars',
    [verifyToken, validationMiddleware(schemaCreate)],
    (req: Request, res: Response) => {
        service
            .saveCar(req.body, req.fleetId)
            .then((car) => {
                res.status(201).json(car);
            })
            .catch((error) => {
                res.status(error.statusCode).json(error.error);
            });
    }
);

router.delete('/cars/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    service
        .deleteCar(Number(id))
        .then(() => {
            res.status(204).json();
        })
        .catch((error) => {
            res.status(error.statusCode).json(error.error);
        });
});

router.put(
    '/cars/:id',
    [verifyToken, validationMiddleware(schemaUpdate)],
    (req: Request, res: Response) => {
        const { id } = req.params;
        service
            .updateCarStatus(Number(id), req.body.onRoad)
            .then((car) => {
                res.status(200).json(car);
            })
            .catch((error) => {
                res.status(error.statusCode).json(error.error);
            });
    }
);

export default router;

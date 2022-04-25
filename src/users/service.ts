import { Users, PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import NotFoundException from '../common/not-found-exception';
import { prismaErrorHandler } from '../middleware/errorHandler';
import { TOKEN_KEY } from './../common/token-key';

const prisma = new PrismaClient();

export const saveUser = async (user: Users) => {
    try {
        const encryptedPassword = await bcrypt.hash(user.password, 10);
        const newUser = await prisma.users.create({
            data: {
                user: user.user,
                name: user.name,
                email: user.email,
                fleetId: user.fleetId,
                password: encryptedPassword,
                createdAt: new Date(),
            },
        });
        const token = jwt.sign(
            {
                user_id: newUser.id,
                user_email: newUser.email,
                fleetId: newUser.fleetId,
            },
            TOKEN_KEY,
            {
                expiresIn: '1h',
            }
        );
        return token;
    } catch (error) {
        return prismaErrorHandler(error);
    }
};

export const login = async (user: Users) => {
    const currentUser = await prisma.users.findUnique({
        where: {
            email: user.email,
        },
    });
    if (
        currentUser &&
        (await bcrypt.compare(user.password, currentUser.password))
    ) {
        const token = jwt.sign(
            {
                user_id: currentUser.id,
                user_email: currentUser.email,
                fleetId: currentUser.fleetId,
            },
            TOKEN_KEY,
            {
                expiresIn: '1h',
            }
        );
        return token;
    } else {
        throw new NotFoundException(404, 'Not found.', {
            cause: 'User not found.',
        });
    }
};

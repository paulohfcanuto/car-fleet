import { Cars, PrismaClient, Prisma } from '@prisma/client';

import { prismaErrorHandler } from '../middleware/errorHandler';

const prisma = new PrismaClient();

export const getAllCars = async (
    where: Prisma.CarsWhereInput,
    fleetId: number
) => {
    try {
        where.fleetId = fleetId;
        return await prisma.cars.findMany({
            where: where,
        });
    } catch (error) {
        return prismaErrorHandler(error);
    }
};

export const saveCar = async (car: Cars, fleetId: number) => {
    try {
        return await prisma.cars.create({
            data: {
                plate: car.plate,
                brand: car.brand,
                model: car.model,
                year: car.year,
                onRoad: car.onRoad,
                fleetId: fleetId,
                createdAt: new Date(),
            },
        });
    } catch (error) {
        return prismaErrorHandler(error);
    }
};

export const deleteCar = async (id: number) => {
    try {
        await prisma.cars.delete({
            where: { id: id },
        });
    } catch (error) {
        return prismaErrorHandler(error);
    }
};

export const updateCarStatus = async (id: number, onRoad: boolean) => {
    try {
        return await prisma.cars.update({
            where: { id: id },
            data: { onRoad: onRoad },
        });
    } catch (error) {
        return prismaErrorHandler(error);
    }
};

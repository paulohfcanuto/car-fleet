import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const carsData: Prisma.CarsCreateInput[] = [
    {
        plate: 'AAA-1111',
        brand: 'VW - Volkswagen',
        model: 'nivus',
        year: 2021,
        onRoad: false,
        fleetId: 123,
    },
    {
        plate: 'BBB-2222',
        brand: 'GM - Chevrolet',
        model: 'Silverado',
        year: 2022,
        onRoad: true,
        fleetId: 123,
    },
    {
        plate: 'CCC-3333',
        brand: 'Prosche',
        model: '911 GT3 RS',
        year: 2022,
        onRoad: false,
        fleetId: 123,
    },
    {
        plate: 'DDD-4444',
        brand: 'VW - Volkswagen',
        model: 'Golf GTI',
        year: 2019,
        onRoad: true,
        fleetId: 123,
    },
    {
        plate: 'FFF-5555',
        brand: 'Ferrari',
        model: 'F-40',
        year: 1992,
        onRoad: false,
        fleetId: 123,
    },
];

async function main() {
    console.log(`Start seeding ...`);
    for (const u of carsData) {
        await prisma.cars.create({
            data: u,
        });
        console.log(`A car has been created`);
    }
    console.log(`Seeding finished.`);
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });

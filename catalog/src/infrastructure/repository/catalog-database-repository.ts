import { CatalogRepository } from "../../domain/repository/catalog-repository";
import postgres from 'postgres'
import { injectable } from "inversify";
import { Car } from "../../domain/entity/car";
@injectable()
export class CatalogDatabaseRepository implements CatalogRepository {

    private sql = postgres(process.env.DB_CONNECTION_URL || "", {})

    async addCarToCatalog(car: Car): Promise<Car> {
        try {
            const [newCar]: [Car] = await this.sql`INSERT INTO cars (constructorName, model) VALUES (${car.constructorName}, ${car.model}) RETURNING *`;
            return newCar;
        } catch (error) {
            throw error;
        }
    }

    async getCarsFromCatalog(): Promise<Car[]> {
        return await this.sql<Car[]>`SELECT * FROM cars`;
    }

    async getCarFromCatalog(id: number): Promise<Car> {
        const [car]: [Car?] = await this.sql`SELECT * FROM cars WHERE id = ${id}`;
        if (!car) {
            throw new Error(`Car with id ${id} not found`);
        }
        return car;
    }

}
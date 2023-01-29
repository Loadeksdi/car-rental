import { CatalogRepository } from "domain/repository/catalog-repository";
import postgres from 'postgres'
import { injectable } from "inversify";
import { Car } from "domain/entity/car";

@injectable()
export class CatalogDatabaseRepository implements CatalogRepository {

    private sql = postgres("postgres://user:example@db:5432/rental", {})

    registerCar(car: Car): Promise<void> {
        throw new Error("Method not implemented.");
    }


}
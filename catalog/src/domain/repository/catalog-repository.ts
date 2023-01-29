import { Car } from "domain/entity/car";

export interface CatalogRepository {

    registerCar(car: Car): Promise<void>;

}
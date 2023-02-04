import { Car } from "../entity/car";

export interface CatalogRepository {

    addCarToCatalog(car: Car): Promise<Car>;

    getCarsFromCatalog(): Promise<Car[]>;

    getCarFromCatalog(id: number): Promise<Car>;

}
import { Car } from "../entity/car";

export interface CatalogRepository {

    addCarToCatalog(car: Car): Promise<void>;

    getCarsFromCatalog(): Promise<Car[]>;

    getCarFromCatalog(id: number): Promise<Car>;

}
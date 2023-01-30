import { CatalogRepository } from "../domain/repository/catalog-repository";
import { Car } from "../domain/entity/car";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";
import ExternalCalls from "../infrastructure/external-calls";

@injectable()
export class CatalogService {
    @inject(TYPES.CatalogRepository) private _catalogRepository!: CatalogRepository;

    async addCarToCatalog(userId: number, body: any): Promise<Car> {
        try {
            const isAdmin = await ExternalCalls.isUserAgent(userId);
            if(!isAdmin){
                throw new Error("Unsupported operation for user");
            }
            await this._catalogRepository.addCarToCatalog(body);
            return body as Car;
        } catch (error) {
            throw error;
        }
    }

    async getCarsFromCatalog(userId: number): Promise<Car[]> {
        try {
            await ExternalCalls.isUserAgent(userId);
            return await this._catalogRepository.getCarsFromCatalog();
        } catch (error) {
            throw error;
        }
    }

    async getCarFromCatalog(userId: number, carId: number): Promise<Car> {
        try {
            await ExternalCalls.isUserAgent(userId);
            return await this._catalogRepository.getCarFromCatalog(carId);
        } catch (error) {
            throw error;
        }
    }
}
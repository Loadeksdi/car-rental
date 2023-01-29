import { CatalogRepository } from "domain/repository/catalog-repository";
import { inject, injectable } from "inversify";
import { TYPES } from "../types";

@injectable()
export class CatalogService {
    @inject(TYPES.CatalogRepository) private _catalogRepository!: CatalogRepository;

    async createCar(body: any): Promise<void> {
        try {
            await this._catalogRepository.registerCar(body);
        } catch (error) {
            throw error;
        }
    }
}
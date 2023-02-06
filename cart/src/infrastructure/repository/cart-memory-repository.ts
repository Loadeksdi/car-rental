import { Cart } from "../../domain/entity/cart";
import { CartRepository } from "../../domain/repository/cart-repository";
import { injectable } from "inversify";

@injectable()
export class CartMemoryRepository implements CartRepository {

}
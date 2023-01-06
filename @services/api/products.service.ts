import { apiIns } from "../../@config/api.config";

export const ProductsService = {
  getProducts: async (): Promise<any> => await apiIns.get("products"),
  order: async (payload: any): Promise<any> =>
    await apiIns.post("order", payload),
};

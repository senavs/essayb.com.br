import { urls } from "config/backend";
import { callAPI } from "./base";


export interface CategoryInterface {
  id_category: number,
  category: string
}

export default class CategoryService {
  static async list(): Promise<Array<CategoryInterface>> {
    return await callAPI(urls.category.list, 'GET')
  }
}
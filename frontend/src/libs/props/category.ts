import CategoryService, { CategoryInterface } from "../services/category";


export type CategoryData = Array<CategoryInterface>

export async function getCategoryData(): Promise<CategoryData> {
  if (typeof window === 'undefined') {
    try {
      return await CategoryService.list()
    } catch { }
  }
  return []
}
import { createContext, ReactNode } from "react";

import { CategoryData } from '../serverSide/category';


interface CategoryProviderProps {
  children: ReactNode
  categoryData: CategoryData
}

interface CategoryProviderValue {
  categoryData: CategoryData
}

export const CategoryContext = createContext({
  categoryData: []
} as CategoryProviderValue)

export function CategoryProvider({ children, categoryData }: CategoryProviderProps) {

  return (
    <CategoryContext.Provider value={{ categoryData }}>
      {children}
    </CategoryContext.Provider>
  )
}
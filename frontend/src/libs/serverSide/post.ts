import { CategoryInterface } from "../services/category";
import PostService from "../services/post";


export interface PostData {
  id_post?: number
  id_user?: number
  category?: CategoryInterface
  title?: string
  description?: string
  is_published?: boolean
  created_at?: string
  updated_at?: string
  message?: string
}

export async function getPostData(id_post: string): Promise<PostData> {
  if (typeof window === 'undefined') {
    try {
      return await PostService.search(id_post)
    } catch {
    }
  }
  return {}
}
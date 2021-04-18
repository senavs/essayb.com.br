import { CategoryInterface } from "../services/category";
import PostService from "../services/post";
import { UserInterface } from "../services/user";


export interface PostData {
  id_post?: number
  user?: UserInterface
  category?: CategoryInterface
  title?: string
  description?: string
  content?: string
  is_published?: boolean
  created_at?: string
  updated_at?: string
  message?: string
}

export async function getPostData(id_post: number): Promise<PostData> {
  if (typeof window === 'undefined') {
    try {
      return await PostService.search(id_post)
    } catch (err) {
      console.log(err)
    }
  }
  return {}
}
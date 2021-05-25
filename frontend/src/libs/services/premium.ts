import { urls } from "../../../config/backend";
import { callAPI } from "./base";


export interface PremiumInterface {
  is_premium: boolean
  n_post: number
  is_allow_create_post: boolean
}

export default class PaymentService {

  static async status(token: string): Promise<PremiumInterface> {
    return await callAPI(urls.premium.status, 'GET', null, { 'JWT-Token': `Bearer ${token}` })
  }
}
import { urls } from "../../../config/backend";
import { callAPI } from "./base";

export interface PaymentCheckoutInterface {
  session_id: string
}


export default class PaymentService {

  static async checkout(token: string): Promise<PaymentCheckoutInterface> {
    return await callAPI(urls.payment.checkout, 'POST', null, { 'JWT-Token': `Bearer ${token}` })
  }


}
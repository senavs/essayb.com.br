import { urls } from "../../../config/backend";
import { callAPI } from "./base";

export interface PaymentCheckoutInterface {
  session_id: string
}

export interface PaymentAcceptInterface {
  accept: boolean
}


export default class PaymentService {

  static async checkout(token: string): Promise<PaymentCheckoutInterface> {
    return await callAPI(urls.payment.checkout, 'POST', null, { 'JWT-Token': `Bearer ${token}` })
  }

  static async accept(id_session: string, token: string): Promise<PaymentAcceptInterface> {
    const url = urls.payment.accept + `?id_session=${id_session}`
    return await callAPI(url, 'POST', null, { 'JWT-Token': `Bearer ${token}` })
  }
}
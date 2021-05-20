import PaymentService from "../services/payment";


export interface PaymentAcceptData {
  accept: boolean
}

export async function getPaymentAceptData(id_session: string, token: string): Promise<PaymentAcceptData> {
  const paymentAceptData = { accept: false }
  if (typeof window === 'undefined') {
    try {
      paymentAceptData.accept = (await PaymentService.accept(id_session, token)).accept
    } catch { }
  }
  return paymentAceptData
}
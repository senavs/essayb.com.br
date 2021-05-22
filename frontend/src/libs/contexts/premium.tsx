import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import PaymentService, { PremiumInterface } from '../services/premium';
import { AuthContext } from "./auth";


interface PremiumProviderProps {
  children: ReactNode
}

interface PremiumProviderValue {
  premiumData: PremiumInterface
}

export const PremiumContext = createContext({
  premiumData: {}
} as PremiumProviderValue)

export function PremiumProvider({ children }: PremiumProviderProps) {
  const { authenticationData } = useContext(AuthContext)
  const [premiumData, setPremiumData] = useState({
    is_premium: false,
    n_post: 0,
    is_allow_create_post: false,
  })

  useEffect(() => {
    if (authenticationData.isAuthenticated) {
      PaymentService.status(authenticationData.token)
        .then(setPremiumData)
        .catch(console.log)
    }
  }, [])

  return (
    <PremiumContext.Provider value={{ premiumData }}>
      {children}
    </PremiumContext.Provider>
  )
}

import Establishment from "./establishment"
export default interface User {
  id: number
  cpf: string
  name: string
  email: string
  monther: string
  birth_date: string
  type_user: string
  user_establishments: Array<{
    establishments: Establishment
  }>
}
import User from "./user";
import Establishment from "./establishment";
export default interface DefaultContextInterface {
  setUser?: Function
  user?: User | null,
  isMobile: boolean,
  logOut: Function,
  saveUserInLocal: Function,
  establishmentt?: Establishment | null
}
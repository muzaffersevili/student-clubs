export default interface IUser {
  id?: any | null,
  name?: string,
  surname?: string,
  phone?: string,
  email?: string,
  personalEmail?: string,
  password?: string,
  roles?: Array<string>
}
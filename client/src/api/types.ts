export type AuthResponse = {
  refresh: string;
  access: string;
}

export type LoginPayload = {
  email: string;
  password: string;
}

export type SignupPayload = Pick<LoginPayload, 'email' | 'password'> & {
  first_name: string;
  last_name: string;
}

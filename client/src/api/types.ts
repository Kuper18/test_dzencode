export type AuthResponse = {
  refresh: string;
  access: string;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export type SignupPayload = Pick<LoginPayload, 'email' | 'password'> & {
  first_name: string;
  last_name: string;
};

export type UserProfileResponse = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  full_name: string;
};

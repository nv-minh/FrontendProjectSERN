import { IconType } from 'react-icons/lib';

export interface IActiontype {
  LOGIN: string;
  REGISTER: string;
  LOGOUT: string;
}

export interface IAuth {
  isLoggedIn: boolean;
  accessToken: string | null;
}

export interface IButtonProps {
  text: string;
  textColor?: string;
  bgColor?: string;
  IcAfter?: IconType;
  onClick?: () => void;
  size?: string;
  fullWidth?: boolean;
}

export interface IInputFormProps {
  label: string;
  typeInput: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<IUser>>;
  type: string;
  invalidFields: any[];
}

// FIXME: bug invalidFields

export interface IPost {
  address: string;
  attributes: IAttributes;
  description: string;
  id?: string;
  star: string;
  title: string;
  user: IUser;
  createdAt?: string;
  images?: any;
}

export interface IAttributes {
  acreage: string;
  hashtag: string;
  price: string;
  published: string;
  createdAt: string;
}

export interface IProVinceButton {
  name: string;
  image: string;
  code: string;
}

export interface ISearchItemProps {
  IconBefore: IconType;
  IconAfter: IconType;
  text: string;
  fontWeight?: string;
  defaultTitle: string;
}

export interface IUser {
  name: string;
  phone: string;
  password: string;
}

import actionType from './actions/actionType';

export interface RootStateAuth {
  isLoggedIn: boolean;
  accessToken?: string | null;
  message?: string;
}

export interface RootCurrentUser {
  currentData: ICurrentData;
}

export interface ICurrentData {
  avatar: string | null;
  createdAt: string;
  fbUrl: string;
  id: string;
  name: string;
  phone: string;
  updatedAt: string;
  zalo: string;
}

export interface IUserAction {
  userName: string;
  password: string;
  zalo?: string;
}

export interface RootStatePosts {
  posts?: [];
  newsPost?: [];
  message: string;
  count?: number;
  queryFilter?: IQueryFilter | undefined;
}

export interface IQueryFilter {
  queryPrice?: Number[];
  queryArea?: Number[];
  categoryCode?: string;
  provinceCode?: string;
}

export interface ICategories {
  code: string;
  value: string;
  order?: number;
}

export interface RootStateCategories {
  message: string;
  categories?: ICategories[];
  prices?: ICategories[] | null;
  areas?: ICategories[] | null;
  provinces?: ICategories[] | null;
}

export interface AuthAction extends RootStateAuth {
  type:
    | typeof actionType.REGISTER_SUCCESS
    | typeof actionType.LOGIN_FAIL
    | typeof actionType.LOGIN_SUCCESS
    | typeof actionType.REGISTER_FAIL
    | typeof actionType.LOGOUT
    | string;
}

export interface PostsAction extends RootStatePosts {
  type:
    | typeof actionType.GET_POSTS
    | typeof actionType.GET_POSTS_LIMIT
    | typeof actionType.GET_NEWSPOST
    | string;
}

export interface CategoriesAction extends RootStateCategories {
  type: typeof actionType.GET_CATEGORIES | typeof actionType.GET_PRICES | string;
}

export interface CurrentUserAction extends RootCurrentUser {
  type: typeof actionType.GET_CURRENT | string;
}

export interface RootState {
  auth: RootStateAuth;
  user: RootCurrentUser;
  posts: RootStatePosts;
  newsPost: RootStatePosts;
  app: RootStateCategories;
}

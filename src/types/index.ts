export interface ProductI {
  _id: string;
  slug: string;
  description: string;
  name: string;
  price: number;
  isActive: boolean;
  image_url: string;
}

export interface MenuI extends ProductI {
  category: CategoryI;
  tags: TagI[];
}

export interface CategoryI {
  _id: string;
  name: string;
}
export interface TagI {
  _id: string;
  name: string;
  category: CategoryI;
}

export interface UserI {
  username: string;
  email: string;
  role: string;
}

export interface AuthI {
  user: UserI;
  accessToken: string;
}

export interface CartItemsI {
  user: string;
  product: MenuI;
  quantity: number;
  amount: number;
}

export interface AddressI {
  name: string;
  city: string;
  detail: string;
  phone: string;
  province: string;
}

export interface MainAddressesI extends AddressI {
  _id: string;
}

export interface UserAddress extends AddressI {
  user: string;
}

export interface ProvinceI {
  id: string;
  name: string;
}
export interface CityI {
  id: string;
  province_id: string;
  name: string;
}

export interface OrderI {
  _id: string;
  delivery_address: UserAddress;
  delivery_fee: number;
  snap_token: string;
  status: string;
  user: UserI;
  total: number;
}

export interface OrderItemI {
  amount: number;
  quantity: number;
  product: ProductI;
}

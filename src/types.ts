export interface MenuItem {
  id: string;
  name: string;
  category: 'lauriat' | 'chaofan' | 'dimsum' | 'noodles' | 'siopao' | 'halohalo' | 'milktea' | 'family';
  description: string;
  price: number;
  originalPrice?: number;
  calories: number;
  rating: number;
  reviewsCount: number;
  image: string;
  isBestSeller?: boolean;
  isPromo?: boolean;
  spiceLevel: 0 | 1 | 2 | 3;
  sizeOptions?: { name: string; priceAdjustment: number }[];
  addonOptions?: { id: string; name: string; price: number }[];
}

export interface CartItem {
  id: string; // unique ID representing item + specific customizations
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: string;
  selectedAddons: { id: string; name: string; price: number }[];
  specialInstructions?: string;
}

export interface Branch {
  id: string;
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
  hasDriveThru: boolean;
  hasDineIn: boolean;
  hasDelivery: boolean;
  is24Hours: boolean;
}

export interface JobPost {
  id: string;
  title: string;
  department: 'Kitchen' | 'Store Service' | 'Delivery' | 'Corporate';
  location: string;
  type: 'Full-time' | 'Part-time';
  description: string;
  requirements: string[];
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
  itemBought: string;
}

export interface OrderStatus {
  id: string;
  status: 'received' | 'preparing' | 'dispatched' | 'arrived';
  updatedAt: string;
  estimatedDeliveryMinutes: number;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  total: number;
  address: string;
  paymentMethod: string;
  riderName?: string;
  riderPhone?: string;
  riderRating?: number;
}

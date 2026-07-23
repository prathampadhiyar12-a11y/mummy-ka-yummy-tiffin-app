export type MealCategory =
  | "roti"
  | "rice"
  | "dal"
  | "kathod"
  | "sabji"
  | "salad"
  | "chaas"
  | "sweet";

export type SubscriptionId = "one-time" | "weekly" | "fifteen-days" | "monthly";

export type OrderStatus =
  | "Pending"
  | "Paid"
  | "Confirmed"
  | "Completed"
  | "Rejected";

export type PaymentStatus = "Pending" | "Paid" | "Failed" | "Refunded";

export type GalleryCategory = "Food" | "Kitchen" | "Packaging" | "Behind the Scenes";

export interface MealItem {
  id: string;
  category: MealCategory;
  name: string;
  price: number;
  description: string;
}

export interface SubscriptionPlan {
  id: SubscriptionId;
  name: string;
  durationDays: number;
  discountPercent: number;
  depositRequired: boolean;
  label: string;
}

export interface WeeklyMeal {
  day: string;
  lunch: string[];
  dinner: string[];
  closed?: boolean;
}

export interface GalleryItem {
  id: string;
  category: GalleryCategory;
  title: string;
  alt: string;
  imageUrl: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  area: string;
  currentPlan: string;
  status: "Active" | "Pending" | "Archived";
  renewalDate: string;
}

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  mealType: string;
  plan: string;
  amount: number;
  deliveryMode: "Delivery" | "Pickup" | "Contact First";
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  date: string;
}

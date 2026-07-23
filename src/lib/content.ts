import {
  Customer,
  FaqItem,
  GalleryItem,
  MealItem,
  Order,
  SubscriptionPlan,
  Testimonial,
  WeeklyMeal,
} from "./types";

export const siteConfig = {
  name: "Mummy Ka Yummy Tiffin",
  tagline: "Ghar jesa khana ghar tak...",
  founder: "Rinku Padhiyar",
  city: "Vadodara",
  shortDescription:
    "Fresh homemade Gujarati meals prepared with care for students, office teams, families and anyone missing ghar ka taste.",
  mission: "Provide healthy and hygienic homemade meals prepared with love.",
  vision:
    "Become Vadodara's most trusted homemade tiffin brand by making daily food simple, safe and consistently comforting.",
  usp: "Healthy and home made food at your door step.",
  startedYearsAgo: 2,
  phone: "+91 73833 44746",
  whatsappNumber: "917383344746",
  email: "mummykayummytiffin@gmail.com",
  address: "Shree Sakti Society, A/7, Vasna Rd, Saiyed Vasna, Vadodara, Gujarat 390007",
  mapUrl: "https://maps.app.goo.gl/oJRwBekUh7zMVXY7A",
  instagramUrl:
    "https://www.instagram.com/mummy_ka_yummy_tiffin?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
  facebookUrl: "",
  logoUrl: "/brand-logo.png",
  baseUrl: "https://mummykyummytiffin.in",
  heroVideoUrl: "",
  heroPosterUrl:
    "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=2400&q=85",
  storyImageUrl:
    "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1800&q=85",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/weekly-menu", label: "Weekly Menu" },
  { href: "/choose-your-meal", label: "Choose Meal" },
  { href: "/gallery", label: "Gallery" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export const businessRules = {
  minimumOrderValue: 90,
  depositAmount: 500,
  freeDeliveryKm: 3,
  serviceRadiusKm: 5,
  extraDeliveryChargePerKm: 20,
  lunchOrderCutoff: "10:00 AM",
  dinnerOrderCutoff: "4:30 PM",
  sundayClosed: true,
  holidayNotice:
    "Holiday updates will be shared on the website, Instagram and WhatsApp community channel.",
};

export const deliveryAreas = [
  "Saiyed Vasna",
  "Vasna Road",
  "Diwalipura",
  "Akota",
  "Old Padra Road",
  "Tandalja",
  "Manisha Circle",
  "Race Course Road",
  "Alkapuri selected areas",
  "Gotri Road selected areas",
];

export const subscriptionPlans: SubscriptionPlan[] = [
  {
    id: "one-time",
    name: "One Time",
    durationDays: 1,
    discountPercent: 0,
    depositRequired: false,
    label: "Try today's meal",
  },
  {
    id: "weekly",
    name: "Weekly",
    durationDays: 7,
    discountPercent: 5,
    depositRequired: true,
    label: "Best for office weeks",
  },
  {
    id: "fifteen-days",
    name: "15 Days",
    durationDays: 15,
    discountPercent: 7.5,
    depositRequired: true,
    label: "Balanced routine plan",
  },
  {
    id: "monthly",
    name: "Monthly",
    durationDays: 30,
    discountPercent: 12,
    depositRequired: true,
    label: "Maximum savings",
  },
];

export const mealItems: MealItem[] = [
  { id: "roti-plain", category: "roti", name: "Plain Roti", price: 6, description: "Soft wheat roti." },
  { id: "roti-ghee", category: "roti", name: "Ghee Roti", price: 8, description: "Light ghee finish." },
  { id: "rice-jeera", category: "rice", name: "Jeera Rice 100g", price: 35, description: "Fragrant cumin rice, priced per 100g." },
  { id: "rice-steamed", category: "rice", name: "Steamed Rice 100g", price: 30, description: "Simple daily rice, priced per 100g." },
  { id: "dal-tadka", category: "dal", name: "Dal Tadka 100g", price: 35, description: "Comforting yellow dal, priced per 100g." },
  { id: "dal-gujarati", category: "dal", name: "Gujarati Dal 100g", price: 35, description: "Sweet, tangy and light dal, priced per 100g." },
  { id: "kathod-chana", category: "kathod", name: "Chana Kathod", price: 45, description: "Protein-rich chana." },
  { id: "kathod-moong", category: "kathod", name: "Moong Kathod", price: 45, description: "Light sprouted moong." },
  { id: "sabji-seasonal", category: "sabji", name: "Seasonal Sabji", price: 45, description: "Fresh daily vegetable." },
  { id: "sabji-paneer", category: "sabji", name: "Paneer Sabji", price: 65, description: "Premium paneer special." },
  { id: "salad-house", category: "salad", name: "Fresh Salad", price: 18, description: "Cut fresh before packing." },
  { id: "chaas-masala", category: "chaas", name: "Masala Chaas", price: 18, description: "Cooling spiced buttermilk." },
  { id: "sweet-daily", category: "sweet", name: "Daily Sweet", price: 25, description: "Small homemade sweet." },
];

export const platterOptions = {
  mini: {
    name: "Mini Platter",
    basePrice: 100,
    imageUrl:
      "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?auto=format&fit=crop&w=1600&q=85",
    options: [
      ["1 Kathod", "1 Vegetable", "6 Rotis", "Salad"],
      ["1 Vegetable", "4 Rotis", "Dal Rice", "Salad"],
    ],
  },
  full: {
    name: "Full Platter",
    basePrice: 130,
    imageUrl:
      "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1600&q=85",
    options: [["1 Kathod", "1 Vegetable", "Dal Rice", "Salad", "6 Rotis"]],
  },
};

export const weeklyMenu: WeeklyMeal[] = [
  {
    day: "Monday",
    lunch: ["Gujarati dal", "Aloo capsicum", "Moong kathod", "Rice", "6 rotis", "Salad"],
    dinner: ["Dal fry", "Mix vegetable", "Chana kathod", "Jeera rice", "6 rotis", "Chaas"],
  },
  {
    day: "Tuesday",
    lunch: ["Toor dal", "Sev tameta", "Sprouted moong", "Rice", "6 rotis", "Salad"],
    dinner: ["Kadhi", "Bhindi masala", "Kala chana", "Rice", "6 rotis", "Sweet"],
  },
  {
    day: "Wednesday",
    lunch: ["Dal tadka", "Dudhi chana", "Rajma", "Rice", "6 rotis", "Salad"],
    dinner: ["Gujarati dal", "Cabbage peas", "Moong kathod", "Jeera rice", "6 rotis", "Chaas"],
  },
  {
    day: "Thursday",
    lunch: ["Kadhi", "Aloo matar", "Chole", "Rice", "6 rotis", "Salad"],
    dinner: ["Dal fry", "Seasonal sabji", "Matki kathod", "Rice", "6 rotis", "Sweet"],
  },
  {
    day: "Friday",
    lunch: ["Gujarati dal", "Tindora masala", "Chana kathod", "Rice", "6 rotis", "Chaas"],
    dinner: ["Dal tadka", "Paneer sabji", "Moong kathod", "Jeera rice", "6 rotis", "Salad"],
  },
  {
    day: "Saturday",
    lunch: ["Kadhi", "Undhiyu style sabji", "Rajma", "Rice", "6 rotis", "Sweet"],
    dinner: ["Gujarati dal", "Aloo gobi", "Chole", "Rice", "6 rotis", "Chaas"],
  },
  {
    day: "Sunday",
    lunch: ["Closed"],
    dinner: ["Closed"],
    closed: true,
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: "home-thali",
    category: "Food",
    title: "Homestyle lunch thali",
    alt: "Fresh homemade lunch thali with roti, dal, rice and sabji",
    imageUrl:
      "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "dal-rice",
    category: "Food",
    title: "Dal rice comfort bowl",
    alt: "Warm dal rice prepared for daily tiffin",
    imageUrl:
      "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "fresh-kitchen",
    category: "Kitchen",
    title: "Morning kitchen prep",
    alt: "Clean kitchen preparation with fresh vegetables",
    imageUrl:
      "https://images.unsplash.com/photo-1556911220-bff31c812dba?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "packing",
    category: "Packaging",
    title: "Neat sealed packaging",
    alt: "Fresh meal packed in clean tiffin containers",
    imageUrl:
      "https://images.unsplash.com/photo-1605522561233-768ad7a8fabf?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "behind-scenes",
    category: "Behind the Scenes",
    title: "Prepared with care",
    alt: "Fresh homemade cooking behind the scenes",
    imageUrl:
      "https://images.unsplash.com/photo-1551218808-94e220e084d2?auto=format&fit=crop&w=1400&q=85",
  },
  {
    id: "rotis",
    category: "Food",
    title: "Soft daily rotis",
    alt: "Fresh rotis prepared for tiffin orders",
    imageUrl:
      "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=1400&q=85",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "google-1",
    name: "Mehul Shah",
    role: "Office lunch subscriber",
    rating: 5,
    quote: "The taste feels genuinely homemade and the delivery is consistent. It has become my weekday routine.",
  },
  {
    id: "google-2",
    name: "Nisha Patel",
    role: "Student",
    rating: 5,
    quote: "Fresh, clean and not oily. The monthly plan is simple and the food feels like home.",
  },
  {
    id: "google-3",
    name: "Arvind Rao",
    role: "Senior citizen",
    rating: 5,
    quote: "Balanced meals, soft rotis and polite communication. The trust matters as much as the food.",
  },
];

export const faqs: FaqItem[] = [
  {
    question: "Do you deliver lunch and dinner in Vadodara?",
    answer: "Yes. Lunch and dinner subscriptions are available near Saiyed Vasna, Diwalipura, Vasna Road and nearby Vadodara areas.",
  },
  {
    question: "Is Sunday available?",
    answer: "Sunday tiffin service is closed. Any holiday update will be shared on the website, Instagram and WhatsApp community.",
  },
  {
    question: "How does payment confirmation work?",
    answer: "After you continue on WhatsApp, we share a QR code. You can pay there and send the payment screenshot in the same chat. Admin marks payment done from the backend.",
  },
  {
    question: "Can I customize my meal?",
    answer: "Yes. Roti, rice, dal, kathod, sabji, salad, chaas, sweet and special instructions can be selected before checkout.",
  },
  {
    question: "Is delivery free?",
    answer: "Delivery is free within 3 km. Extra charges apply after that. Above 5 km, the order stays pending until manual confirmation. Pickup is available for everyone.",
  },
];

export const sampleCustomers: Customer[] = [
  {
    id: "CUS-1001",
    name: "Nisha Patel",
    phone: "+91 98765 43210",
    area: "Alkapuri",
    currentPlan: "Monthly",
    status: "Active",
    renewalDate: "2026-08-22",
  },
  {
    id: "CUS-1002",
    name: "Mehul Shah",
    phone: "+91 91234 56789",
    area: "Gotri",
    currentPlan: "Weekly",
    status: "Active",
    renewalDate: "2026-07-30",
  },
  {
    id: "CUS-1003",
    name: "Arvind Rao",
    phone: "+91 99887 76655",
    area: "Fatehgunj",
    currentPlan: "15 Days",
    status: "Pending",
    renewalDate: "2026-08-07",
  },
];

export const sampleOrders: Order[] = [
  {
    id: "MKYT-20260723-001",
    customerName: "Nisha Patel",
    phone: "+91 98765 43210",
    mealType: "Full Platter",
    plan: "Monthly",
    amount: 3432,
    deliveryMode: "Delivery",
    paymentStatus: "Paid",
    orderStatus: "Confirmed",
    date: "2026-07-23",
  },
  {
    id: "MKYT-20260723-002",
    customerName: "Mehul Shah",
    phone: "+91 91234 56789",
    mealType: "Mini Platter",
    plan: "Weekly",
    amount: 665,
    deliveryMode: "Delivery",
    paymentStatus: "Pending",
    orderStatus: "Pending",
    date: "2026-07-23",
  },
  {
    id: "MKYT-20260723-003",
    customerName: "Arvind Rao",
    phone: "+91 99887 76655",
    mealType: "Custom Meal",
    plan: "15 Days",
    amount: 1720,
    deliveryMode: "Pickup",
    paymentStatus: "Paid",
    orderStatus: "Paid",
    date: "2026-07-23",
  },
];

export const adminSections = [
  { href: "/admin/orders", label: "Orders", description: "Pending, paid, confirmed and completed orders." },
  { href: "/admin/customers", label: "Customers", description: "View, edit and archive customer records." },
  { href: "/admin/weekly-menu", label: "Weekly Menu", description: "Edit lunch and dinner menus." },
  { href: "/admin/gallery", label: "Gallery", description: "Manage food, kitchen and packaging media." },
  { href: "/admin/pricing", label: "Pricing", description: "Meal item prices, discounts and deposits." },
  { href: "/admin/homepage-cms", label: "Homepage CMS", description: "Hero copy, media, journey and contact blocks." },
  { href: "/admin/testimonials", label: "Testimonials", description: "Google review feed and manual review controls." },
  { href: "/admin/analytics", label: "Analytics", description: "Revenue, order and customer trends." },
  { href: "/admin/reports", label: "Reports", description: "Operational exports and daily summaries." },
  { href: "/admin/seo-settings", label: "SEO Settings", description: "Local SEO, schema, sitemap and social previews." },
  { href: "/admin/general-settings", label: "General Settings", description: "Business profile, delivery areas and contact details." },
];

export const seoKeywords = [
  "Best Tiffin Service in Vadodara",
  "Home Made Food Vadodara",
  "Lunch Tiffin Vadodara",
  "Dinner Tiffin Vadodara",
  "Office Lunch Vadodara",
  "Student Tiffin Vadodara",
  "Healthy Tiffin Vadodara",
];

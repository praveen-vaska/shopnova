export const coupons = [
  {
    code: "WELCOME10",
    description: "10% off on your first order",
    discountPercent: 10,
    maxDiscount: 500,
    minOrderAmount: 999,
    expiryDate: "2026-12-31",
    usageCount: 428,
    usageLimit: 1000,
    isActive: true
  },
  {
    code: "NOVA20",
    description: "Flat 20% off on orders above ₹2,499",
    discountPercent: 20,
    maxDiscount: 1000,
    minOrderAmount: 2499,
    expiryDate: "2026-11-30",
    usageCount: 194,
    usageLimit: 500,
    isActive: true
  },
  {
    code: "FESTIVE15",
    description: "15% festive celebration discount",
    discountPercent: 15,
    maxDiscount: 750,
    minOrderAmount: 1499,
    expiryDate: "2026-12-15",
    usageCount: 88,
    usageLimit: 300,
    isActive: true
  },
  {
    code: "FREESHIP",
    description: "Free express shipping on any order",
    discountPercent: 0,
    isFreeShipping: true,
    minOrderAmount: 499,
    expiryDate: "2026-12-31",
    usageCount: 612,
    usageLimit: 2000,
    isActive: true
  },
  {
    code: "SUMMER25",
    description: "25% discount on Summer collection",
    discountPercent: 25,
    maxDiscount: 1500,
    minOrderAmount: 3999,
    expiryDate: "2026-10-31",
    usageCount: 220,
    usageLimit: 250,
    isActive: false
  },
  {
    code: "VIP100",
    description: "Flat ₹500 off on luxury orders above ₹4,999",
    flatDiscount: 500,
    discountPercent: 0,
    minOrderAmount: 4999,
    expiryDate: "2026-12-31",
    usageCount: 45,
    usageLimit: 100,
    isActive: true
  },
  {
    code: "ACCESSORY15",
    description: "15% off on Watches and Bags",
    discountPercent: 15,
    maxDiscount: 600,
    minOrderAmount: 1299,
    expiryDate: "2026-12-25",
    usageCount: 73,
    usageLimit: 200,
    isActive: true
  },
  {
    code: "AUDIO300",
    description: "Flat ₹300 off on premium headphones",
    flatDiscount: 300,
    discountPercent: 0,
    minOrderAmount: 1999,
    expiryDate: "2026-12-10",
    usageCount: 110,
    usageLimit: 400,
    isActive: true
  }
];

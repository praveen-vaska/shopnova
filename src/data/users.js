export const users = [
  {
    id: "user-1",
    name: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+91 98765 43210",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200&auto=format&fit=crop",
    role: "customer",
    joinedDate: "15 Jan 2026",
    ordersCount: 4,
    totalSpent: 12490,
    addresses: [
      {
        id: "addr-1",
        name: "Aarav Sharma",
        phone: "+91 98765 43210",
        addressLine1: "B-204, Green Valley Apartments",
        addressLine2: "Outer Ring Road, Bellandur",
        city: "Bengaluru",
        state: "Karnataka",
        postalCode: "560103",
        type: "Home",
        isDefault: true
      },
      {
        id: "addr-2",
        name: "Aarav Sharma (Office)",
        phone: "+91 98765 43210",
        addressLine1: "Tower 4, Embassy Tech Village",
        addressLine2: "Devarabisanahalli",
        city: "Bengaluru",
        state: "Karnataka",
        postalCode: "560103",
        type: "Work",
        isDefault: false
      }
    ]
  },
  {
    id: "user-2",
    name: "Pooja Hegde",
    email: "pooja.h@example.com",
    phone: "+91 98112 34567",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=200&auto=format&fit=crop",
    role: "customer",
    joinedDate: "03 Feb 2026",
    ordersCount: 6,
    totalSpent: 18950,
    addresses: [
      {
        id: "addr-3",
        name: "Pooja Hegde",
        phone: "+91 98112 34567",
        addressLine1: "42, Silver Oak Residency, Bandra West",
        addressLine2: "Near Hill Road",
        city: "Mumbai",
        state: "Maharashtra",
        postalCode: "400050",
        type: "Home",
        isDefault: true
      }
    ]
  },
  {
    id: "user-3",
    name: "Vikram Malhotra",
    email: "vikram.m@example.com",
    phone: "+91 97234 56789",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&auto=format&fit=crop",
    role: "customer",
    joinedDate: "12 Mar 2026",
    ordersCount: 3,
    totalSpent: 8740,
    addresses: []
  },
  {
    id: "user-admin",
    name: "Admin Team",
    email: "admin@shopnova.com",
    phone: "+91 80000 00000",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&auto=format&fit=crop",
    role: "admin",
    joinedDate: "01 Jan 2026",
    ordersCount: 0,
    totalSpent: 0,
    addresses: []
  }
];

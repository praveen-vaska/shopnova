export const orders = [
  {
    orderId: "SN-89241",
    date: "2026-11-21T14:32:00Z",
    customer: {
      name: "Aarav Sharma",
      email: "aarav.sharma@example.com",
      phone: "+91 98765 43210"
    },
    shippingAddress: {
      name: "Aarav Sharma",
      phone: "+91 98765 43210",
      addressLine1: "B-204, Green Valley Apartments",
      addressLine2: "Outer Ring Road, Bellandur",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560103",
      type: "Home"
    },
    items: [
      {
        productId: "prod-1",
        name: "Classic Denim Jacket",
        price: 2099,
        quantity: 1,
        selectedColor: "Indigo Blue",
        selectedSize: "M",
        image: "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?q=80&w=800&auto=format&fit=crop"
      },
      {
        productId: "prod-7",
        name: "Wireless Studio Headphones",
        price: 2499,
        quantity: 1,
        selectedColor: "Champagne Beige",
        selectedSize: "One Size",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=800&auto=format&fit=crop"
      }
    ],
    pricing: {
      subtotal: 4598,
      discount: 500,
      couponApplied: "WELCOME10",
      shipping: 0,
      tax: 0,
      total: 4098
    },
    deliveryMethod: "express",
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    status: "Delivered",
    trackingTimeline: [
      { step: "Order Placed", date: "21 Nov 2026, 02:32 PM", completed: true },
      { step: "Confirmed", date: "21 Nov 2026, 03:15 PM", completed: true },
      { step: "Packed", date: "21 Nov 2026, 06:40 PM", completed: true },
      { step: "Shipped", date: "22 Nov 2026, 09:10 AM", completed: true },
      { step: "Out for Delivery", date: "23 Nov 2026, 08:30 AM", completed: true },
      { step: "Delivered", date: "23 Nov 2026, 11:45 AM", completed: true }
    ],
    estimatedDelivery: "23 Nov 2026"
  },
  {
    orderId: "SN-89240",
    date: "2026-11-22T09:14:00Z",
    customer: {
      name: "Pooja Hegde",
      email: "pooja.h@example.com",
      phone: "+91 98112 34567"
    },
    shippingAddress: {
      name: "Pooja Hegde",
      phone: "+91 98112 34567",
      addressLine1: "42, Silver Oak Residency",
      addressLine2: "Bandra West",
      city: "Mumbai",
      state: "Maharashtra",
      postalCode: "400050",
      type: "Home"
    },
    items: [
      {
        productId: "prod-11",
        name: "Modern Minimalist Table Lamp",
        price: 899,
        quantity: 2,
        selectedColor: "Brushed Brass",
        selectedSize: "Medium (35cm)",
        image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=800&auto=format&fit=crop"
      }
    ],
    pricing: {
      subtotal: 1798,
      discount: 0,
      shipping: 0,
      tax: 0,
      total: 1798
    },
    deliveryMethod: "standard",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    status: "Out for Delivery",
    trackingTimeline: [
      { step: "Order Placed", date: "22 Nov 2026, 09:14 AM", completed: true },
      { step: "Confirmed", date: "22 Nov 2026, 10:00 AM", completed: true },
      { step: "Packed", date: "22 Nov 2026, 02:30 PM", completed: true },
      { step: "Shipped", date: "22 Nov 2026, 07:00 PM", completed: true },
      { step: "Out for Delivery", date: "23 Nov 2026, 09:30 AM", completed: true },
      { step: "Delivered", date: "Pending", completed: false }
    ],
    estimatedDelivery: "23 Nov 2026"
  },
  {
    orderId: "SN-89239",
    date: "2026-11-22T16:45:00Z",
    customer: {
      name: "Vikram Malhotra",
      email: "vikram.m@example.com",
      phone: "+91 97234 56789"
    },
    shippingAddress: {
      name: "Vikram Malhotra",
      phone: "+91 97234 56789",
      addressLine1: "Villa 18, Palm Meadows",
      addressLine2: "Whitefield",
      city: "Bengaluru",
      state: "Karnataka",
      postalCode: "560066",
      type: "Home"
    },
    items: [
      {
        productId: "prod-8",
        name: "Smart Watch Pro Titanium",
        price: 3499,
        quantity: 1,
        selectedColor: "Titanium Gray",
        selectedSize: "46mm",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=800&auto=format&fit=crop"
      }
    ],
    pricing: {
      subtotal: 3499,
      discount: 350,
      couponApplied: "NOVA20",
      shipping: 0,
      tax: 0,
      total: 3149
    },
    deliveryMethod: "express",
    paymentMethod: "UPI",
    paymentStatus: "Paid",
    status: "Shipped",
    trackingTimeline: [
      { step: "Order Placed", date: "22 Nov 2026, 04:45 PM", completed: true },
      { step: "Confirmed", date: "22 Nov 2026, 05:20 PM", completed: true },
      { step: "Packed", date: "22 Nov 2026, 09:00 PM", completed: true },
      { step: "Shipped", date: "23 Nov 2026, 07:15 AM", completed: true },
      { step: "Out for Delivery", date: "Pending", completed: false },
      { step: "Delivered", date: "Pending", completed: false }
    ],
    estimatedDelivery: "24 Nov 2026"
  },
  {
    orderId: "SN-89238",
    date: "2026-11-23T06:20:00Z",
    customer: {
      name: "Meera Krishnan",
      email: "meera.k@example.com",
      phone: "+91 94455 66778"
    },
    shippingAddress: {
      name: "Meera Krishnan",
      phone: "+91 94455 66778",
      addressLine1: "15, Cenotaph Road",
      addressLine2: "Teynampet",
      city: "Chennai",
      state: "Tamil Nadu",
      postalCode: "600018",
      type: "Home"
    },
    items: [
      {
        productId: "prod-2",
        name: "Chunky Knit Merino Sweater",
        price: 1299,
        quantity: 1,
        selectedColor: "Warm Ivory",
        selectedSize: "M",
        image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop"
      },
      {
        productId: "prod-14",
        name: "Hydra-Glow Peptide Serum",
        price: 999,
        quantity: 1,
        selectedColor: "Clear Glass Dropper",
        selectedSize: "30 ml",
        image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop"
      }
    ],
    pricing: {
      subtotal: 2298,
      discount: 0,
      shipping: 0,
      tax: 0,
      total: 2298
    },
    deliveryMethod: "standard",
    paymentMethod: "Cash on Delivery",
    paymentStatus: "Pending",
    status: "Packed",
    trackingTimeline: [
      { step: "Order Placed", date: "23 Nov 2026, 06:20 AM", completed: true },
      { step: "Confirmed", date: "23 Nov 2026, 07:00 AM", completed: true },
      { step: "Packed", date: "23 Nov 2026, 10:15 AM", completed: true },
      { step: "Shipped", date: "Pending", completed: false },
      { step: "Out for Delivery", date: "Pending", completed: false },
      { step: "Delivered", date: "Pending", completed: false }
    ],
    estimatedDelivery: "25 Nov 2026"
  },
  {
    orderId: "SN-89237",
    date: "2026-11-23T08:50:00Z",
    customer: {
      name: "Rohan Varma",
      email: "rohan.v@example.com",
      phone: "+91 99887 76655"
    },
    shippingAddress: {
      name: "Rohan Varma",
      phone: "+91 99887 76655",
      addressLine1: "Flat 501, Prestige Towers",
      addressLine2: "Jubilee Hills",
      city: "Hyderabad",
      state: "Telangana",
      postalCode: "500033",
      type: "Home"
    },
    items: [
      {
        productId: "prod-16",
        name: "CloudPace Minimalist Sneakers",
        price: 1999,
        quantity: 1,
        selectedColor: "Chalk White",
        selectedSize: "UK 9",
        image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=800&auto=format&fit=crop"
      }
    ],
    pricing: {
      subtotal: 1999,
      discount: 200,
      couponApplied: "WELCOME10",
      shipping: 0,
      tax: 0,
      total: 1799
    },
    deliveryMethod: "express",
    paymentMethod: "Credit Card",
    paymentStatus: "Paid",
    status: "Confirmed",
    trackingTimeline: [
      { step: "Order Placed", date: "23 Nov 2026, 08:50 AM", completed: true },
      { step: "Confirmed", date: "23 Nov 2026, 09:10 AM", completed: true },
      { step: "Packed", date: "Pending", completed: false },
      { step: "Shipped", date: "Pending", completed: false },
      { step: "Out for Delivery", date: "Pending", completed: false },
      { step: "Delivered", date: "Pending", completed: false }
    ],
    estimatedDelivery: "25 Nov 2026"
  },
  // Additional historical orders for admin analytics
  {
    orderId: "SN-89236",
    date: "2026-11-20T11:15:00Z",
    customer: { name: "Tanmay Bansal", email: "tanmay@example.com", phone: "+91 98450 12345" },
    shippingAddress: { addressLine1: "Sec 45", city: "Gurugram", state: "Haryana", postalCode: "122003" },
    items: [{ productId: "prod-22", name: "Artisan Pour-Over Espresso Maker", price: 1899, quantity: 1 }],
    pricing: { subtotal: 1899, discount: 0, shipping: 0, total: 1899 },
    deliveryMethod: "standard", paymentMethod: "UPI", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "22 Nov 2026"
  },
  {
    orderId: "SN-89235",
    date: "2026-11-19T17:22:00Z",
    customer: { name: "Sneha Reddy", email: "sneha.r@example.com", phone: "+91 97000 11223" },
    shippingAddress: { addressLine1: "Banjara Hills", city: "Hyderabad", state: "Telangana", postalCode: "500034" },
    items: [{ productId: "prod-18", name: "Minimalist Leather Chronograph", price: 2499, quantity: 1 }],
    pricing: { subtotal: 2499, discount: 250, shipping: 0, total: 2249 },
    deliveryMethod: "express", paymentMethod: "Credit Card", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "21 Nov 2026"
  },
  {
    orderId: "SN-89234",
    date: "2026-11-18T10:05:00Z",
    customer: { name: "Kavya Patel", email: "kavya@example.com", phone: "+91 99090 88776" },
    shippingAddress: { addressLine1: "Bodakdev", city: "Ahmedabad", state: "Gujarat", postalCode: "380054" },
    items: [{ productId: "prod-23", name: "Cast Iron Dutch Oven 5.5L", price: 3899, quantity: 1 }],
    pricing: { subtotal: 3899, discount: 500, shipping: 0, total: 3399 },
    deliveryMethod: "standard", paymentMethod: "Net Banking", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "21 Nov 2026"
  },
  {
    orderId: "SN-89233",
    date: "2026-11-17T15:40:00Z",
    customer: { name: "Aditya Roy", email: "aditya.roy@example.com", phone: "+91 98200 44332" },
    shippingAddress: { addressLine1: "Koregaon Park", city: "Pune", state: "Maharashtra", postalCode: "411001" },
    items: [{ productId: "prod-19", name: "Eco-Luxe Canvas Weekender Duffel", price: 2899, quantity: 1 }],
    pricing: { subtotal: 2899, discount: 0, shipping: 0, total: 2899 },
    deliveryMethod: "express", paymentMethod: "UPI", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "19 Nov 2026"
  },
  {
    orderId: "SN-89232",
    date: "2026-11-16T12:30:00Z",
    customer: { name: "Ritika Sen", email: "ritika.s@example.com", phone: "+91 98300 77889" },
    shippingAddress: { addressLine1: "Salt Lake Sec 5", city: "Kolkata", state: "West Bengal", postalCode: "700091" },
    items: [{ productId: "prod-20", name: "Pro-Grip Natural Rubber Yoga Mat", price: 1599, quantity: 1 }],
    pricing: { subtotal: 1599, discount: 0, shipping: 0, total: 1599 },
    deliveryMethod: "standard", paymentMethod: "UPI", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "19 Nov 2026"
  },
  {
    orderId: "SN-89231",
    date: "2026-11-15T09:12:00Z",
    customer: { name: "Aarav Sharma", email: "aarav.sharma@example.com", phone: "+91 98765 43210" },
    shippingAddress: { addressLine1: "Bellandur", city: "Bengaluru", state: "Karnataka", postalCode: "560103" },
    items: [{ productId: "prod-6", name: "Supima Cotton Heavyweight Tee", price: 799, quantity: 2 }],
    pricing: { subtotal: 1598, discount: 0, shipping: 0, total: 1598 },
    deliveryMethod: "standard", paymentMethod: "Credit Card", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "17 Nov 2026"
  },
  {
    orderId: "SN-89230",
    date: "2026-11-14T14:48:00Z",
    customer: { name: "Pooja Hegde", email: "pooja.h@example.com", phone: "+91 98112 34567" },
    shippingAddress: { addressLine1: "Bandra West", city: "Mumbai", state: "Maharashtra", postalCode: "400050" },
    items: [{ productId: "prod-15", name: "Botanical Eau de Parfum", price: 2199, quantity: 1 }],
    pricing: { subtotal: 2199, discount: 200, shipping: 0, total: 1999 },
    deliveryMethod: "express", paymentMethod: "UPI", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "16 Nov 2026"
  },
  {
    orderId: "SN-89229",
    date: "2026-11-13T18:10:00Z",
    customer: { name: "Anil Kapoor", email: "anil.k@example.com", phone: "+91 98111 22334" },
    shippingAddress: { addressLine1: "Alipore", city: "Kolkata", state: "West Bengal", postalCode: "700027" },
    items: [{ productId: "prod-3", name: "Tailored Linen Blend Blazer", price: 3499, quantity: 1 }],
    pricing: { subtotal: 3499, discount: 350, shipping: 0, total: 3149 },
    deliveryMethod: "standard", paymentMethod: "Credit Card", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "16 Nov 2026"
  },
  {
    orderId: "SN-89228",
    date: "2026-11-12T11:25:00Z",
    customer: { name: "Kunal Shah", email: "kunal.s@example.com", phone: "+91 98222 33445" },
    shippingAddress: { addressLine1: "Indiranagar", city: "Bengaluru", state: "Karnataka", postalCode: "560038" },
    items: [{ productId: "prod-9", name: "True Wireless Earbuds ANC", price: 1899, quantity: 1 }],
    pricing: { subtotal: 1899, discount: 0, shipping: 0, total: 1899 },
    deliveryMethod: "standard", paymentMethod: "UPI", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "14 Nov 2026"
  },
  {
    orderId: "SN-89227",
    date: "2026-11-11T13:40:00Z",
    customer: { name: "Natasha Roy", email: "natasha@example.com", phone: "+91 98333 44556" },
    shippingAddress: { addressLine1: "Vasant Vihar", city: "New Delhi", state: "Delhi", postalCode: "110057" },
    items: [{ productId: "prod-5", name: "Minimalist Trench Coat", price: 4999, quantity: 1 }],
    pricing: { subtotal: 4999, discount: 500, shipping: 0, total: 4499 },
    deliveryMethod: "express", paymentMethod: "Credit Card", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "13 Nov 2026"
  },
  {
    orderId: "SN-89226",
    date: "2026-11-10T16:15:00Z",
    customer: { name: "Deepak Chopra", email: "deepak.c@example.com", phone: "+91 98444 55667" },
    shippingAddress: { addressLine1: "Koramangala", city: "Bengaluru", state: "Karnataka", postalCode: "560034" },
    items: [{ productId: "prod-10", name: "Wireless Charging Pad Duo", price: 1499, quantity: 1 }],
    pricing: { subtotal: 1499, discount: 0, shipping: 0, total: 1499 },
    deliveryMethod: "standard", paymentMethod: "UPI", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "12 Nov 2026"
  },
  {
    orderId: "SN-89225",
    date: "2026-11-09T10:35:00Z",
    customer: { name: "Shalini Joshi", email: "shalini.j@example.com", phone: "+91 98555 66778" },
    shippingAddress: { addressLine1: "Shivaji Nagar", city: "Pune", state: "Maharashtra", postalCode: "411005" },
    items: [{ productId: "prod-12", name: "Handcrafted Ceramic Vase Set", price: 1199, quantity: 1 }],
    pricing: { subtotal: 1199, discount: 0, shipping: 0, total: 1199 },
    deliveryMethod: "standard", paymentMethod: "Net Banking", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "12 Nov 2026"
  },
  {
    orderId: "SN-89224",
    date: "2026-11-08T15:55:00Z",
    customer: { name: "Gaurav Sen", email: "gaurav.s@example.com", phone: "+91 98666 77889" },
    shippingAddress: { addressLine1: "Sector 17", city: "Chandigarh", state: "Punjab", postalCode: "160017" },
    items: [{ productId: "prod-17", name: "Chelsea Leather Boots", price: 3299, quantity: 1 }],
    pricing: { subtotal: 3299, discount: 300, shipping: 0, total: 2999 },
    deliveryMethod: "express", paymentMethod: "Credit Card", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "10 Nov 2026"
  },
  {
    orderId: "SN-89223",
    date: "2026-11-07T12:00:00Z",
    customer: { name: "Divya Nair", email: "divya.n@example.com", phone: "+91 98777 88990" },
    shippingAddress: { addressLine1: "Panampilly Nagar", city: "Kochi", state: "Kerala", postalCode: "682036" },
    items: [{ productId: "prod-24", name: "Electric Gooseneck Pour-Over Kettle", price: 2799, quantity: 1 }],
    pricing: { subtotal: 2799, discount: 0, shipping: 0, total: 2799 },
    deliveryMethod: "standard", paymentMethod: "UPI", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "10 Nov 2026"
  },
  {
    orderId: "SN-89222",
    date: "2026-11-06T14:10:00Z",
    customer: { name: "Harsh Goenka", email: "harsh.g@example.com", phone: "+91 98888 99001" },
    shippingAddress: { addressLine1: "Civil Lines", city: "Jaipur", state: "Rajasthan", postalCode: "302006" },
    items: [{ productId: "prod-21", name: "Stainless Insulated Sport Flask", price: 799, quantity: 2 }],
    pricing: { subtotal: 1598, discount: 0, shipping: 0, total: 1598 },
    deliveryMethod: "standard", paymentMethod: "Cash on Delivery", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "09 Nov 2026"
  },
  {
    orderId: "SN-89221",
    date: "2026-11-04T10:15:00Z",
    customer: { name: "Aarav Sharma", email: "aarav.sharma@example.com", phone: "+91 98765 43210" },
    shippingAddress: { name: "Aarav Sharma", phone: "+91 98765 43210", addressLine1: "B-204, Green Valley Apartments", addressLine2: "Outer Ring Road, Bellandur", city: "Bengaluru", state: "Karnataka", postalCode: "560103", type: "Home" },
    items: [
      { productId: "prod-47", name: "Cast Iron Kettlebell 16kg", price: 1999, quantity: 1, selectedSize: "16kg", selectedColor: "Matte Black", image: "https://images.unsplash.com/photo-1586401100295-7a8096fd231a?q=80&w=800&auto=format&fit=crop" },
      { productId: "prod-48", name: "Seamless Performance Compression Tight", price: 1299, quantity: 1, selectedSize: "M", selectedColor: "Black Obsidian", image: "https://images.unsplash.com/photo-1506152983158-b4a74a01c721?q=80&w=800&auto=format&fit=crop" },
      { productId: "prod-21", name: "Stainless Insulated Sport Flask", price: 799, quantity: 1, selectedSize: "750ml", selectedColor: "Matte Slate", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop" }
    ],
    pricing: { subtotal: 4097, discount: 302, shipping: 0, total: 3795 },
    deliveryMethod: "express", paymentMethod: "UPI", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "06 Nov 2026"
  },
  {
    orderId: "SN-89215",
    date: "2026-10-28T16:20:00Z",
    customer: { name: "Aarav Sharma", email: "aarav.sharma@example.com", phone: "+91 98765 43210" },
    shippingAddress: { name: "Aarav Sharma", phone: "+91 98765 43210", addressLine1: "Tower 4, Embassy Tech Village", addressLine2: "Devarabisanahalli", city: "Bengaluru", state: "Karnataka", postalCode: "560103", type: "Work" },
    items: [
      { productId: "prod-44", name: "Everyday Suede Espadrilles", price: 1499, quantity: 1, selectedSize: "UK 9", selectedColor: "Tan Caramel", image: "https://images.unsplash.com/photo-1560343090-f0409e92791a?q=80&w=800&auto=format&fit=crop" },
      { productId: "prod-45", name: "Full-Grain Leather Cardholder Wallet", price: 899, quantity: 1, selectedSize: "Compact", selectedColor: "Cognac Brown", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=800&auto=format&fit=crop" },
      { productId: "prod-41", name: "Clarifying Charcoal Face Polish", price: 849, quantity: 1, selectedSize: "100ml", selectedColor: "Default", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=800&auto=format&fit=crop" }
    ],
    pricing: { subtotal: 3247, discount: 248, shipping: 0, total: 2999 },
    deliveryMethod: "standard", paymentMethod: "Credit Card", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "30 Oct 2026"
  },
  {
    orderId: "SN-89219",
    date: "2026-11-01T11:30:00Z",
    customer: { name: "Pooja Hegde", email: "pooja.h@example.com", phone: "+91 98112 34567" },
    shippingAddress: { name: "Pooja Hegde", phone: "+91 98112 34567", addressLine1: "42, Silver Oak Residency, Bandra West", addressLine2: "Near Hill Road", city: "Mumbai", state: "Maharashtra", postalCode: "400050", type: "Home" },
    items: [
      { productId: "prod-14", name: "Hydra-Glow Peptide Serum", price: 999, quantity: 1, selectedSize: "30ml", selectedColor: "Standard", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?q=80&w=800&auto=format&fit=crop" },
      { productId: "prod-40", name: "Whipped Shea Body Butter", price: 799, quantity: 2, selectedSize: "200g", selectedColor: "Natural Shea", image: "https://images.unsplash.com/photo-1608248597359-59749fb25488?q=80&w=800&auto=format&fit=crop" },
      { productId: "prod-15", name: "Silk Sleep Eye Mask", price: 1957, quantity: 1, selectedSize: "One Size", selectedColor: "Midnight Navy", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=800&auto=format&fit=crop" }
    ],
    pricing: { subtotal: 4554, discount: 0, shipping: 0, total: 4554 },
    deliveryMethod: "express", paymentMethod: "UPI", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "03 Nov 2026"
  },
  {
    orderId: "SN-89214",
    date: "2026-10-24T14:45:00Z",
    customer: { name: "Pooja Hegde", email: "pooja.h@example.com", phone: "+91 98112 34567" },
    shippingAddress: { name: "Pooja Hegde", phone: "+91 98112 34567", addressLine1: "42, Silver Oak Residency, Bandra West", addressLine2: "Near Hill Road", city: "Mumbai", state: "Maharashtra", postalCode: "400050", type: "Home" },
    items: [
      { productId: "prod-49", name: "Japanese Damascus Knife 7-Inch", price: 2899, quantity: 1, selectedSize: "7-Inch", selectedColor: "Damascus Steel", image: "https://images.unsplash.com/photo-1593618998160-e34014e67546?q=80&w=800&auto=format&fit=crop" },
      { productId: "prod-23", name: "Ceramic Pour-Over Coffee Dripper", price: 1000, quantity: 1, selectedSize: "1-4 Cups", selectedColor: "Matte White", image: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop" }
    ],
    pricing: { subtotal: 3899, discount: 0, shipping: 0, total: 3899 },
    deliveryMethod: "standard", paymentMethod: "Credit Card", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "27 Oct 2026"
  },
  {
    orderId: "SN-89210",
    date: "2026-10-18T09:15:00Z",
    customer: { name: "Pooja Hegde", email: "pooja.h@example.com", phone: "+91 98112 34567" },
    shippingAddress: { name: "Pooja Hegde", phone: "+91 98112 34567", addressLine1: "42, Silver Oak Residency, Bandra West", addressLine2: "Near Hill Road", city: "Mumbai", state: "Maharashtra", postalCode: "400050", type: "Home" },
    items: [
      { productId: "prod-46", name: "Titanium Polarized Sunglasses", price: 2299, quantity: 1, selectedSize: "Medium", selectedColor: "Matte Gold", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?q=80&w=800&auto=format&fit=crop" },
      { productId: "prod-18", name: "Minimalist Leather Tote Bag", price: 1500, quantity: 1, selectedSize: "Standard", selectedColor: "Dusty Rose", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=800&auto=format&fit=crop" }
    ],
    pricing: { subtotal: 3799, discount: 299, shipping: 0, total: 3500 },
    deliveryMethod: "express", paymentMethod: "UPI", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "20 Oct 2026"
  },
  {
    orderId: "SN-89205",
    date: "2026-10-10T17:40:00Z",
    customer: { name: "Pooja Hegde", email: "pooja.h@example.com", phone: "+91 98112 34567" },
    shippingAddress: { name: "Pooja Hegde", phone: "+91 98112 34567", addressLine1: "42, Silver Oak Residency, Bandra West", addressLine2: "Near Hill Road", city: "Mumbai", state: "Maharashtra", postalCode: "400050", type: "Home" },
    items: [
      { productId: "prod-4", name: "Pure Cashmere Ribbed Scarf", price: 2400, quantity: 1, selectedSize: "One Size", selectedColor: "Oatmeal Melange", image: "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?q=80&w=800&auto=format&fit=crop" },
      { productId: "prod-13", name: "Scented Soy Candle Amber & Oak", price: 800, quantity: 1, selectedSize: "250g", selectedColor: "Amber Glass", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?q=80&w=800&auto=format&fit=crop" }
    ],
    pricing: { subtotal: 3200, discount: 0, shipping: 0, total: 3200 },
    deliveryMethod: "standard", paymentMethod: "Credit Card", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "13 Oct 2026"
  },
  {
    orderId: "SN-89218",
    date: "2026-11-02T13:25:00Z",
    customer: { name: "Vikram Malhotra", email: "vikram.m@example.com", phone: "+91 97234 56789" },
    shippingAddress: { name: "Vikram Malhotra", phone: "+91 97234 56789", addressLine1: "Villa 18, Palm Meadows", addressLine2: "Whitefield", city: "Bengaluru", state: "Karnataka", postalCode: "560066", type: "Home" },
    items: [
      { productId: "prod-42", name: "Italian Leather Penny Loafers", price: 3499, quantity: 1, selectedSize: "UK 10", selectedColor: "Espresso Brown", image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop" }
    ],
    pricing: { subtotal: 3499, discount: 0, shipping: 0, total: 3499 },
    deliveryMethod: "express", paymentMethod: "UPI", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "04 Nov 2026"
  },
  {
    orderId: "SN-89212",
    date: "2026-10-20T11:05:00Z",
    customer: { name: "Vikram Malhotra", email: "vikram.m@example.com", phone: "+91 97234 56789" },
    shippingAddress: { name: "Vikram Malhotra", phone: "+91 97234 56789", addressLine1: "Villa 18, Palm Meadows", addressLine2: "Whitefield", city: "Bengaluru", state: "Karnataka", postalCode: "560066", type: "Home" },
    items: [
      { productId: "prod-2", name: "Chunky Knit Merino Sweater", price: 1299, quantity: 1, selectedSize: "L", selectedColor: "Charcoal Heather", image: "https://images.unsplash.com/photo-1576871337622-98d48d1cf531?q=80&w=800&auto=format&fit=crop" },
      { productId: "prod-21", name: "Stainless Insulated Sport Flask", price: 793, quantity: 1, selectedSize: "750ml", selectedColor: "Brushed Steel", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?q=80&w=800&auto=format&fit=crop" }
    ],
    pricing: { subtotal: 2092, discount: 0, shipping: 0, total: 2092 },
    deliveryMethod: "standard", paymentMethod: "Credit Card", paymentStatus: "Paid", status: "Delivered", estimatedDelivery: "22 Oct 2026"
  }
];

import { AiOutlineUser } from "react-icons/ai";
import { BiCoinStack } from "react-icons/bi";
import { FiShoppingCart } from "react-icons/fi";
import { HiOutlineMail, HiOutlinePuzzle } from "react-icons/hi";
import { LuImage } from "react-icons/lu";
import { MdMonitor, MdOutlineSecurity, MdOutlineSettings } from "react-icons/md";
import { PiEmptyBold } from "react-icons/pi";
import { RiPieChartLine } from "react-icons/ri";
import { TiStarOutline } from "react-icons/ti";
import { FaMoneyBill } from "react-icons/fa";

const navData = [
    {
        "label": "Dashboard",
        "icon": MdMonitor,
        "isGroup": false,
        "url": "/admin/dashboard"
    },
    {
        "label": "Orders",
        "icon": FiShoppingCart,
        "isGroup": true,
        "sub_menu": [
            {
                "label": "All Order",
                "url": "/admin/order?filter=all"
            },
            {
                "label": "Pending",
                "url": "/admin/order?filter=pending"
            },
            {
                "label": "Processing",
                "url": "/admin/order?filter=processing"
            },
            {
                "label": "On The Way",
                "url": "/admin/order?filter=on-the-way"
            },
            {
                "label": "On Hold",
                "url": "/admin/order?filter=on-hold"
            },
            {
                "label": "In Courier",
                "url": "/admin/order?filter=in-courier"
            },
            {
                "label": "Completed",
                "url": "/admin/order?filter=completed"
            },
            {
                "label": "Cancelled",
                "url": "/admin/order?filter=cancelled"
            },
            {
                "label": "কাস্টমার ভুয়া",
                "url": "/admin/order?filter=%E0%A6%95%E0%A6%BE%E0%A6%B8%E0%A7%8D%E0%A6%9F%E0%A6%AE%E0%A6%BE%E0%A6%B0-%E0%A6%AD%E0%A7%81%E0%A7%9F%E0%A6%BE"
            },
            {
                "label": "কল রিসিভ করতেছেনা",
                "url": "/admin/order?filter=%E0%A6%95%E0%A6%B2-%E0%A6%B0%E0%A6%BF%E0%A6%B8%E0%A6%BF%E0%A6%AD-%E0%A6%95%E0%A6%B0%E0%A6%A4%E0%A7%87%E0%A6%9B%E0%A7%87%E0%A6%A8%E0%A6%BE"
            }
        ]
    },
    {
        "label": "Products",
        "icon": BiCoinStack,
        "isGroup": true,
        "sub_menu": [
            {
                "label": "Product Manage",
                "url": "/admin/products/manage"
            },
            {
                "label": "Categories",
                "url": "/admin/products/categories/manage"
            },
            {
                "label": "Sub Categories",
                "url": "/admin/products/sub-categories/manage"
            },
            {
                "label": "Child Categories",
                "url": "/admin/products/child-categories/manage"
            },
            {
                "label": "Brands",
                "url": "/admin/products/brands/manage"
            },
            {
                "label": "Colors",
                "url": "/admin/products/color/manage"
            },
            {
                "label": "Sizes",
                "url": "/admin/products/size/manage"
            },
            {
                "label": "Price Edit",
                "url": "/admin/products/price-edit"
            },
            {
                "label": "Coupons",
                "url": "/admin/products/coupon"
            }
        ]
    },
    {
        "label": "Reviews",
        "icon": TiStarOutline,
        "isGroup": true,
        "sub_menu": [
            {
                "label": "Pending Reviews (4)",
                "url": "/admin/review/pending"
            },
            {
                "label": "Create",
                "url": "/admin/review/create"
            },
            {
                "label": "All Reviews",
                "url": "/admin/review"
            }
        ]
    },
    // {
    //     "label": "Landing Page",
    //     "icon": MdMonitor,
    //     "isGroup": true,
    //     "sub_menu": [
    //         {
    //             "label": "Create",
    //             "url": "/admin/campaign/create"
    //         },
    //         {
    //             "label": "Campaign",
    //             "url": "/admin/campaign/manage"
    //         }
    //     ]
    // },
    {
        "label": "Payment Requests",
        "icon": FaMoneyBill,
        "isGroup": false,
        "url": "/admin/payment-requests/manage"
    },
    {
        "label": "Users",
        "icon": AiOutlineUser,
        "isGroup": true,
        "sub_menu": [
            {
                "label": "User",
                "url": "/admin/users/manage"
            },
            {
                "label": "Roles",
                "url": "/admin/users/roles"
            },
            // {
            //     "label": "Permissions",
            //     "url": "/admin/users/permissions/manage"
            // },
            {
                "label": "Seller Requests",
                "url": "/admin/users/seller-request/manage"
            },
            {
                "label": "Supplier Requests",
                "url": "/admin/users/supplier-request/manage"
            },
            {
                "label": "Customers",
                "url": "/admin/users/customers/manage"
            }
        ]
    },
    {
        "label": "Site Setting",
        "icon": MdOutlineSettings,
        "isGroup": true,
        "sub_menu": [
            {
                "label": "General Setting",
                "url": "/admin/settings/manage"
            },
            {
                "label": "Pixels Setting",
                "url": "/admin/settings/pixels/manage"
            },
            {
                "label": "Social Media",
                "url": "/admin/settings/social-media/manage"
            },
            {
                "label": "Contact",
                "url": "/admin/settings/contact/manage"
            },
            {
                "label": "Create Page",
                "url": "/admin/settings/page/manage"
            },
            {
                "label": "Shipping Charge",
                "url": "/admin/settings/shipping-charge/manage"
            },
            {
                "label": "Order Status",
                "url": "/admin/settings/order-status/manage"
            }
        ]
    },
    {
        "label": "Fraud API",
        "icon": MdOutlineSecurity,
        "isGroup": false,
        "url": "/admin/fraudapi/manage"
    },
    {
        "label": "Mail SMTP",
        "icon": HiOutlineMail,
        "isGroup": false,
        "url": "/admin/smtp/manage"
    },
    {
        "label": "IP Block",
        "icon": PiEmptyBold,
        "isGroup": false,
        "url": "/admin/customer/ip-block"
    },
    {
        "label": "API Integration",
        "icon": HiOutlinePuzzle,
        "isGroup": true,
        "sub_menu": [
            {
                "label": "Courier API",
                "url": "/admin/manage/courier-api"
            },
            {
                "label": "Payment Gateway",
                "url": "/admin/manage/paymentgeteway"
            },
            {
                "label": "SMS Gateway",
                "url": "/admin/manage/sms-gateway"
            }
        ]
    },
    {
        "label": "G. Pixel and GTM",
        "icon": HiOutlinePuzzle,
        "isGroup": true,
        "sub_menu": [
            {
                "label": "Tag Manager",
                "url": "/admin/tag-manager"
            },
            {
                "label": "Pixel Manage",
                "url": "/admin/pixels"
            }
        ]
    },
    {
        "label": "Banner & Ads",
        "icon": LuImage,
        "isGroup": true,
        "sub_menu": [
            {
                "label": "Banner Category",
                "url": "/admin/banner-category"
            },
            {
                "label": "Banner & Ads",
                "url": "/admin/banner"
            }
        ]
    },
    {
        "label": "Reports",
        "icon": RiPieChartLine,
        "isGroup": true,
        "sub_menu": [
            {
                "label": "Stock Report",
                "url": "/admin/stock-report"
            },
            {
                "label": "Order Reports",
                "url": "/admin/order-report"
            }
        ]
    }
];

export default navData;

import ProtectedRoute from "./ProtectedRoute"; // adjust path

import AdminPanelRoot from "../Pages/AdminPanel/AdminPanelRoot";
import BannerCategories from "../Pages/AdminPanel/BannerAndAds/BannerCategories/BannerCategories";
import Banners from "../Pages/AdminPanel/BannerAndAds/Banners/Banners";
import Dashboard from "../Pages/AdminPanel/Dashboard/Dashboard";
import GooglePixel from "../Pages/AdminPanel/GPixel&GTM/GooglePixels/GooglePixels";
import GoogleTagManager from "../Pages/AdminPanel/GPixel&GTM/GoogleTagManager/GoogleTagManager";
import Orders from "../Pages/AdminPanel/Orders/Orders";
import StockReport from "../Pages/AdminPanel/Reports/StockReport/StockReport";

import UsersManage from "../Pages/AdminPanel/Users/UsersManage/UsersManage"
import Roles from "../Pages/AdminPanel/Users/Roles/Roles";
import RoleManage
  from "../Pages/AdminPanel/Users/Roles/RoleManage/RoleManage";
import Permissions from "../Pages/AdminPanel/Users/Permissions/Permissions";
import Customers from "../Pages/AdminPanel/Users/Customers/Customers";

import GeneralSetting from "../Pages/AdminPanel/Settings/GeneralSetting/GeneralSetting";
import PixelSetting from "../Pages/AdminPanel/Settings/PixelSetting/PixelSetting";
import SocialMedia from "../Pages/AdminPanel/Settings/SocialMedia/SocialMedia";
import Contact from "../Pages/AdminPanel/Settings/Contact/Contact";
import CreatePage from "../Pages/AdminPanel/Settings/CreatePage/CreatePage";
import ShippingCharge from "../Pages/AdminPanel/Settings/ShippingCharge/ShippingCharge";
import OrderStatus from "../Pages/AdminPanel/Settings/OrderStatus/OrderStatus";
import FraudAPI from "../Pages/AdminPanel/FraudApi/FraudApi";
import SMTP_Mail from "../Pages/AdminPanel/SMTP_Mail/SMTP_Mail";
import IP_Block from "../Pages/AdminPanel/IP_Block/IP_Block"


import Products from "../Pages/AdminPanel/Products/Products";
import CategoryTable from "../Pages/AdminPanel/Products/CategoryTable";
import SubcategoryTable from "../Pages/AdminPanel/Products/SubcategoryTable";
import Childcategories from "../Pages/AdminPanel/Products/ChildCateogory";
// import Brands from "../Pages/AdminPanel/Products/Brands";  
import BrandManage from "../Pages/AdminPanel/Products/BrandManage";
import ColorManage from "../Pages/AdminPanel/Products/ColorManage";
import PriceEdit from "../Pages/AdminPanel/Products/PriceEdit";
import Coupon from "../Pages/AdminPanel/Products/Coupon";
import PendingReview from "../Pages/AdminPanel/Reviews/PendingReview";
import CourierAPI from "../Pages/AdminPanel/APIIntegration/CourierAPI";
import PaymentGatewayForm from "../Pages/AdminPanel/APIIntegration/PaymentGatewayForm";
import SmsGatewayForm from "../Pages/AdminPanel/APIIntegration/SmsGatewayForm";
import ProductSize from "../Pages/AdminPanel/Products/ProductSize";
import AllReviewList from "../Pages/AdminPanel/Reviews/AllReviewList";
import CreateOrEditReview from "../Pages/AdminPanel/Reviews/CreateOrEditReview/CreateOrEditReview";


import Invoice from "../Pages/AdminPanel/Orders/Invoice/Invoice";
import OrderProcess from "../Pages/AdminPanel/Orders/OrderProcess/OrderProcess";
import OrderCreateOrEdit from "../Pages/AdminPanel/Orders/OrderCreateOrEdit/OrderCreateOrEdit";
import CreateOrEditUser from "../Pages/AdminPanel/Users/CreateOrEditUser/CreateOrEditUser";
import CreateOrUpdateGeneralSetting from "../Pages/AdminPanel/Settings/GeneralSetting/CreateOrUpdateGeneralSetting/CreateOrEditGeneralSetting";
import CreateOrEditPixel from "../Pages/AdminPanel/Settings/PixelSetting/CreateOrEditPixel/CreateOrEditPixel";
import CreateOrEditSocialMedia from "../Pages/AdminPanel/Settings/SocialMedia/CreateOrEditSocialMedia/CreateOrEditSocialMedia";
import CreateOrEditContact from "../Pages/AdminPanel/Settings/Contact/CreateOrEditContact/CreateOrEditContact";
import CreateOrEditShippingCharge from "../Pages/AdminPanel/Settings/ShippingCharge/CreateOrEditShippingChare/CreateOrEditShippingCharge";
import BecomeAReseller from "../Pages/ResellerDashboard/BecomeAReseller";

import CreateOrEditOrderStatus from "../Pages/AdminPanel/Settings/OrderStatus/CreateOrEditOrderStatus/CreateOrEditOrderStatus";
import CreateOrEditCustomer from "../Pages/AdminPanel/Users/Customers/CreateOrEditCustomer/CreateOrEditCustomer";
import CreateOrEditTag from "../Pages/AdminPanel/PixelAndGTM/TagManager/CreateOrEditTag/CreateOrEditTag";
import Tag from "../Pages/AdminPanel/PixelAndGTM/TagManager/Tag";

import CreateOrEditProduct from "../Pages/AdminPanel/Products/CreateOrEditProduct/CreateOrEditProduct";
import CreateOrEditBrand from "../Pages/AdminPanel/Products/CreateOrEditBrand/CreateOrEditBrand";
import CreateOrEditCategory from "../Pages/AdminPanel/Products/CreateOrEditCategory/CreateOrEditCategory";

import CreateOrEditChildCategory from "../Pages/AdminPanel/Products/CreateOrEditChildCategory/CreateOrEditChildCategory";
import CreateOrEditSubCategory from "../Pages/AdminPanel/Products/CreateOrEditSubCategory/CreateOrEditSubCategory";
import SellerRequest from "../Pages/AdminPanel/Users/SellerRequest/SellerRequest";
import SupplierRequest from "../Pages/AdminPanel/Users/SupplierRequest/Supplierrequest";
import PaymentRequests from "../Pages/AdminPanel/PaymentRequests/PaymentRequests";



import { productEditData } from "./RoutingComponentDataForEdit/RoutingComponentDataForEdit"
const products = [
  {
    id: 1,
    name: 'প্রিমিয়াম লেলোচেট ক্রপ কভার | PLW-620',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJiQLcW6ybzrXXFL7QHRbEvw94zjypJpRfRU5TF3_2AolKBQPLUjTzBEm2Fip1HUWDl6ZKudjeSTMtgcbudHBmFYFigQ9n11_UktvJKC23hPcp1IJLP2DQvuDt4wj7fLIypphuHqaP84uBh24eFP_eSHg0jNdDkeN9Sg1q37d6u8uGUR3bmQHc3dRspnRuXVsaDtXm4k_Cr134RRI3GoYQzX-SrVqkgKtLMNvVmDhd5KS8klL_3jg4kpUj2EPGa32MlWpr5FG5_jo',
    price: 250,
    quantity: 3,
    discount: 0,
  },
  {
    id: 2,
    name: 'প্রিমিয়াম লেলোচেট ক্রপ কভার | PLW-510',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD6GTPOp3zbtU7z99Tn1T4nT84SUMTWjGrVLpaUH3_lUdyKewg59OScaxsduLfWpoVHu5RUBqi1CeK825rxD8QJdc_7RKZ8mYzn6hdD5dUpfzPDXwZBEcRXvIuOmA_OcHOk3RHLpN3i7I0H11YtVGEK_Gb7zXKgCmBF1WX4vzFqbDpCqhlyzMp4P6JCWUrGi3G2FdvMJlIsHQ2fos98T-gOqPGxuOSsrrCmLIiwE41tuyuZUdbxEB6iR693AEhNpRDEDITAu5vn3pY',
    price: 250,
    quantity: 2,
    discount: 0,
  }
];

const customerInfo = {
  name: '',
  number: '',
  address: '',
  area: ''
};


const ProtectedRoutes = {
  AdminRoutes: {
    path: "/admin",
    element: <AdminPanelRoot />,
    //  element: (
    //   <ProtectedRoute allowedRole="admin">
    //     <AdminPanelRoot />
    //   </ProtectedRoute>
    // ),
    children: [
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "order",
        element: <Orders />,
      },
      {
        path: "payment-requests/manage",
        element: <PaymentRequests />,
      },

      // GooglePixel&GTM routes
      {
        path: "tag-manager",
        element: <GoogleTagManager />,
      },
      {
        path: "pixels",
        element: <GooglePixel />,
      },

      // Banners and Ads
      {
        path: "banner-category",
        element: <BannerCategories />,
      },
      {
        path: "banner",
        element: <Banners />,
      },

      // reports
      {
        path: "stock-report",
        element: <StockReport />,
      },
      {
        path: "settings",
        children: [
          {
            path: "manage",
            element: <GeneralSetting />
          },
          {
            path: "general/create",
            element: <CreateOrUpdateGeneralSetting />
          },
          {
            path: "general/edit/:id",
            element: <CreateOrUpdateGeneralSetting
              initialData={{
                name: "GlobeUp",
                whiteLogo: "https://ecom2.lolona.shop/public/uploads/settings/1752924017-images__6_-removebg-preview.webp",
                darkLogo: "https://ecom2.lolona.shop/public/uploads/settings/1752924017-images__6_-removebg-preview.webp",
                favicon: "https://ecom2.lolona.shop/public/uploads/settings/1752924062-images__6_-removebg-preview.webp"
              }}
            />
          },
          {
            path: "pixels/manage",
            element: <PixelSetting />
          },
          {
            path: "pixel/create",
            element: <CreateOrEditPixel />
          },
          {
            path: "pixel/edit/:id",
            element: <CreateOrEditPixel
              previousData={{
                pixelsId: '134234',
                status: true
              }}
            />
          },
          {
            path: "social-media/manage",
            element: <SocialMedia />
          },
          {
            path: "social-media/create",
            element: <CreateOrEditSocialMedia />
          },
          {
            path: "social-media/edit/:id",
            element: <CreateOrEditSocialMedia
              initialData={{
                title: 'Facebook',
                icon: 'fab fa-facebook',
                link: 'https://facebook.com',
                color: '#3b82f6',
                status: true
              }}

            />
          },
          {
            path: "contact/manage",
            element: <Contact />
          },
          {
            path: "contact/create",
            element: <CreateOrEditContact />
          },
          {
            path: "contact/edit/:id",
            element: <CreateOrEditContact
              initialData={{
                hotline: '01893476370',
                hotmail: 'dev.morsalin@hotmalil.com',
                phone: '01893476370',
                whatsapp: '01893476370',
                email: 'dev.morsalin@gmail.com',
                address: 'Satkhira, Khulna',
                googleMap: '',
                status: true
              }}
            />
          },
          {
            path: "page/manage",
            element: <CreatePage />
          },
          {
            path: "shipping-charge/manage",
            element: <ShippingCharge />
          },
          {
            path: "shipping-charge/create",
            element: <CreateOrEditShippingCharge />
          },
          {
            path: "shipping-charge/edit/:id",
            element: <CreateOrEditShippingCharge
              initialData={{
                area: "Dhaka",
                amount: 100,
                status: true
              }}
            />
          },
          {
            path: "order-status/manage",
            element: <OrderStatus />
          },
          {
            path: "order-status/create",
            element: <CreateOrEditOrderStatus />
          },
          {
            path: "order-status/edit/:id",
            element: <CreateOrEditOrderStatus
              initialData={{
                orderState: "Pending",
                status: true
              }}
            />
          },
        ],

      },

      {
        path: "products",
        children: [
          {

            path: "manage",
            element: <Products /> // but this does not work

          },

          {
            path: "categories/manage",
            element: <CategoryTable />
          },
          {
            path: "categories/create",
            element: <CreateOrEditCategory />
          },
          {
            path: "categories/edit/:id",
            element: <CreateOrEditCategory 
              editedData={{
                category: '2',
                categoryName: "Men's T-Shirts",
                title: "Men T-Shirts Collection",
                description: "Browse our collection of high-quality men's t-shirts",
                status: true
              }}
            />
          },

          {
            path: "sub-categories/manage",
            element: <SubcategoryTable />
          },
          {
            path: "sub-categories/create",
            element: <CreateOrEditSubCategory />
          },
          {
            path: "sub-categories/edit/:id",
            element: <CreateOrEditSubCategory 
              editedData={{
                subCategory: '2',
                subCategoryName: "Men's T-Shirts",
                title: "Men T-Shirts Collection",
                description: "Browse our collection of high-quality men's t-shirts",
                status: true
              }}
            />
          },
          {
            path: "child-categories/manage",
            element: <Childcategories />
          },
          {
            path: "child-categories/create",
            element: <CreateOrEditChildCategory />
          },
          {
            path: "child-categories/edit/:id",
            element: <CreateOrEditChildCategory
              editedData={{
                childCategory: '2',
                childCategoryName: "Men's T-Shirts",
                title: "Men T-Shirts Collection",
                description: "Browse our collection of high-quality men's t-shirts",
                status: true
              }}
            />
          },
          {
            path: "brands/manage",
            element: <BrandManage />
          },
          {
            path: "brand/create",
            element: <CreateOrEditBrand />
          },
          {
            path: "brand/edit/:id",
            element: <CreateOrEditBrand
              brand={{
                name: '',
                image: null,
                status: true,
                fileName: 'No file chosen'
              }}
            />
          },
          {
            path: "color/manage",
            element: <ColorManage />
          },
          {
            path: "size/manage",
            element: <ProductSize />
          },
          {
            path: "color/manage",
            element: <ColorManage />
          },
          {
            path: "size/manage",
            element: <ProductSize />
          },
          {
            path: "price-edit",
            element: <PriceEdit />
          },
          {
            path: "coupon",
            element: <Coupon />
          },
        ]

      },

      {
        path: "product",
        children: [
          {
            path: "create",
            element: <CreateOrEditProduct />
          },
          {
            path: "edit/:id",
            element: <CreateOrEditProduct
              mode="edit"
              productData={productEditData}
            />
          },
        ]
      },
      {
        path: "review",
        children: [
          {
            path: "pending",
            element: <PendingReview />
          },
          {
            path: "create",
            element: <CreateOrEditReview />
          },
          {
            path: "edit/:id",
            element: <CreateOrEditReview
              reviewInfo={{
                product: '',
                customerName: '',
                customerEmail: 'N / A',
                rating: 5,
                review: '',
                status: true,

              }}
            />
          },

          {
            path: "",
            element: <AllReviewList />
          },
        ],
      },
      {
        path: "manage",
        children: [
          {
            path: "courier-api",
            element: <CourierAPI />
          },
          {
            path: "paymentgeteway",
            element: <PaymentGatewayForm />
          },
          {
            path: "sms-gateway",
            element: <SmsGatewayForm />
          },
        ],

      },
      {
        path: "order/invoice/:id", // dynamic route
        element: <Invoice />
      },

      {
        path: "order/process/:id",
        element: <OrderProcess />
      },

      {
        path: "order/create",
        element: <OrderCreateOrEdit />
      },
      {
        path: "order/edit/:id",
        element: <OrderCreateOrEdit
          previousProducts={products}
          previousOrderedProduct={products.slice(1)}
          productCustomerInfo={customerInfo}
        />
      },
      {
        path: "users",
        children: [
          {

            path: "manage",
            // element:  <h1>User manage</h1> // this works
            element: <UsersManage /> // but this does not work

          },

            {
            path: "seller-request/manage",
            element: <SellerRequest />
          },
          {
            path: "supplier-request/manage",
            element: <SupplierRequest />
          },

          {
            path: "create",
            element: <CreateOrEditUser />
          },

          {
            path: "edit/:id",
            element: <CreateOrEditUser
              user={
                {
                  name: 'Morsalin',
                  email: 'dev.morsalin@gmail.com',
                  password: '',
                  confirmPassword: ''
                }
              }
            />
          },
          {
            path: "create-customer",
            element: <CreateOrEditCustomer />
          },

          {
            path: "customer/edit/:id",
            element: <CreateOrEditCustomer
              customer={
                {
                  name: 'Morsalin',
                  email: 'dev.morsalin@gmail.com',
                  password: '',
                  confirmPassword: ''
                }
              }
            />
          },
          {
            path: "roles",
            element: <Roles />
          },
          {
            path: "roles/manage",
            element: <RoleManage />
          },

          {
            path: "permissions/manage",
            element: <Permissions />
          },
          {
            path: "customers/manage",
            element: <Customers />

          },
        
        ]

      },
      {
        path: "fraudapi/manage",
        element: <FraudAPI />,
      },

      {
        path: "smtp/manage",
        element: <SMTP_Mail />
      },
      {
        path: "customer/ip-block",
        element: <IP_Block />
      },

      {
        path: "tag",
        children: [
          {
            path: "manage",
            element: <Tag />
          },
          {
            path: "create",
            element: <CreateOrEditTag />
          },
          {
            path: "edit/:id",
            element: <CreateOrEditTag
              previousData={{
                tagsId: '',
                status: true
              }}
            />
          }
        ]
      }
    ],
  },

  ResselerRoutes: {
    path: "/become_a_reseller",
    element: <BecomeAReseller />,
  }
};

export default ProtectedRoutes;

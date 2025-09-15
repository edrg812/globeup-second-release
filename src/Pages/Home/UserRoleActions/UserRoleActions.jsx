// import SellerRoleActions from "./SellerActions";
// import SupplierRoleActions from "./SupplierRoleActions";

// export default function UserRoleActions() {
//     if (role === "seller") {
//         return <SellerRoleActions />;
//     }
//     else if (role === "supplier") {
//         return <SupplierRoleActions />;
//     }
// }

import SellerRoleActions from "./SellerActions";
import SupplierRoleActions from "./SupplierRoleActions";

import useProfile from "../../../hooks/useProfile";

export default function UserRoleActions() {
  const { profile } = useProfile();

  if (profile?.user_type === "reseller") {
    return <SellerRoleActions />;
  } else if (profile?.user_type === "supplier") {
    return <SupplierRoleActions />;
  }
}

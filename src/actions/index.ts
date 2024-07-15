export { getAllProducts } from './products/get-all-products'
export { getProductBySlug } from './products/get-product-by-slug'
export { getProductByCategory } from './products/get-product-by-category'

export { registerUser } from './register/register-user'

export { getCategories } from './categories/get-categories'

export { loginUser } from './login/login-user'

export { logoutUser } from './logout/logout-user'

export { getLocationData } from './address/get-location-data'
export { getUserAddress } from './address/get-user-address'
export { saveUserAddress } from './address/save-user-address'
export { deleteUserAddress } from './address/delete-user-address'
export { updateUserAddress } from './address/update-user-address'

export { getAllUsers } from './admin/users/get-all-users'
export { deleteManyUsers } from './admin/users/delete-many-users'
export { deleteUserById } from './admin/users/delete-user-by-id'
export { findUserById } from './admin/users/find-user-by-id'
export { updateUserById } from './admin/users/update-user-by-id'

export { getUserAddressById } from './admin/address/get-user-address-by-id'

export { getUserOrdersById } from './admin/orders/get-user-orders-by-id'
export { getAllUsersOrders } from './admin/orders/get-all-users-orders'
export { deleteManyOrders } from './admin/orders/delete-many-orders'
export { deleteOrderById } from './admin/orders/delete-order-by-id'
export { addOrUpdateOrderTrackingCode } from './admin/orders/add-or-update-order-tracking-code'
export { deleteOrderTrackingById } from './admin/orders/delete-order-tracking-by-id'
export { changeOrderStatus } from './admin/orders/change-order-status'
export { getAllProductsByAdmin } from './admin/products/get-all-products-by-admin'
export { deleteManyProducts } from './admin/products/delete-many-products'
export { deleteProductById } from './admin/products/delete-product-by-id'
export { updateProductById } from './admin/products/update-product-by-id'
export { addProductsDiscount } from './admin/products/add-products-discount'
export { createProductImage } from './admin/products/create-product-image'
export { deleteProductImage } from './admin/products/delete-product-image'

export { updateUser } from './user/update-user'
export { getUserById } from './user/get-user-by-id'
export { changeUserPassword } from './user/change-user-password'
export { deleteUserAccount } from './user/delete-user-account'

export { placeOrder } from './order/place-order'
export { getOrdersByUser } from './order/get-order-by-user'
export { getOrderById } from './order/get-order-by-id'

export { getRefPaycoData } from './epayco/get-ref-epayco'
export { saveRefEpayco } from './epayco/save-ref-epayco'

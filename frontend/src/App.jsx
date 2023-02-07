import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { Fragment, useEffect, useMemo } from "react";
import { Home } from "./pages/Home";
import Seller from "./pages/seller/Seller";
import Item from "./pages/item/Item";
import Cart from "./pages/member/Cart";
import Navbar from "./components/shared/Navbar";

import RequireAuth from "./components/auth/RequireAuth";
import { onReissue } from "./api/authFetch";
import { useNavigate } from "react-router-dom";
import Profile from "./pages/Profile";
import OrderInfo from "./pages/OrderInfo";
import MyOrders from "./pages/member/MyOrders";
import CategoryItemList from "./pages/CategoryItemList";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import SellerSignUp from "./pages/seller/SellerSignUp";
import CreateItem from "./pages/item/CreateItem";
import UpdateItem from "./pages/item/UpdateItem";
import CreateReview from "./pages/CreateReview";
import UpdateMember from "./pages/member/UpdateMember";
import MyProfile from "./pages/member/MyProfile";
import MySellerProfile from "./pages/seller/MySellerProfile";
import CategoryList from "./pages/category/CategoryList";
import UpdateCategory from "./pages/category/UpdateCategory";
import MySellerOrders from "./pages/seller/MySellerOrders";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    async function refreshThenReissue() {
      onReissue();
    }
    refreshThenReissue();

    navigate("/");
  }, []);

  return (
    <Fragment>
      <Navbar />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/items/:itemId" element={<Item />} />
          <Route path="/category/:categoryId" element={<CategoryItemList />} />

          {/* protected routes  element={<RequireAuth />}   */}
          <Route path="/" element={<RequireAuth />}>
            <Route path="sellers/:sellerId" element={<Seller />} />
            <Route path="sellers/me" element={<MySellerProfile />} />
            <Route path="sellers/me/orders" element={<MySellerOrders />} />
            <Route path="sellers/signup" element={<SellerSignUp />} />
            <Route path="items/create" element={<CreateItem />} />
            <Route path="items/:itemId/update" element={<UpdateItem />} />
            <Route
              path="items/:itemId/reviews/create"
              element={<CreateReview />}
            />
            <Route path="members/:memberId" element={<Profile />} />
            <Route path="members/me" element={<MyProfile />} />
            <Route path="members/me/updateprofile" element={<UpdateMember />} />
            <Route path="members/cart" element={<Cart />} />
            <Route path="members/orders" element={<MyOrders />} />
            <Route path="orders/:orderId" element={<OrderInfo />} />

            <Route path="admin/category" element={<CategoryList />} />
            <Route
              path="admin/category/:categoryId"
              element={<UpdateCategory />}
            />
          </Route>
        </Routes>
      </Container>
    </Fragment>
  );
}

export default App;

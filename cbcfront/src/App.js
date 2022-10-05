import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import jwtDecode from "jwt-decode";

import "./App.css";

// import { lazy } from "react";
// const Header = lazy(() => import("./components/common/header/Header"));

import Header from "./components/common/header/Header";
import Homepage from "./components/homepage/Homepage";
import Footer from "./components/common/footer/Footer";
import LoginPage from "./components/common/LoginPage";
import ForgotPassword from "./components/common/ForgotPassword";
import CommuterSignup from "./components/commuter/signUp/SignUp";
import CommuterPortal from "./components/commuter/portal/Index";
import AdminDesk from "./components/admin/Index";
import Account from "./components/common/account/Index";
import SignOut from "./components/common/signOut/SignOut";
import FourZeroFour from "./components/common/FourZeroFour";

import userModel from "./globalState/user";
import checkLocalStorage from "./utils/checkLocalStorage";
import { useSessionStorage } from "./utils/browserStore";
import MyContext from "./context/Flag";
import Announcement from "./components/homepage/announcement/Index";
import Gallery from "./components/homepage/gallery/Index";
import ResetPassword from "./components/common/ResetPassword";
import ResendToken from "./components/common/ResendToken";
import ConfirmToken from "./components/common/ConfirmToken";

function App() {
  document.title = "Home | CBC";

  const { setCurrentUser, signOut } = userModel;
  const { decoded, expired } = checkLocalStorage(jwtDecode);

  setCurrentUser(decoded);

  if (expired) {
    signOut(userModel);
  }

  const [user, setUser] = useSessionStorage("user", userModel.user);
  const [userDetails, setUserDetails] = useSessionStorage(
    "userDetails",
    userModel.userDetails
  );

  const isCommuter = user.isAuthenticated && /^c/i.test(userDetails.type);
  const isAdmin = user.isAuthenticated && /^a/i.test(userDetails.type);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MyContext>
                <Header />
                <Outlet />
                <Footer />
              </MyContext>
            }
          >
            <Route index element={<Homepage />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="ForgotPassword" element={<ForgotPassword />} />
            <Route path="ResetPassword" element={<ResetPassword />} />
            <Route path="ResendToken" element={<ResendToken />} />
            <Route path="ConfirmToken" element={<ConfirmToken />} />
            <Route path="signup" element={<CommuterSignup />} />
            <Route path="portal">
              <Route index element={<CommuterPortal />} />
              <Route path=":path" element={<CommuterPortal />} />
            </Route>
            <Route
              path="admin"
              element={
                <>
                  {isAdmin ? (
                    <Outlet />
                  ) : isCommuter ? (
                    <Navigate to="/portal" replace={true} />
                  ) : (
                    <Navigate to="/login" replace={true} />
                  )}
                </>
              }
            >
              <Route index element={<AdminDesk />} />
              <Route path=":path">
                <Route index element={<AdminDesk />} />
                <Route path=":argA" element={<AdminDesk />}>
                  <Route path=":argB" element={<AdminDesk />}></Route>
                </Route>
              </Route>
            </Route>
            <Route path="/account">
              <Route index element={<Account />} />
              <Route path=":path" element={<Account />} />
            </Route>
            <Route path="/logout" element={<SignOut />} />
            <Route path="/Announcements" element={<Announcement />} />
            <Route path="/Gallery" element={<Gallery />} />
            <Route path="/*" element={<FourZeroFour />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;

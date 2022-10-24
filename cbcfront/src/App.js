import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";
import jwtDecode from "jwt-decode";

import "./App.css";

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
import userModel from "./globalState/user";
import checkLocalStorage from "./utils/checkLocalStorage";
import { useSessionStorage } from "./utils/browserStore";
import MyContext from "./context/Flag";
import ResetPassword from "./components/common/ResetPassword";
import ResendToken from "./components/common/ResendToken";
import ConfirmToken from "./components/common/ConfirmToken";
import { ErrorBoundary } from ".";
import ParentalPath from "./components/common/Index";

function App() {
  const { setCurrentUser, signOut } = userModel;
  const { decoded, expired } = checkLocalStorage(jwtDecode);

  setCurrentUser(decoded);

  if (expired) {
    signOut(userModel);
  }

  const [user] = useSessionStorage("user", userModel.user);
  const [userDetails] = useSessionStorage("userDetails", userModel.userDetails);

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
                <ErrorBoundary>
                  <Outlet />
                </ErrorBoundary>
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
              <Route path=":path">
                <Route index element={<CommuterPortal />} />
                <Route path=":argA" element={<CommuterPortal />}>
                  <Route path=":argB" element={<CommuterPortal />}></Route>
                </Route>
              </Route>
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
            <Route path="/:other" element={<ParentalPath />}>
              <Route path=":argA" element={<ParentalPath />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
export default App;

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import  Main  from "../Main/Main";
import AppHeader from "../AppHeader/AppHeader";
import { getIngredients } from '../../utils/api';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "../../pages/login/login";
import Profile from "../../pages/profile/profile";
import Registration from "../../pages/registration/registration";
import PasswordForgot from "../../pages/forgot-password/forgot-password";
import PasswordReset from "../../pages/reset-password/reset-password";
import UserInfo from "../../pages/user/user";
import IngredientsPage from "../../pages/ingredients/ingredients";
import ErrorPage from "../../pages/not-found/not-found";
import ProtectedRoute from '../protected-element/protected-element';
import LogoutRoute from '../logout-route/logout-route';

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <>     
    <BrowserRouter>
    <AppHeader />
    <Routes>
          <Route path="/" element={<Main />}>
            <Route path="/ingredients/:id" element={<IngredientsPage />}/>
          </Route>
          <Route path="/login" element={<LogoutRoute element={<Login />} />}/>
          <Route path="/register" element={<LogoutRoute element={<Registration />} />}/>
          <Route path="/forgot-password" element={<LogoutRoute element={<PasswordForgot />} />}/>
          <Route path="/reset-password" element={<LogoutRoute element={<PasswordReset />} />}/>
          <Route path="/profile/*" element={<ProtectedRoute element={<Profile />}/>}>
            <Route path="" element={<UserInfo />}/>
          </Route>
          <Route path="*" element={<ErrorPage />}></Route>
        </Routes>
    </BrowserRouter>
    </>
  );
};

export default App;


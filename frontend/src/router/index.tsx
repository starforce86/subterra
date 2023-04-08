import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AboutUsPage } from '../pages/about-us';
import { ContactUsPage } from '../pages/contact-us';
import { HomePage } from '../pages/home';
import { IndustryNewsPage } from '../pages/industry-news';
import { LandOwnerPage } from '../pages/land-owner';
import { LandOwnerRegistrationPage } from '../pages/land-owner-registration';
import { LearnMorePage } from '../pages/learn-more';
import { LoginPage } from '../pages/login';
import { ServiceCompanyPage } from '../pages/service-company';
import { ServiceCompanyRegistrationPage } from '../pages/service-company-registration';
import { setDimensions } from '../store/slices/app.slice';
import { NoSessionRoutes, ProtectedRoutes } from './route-security';

const getWindowDimensions = () => {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
};

export const RouterProvider: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const handleResize = () => {
      dispatch(setDimensions(getWindowDimensions()));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/learn-more" element={<LearnMorePage />} />
        <Route path="/industry-news" element={<IndustryNewsPage />} />
        <Route element={<NoSessionRoutes />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/service-company/registration"
            element={<ServiceCompanyRegistrationPage />}
          />
          <Route
            path="/land-owner/registration"
            element={<LandOwnerRegistrationPage />}
          />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="/land-owner" element={<LandOwnerPage />} />
          <Route path="/service-company" element={<ServiceCompanyPage />} />
          <Route path="*" element={<div>Not Found</div>} />
        </Route>
      </Routes>
    </Router>
  );
};

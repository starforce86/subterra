import React from 'react';
import { Provider } from 'react-redux';
import { RouterProvider } from './router';
import { store } from './store';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const App: React.FC = () => {
  return (
    <Provider store={store}>
      <RouterProvider />
      <ToastContainer position="top-right" autoClose={3000} closeOnClick />
    </Provider>
  );
};

export default App;

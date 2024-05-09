import React, { createContext, useContext, useState } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.scss';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import About from './Components/About/About';
import Profile from './Components/Profile/Profile';
import Lessons from './Components/Lessons/Lessons';
import reportWebVitals from './reportWebVitals';

export const MessageContext = createContext<{
  message: string | undefined;
  setMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}>({
  message: undefined,
  setMessage: () => {},
});

export const MessageProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [message, setMessage] = useState<string | undefined>(undefined);

  return (
    <MessageContext.Provider value={{ message, setMessage }}>
      {children}
    </MessageContext.Provider>
  );
};

export const useMessage = () => useContext(MessageContext);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <MessageProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home></Home>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/about' element={<About></About>}></Route>
            <Route path='/profile' element={<Profile></Profile>}></Route>
            <Route path='/profile/:userId' element={<Profile></Profile>}></Route>
            <Route path='/lessons' element={<Lessons></Lessons>}></Route>
          </Routes>
        </BrowserRouter>
      </MessageProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import TodoPage from './TodoPage/TodoPage';
import NavigationBar from './Shared/NavigationBar';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <div className='w-screen h-screen bg-whitetext-white flex'>
        <NavigationBar />

        <div className='flex-grow'>
          <Routes>
            <Route path="/todo" element={<TodoPage />}>
              <Route path=":groupID" element={<TodoPage /> } />
            </Route>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

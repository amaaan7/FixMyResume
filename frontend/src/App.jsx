import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

// import our AuthContext and Navbar
import { AuthContext, AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';

// import pages
import Landing from './pages/Landing';

// to prevent the app from crashing while we build, these are temporary dummy pages.

const AnalyzePage = () => <div className='p-10 text-white  text-enter  text-xl mt-10'> Analyze Page(Coming Soon)</div>

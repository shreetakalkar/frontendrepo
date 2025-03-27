// // import './chartConfig'; // Ensure Chart.js is registered
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { useState, useEffect } from 'react';
// // import Header from './components/Header';
// // import Sidebar from './components/Sidebar';
// // import Home from './components/Home';
// // import Inventory from './components/Inventory';
// // import { SidebarProvider } from './components/Sidebar/SidebarContext';
// // import Order from './components/Order';
// // import Settings from './components/Settings';
// // import Plans from './components/Plans';
// // import SignIn from './components/SignIn';
// // import Webform from './components/Webform';
// // import OTPVerification from './components/OTPVerification'; // Import the OTPVerification component
// // import ScrollToTop from './components/ScrollToTop';
// // import Register from './components/Register'
// // function App() {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);

// //   // Simulate checking authentication (e.g., token in localStorage)
// //   useEffect(() => {
// //     const token = localStorage.getItem('authToken');
// //     setIsAuthenticated(!!token);
// //   }, []);

// //   return (
// //     <SidebarProvider>
// //       <Router>
// //         <ScrollToTop />
// //         <Routes>
// //           {/* Public Routes */}
// //           <Route path="/signup" element={<Register />} />
// //           <Route path="/otp-verification" element={<OTPVerification />} />
// //           <Route path="/login" element={<SignIn />} />

// //           {/* Protected Routes */}
// //           {isAuthenticated ? (
// //             <>
// //               <Route
// //                 path="/*"
// //                 element={
// //                   <>
// //                     <Header />
// //                     <Sidebar />
// //                     <Routes>
// //                       <Route path="/" element={<Home />} />
// //                       <Route path="/inventory" element={<Inventory />} />
// //                       <Route path="/order" element={<Order />} />
// //                       <Route path="/settings" element={<Settings />} />
// //                       <Route path="/plans" element={<Plans />} />
// //                     </Routes>
// //                   </>
// //                 }
// //               />
// //             </>
// //           ) : (
// //             <Route path="*" element={<Navigate to="/login" />} />
// //           )}
// //         </Routes>
// //       </Router>
// //     </SidebarProvider>
// //   );
// // }

// // export default App;


// // import './chartConfig'; // Ensure Chart.js is registered
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { useState, useEffect } from 'react';
// // import Header from './components/Header';
// // import Sidebar from './components/Sidebar';
// // import Home from './components/Home';
// // import Inventory from './components/Inventory';
// // import { SidebarProvider } from './components/Sidebar/SidebarContext';
// // import Order from './components/Order';
// // import Settings from './components/Settings';
// // import Plans from './components/Plans';
// // import SignIn from './components/SignIn';
// // import Webform from './components/Webform';
// // import OTPVerification from './components/OTPVerification';
// // import ScrollToTop from './components/ScrollToTop';
// // import Register from './components/Register';
// // import ShopifySync from './components/ShopifySync/ShopifySync';

// // function App() {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [isSyncComplete, setIsSyncComplete] = useState(false);

// //   useEffect(() => {
// //     const token = localStorage.getItem('authToken');
// //     const syncStatus = localStorage.getItem('syncComplete');
// //     setIsAuthenticated(!!token);
// //     setIsSyncComplete(!!syncStatus);
// //   }, []);

// //   return (
// //     <SidebarProvider>
// //       <Router>
// //         <ScrollToTop />
// //         <Routes>
// //           {/* Public Routes */}
// //           <Route path="/signup" element={<Register />} />
// //           <Route path="/otp-verification" element={<OTPVerification />} />
// //           <Route path="/login" element={<SignIn />} />

// //           {/* Protected Routes */}
// //           {isAuthenticated ? (
// //             <>
// //               <Route
// //                 path="/*"
// //                 element={
// //                   <>
// //                     {isSyncComplete ? (
// //                       <>
// //                         <Header />
// //                         <Sidebar />
// //                         <Routes>
// //                           <Route path="/" element={<Home />} />
// //                           <Route path="/inventory" element={<Inventory />} />
// //                           <Route path="/order" element={<Order />} />
// //                           <Route path="/settings" element={<Settings />} />
// //                           <Route path="/plans" element={<Plans />} />
// //                           <Route path="/webform" element={<Webform />} />
// //                         </Routes>
// //                       </>
// //                     ) : (
// //                       <Routes>
// //                         <Route path="/" element={<ShopifySync />} />
// //                         <Route path="*" element={<Navigate to="/" />} />
// //                       </Routes>
// //                     )}
// //                   </>
// //                 }
// //               />
// //             </>
// //           ) : (
// //             <Route path="*" element={<Navigate to="/login" />} />
// //           )}
// //         </Routes>
// //       </Router>
// //     </SidebarProvider>
// //   );
// // }

// // export default App;



// // import './chartConfig'; // Ensure Chart.js is registered
// // import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// // import { useState, useEffect } from 'react';
// // import Header from './components/Header';
// // import Sidebar from './components/Sidebar';
// // import Home from './components/Home';
// // import Inventory from './components/Inventory';
// // import { SidebarProvider } from './components/Sidebar/SidebarContext';
// // import Order from './components/Order';
// // import Settings from './components/Settings';
// // import Plans from './components/Plans';
// // import SignIn from './components/SignIn';
// // import Webform from './components/Webform';
// // import OTPVerification from './components/OTPVerification';
// // import ScrollToTop from './components/ScrollToTop';
// // import Register from './components/Register';
// // import ShopifySync from './components/ShopifySync/ShopifySync';
// // import ShopifyProducts from './components/ShopifySync/ShopifyProducts';

// // function App() {
// //   const [isAuthenticated, setIsAuthenticated] = useState(false);
// //   const [isSyncComplete, setIsSyncComplete] = useState(false);

// //   useEffect(() => {
// //     const token = localStorage.getItem('authToken');
// //     const syncStatus = localStorage.getItem('syncComplete');
// //     setIsAuthenticated(!!token);
// //     setIsSyncComplete(!!syncStatus);
// //   }, []);

// //   return (
// //     <SidebarProvider>
// //       <Router>
// //         <ScrollToTop />
// //         <Routes>
// //           {/* Public Routes */}
// //           <Route path="/signup" element={<Register />} />
// //           <Route path="/otp-verification" element={<OTPVerification />} />
// //           <Route path="/login" element={<SignIn />} />

// //           {/* Protected Routes */}
// //           {isAuthenticated ? (
// //             <>
// //               <Route
// //                 path="/*"
// //                 element={
// //                   <>
// //                     {isSyncComplete ? (
// //                       <>
// //                         <Header />
// //                         <Sidebar />
// //                         <Routes>
// //                           <Route path="/" element={<Home />} />
// //                           <Route path="/inventory" element={<Inventory />} />
// //                           <Route path="/order" element={<Order />} />
// //                           <Route path="/settings" element={<Settings />} />
// //                           <Route path="/plans" element={<Plans />} />
// //                           <Route path="/webform" element={<Webform />} />
// //                           <Route path="/shopify-products" element={<ShopifyProducts />} />
// //                         </Routes>
// //                       </>
// //                     ) : (
// //                       <Routes>
// //                         <Route path="/" element={<ShopifySync />} />
// //                         <Route path="*" element={<Navigate to="/" />} />
// //                       </Routes>
// //                     )}
// //                   </>
// //                 }
// //               />
// //             </>
// //           ) : (
// //             <Route path="*" element={<Navigate to="/login" />} />
// //           )}
// //         </Routes>
// //       </Router>
// //     </SidebarProvider>
// //   );
// // }

// // export default App;




// import './chartConfig';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import Home from './components/Home';
// import Inventory from './components/Inventory';
// import { SidebarProvider } from './components/Sidebar/SidebarContext';
// import Order from './components/Order';
// import Settings from './components/Settings';
// import Plans from './components/Plans';
// import SignIn from './components/SignIn';
// import Webform from './components/Webform';
// import OTPVerification from './components/OTPVerification';
// import ScrollToTop from './components/ScrollToTop';
// import Register from './components/Register';
// import ShopifySync from './components/ShopifySync/ShopifySync';
// import ShopifyProducts from './components/ShopifySync/ShopifyProducts';


// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isSyncComplete, setIsSyncComplete] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const syncStatus = localStorage.getItem('syncComplete');
//     setIsAuthenticated(!!token);
//     setIsSyncComplete(!!syncStatus);
//   }, []);

//   // Layout component to wrap authenticated routes
//   const AuthenticatedLayout = ({ children }) => (
//     <>
//       <Header />
//       <Sidebar />
//       {children}
//     </>
//   );

//   return (
//     <SidebarProvider>
//       <Router>
//         <ScrollToTop />
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/signup" element={<Register />} />
//           <Route path="/otp-verification" element={<OTPVerification />} />
//           <Route 
//             path="/login" 
//             element={
//               !isAuthenticated ? (
//                 <SignIn setIsAuthenticated={setIsAuthenticated} />
//               ) : (
//                 <Navigate to="/shopify-sync" />
//               )
//             } 
//           />

//           {/* Protected Routes */}
//           {isAuthenticated ? (
//             <>
//               {/* Sync Route */}
//               <Route
//                 path="/shopify-sync"
//                 element={
//                   !isSyncComplete ? (
//                     <ShopifySync />
//                   ) : (
//                     <Navigate to="/" />
//                   )
//                 }
//               />

//               {/* Main Application Routes */}
//               <Route
//                 path="/*"
//                 element={
//                   !isSyncComplete ? (
//                     <Navigate to="/shopify-sync" replace />
//                   ) : (
//                     <AuthenticatedLayout>
//                       <Routes>
//                         <Route path="/" element={<Home />} />
//                         <Route path="/inventory" element={<Inventory />} />
//                         <Route path="/order" element={<Order />} />
//                         <Route path="/settings" element={<Settings />} />
//                         <Route path="/plans" element={<Plans />} />
//                         <Route path="/webform" element={<Webform />} />
//                         <Route path="/shopify-products" element={<ShopifyProducts />} />
//                       </Routes>
//                     </AuthenticatedLayout>
//                   )
//                 }
//               />
//             </>
//           ) : (
//             // Redirect to login if not authenticated
//             <Route path="*" element={<Navigate to="/login" replace />} />
//           )}
//         </Routes>
//       </Router>
//     </SidebarProvider>
//   );
// }

// export default App;


// import './chartConfig';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import Home from './components/Home';
// import Inventory from './components/Inventory';
// import { SidebarProvider } from './components/Sidebar/SidebarContext';
// import Order from './components/Order';
// import Settings from './components/Settings';
// import Plans from './components/Plans';
// import SignIn from './components/SignIn';
// import Webform from './components/Webform';
// import OTPVerification from './components/OTPVerification';
// import ScrollToTop from './components/ScrollToTop';
// import Register from './components/Register';
// import ShopifySync from './components/ShopifySync/ShopifySync';
// import ShopifyProducts from './components/ShopifySync/ShopifyProducts';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isSyncComplete, setIsSyncComplete] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const syncStatus = localStorage.getItem('syncComplete');

//     console.log("Token:", token);
//     console.log("Sync Complete Status:", syncStatus);

//     setIsAuthenticated(!!token);
//     setIsSyncComplete(syncStatus === 'true');
//   }, []);

//   // Layout for authenticated routes
//   const AuthenticatedLayout = ({ children }) => (
//     <>
//       <Header />
//       <Sidebar />
//       {children}
//     </>
//   );

//   return (
//     <SidebarProvider>
//       <Router>
//         <ScrollToTop />
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/signup" element={<Register />} />
//           <Route path="/otp-verification" element={<OTPVerification />} />
//           <Route
//             path="/login"
//             element={!isAuthenticated ? <SignIn setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/shopify-sync" />}
//           />

//           {/* Shopify Sync (Accessible only after login but before sync completion) */}
//           <Route
//             path="/shopify-sync"
//             element={isAuthenticated ? (!isSyncComplete ? <ShopifySync /> : <Navigate to="/" />) : <Navigate to="/login" />}
//           />

//           {/* Main Application Routes */}
//           {isAuthenticated && isSyncComplete ? (
//             <>
//               <Route path="/" element={<AuthenticatedLayout><Home /></AuthenticatedLayout>} />
//               <Route path="/inventory" element={<AuthenticatedLayout><Inventory /></AuthenticatedLayout>} />
//               <Route path="/order" element={<AuthenticatedLayout><Order /></AuthenticatedLayout>} />
//               <Route path="/settings" element={<AuthenticatedLayout><Settings /></AuthenticatedLayout>} />
//               <Route path="/plans" element={<AuthenticatedLayout><Plans /></AuthenticatedLayout>} />
//               <Route path="/webform" element={<AuthenticatedLayout><Webform /></AuthenticatedLayout>} />
//               <Route path="/shopify-products" element={<AuthenticatedLayout><ShopifyProducts /></AuthenticatedLayout>} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to={isAuthenticated && isSyncComplete ? "/" : "/shopify-sync"} />} />
//           )}
//         </Routes>
//       </Router>
//     </SidebarProvider>
//   );
// }

// export default App;


// import './chartConfig';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
// import Header from './components/Header';
// import Sidebar from './components/Sidebar';
// import Home from './components/Home';
// import Inventory from './components/Inventory';
// import { SidebarProvider } from './components/Sidebar/SidebarContext';
// import Order from './components/Order';
// import Settings from './components/Settings';
// import Request from './components/Request';
// import Plans from './components/Plans';
// import SignIn from './components/SignIn';
// import Webform from './components/Webform';
// import OTPVerification from './components/OTPVerification';
// import ScrollToTop from './components/ScrollToTop';
// import Register from './components/Register';
// import ShopifySync from './components/ShopifySync/ShopifySync';
// import ShopifyProducts from './components/ShopifySync/ShopifyProducts';

// function App() {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isSyncComplete, setIsSyncComplete] = useState(false);
//   const [isLoading, setIsLoading] = useState(true); // Add a loading state

//   useEffect(() => {
//     const token = localStorage.getItem('authToken');
//     const syncStatus = localStorage.getItem('syncComplete');

//     console.log("Token:", token);
//     console.log("Sync Complete Status:", syncStatus);

//     setIsAuthenticated(!!token);
//     setIsSyncComplete(syncStatus === 'true');
//     setIsLoading(false); // Set loading to false after checking auth and sync status
//   }, []);

//   // Layout for authenticated routes
//   const AuthenticatedLayout = ({ children }) => (
//     <>
//       <Header />
//       <Sidebar />
//       {children}
//     </>
//   );

//   console.log("isAuthenticated:", isAuthenticated);
//   console.log("isSyncComplete:", isSyncComplete);

//   if (isLoading) {
//     return <div>Loading...</div>; // Show a loading indicator while checking auth and sync status
//   }

//   return (
//     <SidebarProvider>
//       <Router>
//         <ScrollToTop />
//         <Routes>
//           {/* Public Routes */}
//           <Route path="/signup" element={<Register />} />
//           <Route path="/otp-verification" element={<OTPVerification />} />
//           <Route
//             path="/login"
//             element={!isAuthenticated ? <SignIn setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/shopify-sync" />}
//           />

//           {/* Shopify Sync (Accessible only after login but before sync completion) */}
//           <Route
//             path="/shopify-sync"
//             element={isAuthenticated ? (!isSyncComplete ? <ShopifySync /> : <Navigate to="/" />) : <Navigate to="/login" />}
//           />

//           {/* Main Application Routes */}
//           {isAuthenticated && isSyncComplete ? (
//             <>
//               <Route path="/" element={<AuthenticatedLayout><Home /></AuthenticatedLayout>} />
//               <Route path="/inventory" element={<AuthenticatedLayout><Inventory /></AuthenticatedLayout>} />
//               <Route path="/order" element={<AuthenticatedLayout><Order /></AuthenticatedLayout>} />
//               <Route path="/settings" element={<AuthenticatedLayout><Settings /></AuthenticatedLayout>} />
//               <Route path="/request" element={<AuthenticatedLayout><Request /></AuthenticatedLayout>} />
//               <Route path="/plans" element={<AuthenticatedLayout><Plans /></AuthenticatedLayout>} />
//               <Route path="/webform" element={<AuthenticatedLayout><Webform /></AuthenticatedLayout>} />
//               <Route path="/shopify-products" element={<AuthenticatedLayout><ShopifyProducts /></AuthenticatedLayout>} />
//             </>
//           ) : (
//             <Route path="*" element={<Navigate to={isAuthenticated && isSyncComplete ? "/" : "/shopify-sync"} />} />
//           )}
//         </Routes>
//       </Router>
//     </SidebarProvider>
//   );
// }

// export default App;


import './chartConfig';
import { Routes, Route, Navigate } from 'react-router-dom'; 
import { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Inventory from './components/Inventory';
import { SidebarProvider } from './components/Sidebar/SidebarContext';
import Orders from "./components/Order/Orders"; 
import Settings from './components/Settings';
import Request from './components/Request';
import Plans from './components/Plans';
import SignIn from './components/SignIn';
import ForgotPassword from './components/SignIn/ForgotPassword';
import OTPForReset from './components/SignIn/OTPForReset';
import Webform from './components/Webform';
import OTPVerification from './components/OTPVerification';
import ScrollToTop from './components/ScrollToTop';
import Register from './components/Register';
import ShopifySync from './components/ShopifySync/ShopifySync';
import ShopifyProducts from './components/ShopifySync/ShopifyProducts';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isSyncComplete, setIsSyncComplete] = useState(null);

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('authToken');
      const syncStatus = localStorage.getItem('syncComplete');

      setIsAuthenticated(!!token);
      setIsSyncComplete(syncStatus === 'true');
    };

    checkAuth();
    window.addEventListener('storage', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Layout for authenticated users
  const AuthenticatedLayout = ({ children }) => (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  );

  // Memoize routes to prevent unnecessary re-renders
  const routes = useMemo(() => {
    if (isAuthenticated === null || isSyncComplete === null) return null; 

    if (!isAuthenticated) {
      return (
        <Routes>
          <Route path="/signup" element={<Register />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/login" element={<SignIn setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-reset" element={<OTPForReset />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      );
    }

    if (!isSyncComplete) {
      return (
        <Routes>
          <Route path="/shopify-sync" element={<ShopifySync />} />
          <Route path="*" element={<Navigate to="/shopify-sync" replace />} />
        </Routes>
      );
    }

    return (
      <Routes>
        <Route path="/" element={<AuthenticatedLayout><Home /></AuthenticatedLayout>} />
        <Route path="/inventory" element={<AuthenticatedLayout><Inventory /></AuthenticatedLayout>} />
        <Route path="/order/*" element={<AuthenticatedLayout><Orders /></AuthenticatedLayout>} />
        <Route path="/settings" element={<AuthenticatedLayout><Settings /></AuthenticatedLayout>} />
        <Route path="/request" element={<AuthenticatedLayout><Request /></AuthenticatedLayout>} />
        <Route path="/plans" element={<AuthenticatedLayout><Plans /></AuthenticatedLayout>} />
        <Route path="/webform" element={<AuthenticatedLayout><Webform /></AuthenticatedLayout>} />
        <Route path="/shopify-products" element={<AuthenticatedLayout><ShopifyProducts /></AuthenticatedLayout>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }, [isAuthenticated, isSyncComplete]);

  if (routes === null) return null; 

  return (
    <SidebarProvider>
      <ScrollToTop />
      {routes}
    </SidebarProvider>
  );
}

export default App;

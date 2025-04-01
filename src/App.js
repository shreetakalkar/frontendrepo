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
import { useEffect } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Inventory from './components/Inventory';
import { SidebarProvider } from './components/Sidebar/SidebarContext';
import Orders from "./components/Order/Orders"; 
import Settings from './components/Settings';
import Request from './components/Request';
import Plans from './components/Plans';
import Webform from './components/Webform';
import ShopifySync from './components/ShopifySync/ShopifySync';
import ShopifyProducts from './components/ShopifySync/ShopifyProducts';
import ScrollToTop from './components/ScrollToTop';

function App() {
  // Redirect to /inventory on load
  useEffect(() => {
    if (window.location.pathname === "/") {
      window.location.replace("/inventory");
    }
  }, []);

  // Layout for pages
  const MainLayout = ({ children }) => (
    <>
      <Header />
      <Sidebar />
      {children}
    </>
  );

  return (
    <SidebarProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/inventory" element={<MainLayout><Inventory /></MainLayout>} />
        <Route path="/order/*" element={<MainLayout><Orders /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
        <Route path="/request" element={<MainLayout><Request /></MainLayout>} />
        <Route path="/plans" element={<MainLayout><Plans /></MainLayout>} />
        <Route path="/webform" element={<MainLayout><Webform /></MainLayout>} />
        <Route path="/shopify-sync" element={<MainLayout><ShopifySync /></MainLayout>} />
        <Route path="/shopify-products" element={<MainLayout><ShopifyProducts /></MainLayout>} />
        <Route path="/" element={<Navigate to="/inventory" replace />} />
        <Route path="*" element={<Navigate to="/inventory" replace />} />
      </Routes>
    </SidebarProvider>
  );
}

export default App;

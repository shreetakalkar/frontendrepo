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
  // You can remove this useEffect if you're handling the redirect in the Routes
  // useEffect(() => {
  //   if (window.location.pathname === "/") {
  //     window.location.replace("/shopify-sync");
  //   }
  // }, []);

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
        <Route path="/shopify-sync" element={<MainLayout><ShopifySync /></MainLayout>} />
        <Route path="/inventory" element={<MainLayout><Inventory /></MainLayout>} />
        <Route path="/order/*" element={<MainLayout><Orders /></MainLayout>} />
        <Route path="/settings" element={<MainLayout><Settings /></MainLayout>} />
        <Route path="/request" element={<MainLayout><Request /></MainLayout>} />
        <Route path="/plans" element={<MainLayout><Plans /></MainLayout>} />
        <Route path="/webform" element={<MainLayout><Webform /></MainLayout>} />
        <Route path="/shopify-products" element={<MainLayout><ShopifyProducts /></MainLayout>} />
        <Route path="/" element={<Navigate to="/shopify-sync" replace />} />
        <Route path="*" element={<Navigate to="/shopify-sync" replace />} />
      </Routes>
    </SidebarProvider>
  );
}

export default App;
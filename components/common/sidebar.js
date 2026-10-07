
// // components/common/Sidebar.jsx
// 'use client';

// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { usePathname, useRouter } from 'next/navigation'; 
// import { 
//   HiOutlineChevronDown, HiOutlineChevronLeft, HiOutlineChevronRight, 
//   HiOutlineChevronUp, HiOutlineClipboardList, 
//   HiOutlineCog, HiOutlineCube, HiOutlineCurrencyDollar, 
//   HiOutlineDocumentText, HiOutlineDownload, 
//   HiOutlineHome, HiOutlineLogout, 
//   HiOutlinePlus, HiOutlineSearch, 
//   HiOutlineTruck, 
//   HiOutlineUserGroup, HiOutlineUsers, HiTruck, HiUsers,
//   HiChevronDoubleLeft, HiChevronDoubleRight, HiOutlineBell,
//   HiCube, HiHome, HiCurrencyDollar
// } from 'react-icons/hi';
// import { MdDashboard, MdWarehouse, MdLocalShipping, MdAttachMoney } from 'react-icons/md';
// import { BsPeople, BsClipboardData } from 'react-icons/bs';
// import Image from 'next/image'; 
// import { logout as authLogout, getAuthToken, getUserDetails } from '@/utils/SessionHelper';

// // Loading Spinner Component
// const LoadingSpinner = () => (
//   <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
//     <div className="relative">
//       <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
//       <div className="w-16 h-16 border-4 border-[#041367] rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
//     </div>
//   </div>
// );

// // Menu Skeleton Loader
// const MenuSkeleton = () => (
//   <div className="px-4 py-2 space-y-2">
//     {[1, 2, 3, 4, 5].map((i) => (
//       <div key={i} className="flex items-center space-x-3 px-3 py-2.5">
//         <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
//         <div className="flex-1">
//           <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
//         </div>
//       </div>
//     ))}
//   </div>
// );


// // Logo Component - Updated with image logo
// const Logo = ({ collapsed }) => (
//   <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-4 py-6 border-b border-gray-100`}>
//     <Link href="/dashboard" className="flex items-center gap-3 group">
//       {/* Logo Image */}
//       <div className="relative">
//         <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden bg-white">
//           <Image 
//             src="/logo.png" 
//             alt="Thai Shipping" 
//             width={40}
//             height={40}
//             className="object-contain w-full h-full"
//           />
//         </div>
//       </div>
      
//       {/* Company Name - Only show when not collapsed */}
//       {!collapsed && (
//         <div className="flex flex-col">
//           <h1 className="text-base font-bold text-gray-800">
//             Thai <span className="text-[#041367]">Shipping</span>
//           </h1>
//           <p className="text-[10px] text-gray-500 font-medium tracking-wide">Thailand</p>
//         </div>
//       )}
//     </Link>
//   </div>
// );

// // Menu Items Configuration
// const menuItems = [
//   {
//     title: 'Dashboard',
//     path: '/dashboard',
//     icon: <MdDashboard className="w-5 h-5" />,
//     activeIcon: <MdDashboard className="w-5 h-5" />,
//     roles: ['admin', 'warehouse']
//   },
//   {
//   title: 'Footer Settings',
//   path: '/admin/footer-settings',
//   icon: <HiOutlineCog className="w-5 h-5" />,
//   roles: ['admin'],
// },
//   {
//     title: 'Users',
//     path: '/users/customers',
//     icon: <BsPeople className="w-5 h-5" />,
//     activeIcon: <BsPeople className="w-5 h-5" />, 
//     roles: ['admin'],
//     children: [
//       {
//         title: 'Customers',
//         path: '/users/customers',
//         icon: <HiOutlineUserGroup className="w-4 h-4" />,
//         roles: ['admin']
//       },
//       {
//         title: 'Add Staff',
//         path: '/users/create_staff',
//         icon: <HiOutlinePlus className="w-4 h-4" />,
//         roles: ['admin']
//       },
//     ],
//   },
//   {
//     title: 'Bookings',
//     path: '/Bookings/all_bookings',
//     icon: <BsClipboardData className="w-5 h-5" />,
//     activeIcon: <BsClipboardData className="w-5 h-5" />, 
//     roles: ['admin'],
//     children: [
//       {
//         title: 'All Bookings',
//         path: '/Bookings/all_bookings',
//         icon: <HiOutlineClipboardList className="w-4 h-4" />,
//         roles: ['admin']
//       },
//       {
//         title: 'New Booking',
//         path: '/Bookings/create_bookings',
//         icon: <HiOutlinePlus className="w-4 h-4" />,
//         roles: ['admin']
//       }, 
//       {
//         title: 'Manual Booking',
//         path: '/Bookings/create_manually',
//         icon: <HiOutlinePlus className="w-4 h-4" />,
//         roles: ['admin']
//       }, 
//     ],
//   },
  
//   {
//     title: 'Warehouse',
//     path: '/warehouse',
//     icon: <MdWarehouse className="w-5 h-5" />,
//     activeIcon: <MdWarehouse className="w-5 h-5" />,
//     roles: ['admin', 'warehouse'],
//     children: [
//       {
//         title: 'Warehouse Home',
//         path: '/warehouse',
//         icon: <HiOutlineDownload className="w-4 h-4" />,
//         roles: ['admin', 'warehouse']
//       },
//       {
//         title: 'Container Status',
//         path: '/warehouse/all-consolidation',
//         icon: <HiOutlineDownload className="w-4 h-4" />,
//         roles: ['admin', 'warehouse']
//       },
//     ],
//   },
//   {
//     title: 'All Shipments',
//     path: '/shippings/all_shipping',
//     icon: <MdLocalShipping className="w-5 h-5" />,
//     activeIcon: <MdLocalShipping className="w-5 h-5" />, 
//     roles: ['admin'],
//     children: [
//       {
//         title: 'Regular Shipments',
//         path: '/shippings/all_shipping',
//         icon: <HiOutlineClipboardList className="w-4 h-4" />,
//         roles: ['admin']
//       },
//       {
//         title: 'Manual Shipments',
//         path: '/shippings/manual-shipping',
//         icon: <HiOutlineClipboardList className="w-4 h-4" />,
//         roles: ['admin']
//       },
//     ],
//   },
//   {
//     title: 'Documents',
//     path: '/shippings/invoice',
//     icon: <HiOutlineSearch className="w-5 h-5" />,
//     activeIcon: <HiOutlineSearch className="w-5 h-5" />, 
//     roles: ['admin'],
//     children: [ 
//       {
//         title: 'Invoices',
//         path: '/shippings/invoice',
//         icon: <HiOutlineDocumentText className="w-4 h-4" />,
//         roles: ['admin']
//       },
//       {
//         title: 'Tracking',
//         path: '/all-tracking',
//         icon: <HiOutlineDocumentText className="w-4 h-4" />,
//         roles: ['admin']
//       },
//     ],
//   },
// ];

// // Filter menu by role
// const filterMenuByRole = (items, userRole) => {
//   return items
//     .filter(item => !item.roles || item.roles.includes(userRole))
//     .map(item => {
//       if (item.children) {
//         const filteredChildren = item.children.filter(child => 
//           !child.roles || child.roles.includes(userRole)
//         );
//         if (filteredChildren.length > 0) {
//           return { ...item, children: filteredChildren };
//         }
//         return { ...item, children: undefined };
//       }
//       return item;
//     });
// };

// // Menu Item Component
// const MenuItem = ({ item, collapsed, depth = 0, onMenuClick, openMenu, setOpenMenu, userRole, isLoading }) => {
//   const pathname = usePathname();
//   const router = useRouter();
//   const [isNavigating, setIsNavigating] = useState(false);
  
//   const hasChildren = item.children && item.children.length > 0;
//   const isOpen = openMenu === item.title;

//   const normalizePath = (path) => (path || '').replace(/\/+$|^\s+|\s+$/g, '');
//   const normalizedPathname = normalizePath(pathname);
//   const normalizeRoute = (route) => normalizePath(route || '');

//   const matchRoute = (route, exact = false) => {
//     const normalizedRoute = normalizeRoute(route);
//     if (!normalizedRoute) return false;
//     if (exact) {
//       return normalizedPathname === normalizedRoute;
//     }
//     return normalizedPathname === normalizedRoute || normalizedPathname.startsWith(`${normalizedRoute}/`);
//   };

//   // Check if current item or any child is active
//   const isActive = item.children
//     ? matchRoute(item.path, true) || (item.children && item.children.some(child => matchRoute(child.path, true)))
//     : matchRoute(item.path, true);

//   // Check role access
//   if (item.roles && !item.roles.includes(userRole)) {
//     return null;
//   }

//   const handleClick = (e) => {
//     if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
//       return;
//     }

//     if (hasChildren) {
//       e.preventDefault();
//       e.stopPropagation();

//       if (collapsed) {
//         setIsNavigating(true);
//         onMenuClick?.();
//         setTimeout(() => {
//           router.push(item.path);
//         }, 100);
//         return;
//       }

//       setOpenMenu(isOpen ? null : item.title);
//       return;
//     }

//     setIsNavigating(true);
//     onMenuClick?.();
//   };

//   if (isLoading) {
//     return (
//       <div className="px-2 py-0.5">
//         <div className="flex items-center px-3 py-2.5">
//           <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
//           {!collapsed && (
//             <>
//               <div className="ml-3 flex-1">
//                 <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     );
//   }

//   const baseClasses = `w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${depth > 0 ? 'ml-4' : ''} ${collapsed ? 'justify-center' : 'justify-start'} relative group`;
//   const activeClasses = 'bg-[#041367] text-white shadow-sm';
//   const inactiveClasses = 'text-gray-600 hover:bg-[#041367]/5 hover:text-[#041367]';

//   const content = (
//     <>
//       <span className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#041367]'}>
//         {item.icon}
//       </span>

//       {!collapsed && (
//         <>
//           <span className="ml-3 flex-1 text-sm font-medium text-left">{item.title}</span>

//           {isNavigating && (
//             <span className="ml-2">
//               <div className="w-4 h-4 border-2 border-gray-300 border-t-[#041367] rounded-full animate-spin"></div>
//             </span>
//           )}

//           {hasChildren && !isNavigating && (
//             <span className="ml-2">
//               {isOpen ? (
//                 <HiOutlineChevronUp className="w-4 h-4" />
//               ) : (
//                 <HiOutlineChevronDown className="w-4 h-4" />
//               )}
//             </span>
//           )}
//         </>
//       )}

//       {collapsed && (
//         <div className="absolute left-full ml-2 px-2 py-1 bg-[#041367] text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
//           {item.title}
//         </div>
//       )}
//     </>
//   );

//   return (
//     <div className="px-2 py-0.5">
//       {hasChildren ? (
//         <button
//           type="button"
//           onClick={handleClick}
//           className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
//         >
//           {content}
//         </button>
//       ) : (
//         <Link
//           href={item.path}
//           onClick={handleClick}
//           className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
//         >
//           {content}
//         </Link>
//       )}

//       {hasChildren && isOpen && !collapsed && (
//         <div className="mt-1 animate-slideDown">
//           {item.children.map((child, index) => (
//             <MenuItem
//               key={index}
//               item={child}
//               collapsed={collapsed}
//               depth={depth + 1}
//               onMenuClick={onMenuClick}
//               openMenu={openMenu}
//               setOpenMenu={setOpenMenu}
//               userRole={userRole}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// // User Profile Component - Updated with Hanjin colors
// const UserProfile = ({ collapsed, user, onLogout }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isLoggingOut, setIsLoggingOut] = useState(false);

//   const getInitials = () => {
//     if (user?.firstName) return user.firstName.charAt(0).toUpperCase();
//     if (user?.name) return user.name.charAt(0).toUpperCase();
//     if (user?.email) return user.email.charAt(0).toUpperCase();
//     return 'U';
//   };

//   const getDisplayName = () => {
//     if (user?.firstName) {
//       return user.firstName + (user?.lastName ? ' ' + user.lastName : '');
//     }
//     if (user?.name) return user.name;
//     if (user?.email) return user.email.split('@')[0];
//     return 'User';
//   };

//   const handleLogoutClick = () => {
//     setIsLoggingOut(true);
//     setTimeout(() => {
//       onLogout();
//     }, 500);
//   };

//   return (
//     <div className={`mt-auto border-t border-gray-100 pt-4 ${collapsed ? 'px-2' : 'px-4'}`}>
//       <div className="relative">
//         <button
//           onClick={() => !collapsed && setIsOpen(!isOpen)}
//           className={`
//             flex items-center w-full space-x-3 rounded-lg p-2 transition-colors
//             ${collapsed ? 'justify-center' : 'justify-start'}
//             hover:bg-[#041367]/5 group
//           `}
//         >
//           <div className="relative">
//             <div 
//               className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#041367] to-blue-700 text-white font-bold text-sm shadow-md"
//             >
//               {getInitials()}
//             </div>
//             <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
//           </div>
          
//           {!collapsed && (
//             <>
//               <div className="flex-1 text-left">
//                 <p className="text-sm font-medium text-gray-700 group-hover:text-[#041367]">
//                   {getDisplayName()}
//                 </p>
//                 <p className="text-xs text-gray-400 capitalize">{user?.role || 'admin'}</p>
//               </div>
//               {isLoggingOut ? (
//                 <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-[#041367] rounded-full animate-spin"></div>
//               ) : (
//                 <HiOutlineChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
//               )}
//             </>
//           )}

//           {collapsed && (
//             <div className="absolute left-full ml-2 px-2 py-1 bg-[#041367] text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap z-50">
//               {getDisplayName()}
//             </div>
//           )}
//         </button>

//         {/* Dropdown menu */}
//         {!collapsed && isOpen && !isLoggingOut && (
//           <div className="absolute bottom-full left-0 w-full mb-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 animate-slideUp z-50">
//             <div className="px-4 py-2 border-b border-gray-100 bg-gradient-to-r from-[#041367]/5 to-transparent">
//               <p className="text-sm font-medium text-gray-800">{getDisplayName()}</p>
//               <p className="text-xs text-gray-500 truncate">{user?.email}</p>
//             </div>
//             <button 
//               className="flex items-center px-4 py-2 text-xs text-red-600 hover:bg-red-50 w-full transition-colors duration-150"
//               onClick={handleLogoutClick}
//             >
//               <HiOutlineLogout className="w-3.5 h-3.5 mr-2" />
//               Logout
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// // Main Sidebar Component
// export default function Sidebar({ user: propUser = null }) {
//   const [collapsed, setCollapsed] = useState(false);
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [openMenu, setOpenMenu] = useState(null);
//   const [user, setUser] = useState(propUser);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPageLoading, setIsPageLoading] = useState(false);
//   const router = useRouter();
//   const pathname = usePathname();

//   // Check login status with loading
//   useEffect(() => {
//     const loadUser = async () => {
//       setIsLoading(true);
//       try {
//         const token = getAuthToken();
//         const userData = getUserDetails();
        
//         if (token && userData) {
//           setUser(userData);
//         }
//       } catch (error) {
//         console.error('Error loading user:', error);
//       } finally {
//         setTimeout(() => {
//           setIsLoading(false);
//         }, 500);
//       }
//     };
    
//     loadUser();
//   }, [pathname]);

//   // Handle page navigation loading
//   useEffect(() => {
//     const handleStart = () => setIsPageLoading(true);
//     const handleComplete = () => setIsPageLoading(false);

//     router.events?.on('routeChangeStart', handleStart);
//     router.events?.on('routeChangeComplete', handleComplete);
//     router.events?.on('routeChangeError', handleComplete);

//     return () => {
//       router.events?.off('routeChangeStart', handleStart);
//       router.events?.off('routeChangeComplete', handleComplete);
//       router.events?.off('routeChangeError', handleComplete);
//     };
//   }, [router]);

//   // Mobile check
//   useEffect(() => {
//     const checkMobile = () => {
//       const mobileView = window.innerWidth < 768;
//       setIsMobile(mobileView);

//       if (mobileView) {
//         setCollapsed(false);
//       } else {
//         const savedState = localStorage.getItem('sidebarCollapsed');
//         if (savedState !== null) {
//           setCollapsed(JSON.parse(savedState));
//         }
//       }
//     };
    
//     checkMobile();
//     window.addEventListener('resize', checkMobile);
//     return () => window.removeEventListener('resize', checkMobile);
//   }, []);

//   // Auto-open menu containing active route
//   useEffect(() => {
//     if (!collapsed && user && !isLoading) {
//       const filteredItems = filterMenuByRole(menuItems, user.role);
      
//       const findParentWithActiveChild = (items) => {
//         for (const item of items) {
//           if (item.children) {
//             const hasActiveChild = item.children.some(child => 
//               child.path === pathname
//             );
//             if (hasActiveChild) {
//               setOpenMenu(item.title);
//               return;
//             }
//           }
//         }
//       };
      
//       findParentWithActiveChild(filteredItems);
//     }
//   }, [pathname, collapsed, user, isLoading]);

//   const toggleCollapse = () => {
//     const newState = !collapsed;
//     setCollapsed(newState);
//     localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
//     if (!newState) {
//       setOpenMenu(null);
//     }
//   };

//   if (isLoading) {
//     return (
//       <>
//         {isMobile && (
//           <button className="absolute top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200">
//             <svg className="w-5 h-5 text-[#041367]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//             </svg>
//           </button>
//         )}
//         <aside
//           style={{ width: collapsed ? 72 : 256 }}
//           className="fixed left-0 top-0 h-full bg-white z-50 shadow-lg border-r border-[#041367]/15"
//         >
//           <div className="flex flex-col h-full">
//             <Logo collapsed={collapsed} />
//             <MenuSkeleton />
//           </div>
//         </aside>
//         {!isMobile && <div style={{ marginLeft: collapsed ? 72 : 256 }} />}
//       </>
//     );
//   }

//   if (!user) {
//     return null;
//   }

//   const filteredMenuItems = filterMenuByRole(menuItems, user.role);

//   const handleSearch = (e) => {
//     setSearchTerm(e.target.value);
//     setOpenMenu(null);
//   };

//   const handleMenuClick = () => {
//     if (isMobile) {
//       setMobileOpen(false);
//     }
//   };

//   const handleLogout = () => {
//     authLogout();
//     router.push('/');
//   };

//   // Filter items based on search
//   const searchedItems = searchTerm
//     ? filteredMenuItems.filter(item => 
//         item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         (item.children && item.children.some(child => 
//           child.title.toLowerCase().includes(searchTerm.toLowerCase())
//         ))
//       ).map(item => {
//         if (item.children) {
//           const matchingChildren = item.children.filter(child =>
//             child.title.toLowerCase().includes(searchTerm.toLowerCase())
//           );
//           if (matchingChildren.length > 0) {
//             return { ...item, children: matchingChildren };
//           }
//         }
//         return item;
//       })
//     : filteredMenuItems;

//   return (
//     <>
//       {/* Global loading spinner */}
//       {isPageLoading && <LoadingSpinner />}

//       {/* Mobile overlay */}
//       {isMobile && mobileOpen && (
//         <div 
//           className="fixed inset-0 bg-black/50 z-40"
//           onClick={() => setMobileOpen(false)}
//         />
//       )}

//       {/* Mobile toggle */}
//       {isMobile && !mobileOpen && (
//         <button
//           onClick={() => setMobileOpen(true)}
//           className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
//         >
//           <svg className="w-5 h-5 text-[#041367]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//           </svg>
//         </button>
//       )}

//       {/* Sidebar */}
//       <aside
//         style={{ 
//           width: collapsed ? 72 : 256,
//           maxWidth: isMobile ? '80vw' : 256,
//           transform: isMobile && !mobileOpen ? 'translateX(-100%)' : 'translateX(0)',
//         }}
//         className="fixed left-0 top-0 h-dvh bg-white z-50 overflow-hidden overflow-x-hidden transition-all duration-300 shadow-xl border-r border-[#041367]/10"
//       >
//         <div className="flex flex-col h-full">
//           {/* Logo */}
//           <Logo collapsed={collapsed} />

//           {/* Desktop toggle */}
//           {!isMobile && (
//             <button
//               onClick={toggleCollapse}
//               className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-[#041367] hover:border-[#041367] shadow-md z-50 transition-all duration-200"
//             >
//               {collapsed ? (
//                 <HiChevronDoubleRight className="w-3 h-3" />
//               ) : (
//                 <HiChevronDoubleLeft className="w-3 h-3" />
//               )}
//             </button>
//           )}

//           {/* Menu items */}
//           <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar mt-4">
//             {searchedItems.map((item, index) => (
//               <MenuItem 
//                 key={index} 
//                 item={item} 
//                 collapsed={collapsed} 
//                 onMenuClick={handleMenuClick}
//                 openMenu={openMenu}
//                 setOpenMenu={setOpenMenu}
//                 userRole={user.role}
//               />
//             ))}
//           </div> 

//           {/* User profile */}
//           <UserProfile collapsed={collapsed} user={user} onLogout={handleLogout} />
//         </div>
//       </aside>

//       {/* Content margin */}
//       {!isMobile && (
//         <div style={{ marginLeft: collapsed ? 72 : 256 }} className="transition-all duration-300" />
//       )}

//       {/* Custom scrollbar styles */}
//       <style jsx>{`
//         .custom-scrollbar::-webkit-scrollbar {
//           width: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-track {
//           background: #f1f1f1;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb {
//           background: #041367;
//           border-radius: 4px;
//         }
//         .custom-scrollbar::-webkit-scrollbar-thumb:hover {
//           background: #0f2b6e;
//         }
        
//         @keyframes slideDown {
//           from {
//             opacity: 0;
//             transform: translateY(-8px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         @keyframes slideUp {
//           from {
//             opacity: 0;
//             transform: translateY(8px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
        
//         .animate-slideDown {
//           animation: slideDown 0.2s ease-out;
//         }
        
//         .animate-slideUp {
//           animation: slideUp 0.2s ease-out;
//         }
//       `}</style>
//     </>
//   );
// }


// components/common/Sidebar.jsx
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  HiOutlineChevronDown, HiOutlineChevronLeft, HiOutlineChevronRight,
  HiOutlineChevronUp, HiOutlineClipboardList,
  HiOutlineCog, HiOutlineCube, HiOutlineCurrencyDollar,
  HiOutlineDocumentText, HiOutlineDownload,
  HiOutlineHome, HiOutlineLogout,
  HiOutlinePlus, HiOutlineSearch,
  HiOutlineTruck,
  HiOutlineUserGroup, HiOutlineUsers, HiTruck, HiUsers,
  HiChevronDoubleLeft, HiChevronDoubleRight, HiOutlineBell,
  HiCube, HiHome, HiCurrencyDollar
} from 'react-icons/hi';
import { MdDashboard, MdWarehouse, MdLocalShipping, MdAttachMoney } from 'react-icons/md';
import { BsPeople, BsClipboardData } from 'react-icons/bs';
import Image from 'next/image';
import { logout as authLogout, getAuthToken, getUserDetails } from '@/utils/SessionHelper';

const API = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="relative">
      <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
      <div className="w-16 h-16 border-4 border-[#041367] rounded-full border-t-transparent animate-spin absolute top-0 left-0"></div>
    </div>
  </div>
);

// Menu Skeleton Loader
const MenuSkeleton = () => (
  <div className="px-4 py-2 space-y-2">
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex items-center space-x-3 px-3 py-2.5">
        <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
        <div className="flex-1">
          <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
        </div>
      </div>
    ))}
  </div>
);

// ============ LOGO COMPONENT (accepts logoUrl prop) ============
const Logo = ({ collapsed, logoUrl = '/logo.png' }) => (
  <div className={`flex items-center ${collapsed ? 'justify-center' : 'justify-start'} px-4 py-6 border-b border-gray-100`}>
    <Link href="/dashboard" className="flex items-center gap-3 group">
      {/* Logo Image */}
      <div className="relative">
        <div className="w-10 h-10 rounded-full flex items-center justify-center shadow-md group-hover:scale-105 transition-transform duration-300 overflow-hidden bg-white">
          <img
            src={logoUrl}
            alt="Thai Shipping"
            className="object-contain w-full h-full"
            onError={(e) => {
              e.currentTarget.src = '/logo.png';
            }}
          />
        </div>
      </div>

      {/* Company Name - Only show when not collapsed */}
      {!collapsed && (
        <div className="flex flex-col">
          <h1 className="text-base font-bold text-[#E96C35]">
            Thai <span className="text-[#041367]">Shipping</span>
          </h1>
          <p className="text-[10px] text-gray-500 font-medium tracking-wide">Thailand</p>
        </div>
      )}
    </Link>
  </div>
);

// Menu Items Configuration
const menuItems = [
  {
    title: 'Dashboard',
    path: '/dashboard',
    icon: <MdDashboard className="w-5 h-5" />,
    activeIcon: <MdDashboard className="w-5 h-5" />,
    roles: ['admin', 'warehouse']
  },
  {
    title: 'Footer Settings',
    path: '/admin/footer-settings',
    icon: <HiOutlineCog className="w-5 h-5" />,
    roles: ['admin'],
  },
  {
    title: 'Users',
    path: '/users/customers',
    icon: <BsPeople className="w-5 h-5" />,
    activeIcon: <BsPeople className="w-5 h-5" />,
    roles: ['admin'],
    children: [
      {
        title: 'All Users',
        path: '/users/customers',
        icon: <HiOutlineUserGroup className="w-4 h-4" />,
        roles: ['admin']
      },
      {
        title: 'Add Staff',
        path: '/users/create_staff',
        icon: <HiOutlinePlus className="w-4 h-4" />,
        roles: ['admin']
      },
    ],
  },
  {
    title: 'Bookings',
    path: '/Bookings/all_bookings',
    icon: <BsClipboardData className="w-5 h-5" />,
    activeIcon: <BsClipboardData className="w-5 h-5" />,
    roles: ['admin'],
    children: [
      {
        title: 'All Bookings',
        path: '/Bookings/all_bookings',
        icon: <HiOutlineClipboardList className="w-4 h-4" />,
        roles: ['admin']
      },
      {
        title: 'New Booking',
        path: '/Bookings/create_bookings',
        icon: <HiOutlinePlus className="w-4 h-4" />,
        roles: ['admin']
      },
      {
        title: 'Manual Booking',
        path: '/Bookings/create_manually',
        icon: <HiOutlinePlus className="w-4 h-4" />,
        roles: ['admin']
      },
    ],
  },

  {
    title: 'Warehouse',
    path: '/warehouse',
    icon: <MdWarehouse className="w-5 h-5" />,
    activeIcon: <MdWarehouse className="w-5 h-5" />,
    roles: ['admin', 'warehouse'],
    children: [
      {
        title: 'Warehouse Home',
        path: '/warehouse',
        icon: <HiOutlineDownload className="w-4 h-4" />,
        roles: ['admin', 'warehouse']
      },
      {
        title: 'Container Status',
        path: '/warehouse/all-consolidation',
        icon: <HiOutlineDownload className="w-4 h-4" />,
        roles: ['admin', 'warehouse']
      },
    ],
  },
  {
    title: 'All Shipments',
    path: '/shippings/all_shipping',
    icon: <MdLocalShipping className="w-5 h-5" />,
    activeIcon: <MdLocalShipping className="w-5 h-5" />,
    roles: ['admin'],
    children: [
      {
        title: 'Regular Shipments',
        path: '/shippings/all_shipping',
        icon: <HiOutlineClipboardList className="w-4 h-4" />,
        roles: ['admin']
      },
      {
        title: 'Manual Shipments',
        path: '/shippings/manual-shipping',
        icon: <HiOutlineClipboardList className="w-4 h-4" />,
        roles: ['admin']
      },
    ],
  },
  {
    title: 'Documents',
    path: '/shippings/invoice',
    icon: <HiOutlineSearch className="w-5 h-5" />,
    activeIcon: <HiOutlineSearch className="w-5 h-5" />,
    roles: ['admin'],
    children: [
      {
        title: 'Invoices',
        path: '/shippings/invoice',
        icon: <HiOutlineDocumentText className="w-4 h-4" />,
        roles: ['admin']
      },
      {
        title: 'Tracking',
        path: '/all-tracking',
        icon: <HiOutlineDocumentText className="w-4 h-4" />,
        roles: ['admin']
      },
    ],
  },
];

// Filter menu by role
const filterMenuByRole = (items, userRole) => {
  return items
    .filter(item => !item.roles || item.roles.includes(userRole))
    .map(item => {
      if (item.children) {
        const filteredChildren = item.children.filter(child =>
          !child.roles || child.roles.includes(userRole)
        );
        if (filteredChildren.length > 0) {
          return { ...item, children: filteredChildren };
        }
        return { ...item, children: undefined };
      }
      return item;
    });
};

// Menu Item Component
const MenuItem = ({ item, collapsed, depth = 0, onMenuClick, openMenu, setOpenMenu, userRole, isLoading }) => {
  const pathname = usePathname();
  const router = useRouter();
  const [isNavigating, setIsNavigating] = useState(false);

  const hasChildren = item.children && item.children.length > 0;
  const isOpen = openMenu === item.title;

  const normalizePath = (path) => (path || '').replace(/\/+$|^\s+|\s+$/g, '');
  const normalizedPathname = normalizePath(pathname);
  const normalizeRoute = (route) => normalizePath(route || '');

  const matchRoute = (route, exact = false) => {
    const normalizedRoute = normalizeRoute(route);
    if (!normalizedRoute) return false;
    if (exact) {
      return normalizedPathname === normalizedRoute;
    }
    return normalizedPathname === normalizedRoute || normalizedPathname.startsWith(`${normalizedRoute}/`);
  };

  const isActive = item.children
    ? matchRoute(item.path, true) || (item.children && item.children.some(child => matchRoute(child.path, true)))
    : matchRoute(item.path, true);

  if (item.roles && !item.roles.includes(userRole)) {
    return null;
  }

  const handleClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) {
      return;
    }

    if (hasChildren) {
      e.preventDefault();
      e.stopPropagation();

      if (collapsed) {
        setIsNavigating(true);
        onMenuClick?.();
        setTimeout(() => {
          router.push(item.path);
        }, 100);
        return;
      }

      setOpenMenu(isOpen ? null : item.title);
      return;
    }

    setIsNavigating(true);
    onMenuClick?.();
  };

  if (isLoading) {
    return (
      <div className="px-2 py-0.5">
        <div className="flex items-center px-3 py-2.5">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          {!collapsed && (
            <>
              <div className="ml-3 flex-1">
                <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  const baseClasses = `w-full flex items-center px-3 py-2.5 rounded-lg transition-all duration-200 ${depth > 0 ? 'ml-4' : ''} ${collapsed ? 'justify-center' : 'justify-start'} relative group`;
  const activeClasses = 'bg-[#041367] text-white shadow-sm';
  const inactiveClasses = 'text-gray-600 hover:bg-[#041367]/5 hover:text-[#041367]';

  const content = (
    <>
      <span className={isActive ? 'text-white' : 'text-gray-500 group-hover:text-[#041367]'}>
        {item.icon}
      </span>

      {!collapsed && (
        <>
          <span className="ml-3 flex-1 text-sm font-medium text-left">{item.title}</span>

          {isNavigating && (
            <span className="ml-2">
              <div className="w-4 h-4 border-2 border-gray-300 border-t-[#041367] rounded-full animate-spin"></div>
            </span>
          )}

          {hasChildren && !isNavigating && (
            <span className="ml-2">
              {isOpen ? (
                <HiOutlineChevronUp className="w-4 h-4" />
              ) : (
                <HiOutlineChevronDown className="w-4 h-4" />
              )}
            </span>
          )}
        </>
      )}

      {collapsed && (
        <div className="absolute left-full ml-2 px-2 py-1 bg-[#041367] text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50">
          {item.title}
        </div>
      )}
    </>
  );

  return (
    <div className="px-2 py-0.5">
      {hasChildren ? (
        <button
          type="button"
          onClick={handleClick}
          className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          {content}
        </button>
      ) : (
        <Link
          href={item.path}
          onClick={handleClick}
          className={`${baseClasses} ${isActive ? activeClasses : inactiveClasses}`}
        >
          {content}
        </Link>
      )}

      {hasChildren && isOpen && !collapsed && (
        <div className="mt-1 animate-slideDown">
          {item.children.map((child, index) => (
            <MenuItem
              key={index}
              item={child}
              collapsed={collapsed}
              depth={depth + 1}
              onMenuClick={onMenuClick}
              openMenu={openMenu}
              setOpenMenu={setOpenMenu}
              userRole={userRole}
            />
          ))}
        </div>
      )}
    </div>
  );
};

// User Profile Component
const UserProfile = ({ collapsed, user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const getInitials = () => {
    if (user?.firstName) return user.firstName.charAt(0).toUpperCase();
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return 'U';
  };

  const getDisplayName = () => {
    if (user?.firstName) {
      return user.firstName + (user?.lastName ? ' ' + user.lastName : '');
    }
    if (user?.name) return user.name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const handleLogoutClick = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      onLogout();
    }, 500);
  };

  return (
    <div className={`mt-auto border-t border-gray-100 pt-4 ${collapsed ? 'px-2' : 'px-4'}`}>
      <div className="relative">
        <button
          onClick={() => !collapsed && setIsOpen(!isOpen)}
          className={`
            flex items-center w-full space-x-3 rounded-lg p-2 transition-colors
            ${collapsed ? 'justify-center' : 'justify-start'}
            hover:bg-[#041367]/5 group
          `}
        >
          <div className="relative">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center bg-gradient-to-br from-[#041367] to-blue-700 text-white font-bold text-sm shadow-md"
            >
              {getInitials()}
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></div>
          </div>

          {!collapsed && (
            <>
              <div className="flex-1 text-left">
                <p className="text-sm font-medium text-gray-700 group-hover:text-[#041367]">
                  {getDisplayName()}
                </p>
                <p className="text-xs text-gray-400 capitalize">{user?.role || 'admin'}</p>
              </div>
              {isLoggingOut ? (
                <div className="w-3.5 h-3.5 border-2 border-gray-300 border-t-[#041367] rounded-full animate-spin"></div>
              ) : (
                <HiOutlineChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              )}
            </>
          )}

          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-[#041367] text-white text-xs rounded opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap z-50">
              {getDisplayName()}
            </div>
          )}
        </button>

        {!collapsed && isOpen && !isLoggingOut && (
          <div className="absolute bottom-full left-0 w-full mb-1 bg-white rounded-lg shadow-lg border border-gray-100 py-1 animate-slideUp z-50">
            <div className="px-4 py-2 border-b border-gray-100 bg-gradient-to-r from-[#041367]/5 to-transparent">
              <p className="text-sm font-medium text-gray-800">{getDisplayName()}</p>
              <p className="text-xs text-gray-500 truncate">{user?.email}</p>
            </div>
            <button
              className="flex items-center px-4 py-2 text-xs text-red-600 hover:bg-red-50 w-full transition-colors duration-150"
              onClick={handleLogoutClick}
            >
              <HiOutlineLogout className="w-3.5 h-3.5 mr-2" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ============ MAIN SIDEBAR COMPONENT ============
export default function Sidebar({ user: propUser = null }) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [openMenu, setOpenMenu] = useState(null);
  const [user, setUser] = useState(propUser);
  const [isLoading, setIsLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // ============ LOGO STATE FROM BACKEND ============
  // Sidebar sits on a light background → uses "Navbar Logo" (bannerLogo, deep color)
  const [sidebarLogo, setSidebarLogo] = useState('/logo.png');

  useEffect(() => {
    let isMounted = true;

    fetch(`${API}/footer-settings`)
      .then((r) => r.json())
      .then((res) => {
        if (!isMounted) return;
        // ✅ Correct field — "Navbar Logo" (deep color for light background)
        if (res.success && res.data?.bannerLogo?.url) {
          setSidebarLogo(res.data.bannerLogo.url);
        }
      })
      .catch((err) => {
        console.warn('Failed to load sidebar logo, using fallback:', err);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Check login status with loading
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const token = getAuthToken();
        const userData = getUserDetails();

        if (token && userData) {
          setUser(userData);
        }
      } catch (error) {
        console.error('Error loading user:', error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      }
    };

    loadUser();
  }, [pathname]);

  // Handle page navigation loading
  useEffect(() => {
    const handleStart = () => setIsPageLoading(true);
    const handleComplete = () => setIsPageLoading(false);

    router.events?.on('routeChangeStart', handleStart);
    router.events?.on('routeChangeComplete', handleComplete);
    router.events?.on('routeChangeError', handleComplete);

    return () => {
      router.events?.off('routeChangeStart', handleStart);
      router.events?.off('routeChangeComplete', handleComplete);
      router.events?.off('routeChangeError', handleComplete);
    };
  }, [router]);

  // Mobile check
  useEffect(() => {
    const checkMobile = () => {
      const mobileView = window.innerWidth < 768;
      setIsMobile(mobileView);

      if (mobileView) {
        setCollapsed(false);
      } else {
        const savedState = localStorage.getItem('sidebarCollapsed');
        if (savedState !== null) {
          setCollapsed(JSON.parse(savedState));
        }
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-open menu containing active route
  useEffect(() => {
    if (!collapsed && user && !isLoading) {
      const filteredItems = filterMenuByRole(menuItems, user.role);

      const findParentWithActiveChild = (items) => {
        for (const item of items) {
          if (item.children) {
            const hasActiveChild = item.children.some(child =>
              child.path === pathname
            );
            if (hasActiveChild) {
              setOpenMenu(item.title);
              return;
            }
          }
        }
      };

      findParentWithActiveChild(filteredItems);
    }
  }, [pathname, collapsed, user, isLoading]);

  const toggleCollapse = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', JSON.stringify(newState));
    if (!newState) {
      setOpenMenu(null);
    }
  };

  if (isLoading) {
    return (
      <>
        {isMobile && (
          <button className="absolute top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200">
            <svg className="w-5 h-5 text-[#041367]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        )}
        <aside
          style={{ width: collapsed ? 72 : 256 }}
          className="fixed left-0 top-0 h-full bg-white z-50 shadow-lg border-r border-[#041367]/15"
        >
          <div className="flex flex-col h-full">
            <Logo collapsed={collapsed} logoUrl={sidebarLogo} />
            <MenuSkeleton />
          </div>
        </aside>
        {!isMobile && <div style={{ marginLeft: collapsed ? 72 : 256 }} />}
      </>
    );
  }

  if (!user) {
    return null;
  }

  const filteredMenuItems = filterMenuByRole(menuItems, user.role);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setOpenMenu(null);
  };

  const handleMenuClick = () => {
    if (isMobile) {
      setMobileOpen(false);
    }
  };

  const handleLogout = () => {
    authLogout();
    router.push('/');
  };

  const searchedItems = searchTerm
    ? filteredMenuItems.filter(item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.children && item.children.some(child =>
          child.title.toLowerCase().includes(searchTerm.toLowerCase())
        ))
      ).map(item => {
        if (item.children) {
          const matchingChildren = item.children.filter(child =>
            child.title.toLowerCase().includes(searchTerm.toLowerCase())
          );
          if (matchingChildren.length > 0) {
            return { ...item, children: matchingChildren };
          }
        }
        return item;
      })
    : filteredMenuItems;

  return (
    <>
      {isPageLoading && <LoadingSpinner />}

      {isMobile && mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {isMobile && !mobileOpen && (
        <button
          onClick={() => setMobileOpen(true)}
          className="fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <svg className="w-5 h-5 text-[#041367]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      )}

      <aside
        style={{
          width: collapsed ? 72 : 256,
          maxWidth: isMobile ? '80vw' : 256,
          transform: isMobile && !mobileOpen ? 'translateX(-100%)' : 'translateX(0)',
        }}
        className="fixed left-0 top-0 h-dvh bg-white z-50 overflow-hidden overflow-x-hidden transition-all duration-300 shadow-xl border-r border-[#041367]/10"
      >
        <div className="flex flex-col h-full">
          {/* Logo — uses "Navbar Logo" (bannerLogo, deep color for light background) */}
          <Logo collapsed={collapsed} logoUrl={sidebarLogo} />

          {!isMobile && (
            <button
              onClick={toggleCollapse}
              className="absolute -right-3 top-20 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-400 hover:text-[#041367] hover:border-[#041367] shadow-md z-50 transition-all duration-200"
            >
              {collapsed ? (
                <HiChevronDoubleRight className="w-3 h-3" />
              ) : (
                <HiChevronDoubleLeft className="w-3 h-3" />
              )}
            </button>
          )}

          <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar mt-4">
            {searchedItems.map((item, index) => (
              <MenuItem
                key={index}
                item={item}
                collapsed={collapsed}
                onMenuClick={handleMenuClick}
                openMenu={openMenu}
                setOpenMenu={setOpenMenu}
                userRole={user.role}
              />
            ))}
          </div>

          <UserProfile collapsed={collapsed} user={user} onLogout={handleLogout} />
        </div>
      </aside>

      {!isMobile && (
        <div style={{ marginLeft: collapsed ? 72 : 256 }} className="transition-all duration-300" />
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #041367;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #0f2b6e;
        }

        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slideDown { animation: slideDown 0.2s ease-out; }
        .animate-slideUp { animation: slideUp 0.2s ease-out; }
      `}</style>
    </>
  );
}
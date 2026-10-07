

// 'use client';
// import { 
//   setAuthToken, 
//   setUserDetails, 
//   setEmail,
//   getAuthToken,
//   getUserDetails
// } from '@/utils/SessionHelper';
// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { login } from '@/services/Authentication';
// import ToastProvider from '@/components/common/ToastProvider';

// const Button = ({
//   children,
//   type = 'button',
//   variant = 'primary',
//   size = 'md',
//   isLoading = false,
//   disabled = false,
//   onClick,
//   className = '',
// }) => {
//   const baseClasses = 'rounded-xl font-semibold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 relative overflow-hidden group';
  
//   const variants = {
//     primary: 'bg-gradient-to-r from-[#041367] via-[#0f2b6e] to-[#041367] text-white hover:shadow-xl hover:scale-[1.02] focus:ring-[#041367]',
//     secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
//     outline: 'border-2 border-[#041367] text-[#041367] hover:bg-[#041367] hover:text-white focus:ring-[#041367]'
//   };

//   const sizes = {
//     sm: 'px-4 py-2 text-sm',
//     md: 'px-5 py-2.5 text-base',
//     lg: 'px-6 py-3 text-lg'
//   };

//   const variantClass = variants[variant] || variants.primary;
//   const sizeClass = sizes[size] || sizes.md;

//   return (
//     <button
//       type={type}
//       className={`${baseClasses} ${variantClass} ${sizeClass} ${className} ${(disabled || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
//       disabled={disabled || isLoading}
//       onClick={onClick}
//     >
//       <span className="relative z-10 flex items-center justify-center gap-2">
//         {isLoading ? (
//           <>
//             <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
//               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
//               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
//             </svg>
//             Signing in...
//           </>
//         ) : (
//           children
//         )}
//       </span>
//       {variant === 'primary' && (
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
//           initial={{ x: '-100%' }}
//           whileHover={{ x: '100%' }}
//           transition={{ duration: 0.6 }}
//         />
//       )}
//     </button>
//   );
// };

// const Input = ({
//   label,
//   type = 'text',
//   name,
//   value,
//   onChange,
//   onBlur,
//   placeholder,
//   error,
//   required = false,
//   disabled = false,
//   icon,
//   className = '',
//   ...props
// }) => {
//   const [isFocused, setIsFocused] = useState(false);

//   return (
//     <div className="mb-4">
//       {label && (
//         <label className="block text-sm font-medium text-gray-700 mb-2">
//           {label}
//           {required && <span className="text-red-500 ml-1">*</span>}
//         </label>
//       )}
//       <div className="relative group">
//         {icon && (
//           <div className={`absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none transition-colors duration-300 ${isFocused ? 'text-[#041367]' : 'text-gray-400'}`}>
//             {icon}
//           </div>
//         )}
//         <input
//           type={type}
//           id={name}
//           name={name}
//           value={value}
//           onChange={onChange}
//           onBlur={(e) => {
//             setIsFocused(false);
//             onBlur && onBlur(e);
//           }}
//           onFocus={() => setIsFocused(true)}
//           placeholder={placeholder}
//           disabled={disabled}
//           className={`w-full px-4 py-3 border-2 rounded-xl shadow-sm bg-white transition-all duration-300 focus:outline-none ${
//             error 
//               ? 'border-red-500 bg-red-50 focus:ring-red-500' 
//               : isFocused 
//                 ? 'border-[#041367] ring-4 ring-[#041367]/10' 
//                 : 'border-gray-200 hover:border-[#041367]/50'
//           } ${icon ? 'pl-10' : ''} ${className}`}
//           {...props}
//         />
//       </div>
//       {error && (
//         <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-sm text-red-500 flex items-center gap-1">
//           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           {error}
//         </motion.p>
//       )}
//     </div>
//   );
// };

// // Animated Image Overlay Component
// const AnimatedImageOverlay = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);
  
//   const messages = [
//     { title: "Staff Portal Access", description: "Securely access your dashboard to manage bookings, shipments, and warehouse operations." },
//     { title: "Shipment Management", description: "Track, update, and manage all shipments from a centralized dashboard." },
//     { title: "Booking Operations", description: "Process customer bookings and manage shipping schedules efficiently." },
//     { title: "Warehouse Control", description: "Monitor inventory, manage consolidations, and track warehouse activities in real-time." },
//     { title: "Invoice Management", description: "Generate, review, and manage invoices for all shipments and services." }
//   ];

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % messages.length);
//     }, 4000);
//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-10">
//       <motion.div
//         key={currentIndex}
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         exit={{ opacity: 0, y: -20 }}
//         transition={{ duration: 0.5 }}
//         className="space-y-4"
//       >
//         <div className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full">
//           <span className="text-white text-sm font-medium">✦ Staff Portal</span>
//         </div>
//         <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
//           {messages[currentIndex].title}
//         </h2>
//         <p className="text-white/90 text-base md:text-lg leading-relaxed max-w-md">
//           {messages[currentIndex].description}
//         </p>
//         <div className="flex items-center gap-2 pt-4">
//           <div className="w-12 h-0.5 bg-white/60 rounded-full"></div>
//           <span className="text-white/60 text-sm">Hanjin Shipping Thailand</span>
//         </div>
//       </motion.div>
      
//       {/* Slide Indicators */}
//       <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
//         {messages.map((_, idx) => (
//           <button
//             key={idx}
//             onClick={() => setCurrentIndex(idx)}
//             className={`transition-all duration-300 rounded-full ${
//               currentIndex === idx 
//                 ? 'w-8 h-1.5 bg-white' 
//                 : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/60'
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default function LoginPage() {
//   const router = useRouter();

//   useEffect(() => {
//     // Hide all header, sidebar, navbar elements
//     const elementsToHide = document.querySelectorAll(
//       'aside, .topbar, header, nav, .sidebar, .navbar, [class*="header"], [class*="sidebar"], [class*="navbar"]'
//     );
    
//     elementsToHide.forEach(el => {
//       if (el && el.style) {
//         el.style.display = 'none';
//       }
//     });
    
//     // Prevent scrolling on all devices
//     document.body.style.overflow = 'hidden';
//     document.documentElement.style.overflow = 'hidden';
    
//     return () => {
//       elementsToHide.forEach(el => {
//         if (el && el.style) {
//           el.style.display = '';
//         }
//       });
//       document.body.style.overflow = '';
//       document.documentElement.style.overflow = '';
//     };
//   }, []);

//   useEffect(() => {
//     const token = getAuthToken();
//     const user = getUserDetails();
    
//     const searchParams = new URLSearchParams(window.location.search);
//     const redirectUrl = searchParams.get('redirect') || '/dashboard';
    
//     if (token && user) {
//       router.replace(redirectUrl); 
//     }
//   }, [router]);
   
//   const [formData, setFormData] = useState({
//     email: '',
//     password: ''
//   });
//   const [showPassword, setShowPassword] = useState(false);
//   const [rememberMe, setRememberMe] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [errors, setErrors] = useState({});
//   const [touched, setTouched] = useState({});

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.email) {
//       newErrors.email = 'Email is required';
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Email is invalid';
//     }

//     if (!formData.password) {
//       newErrors.password = 'Password is required';
//     }

//     return newErrors;
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//     if (errors[name]) {
//       setErrors(prev => ({ ...prev, [name]: '' }));
//     }
//   };

//   const handleBlur = (field) => {
//     setTouched(prev => ({ ...prev, [field]: true }));
//     const validationErrors = validateForm();
//     setErrors(validationErrors);
//   };
 
//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     setTouched({
//       email: true,
//       password: true
//     });

//     const validationErrors = validateForm();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length === 0) {
//       setLoading(true);
//       try {
//         const response = await login(formData.email, formData.password);
        
//         if (response.success) {
//           const token = response.token || response.data?.token;
//           const userData = response.user || response.data?.user || response.data;
          
//           console.log('👤 User Data:', userData);
//           console.log('👤 User Role:', userData?.role);
          
//           const allowedRoles = ['admin', 'employee', 'manager', 'superadmin', 'warehouse'];
          
//           if (userData?.role === 'customer') {
//             toast.error(
//               <div>
//                 <strong>⚠️ Customer Access Denied</strong>
//                 <p className="text-sm mt-1">This portal is for employees and administrators only.</p>
//                 <p className="text-xs mt-1">Please use the customer tracking portal to manage your shipments.</p>
//               </div>, 
//               {
//                 position: 'top-right',
//                 autoClose: 7000,
//                 className: 'bg-red-50 border-l-4 border-red-500',
//               }
//             );
//             setLoading(false);
//             return;
//           }
          
//           if (!allowedRoles.includes(userData?.role)) {
//             toast.error(`Access Denied: Role "${userData?.role}" does not have permission to access this portal.`, {
//               position: 'top-right',
//               autoClose: 5000,
//             });
//             setLoading(false);
//             return;
//           }
          
//           if (token) {
//             setAuthToken(token);
//           }
          
//           if (userData) {
//             setUserDetails(userData);
//           }
          
//           setEmail(formData.email);
//           const searchParams = new URLSearchParams(window.location.search);
//           const redirectUrl = searchParams.get('redirect') || '/dashboard';
          
//           toast.success(
//             <div>
//               <strong>Login Successful!</strong>
//               <p className="text-sm mt-1">Welcome back, {userData?.firstName || userData?.name || 'User'}!</p>
//               <p className="text-xs mt-1">Role: {userData?.role}</p>
//             </div>, 
//             {
//               position: 'top-right',
//               autoClose: 3000,
//             }
//           );
          
//           setTimeout(() => {
//             router.push(redirectUrl);
//           }, 3000);
//         } else {
//           toast.error(response.message || 'Invalid email or password', {
//             position: 'top-right',
//             autoClose: 5000,
//           });
//         }
//       } catch (error) {
//         console.error('❌ Login error:', error);
//         toast.error(error.message || 'Invalid email or password', {
//           position: 'top-right',
//           autoClose: 5000,
//         });
//       } finally {
//         setLoading(false);
//       }
//     }
//   };

//   const renderIcon = (type) => {
//     switch(type) {
//       case 'email':
//         return (
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//           </svg>
//         );
//       case 'password':
//         return (
//           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
//           </svg>
//         );
//       default:
//         return null;
//     }
//   };

//   return (
//     <>
//       {/* Main Container - No Scroll on any device */}
//       <div className="fixed inset-0 w-full h-full bg-white overflow-hidden">
        
//         {/* Desktop Layout (lg and above) */}
//         <div className="hidden lg:flex w-full h-full">
//           {/* Left Side - Image with Overlay */}
//           <div className="w-1/2 relative overflow-hidden">
//             <Image
//               src="https://i.ibb.co.com/y251P2X/building.avif"
//               alt="Hanjin Shipping Staff Portal"
//               fill
//               className="object-cover"
//               priority
//             />
//             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-black/20" />
//             <AnimatedImageOverlay />
//           </div>

//           {/* Right Side - Login Form */}
//           <div className="w-1/2 flex items-center justify-center p-8 overflow-y-auto">
//             <div className="w-full max-w-md py-6">
//               {/* Logo */}
//               <div className="flex justify-center mb-6">
//                 <div className="relative">
//                   <div className="w-14 h-14 bg-gradient-to-br from-[#041367] to-blue-700 rounded-xl flex items-center justify-center shadow-md">
//                     <svg className="w-7 h-7 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                       <path d="M3 12h3l3 8 4-16 3 8h3" />
//                     </svg>
//                   </div>
//                 </div>
//               </div>

//               <div className="text-center mb-6">
//                 <h2 className="text-2xl font-bold text-gray-900">Staff Portal Login</h2>
//                 <p className="text-gray-500 text-sm mt-2">
//                   Welcome back! Please enter your credentials
//                 </p>
//               </div>

//               <form onSubmit={handleSubmit} className="space-y-5">
//                 <Input
//                   label="Email Address"
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   onBlur={() => handleBlur('email')}
//                   placeholder="staff@hanjin.com"
//                   error={touched.email && errors.email}
//                   required
//                   icon={renderIcon('email')}
//                 />

//                 <div className="relative">
//                   <Input
//                     label="Password"
//                     type={showPassword ? 'text' : 'password'}
//                     name="password"
//                     value={formData.password}
//                     onChange={handleChange}
//                     onBlur={() => handleBlur('password')}
//                     placeholder="Enter your password"
//                     error={touched.password && errors.password}
//                     required
//                     icon={renderIcon('password')}
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword(!showPassword)}
//                     className="absolute right-3 top-[46px] text-gray-400 hover:text-[#041367] transition-colors"
//                   >
//                     {showPassword ? (
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                       </svg>
//                     ) : (
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                       </svg>
//                     )}
//                   </button>
//                 </div>

//                 <div className="flex items-center justify-between">
//                   <label className="flex items-center gap-2 cursor-pointer">
//                     <input
//                       type="checkbox"
//                       checked={rememberMe}
//                       onChange={(e) => setRememberMe(e.target.checked)}
//                       className="w-4 h-4 text-[#041367] rounded border-gray-300 focus:ring-[#041367]"
//                     />
//                     <span className="text-sm text-gray-600">Remember me</span>
//                   </label>
//                   <Link
//                     href="/auth/forgot-password"
//                     className="text-sm text-[#041367] hover:underline font-medium"
//                   >
//                     Forgot password?
//                   </Link>
//                 </div>

//                 <Button
//                   type="submit"
//                   variant="primary"
//                   size="lg"
//                   isLoading={loading}
//                   className="w-full"
//                 >
//                   Sign In
//                   <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
//                   </svg>
//                 </Button>
//               </form>

//               <div className="mt-6 text-center">
//                 <p className="text-xs text-gray-400">
//                   Need help? Contact IT Support at{' '}
//                   <a href="mailto:support@hanjinthailand.com" className="text-[#041367] hover:underline">
//                     support@hanjinthailand.com
//                   </a>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Mobile Layout (below lg) */}
//         <div className="lg:hidden w-full h-full flex flex-col">
//           {/* Header Section */}
//           <div className="bg-gradient-to-r from-[#041367] to-[#0f2b6e] px-5 py-6 relative overflow-hidden flex-shrink-0">
//             <div className="absolute inset-0 opacity-10">
//               <div className="absolute top-0 -left-4 w-40 h-40 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl"></div>
//               <div className="absolute top-0 -right-4 w-40 h-40 bg-blue-600 rounded-full mix-blend-multiply filter blur-xl"></div>
//             </div>

//             <div className="relative z-10">
//               <div className="flex items-center justify-center mb-3">
//                 <div className="w-12 h-12 bg-white/10 backdrop-blur rounded-xl flex items-center justify-center">
//                   <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//                     <path d="M3 12h3l3 8 4-16 3 8h3" />
//                   </svg>
//                 </div>
//               </div>
              
//               <h1 className="text-xl font-bold text-white text-center">
//                 Hanjin Shipping
//               </h1>
//               <p className="text-white/80 text-xs text-center mt-1">
//                 Staff Portal
//               </p>
//             </div>
//           </div>

//           {/* Main Content - Scrollable Area */}
//           <div className="flex-1 overflow-y-auto px-5 py-6">
//             <div className="text-center mb-5">
//               <h2 className="text-lg font-bold text-gray-900">Welcome Back</h2>
//               <p className="text-xs text-gray-500 mt-1">Sign in to access your dashboard</p>
//             </div>

//             <form onSubmit={handleSubmit} className="mb-5">
//               <Input
//                 label="Email Address"
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 onBlur={() => handleBlur('email')}
//                 placeholder="staff@hanjin.com"
//                 error={touched.email && errors.email}
//                 required
//                 icon={renderIcon('email')}
//               />

//               <div className="relative">
//                 <Input
//                   label="Password"
//                   type={showPassword ? 'text' : 'password'}
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   onBlur={() => handleBlur('password')}
//                   placeholder="Enter your password"
//                   error={touched.password && errors.password}
//                   required
//                   icon={renderIcon('password')}
//                 />
//                 <button
//                   type="button"
//                   onClick={() => setShowPassword(!showPassword)}
//                   className="absolute right-3 top-[42px] text-gray-400 hover:text-[#041367]"
//                 >
//                   {showPassword ? (
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                     </svg>
//                   ) : (
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                     </svg>
//                   )}
//                 </button>
//               </div>

//               <div className="flex items-center justify-between mb-5">
//                 <label className="flex items-center gap-2 cursor-pointer">
//                   <input
//                     type="checkbox"
//                     checked={rememberMe}
//                     onChange={(e) => setRememberMe(e.target.checked)}
//                     className="w-3.5 h-3.5 text-[#041367] rounded border-gray-300 focus:ring-[#041367]"
//                   />
//                   <span className="text-xs text-gray-600">Remember me</span>
//                 </label>
//                 <Link
//                   href="/auth/forgot-password"
//                   className="text-xs text-[#041367] hover:underline font-medium"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>

//               <Button
//                 type="submit"
//                 variant="primary"
//                 size="md"
//                 isLoading={loading}
//                 className="w-full"
//               >
//                 Sign In
//               </Button>
//             </form>

//             {/* Portal Features */}
//             <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
//               <h3 className="text-xs font-semibold text-gray-900 mb-3">Portal Features</h3>
//               <div className="grid grid-cols-2 gap-3">
//                 <div className="flex items-start gap-2">
//                   <div className="w-5 h-5 bg-[#041367]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                     <svg className="w-3 h-3 text-[#041367]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-[11px] text-gray-600">Manage Bookings</span>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <div className="w-5 h-5 bg-[#041367]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                     <svg className="w-3 h-3 text-[#041367]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-[11px] text-gray-600">Track Shipments</span>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <div className="w-5 h-5 bg-[#041367]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                     <svg className="w-3 h-3 text-[#041367]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-[11px] text-gray-600">Manage Invoices</span>
//                 </div>
//                 <div className="flex items-start gap-2">
//                   <div className="w-5 h-5 bg-[#041367]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
//                     <svg className="w-3 h-3 text-[#041367]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                     </svg>
//                   </div>
//                   <span className="text-[11px] text-gray-600">Warehouse Updates</span>
//                 </div>
//               </div>
//             </div>

//             <div className="mt-4 text-center">
//               <p className="text-[10px] text-gray-400">
//                 © 2006 Hanjin Shipping (Thailand) Co., Ltd.
//               </p>
//             </div>
//           </div>
//         </div>

//       </div>

//       <ToastProvider />
//     </>
//   );
// }

'use client';
import {
  setAuthToken,
  setUserDetails,
  setEmail,
  getAuthToken,
  getUserDetails,
} from '@/utils/SessionHelper';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { login } from '@/services/Authentication';
import ToastProvider from '@/components/common/ToastProvider';

// ==========================================================
// API
// ==========================================================
const API_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

// ==========================================================
// BUTTON
// ==========================================================
const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  onClick,
  className = '',
}) => {
  const baseClasses =
    'rounded-xl font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2';

  const variants = {
    primary:
      'bg-[#073155] text-white hover:bg-[#0a4270] focus-visible:ring-[#073155] shadow-[0_4px_14px_rgba(7,49,85,0.15)] hover:shadow-[0_6px_20px_rgba(7,49,85,0.25)]',
    secondary:
      'bg-slate-100 text-slate-700 hover:bg-slate-200 focus-visible:ring-slate-400',
    outline:
      'border-2 border-[#073155] text-[#073155] hover:bg-[#073155] hover:text-white focus-visible:ring-[#073155]',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3 text-base',
  };

  const variantClass = variants[variant] || variants.primary;
  const sizeClass = sizes[size] || sizes.md;

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClass} ${sizeClass} ${className} ${
        disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      disabled={disabled || isLoading}
      onClick={onClick}
    >
      <span className="flex items-center justify-center gap-2">
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Signing in...
          </>
        ) : (
          children
        )}
      </span>
    </button>
  );
};

// ==========================================================
// INPUT
// ==========================================================
const Input = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  required = false,
  disabled = false,
  icon,
  rightElement,
  className = '',
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="mb-4">
      {label && (
        <label className="mb-2 block text-[13px] font-medium text-[#073155]">
          {label}
          {required && <span className="ml-1 text-[#E96C35]">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div
            className={`pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5 transition-colors duration-200 ${
              isFocused ? 'text-[#073155]' : 'text-[#8A94A6]'
            }`}
          >
            {icon}
          </div>
        )}
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={(e) => {
            setIsFocused(false);
            onBlur && onBlur(e);
          }}
          onFocus={() => setIsFocused(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={`w-full rounded-xl border-2 bg-white py-3 text-[13.5px] text-[#073155] shadow-sm outline-none transition-all duration-300 placeholder:text-[#A5AFB5]
            ${
              error
                ? 'border-red-400 bg-red-50 focus:ring-4 focus:ring-red-500/10'
                : isFocused
                  ? 'border-[#073155] ring-4 ring-[#073155]/10'
                  : 'border-slate-200 hover:border-[#073155]/40'
            }
            ${icon ? 'pl-10' : 'pl-4'} ${rightElement ? 'pr-11' : 'pr-4'} ${className}`}
          {...props}
        />
        {rightElement && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            {rightElement}
          </div>
        )}
      </div>
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-1.5 flex items-center gap-1 text-[12px] text-red-500"
        >
          <svg
            className="h-3.5 w-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          {error}
        </motion.p>
      )}
    </div>
  );
};

// ==========================================================
// ROTATING MESSAGES
// ==========================================================
const messages = [
  {
    title: 'Staff Portal Access',
    description:
      'Securely access your dashboard to manage bookings, shipments, and warehouse operations.',
  },
  {
    title: 'Shipment Management',
    description:
      'Track, update, and manage all shipments from a centralized dashboard.',
  },
  {
    title: 'Booking Operations',
    description:
      'Process customer bookings and manage shipping schedules efficiently.',
  },
  {
    title: 'Warehouse Control',
    description:
      'Monitor inventory, manage consolidations, and track warehouse activities in real-time.',
  },
  {
    title: 'Invoice Management',
    description:
      'Generate, review, and manage invoices for all shipments and services.',
  },
];

const RotatingContent = ({ navbarLogoUrl }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex h-full flex-col justify-between p-10 lg:p-14">
      {/* Navbar logo (dark version) on dark left panel */}
      <div className="flex items-center gap-3">
        {navbarLogoUrl ? (
          <img
            src={navbarLogoUrl}
            alt="Thai Shipping"
            className="h-14 w-auto max-w-[200px] object-contain sm:h-16"
          />
        ) : (
          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/25 bg-white/15 backdrop-blur-sm">
            <svg
              width="20"
              height="20"
              className="text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.8"
                d="M3 17l2-8h14l2 8M3 17h18M3 17l1 3h16l1-3M12 9V4m0 0H8m4 0h4"
              />
            </svg>
          </div>
        )}
        <div className="leading-tight">
          <p className="text-base font-semibold tracking-tight text-white">
            Thai Shipping
          </p>
          <p className="text-[11px] text-white/60">Staff Portal</p>
        </div>
      </div>

      {/* Rotating message block */}
      <div className="max-w-lg">
        <div className="mb-5 inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm">
          <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#F2A57C]">
            Staff Portal
          </span>
        </div>

        <div className="min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h1 className="text-3xl font-bold leading-[1.1] tracking-tight text-white lg:text-4xl xl:text-[44px]">
                {messages[currentIndex].title}
              </h1>
              <p className="mt-4 max-w-md text-[14.5px] leading-7 text-white/80">
                {messages[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Slide indicators */}
        <div className="mt-8 flex items-center gap-2">
          {messages.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to message ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                currentIndex === idx
                  ? 'w-8 bg-[#E96C35]'
                  : 'w-1.5 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Footer note */}
      <p className="text-[11px] text-white/45">
        © 2006 Thai Shipping (Thailand) Co., Ltd.
      </p>
    </div>
  );
};

// ==========================================================
// MAIN LOGIN PAGE
// ==========================================================
export default function LoginPage() {
  const router = useRouter();

  // ========================================================
  // LOGOS FROM FOOTER SETTINGS
  // ========================================================
  const [navbarLogoUrl, setNavbarLogoUrl] = useState(''); // dark version → dark backgrounds
  const [bannerLogoUrl, setBannerLogoUrl] = useState(''); // light version → light backgrounds
  const [logoLoading, setLogoLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchFooterSettings = async () => {
      try {
        const res = await fetch(`${API_URL}/footer-settings`, {
          cache: 'no-store',
        });
        const json = await res.json();

        if (isMounted && json.success && json.data) {
          if (json.data.navbarLogo?.url) {
            setNavbarLogoUrl(json.data.navbarLogo.url);
          }
          if (json.data.bannerLogo?.url) {
            setBannerLogoUrl(json.data.bannerLogo.url);
          }
        }
      } catch (err) {
        console.error('Failed to load footer settings:', err);
      } finally {
        if (isMounted) setLogoLoading(false);
      }
    };

    fetchFooterSettings();
    return () => {
      isMounted = false;
    };
  }, []);

  // ========================================================
  // HIDE LAYOUT + PREVENT SCROLL
  // ========================================================
  useEffect(() => {
    const elementsToHide = document.querySelectorAll(
      'aside, .topbar, header, nav, .sidebar, .navbar, [class*="header"], [class*="sidebar"], [class*="navbar"]'
    );

    elementsToHide.forEach((el) => {
      if (el && el.style) {
        el.style.display = 'none';
      }
    });

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      elementsToHide.forEach((el) => {
        if (el && el.style) {
          el.style.display = '';
        }
      });
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const token = getAuthToken();
    const user = getUserDetails();

    const searchParams = new URLSearchParams(window.location.search);
    const redirectUrl = searchParams.get('redirect') || '/dashboard';

    if (token && user) {
      router.replace(redirectUrl);
    }
  }, [router]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (field) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validateForm();
    setErrors(validationErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setTouched({
      email: true,
      password: true,
    });

    const validationErrors = validateForm();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await login(formData.email, formData.password);

        if (response.success) {
          const token = response.token || response.data?.token;
          const userData =
            response.user || response.data?.user || response.data;

          console.log('👤 User Data:', userData);
          console.log('👤 User Role:', userData?.role);

          const allowedRoles = [
            'admin',
            'employee',
            'manager',
            'superadmin',
            'warehouse',
          ];

          if (userData?.role === 'customer') {
            toast.error(
              <div>
                <strong>⚠️ Customer Access Denied</strong>
                <p className="text-sm mt-1">
                  This portal is for employees and administrators only.
                </p>
                <p className="text-xs mt-1">
                  Please use the customer tracking portal to manage your
                  shipments.
                </p>
              </div>,
              {
                position: 'top-right',
                autoClose: 7000,
                className: 'bg-red-50 border-l-4 border-red-500',
              }
            );
            setLoading(false);
            return;
          }

          if (!allowedRoles.includes(userData?.role)) {
            toast.error(
              `Access Denied: Role "${userData?.role}" does not have permission to access this portal.`,
              {
                position: 'top-right',
                autoClose: 5000,
              }
            );
            setLoading(false);
            return;
          }

          if (token) {
            setAuthToken(token);
          }

          if (userData) {
            setUserDetails(userData);
          }

          setEmail(formData.email);
          const searchParams = new URLSearchParams(window.location.search);
          const redirectUrl = searchParams.get('redirect') || '/dashboard';

          toast.success(
            <div>
              <strong>Login Successful!</strong>
              <p className="text-sm mt-1">
                Welcome back, {userData?.firstName || userData?.name || 'User'}!
              </p>
              <p className="text-xs mt-1">Role: {userData?.role}</p>
            </div>,
            {
              position: 'top-right',
              autoClose: 3000,
            }
          );

          setTimeout(() => {
            router.push(redirectUrl);
          }, 3000);
        } else {
          toast.error(response.message || 'Invalid email or password', {
            position: 'top-right',
            autoClose: 5000,
          });
        }
      } catch (error) {
        console.error('❌ Login error:', error);
        toast.error(error.message || 'Invalid email or password', {
          position: 'top-right',
          autoClose: 5000,
        });
      } finally {
        setLoading(false);
      }
    }
  };

  const renderIcon = (type) => {
    switch (type) {
      case 'email':
        return (
          <svg
            className="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="1.6" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.6"
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8"
            />
          </svg>
        );
      case 'password':
        return (
          <svg
            className="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <rect
              x="4"
              y="10"
              width="16"
              height="11"
              rx="2"
              strokeWidth="1.6"
            />
            <path
              strokeLinecap="round"
              strokeWidth="1.6"
              d="M8 10V7a4 4 0 018 0v3"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  const EyeButton = () => (
    <button
      type="button"
      onClick={() => setShowPassword(!showPassword)}
      className="p-2 text-[#8A94A6] transition-colors hover:text-[#073155] focus:outline-none"
      aria-label={showPassword ? 'Hide password' : 'Show password'}
    >
      {showPassword ? (
        <svg
          className="h-[17px] w-[17px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
          />
        </svg>
      ) : (
        <svg
          className="h-[17px] w-[17px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.6"
            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
          />
        </svg>
      )}
    </button>
  );

  return (
    <>
      {/* ======================================================
          FULL-SCREEN CONTAINER WITH BACKGROUND IMAGE
      ====================================================== */}
      <div className="fixed inset-0 h-full w-full overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage:
              "url('\login.jpg')",
          }}
          aria-hidden="true"
        />

        {/* Navy gradient overlay — heavier on left, lighter on right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,49,85,0.95) 0%, rgba(7,49,85,0.85) 40%, rgba(7,49,85,0.55) 60%, rgba(7,49,85,0.35) 100%)',
          }}
          aria-hidden="true"
        />

        {/* Soft orange glow */}
        <div
          className="pointer-events-none absolute -right-40 -top-40 h-[420px] w-[420px] rounded-full bg-[#E96C35]/15 blur-[120px]"
          aria-hidden="true"
        />

        {/* ======================================================
            DESKTOP LAYOUT (lg and up)
        ====================================================== */}
        <div className="relative z-10 hidden h-full w-full lg:grid lg:grid-cols-[1.15fr_1fr]">
          {/* LEFT — Rotating content with navbar logo */}
          <div className="relative h-full">
            <RotatingContent navbarLogoUrl={navbarLogoUrl} />
          </div>

          {/* RIGHT — Form (glass card) with banner logo */}
          <div className="flex items-center justify-center overflow-y-auto p-8">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md rounded-2xl border border-white/20 bg-white/95 p-8 shadow-[0_24px_60px_-25px_rgba(0,0,0,0.5)] backdrop-blur-xl"
            >
              {/* =============================================
                  BANNER LOGO on the form card
              ============================================= */}
              <div className="mb-6 flex justify-center">
                {logoLoading ? (
                  <div className="h-16 w-32 animate-pulse rounded-lg bg-slate-200" />
                ) : bannerLogoUrl ? (
                  <img
                    src={bannerLogoUrl}
                    alt="Thai Shipping"
                    className="h-16 w-auto max-w-[200px] object-contain"
                  />
                ) : (
                  <img
                    src="/images/logo1.png"
                    alt="Thai Shipping"
                    className="h-16 w-auto"
                  />
                )}
              </div>

              {/* Header */}
              <div className="mb-7 text-center">
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E96C35]">
                  Staff Portal
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[#073155]">
                  Sign in to your account
                </h2>
                <p className="mt-1.5 text-[13px] text-[#5A6B7B]">
                  Welcome back! Please enter your credentials.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-1">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  placeholder="staff@thaishipping.com"
                  error={touched.email && errors.email}
                  required
                  icon={renderIcon('email')}
                />

                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="Enter your password"
                  error={touched.password && errors.password}
                  required
                  icon={renderIcon('password')}
                  rightElement={<EyeButton />}
                />

                <div className="flex items-center justify-between pb-4 pt-1">
                  <label className="flex cursor-pointer items-center gap-2">
                  
                  
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-[12.5px] font-medium text-[#E96C35] transition-colors hover:text-[#d55f2b] hover:underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={loading}
                  className="w-full"
                >
                  Sign In
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>
              </form>

              {/* Support */}
              <div className="mt-6 border-t border-slate-200 pt-5 text-center">
                <p className="text-[11.5px] text-[#8A94A6]">
                  Need help? Contact IT Support at{' '}
                  <a
                    href="mailto:support@thaishipping.com"
                    className="font-medium text-[#073155] transition-colors hover:text-[#E96C35] hover:underline"
                  >
                    support@thaishipping.com
                  </a>
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ======================================================
            MOBILE LAYOUT (below lg)
        ====================================================== */}
        <div className="relative z-10 flex h-full w-full flex-col lg:hidden">
          {/* Top mobile header — navbar logo (dark bg) */}
          <div className="flex-shrink-0 px-5 pb-4 pt-6">
            <div className="flex items-center gap-2.5">
              {navbarLogoUrl ? (
                <img
                  src={navbarLogoUrl}
                  alt="Thai Shipping"
                  className="h-12 w-auto max-w-[160px] object-contain"
                />
              ) : (
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E96C35] shadow-lg shadow-[#E96C35]/30">
                  <svg
                    className="h-5 w-5 text-white"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 17l2-8h14l2 8M3 17h18M3 17l1 3h16l1-3M12 9V4m0 0H8m4 0h4"
                    />
                  </svg>
                </div>
              )}
              <div className="leading-tight">
                <p className="text-sm font-semibold text-white">
                  Thai Shipping
                </p>
                <p className="text-[10.5px] text-white/60">Staff Portal</p>
              </div>
            </div>
          </div>

          {/* Form area — scrollable */}
          <div className="flex-1 overflow-y-auto px-4 pb-6">
            <div className="rounded-2xl border border-white/20 bg-white/95 p-6 shadow-[0_24px_60px_-25px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              {/* Banner logo on light card */}
              <div className="mb-5 flex justify-center">
                {logoLoading ? (
                  <div className="h-14 w-32 animate-pulse rounded-lg bg-slate-200" />
                ) : bannerLogoUrl ? (
                  <img
                    src={bannerLogoUrl}
                    alt="Thai Shipping"
                    className="h-14 w-auto max-w-[180px] object-contain"
                  />
                ) : (
                  <img
                    src="/images/logo1.png"
                    alt="Thai Shipping"
                    className="h-14 w-auto"
                  />
                )}
              </div>

              <div className="mb-6 text-center">
                <p className="mb-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#E96C35]">
                  Staff Portal
                </p>
                <h2 className="text-lg font-semibold text-[#073155]">
                  Welcome Back
                </h2>
                <p className="mt-1 text-[12px] text-[#5A6B7B]">
                  Sign in to access your dashboard
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-1">
                <Input
                  label="Email Address"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  placeholder="staff@thaishipping.com"
                  error={touched.email && errors.email}
                  required
                  icon={renderIcon('email')}
                />

                <Input
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  placeholder="Enter your password"
                  error={touched.password && errors.password}
                  required
                  icon={renderIcon('password')}
                  rightElement={<EyeButton />}
                />

                <div className="flex items-center justify-between pb-3 pt-1">
                  <label className="flex cursor-pointer items-center gap-2">
                  
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-[11.5px] font-medium text-[#E96C35] hover:text-[#d55f2b] hover:underline underline-offset-4"
                  >
                    Forgot password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  isLoading={loading}
                  className="w-full"
                >
                  Sign In
                </Button>
              </form>
            </div>

            {/* Portal features card */}
            <div className="mt-4 rounded-2xl border border-white/20 bg-white/95 p-4 shadow-[0_24px_60px_-25px_rgba(0,0,0,0.5)] backdrop-blur-xl">
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[#073155]">
                Portal Features
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Manage Bookings',
                  'Track Shipments',
                  'Manage Invoices',
                  'Warehouse Updates',
                ].map((feature) => (
                  <div key={feature} className="flex items-start gap-2">
                    <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#E96C35]/10">
                      <svg
                        className="h-3 w-3 text-[#E96C35]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <span className="text-[11px] text-[#5A6B7B]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <p className="mt-5 text-center text-[10.5px] text-white/60">
              © 2006 Thai Shipping (Thailand) Co., Ltd.
            </p>
          </div>
        </div>
      </div>

      <ToastProvider />
    </>
  );
}
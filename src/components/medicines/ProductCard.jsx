import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import cartContext from '../../contexts/cart/cartContext';
import useActive from '../../hooks/useActive';
import { useNavigate } from 'react-router-dom';
import httpClient from '../../httpClient';

const ProductCard = (props) => {
    const { id, images, title, price } = props;

    const { addItem, placeOrder } = useContext(cartContext);
    const { active, handleActive, activeClass } = useActive(false);
    const navigate = useNavigate();
    const [balance, setBalance] = React.useState(0);
    const [imageLoaded, setImageLoaded] = React.useState(false);
    const [isHovered, setIsHovered] = React.useState(false);

    // Add useEffect to fetch wallet balance
    React.useEffect(() => {
        httpClient.post("/get_wallet", { email: localStorage.getItem("email") })
            .then((res) => {
                setBalance(Number(res.data.wallet));
            });
    }, []);

    // handling Add-to-cart
    const handleAddItem = () => {
        const item = { ...props };
        addItem(item);
        handleActive(id);
        setTimeout(() => {
            handleActive(false);
        }, 3000);
    };

    // Handling direct purchase
    const handleDirectPurchase = () => {
        const order = { ...props, quantity: 1 };
        
        if (price <= balance) {
            httpClient.post("/debit_wallet", {
                email: localStorage.getItem("email"),
                walletAmount: price,
            }).then(() => {
                localStorage.setItem("orders", JSON.stringify([order]));
                window.location.href = "https://telmedsphere-server.vercel.app/success";
            });
        } else {
            localStorage.setItem("totalPrice", price);
            localStorage.setItem("orders", JSON.stringify([order]));
            navigate("/checkout");
        }
    };

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    return (
        <div 
            className="relative group font-outfit w-full max-w-xs"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Main Card Container */}
            <div className="relative bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 ease-out transform hover:-translate-y-2 border border-gray-100 dark:border-slate-700">
                
                {/* Gradient Overlay for Premium Look */}
                <div className="absolute inset-0 bg-gradient-to-br from-teal-50/50 to-teal-100/30 dark:from-teal-900/20 dark:to-teal-800/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                {/* Product Image Section */}
                <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-800 dark:to-slate-700 overflow-hidden">
                    <Link to={`/all-medicines/medicine-details/${id}`} className="block h-full">
                        <div className="relative h-full w-full flex items-center justify-center p-4">
                            {/* Loading Spinner */}
                            {!imageLoaded && (
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="relative">
                                        <div className="w-12 h-12 border-3 border-teal-100 dark:border-teal-600 rounded-full"></div>
                                        <div className="w-12 h-12 border-3 border-teal-400 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
                                    </div>
                                </div>
                            )}
                            
                            {/* Product Image */}
                            <img 
                                src={images[0]} 
                                alt="product-img" 
                                className={`max-w-full max-h-full bg-transparent object-contain transition-all duration-500 ease-out ${
                                    imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                                } ${isHovered ? 'scale-105 rotate-1' : ''}`}
                                onLoad={handleImageLoad}
                            />
                            
                            {/* Floating Elements */}
                            <div className={`absolute top-3 right-3 w-4 h-4 bg-gradient-to-r from-teal-400 to-teal-600 rounded-full transition-all duration-500 ${isHovered ? 'scale-100 opacity-80' : 'scale-0 opacity-0'}`}></div>
                            <div className={`absolute bottom-3 left-3 w-3 h-3 bg-gradient-to-r from-teal-300 to-teal-500 rounded-full transition-all duration-700 delay-200 ${isHovered ? 'scale-100 opacity-60' : 'scale-0 opacity-0'}`}></div>
                        </div>
                    </Link>
                    
                    {/* Quick Actions Overlay */}
                    <div className={`absolute top-3 left-3 flex flex-col gap-2 transition-all duration-500 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-4'}`}>
                        <button className="w-8 h-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                            <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                        </button>
                        <button className="w-8 h-8 bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200">
                            <svg className="w-4 h-4 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Content Section */}
                <div className="relative p-4 space-y-3">
                    {/* Product Title */}
                    <div className="space-y-1">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white line-clamp-2 min-h-[2.5rem] leading-tight">
                            <Link 
                                to={`/all-medicines/medicine-details/${id}`}
                                className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-700 transition-all duration-300"
                            >
                                {title}
                            </Link>
                        </h3>
                        
                        {/* Rating Stars */}
                        <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                                <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                                </svg>
                            ))}
                            <span className="text-xs text-gray-500 dark:text-gray-400 ml-1">(4.5)</span>
                        </div>
                    </div>

                    {/* Price Section */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-baseline gap-1">
                            <span className="text-xl font-bold bg-gradient-to-r from-teal-400 to-teal-600 bg-clip-text text-transparent">
                                ₹{price}
                            </span>
                            <span className="text-gray-500 dark:text-gray-400 line-through text-sm">₹{Math.round(price * 1.2)}</span>
                        </div>
                        <div className="bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-400 px-2 py-1 rounded-full text-xs font-medium">
                            {Math.round(((price * 1.2 - price) / (price * 1.2)) * 100)}% OFF
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="space-y-2 pt-2">
                        {/* Buy Now Button - Primary */}
                        <button
                            type="button"
                            className="w-full bg-gradient-to-r from-teal-400 to-teal-600 hover:bg-gradient-to-r hover:from-teal-500 hover:to-teal-700 text-white font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group/btn relative overflow-hidden text-sm"
                            onClick={() => {
                                localStorage.setItem("totalPrice", price);
                                const order = { ...props, quantity: 1 };
                                placeOrder(order);
                                navigate("/checkout");
                            }}
                        >
                            {/* Button Shine Effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 ease-in-out"></div>
                            
                            <svg className="w-4 h-4 group-hover/btn:scale-110 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            <span>Buy Now</span>
                        </button>

                        {/* Add to Cart Button - Secondary */}
                        <button
                            type="button"
                            className={`w-full font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] border-2 flex items-center justify-center gap-2 shadow-md hover:shadow-lg text-sm ${
                                active 
                                    ? 'bg-gradient-to-r from-teal-500 to-teal-600 border-teal-500 text-white shadow-teal-200 dark:shadow-teal-900/50' 
                                    : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-600 text-gray-700 dark:text-gray-300 hover:border-teal-500 hover:text-teal-600 dark:hover:border-teal-400 dark:hover:text-teal-400'
                            }`}
                            onClick={handleAddItem}
                        >
                            {active ? (
                                <>
                                    <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                                    </svg>
                                    <span>Added!</span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-4 h-4 group-hover:rotate-12 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v4a2 2 0 01-2 2H9a2 2 0 01-2-2v-4m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
                                    </svg>
                                    <span>Add to Cart</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Additional Info */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100 dark:border-slate-700">
                        <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
                            </svg>
                            <span>Free Delivery</span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-teal-600 dark:text-teal-400">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
                            </svg>
                            <span>In Stock</span>
                        </div>
                    </div>
                </div>

                {/* Corner Decorations */}
                <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-br from-teal-400/20 to-teal-600/20 rounded-full -translate-y-6 translate-x-6 group-hover:scale-125 transition-transform duration-500"></div>
                <div className="absolute bottom-0 left-0 w-10 h-10 bg-gradient-to-tr from-teal-300/20 to-teal-500/20 rounded-full translate-y-5 -translate-x-5 group-hover:scale-110 transition-transform duration-500 delay-100"></div>
            </div>
        </div>
    );
};

export default ProductCard;
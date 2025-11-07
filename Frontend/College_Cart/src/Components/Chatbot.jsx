import { useState, useRef, useEffect } from 'react';
import { Send, MessageSquare, X, Trash2, Loader2, ShoppingCart, User, Phone, MapPin } from 'lucide-react';
const backend_url = import.meta.env.VITE_BACKEND_API_URL;

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hi! I'm John from College Cart 👋\n\nI can help you find products and show you detailed product cards. Try asking:\n• \"Show me iPhone details\"\n• \"Do you have laptops?\"\n• \"Tell me about headphones\"", 
      sender: 'bot',
      type: 'text'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const getUserId = () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.userId;
      } catch (error) {
        console.error("Token parse error:", error);
        return null;
      }
    }
    return null;
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { text: input.trim(), sender: 'user', type: 'text' };
    setMessages(prev => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput('');
    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      const userId = getUserId();

      if (!token || !userId) {
        throw new Error('Please login to continue');
      }

      const response = await fetch(`${backend_url}/agent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ 
          input: currentInput,
          userId 
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      if (data.success) {
        if (data.data.type === 'product_card') {
          setMessages(prev => [...prev, { 
            sender: 'bot',
            type: 'product_card',
            products: data.data.products
          }]);
        } else {
          setMessages(prev => [...prev, { 
            text: data.data.output, 
            sender: 'bot',
            type: 'text'
          }]);
        }
      } else {
        throw new Error('No response received');
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, 
        { 
          text: `⚠️ ${error.message}\n\nPlease try again or contact support.`, 
          sender: 'bot',
          type: 'text',
          isError: true
        }
      ]);
    } finally {
      setIsLoading(false);
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  };

  const handleClearHistory = async () => {
    try {
      const token = localStorage.getItem("token");
      const userId = getUserId();

      await fetch(`${backend_url}/agent/clear-history`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId })
      });

      setMessages([
        { 
          text: "Hi! I'm John from College Cart 👋\n\nI can help you find products and show you detailed product cards. Try asking:\n• \"Show me iPhone details\"\n• \"Do you have laptops?\"\n• \"Tell me about headphones\"", 
          sender: 'bot',
          type: 'text'
        }
      ]);
    } catch (error) {
      console.error('Clear history error:', error);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const QuickActions = () => (
    <div className="px-4 pb-2 flex flex-wrap gap-2">
      {['Show product details', 'Check availability', 'Browse items'].map((action, idx) => (
        <button
          key={idx}
          onClick={() => setInput(action)}
          className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors duration-200"
        >
          {action}
        </button>
      ))}
    </div>
  );

// Product Card Component with all details
const ProductCard = ({ product }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200 hover:shadow-xl transition-all duration-300 mb-3 max-w-[340px]">
      {/* Product Image */}
      <div className="relative h-52 bg-gradient-to-br from-gray-100 to-gray-50 overflow-hidden group">
        {product.image && !imageError ? (
          <>
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-gray-400 animate-spin" />
              </div>
            )}
            <img 
              src={product.image}
              alt={product.name}
              className={`w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
              onError={() => {
                console.error('Image load error:', product.image);
                setImageError(true);
              }}
            />
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center">
            <ShoppingCart className="w-16 h-16 text-gray-300 mb-2" />
            <span className="text-xs text-gray-400">No Image Available</span>
          </div>
        )}
        
        {/* Price Badge */}
        {product.price && (
          <div className="absolute top-3 right-3 bg-black text-white px-3 py-1.5 rounded-full text-sm font-bold shadow-lg">
            ₹{product.price.toLocaleString()}
          </div>
        )}

        {/* Discount Badge */}
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-bold">
            {product.discount}% OFF
          </div>
        )}

        {/* Stock Badge */}
        {product.stock !== undefined && (
          <div className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-semibold ${
            product.stock > 0 ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
          }`}>
            {product.stock > 0 ? `${product.stock} In Stock` : 'Out of Stock'}
          </div>
        )}
      </div>

      {/* Product Details */}
      <div className="p-4">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-gray-900 mb-1">{product.name}</h3>
          <div className="flex items-center justify-between">
            {product.brand && (
              <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
            )}
            {product.category && (
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                {product.category}
              </span>
            )}
          </div>
        </div>

        {/* Original Price (if discounted) */}
        {product.originalPrice && product.originalPrice !== product.price && (
          <div className="mb-2">
            <span className="text-sm text-gray-400 line-through">
              ₹{product.originalPrice.toLocaleString()}
            </span>
          </div>
        )}

        {product.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-3">
            {product.description}
          </p>
        )}

        {/* Seller Information */}
        {product.seller && (
          <div className="border-t border-gray-200 pt-3 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <span className="font-medium text-gray-700">{product.seller.name}</span>
            </div>

            {product.seller.type === 'hosteler' && product.seller.hostelName && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <span>
                  {product.seller.hostelName} - Room {product.seller.roomNumber}
                </span>
              </div>
            )}

            {product.seller.type === 'day_scholar' && product.seller.contact && (
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4 text-gray-500 flex-shrink-0" />
                <a href={`tel:${product.seller.contact}`} className="hover:text-blue-600">
                  {product.seller.contact}
                </a>
              </div>
            )}
          </div>
        )}

        {/* Action Button */}
        <button 
          className={`w-full mt-4 py-2.5 rounded-xl font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] ${
            product.stock > 0 
              ? 'bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-lg'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={product.stock === 0}
        >
          {product.stock > 0 ? 'Contact Seller' : 'Out of Stock'}
        </button>
      </div>
    </div>
  );
};


  return (
    <>
      {/* FIXED: Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-20 bg-black rounded-full"
          aria-label="Open chat"
        >

          <div className="relative">
            {/* Main Button Circle */}
            <div className="w-16 h-16 bg-gradient-to-br from-black-900 via-gray-800 to-gray-700 rounded-full shadow-2xl flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-3xl">
              <MessageSquare className="w-7 h-7 text-white" strokeWidth={2} />
            </div>
            
            
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[420px] h-[650px] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 animate-slideUp">
          {/* Header */}
          <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white p-5 flex justify-between items-center flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-900 font-bold text-lg flex-shrink-0">
                  J
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-900"></span>
              </div>
              <div>
                <h3 className="font-semibold text-base">John</h3>
                <p className="text-xs text-gray-300">College Cart Assistant</p>
              </div>
            </div>
            <div className="flex gap-2 flex-shrink-0">
              <button 
                onClick={handleClearHistory}
                className="hover:bg-white/10 p-2 rounded-lg transition-colors w-8 h-8 flex items-center justify-center"
                title="Clear chat history"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/10 p-2 rounded-lg transition-colors w-8 h-8 flex items-center justify-center"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto bg-gradient-to-b from-gray-50 to-white p-4 space-y-4">
            {messages.map((message, index) => (
              <div key={index}>
                {message.type === 'product_card' ? (
                  <div className="flex justify-start animate-fadeIn">
                    <div className="space-y-3 max-w-full">
                      {message.products?.map((product, idx) => (
                        <ProductCard key={idx} product={product} />
                      ))}
                    </div>
                  </div>
                ) : (
                  <div 
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                  >
                    <div 
                      className={`max-w-[85%] group ${
                        message.sender === 'user' 
                          ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-3xl rounded-br-md' 
                          : message.isError 
                            ? 'bg-red-50 text-red-800 border border-red-200 rounded-3xl rounded-bl-md'
                            : 'bg-white text-gray-800 border border-gray-200 rounded-3xl rounded-bl-md shadow-sm'
                      } px-4 py-3`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-line break-words">
                        {message.text}
                      </p>
                      <span className={`text-[10px] mt-1 block ${
                        message.sender === 'user' ? 'text-gray-300' : 'text-gray-400'
                      }`}>
                        {new Date().toLocaleTimeString('en-US', { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          
            {isLoading && (
              <div className="flex justify-start animate-fadeIn">
                <div className="bg-white border border-gray-200 px-5 py-3 rounded-3xl rounded-bl-md shadow-sm">
                  <div className="flex space-x-2 items-center">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {messages.length <= 2 && !isLoading && <QuickActions />}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-200 flex-shrink-0">
            <div className="flex gap-2 items-end">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about products..."
                disabled={isLoading}
                className="flex-1 min-w-0 px-4 py-3 border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-gray-900 text-sm transition-all duration-200 disabled:bg-gray-50 disabled:cursor-not-allowed"
              />
              <button
                onClick={handleSendMessage}
                disabled={isLoading || !input.trim()}
                className="flex-shrink-0 bg-gradient-to-br from-gray-900 to-gray-800 text-white w-12 h-12 rounded-2xl hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 active:scale-95 flex items-center justify-center"
                aria-label="Send message"
              >
                {isLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>
            <p className="text-[10px] text-gray-400 mt-2 text-center">
              Powered by Gemini AI • Press Enter to send
            </p>
          </div>
        </div>
      )}

      {/* Custom Animations & Styles */}
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .overflow-y-auto::-webkit-scrollbar {
          width: 6px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-track {
          background: transparent;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb {
          background: #d1d5db;
          border-radius: 10px;
        }
        
        .overflow-y-auto::-webkit-scrollbar-thumb:hover {
          background: #9ca3af;
        }
      `}</style>
    </>
  );
};

export default Chatbot;

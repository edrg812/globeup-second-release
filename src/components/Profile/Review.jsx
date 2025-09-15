


import React from 'react';

// Add these styles to your existing styles
const additionalStyles = `
  @keyframes fade-in-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-fade-in-up {
    animation: fade-in-up 0.6s ease-out forwards;
    opacity: 0;
  }

  .star-rating {
    display: inline-flex;
  }
  
  .star-rating svg {
    width: 1.2rem;
    height: 1.2rem;
  }
`;

if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = additionalStyles;
  document.head.appendChild(styleSheet);
}

// Star Rating Component
const StarRating = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  
  return (
    <div className="star-rating">
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return (
            <svg key={i} className="text-yellow-400 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <svg key={i} className="text-yellow-400 fill-current" viewBox="0 0 20 20">
              <defs>
                <linearGradient id="half-star">
                  <stop offset="50%" stopColor="currentColor" />
                  <stop offset="50%" stopColor="#E5E7EB" />
                </linearGradient>
              </defs>
              <path fill="url(#half-star)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        } else {
          return (
            <svg key={i} className="text-gray-300 fill-current" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          );
        }
      })}
    </div>
  );
};

// Review Card Component
const ReviewCard = ({ review }) => {
  return (
    <div className="group flex flex-col p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm hover:shadow-xl dark:shadow-gray-900/20 dark:hover:shadow-gray-900/40 transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 hover:-translate-y-1 h-full">
      {/* Header with customer info and rating */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <div className="relative w-12 h-12 mr-4">
            <img 
              className="w-full h-full rounded-full object-cover ring-2 ring-white dark:ring-gray-800" 
              src={review.customerImage} 
              alt={`Portrait of ${review.customerName}`}
              onError={e => {
                const target = e.target;
                target.onerror = null;
                target.src = `https://placehold.co/100x100/E2E8F0/4A5568?text=${review.customerName.split(' ').map(n => n[0]).join('')}`;
              }} 
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{review.customerName}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{review.customerTitle}</p>
          </div>
        </div>
        <div className="text-sm text-gray-400 dark:text-gray-500">{review.date}</div>
      </div>
      
      {/* Rating */}
      <div className="mb-4">
        <StarRating rating={review.rating} />
      </div>
      
      {/* Review content */}
      <div className="flex-grow mb-4">
        <p className="text-gray-700 dark:text-gray-300 line-clamp-4">{review.content}</p>
      </div>
      
      {/* Product info */}
      <div className="flex items-center pt-4 border-t border-gray-100 dark:border-gray-800">
        <div className="w-10 h-10 mr-3 flex-shrink-0">
          <img 
            className="w-full h-full object-cover rounded-md" 
            src={review.productImage} 
            alt={review.productName}
            onError={e => {
              const target = e.target;
              target.onerror = null;
              target.src = `https://placehold.co/100x100/E2E8F0/4A5568?text=Product`;
            }} 
          />
        </div>
        <div className="truncate">
          <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{review.productName}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Product purchased</p>
        </div>
      </div>
    </div>
  );
};

// Sample review data
const reviews = [
  {
    id: 1,
    customerName: 'Sarah Johnson',
    customerTitle: 'Premium Reseller',
    customerImage: 'https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg',
    rating: 5,
    date: '2 days ago',
    content: 'The product quality exceeded my expectations! My customers love these items and they sell out quickly. The shipping was fast and the customer service team was incredibly helpful with my bulk order.',
    productName: 'Premium Winter Collection Bundle',
    productImage: 'https://i.pinimg.com/736x/81/d6/b1/81d6b158728f5fc97ca6e0a025fefee0.jpg'
  },
  {
    id: 2,
    customerName: 'Michael Chen',
    customerTitle: 'Boutique Owner',
    customerImage: 'https://i.pinimg.com/736x/9f/46/74/9f4674ca9c17330ab419c1b2f5951d9a.jpg',
    rating: 4.5,
    date: '1 week ago',
    content: 'Good products with consistent quality. The profit margins are healthy and my customers are satisfied. Would appreciate more variety in colors for the next season.',
    productName: 'Classic Leather Handbags',
    productImage: 'https://i.pinimg.com/736x/6f/a3/6a/6fa36aa2c367da06b2a4c8ae1cf9ee02.jpg'
  },
  {
    id: 3,
    customerName: 'Emma Rodriguez',
    customerTitle: 'Online Store Owner',
    customerImage: 'https://i.pinimg.com/736x/ce/31/42/ce3142d7a968fff3aecd0100572a5e8b.jpg',
    rating: 5,
    date: '3 days ago',
    content: 'Absolutely fantastic partnership! The dropshipping program has helped me scale my business without inventory worries. The products always arrive in perfect condition and my return rate is less than 1%.',
    productName: 'Home Decor Luxury Set',
    productImage: 'https://i.pinimg.com/736x/57/3c/80/573c80967c9429d0ed0ce32701f85b70.jpg'
  },
  {
    id: 4,
    customerName: 'David Kim',
    customerTitle: 'Fashion Retailer',
    customerImage: 'https://i.pinimg.com/736x/b0/c4/21/b0c421e77cf563962026ade82c90dd5b.jpg',
    rating: 4,
    date: '2 weeks ago',
    content: 'Solid products with good customer reception. The packaging is premium which adds value for my clients. The only drawback is the lead time for restocking popular items.',
    productName: 'Designer Sunglasses Collection',
    productImage: 'https://i.pinimg.com/1200x/c2/4e/27/c24e271f2f992fd7e62e8c1e8d9b3e2f.jpg'
  },
  {
    id: 5,
    customerName: 'Lisa Thompson',
    customerTitle: 'Gift Shop Owner',
    customerImage: 'https://i.pinimg.com/736x/8e/c1/f8/8ec1f80db272047cedf4c20263114387.jpg',
    rating: 5,
    date: '5 days ago',
    content: 'I\'ve been working with this supplier for over a year now and they never disappoint. The product quality is consistently high, and their responsive support team makes resolving any issues a breeze.',
    productName: 'Artisanal Home Fragrances',
    productImage: 'https://i.pinimg.com/1200x/08/a2/41/08a2413b771b729a9f9df20fa97be52a.jpg'
  },
  {
    id: 6,
    customerName: 'James Wilson',
    customerTitle: 'Specialty Retailer',
    customerImage: 'https://i.pinimg.com/736x/79/63/a5/7963a5246188d408b8f28961a0cf2b90.jpg',
    rating: 4.5,
    date: '3 weeks ago',
    content: 'Excellent products that align with my store\'s aesthetic. My customers appreciate the uniqueness and quality. The wholesale pricing is competitive and allows for good profit margins.',
    productName: 'Handcrafted Jewelry Set',
    productImage: 'https://i.pinimg.com/736x/8c/6d/db/8c6ddb5fe6600fcc4b183cb2ee228eb7.jpg'
  }
];

// Review Section Component
const ReviewSection = ({reviewProps}) => {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-black dark:via-gray-900 dark:to-black font-sans transition-colors overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.05)_1px,transparent_0)] dark:bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.05)_1px,transparent_0)] bg-[size:20px_20px]"></div>

      <div className="relative w-full px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
        {/* Header */}
        <div className="w-full text-center mb-16">
       
          <h6 className="text-2xl md:text-xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white bg-clip-text text-transparent mb-6">
              <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
            </svg>
            Customer Reviews
          </h6>
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            Here are some customer reviews on different products.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 w-full">
          {reviews.map((review, index) => (
            <div key={review.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-16">
          <button className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-full transition-colors duration-300 shadow-lg hover:shadow-xl">
            Read More Reviews
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReviewSection;
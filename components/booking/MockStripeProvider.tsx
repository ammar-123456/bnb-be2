// "use client";

// import React, { createContext, useContext, ReactNode } from 'react';

// // Mock Stripe Elements context
// const MockElementsContext = createContext<any>(null);

// // Mock Stripe Elements provider
// export const MockElements = ({ children }: { children: ReactNode }) => {
//   const mockElementsValue = {
//     getElement: () => ({
//       // Mock element methods
//       update: () => {},
//       focus: () => {},
//       blur: () => {},
//       clear: () => {},
//       mount: () => {},
//       unmount: () => {},
//     }),
//   };

//   return (
//     <MockElementsContext.Provider value={mockElementsValue}>
//       {children}
//     </MockElementsContext.Provider>
//   );
// };

// // Mock hooks
// export const useStripe = () => {
//   return {
//     confirmPayment: async ({ elements, redirect }: any) => {
//       console.log("Mock Stripe: confirmPayment called");
//       // Simulate successful payment
//       return {
//         paymentIntent: {
//           id: `pi_mock_${Date.now()}`,
//           status: 'succeeded',
//           amount: 1000,
//           currency: 'usd',
//         },
//         error: null
//       };
//     },
//     confirmCardPayment: async (clientSecret: string, data: any) => {
//       console.log("Mock Stripe: confirmCardPayment called");
//       return {
//         paymentIntent: {
//           id: `pi_mock_${Date.now()}`,
//           status: 'succeeded',
//           amount: 1000,
//           currency: 'usd',
//         },
//         error: null
//       };
//     },
//     createPaymentMethod: async (data: any) => {
//       console.log("Mock Stripe: createPaymentMethod called");
//       return {
//         paymentMethod: {
//           id: `pm_mock_${Date.now()}`,
//           type: 'card',
//           card: {
//             brand: 'visa',
//             last4: '4242',
//             exp_month: 12,
//             exp_year: 2025,
//           },
//         },
//         error: null
//       };
//     }
//   };
// };

// export const useElements = () => {
//   return {
//     getElement: (type: string) => ({
//       // Mock element methods
//       update: () => {},
//       focus: () => {},
//       blur: () => {},
//       clear: () => {},
//     }),
//   };
// };

// // Mock Stripe Elements components
// export const PaymentElement = ({ id, options }: any) => {
//   return (
//     <div className="mock-payment-element p-4 border rounded mb-4">
//       <div className="font-medium">Mock Payment Element</div>
//       <div className="grid grid-cols-2 gap-4 mt-2">
//         <div>
//           <label className="block text-sm font-medium mb-1">Card Number</label>
//           <input 
//             type="text" 
//             className="w-full p-2 border rounded" 
//             placeholder="4242 4242 4242 4242" 
//             disabled 
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Expiration</label>
//           <input 
//             type="text" 
//             className="w-full p-2 border rounded" 
//             placeholder="MM/YY" 
//             disabled 
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">CVC</label>
//           <input 
//             type="text" 
//             className="w-full p-2 border rounded" 
//             placeholder="123" 
//             disabled 
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">ZIP</label>
//           <input 
//             type="text" 
//             className="w-full p-2 border rounded" 
//             placeholder="12345" 
//             disabled 
//           />
//         </div>
//       </div>
//       <div className="mt-2 text-sm text-gray-500">
//         This is a mock payment form. In a real application, this would be a secure Stripe payment form.
//       </div>
//     </div>
//   );
// };

// export const AddressElement = ({ options }: any) => {
//   return (
//     <div className="mock-address-element p-4 border rounded mb-4">
//       <div className="font-medium">Mock Address Element</div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
//         <div>
//           <label className="block text-sm font-medium mb-1">Address Line 1</label>
//           <input 
//             type="text" 
//             className="w-full p-2 border rounded" 
//             placeholder="123 Main St" 
//             disabled 
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Address Line 2</label>
//           <input 
//             type="text" 
//             className="w-full p-2 border rounded" 
//             placeholder="Apt 4B" 
//             disabled 
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">City</label>
//           <input 
//             type="text" 
//             className="w-full p-2 border rounded" 
//             placeholder="New York" 
//             disabled 
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">State</label>
//           <input 
//             type="text" 
//             className="w-full p-2 border rounded" 
//             placeholder="NY" 
//             disabled 
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">ZIP</label>
//           <input 
//             type="text" 
//             className="w-full p-2 border rounded" 
//             placeholder="10001" 
//             disabled 
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium mb-1">Country</label>
//           <input 
//             type="text" 
//             className="w-full p-2 border rounded" 
//             placeholder="United States" 
//             disabled 
//           />
//         </div>
//       </div>
//       <div className="mt-2 text-sm text-gray-500">
//         This is a mock address form. In a real application, this would be a Stripe address collection form.
//       </div>
//     </div>
//   );
// };

// // Mock Stripe Elements provider component
// export const Elements = ({ options, children }: { options: any, children: ReactNode }) => {
//   return <MockElements>{children}</MockElements>;
// };

// // Mock CardElement
// export const CardElement = () => {
//   return (
//     <div className="mock-card-element p-4 border rounded mb-4">
//       <div className="font-medium">Mock Card Element</div>
//       <div className="grid grid-cols-1 gap-4 mt-2">
//         <input 
//           type="text" 
//           className="w-full p-2 border rounded" 
//           placeholder="4242 4242 4242 4242" 
//           disabled 
//         />
//       </div>
//       <div className="mt-2 text-sm text-gray-500">
//         This is a mock card input. In a real application, this would be a secure Stripe card input.
//       </div>
//     </div>
//   );
// };






"use client";

import React, { createContext, useContext, ReactNode } from 'react';

// Mock Stripe Elements context
const MockElementsContext = createContext<any>(null);

// Mock Stripe Elements provider
export const MockElements = ({ children }: { children: ReactNode }) => {
  const mockElementsValue = {
    getElement: () => ({
      // Mock element methods
      update: () => {},
      focus: () => {},
      blur: () => {},
      clear: () => {},
      mount: () => {},
      unmount: () => {},
    }),
  };

  return (
    <MockElementsContext.Provider value={mockElementsValue}>
      {children}
    </MockElementsContext.Provider>
  );
};

// Mock hooks
export const useStripe = () => {
  return {
    confirmPayment: async ({ elements, redirect }: any) => {
      console.log("Mock Stripe: confirmPayment called");
      // Simulate successful payment
      return {
        paymentIntent: {
          id: `pi_mock_${Date.now()}`,
          status: 'succeeded',
          amount: 1000,
          currency: 'usd',
        },
        error: null
      };
    },
    confirmCardPayment: async (clientSecret: string, data: any) => {
      console.log("Mock Stripe: confirmCardPayment called");
      return {
        paymentIntent: {
          id: `pi_mock_${Date.now()}`,
          status: 'succeeded',
          amount: 1000,
          currency: 'usd',
        },
        error: null
      };
    },
    createPaymentMethod: async (data: any) => {
      console.log("Mock Stripe: createPaymentMethod called");
      return {
        paymentMethod: {
          id: `pm_mock_${Date.now()}`,
          type: 'card',
          card: {
            brand: 'visa',
            last4: '4242',
            exp_month: 12,
            exp_year: 2025,
          },
        },
        error: null
      };
    }
  };
};

export const useElements = () => {
  return {
    getElement: (type: string) => ({
      // Mock element methods
      update: () => {},
      focus: () => {},
      blur: () => {},
      clear: () => {},
    }),
  };
};

// Mock Stripe Elements components
export const PaymentElement = ({ id, options }: any) => {
  return (
    <div className="mock-payment-element p-4 border rounded mb-4">
      <div className="font-medium">Mock Payment Element</div>
      <div className="grid grid-cols-2 gap-4 mt-2">
        <div>
          <label className="block text-sm font-medium mb-1">Card Number</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            placeholder="4242 4242 4242 4242" 
            disabled 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Expiration</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            placeholder="MM/YY" 
            disabled 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">CVC</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            placeholder="123" 
            disabled 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">ZIP</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            placeholder="12345" 
            disabled 
          />
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        This is a mock payment form. In a real application, this would be a secure Stripe payment form.
      </div>
    </div>
  );
};

export const AddressElement = ({ options }: any) => {
  return (
    <div className="mock-address-element p-4 border rounded mb-4">
      <div className="font-medium">Mock Address Element</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
        <div>
          <label className="block text-sm font-medium mb-1">Address Line 1</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            placeholder="123 Main St" 
            disabled 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Address Line 2</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            placeholder="Apt 4B" 
            disabled 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">City</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            placeholder="New York" 
            disabled 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">State</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            placeholder="NY" 
            disabled 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">ZIP</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            placeholder="10001" 
            disabled 
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Country</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded" 
            placeholder="United States" 
            disabled 
          />
        </div>
      </div>
      <div className="mt-2 text-sm text-gray-500">
        This is a mock address form. In a real application, this would be a Stripe address collection form.
      </div>
    </div>
  );
};

// Mock Stripe Elements provider component
export const Elements = ({ options, children }: { options: any, children: ReactNode }) => {
  return <MockElements>{children}</MockElements>;
};

// Mock CardElement
export const CardElement = () => {
  return (
    <div className="mock-card-element p-4 border rounded mb-4">
      <div className="font-medium">Mock Card Element</div>
      <div className="grid grid-cols-1 gap-4 mt-2">
        <input 
          type="text" 
          className="w-full p-2 border rounded" 
          placeholder="4242 4242 4242 4242" 
          disabled 
        />
      </div>
      <div className="mt-2 text-sm text-gray-500">
        This is a mock card input. In a real application, this would be a secure Stripe card input.
      </div>
    </div>
  );
};

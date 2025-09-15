import React from 'react';

const TermsAndConditions = () => {
  return (
    <div className="flex items-start space-x-2">
      <input type="checkbox" id="terms" className="mt-1" />
      <label htmlFor="terms" className="text-xs text-gray-600">
        I agree to the{" "}
        <a href="#" className="text-pink-600 hover:underline">
          Terms & Conditions
        </a>
        ,
        <a href="#" className="text-pink-600 hover:underline">
          {" "}
          Privacy Policy
        </a>{" "}
        and
        <a href="#" className="text-pink-600 hover:underline">
          {" "}
          Refund Policy
        </a>{" "}
        of GlobeUp.
      </label>
    </div>
  );
};

export default TermsAndConditions;

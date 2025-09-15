
import { useState } from 'react';

const SMTP_MailConfiguration = () => {
  const [formData, setFormData] = useState({
    mail_mailer: 'smtp',
    mail_host: 'mail.lolona.shop',
    mail_port: '465',
    mail_username: 'hello@lolona.shop',
    mail_password: '12345678',
    mail_encryption: 'ssl',
    mail_from_address: 'hello@lolona.shop',
    mail_from_name: 'lolona.shop'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    // e.preventDefault();
    // here we should handle the for submission 
  };

  return (
    <div className="bg-purple-50 min-h-screen py-8 px-4">
      <div className="container mx-auto">
        <h1 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8">SMTP Mail Configuration</h1>
        <div className="bg-white p-6 md:p-8 rounded-lg shadow-md max-w-2xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="mail_mailer">
                MAIL MAILER
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                id="mail_mailer"
                name="mail_mailer"
                type="text"
                value={formData.mail_mailer}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="mail_host">
                MAIL HOST
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                id="mail_host"
                name="mail_host"
                type="text"
                value={formData.mail_host}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="mail_port">
                MAIL PORT
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                id="mail_port"
                name="mail_port"
                type="text"
                value={formData.mail_port}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="mail_username">
                MAIL USERNAME
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                id="mail_username"
                name="mail_username"
                type="email"
                value={formData.mail_username}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="mail_password">
                MAIL PASSWORD
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                id="mail_password"
                name="mail_password"
                type="password"
                value={formData.mail_password}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="mail_encryption">
                MAIL ENCRYPTION
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                id="mail_encryption"
                name="mail_encryption"
                type="text"
                value={formData.mail_encryption}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="mail_from_address">
                MAIL FROM ADDRESS
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                id="mail_from_address"
                name="mail_from_address"
                type="email"
                value={formData.mail_from_address}
                onChange={handleChange}
              />
            </div>
            
            <div className="mb-2">
              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="mail_from_name">
                MAIL FROM NAME
              </label>
              <input
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent"
                id="mail_from_name"
                name="mail_from_name"
                type="text"
                value={formData.mail_from_name}
                onChange={handleChange}
              />
            </div>
            
            <button
              className="w-full bg-purple-600 text-white font-bold py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-colors duration-200"
              type="submit"
            >
              Save Configuration
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SMTP_MailConfiguration;
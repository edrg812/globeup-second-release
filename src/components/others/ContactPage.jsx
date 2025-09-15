
export default function ContactPage() {
  return (
    <>
      <section className="py-6 dark:bg-gray-700 bg-gray-700 dark:text-gray-900 text-gray-900">
        <center><h1 className = "text-3xl"><b>Contact With Us</b></h1></center>
        <div className="grid max-w-6xl grid-cols-1 px-6 mx-auto lg:px-8 md:grid-cols-2 md:divide-x">
          <div className="py-6 md:py-0 md:px-6">
            <h1 className="text-2xl font-bold">Get in touch</h1>
            <p className="pt-2 pb-4">Fill in the form to start a conversation</p>
            <div className="space-y-4">
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"></path>
                </svg>
                <span>Khulna Sador, Khulna</span>
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>01893476370</span>
              </p>
              <p className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5 mr-2 sm:mr-6">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span>dev.morsalin@gmalil.com</span>
              </p>
            </div>

            <div className="flex justify-start space-x-3 pt-3">
              <div className="w-3/5 h-50">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d117658.93068354944!2d89.44986348953704!3d22.845349749461903!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39ff9071cb47152f%3A0xf04b212290718952!2sKhulna!5e0!3m2!1sen!2sbd!4v1753352067056!5m2!1sen!2sbd"
                  className="w-full h-full rounded-md shadow"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>

          </div>
          <form noValidate="" className="flex flex-col py-6 space-y-6 md:py-0 md:px-6">
            <label className="block">
              <span className="mb-1">Full name</span>
              <input  type="text" placeholder="Enter your full name" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 focus:ring-violet-600 dark:bg-gray-500 bg-gray-500 p-3" />
            </label>
            <label className="block">
              <span className="mb-1">Email address</span>
              <input type="email" placeholder="dev.morsalin@gmail.com" className="block w-full rounded-md shadow-sm focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100 bg-gray-400  focus:ring-violet-600 hover:ring-violet-600 p-3" />
            </label>
            <label className="block">
              <span className="mb-1">Message</span>
              <textarea rows="3" className="block w-full rounded-md focus:ring focus:ring-opacity-75 focus:dark:ring-violet-600 dark:bg-gray-100 bg-gray-400  focus:ring-violet-600 hover:ring-violet-600 p-5"></textarea>
            </label>
            <button  type="button" className="self-center  px-5 py-3 text-lg rounded focus:ring hover:ring focus:ring-opacity-75 dark:bg-violet-600 bg-violet-600  hover:bg-violet-800 dark:text-gray-50 focus:dark:ring-violet-600 focus:ring-violet-800 hover:ring-violet-700 hover:dark:ring-violet-600">Submit</button>
          </form>
        </div>
      </section>
    </>
  );
}
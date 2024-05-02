import React from "react";
import Header from "../layout/header";
import Footer from "../layout/footer";
import Layout from "../layout/layout";

const Contact = () => {
  return (
    <div>
      <Layout title={"Contact Us | Ecommerce"}>
        <div className="container  flex flex-wrap mb-4 justify-center  mx-auto rounded-xl p-5  border border-gray-800  mt-10">
          {" "}
          <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md ">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 ">
              Contact Us
            </h2>
            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500  sm:text-xl">
              Got a technical issue? Want to send feedback about a beta feature?
              Need details about our Business plan? Let us know.
            </p>
            <form action="#" className="space-y-8">
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5    "
                  placeholder="name@email.com"
                  required=""
                />
              </div>
              <div>
                <label
                  htmlFor="subject"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5    "
                  placeholder="Let us know how we can help you"
                  required=""
                />
              </div>
              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Your message
                </label>
                <textarea
                  id="message"
                  rows={6}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5    "
                  placeholder="Leave a comment..."
                  defaultValue={""}
                />
              </div>
              <button
                type="submit"
                className="py-3 border border:rounded-lg border-black px-5 text-sm font-medium text-center text-black rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Send message
              </button>
              {/* <button>Send</button> */}
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
};
Layout.defaultProps = {
  title: "Contact Us",
  description: "Ecommerce Store",
  keywords: "Ecommerce Store",
};

export default Contact;

import { ResponsiveContainer } from "recharts";
import Header from "../common/Header";
import { motion } from "framer-motion";

const LazyLoading = () => {
  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="On Demand Load" />
      <main className="max-w-7xl mx-auto py-6 mt-8 px-4 lg:px-8">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-full h-auto">
            <ResponsiveContainer>
              <h1 className="text-xl"> This is Lazy Loading Page!</h1>

              <div className="py-4 px-5 m-2">
                <p className="font-semibold text-lg pt-2 pb-1">
                  1. What is Lazy Loading?
                </p>
                <p className="font-light text-sm pb-2.5">
                  Lazy Loading in React is used to initially load and render
                  limited data on the webpage. It helps to optimize the
                  performance of React applications. The data is only rendered
                  when visited or scrolled it can be images, scripts, etc. Lazy
                  loading helps to load the web page quickly and presents the
                  limited content to the user that is needed for the interaction
                  lazy loading can be more helpful in applications that have
                  high-resolution images or data that alters the loading time of
                  the application <br /> In React, Lazy loading is a technique
                  that allows you to load components, modules, or assets
                  asynchronously, improving the loading time of your
                  application. It can be achieved by using the built-in
                  React.lazy() method and Suspense component.
                </p>

                <p className="font-semibold text-lg pt-1 pb-1">
                  2. How Lazy Loading works?
                </p>
                <p className="font-light text-sm pb-2.5 ">
                  {" "}
                  - Lazy loading defers the loading of components until they are
                  needed. <br />
                  - This reduces the amount of code that needs to be loaded at
                  once. <br />- It can help improve the performance of React
                  applications.
                </p>

                <p className="font-semibold text-lg pt-1 pb-1">
                  3. Benefits of Lazy Loading ?
                </p>
                <p className="font-light text-sm pb-2.5 ">
                  - Reduces the initial load time <br />
                  - Reduces browser workload <br />- Improves application
                  performance in low bandwidth situations <br />
                  - Optimizes resource usage <br />- Ensures that the app
                  remains responsive and fast, even as it scales
                </p>

                <p className="font-semibold text-lg pt-1 pb-1">
                  4. When to use it{" "}
                </p>
                <p className="font-light text-sm pb-2.5 ">
                  - When certain code or features will not be accessible to all
                  users <br />- When a user does not access code or features
                  frequently <br />- When an application has huge content
                </p>

                <p className="font-semibold text-lg pt-1 pb-1">5. Approach</p>
                <p className="font-light text-sm pb-2.5 ">
                  -Firstly, Recognize the component you want to Lazy Load. These
                  are mostly Large or complex which is not necessary for all the
                  users when the page loads. <br />- Import the lazy() and
                  Suspense components from the React package <br />
                  - Use the lazy() function to dynamically import the component
                  you want to lazy load: Note that the argument to the lazy()
                  function should be a function that returns the result of the
                  import() function. <br />- Wrap the lazy-loaded component in a
                  Suspense component, which will display a fallback UI while the
                  component is being loaded:
                </p>
              </div>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default LazyLoading;

import React, { useEffect, useState } from "react";

const VendorsDetails = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 8; // data item per page

  const getVendorDetails = async () => {
    try {
      const response = await fetch(`https://dummyjson.com/users?&limit=71`);
      const jsonData = await response.json();
      console.log(jsonData);
      setData(jsonData.users);
    } catch (error) {
      console.error("Error fetching vendor details:", error);
    }
  };

  useEffect(() => {
    getVendorDetails();
  }, [currentPage]);

  const totalVendors = data.length;
  const noOfPages = Math.ceil(totalVendors / PAGE_SIZE);

  // pagination page starting and ending data
  const start = currentPage * PAGE_SIZE - PAGE_SIZE; // bcz of zero index
  const end = start + PAGE_SIZE;

  const pageChangeHandler = (selectedPage) => {
    if (
      selectedPage >= 1 &&
      selectedPage <= noOfPages &&
      selectedPage !== currentPage
    ) {
      setCurrentPage(selectedPage);
    }
  };

  const handlePrev = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Company
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Point of Contact
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                POC Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Deal Amount
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {data.length > 0 ? (
              data.slice(start, end).map((curItem) => (
                <tr key={curItem.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100">
                    {curItem.company.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-300">
                      {curItem.firstName}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold text-blue-100">
                      {curItem.email}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold text-blue-100">
                      {curItem.phone}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold text-blue-100">
                      $ {curItem.address.postalCode}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-400">
                  Loading data...
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination btn */}
      {data.length > 0 && (
        <div className=" flex pt-3 mt-3 justify-center gap-1">
          <button
            disabled={currentPage === 1}
            onClick={handlePrev}
            className={`cursor-pointer ${currentPage > 1 ? "" : "opacity-0"}`}
          >
            ⏪
          </button>

          <div className="py-1 px-1 m-1">
            {" "}
            {[...Array(noOfPages)].map((_, i) => {
              return (
                <span
                  key={i}
                  className={`p-1 m-1 hover:bg-slate-900 rounded-2xl cursor-pointer ${
                    i === currentPage - 1
                      ? "bg-slate-950 rounded-2xl text-amber-100 font-bold"
                      : "bg-transparent"
                  } `}
                  onClick={() => pageChangeHandler(i + 1)}
                >
                  {i + 1}
                </span>
              );
            })}{" "}
          </div>

          <button
            disabled={currentPage === noOfPages}
            onClick={handleNext}
            className={`cursor-pointer ${
              currentPage < noOfPages ? "" : "opacity-0"
            }`}
          >
            ⏩
          </button>
        </div>
      )}
      <div className="justify-center text-center text-xs text-slate-400 ">
        page : {currentPage}
      </div>
    </div>
  );
};

export default VendorsDetails;

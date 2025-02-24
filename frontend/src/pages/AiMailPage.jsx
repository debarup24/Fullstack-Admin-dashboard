import React, { useState } from "react";

import { motion } from "framer-motion";
import { ResponsiveContainer } from "recharts";
import Header from "../components/common/Header";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { toast } from "react-toastify";
import axios from "axios";

const AiMail = () => {
  const [recipientEmail, setRecipientEmail] = useState("");
  const [emailSubject, setEmailSubject] = useState("");
  const [generatedEmailBody, setGeneratedEmailBody] = useState("");
  const [isMailDelivered, setIsMailDelivered] = useState(false);
  const [loading, setLoading] = useState(false);

  const { backendUrl, userData } = useContext(AppContext);

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault();

      axios.defaults.withCredentials = true;

      if (!userData) {
        toast.success("Please Login..");
      } else {
        setLoading(true);

        const { data } = await axios.post(
          backendUrl + "/api/email/send-ai-email",
          {
            recipientEmail,
            emailSubject,
            generatedEmailBody,
          }
        );

        if (data.success) {
          toast.success(data.message);
          setIsMailDelivered(true);
          setRecipientEmail("");
          setEmailSubject("");
          setGeneratedEmailBody("");
          setLoading(false);
        } else {
          //alert (data.message)
          toast.error(data.message);
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error(error.message);
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <Header title="Send Mail" />

      <main className="max-w-4xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-full h-auto">
            <ResponsiveContainer>
              <h1 className="text-xl">Mail Box</h1>

              <div className="py-5">
                <form onSubmit={onSubmitHandler}>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Recipients
                    </label>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-xl bg-[#333A5C]">
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="john@example.com"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-xl bg-[#333A5C]">
                      <input
                        type="text"
                        value={emailSubject}
                        onChange={(e) => setEmailSubject(e.target.value)}
                        placeholder="Enter Mail Subject"
                        className="w-full bg-transparent outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Email Body
                    </label>
                    <div className="mb-4 flex items-center gap-3 w-full px-5 py-2.5 rounded-xl bg-[#333A5C]">
                      <textarea
                        value={generatedEmailBody}
                        onChange={(e) => setGeneratedEmailBody(e.target.value)}
                        placeholder="Enter your email here..."
                        className="w-full min-h-64 overflow-y-scroll no-scrollbar outline-none"
                      />
                    </div>
                    {loading ? (
                      <button className="p-3 m-1 bg-gray-700 font-semibold rounded-lg cursor-pointer text-gray-400 px-4">
                        Sending...
                      </button>
                    ) : (
                      <button className="p-3 m-1 bg-gray-700 font-semibold rounded-lg cursor-pointer px-4">
                        Send Email
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AiMail;

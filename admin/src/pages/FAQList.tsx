import { useEffect, useState } from "react";
import axios from "axios";
import { FAQ, FAQTranslation } from "@/lib/types";

const FaqList = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [languageFilter, setLanguageFilter] = useState<string>("en");
  const [loading, setLoading] = useState<boolean>(false);
  const [viewFaqId, setViewFaqId] = useState<string | null>(null);
  const [faqVariants, setFaqVariants] = useState<FAQTranslation[]>([]);

  useEffect(() => {
    const fetchFaqs = async () => {
      setLoading(true);
      try {
        const res = await axios.get<{ data: FAQ[] }>("/api/faq", {
          params: { lang: languageFilter },
        });
        setFaqs(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, [languageFilter]);

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/faq/${id}`);
      setFaqs(faqs.filter((faq) => faq.id !== id));
    } catch (err) {
      console.error("Error deleting FAQ", err);
    }
  };

  const handleViewVariants = async (faqId: string) => {
    try {
      const res = await axios.get(`/api/faq/${faqId}`);
      setFaqVariants(res.data.data || []);
      setViewFaqId(faqId);
    } catch (err) {
      console.error("Error fetching FAQ variants", err);
    }
  };

  const handleCloseVariants = () => {
    setViewFaqId(null);
    setFaqVariants([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">
          Admin Panel - FAQs
        </h2>

        <div className="flex justify-between items-center mb-6">
          <div>
            <label htmlFor="lang" className="text-lg text-gray-700">
              Filter by Language
            </label>
            <select
              id="lang"
              className="ml-2 px-4 py-2 border border-gray-300 rounded-md"
              value={languageFilter}
              onChange={(e) => setLanguageFilter(e.target.value)}
            >
              <option value="en">All</option>
              <option value="hi">Hindi</option>
              <option value="bn">Bengali</option>
            </select>
          </div>
        </div>

        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <ul className="space-y-4">
            {faqs.map((faq) => (
              <li
                key={faq.id}
                className="bg-gray-50 p-4 rounded-lg shadow-md flex justify-between items-start"
              >
                <div>
                  <strong className="text-xl font-semibold">
                    {faq.question}
                  </strong>
                  <div
                    className="text-gray-700 mt-2"
                    dangerouslySetInnerHTML={{ __html: faq.answer }} // Render HTML directly
                  />
                  <div className="mt-2">
                    <button
                      onClick={() => handleDelete(faq.id)}
                      className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleViewVariants(faq.id)}
                      className="ml-3 bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700"
                    >
                      View All Variants
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* View All Variants Modal */}
      {viewFaqId && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-2xl w-full space-y-4 overflow-auto">
            <h3 className="text-2xl font-semibold text-center mb-4">
              FAQ Variants
            </h3>

            {/* Loop through the FAQ variants */}
            <div className="space-y-6">
              {faqVariants.map((variant) => (
                <div key={variant.language} className="space-y-2">
                  <h4 className="text-xl font-semibold text-gray-800">
                    {variant.language}
                  </h4>
                  <h5 className="text-lg text-gray-600">{variant.question}</h5>

                  <div
                    className="text-gray-700 mt-2"
                    dangerouslySetInnerHTML={{ __html: variant.answer }} // Render HTML directly
                  />
                </div>
              ))}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleCloseVariants}
                className="mt-4 bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FaqList;

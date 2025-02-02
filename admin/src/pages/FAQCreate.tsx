import { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const FAQCreate = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const faqData = {
      question,
      answer
    };

    try {
      await axios.post("/api/faq", faqData);
      alert("FAQ created successfully!");
    } catch (err) {
      console.error("Error creating FAQ", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Create FAQ</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="question" className="text-lg text-gray-700">Question</label>
            <input
              id="question"
              type="text"
              className="w-full p-2 border border-gray-300 rounded-md mt-2"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="answer" className="text-lg text-gray-700">Answer</label>
            <ReactQuill
              value={answer}
              onChange={setAnswer}
              modules={{
                toolbar: [
                  [{ header: "1" }, { header: "2" }, { font: [] }],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["bold", "italic", "underline", "strike"],
                  ["link", "image"],
                  [{ align: [] }],
                ],
              }}
              formats={[
                "header",
                "font",
                "align",
                "list",
                "bullet",
                "bold",
                "italic",
                "underline",
                "strike",
                "link",
                "image",
              ]}
              placeholder="Write the answer here..."
            />
          </div>

          <button
            type="submit"
            className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700"
            disabled={loading}
          >
            {loading ? "Creating..." : "Create FAQ"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default FAQCreate;

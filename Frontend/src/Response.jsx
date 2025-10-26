import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import "./App.css";
import { useNavigate } from "react-router-dom";

function Response() {
  const navigate = useNavigate();

  const [code, setCode] = useState(`function sum() {
  return 1 + 1;
}`);
  const [review, setReview] = useState("");
  const [isReviewing, setIsReviewing] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, []);

  async function reviewCode() {
    try {
      const token = localStorage.getItem("Token");
      if(!token) throw new Error("User not logged in");

      setIsReviewing(true);

      const response = await axios.post("http://localhost:3000/get/ai/response", { code }, {
        headers : {
            Authorization : `Bearer ${token}`
        }
      });
      const formatted = response.data.result.replace(/\n\n/g, "\n");
      setReview(formatted);

      const decoded = jwtDecode(token);
      const userId = decoded.userId;

      await axios.post("http://localhost:3000/conversation/save", {
        userId,
        code,
        aiResponse : formatted
      }, {
        headers : {
            Authorization : `Bearer ${token}`
        }
      });

    } catch (err) {
      setReview("⚠️ Error fetching review.");
    } finally {
      setIsReviewing(false);
    }
  }

  return (
    <main className="bg-gray-900 min-h-screen text-white flex flex-col">
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 shadow-md border-b border-gray-700"
      >
        <h1 className="text-cyan-400 text-2xl font-bold">Code Reviewer</h1>
        <nav className="flex gap-6 text-gray-300">
          <button 
            className="hover:text-cyan-400 transition"
            onClick = {() => navigate("/conversations") }
          >
          Conversations</button>
        </nav>
      </motion.header>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden">
        <div className="w-full lg:w-1/2 p-6 flex flex-col gap-4">
          <h2 className="text-xl font-semibold mb-2 text-cyan-300">Your Code</h2>

          <div className="flex-1 bg-gray-800 rounded-lg border border-gray-700 p-2 shadow-lg">
            <Editor
              value={code}
              onValueChange={(code) => setCode(code)}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={12}
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 16,
                color: "white",
                height: "50vh",
              }}
            />
          </div>

          <motion.button
            onClick={reviewCode}
            whileTap={{ scale: 0.95 }}
            className={`mt-4 px-6 py-2 rounded-lg text-white font-semibold transition-all duration-300 ${
              isReviewing
                ? "bg-green-600 cursor-not-allowed"
                : "bg-cyan-600 hover:bg-cyan-700"
            }`}
            disabled={isReviewing}
          >
            {isReviewing ? "Reviewing..." : "Review Code"}
          </motion.button>
        </div>

        <div className="w-full lg:w-1/2 p-8 bg-gray-850 overflow-y-auto border-l border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-cyan-300">AI Feedback</h2>
          <div
            className="bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700 min-h-[60vh] text-gray-100"
            style={{
              lineHeight: "1.8",
              fontSize: "1.05rem",
              letterSpacing: "0.2px",
            }}
          >
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Response;
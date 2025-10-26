import { useState } from "react";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

function Conversations() {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchConversations() {
            try {
                const token = localStorage.getItem("Token");
                if(!token) throw new Error("No token found");

                const decoded = jwtDecode(token);
                const userId = decoded.userId;

                const response = await axios.get(`http://localhost:3000/all/conversations/${userId}`, {
                    headers : { Authorization : `Bearer ${token}` }
                });

                setConversations(response.data.allConversations);
            } catch(error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchConversations();
    }, []);

    if(loading) {
        return (
          <div className="flex justify-center items-center min-h-screen bg-gray-950 text-white text-xl">
            Loading Conversations ...
          </div>
        );
    }
    
    return (
        <main className="bg-gray-900 min-h-screen text-white flex flex-col">
          <header className="w-full flex items-center justify-between px-6 py-4 bg-gray-800 shadow-md border-b border-gray-700">
            <h1 className="text-cyan-400 text-2xl font-bold">Your Past Conversations</h1>
          </header>

          <div className="flex-1 p-8 overflow-y-auto">
            {conversations.length === 0 ? (
              <p className="text-center text-gray-400 text-lg">
                No saved conversations yet.
              </p>
            ) : (
              <div className="w-full">
                {conversations.map((c, i) => (
                  <div
                    key={i}
                    className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg mb-8"
                  >
                    <h3 className="text-lg font-semibold text-cyan-300 mb-2">👨‍💻 Your Code:</h3>
                    <pre className="bg-gray-900 p-4 rounded-lg overflow-x-auto text-sm text-gray-200 mb-6">
                      {c.code}
                    </pre>
    
                    <h3 className="text-lg font-semibold text-green-400 mb-2">🤖 AI Response:</h3>
                    <div
                      className="bg-gray-900 rounded-xl p-6 border border-gray-700 text-gray-100"
                      style={{
                        lineHeight: "1.8",
                        fontSize: "1.05rem",
                        letterSpacing: "0.2px",
                      }}
                    >
                      <Markdown rehypePlugins={[rehypeHighlight]}>
                        {c.aiResponse}
                      </Markdown>
                    </div>
    
                    <p className="text-right text-xs text-gray-500 mt-4">
                      {new Date(c.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
    );
}

export default Conversations;
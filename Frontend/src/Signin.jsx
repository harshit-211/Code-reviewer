import './App.css';
import { motion } from "framer-motion";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ isSubmitted, setIsSubmitted ] = useState(false);
    const navigate = useNavigate();

    function handleSubmit() {
        if(!email || !password) {
            toast.error("Please enter the details", {
                position : "top-center"
            });
            return;
        }
        axios.post("http://localhost:3000/signin", { username : email, password : password })
        .then((res) => {
            localStorage.setItem("Token", res.data.Token);
            
            setIsSubmitted(true);
            toast.success(res.data.message,{
                position : "top-center",
                duration : 2000
            });

            setTimeout(() => {
                navigate("/response");
            },1000)
        })
        .catch((err) => {
            if(err.response) {
                toast.error(err.response.data.message, {
                    position : "top-center",
                    duration : 2000
                });
            }
        });
    }
    
    function Navigate() {
        navigate("/");
    }

    return (
        <div className="bg-gray-900 min-h-screen flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-cyan-300 text-3xl font-bold">Code Reviewer</h1>
            </motion.div>
      
            <motion.div
              initial={{ opacity: 0, x: 500 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.75 }}
            >
              <h1 className="text-white text-5xl font-bold mt-12">Sign Up</h1>
              <p className="text-gray-500 text-lg mt-3">Please signin below</p>
            </motion.div>
      
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="text-white mt-5 text-xl"
            >
              Didn't have an account?
              <Button onClick={Navigate} variant="link" className="text-white text-xl cursor-pointer ml-4">
                Sign up
              </Button>
            </motion.div>
      
            <motion.div
              initial={{ opacity: 0, y: -500 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.75 }}
              className="text-white mt-10 flex flex-col items-center gap-4"
            >
              <Input
                className="max-w-sm h-12 border-gray-700 bg-gray-800 text-white"
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={isSubmitted}
              />
              <Input
                className="max-w-sm h-12 border-gray-700 bg-gray-800 text-white"
                type="password"
                id="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={isSubmitted}
              />
            </motion.div>
      
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.5 }}
              className="mt-10"
            >
              <Button
                onClick={handleSubmit}
                variant="secondary"
                className="cursor-pointer text-cyan-900 w-30"
                disabled={isSubmitted}
              >
                {isSubmitted ? "Submitted!" : "Submit"}
              </Button>
            </motion.div>
          </div>
        </div>
    );      
}

export default Signup;
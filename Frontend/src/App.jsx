import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Response from "./Response";
import Signup from "./Signup";
import Signin from "./Signin";
import Conversations from "./Conversations";
import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <>
      <Toaster />
        <Router>
          <Routes>
            <Route path = "/" element = {<Signup />} />
            <Route path = "/signin" element = {<Signin />} />
            <Route path = "/response" element = {<Response />} />
            <Route path = "/conversations" element = {<Conversations />} />
          </Routes>
        </Router>
    </>
  )
}

export default App;
import Navbar from "./components/Navbar";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Signup.jsx";
import PostDetail from "./pages/PostDetail.jsx";
import WritePost from "./pages/WritePost.jsx";
import AdminPage from "./pages/AdminPage.jsx";
import MyPage from "./pages/MyPage.jsx";



function App() {
    return(
        <BrowserRouter>
            <Navbar />

            <div className="pt-16 min-h-screen bg-gray-50">
                <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/write" element={<WritePost />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route path="/admin" element={<AdminPage />} />
                    <Route path="/mypage/:username" element={<MyPage />} />
                </Routes>
                </div>
        </BrowserRouter>
  )
}

export default App

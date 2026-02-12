// src/components/Navbar.jsx
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getUserInfo } from "../util/jwtUtils"; // 👈 방금 만든 유틸 임포트

export default function Navbar() {
    const navigate = useNavigate();
    const [user, setUser] = useState();

    // 페이지 로드 시 토큰 확인
    useEffect(() => {
        const userInfo = getUserInfo();
        setUser(userInfo);
    }, []);

    function handleLogout() {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        setUser(null);
        alert("Logged out!");
        navigate("/");
        window.location.reload();
    }

    return (
        <nav className="bg-white border-b border-gray-200 fixed w-full z-20 top-0 h-16">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <Link to="/" className="text-2xl font-bold text-blue-600">MyCommunity</Link>

                <div className="flex gap-3 items-center">
                    {user ? (
                        <>
                            {/* 🔥 관리자(ADMIN)일 때만 보이는 버튼 */}
                            {(user.role === 'ROLE_ADMIN' || user.role === 'ADMIN') && (
                                <Link to="/admin" className="text-red-600 border border-red-200 bg-red-50 px-3 py-2 rounded text-sm font-bold hover:bg-red-100">
                                    🛡️ Admin
                                </Link>
                            )}

                            {/* 👤 마이페이지 아이콘 (유저네임 클릭 시 이동) */}
                            <Link to={`/mypage/${user.sub}`} className="flex items-center gap-2 hover:bg-gray-100 p-2 rounded">
                                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">👤</div>
                                <span className="font-medium">{user.sub}</span>
                            </Link>

                            <button onClick={handleLogout} className="text-gray-500 hover:text-black text-sm">Log Out</button>
                        </>
                    ) : (
                        <div className="flex gap-2">
                            <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded text-sm">Login</Link>
                            <Link to="/signup" className="text-blue-600 border border-blue-600 px-4 py-2 rounded text-sm">Sign up</Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
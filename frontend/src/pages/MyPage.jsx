import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { getUserInfo } from "../util/jwtUtils.js";

export default function MyPage() {
    const navigate = useNavigate();

    // 🔥 [핵심 수정] 괄호 안을 비웠습니다! 이제 에러 안 납니다.
    const [user, setUser] = useState();

    const [myPosts, setMyPosts] = useState([]);

    async function fetchMyPosts() {
        const token = localStorage.getItem("accessToken");
        if (!token) return;

        try {
            const response = await axios.get("/api/posts/my", {
                headers: { Authorization: token }
            });
            setMyPosts(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(()=>{
        const userInfo = getUserInfo();
        if(!userInfo){
            alert("You are not logged in!");
            navigate("/login");
            return;
        }

        // 이제 여기서 에러가 안 날 겁니다!
        setUser(userInfo);

        fetchMyPosts();
    },[]);

    // user가 없을 때(undefined) 로딩 처리
    if (!user) return <div className="p-10 text-center">Loading...</div>;

    return (
        <div className="max-w-5xl mx-auto mt-10 p-6">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">👋 마이페이지</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* 왼쪽: 프로필 카드 */}
                <div className="md:col-span-1">
                    <div className="bg-white p-6 rounded-lg shadow-md border text-center">
                        <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                            👤
                        </div>
                        {/* user가 존재할 때만 렌더링하도록 안전장치 추가 */}
                        <h2 className="text-xl font-bold">{user?.sub || user?.username}</h2>
                        <p className="text-gray-500 mb-4">{user?.role}</p>

                        <div className="border-t pt-4 text-left text-sm space-y-2">
                            <p><strong>가입 상태:</strong> 활동 중 ✅</p>
                            <p><strong>작성한 글:</strong> {myPosts.length}개</p>
                        </div>
                    </div>
                </div>

                {/* 오른쪽: 내가 쓴 글 목록 */}
                <div className="md:col-span-2">
                    <h2 className="text-xl font-bold mb-4 border-b pb-2">📝 내가 쓴 글</h2>

                    {myPosts.length === 0 ? (
                        <div className="text-gray-500 py-10 text-center bg-gray-50 rounded">
                            아직 작성한 글이 없습니다. 텅~ 🗑️
                            <br/>
                            <Link to="/write" className="text-blue-500 hover:underline mt-2 inline-block">
                                첫 글 쓰러 가기
                            </Link>
                        </div>
                    ) : (
                        <ul className="space-y-3">
                            {myPosts.map(post => (
                                <li key={post.id} className="bg-white p-4 rounded-lg shadow-sm border hover:border-indigo-500 transition">
                                    <Link to={`/posts/${post.id}`} className="block">
                                        <h3 className="font-bold text-lg mb-1">{post.title}</h3>
                                        <div className="text-sm text-gray-500 flex justify-between">
                                            <span>{new Date(post.createdDate).toLocaleDateString()}</span>
                                            <span>조회수 {post.viewCount || 0}</span>
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
}
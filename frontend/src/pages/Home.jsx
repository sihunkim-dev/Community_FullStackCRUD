import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import PostList from "../components/PostList";

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            setLoading(true); // 로딩 시작 명시
            try {
                // 페이징 파라미터가 없으면 기본 0페이지(최신 10개)를 가져옵니다.
                const [postRes, catRes] = await Promise.all([
                    axios.get("/api/posts"),
                    axios.get("/api/categories")
                ]);

                // 🔥 [핵심 수정] .content를 붙여야 배열을 꺼낼 수 있습니다!
                setPosts(postRes.data.content);

                setCategories(catRes.data);
            } catch (error) {
                console.error("Data Load Failed:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    const filteredPosts = selectedCategory === "ALL"
        ? posts
        : posts.filter(post => post.categoryName === selectedCategory);

    return (
        <div className="max-w-screen-xl mx-auto px-4 py-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Community</h2>

                {/* 토큰이 있을 때만 업로드 버튼 표시 */}
                {localStorage.getItem("accessToken") && (
                    <Link
                        to="/write"
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition"
                    >
                        Upload
                    </Link>
                )}
            </div>

            {/* 카테고리 필터 영역 */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                <button
                    onClick={() => setSelectedCategory("ALL")}
                    className={`px-4 py-2 rounded-full border transition whitespace-nowrap font-medium ${
                        selectedCategory === "ALL"
                            ? "bg-gray-900 text-white border-gray-900 shadow-md"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                >
                    See All
                </button>
                {categories.map((cat) => (
                    <button
                        key={cat.id}
                        onClick={() => setSelectedCategory(cat.name)}
                        className={`px-4 py-2 rounded-full border transition whitespace-nowrap font-medium ${
                            selectedCategory === cat.name
                                ? "bg-blue-600 text-white border-blue-600 shadow-md"
                                : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50"
                        }`}
                    >
                        {cat.name}
                    </button>
                ))}
            </div>

            {/* 게시글 목록 영역 */}
            <div className="">
                {loading ? (
                    <div className="p-8 text-center text-gray-500">Loading...</div>
                ) : (
                    <PostList posts={filteredPosts} />
                )}
            </div>
        </div>
    );
}
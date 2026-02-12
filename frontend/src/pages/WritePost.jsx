import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

export default function WritePost() {
    const navigate = useNavigate();
    const location = useLocation();

    const postToEdit = location.state?.post;
    const isEditMode = !!postToEdit;

    const [title, setTitle] = useState(postToEdit?.title || "");
    const [content, setContent] = useState(postToEdit?.content || "");

    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(1); // 기본값 1

    // 2. 카테고리 목록 불러오기 & 초기값 설정
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                // 백엔드에서 카테고리 전체 목록 가져오기
                const response = await axios.get("http://localhost:8080/api/categories");
                const categoryList = response.data;
                setCategories(categoryList);

                // [수정 모드일 때] 기존 글의 카테고리 이름을 찾아 ID로 변환해서 세팅
                if (isEditMode && postToEdit.categoryName) {
                    const matchedCategory = categoryList.find(c => c.name === postToEdit.categoryName);
                    if (matchedCategory) {
                        setCategoryId(matchedCategory.id);
                    }
                } else if (categoryList.length > 0 && !isEditMode) {
                    // [새 글일 때] 목록의 첫 번째 카테고리를 기본값으로
                    setCategoryId(categoryList[0].id);
                }
            } catch (error) {
                console.error("카테고리 로딩 실패:", error);
            }
        };
        fetchCategories();
    }, [isEditMode, postToEdit]);

    async function handleSubmit(e) {
        e.preventDefault();

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("로그인이 필요합니다.");
            navigate("/login");
            return;
        }

        const data = {
            title: title,
            content: content,
            categoryId: Number(categoryId) // 숫자로 변환해서 전송
        };

        const config = {
            headers: { Authorization: `Bearer ${token}` },
        };

        try {
            if (isEditMode) {
                // [수정] PUT
                await axios.put(`http://localhost:8080/api/posts/${postToEdit.id}`, data, config);
                alert("Post is edited.");
                navigate(`/posts/${postToEdit.id}`);
            } else {
                // [작성] POST
                await axios.post("http://localhost:8080/api/posts", data, config);
                alert("새 글이 등록되었습니다! 🎉");
                navigate("/");
            }
        } catch (error) {
            console.error(error);
            alert("저장에 실패했습니다.");
        }
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-10">
            <h1 className="text-2xl font-bold mb-6 text-gray-800">
                {isEditMode ? "게시글 수정 ✏️" : "새 글 작성 📝"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* 1. 카테고리 선택 드롭다운 (추가됨) */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Category
                    </label>
                    <select
                        value={categoryId}
                        onChange={(e) => setCategoryId(e.target.value)}
                        className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 outline-none"
                    >
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* 2. 제목 입력 */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Title
                    </label>
                    <input
                        type="text"
                        className="w-full p-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 outline-none"
                        placeholder="제목을 입력하세요"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />
                </div>

                {/* 3. 내용 입력 */}
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                        Content
                    </label>
                    <textarea
                        rows="10"
                        className="block p-4 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
                        placeholder="내용을 입력하세요"
                        value={content}
                        onChange={e => setContent(e.target.value)}
                        required
                    ></textarea>
                </div>

                {/* 버튼 그룹 */}
                <div className="flex justify-end gap-3">
                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-5 py-2.5 text-sm font-medium text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
                    >
                        {isEditMode ? "Update" : "Upload"}
                    </button>
                </div>
            </form>
        </div>
    );
}
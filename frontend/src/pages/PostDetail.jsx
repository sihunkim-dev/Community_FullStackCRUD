import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

export default function PostDetail() {
    const {id} = useParams();
    const navigate = useNavigate();

    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentInput, setCommentInput] = useState("");
    const [loading, setLoading] = useState(true);

    // 게시글 및 댓글 데이터를 가져오는 공통 함수
    const fetchData = async () => {
        try {
            const [postRes, commentRes] = await Promise.all([
                axios.get(`/api/posts/${id}`),
                axios.get(`/api/comments/${id}`)
            ]);
            setPost(postRes.data);
            setComments(commentRes.data);
        } catch (error) {
            console.error("Loading Failed:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [id]);

    async function handleLike() {
        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("Login required.");
            return;
        }

        try {
            // 백엔드: @PostMapping("/api/posts/{postId}/like")
            await axios.post(`/api/posts/${id}/like`, {}, {
                headers: { Authorization: token }
            });

            const postRes = await axios.get(`/api/posts/${id}`);
            setPost(postRes.data);
        } catch (error) {
            console.error("Like Failed", error);
        }
    }

    async function handleDelete() {
        if (!window.confirm("Do you really want to delete it?")) return;

        const token = localStorage.getItem("accessToken");
        if (!token) {
            alert("Login required");
            return;
        }

        try {
            await axios.delete(`/api/posts/${id}`, {
                headers: { Authorization: token}
            });
            alert("Deleted.");
            navigate("/");
        } catch (error) {
            console.error("Delete Failed", error);
            alert("Only the author can delete this post.");
        }
    }

    async function handleCommentSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");

        if (!token) {
            alert("Login required.");
            return;
        }
        try {
            await axios.post("/api/comments", {
                postId: parseInt(id),
                content: commentInput
            }, {
                headers: { Authorization: token }
            });

            const res = await axios.get(`/api/comments/${id}`);
            setComments(res.data);
            setCommentInput("");
        } catch (error) {
            console.error(error);
            alert("Failed to post comment.");
        }
    }

    async function handleCommentDelete(commentId) {
        if (!window.confirm("Delete this comment?")) return;
        const token = localStorage.getItem("accessToken");
        try {
            await axios.delete(`/api/comments/${commentId}`, { // 포트 주소 제거 (프록시 설정 권장)
                headers: { Authorization: token }
            });
            setComments(comments.filter(c => c.id !== commentId));
        } catch (error) {
            console.error(error);
            alert("Only the author can delete this comment.");
        }
    }

    if (loading) return <div className="py-10 text-center text-gray-500">Loading...</div>;
    if (!post) return null;

    return (
        <div className="max-w-4xl mx-auto px-4 py-10">
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-6 mb-8">
                <div className="border-b border-gray-100 pb-4 mb-4">
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
                        {post.categoryName || "Unsorted"}
                    </span>
                    <h1 className="text-3xl font-bold mt-2 text-gray-900">{post.title}</h1>
                    <div className="text-gray-500 text-sm mt-3 flex justify-between items-center">
                        <div>
                            <span className="font-semibold text-gray-700">{post.writer}</span>
                            <span className="mx-2">|</span>
                            <span>{new Date(post.createdDate).toLocaleString()}</span>
                            <span className="mx-2 text-gray-300">|</span>
                            <span>👁️ {post.viewCount || 0}</span> {/* ✅ 조회수 표시 */}
                        </div>
                        <span className="text-xs text-gray-400">No.{post.id}</span>
                    </div>
                </div>

                <div className="min-h-[200px] text-gray-800 leading-relaxed whitespace-pre-wrap mb-10">
                    {post.content}
                </div>

                <div className="flex justify-between items-center border-t pt-6">
                    {/* ❤️ 좋아요 버튼 업데이트 */}
                    <button
                        onClick={handleLike}
                        className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-500 rounded-full hover:bg-red-100 transition font-medium"
                    >
                        <span>❤️</span>
                        <span>{post.likeCount || 0}</span>
                    </button>

                    <div className="flex gap-2">
                        <button onClick={() => navigate("/")} className="px-4 py-2 bg-gray-100 rounded-lg text-sm font-medium hover:bg-gray-200 transition">List</button>
                        {/* 작성자 본인 확인 로직은 나중에 추가 가능 */}
                        <button onClick={() => navigate("/write", { state: { post } })} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-100 transition">Edit</button>
                        <button onClick={handleDelete} className="px-4 py-2 bg-red-50 text-red-600 rounded-lg text-sm font-medium hover:bg-red-100 transition">Delete</button>
                    </div>
                </div>
            </div>

            {/* 댓글 영역 (기존과 동일) */}
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                <h3 className="font-bold text-lg mb-4 text-gray-800">Comments ({comments.length})</h3>
                <form onSubmit={handleCommentSubmit} className="mb-6">
                    <textarea
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition bg-white"
                        rows="3"
                        placeholder="Share your thoughts..."
                        value={commentInput}
                        onChange={(e) => setCommentInput(e.target.value)}
                        required
                    />
                    <div className="flex justify-end mt-2">
                        <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition shadow-md">
                            Post
                        </button>
                    </div>
                </form>

                <div className="space-y-4">
                    {comments.map((comment) => (
                        <div key={comment.id} className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm">
                            <div className="flex justify-between mb-2">
                                <span className="font-bold text-gray-700 text-sm">{comment.writer}</span>
                                <div className="flex gap-3 items-center">
                                    <span className="text-xs text-gray-400">{comment.createdDate}</span>
                                    <button onClick={() => handleCommentDelete(comment.id)} className="text-red-300 hover:text-red-500 text-xs">Delete</button>
                                </div>
                            </div>
                            <p className="text-gray-600 text-sm whitespace-pre-wrap">{comment.content}</p>
                        </div>
                    ))}
                    {comments.length === 0 && <p className="text-center text-gray-400 py-4">No comments yet.</p>}
                </div>
            </div>
        </div>
    );
}
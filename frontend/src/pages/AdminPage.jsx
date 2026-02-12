import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function AdminPage() {
    const navigate = useNavigate();

    const [activeTab, setActiveTab] = useState("categories");
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);

    const [formData, setFormData] = useState({
        name: "",
        description: "",
    });

    async function fetchCategories() {
        try {
            const response = await axios.get("/api/categories");
            setCategories(response.data);
        } catch (error) {
            console.error("Load Failed:", error);
        }
    }

    async function fetchUsers(){
        const token = localStorage.getItem("accessToken");
        try{
            const response = await axios.get("/api/users", {
                headers:{Authorization: token},
            });
            setUsers(response.data);
        }catch(error){
            console.error("Load Failed:", error);
            if(error.response && error.response.status === 403){
                alert("No permission");
                navigate("/");
            }
        }
    }

    useEffect(() => {
        const loadData = async () => {
            if (activeTab === "categories") {
                await fetchCategories();
            } else {
                await fetchUsers();
            }
        };
        loadData();
    }, [activeTab]);

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const token = localStorage.getItem("accessToken");
        if (!token) return alert("Login Required");

        try {
            await axios.post("/api/categories", formData, {
                headers: { Authorization: token }
            });
            alert("Category Added");
            setFormData({ name: "", description: "" });
            fetchCategories();
        } catch (error) {
            alert("Failed: " + (error.response?.data?.message || "Error"));
        }
    }

    async function handleDeleteCategory(id) {
        if (!confirm("Delete this category?")) return;
        const token = localStorage.getItem("accessToken");
        try {
            await axios.delete(`/api/categories/${id}`, {
                headers: { Authorization: token }
            });
            alert("Deleted");
            fetchCategories();
        } catch (error) {
            console.error(error);
            alert("Delete Failed");
        }
    }

    async function handleDeleteUser(id) {
        if (!confirm("정말 이 유저를 강퇴하시겠습니까? (복구 불가)")) return;
        const token = localStorage.getItem("accessToken");
        try {
            await axios.delete(`/api/users/${id}`, {
                headers: { Authorization: token }
            });
            alert("User Deleted");
            fetchUsers(); // 목록 새로고침
        } catch (error) {
            console.error(error);
            alert("Failed to delete user");
        }
    }

    return (
        <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">🛡️ Admin Dashboard</h1>

            {/* 탭 버튼 영역 */}
            <div className="flex border-b mb-6">
                <button
                    className={`flex-1 py-3 font-bold text-lg ${activeTab === 'categories' ? 'border-b-4 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-indigo-400'}`}
                    onClick={() => setActiveTab("categories")}
                >
                    📂 카테고리 관리
                </button>
                <button
                    className={`flex-1 py-3 font-bold text-lg ${activeTab === 'users' ? 'border-b-4 border-indigo-600 text-indigo-600' : 'text-gray-500 hover:text-indigo-400'}`}
                    onClick={() => setActiveTab("users")}
                >
                    👥 유저 관리
                </button>
            </div>

            {/* 탭 1: 카테고리 관리 화면 */}
            {activeTab === "categories" && (
                <div>
                    <form onSubmit={handleSubmit} className="space-y-4 mb-8 bg-gray-50 p-4 rounded border">
                        <h3 className="font-bold text-lg">새 카테고리 추가</h3>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <input
                                type="text" name="name" value={formData.name} onChange={handleChange}
                                className="border p-2 rounded" placeholder="Category Name" required
                            />
                            <input
                                type="text" name="description" value={formData.description} onChange={handleChange}
                                className="border p-2 rounded" placeholder="Description" required
                            />
                        </div>
                        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 font-bold">
                            Add Category
                        </button>
                    </form>

                    <ul className="space-y-3">
                        {categories.map((cat) => (
                            <li key={cat.id} className="flex justify-between items-center bg-white p-4 rounded border hover:shadow-sm">
                                <div>
                                    <span className="font-bold text-lg">{cat.name}</span>
                                    <span className="text-gray-500 text-sm ml-2">- {cat.description}</span>
                                </div>
                                <button onClick={() => handleDeleteCategory(cat.id)} className="text-red-500 border border-red-500 px-3 py-1 rounded text-sm font-bold hover:bg-red-50">
                                    Delete
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* 탭 2: 유저 관리 화면 */}
            {activeTab === "users" && (
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                        <tr className="bg-gray-100 border-b">
                            <th className="p-4">ID</th>
                            <th className="p-4">Username</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Role</th>
                            <th className="p-4">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {users.map((u) => (
                            <tr key={u.id} className="border-b hover:bg-gray-50">
                                <td className="p-4">{u.id}</td>
                                <td className="p-4 font-bold">{u.username}</td>
                                <td className="p-4 text-gray-500">{u.email}</td>
                                <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${u.role === 'ROLE_ADMIN' || u.role === 'ADMIN' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>
                                            {u.role}
                                        </span>
                                </td>
                                <td className="p-4">
                                    {/* 본인 계정은 삭제 못하게 막거나, 그냥 버튼 둠 */}
                                    <button
                                        onClick={() => handleDeleteUser(u.id)}
                                        className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm font-bold shadow-sm"
                                    >
                                        Kick 🚫
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    {users.length === 0 && <p className="text-center text-gray-500 mt-4">유저가 없습니다.</p>}
                </div>
            )}
        </div>
    );
}
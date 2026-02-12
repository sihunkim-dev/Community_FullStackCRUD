import {Link} from "react-router-dom";

export default function PostList({posts}) {
    const formatDate = (dateString)=>{
        const date = new Date(dateString);
        return date.toLocaleDateString() + " " + date.toLocaleTimeString([],{hour:'2-digit', minute : '2-digit'});
    }

    if (!posts || posts.length === 0) {
        return <div className="text-center py-10 text-gray-500">No post</div>;
    }

    return (
        <div className="grid gap-4">
            {posts.map((post) =>(
                <Link
                    to={`/posts/${post.id}`}
                    key={post.id}
                    className="block p-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
                >
                    <div className="flex justify-between items-center mb-2">
                        <span className="bg-blue-50 text-blue-600 text-xs font-semibold px-2.5 py-0.5 rounded border border-blue-100">
                            {post.categoryName}
                        </span>
                        <span className="text-gray-400 text-xs">{formatDate(post.createdDate)}</span>
                    </div>

                    <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1">
                        {post.title}
                    </h3>

                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                        {post.description}
                    </p>
                    <div className="flex items-center text-sm text-gray-500">
                        <div className="flex items-center mr-4">
                            <span className="font-medium text-gray-700">✍️ {post.username}</span>
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    )
}
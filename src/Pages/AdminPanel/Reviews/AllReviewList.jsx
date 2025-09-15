import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaEye } from "react-icons/fa";

const AllReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReviews = () => {
    setLoading(true);
    fetch("http://127.0.0.1:8000/reviews/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching reviews:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    fetch(`http://127.0.0.1:8000/reviews/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          fetchReviews();
        } else {
          alert("Failed to delete review.");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  const handleEdit = (id) => {
    const newComment = prompt("Enter updated review comment:");
    if (!newComment) return;

    fetch(`http://127.0.0.1:8000/reviews/${id}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
      body: JSON.stringify({ comment: newComment }),
    })
      .then((res) => {
        if (res.ok) {
          fetchReviews();
        } else {
          alert("Failed to update review.");
        }
      })
      .catch((err) => console.error("Edit error:", err));
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">All Reviews</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-4 py-2">SL</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Comment</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Created At</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {reviews.map((review, idx) => (
              <tr key={review.id} className="border-b">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{review.product}</td>
                <td className="px-4 py-2">{review.user}</td>
                <td className="px-4 py-2">{review.comment}</td>
                <td className="px-4 py-2">{review.rating}</td>
                <td className="px-4 py-2 capitalize">{review.status}</td>
                <td className="px-4 py-2">{new Date(review.created_at).toLocaleString()}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button
                    onClick={() => handleEdit(review.id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 flex items-center"
                  >
                    <FaEye className="inline mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    ❌ Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllReviewList;

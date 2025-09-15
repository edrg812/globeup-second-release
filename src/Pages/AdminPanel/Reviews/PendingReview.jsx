import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PendingReview = () => {
  const [reviews, setReviews] = useState([]);

  // Fetch all reviews from backend
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("http://localhost:8000/reviews/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });
        const data = await res.json();
        setReviews(data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, []);

  // Approve or Reject Review
  const updateStatus = async (id, action) => {
    try {
      if (action === "approve") {
        const res = await fetch(`http://localhost:8000/reviews/${id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
          body: JSON.stringify({ status: "published" }),
        });

        if (res.ok) {
          const updated = await res.json();
          setReviews((prev) =>
            prev.map((r) => (r.id === id ? updated : r))
          );
        }
      } else if (action === "reject") {
        const res = await fetch(`http://localhost:8000/reviews/${id}/`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        });

        if (res.ok) {
          setReviews((prev) => prev.filter((r) => r.id !== id));
        }
      }
    } catch (error) {
      console.error("Error updating review:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="p-4 bg-gray-100 flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Pending Reviews</h1>
        <Link
          to="/admin/review/create"
          className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
        >
          Add Review
        </Link>
      </div>

      <table className="w-full border border-gray-300 rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="p-2 border">Product</th>
            <th className="p-2 border">User</th>
            <th className="p-2 border">Rating</th>
            <th className="p-2 border">Comment</th>
            <th className="p-2 border">Date</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <tr key={review.id} className="border-b">
                <td className="p-2 border">{review.product}</td>
                <td className="p-2 border">{review.user}</td>
                <td className="p-2 border">{review.rating} ⭐</td>
                <td className="p-2 border">{review.comment}</td>
                <td className="p-2 border">{review.date}</td>
                <td className="p-2 border">{review.status}</td>
                <td className="p-2 border space-x-2">
                  {review.status === "pending" && (
                    <>
                      <button
                        onClick={() => updateStatus(review.id, "approve")}
                        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => updateStatus(review.id, "reject")}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center p-4">
                No reviews found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PendingReview;

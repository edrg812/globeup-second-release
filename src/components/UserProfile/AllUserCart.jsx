

import React, { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

export default function CartPage() {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCarts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/cart/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch carts");
      const data = await res.json();

      const enrichedCarts = await Promise.all(
        data.results.map(async (cart) => {
          const items = await Promise.all(
            cart.items.map(async (item) => {
              const resVariant = await fetch(
                `${API_URL}/variants/${item.product_variant.id}/`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                  },
                }
              );
              const variant = await resVariant.json();

              const resProduct = await fetch(
                `${API_URL}/products/${variant.product}/`,
                {
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                  },
                }
              );
              const product = await resProduct.json();

              return {
                ...item,
                variant,
                product,
              };
            })
          );
          return { ...cart, items };
        })
      );

      setCarts(enrichedCarts);
    } catch (error) {
      console.error("Error fetching carts:", error);
      setCarts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCarts();
  }, []);

  // Delete individual cart item
  const handleDeleteItem = async (itemId, cartId) => {
    try {
      const res = await fetch(`${API_URL}/items/${itemId}/delete/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      if (res.ok) {
        // Remove the deleted item from the specific cart
        setCarts((prev) =>
          prev.map((cart) =>
            cart.id === cartId
              ? { ...cart, items: cart.items.filter((i) => i.id !== itemId) }
              : cart
          )
        );
      } else {
        console.error("Failed to delete item", res.status);
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  if (loading) return <p>Loading carts...</p>;

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Your Carts</h1>
      {carts.length === 0 && <p style={styles.empty}>No carts available.</p>}

      <div style={styles.cartGrid}>
        {carts.map((cart) => (
          <div key={cart.id} style={styles.cartCard}>
            <h2>Cart #{cart.id}</h2>

            {cart.items.length === 0 ? (
              <p>No items in this cart</p>
            ) : (
              <div style={styles.itemsGrid}>
                {cart.items.map((item) => (
                  <div key={item.id} style={styles.itemCard}>
                    <h3>{item.product.name}</h3>
                    <p>SKU: {item.variant.sku}</p>
                    <p>
                      {item.variant.size} | {item.variant.color}
                    </p>
                    <p>Price: ${item.variant.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <button
                      style={styles.deleteBtn}
                      onClick={() => handleDeleteItem(item.id, cart.id)}
                    >
                      Delete Item
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "2rem",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
  },
  heading: {
    textAlign: "center",
    marginBottom: "2rem",
    color: "#333",
  },
  empty: {
    textAlign: "center",
    color: "#777",
  },
  cartGrid: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  cartCard: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "1rem",
    backgroundColor: "#f9f9f9",
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
  },
  itemsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "1rem",
  },
  itemCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "0.8rem",
    backgroundColor: "#fff",
    boxShadow: "0 1px 4px rgba(0,0,0,0.05)",
  },
  deleteBtn: {
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    padding: "0.5rem 1rem",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop: "0.5rem",
  },
};






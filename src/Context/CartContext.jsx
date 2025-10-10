import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "./UserContext";

const cartContext = createContext();

export const useCart = () => {
  const context = useContext(cartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const { user } = useUser();
  const [cart, setCart] = useState({
    items: [],
    totalQuantity: 0,
    totalPrice: 0,
  });
  const [cartLoading, setCartLoading] = useState(false);

  // Fetch cart data when user logs in
  useEffect(() => {
    if (user?.Token) {
      fetchCartData();
    } else {
      // Clear cart when user logs out
      setCart({
        items: [],
        totalQuantity: 0,
        totalPrice: 0,
      });
    }
  }, [user?.Token]);

  // Fetch cart data from API
  const fetchCartData = async () => {
    if (!user?.Token) return;

    setCartLoading(true);
    try {
      const response = await fetch(
        `https://api.basementex.com/api/v1/web/cart-details/${user?.userId}`,
        // `http://localhost:8201/api/v1/web/cart-details/${user?.userId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.Token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success === true) {
        setCart(data.cart || { items: [], totalQuantity: 0, totalPrice: 0 });
      } else {
        console.error("Error fetching cart:", data.message);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setCartLoading(false);
    }
  };

  // Add item to cart
  const addToCart = async (courseId, price, type) => {
    if (!user?.Token) {
      toast.error("Please login to add course to cart");
      return false;
    }

    setCartLoading(true);
    try {
      const response = await fetch(
        "https://api.basementex.com/api/v1/web/add-to-cart",
        // "http://localhost:8201/api/v1/web/add-to-cart",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.Token}`,
          },
          body: JSON.stringify({
            courseId,
            userId: user.userId,
            price,
            type,
          }),
        }
      );

      const data = await response.json();

      if (data.success === true) {
        setCart(data.cart);
        toast.success(data.message || "Course added to cart");
        return true;
      } else {
        toast.error(data.message || "Failed to add course to cart");
        return false;
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add course to cart");
      return false;
    } finally {
      setCartLoading(false);
    }
  };

  // Remove item from cart
  const removeFromCart = async (courseId, type) => {
    if (!user?.Token) return false;

    setCartLoading(true);
    try {
      const response = await fetch(
        `https://api.basementex.com/api/v1/web/delete-cart-item/${user.userId}/${courseId}`,
        // `http://localhost:8201/api/v1/web/delete-cart-item/${user.userId}/${courseId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.Token}`,
          },
          body: JSON.stringify({
            type,
          }),
        }
      );

      const data = await response.json();

      if (data.success === true) {
        setCart(data.cart || { items: [], totalQuantity: 0, totalPrice: 0 });
        toast.success(data.message || "Course removed from cart");
        return true;
      } else {
        toast.error(data.message || "Failed to remove course from cart");
        return false;
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast.error("Failed to remove course from cart");
      return false;
    } finally {
      setCartLoading(false);
    }
  };

  // Check if course is in cart
  const isInCart = (courseId) => {
    return cart.items?.some((item) => item.courseId?._id === courseId);
  };

  // Clear cart
  const clearCart = async () => {
    if (!user?.Token) return false;

    setCartLoading(true);
    try {
      const response = await fetch(
        `https://api.basementex.com/api/v1/web/delete-cart/${user.userId}`,
        // `http://localhost:8201/api/v1/web/delete-cart/${user.userId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.Token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success === true) {
        setCart({ items: [], totalQuantity: 0, totalPrice: 0 });
        toast.success(data.message || "Cart cleared");
        return true;
      } else {
        toast.error(data.message || "Failed to clear cart");
        return false;
      }
    } catch (error) {
      console.error("Error clearing cart:", error);
      toast.error("Failed to clear cart");
      return false;
    } finally {
      setCartLoading(false);
    }
  };

  // Toggle cart item (add if not in cart, remove if in cart)
  const toggleCartItem = async (courseId, price, type) => {
    if (isInCart(courseId)) {
      return await removeFromCart(courseId, type);
    } else {
      return await addToCart(courseId, price, type);
    }
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        cartLoading,
        addToCart,
        removeFromCart,
        isInCart,
        clearCart,
        toggleCartItem,
        fetchCartData,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

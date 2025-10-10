"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useUser } from "./UserContext";

const wishlistContext = createContext();

export const useWishlist = () => {
  const context = useContext(wishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

export const WishlistProvider = ({ children }) => {
  const { user } = useUser();
  const [wishlist, setWishlist] = useState([]);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  // Fetch wishlist data when user logs in
  useEffect(() => {
    if (user?.Token) {
      fetchWishlistData();
    } else {
      // Clear wishlist when user logs out
      setWishlist([]);
    }
  }, [user?.Token]);

  // Fetch wishlist data from API
  const fetchWishlistData = async () => {
    if (!user?.Token) return;

    setWishlistLoading(true);
    try {
      const response = await fetch(
        `https://api.basementex.com/api/v1/web/${user?.userId}`,
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
        setWishlist(data.wishlist.favouriteItems || []);
      } else {
        console.error("Error fetching wishlist:", data.message);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setWishlistLoading(false);
    }
  };

  // Add item to wishlist
  const addToWishlist = async (courseId) => {
    if (!user?.Token) {
      toast.error("Please login to add courses to wishlist");
      return false;
    }

    setWishlistLoading(true);
    try {
      const response = await fetch(
        "https://api.basementex.com/api/v1/web/add",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.Token}`,
          },
          body: JSON.stringify({
            userId: user.userId,
            courseId,
          }),
        }
      );

      const data = await response.json();

      if (data.success === true) {
        // Update wishlist state
        await fetchWishlistData();
        toast.success(data.message || "Course added to wishlist");
        return true;
      } else {
        toast.error(data.message || "Failed to add course to wishlist");
        return false;
      }
    } catch (error) {
      console.error("Error adding to wishlist:", error);
      toast.error("Failed to add course to wishlist");
      return false;
    } finally {
      setWishlistLoading(false);
    }
  };

  // Remove item from wishlist
  const removeFromWishlist = async (courseId) => {
    if (!user?.Token) return false;

    setWishlistLoading(true);
    try {
      const response = await fetch(
        `https://api.basementex.com/api/v1/web/remove/${user.userId}/${courseId._id}`,
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
        // Update wishlist state
        await fetchWishlistData();
        toast.success(data.message || "Course removed from wishlist");
        return true;
      } else {
        toast.error(data.message || "Failed to remove course from wishlist");
        return false;
      }
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      toast.error("Failed to remove course from wishlist");
      return false;
    } finally {
      setWishlistLoading(false);
    }
  };

  // Check if course is in wishlist
  const isInWishlist = (courseId) => {
    return wishlist.some((item) => item.courseId?._id === courseId);
  };

  // Toggle wishlist item (add if not in wishlist, remove if in wishlist)
  const toggleWishlistItem = async (courseId) => {
    if (isInWishlist(courseId)) {
      return await removeFromWishlist(courseId);
    } else {
      return await addToWishlist(courseId);
    }
  };

  return (
    <wishlistContext.Provider
      value={{
        wishlist,
        wishlistLoading,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        toggleWishlistItem,
        fetchWishlistData,
      }}
    >
      {children}
    </wishlistContext.Provider>
  );
};

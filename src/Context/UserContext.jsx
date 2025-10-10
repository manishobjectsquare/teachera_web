// import { createContext, useContext, useEffect, useState } from "react"

// import { toast } from "react-toastify"

// const userContext = createContext()

// export const useUser = () => {
//     const context = useContext(userContext)
//     if (context === undefined) {
//         throw new Error("useUser must be used within a UserProvider")
//     }
//     return context
// }

// export const UserProvider = ({ children }) => {
//     const [authLoading, setAuthLoading] = useState(true)
//     const [user, setUser] = useState({
//         Token: null,
//         Email: null,
//         userId: null,
//     })

//     const [profileData, setProfileData] = useState(null)
//     const [profileError, setProfileError] = useState(null)
//     const [detailedProfileData, setDetailedProfileData] = useState(null)
//     const [detailedProfileLoading, setDetailedProfileLoading] = useState(false)

//     // On mount, load user data from localStorage
//     useEffect(() => {
//         const loadUserData = () => {
//             setAuthLoading(true)
//             const storedToken = localStorage.getItem("Token")
//             const storedEmail = localStorage.getItem("Email")
//             const storedUserId = localStorage.getItem("userId")

//             if (storedToken) {
//                 setUser({
//                     Token: storedToken,
//                     Email: storedEmail,
//                     userId: storedUserId,
//                 })
//             }
//             setAuthLoading(false)
//         }
//         loadUserData()
//     }, [])

//     // Persist user data to localStorage when it changes
//     useEffect(() => {
//         if (user?.Token) {
//             localStorage.setItem("Token", user.Token)
//             if (user.Email) localStorage.setItem("Email", user.Email)
//             if (user.userId) localStorage.setItem("userId", user.userId)
//         } else {
//             localStorage.removeItem("Token")
//             localStorage.removeItem("Email")
//             localStorage.removeItem("userId")
//         }
//     }, [user])

//     // Fetch profile data when user token changes, but only if we don't already have profile data
//     useEffect(() => {
//         if (user?.Token && !profileData) {
//             fetchProfileData()
//         } else if (!user?.Token) {
//             // Clear profile data when user logs out
//             setProfileData(null)
//             setDetailedProfileData(null)
//         }
//     }, [user?.Token, profileData])

//     // Revised fetchProfileData function to ensure complete user details are saved
//     const fetchProfileData = async () => {
//         if (!user?.Token) return

//         setProfileError(null)
//         setAuthLoading(true)

//         try {
//             // First, try to get the complete user data from localStorage
//             const storedCompleteProfile = localStorage.getItem("CompleteUserData")
//             let basicUserData = null

//             if (storedCompleteProfile) {
//                 try {
//                     basicUserData = JSON.parse(storedCompleteProfile)
//                     console.log("Using stored complete user data:", basicUserData)
//                 } catch (e) {
//                     console.error("Error parsing stored complete user data:", e)
//                 }
//             }

//             // If we don't have complete user data, create a basic profile from stored data
//             if (!basicUserData) {
//                 basicUserData = {
//                     _id: user.userId,
//                     email: user.Email,
//                     // Add other basic fields if available
//                 }
//                 console.log("Created basic user data from stored values:", basicUserData)
//             }

//             const userId = user.userId
//             if (!userId) {
//                 console.error("No user ID available for profile fetch")
//                 throw new Error("User ID not available")
//             }

//             try {
//                 // Fetch detailed profile data
//                 console.log("Fetching detailed profile with userId:", userId)
//                 const detailedResponse = await fetch(`https://api.basementex.com/api/profil_details/${userId}`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${user.Token}`,
//                     },
//                 })

//                 const detailedData = await detailedResponse.json()
//                 console.log("Detailed profile data response:", detailedData)

//                 if (
//                     detailedData.status &&
//                     detailedData.data &&
//                     Array.isArray(detailedData.data) &&
//                     detailedData.data.length > 0
//                 ) {
//                     // Merge the detailed profile data with the basic user data
//                     const detailedUserData = detailedData.data[0]
//                     const mergedData = { ...basicUserData, ...detailedUserData }
//                     console.log("Merged profile data:", mergedData)

//                     setProfileData(mergedData)
//                     localStorage.setItem("UserProfile", JSON.stringify(mergedData))
//                 } else {
//                     console.warn("Detailed profile data not found or invalid format:", detailedData)
//                     // If detailed data fetch fails, just use the basic data
//                     setProfileData(basicUserData)
//                     localStorage.setItem("UserProfile", JSON.stringify(basicUserData))
//                 }
//             } catch (detailedErr) {
//                 console.error("Error fetching detailed profile data:", detailedErr)
//                 // If detailed data fetch fails, just use the basic data
//                 setProfileData(basicUserData)
//                 localStorage.setItem("UserProfile", JSON.stringify(basicUserData))
//             }
//         } catch (err) {
//             console.error("Error in profile data process:", err)
//             setProfileError("Failed to load profile data")

//             // Try to load from localStorage as fallback
//             const storedProfile = localStorage.getItem("UserProfile")
//             if (storedProfile) {
//                 try {
//                     setProfileData(JSON.parse(storedProfile))
//                 } catch (e) {
//                     console.error("Error parsing stored profile:", e)
//                 }
//             }
//         } finally {
//             setAuthLoading(false)
//         }
//     }

//     // Add this function to refresh the profile data on demand
//     const refreshProfileData = async () => {
//         setProfileData(null) // Clear existing data
//         return await fetchProfileData() // Fetch fresh data
//     }

//     // Update the login function to store complete user data
//     const login = async (formData) => {
//         setAuthLoading(true)
//         setProfileError(null)

//         try {
//             const response = await fetch("https://api.basementex.com/api/v1/web/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             })

//             const data = await response.json()
//             console.log("Login response:", data)

//             if (data.status) {
//                 // Store the complete user data from the login response
//                 const completeUserData = data.data.user
//                 localStorage.setItem("CompleteUserData", JSON.stringify(completeUserData))
//                 console.log("Stored complete user data:", completeUserData)

//                 // Set user with token, email, and userId
//                 setUser({
//                     Token: data.data.token,
//                     Email: completeUserData.email,
//                     userId: completeUserData._id,
//                 })

//                 toast.success(data.message)

//                 // Instead of setting profile data directly, trigger a full profile fetch
//                 // This will get both basic and detailed profile data
//                 await fetchProfileData()

//                 setAuthLoading(false)
//                 return true
//             } else {
//                 toast.error(data.message || "Login failed")
//                 throw new Error(data.message || "Login failed")
//             }
//         } catch (err) {
//             console.error("Login error:", err)
//             setProfileError(err.message || "Login failed")
//             toast.error(err.message || "Login failed")
//             setAuthLoading(false)
//             return false
//         }
//     }

//     // Update the register function to store complete user data
//     const register = async (formData) => {
//         setAuthLoading(true)
//         setProfileError(null)

//         try {
//             const response = await fetch("https://api.basementex.com/api/v1/web/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             })

//             const data = await response.json()

//             if (data.status === true) {
//                 // Store the complete user data from the register response
//                 const completeUserData = data.data.user
//                 localStorage.setItem("CompleteUserData", JSON.stringify(completeUserData))
//                 console.log("Stored complete user data:", completeUserData)

//                 // Set user with token, email, and userId
//                 setUser({
//                     Token: data.data.token,
//                     Email: completeUserData.email,
//                     userId: completeUserData._id,
//                 })

//                 // Instead of setting profile data directly, trigger a full profile fetch
//                 // This will get both basic and detailed profile data
//                 await fetchProfileData()

//                 toast.success(data.message || "Registration successful")
//                 setAuthLoading(false)
//                 return true
//             } else {
//                 toast.error(data.message || "Registration failed")
//                 throw new Error(data.message || "Registration failed")
//             }
//         } catch (err) {
//             console.error("Registration error:", err)
//             setProfileError(err.message || "Registration failed")
//             toast.error(err.message || "Registration failed")
//             setAuthLoading(false)
//             return false
//         }
//     }

//     const logout = () => {
//         setUser({
//             Token: null,
//             Email: null,
//             userId: null,
//         })
//         setProfileData(null)
//         setDetailedProfileData(null)

//         // Clear all user data from localStorage
//         localStorage.removeItem("Token")
//         localStorage.removeItem("Email")
//         localStorage.removeItem("userId")
//         localStorage.removeItem("UserProfile")
//         localStorage.removeItem("CompleteUserData")

//         toast.success("Logged Out Successfully")
//     }

//     // Add the updateProfile function to the UserContext
//     const user__id = localStorage.getItem("userId")
//     console.log("Filtered profile data:", profileData)
//     const updateProfile = async (profileData) => {
//         if (!user?.Token) return { success: false, message: "Not authenticated" }

//         setAuthLoading(true)
//         try {
//             // Use the API endpoint you have available
//             const { email, ...filteredProfileData } = profileData
//             console.log("Filtered profile data:", filteredProfileData)
//             const response = await fetch(`https://api.basementex.com/api/update-profile`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                     Authorization: `Bearer ${user.Token}`,
//                 },
//                 // body: JSON.stringify(profileData),
//                 body: JSON.stringify({
//                     ...filteredProfileData,
//                     userId: user__id,

//                 }),
//             })

//             const data = await response.json()

//             if (data.status === true) {
//                 // Update the profile data in state
//                 setProfileData((prevData) => ({
//                     ...prevData,
//                     ...profileData,
//                 }))

//                 // Update localStorage
//                 const storedProfile = JSON.parse(localStorage.getItem("UserProfile") || "{}")
//                 const updatedProfile = {
//                     ...storedProfile,
//                     ...profileData,
//                 }
//                 localStorage.setItem("UserProfile", JSON.stringify(updatedProfile))

//                 // Also update the complete user data
//                 const storedCompleteData = JSON.parse(localStorage.getItem("CompleteUserData") || "{}")
//                 localStorage.setItem(
//                     "CompleteUserData",
//                     JSON.stringify({
//                         ...storedCompleteData,
//                         ...profileData,
//                     }),
//                 )

//                 toast.success(data.message || "Profile updated successfully")
//                 setAuthLoading(false)
//                 return { success: true, data }
//             } else {
//                 toast.error(data.message || "Failed to update profile")
//                 throw new Error(data.message || "Failed to update profile")
//             }
//         } catch (err) {
//             console.error("Profile update error:", err)
//             toast.error(err.message || "Failed to update profile")
//             setAuthLoading(false)
//             return { success: false, message: err.message }
//         }
//     }

//     // Add the new functions to the context provider value
//     return (
//         <userContext.Provider
//             value={{
//                 user,
//                 setUser,
//                 profileData,
//                 profileError,
//                 authLoading,
//                 login,
//                 register,
//                 logout,
//                 fetchProfileData,
//                 refreshProfileData,
//                 updateProfile,
//             }}
//         >
//             {children}
//         </userContext.Provider>
//     )
// }

// "use client"

// import { createContext, useContext, useEffect, useState } from "react"

// import { toast } from "react-toastify"

// const userContext = createContext()

// export const useUser = () => {
//     const context = useContext(userContext)
//     if (context === undefined) {
//         throw new Error("useUser must be used within a UserProvider")
//     }
//     return context
// }

// export const UserProvider = ({ children }) => {
//     const [authLoading, setAuthLoading] = useState(true)
//     const [user, setUser] = useState({
//         Token: null,
//         Email: null,
//         userId: null,
//     })

//     const [profileData, setProfileData] = useState(null)
//     const [profileError, setProfileError] = useState(null)
//     const [detailedProfileData, setDetailedProfileData] = useState(null)
//     const [detailedProfileLoading, setDetailedProfileLoading] = useState(false)

//     // On mount, load user data from localStorage
//     useEffect(() => {
//         const loadUserData = () => {
//             setAuthLoading(true)
//             const storedToken = localStorage.getItem("Token")
//             const storedEmail = localStorage.getItem("Email")
//             const storedUserId = localStorage.getItem("userId")

//             if (storedToken) {
//                 setUser({
//                     Token: storedToken,
//                     Email: storedEmail,
//                     userId: storedUserId,
//                 })
//             }
//             setAuthLoading(false)
//         }
//         loadUserData()
//     }, [])

//     // Persist user data to localStorage when it changes
//     useEffect(() => {
//         if (user?.Token) {
//             localStorage.setItem("Token", user.Token)
//             if (user.Email) localStorage.setItem("Email", user.Email)
//             if (user.userId) localStorage.setItem("userId", user.userId)
//         } else {
//             localStorage.removeItem("Token")
//             localStorage.removeItem("Email")
//             localStorage.removeItem("userId")
//         }
//     }, [user])

//     // Fetch profile data when user token changes, but only if we don't already have profile data
//     useEffect(() => {
//         if (user?.Token && !profileData) {
//             fetchProfileData()
//         } else if (!user?.Token) {
//             // Clear profile data when user logs out
//             setProfileData(null)
//             setDetailedProfileData(null)
//         }
//     }, [user?.Token, profileData])

//     // Revised fetchProfileData function to ensure complete user details are saved
//     const fetchProfileData = async () => {
//         if (!user?.Token) return

//         setProfileError(null)
//         setAuthLoading(true)

//         try {
//             // First, try to get the complete user data from localStorage
//             const storedCompleteProfile = localStorage.getItem("CompleteUserData")
//             let basicUserData = null

//             if (storedCompleteProfile) {
//                 try {
//                     basicUserData = JSON.parse(storedCompleteProfile)
//                     console.log("Using stored complete user data:", basicUserData)
//                 } catch (e) {
//                     console.error("Error parsing stored complete user data:", e)
//                 }
//             }

//             // If we don't have complete user data, create a basic profile from stored data
//             if (!basicUserData) {
//                 basicUserData = {
//                     _id: user.userId,
//                     email: user.Email,
//                     // Add other basic fields if available
//                 }
//                 console.log("Created basic user data from stored values:", basicUserData)
//             }

//             const userId = user.userId
//             if (!userId) {
//                 console.error("No user ID available for profile fetch")
//                 throw new Error("User ID not available")
//             }

//             try {
//                 // Fetch detailed profile data
//                 console.log("Fetching detailed profile with userId:", userId)
//                 const detailedResponse = await fetch(`https://api.basementex.com/api/profil_details/${userId}`, {
//                     method: "GET",
//                     headers: {
//                         "Content-Type": "application/json",
//                         Authorization: `Bearer ${user.Token}`,
//                     },
//                 })

//                 const detailedData = await detailedResponse.json()
//                 console.log("Detailed profile data response:", detailedData)

//                 if (
//                     detailedData.status &&
//                     detailedData.data &&
//                     Array.isArray(detailedData.data) &&
//                     detailedData.data.length > 0
//                 ) {
//                     // Merge the detailed profile data with the basic user data
//                     const detailedUserData = detailedData.data[0]
//                     const mergedData = { ...basicUserData, ...detailedUserData }
//                     console.log("Merged profile data:", mergedData)

//                     setProfileData(mergedData)
//                     localStorage.setItem("UserProfile", JSON.stringify(mergedData))
//                 } else {
//                     console.warn("Detailed profile data not found or invalid format:", detailedData)
//                     // If detailed data fetch fails, just use the basic data
//                     setProfileData(basicUserData)
//                     localStorage.setItem("UserProfile", JSON.stringify(basicUserData))
//                 }
//             } catch (detailedErr) {
//                 console.error("Error fetching detailed profile data:", detailedErr)
//                 // If detailed data fetch fails, just use the basic data
//                 setProfileData(basicUserData)
//                 localStorage.setItem("UserProfile", JSON.stringify(basicUserData))
//             }
//         } catch (err) {
//             console.error("Error in profile data process:", err)
//             setProfileError("Failed to load profile data")

//             // Try to load from localStorage as fallback
//             const storedProfile = localStorage.getItem("UserProfile")
//             if (storedProfile) {
//                 try {
//                     setProfileData(JSON.parse(storedProfile))
//                 } catch (e) {
//                     console.error("Error parsing stored profile:", e)
//                 }
//             }
//         } finally {
//             setAuthLoading(false)
//         }
//     }

//     // Add this function to refresh the profile data on demand
//     const refreshProfileData = async () => {
//         setProfileData(null) // Clear existing data
//         return await fetchProfileData() // Fetch fresh data
//     }

//     // Update the login function to store complete user data
//     const login = async (formData) => {
//         setAuthLoading(true)
//         setProfileError(null)

//         try {
//             const response = await fetch("https://api.basementex.com/api/v1/web/login", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             })

//             const data = await response.json()
//             console.log("Login response:", data)

//             if (data.status) {
//                 // Store the complete user data from the login response
//                 const completeUserData = data.data.user
//                 localStorage.setItem("CompleteUserData", JSON.stringify(completeUserData))
//                 console.log("Stored complete user data:", completeUserData)

//                 // Set user with token, email, and userId
//                 setUser({
//                     Token: data.data.token,
//                     Email: completeUserData.email,
//                     userId: completeUserData._id,
//                 })

//                 toast.success(data.message)

//                 // Instead of setting profile data directly, trigger a full profile fetch
//                 // This will get both basic and detailed profile data
//                 await fetchProfileData()

//                 setAuthLoading(false)
//                 return true
//             } else {
//                 toast.error(data.message || "Login failed")
//                 throw new Error(data.message || "Login failed")
//             }
//         } catch (err) {
//             console.error("Login error:", err)
//             setProfileError(err.message || "Login failed")
//             toast.error(err.message || "Login failed")
//             setAuthLoading(false)
//             return false
//         }
//     }

//     // Update the register function to store complete user data
//     const register = async (formData) => {
//         setAuthLoading(true)
//         setProfileError(null)

//         try {
//             const response = await fetch("https://api.basementex.com/api/v1/web/register", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(formData),
//             })

//             const data = await response.json()

//             if (data.status === true) {
//                 // Store the complete user data from the register response
//                 const completeUserData = data.data.user
//                 localStorage.setItem("CompleteUserData", JSON.stringify(completeUserData))
//                 console.log("Stored complete user data:", completeUserData)

//                 // Set user with token, email, and userId
//                 setUser({
//                     Token: data.data.token,
//                     Email: completeUserData.email,
//                     userId: completeUserData._id,
//                 })

//                 // Instead of setting profile data directly, trigger a full profile fetch
//                 // This will get both basic and detailed profile data
//                 await fetchProfileData()

//                 toast.success(data.message || "Registration successful")
//                 setAuthLoading(false)
//                 return true
//             } else {
//                 toast.error(data.message || "Registration failed")
//                 throw new Error(data.message || "Registration failed")
//             }
//         } catch (err) {
//             console.error("Registration error:", err)
//             setProfileError(err.message || "Registration failed")
//             toast.error(err.message || "Registration failed")
//             setAuthLoading(false)
//             return false
//         }
//     }

//     const logout = () => {
//         setUser({
//             Token: null,
//             Email: null,
//             userId: null,
//         })
//         setProfileData(null)
//         setDetailedProfileData(null)

//         // Clear all user data from localStorage
//         localStorage.removeItem("Token")
//         localStorage.removeItem("Email")
//         localStorage.removeItem("userId")
//         localStorage.removeItem("UserProfile")
//         localStorage.removeItem("CompleteUserData")

//         toast.success("Logged Out Successfully")
//     }

//     // Updated updateProfile function to include image data in the same request
//     const updateProfile = async (profileData, imageFile = null) => {
//         if (!user?.Token) return { success: false, message: "Not authenticated" }

//         setAuthLoading(true)
//         try {
//             const userId = localStorage.getItem("userId")

//             if (!userId) {
//                 throw new Error("User ID not available")
//             }

//             // Create a FormData object for the profile update
//             const formData = new FormData()

//             // Add the userId
//             formData.append("userId", userId)

//             // Remove email from the profile data as it's not updatable
//             const { email, image, ...filteredProfileData } = profileData

//             // Add all profile fields to the FormData
//             Object.entries(filteredProfileData).forEach(([key, value]) => {
//                 if (value !== null && value !== undefined) {
//                     formData.append(key, value.toString())
//                 }
//             })

//             // Add the image file if provided
//             if (imageFile) {
//                 formData.append("image", imageFile)
//                 console.log("Adding image file to request:", imageFile.name)
//             }

//             console.log("Sending profile update with FormData")

//             // Update the profile with FormData
//             const response = await fetch("https://api.basementex.com/api/update-profile", {
//                 method: "PUT",
//                 headers: {
//                     Authorization: `Bearer ${user.Token}`,
//                     // Don't set Content-Type header when using FormData
//                     // The browser will set it automatically with the correct boundary
//                 },
//                 body: formData,
//             })

//             const data = await response.json()
//             console.log("Profile update response:", data)

//             if (data.status === true) {
//                 // Get the updated image URL from the response if available
//                 const updatedImageUrl = data.data?.image || data.data?.imageUrl

//                 // Update the profile data in state
//                 const updatedProfileData = {
//                     ...profileData,
//                 }

//                 if (updatedImageUrl) {
//                     updatedProfileData.image = updatedImageUrl
//                 }

//                 setProfileData((prevData) => ({
//                     ...prevData,
//                     ...updatedProfileData,
//                 }))

//                 // Update localStorage
//                 const storedProfile = JSON.parse(localStorage.getItem("UserProfile") || "{}")
//                 const updatedProfile = {
//                     ...storedProfile,
//                     ...updatedProfileData,
//                 }
//                 localStorage.setItem("UserProfile", JSON.stringify(updatedProfile))

//                 // Also update the complete user data
//                 const storedCompleteData = JSON.parse(localStorage.getItem("CompleteUserData") || "{}")
//                 localStorage.setItem(
//                     "CompleteUserData",
//                     JSON.stringify({
//                         ...storedCompleteData,
//                         ...updatedProfileData,
//                     }),
//                 )

//                 toast.success(data.message || "Profile updated successfully")
//                 setAuthLoading(false)
//                 return { success: true, data }
//             } else {
//                 toast.error(data.message || "Failed to update profile")
//                 throw new Error(data.message || "Failed to update profile")
//             }
//         } catch (err) {
//             console.error("Profile update error:", err)
//             toast.error(err.message || "Failed to update profile")
//             setAuthLoading(false)
//             return { success: false, message: err.message }
//         }
//     }

//     // Add the new functions to the context provider value
//     return (
//         <userContext.Provider
//             value={{
//                 user,
//                 setUser,
//                 profileData,
//                 profileError,
//                 authLoading,
//                 login,
//                 register,
//                 logout,
//                 fetchProfileData,
//                 refreshProfileData,
//                 updateProfile,
//             }}
//         >
//             {children}
//         </userContext.Provider>
//     )
// }

"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

export const useUser = () => {
  const context = useContext(userContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);
  const [user, setUser] = useState({
    Token: null,
    Email: null,
    userId: null,
  });

  const [profileData, setProfileData] = useState(null);
  const [profileError, setProfileError] = useState(null);
  const [detailedProfileData, setDetailedProfileData] = useState(null);
  const [detailedProfileLoading, setDetailedProfileLoading] = useState(false);

  // Add state for active dashboard mode
  const [activeDashboard, setActiveDashboard] = useState(null); // Default to student dashboard

  useEffect(() => {
    if (profileData?.role === "instructor") {
      setActiveDashboard("instructor");
    } else if (profileData?.role === "student") {
      setActiveDashboard("student");
    }
  }, [profileData]);

  useEffect(() => {
    const loadUserData = () => {
      setAuthLoading(true);
      const storedToken = localStorage.getItem("Token");
      const storedEmail = localStorage.getItem("Email");
      const storedUserId = localStorage.getItem("userId");
      const storedActiveDashboard = localStorage.getItem("activeDashboard");

      if (storedToken) {
        setUser({
          Token: storedToken,
          Email: storedEmail,
          userId: storedUserId,
        });
      }

      // Set active dashboard from localStorage if available
      if (storedActiveDashboard) {
        setActiveDashboard(storedActiveDashboard);
      }

      setAuthLoading(false);
    };
    loadUserData();
  }, []);

  // Persist user data to localStorage when it changes
  useEffect(() => {
    if (user?.Token) {
      localStorage.setItem("Token", user.Token);
      if (user.Email) localStorage.setItem("Email", user.Email);
      if (user.userId) localStorage.setItem("userId", user.userId);
    } else {
      localStorage.removeItem("Token");
      localStorage.removeItem("Email");
      localStorage.removeItem("userId");
    }
  }, [user]);

  // Persist active dashboard to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("activeDashboard", activeDashboard);
  }, [activeDashboard]);

  // Fetch profile data when user token changes, but only if we don't already have profile data
  useEffect(() => {
    if (user?.Token && !profileData) {
      fetchProfileData();
    } else if (!user?.Token) {
      // Clear profile data when user logs out
      setProfileData(null);
      setDetailedProfileData(null);
    }
  }, [user?.Token, profileData]);

  // Check if user has instructor role
  const hasInstructorRole = () => {
    return profileData?.role === "instructor";
  };

  // Switch dashboard function
  const switchDashboard = (dashboard) => {
    // If user is trying to switch to instructor dashboard but doesn't have instructor role
    if (dashboard === "instructor" && !hasInstructorRole()) {
      toast.error("You don't have permission to access instructor dashboard");
      return false;
    }

    setActiveDashboard(dashboard);

    // Navigate to the appropriate dashboard
    if (dashboard === "instructor") {
      navigate("/instructor/dashboard");
    } else {
      navigate("/student/dashboard");
    }

    return true;
  };

  // Revised fetchProfileData function to ensure complete user details are saved
  const fetchProfileData = async () => {
    if (!user?.Token) return;

    setProfileError(null);
    setAuthLoading(true);

    try {
      // First, try to get the complete user data from localStorage
      const storedCompleteProfile = localStorage.getItem("CompleteUserData");
      let basicUserData = null;

      if (storedCompleteProfile) {
        try {
          basicUserData = JSON.parse(storedCompleteProfile);
          // console.log("Using stored complete user data:", basicUserData);
        } catch (e) {
          console.error("Error parsing stored complete user data:", e);
        }
      }

      // If we don't have complete user data, create a basic profile from stored data
      if (!basicUserData) {
        basicUserData = {
          _id: user.userId,
          email: user.Email,
          // Add other basic fields if available
        };
        console.log(
          "Created basic user data from stored values:",
          basicUserData
        );
      }

      const userId = user.userId;
      if (!userId) {
        console.error("No user ID available for profile fetch");
        throw new Error("User ID not available");
      }

      try {
        // Fetch detailed profile data
        // console.log("Fetching detailed profile with userId:", userId);
        const detailedResponse = await fetch(
          `https://api.basementex.com/api/profil_details/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.Token}`,
            },
          }
        );

        const detailedData = await detailedResponse.json();
        if (detailedData?.data[0]?.status === "inactive") {
          navigate("/deactivated");
          logout();
        }

        if (
          detailedData.status &&
          detailedData.data &&
          Array.isArray(detailedData.data) &&
          detailedData.data.length > 0
        ) {
          // Merge the detailed profile data with the basic user data
          const detailedUserData = detailedData.data[0];
          const mergedData = { ...basicUserData, ...detailedUserData };
          // console.log("Merged profile data:", mergedData);

          setProfileData(mergedData);
          localStorage.setItem("UserProfile", JSON.stringify(mergedData));

          // If user has instructor role but is in student dashboard, keep it as is
          // If user doesn't have instructor role but is in instructor dashboard, switch to student
          if (
            mergedData.role !== "instructor" &&
            activeDashboard === "instructor"
          ) {
            setActiveDashboard("student");
            navigate("/student/dashboard");
          }
        } else {
          console.warn(
            "Detailed profile data not found or invalid format:",
            detailedData
          );
          // If detailed data fetch fails, just use the basic data
          setProfileData(basicUserData);
          localStorage.setItem("UserProfile", JSON.stringify(basicUserData));
        }
      } catch (detailedErr) {
        console.error("Error fetching detailed profile data:", detailedErr);
        // If detailed data fetch fails, just use the basic data
        setProfileData(basicUserData);
        localStorage.setItem("UserProfile", JSON.stringify(basicUserData));
      }
    } catch (err) {
      console.error("Error in profile data process:", err);
      setProfileError("Failed to load profile data");

      // Try to load from localStorage as fallback
      const storedProfile = localStorage.getItem("UserProfile");
      if (storedProfile) {
        try {
          setProfileData(JSON.parse(storedProfile));
        } catch (e) {
          console.error("Error parsing stored profile:", e);
        }
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // Add this function to refresh the profile data on demand
  const refreshProfileData = async () => {
    setProfileData(null); // Clear existing data
    return await fetchProfileData(); // Fetch fresh data
  };

  // Update the login function to store complete user data
  // const login = async (formData) => {
  //   setAuthLoading(true);
  //   setProfileError(null);

  //   try {
  //     const response = await fetch(
  //       "https://api.basementex.com/api/v1/web/login",
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       }
  //     );

  //     const data = await response.json();
  //     console.log("Login response:", data);

  //     if (data.status) {
  //       // Store the complete user data from the login response
  //       const completeUserData = data.data.user;
  //       localStorage.setItem(
  //         "CompleteUserData",
  //         JSON.stringify(completeUserData)
  //       );
  //       console.log("Stored complete user data:", completeUserData);

  //       // Set user with token, email, and userId
  //       setUser({
  //         Token: data.data.token,
  //         Email: completeUserData.email,
  //         userId: completeUserData._id,
  //       });

  //       toast.success(data.message);

  //       // Instead of setting profile data directly, trigger a full profile fetch
  //       // This will get both basic and detailed profile data
  //       await fetchProfileData();

  //       // Set default dashboard based on role
  //       if (completeUserData.role === "instructor") {
  //         // If user has instructor role, they can choose which dashboard to use
  //         // We'll keep their previous preference or default to student
  //         const storedDashboard = localStorage.getItem("activeDashboard");
  //         setActiveDashboard(storedDashboard || "student");
  //       } else {
  //         // If user doesn't have instructor role, they can only use student dashboard
  //         setActiveDashboard("student");
  //       }

  //       setAuthLoading(false);
  //       return true;
  //     } else {
  //       toast.error(data.message || "Login failed");
  //       throw new Error(data.message || "Login failed");
  //     }
  //   } catch (err) {
  //     console.error("Login error:", err);
  //     setProfileError(err.message || "Login failed");
  //     toast.error(err.message || "Login failed");
  //     setAuthLoading(false);
  //     return false;
  //   }
  // };
  const login = async (formData) => {
    setAuthLoading(true);
    setProfileError(null);

    try {
      const response = await fetch(
        "https://api.basementex.com/api/v1/web/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.status) {
        const completeUserData = data.data.user;

        // Set user with token, email, and userId.
        // This is crucial to keep the user's session active for any subsequent checks.
        setUser({
          Token: data.data.token,
          Email: completeUserData.email,
          userId: completeUserData._id,
        });

        // Now, check for the inactive status.
        if (completeUserData?.status === "inactive") {
          navigate("/deactivated");
          // Log out the user immediately after showing the error
          // This clears all the data and effectively ends the session.
          logout(); // You need to make sure this function is available here.
          setAuthLoading(false);
          return false;
        } else {
          // If the user is active, proceed with the normal login flow.
          localStorage.setItem(
            "CompleteUserData",
            JSON.stringify(completeUserData)
          );

          toast.success(data.message);

          // Fetch the full profile details.
          await fetchProfileData();

          // Set the dashboard based on the user's role.
          if (completeUserData.role === "instructor") {
            const storedDashboard = localStorage.getItem("activeDashboard");
            setActiveDashboard(storedDashboard || "student");
          } else {
            setActiveDashboard("student");
          }

          setAuthLoading(false);
          return true;
        }
      } else {
        toast.error(data.message || "Login failed");
        throw new Error(data.message || "Login failed");
      }
    } catch (err) {
      console.error("Login error:", err);
      setProfileError(err.message || "Login failed");
      toast.error(err.message || "Login failed");
      setAuthLoading(false);
      return false;
    }
  };
  // Update the register function to store complete user data
  const register = async (formData) => {
    setAuthLoading(true);
    setProfileError(null);

    try {
      const response = await fetch(
        "https://api.basementex.com/api/v1/web/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      if (data.status === true) {
        // Store the complete user data from the register response
        const completeUserData = data.data.user;
        localStorage.setItem(
          "CompleteUserData",
          JSON.stringify(completeUserData)
        );
        console.log("Stored complete user data:", completeUserData);

        // Set user with token, email, and userId
        setUser({
          Token: data.data.token,
          Email: completeUserData.email,
          userId: completeUserData._id,
        });

        // Instead of setting profile data directly, trigger a full profile fetch
        // This will get both basic and detailed profile data
        await fetchProfileData();

        // New users are always set to student dashboard initially
        setActiveDashboard("student");

        toast.success(data.message || "Registration successful");
        setAuthLoading(false);
        return true;
      } else {
        toast.error(data.message || "Registration failed");
        throw new Error(data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setProfileError(err.message || "Registration failed");
      toast.error(err.message || "Registration failed");
      setAuthLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser({
      Token: null,
      Email: null,
      userId: null,
    });
    setProfileData(null);
    setDetailedProfileData(null);
    setActiveDashboard("student"); // Reset to student dashboard on logout

    // Clear all user data from localStorage
    localStorage.removeItem("Token");
    localStorage.removeItem("Email");
    localStorage.removeItem("userId");
    localStorage.removeItem("UserProfile");
    localStorage.removeItem("CompleteUserData");
    localStorage.removeItem("activeDashboard");

    // toast.success("Logged Out Successfully");
  };

  const logoutByToken = () => {
    setUser({
      Token: null,
      Email: null,
      userId: null,
    });
    setProfileData(null);
    setDetailedProfileData(null);
    setActiveDashboard("student"); // Reset to student dashboard on logout

    // Clear all user data from localStorage
    localStorage.removeItem("Token");
    localStorage.removeItem("Email");
    localStorage.removeItem("userId");
    localStorage.removeItem("UserProfile");
    localStorage.removeItem("CompleteUserData");
    localStorage.removeItem("activeDashboard");
  };

  // Updated updateProfile function to include image data in the same request
  const updateProfile = async (profileData, imageFile = null) => {
    if (!user?.Token) return { success: false, message: "Not authenticated" };

    setAuthLoading(true);
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        throw new Error("User ID not available");
      }

      // Create a FormData object for the profile update
      const formData = new FormData();

      // Add the userId
      formData.append("userId", userId);

      // Remove email from the profile data as it's not updatable
      const { email, image, ...filteredProfileData } = profileData;

      // Add all profile fields to the FormData
      Object.entries(filteredProfileData).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          formData.append(key, value.toString());
        }
      });

      // Add the image file if provided
      if (imageFile) {
        formData.append("image", imageFile);
      }

      // Update the profile with FormData
      const response = await fetch(
        "https://api.basementex.com/api/update-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${user.Token}`,
            // Don't set Content-Type header when using FormData
            // The browser will set it automatically with the correct boundary
          },
          body: formData,
        }
      );

      const data = await response.json();

      if (data.status === true) {
        // Get the updated image URL from the response if available
        const updatedImageUrl = data.data?.image || data.data?.imageUrl;

        // Update the profile data in state
        const updatedProfileData = {
          ...profileData,
        };

        if (updatedImageUrl) {
          updatedProfileData.image = updatedImageUrl;
        }

        setProfileData((prevData) => ({
          ...prevData,
          ...updatedProfileData,
        }));

        // Update localStorage
        const storedProfile = JSON.parse(
          localStorage.getItem("UserProfile") || "{}"
        );
        const updatedProfile = {
          ...storedProfile,
          ...updatedProfileData,
        };
        localStorage.setItem("UserProfile", JSON.stringify(updatedProfile));

        // Also update the complete user data
        const storedCompleteData = JSON.parse(
          localStorage.getItem("CompleteUserData") || "{}"
        );
        localStorage.setItem(
          "CompleteUserData",
          JSON.stringify({
            ...storedCompleteData,
            ...updatedProfileData,
          })
        );

        toast.success(data.message);
        setAuthLoading(false);
        return { success: true, data };
      } else {
        toast.error(data.message || "Failed to update profile");
        throw new Error(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Profile update error:", err);
      toast.error(err.message || "Failed to update profile");
      setAuthLoading(false);
      return { success: false, message: err.message };
    }
  };

  // Add the new functions to the context provider value
  return (
    <userContext.Provider
      value={{
        user,
        setUser,
        profileData,
        profileError,
        authLoading,
        login,
        register,
        logout,
        logoutByToken,
        fetchProfileData,
        refreshProfileData,
        updateProfile,
        activeDashboard,
        switchDashboard,
        hasInstructorRole,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

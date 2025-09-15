// import { useState, useEffect } from 'react';

// import api from "../services/api/axiosConfig";

// const useProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchProfile = async () => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.get('/user-profile/');
//       setProfile(response.data);
//     } catch (err) {
//       setError(err.response?.data || 'Failed to fetch profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const updateProfile = async (profileData) => {
//     try {
//       setLoading(true);
//       setError(null);
      
//       const response = await api.patch('/user-profile/', profileData);
//       setProfile(response.data);
//       return response.data;
//     } catch (err) {
//       setError(err.response?.data || 'Failed to update profile');
//       throw err;
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const refetch = () => {
//     fetchProfile();
//   };

//   return {
//     profile,
//     loading,
//     error,
//     refetch,
//     updateProfile
//   };
// };

// export default useProfile;


import { useState, useEffect } from 'react';
import api from "../services/api/axiosConfig";

const useProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await api.get('/user-profile/');
      setProfile(response.data);
    } catch (err) {
      setError(err.response?.data || 'Failed to fetch profile');
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileData) => {
    try {
      setLoading(true);
      setError(null);
      
      // Prepare the data in the format expected by the backend
      const updateData = {
        first_name: profileData.firstName,
        last_name: profileData.lastName,
        date_of_birth: profileData.dateOfBirth,
        gender: profileData.gender,
        // Include other fields that your backend expects
      };
      
      const response = await api.patch('/user-profile/', updateData);
      setProfile(response.data);
      return response.data;
    } catch (err) {
      setError(err.response?.data || 'Failed to update profile');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const refetch = () => {
    fetchProfile();
  };

  return {
    profile,
    loading,
    error,
    refetch,
    updateProfile
  };
};

export default useProfile;
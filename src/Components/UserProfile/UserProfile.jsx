import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPencilAlt } from "react-icons/fa";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  signOut,
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { db, storage } from "../../firebase/firebase.config";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import "./UserProfile.css";
import cross_icon from "../../assets/cross_icon.png";

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const auth = getAuth();

  const [userData, setUserData] = useState({
    displayName: "",
    email: "",
    photoURL: "",
    phNO: "",
  });
  const [profilePicture, setProfilePicture] = useState(
    "https://via.placeholder.com/150"
  );
  const [editingPhone, setEditingPhone] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const [authUserEmail, setAuthUserEmail] = useState(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showReauthConfirm, setShowReauthConfirm] = useState(false);
  const [reauthEmail, setReauthEmail] = useState("");
  const [reauthPassword, setReauthPassword] = useState("");

  useEffect(() => {
    const fetchAuthUserEmail = async () => {
      const user = auth.currentUser;
      if (user) {
        setAuthUserEmail(user.email);
      }
    };

    fetchAuthUserEmail();
  }, [auth]);

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const usersRef = collection(db, "users");
          const q = query(usersRef, where("_id", "==", id));
          const querySnapshot = await getDocs(q);

          if (!querySnapshot.empty) {
            const userDoc = querySnapshot.docs[0];
            const userData = userDoc.data();
            setUserData(userData);
            setProfilePicture(
              userData.photoURL || "https://via.placeholder.com/150"
            );
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, [id]);

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      const fileRef = ref(storage, `profile_pictures/${id}_${file.name}`);

      try {
        await uploadBytes(fileRef, file);
        const newPhotoURL = await getDownloadURL(fileRef);

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("_id", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref;
          await updateDoc(userDocRef, { photoURL: newPhotoURL });

          setProfilePicture(newPhotoURL);
          setUserData((prevState) => ({
            ...prevState,
            photoURL: newPhotoURL,
          }));

          // Update local storage with the new profile picture URL
          localStorage.setItem("profileImageUrl", newPhotoURL);

          if (
            userData.photoURL &&
            userData.photoURL !== "https://via.placeholder.com/150"
          ) {
            const previousProfilePicRef = ref(storage, userData.photoURL);
            await deleteObject(previousProfilePicRef);
          }
        }
      } catch (error) {
        console.error("Error uploading profile picture:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDeleteAccount = () => {
    setShowReauthConfirm(true);
  };

  const confirmReauth = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        const credential = EmailAuthProvider.credential(
          reauthEmail,
          reauthPassword
        );
        await reauthenticateWithCredential(user, credential);

        const usersRef = collection(db, "users");
        const q = query(usersRef, where("_id", "==", id));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref;
          await deleteDoc(userDocRef);
        }

        await deleteUser(user);
        navigate("/");
      }
    } catch (error) {
      console.error("Error re-authenticating or deleting account:", error);
      alert("Unable to delete account: Incorrect credentials");
    }
  };

  const cancelReauth = () => {
    setShowReauthConfirm(false);
    setReauthEmail("");
    setReauthPassword("");
  };

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Sign out error", error);
      });
  };

  const handlePhoneEditClick = () => {
    setEditingPhone(true);
    setNewPhoneNumber(userData.phNO);
  };

  const handlePhoneSave = async () => {
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("_id", "==", id));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        await updateDoc(userDocRef, {
          phNO: newPhoneNumber,
        });

        setUserData((prevState) => ({
          ...prevState,
          phNO: newPhoneNumber,
        }));

        setEditingPhone(false);
      }
    } catch (error) {
      console.error("Error updating phone number:", error);
    }
  };

  const handlePhoneCancel = () => {
    setEditingPhone(false);
    setNewPhoneNumber("");
  };

  return (
    <div className="ex-user-profile">
    <div className="ex-profile-picture">
      {loading ? (
        <div className="ex-loader">Uploading...</div>
      ) : (
        <img src={profilePicture} alt="Profile" />
      )}
      {userData.email === authUserEmail && (
        <>
          <FaPencilAlt
            className="ex-edit-icon"
            onClick={() => fileInputRef.current.click()}
          />
          <input
            type="file"
            ref={fileInputRef}
            className="ex-file-input"
            onChange={handleProfilePictureUpload}
            accept="image/*"
          />
        </>
      )}
    </div>
  
    <h1>{userData.displayName}</h1>
  
    <div className="ex-user-info">
      <div>
        <p>
          <strong>Email:</strong> {userData.email}
        </p>
        <p>
          <strong>Credits Earned</strong> {userData.credits}
        </p>
      </div>
      <div>
        <p>
          <strong>Phone Number: </strong>
          {editingPhone ? (
            <div className="ex-phone-input-container">
              <input
                type="text"
                value={newPhoneNumber}
                onChange={(e) => setNewPhoneNumber(e.target.value)}
                className="ex-phone-input"
              />
              <div className="ex-phone-buttons">
                <button onClick={handlePhoneSave} className="ex-save-button">
                  Save
                </button>
                <button onClick={handlePhoneCancel} className="ex-cancel-button">
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <span>{userData.phNO}</span>
          )}
        </p>
      </div>
    </div>
  
    <div className="ex-footer-buttons">
      <button className="ex-delete-account-button" onClick={handleDeleteAccount}>
        Delete Account
      </button>
      <button className="ex-logout-button" onClick={handleLogout}>
        Logout
      </button>
    </div>
  
    {showReauthConfirm && (
      <div className="ex-login-popup2">
        <div className="ex-login-popup-container2">
          <h2>Reauthenticate to Confirm</h2>
          <input
            type="email"
            placeholder="Email"
            value={reauthEmail}
            onChange={(e) => setReauthEmail(e.target.value)}
            className="ex-popup-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={reauthPassword}
            onChange={(e) => setReauthPassword(e.target.value)}
            className="ex-popup-input"
          />
          <div className="ex-popup-buttons">
            <button onClick={confirmReauth} className="ex-confirm-button">
              Confirm
            </button>
            <button onClick={cancelReauth} className="ex-cancel-button">
              Cancel
            </button>
          </div>
        </div>
      </div>
    )}
  </div>
  
  );
};

export default UserProfile;
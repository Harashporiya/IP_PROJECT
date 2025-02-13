import React, { useContext, useState } from 'react';
import Header from '../Header/Header';
import { UserDataContext } from '../Header/context';
import styles from "./profile.module.css"; 
import { AnimatePresence, motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { profileEditUser } from '../SagaRedux/Slice';
import MessageHandler from '../Signup/MessageHandler';
import Product from './Product';
import Skeleton from '@mui/material/Skeleton';
import Footer from "../Footer/Footer"

const Profile = () => {
    const dispatch = useDispatch();
    const {data} = useContext(UserDataContext);
    const [isOpen, setIsOpen] = useState(false);
    const [userName, setUserName] = useState(data.username || '');
    const [profileImage, setProfileImage] = useState(null);

    const handleProfileUpdate = () => {
        const formData = new FormData();
        formData.append('userId', data._id);
        
        if (userName !== data.username) {
            formData.append('username', userName);
        }
        
        if (profileImage) {
            formData.append('profileImage', profileImage);
        }
        const payload = {
            userId: data._id,
            username: userName !== data.username ? userName : undefined,
        };

        dispatch(profileEditUser(formData));
        setIsOpen(false);
    };
    
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);
    };

    return (
        <>
            <Header />
            <div className={styles.profilePageContainer}>
            <div className={styles.profilePage}>
                <div className={styles.profileCard}>
                    <div className={styles.profileHeader}>
                        <div className={styles.profileImageContainer}>
                            
                            <img
                                className={styles.profileImage}
                                src={data.profileImage || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                                alt={data.name}
                            />
                        </div>
                        <div className={styles.profileInfo}>
                            <h1 className={styles.profileName}>{data.name || <Skeleton variant="text" width={380} height={60} />}</h1>
                            <p className={styles.profileUsername}>{data.username || <Skeleton variant="text" width={280} height={30} />}</p>
                            <p className={styles.profileEmail}>{data.email || <Skeleton variant="text" width={380} height={30} />}</p>
                        </div>
                    </div>
                    <div className={styles.accountCreateContainer}>
                        <div>
                            <p className={styles.accountCreate}>Account Create: { new Date(data.createdAt).toLocaleDateString() ||  <Skeleton variant="text" width={80} height={30} />}, {new Date(data.createdAt).toLocaleTimeString() ||  <Skeleton variant="text" width={80} height={30} />}</p>
                            <p className={styles.profileUpdate}>Profile Update: {new Date(data.updatedAt).toLocaleDateString() ||  <Skeleton variant="text" width={80} height={30} />}, {new Date(data.updatedAt).toLocaleTimeString() ||  <Skeleton variant="text" width={80} height={30} />}</p>
                        </div>
                        <div className={styles.btnEditProfileContainer} onClick={() => setIsOpen(true)}>
                            <motion.button whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                className={styles.btn}>
                                Edit Profile
                            </motion.button>
                        </div>
                        <div className={styles.dialog}>

                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div className={styles.dialogContainer} onClick={() => setIsOpen(false)}>
                                        <motion.div className={styles.dialogPage}
                                            onClick={(e) => e.stopPropagation()}
                                            initial={{ y: "-100vh" }}
                                            animate={{ y: "0vh" }}
                                            exit={{ y: "100vh" }}
                                            transition={{ duration: 0.5 }}
                                        >
                                            <h2 className={styles.textDialogText}>Hello {data.name}</h2>
                                            <div className={styles.usernameContainer}>
                                                <input type='text' style={{color:"black"}}
                                                    id='name' className={styles.changeUsername} placeholder='Change userName....' 
                                                    value={userName} onChange={(e)=>setUserName(e.target.value)} />

                                            </div>
                                            <div className={styles.fileUploadContainer}>
                                                <input type='file'
                                                    id='name' className={styles.fileUpload} placeholder='Enter your username'
                                                    onChange={handleFileChange} />
                                            </div>

                                            <div className={styles.updatebtnProfile}>
                                                <button className={styles.updateButton} onClick={handleProfileUpdate}>Update profile</button>
                                            </div>
                                        </motion.div>

                                    </motion.div>
                                )
                                }
                            </AnimatePresence>

                        </div>
                    </div>
                   
                </div>
               <div className={styles.totalDetailsForBuyAndSelling}>
                    <div>
                        <p>Total sell the product: <spna>5</spna></p>
                        <p>Total Buy the product: <span>0</span></p>
                        <p></p>
                    </div>
               </div>
            </div>
            <div>
               <Product/>
               </div>

            </div>
            <MessageHandler/>
            <Footer/>
        </>
    );
};

export default Profile;
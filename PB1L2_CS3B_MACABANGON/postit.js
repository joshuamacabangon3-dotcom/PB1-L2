/* =========================================
   POSTIT JAVASCRIPT
   Personal Caption Posting System

   Main functions:
   1. Save user information one time
   2. Allow caption-only posts
   3. Encrypt User Name + Post + Date
   4. Save posts in localStorage
   5. Display posts as a thread
========================================= */


/* =========================================
   STORAGE KEYS
========================================= */

// Storage name for the single user
const USER_STORAGE_KEY = "postit_user";

// Storage name for all posts
const POSTS_STORAGE_KEY = "postit_posts";

// Secret key used for AES encryption
const ENCRYPTION_KEY = "POSTIT_2026_SECRET_KEY";


/* =========================================
   GET HTML ELEMENTS
========================================= */

const userSection =
    document.getElementById("userSection");

const postSection =
    document.getElementById("postSection");

const userForm =
    document.getElementById("userForm");

const displayName =
    document.getElementById("displayName");

const captionInput =
    document.getElementById("caption");

const postButton =
    document.getElementById("postButton");

const postThread =
    document.getElementById("postThread");

const characterCount =
    document.getElementById("characterCount");


/* =========================================
   START APPLICATION
========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Check if the user has already entered information
        checkExistingUser();

        // Show initial character count
        updateCharacterCount();

        // Load previously saved posts
        loadPosts();

    }
);


/* =========================================
   CHECK EXISTING USER
========================================= */

function checkExistingUser() {

    // Get saved user from browser storage
    const savedUser =
        localStorage.getItem(USER_STORAGE_KEY);


    // If user information already exists
    if (savedUser) {

        try {

            const user =
                JSON.parse(savedUser);

            // Skip the information form
            showPostSection(user);

        } catch (error) {

            console.error(
                "Error reading saved user:",
                error
            );

            // Remove invalid information
            localStorage.removeItem(
                USER_STORAGE_KEY
            );

        }

    }

}


/* =========================================
   USER INFORMATION FORM
========================================= */

userForm.addEventListener(
    "submit",
    function (event) {

        // Prevent page refresh
        event.preventDefault();


        /* =====================================
           GET FORM VALUES
        ===================================== */

        const fullName =
            document
                .getElementById("fullName")
                .value
                .trim();


        const dateOfBirth =
            document
                .getElementById("dateOfBirth")
                .value;


        const yearLevel =
            document
                .getElementById("yearLevel")
                .value;


        const gender =
            document
                .getElementById("gender")
                .value;


        const username =
            document
                .getElementById("username")
                .value
                .trim();


        const password =
            document
                .getElementById("password")
                .value;


        /* =====================================
           VALIDATE FORM
        ===================================== */

        if (
            fullName === "" ||
            dateOfBirth === "" ||
            yearLevel === "" ||
            gender === "" ||
            username === "" ||
            password === ""
        ) {

            alert(
                "Please complete all fields."
            );

            return;
        }


        /* =====================================
           PASSWORD VALIDATION
        ===================================== */

        if (password.length < 4) {

            alert(
                "Password must contain at least 4 characters."
            );

            return;
        }


        /* =====================================
           CREATE USER
        ===================================== */

        const user = {

            fullName: fullName,

            dateOfBirth: dateOfBirth,

            yearLevel: yearLevel,

            gender: gender,

            username: username,

            /*
             * SHA-256 is used so the password
             * is not stored as plain text.
             */
            passwordHash:
                CryptoJS
                    .SHA256(password)
                    .toString()

        };


        /* =====================================
           SAVE 

// Initialize Firebase
var config = {
    apiKey: "AIzaSyAAbEzsxxCn6SLa7QMW5ISUurNKcGcW4nk",
    authDomain: "halfway-hangouts.firebaseapp.com",
    databaseURL: "https://halfway-hangouts.firebaseio.com",
    projectId: "halfway-hangouts",
    storageBucket: "halfway-hangouts.appspot.com",
    messagingSenderId: "798688988815"
};

firebase.initializeApp(config);

// Create a variable to reference the database
var database = firebase.database();

var providerFB = new firebase.auth.FacebookAuthProvider();

window.fbAsyncInit = function () {
    FB.init({
        appId: '459732927895171',
        xfbml: true,
        version: 'v3.2'
    });
};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) { return; }
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));


function facebookSignin() {
    event.preventDefault();

    firebase.auth().signInWithRedirect(providerFB);

    firebase.auth().getRedirectResult().then(function (result) {
        if (result.credential) {
            // This gives you a Facebook Access Token. You can use it to access the Facebook API.
            var token = result.credential.accessToken;
            // ...
        }
        // The signed-in user info.
        var user = result.user;
        console.log("login successful!!!")
        $("#login-link-button").text("MY ACCOUNT")
    }).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

// Global variable
let currentuser;

// Capture Sign-IN Button Click
$("#sign-in").on("click", function (event) {
    // Don't refresh the page!
    event.preventDefault();

    // Capture User Inputs and store them into variables
    var email = $("#username").val().trim();
    var password = $("#password").val().trim();

    // Console log each of the user inputs to confirm we are receiving them
    // console.log(email);
    // console.log(password);


    firebase.auth().signInWithEmailAndPassword(email, password).then(function () {
        console.log("sign in successful.");
        // window.location = "home";
        // $("#login-link-button").html('<a href="my-account.html" class="no-underline block mt-4 lg:inline-block lg:mt-0 text-white mr-4">MY ACCOUNT</a>');
    },
        function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
        });
});

// // sign up - check your firebase authorization
$("#sign-up").click(function () {
    var emailNewUser = $("#usn").val().trim();
    var passwordNewUser = $("#psw").val().trim();
    firebase.auth().createUserWithEmailAndPassword(emailNewUser, passwordNewUser).then(function () {
        console.log("sign up successful.");
        // $("#login-link-button").html('<a href="my-account.html" class="no-underline block mt-4 lg:inline-block lg:mt-0 text-white mr-4">MY ACCOUNT</a>');
        // window.location = "index.html";
        $(".login-form-side").hide();
    }, function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode);
        console.log(errorMessage);
    });
});

// — checking if user loggin
function checkLogin() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            var uid = user.uid;
            var providerData = user.providerData;

            // to Global variable
            currentuser = user.uid;
            var idToken = {};

            console.log("loggedin");
            console.log(uid);
            console.log(email);
            $(".email-display").html("<h1 class='text-black text-center m-auto'><p>Email: " + email + "</p></h1>")
            $(".status").text("Welcome. You are loggedin.");
            $(".user-id-display").append(uid);

            $(".login-form-side").hide();
            $("#login-link-button").html('<a href="my-account.html" class="no-underline block mt-4 lg:inline-block lg:mt-0 text-white mr-4">MY ACCOUNT</a>');

            // -- sending token
            user.getIdToken().then(function (data) {
                // Send Token to backend via HTTP

                idToken = {
                    Authorization: "Bearer " + data
                }

                $.post("/auth", idToken)
                    .then();
            });

        }
        else {
            // User is signed out.
            $(".status").text("You are not loggedin.");
            console.log("not loggedin");
        }
    });
};

checkLogin();

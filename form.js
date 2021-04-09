const info_btn = document.getElementsByClassName("info-btn")
for (let i = 0; i < info_btn.length; i++) {
  info_btn[i].onclick = () => {
    document.querySelector(".container").classList.toggle("log-in");
  }; 
}

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.

    document.getElementById("user_div").style.display = "block";
    document.getElementById("login_div").style.display = "none";

    var user = firebase.auth().currentUser;
    var db = firebase.firestore();

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "User Id : " + email_id;

      db.collection("users").doc(user.uid).onSnapshot(resp=>{
        const data = resp.data();
        document.getElementById("dob_para").innerHTML = "DOB : " + data.dob;
      })

    }

  } else {
    // No user is signed in.

    document.getElementById("user_div").style.display = "none";
    document.getElementById("login_div").style.display = "block";

  }
});

function login(){
 
  
  var userEmail = document.getElementById("email_field").value;
  var userPass = document.getElementById("password_field").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    window.alert("hello");
    var errorCode = error.code;
    var errorMessage = error.message;

    window.alert("Error : " + errorMessage);

    // ...
  });
  // window.alert("hello");

}

function logout(){
  firebase.auth().signOut();
}




/////////////////////////////////////////////////


const signupBtn = document.querySelector('#signup-btn');
signupBtn.addEventListener('click', e => {
e.preventDefault();

const email = document.querySelector('#email').value;
const password = document.querySelector('#password').value;
const dob = document.querySelector('#signup-bio').value;



firebase.auth().createUserWithEmailAndPassword(email, password).then(cred=>{
  const db = firebase.firestore();
  db.collection("users").doc(cred.user.uid).set({
    dob: dob
  });
  console.log("done");
}).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  if (errorCode == 'auth/weak-password') {
    alert('The password is too weak.');
  } else {
    alert(errorMessage);
  }
  console.log(error);
});

});





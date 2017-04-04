/**
 * Handles the login button press
 */
function toggleLogIn() {
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	
	if (email.length < 4) {
		alert('Please enter an email address.');
		return;
	}
	
	if (password.length < 4) {
		alert('Please enter a password.');
		return;
	}
	
	firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
		// Handle errors
		var errorCode = error.code;
		var errorMessage = error.message;
		
		if (errorCode == 'auth/wrong-password') {
			// TODO: replace with error message div using AJAX
			alert('Wrong password.');
		} else {
			alert(errorMessage);
		}
		console.log(error);
	});
} // END toggleLogIn)

/**
 * Handles the sign up button press
 */
function handleSignUp() {
	var fname = document.getElementById('fname').value;
	var lname = document.getElementById('lname').value;
	var username = document.getElementById('username').value;
	var email = document.getElementById('email').value;
	var password = document.getElementById('password').value;
	var repeatedPassword = document.getElementById('repeatedPassword').value;
	
	if (email.length < 4) {
		alert('Please enter an email address.');
		return;
	}
	
	if (password.length < 4) {
		alert('Please enter a password.');
		return;
	}
	
	if (password != repeatedPassword) {
		alert('Passwords do not match.');
		return;
	}
	
	firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user) {
		firebase.database().ref().child("users/" + user.uid).set({
			fname: fname,
			lname: lname,
			fullname: fname + ' ' + lname,
			username: username,
			email: email,
			uid: user.uid
		});
	}).catch(function(error) {
		var errorCode = error.code;
		var errorMessage = error.message;
		
		if (errorCode == 'auth/weak-password') {
			alert('The password is too weak');
		} else {
			alert(errorMessage);
		}
		console.log(error);
	});
} // END handleSignUp()
# **image-network**
## CSCI-201L Group Project

### Members:
1. Sriram Somasundaram
2. Richard Ju
3. Ethan Chang
4. Kevin Nguyen

### Idea:
> A social media web application that displays a network
> of how people are related to each other based on the 
> similarities in their profile pictures or pictures.

### Task List:
- [x] Front end design (displaying network + UI : 75%) [Richard]
- [x] GitHub Organization (You're in it!!! :metal:) [Kevin]
- [ ] Check Facebook API [Kevin/Ethan]
- [ ] Database (Firebase + Firebase auth) [Kevin/Ethan]
- [ ] K-means clustering/Image similarity [Sriram]

### Firebase Docs
#### Adding firebase to application HTML
```javascript
<script src="https://www.gstatic.com/firebasejs/3.6.10/firebase.js"></script>
<script>
    // Initialize Firebase
    // TODO: Replace with your project's customized code snippet
    var config = {
        apiKey: "<API_KEY>",
        authDomin: "<PROJECT_ID>.firebaseapp.com",
        databaseURL: "https//<DATABASE_NAME>.firebaseio.com",
        storageBucket: "<BUCKET>.appspot.com",
        messagingSenderID: "<SENDER_ID>",
    };
    firebase.initializeApp(config)
</script>
```
#### Authenticating users with email/password
```javascript
// Call this function after getting form elements from the document
firebase.auth().createUserWithEmailAndPassword(email, password)
.then(function(user) {
    // Do anything else, like writing other user info besides
    // email and password to the database
})
.catch(function(error) {
    // Handle errors here
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});
```

<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@page import="org.json.*"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<%
	System.out.println("Hi");
	String json = request.getParameter("json");
	System.out.println("json: " + json);
	/* String json = java.net.URLDecoder.decode(result, "UTF-8");
	System.out.println(json); */
	JSONObject obj = new JSONObject(json);
	
	String name = obj.getString("name");
	String username = obj.getString("username");
	String email = obj.getString("email");
	
 	// String url = obj.getString("url");
	
/* 	JSONObject images = obj.getJSONObject("images");
	String profile = images.getString("image0");
	System.out.println(profile); */
	
%>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	<title>Image Network</title>
	
	<link rel="stylesheet" type="text/css" href="css/imagenetwork.css"/>
		
	<!-- START SIGMA IMPORTS -->
	<script src = "sigma-min/sigma.min.js"></script>
	<script src = "sigma-min/plugins/sigma.plugins.dragNodes.min.js"></script>
	<script src = "sigma-min/plugins/sigma.layout.forceAtlas2.min.js"></script>
	<script src = "sigma-min/plugins/sigma.plugins.animate.min.js"></script>
	<script src = "sigma-min/plugins/sigma.renderers.customEdgeShapes.min.js"></script>
	<script src = "sigma-helpers/sigmaDrawer.js"></script>
	
	<!-- END SIGMA IMPORTS -->
</head>
<body>

<div id="headerContent"
		style="overflow-y: hidden; padding-left: 2px; text-align: left; vertical-align: middle; animation: fadeInFromTop 0.1s forwards;">
		<img src="images/logotentative.png" height=45px />

		<button class="animatedButton" onclick="toggleNavBar()"
			style="cursor: pointer; float: right; margin-right: 20px; background-color: inherit;"
			height=45px>=</button>
		<img src="images/spider_icon.png" onclick="toggleWolfgang();"
			style="float: right; padding-right: 20px;" height=45px />

		</div>
		<div id="database-adjacent-reverse">
	
			<h1 class="buttonDivider">Dashboard</h1>
			<div id="database-subfill" style="background-color: #555555;">
				<table
					style="text-align: center; background-color: #555555; width: 100%; border-bottom: 1px solid grey;">
					<tr>
						<td><img id="profile_pic" src="images/default_profilepicture.png"
							style="padding: 10px; border-radius: 25px;" width=70 /></td>
						<td>
							<table style="text-align: left">
								<tr>
									<td id="dashboardProfile"></td>
								</tr>
								<tr>
									<td><a href="profile.html">Profile Details</a></td>
								</tr>
								<tr>
									<td><a href="#" id="sign-out">Sign Out</a></td>
								</tr>
							</table>
						</td>
					</tr>
				</table>
	
	
				<p class="buttonDivider" style="text-align: left">MY WEB</p>
				<button class="animatedButton" style="width: 100%; text-align: left"
					onclick="location.href = 'dashboard.html'">DASHBOARD</button>
				<button class="animatedButton" style="width: 100%; text-align: left"
					onclick="location.href = 'images.html'">IMAGES</button>
				<button class="animatedButton" style="width: 100%; text-align: left"
					onclick="location.href = 'explore.html'">EXPLORE</button>
				<p class="buttonDivider" style="text-align: left">SOCIAL</p>
				<button class="animatedButton" style="width: 100%; text-align: left"
					onclick="location.href = 'users.html'">USERS</button>
				<button class="animatedButton" style="width: 100%; text-align: left"
					onclick="location.href = 'pokes.html'">POKES</button>
				<button class="animatedButton" style="width: 100%; text-align: left"
					onclick="location.href = 'friendSearch.html'">FRIEND SEARCH</button>
				<p class="buttonDivider" style="text-align: left">SITE</p>
				<button class="animatedButton" style="width: 100%; text-align: left"
					onclick="location.href = 'contact.html'">CONTACT</button>
				<button class="animatedButton" style="width: 100%; text-align: left"
					onclick="location.href = 'contact.html'">SITE POLICY</button>
	
				<script type="text/javascript">
					sideToggled = true;
					document.getElementById("database-adjacent-reverse").style.animation = "offscreenLeft 0.1s forwards";
					function toggleNavBar() {
						if (!sideToggled)
	
							document.getElementById("database-adjacent-reverse").style.animation = "offscreenLeft 0.1s forwards";
						else
							document.getElementById("database-adjacent-reverse").style.animation = "backToScreenLeft 0.1s forwards";
						sideToggled = !sideToggled;
					}
	
					function mouseOverNavBar() {
						if (document.getElementById("database-adjacent-reverse").style.animation === "offscreenLeft 0.1s forwards")
							document.getElementById("database-adjacent-reverse").style.animation = "backToScreenLeft 0.1s forwards";
						sideToggled = false;
					}
				</script>
				<button class="symbolButton" id="sideToggle" onclick="toggleNavBar()"
					onmouseover="mouseOverNavBar()"
					style="position: absolute; left: 100%; bottom: 0; width: 10px; padding: 0; height: 100%;">|||</button>
			</div>
		</div>
	
	
	
		<!--  Wolfgang Module -->
		<script src="js/wolfgang.js"></script>
		<div id="wolfgang"
			style="display: none; position: absolute; top: 500px; left: 500px; z-index: 100">
			<p
				style="position: absolute; left: 100%; bottom: 75%; transform: rotate(45deg); background-color: #ffffff; border-radius: 25px;"
				width=200>|</p>
			<div id="wolfgangSpeechBubble"
				style="position: absolute; left: 100%; bottom: 100%; width: 400px;">
				<p id="wolfgangText"
					style="background-color: #ffffff; color: #000000; text-align: center; padding: 30px; border-radius: 55px;">Howdy!
					I'm Wolfgang! If you can't find your way around, you can find me in
					the upper right corner of the screen!</p>
				<button class="animatedButton" onclick="toggleWolfgang()"
					style="position: absolute; bottom: 75%; left: 95%; border-radius: 40px; padding: 5px; font-size: 10px; background-color: #ff0000">X</button>
			</div>
			<img src="images/spider.png" onclick="generateSpideryWisdom()"
				width=100 />
		</div>
		<!-- END Wolfgang Module -->
	
		<!-- End NavBar Module -->
	
		<div id="main" style="color: #fff; text-align: center; width: 300px; 
		margin: 0 auto; margin-top: 100px; background-color: #222222; 
		padding-bottom: 30px; padding-top: 15px; border-radius: 5px;">
			<div id="name"><%=name%></div>
			<%-- <!-- <img src=<%=url%>id="profile-img" style="width: 150px; border-radius: 10px; margin-bottom: 10px;"/> --> --%>
			<div id="username" style="margin-bottom: 10px;">@<%=username%></div>
			<div id="email"><%=email%></div>
		</div>
		
		<div id='network-graph' 
	style="opacity:0; z-index: -100; animation: fadeIn 1s ease-in 0s forwards;"></div>
	<script>drawGraphStill('network-graph', 50, ((25*24) / 2), '#2fa87e', '#2fa87e', 1, 3)</script>
		<script src="https://www.gstatic.com/firebasejs/3.7.2/firebase.js"></script>
		<script src="https://www.gstatic.com/firebasejs/3.7.2/firebase.js"></script>
		<script>
		  // Initialize Firebase
		  var config = {
		    apiKey: "AIzaSyBXwd0A6u5uWUHX9GxiT-TcwkAac_X-Wx4",
		    authDomain: "image-network.firebaseapp.com",
		    databaseURL: "https://image-network.firebaseio.com",
		    storageBucket: "image-network.appspot.com",
		    messagingSenderId: "268082674497"
		  };
		  firebase.initializeApp(config);
		  
	
	      // Call initApp() upon the window loading
	      window.onload = function() {
	    	  var img = document.getElementById('profile_pic');
	    	  var img2 = document.getElementById('profile-img');
	    	  firebase.auth().onAuthStateChanged(function(user) {
				  if (user) {
					  currentUser = user;
					  console.log(user);
					  console.log(currentUser);
					  userid = user.uid;
					  
						
					  firebase.database().ref('/users/'+ userid + '/images/image0').once('value').then(function(snapshot){
							var profilePic = snapshot.val();
							
							var storageRef = firebase.storage().ref(profilePic);
							console.log(profilePic);
					  
							storageRef.getDownloadURL().then(function(url){
								
							  img.src = url;
							  img2.src = url;
								
							}).catch(function(error){
								console.log(error);
							});
							
					  });
				  } else {
				   
				  }
			  });
	        loadDashboardProfile();
	      }
	      function loadDashboardProfile() {
	    	  firebase.auth().onAuthStateChanged(function(user) {
    				if (user) {
	    				// Populate username info
	    				var profile = document.getElementById('dashboardProfile');
	    		
	    				// Get the current user
	    				/* var user = firebase.auth().currentUser; */
	    				var ref = firebase.database().ref('users/' + user.uid);
	    				ref.once('value').then(function(snapshot) {
	    					var child = snapshot.child('username').val();
	    					profile.innerHTML = child;
	    				}).catch(function(error){
	    					// Error occurred
	    				});
	    			} else {
	    				// User is not signed in, segue to login page
	    				window.location = 'login.html';
    				}
    		  });
	      }
		</script>

</body>
</html>
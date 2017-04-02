wolfgangToggled = false;
currentX = "0";
currentY ="0";
document.onmouseover = function(e)
{
	wolfgangInspect(e.target);
}
function getOffset( el ) {
	var _x = 0;
	var _y = 0;
	while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
		_x += el.offsetLeft + el.offsetWidth / 3 - el.scrollLeft;
		_y += el.offsetTop - el.scrollTop;
		el = el.offsetParent;
	}
	return { top: _y, left: _x};
}

function wolfgangInspect(e)
{
	idCandidate = e.innerHTML;

	if(idCandidate == "DASHBOARD")
	{
		document.getElementById("wolfgangText").innerHTML = 
			"This is the dashboard! You can see your network and recent activity here!";
		moveTo(getOffset(e).left, getOffset(e).top);
	}
	else if(idCandidate == "IMAGES")
	{
		document.getElementById("wolfgangText").innerHTML = 
			"Here, you can submit and look at your submitted images!";
		moveTo(getOffset(e).left, getOffset(e).top);
	}
	else if(idCandidate == "EXPLORE")
	{
		document.getElementById("wolfgangText").innerHTML = 
			"Here, you can navigate the network, find friends, and look at trending images!";
		moveTo(getOffset(e).left, getOffset(e).top);
	}
	else if(idCandidate == "USERS")
	{
		document.getElementById("wolfgangText").innerHTML = 
			"This is the Users tab! Here, you can see what your friends are doing!";
		moveTo(getOffset(e).left, getOffset(e).top);
	}
	else if(idCandidate == "POKES")
	{
		document.getElementById("wolfgangText").innerHTML = 
			"Here, you can send pokes to your friends!";
		moveTo(getOffset(e).left, getOffset(e).top);
	}
	else if(idCandidate == "FRIEND SEARCH")
	{
		document.getElementById("wolfgangText").innerHTML = 
			"Here, you can find more friends!";
		moveTo(getOffset(e).left, getOffset(e).top);
	}
	else if(idCandidate == "CONTACT")
	{
		document.getElementById("wolfgangText").innerHTML = 
			"You can get the developers' contact information here!";
		moveTo(getOffset(e).left, getOffset(e).top);
	}

	else if(idCandidate == "View Profile Details")
	{
		document.getElementById("wolfgangText").innerHTML = 
			"Click here to learn more about this person!";
		moveTo(getOffset(e).left, getOffset(e).top);
	}
	
	else if(idCandidate == "SITE POLICY")
	{
		document.getElementById("wolfgangText").innerHTML = 
			"idk, bro! I'm a spider - I can't read!";
		moveTo(getOffset(e).left, getOffset(e).top);
	}

	else if(idCandidate == "|||")
	{
		document.getElementById("wolfgangText").innerHTML = 
			"You can click on this to open and close this menu!";
		moveTo(getOffset(e).left, getOffset(e).top + 100);
	}

}
function toggleWolfgang()
{
	fadeTime = 1;
	if(wolfgangToggled)
	{

		document.getElementById("wolfgang").style.display = "block";
		document.getElementById("wolfgangText").innerHTML = "Howdy! Mouse over something and I'll tell you all about it! You can click on the spider icon in the upper right corner to disable me!";
		document.getElementById("wolfgang").style.animation = "fadeIn "+fadeTime+"s forwards";
	}
	else
	{
		document.getElementById("wolfgang").style.display = "none";
	}
	wolfgangToggled = !wolfgangToggled;
}
function generateSpideryWisdom()
{
	phrase = Math.floor(Math.random() * 5);
	switch(phrase)
	{
	
	case 3:
	document.getElementById("wolfgangText").innerHTML = "When spiders get really angry, they get driven up the wall.";
	break;	
	
	case 2:
		document.getElementById("wolfgangText").innerHTML = "If you cross a spider with corn, you get a cob web.";
		break;
		
	case 1:
		document.getElementById("wolfgangText").innerHTML = "Mom says I spend too much time. On the web.";
		break;
		
	case 0:
		document.getElementById("wolfgangText").innerHTML = "An undercover spider is called a spy-der.";
		break;
		
	default:
		document.getElementById("wolfgangText").innerHTML = "I am Sir Wolfgang Spindlylegs of House Buttrope. Pleased to make your acquaintance.";
		break;
	}
}
function moveTo(newX, newY)
{
	document.getElementById("wolfgang").style.left = newX + "px";
	document.getElementById("wolfgang").style.top = newY + "px";
	currentX = newX;
	currentY = newY;
}
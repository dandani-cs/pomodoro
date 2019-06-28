	var defaultsession = 1500;
	var defaultrestime = 300;
	var time = defaultsession;
	var resttime = defaultrestime;
	var insession = true;
	var startingdiv = document.getElementById("starting");
	var duringdiv = document.getElementById("during");
	var endingdiv = document.getElementById("ending");
	var audio = new Audio('alarm.mp3');
	showtime();

	function showstarting() {
		startingdiv.style.display = "block";
		duringdiv.style.display = "none";
		endingdiv.style.display = "none";
	}

	function showduring() {
		startingdiv.style.display = "none";
		duringdiv.style.display = "block";
		endingdiv.style.display = "none";
	}

	function showending() {
		startingdiv.style.display = "none";
		duringdiv.style.display = "none";
		endingdiv.style.display = "block";
	}

	function duringtoggle() {
		if (document.getElementById("play").style.display == "block") {
			document.getElementById("play").style.display = "none";
			document.getElementById("pause").style.display = "block";
		}
		else {
			document.getElementById("play").style.display = "block";
			document.getElementById("pause").style.display = "none";
		}
	}

	function inputgoal() {
		document.getElementById("goalp").style.display = "block";
		document.getElementById("goalp").innerHTML = document.getElementById("goalinput").value;
		document.getElementById("goaldiv").style.display = "none";
	}

	function askgoal() {
		document.getElementById("goalp").style.display = "none";
		document.getElementById("goalinput").value = "";
		document.getElementById("goaldiv").style.display = "block";
	}

	function removegoal() {
		document.getElementById("goalp").style.display = "none";
		document.getElementById("goalinput").value = "";
		document.getElementById("goaldiv").style.display = "none";
	}

	function pomodoro() {
		// 
		var timerInterval = setInterval(countdown, 1000);


		function countdown () {
			if (time == 0) {
				showtime();
				clearTimeout(timerInterval);
				console.log("Timer out");
				askgoal();
				if (insession) { // after session
					showending();
					insession = false;
				}
				else { // after resting
					showstarting();
					insession = true;

				}
			}
			else {
				showtime();
				time--;
				showtime();
			}
			document.getElementById("pause").onclick = function () {
				clearTimeout(timerInterval);
				duringtoggle();
			}

			document.getElementById("reset").onclick = function() {
				clearTimeout(timerInterval);
				if (insession) {
					time = defaultsession;
					showstarting();
				}
				else {
					time = resttime;
					showending();
				}
				console.log("reset");
				console.log(time);
			}
		}
	}

	function start () {
		showduring();
		insession = true;
		time = defaultsession;
		resttime = defaultrestime;
		inputgoal();
		pomodoro();
	}

	function extend() {
		time = defaultsession;
		resttime += defaultrestime;
		insession = true;
		showduring();
		inputgoal();
		pomodoro();
	}

	function rest() {
		time = resttime;
		insession = false;
		showduring();
		removegoal();
		pomodoro();
	}

	function play() {
		duringtoggle();
		pomodoro();
	}

	function showtime() {
		minutes = time / 60;
		seconds = time % 60;
		document.getElementById("minutes").innerHTML = Math.floor(minutes);
		document.getElementById("seconds").innerHTML = seconds;
	}



	var defaultsession = 120;
	var defaultrestime = 5;
	var time = defaultsession;
	var resttime = defaultrestime;
	var insession = true;
	var startingdiv = document.getElementById("starting");
	var duringdiv = document.getElementById("during");
	var endingdiv = document.getElementById("ending");
	showtime()

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

	// function goaltoggle()

	function pomodoro() {
		// 
		var timerInterval = setInterval(countdown, 1000);


		function countdown () {
			if (time == 0) {
				clearTimeout(timerInterval);
				console.log("Timer out");
				if (insession) {
					showending();
					insession = false;
				}
				else {
					showstarting();
					insession = true;
				}
			}
			else {
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
		console.log(goalinput.value);
		document.getElementById("goalp").innerHTML = document.getElementById("goalinput").value;
		startingdiv.style.display = "none";
		duringdiv.style.display = "block";
		insession = true;
		time = defaultsession;
		pomodoro();


	}

	function extend() {
		time = 10;
		resttime += defaultrestime
		console.log(resttime);
		insession = true;
		showduring();
		pomodoro();
	}

	function rest() {
		time = resttime;
		insession = false;
		showduring();
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



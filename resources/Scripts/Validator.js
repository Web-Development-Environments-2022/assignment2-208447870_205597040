const data_base = [
	{
		username: "k",
		password: "k",
        fullname: "k",
        email: "k@gmail.com",
        dateOfBirth: "16-05-2022"
	}
];
var loginUsernameEntry;

// Look at console
$(document).ready(function() {
	var Exist;

  
	$('#login_button').on('click', function() {
		loginUsernameEntry = $("#login_username").val();
		var loginPasswordEntry = $("#login_password").val();
		for(let i=0; i<data_base.length ;i++){
            let user = data_base[i];
            if(user.username === loginUsernameEntry && user.password === loginPasswordEntry){
                alert("Welcome");
				show_Setting();
                Exist = true;
                break;
            }
        }
		if(!Exist) {
			console.log("Attempted Username " + loginUsernameEntry);
			console.log("Attempted Password " + loginPasswordEntry);
			alert("Login Falied");
		};
	});
  
	$('#create_button').on('click', function() {
		var createUsernameEntry = $("#create_username").val();
		var createPasswordEntry = $("#create_password").val();
		var createEmailEntry = $("#create_email").val();
    	var createNameEntry = $("#create_name").val();
		var createBirthdayEntry = $("#create_date").val();

		var createUsernameValid = false;
		var createPasswordValid = false;
		var createEmailValid = false;
		var createNameValid = false;
		var createBirthdayValid = false;

		var createUsernameObject = $("#create_username");
		var createPasswordObject = $("#create_password");
		var createEmailObject = $("#create_email");
		var createNameObject = $("#create_name");
		var createBirthdayObject = $("#create_date");

		var validate = /^\s*[a-zA-Z0-9,\s]+\s*$/;
		var v1 = /^[A-z0-9\d=!\-@._*]*$/;
		var v2 = /[A-z]/;
		var v3 = /\d/;
		var validateEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
	
		if(!v2.test(createNameEntry) || (createNameEntry).length < 1) {
			$(createNameObject).addClass("error")
			document.getElementById("namecheck").style.display = "block";  
		} else {
			createNameValid = true;
			var createName = $(createNameObject).val();
		}

		if(!validate.test(createUsernameEntry) || (createUsernameEntry).length < 1) {
			$(createUsernameObject).addClass("error")
			$(createUsernameObject).val("No special characters or spaces.");
		} else {
			createUsernameValid = true;
			var createUsername = $(createUsernameObject).val();
		}
		
		if(!validate.test(createPasswordEntry) || (createPasswordEntry).length < 6) {
			$(createPasswordObject).addClass("error");
			$(createPasswordObject).val("No special characters or spaces, length must be 6 ot more.");
		} else {
			createPasswordValid = true;
			var createPassword = $(createPasswordObject).val();
		}

		if(!(v1.test(createPasswordEntry) && v2.test(createPasswordEntry) && v3.test(createPasswordEntry)) || !createPasswordValid) {
			$(createPasswordObject).addClass("error");
			$(createPasswordObject).val("Password must contains char and number, length must be 6 ot more.");
		} else {
			createPasswordValid = true;
			var createPassword = $(createPasswordObject).val();
		}
		
		if(!validateEmail.test(createEmailEntry)) {
			$(createEmailObject).addClass("error");
			$(createEmailObject).val("Enter a valid email");
		} else {
			createEmailValid = true;
			console.log("Account Email " + createEmailObject.val())
		}

		if(createBirthdayEntry.length < 9){
			$(createEmailObject).addClass("error");
			document.getElementById("birthdaycheck").style.display = "block";
		}
		else {
			createBirthdayValid = true;
			console.log("Account Email " + createBirthdayObject.val())
		}

		$(createNameObject).on('click', function () {
			$(this).val("");  
			$(this).removeClass("error");
			document.getElementById("namecheck").style.display = "none";  
		});
		
		$(createUsernameObject).on('click', function () {
			$(this).val("");  
			$(this).removeClass("error");
			document.getElementById("usernamecheck").style.display = "none";  
		});
		
		$(createPasswordObject).on('click', function () {
			$(this).val("");  
			$(this).removeClass("error");
		});
		
		$(createEmailObject).on('click', function () {
			$(this).val("");
			$(this).removeClass("error");
		});

		$(createBirthdayObject).on('click', function () {
			document.getElementById("birthdaycheck").style.display = "none";
			$(this).removeClass("error");
		});
		
		if(createUsernameValid && createPasswordValid && createEmailValid && createNameValid && createBirthdayValid) {
			$('form').animate({
				height: "toggle",
				opacity: "toggle"
			}, "fast");
			alert("good");
			add_to_data_base(createUsernameEntry,createPasswordEntry,createNameEntry,createEmailEntry,createBirthdayEntry);
		}
	});

	function add_to_data_base(ID, pass, f_name, mail, b_date){
		let new_user = {
			username: ID,
			password: pass,
			fullname: f_name,
			email: mail,
			dateOfBirth: b_date
		}
		data_base.push(new_user);
	}
	
	function show_Setting() {
		document.getElementById("form_page").style.display = "none";
		document.getElementById("game").style.display = "none";
		document.getElementById("about_dialog").style.display = "none";
		document.getElementById("welcome").style.display = "none";
		document.getElementById("canvas").style.display = "none";
		document.getElementById("setting").style.display = "block";
		document.getElementById("start_game_settings").style.display = "block";

		Randomize();
	  }
  
	$('.message a').on('click', function() {
		$('form').animate({
			height: "toggle",
			opacity: "toggle"
		}, "fast");
	});
});


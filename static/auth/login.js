
/*
<div class="alert alert-danger">
									  Username or Password was wrong, please try again.
								</div>
								*/
function login(){
	var login_alert = document.getElementById("login_alert");
	var csrftoken = Cookies.get('csrftoken');
	var username = document.getElementById("login_username").value;
	var password = document.getElementById("login_password").value;
	return fetch('http://localhost:8000/api/validate_credentials/?format=json', {
		method: "POST",
		headers: {
		    'Accept': 'application/json, text/plain, */*',
		    'Content-Type': 'application/json',
		    "X-CSRFToken":csrftoken
		  },		
		body: JSON.stringify({"username":username,"password":password})
	})
	.then(function(response){
		return response.json();
	})
	.then(function(json){
		var formData = new FormData();
		formData.append("username",username);
		formData.append("password",password);
		if (json.valid_credentials){
			fetch('http://localhost:8000/auth/login', {
				method: "POST",	
				headers: {
					"X-CSRFToken":csrftoken
				},
				body: formData
			})
			login_alert.innerHTML = "";
			document.getElementById("register_div").style.display = "none";
			document.getElementById("login_div").style.display = "none";

		} else {
			if (!document.getElementById("invalid_credentials_alert")){
				var div = document.createElement("div");
				div.id = "invalid_credentials_alert";
				div.className = "alert alert-danger";
				div.innerHTML = "<h6>Username or Password was wrong, please try again.</h6>";
				login_alert.appendChild(div);
			}
		}
	})
}

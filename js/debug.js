			window.onerror = function(msg, url, linenumber) {
				alert('Error message: '+msg+'\nURL: '+url+'\nLine Number: '+linenumber);
				return true;
			}	
		
			console.clearOutput = function() {
				document.getElementById("console").innerHTML = '';
			}
		
			var log = console.log;
			console.log = function(input) {
				var html = document.createElement("li");
				html.className = "alert alert-success";
				html.innerHTML = input;
				document.getElementById("console").appendChild(html);
				log.apply(console, [input])
			}

			var warn = console.warn;
			console.warn = function(input) {
				var html = document.createElement("li");
				html.className = "alert alert-warning";
				html.innerHTML = input;
				document.getElementById("console").appendChild(html);
				warn.apply(console, [input])
			}
			
			var error = console.error;
			console.error = function(input) {
				var html = document.createElement("li");
				html.className = "alert alert-danger";
				html.innerHTML = input;
				document.getElementById("console").appendChild(html);
				error.apply(console, [input])
			}
			
			var info = console.info;
			console.info = function(input) {
				var html = document.createElement("li");
				html.className = "info alert-info";
				html.innerHTML = input;
				document.getElementById("console").appendChild(html);
				info.apply(console, [input])
			}
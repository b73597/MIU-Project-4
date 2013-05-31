/* 
<!-- Eddy Davila -->
<!-- Project 3 -->
<!-- MIU 1305 -- >
*/
// Javascript file 

//Wait for DOM
window.addEventListener("DOMContentLoaded", function(){
	//getElementById Function
	function ge(x){
		var theElement = document.getElementById(x);
		return theElement;
	}



	// make item links
	// creat edit and delete buttons for stored data

	function makeItemLinks(key, linksLi){
		var editLink = document.createElement('a');
		editLink.href = "#";
		editLink.key = key;
		var editText = "Edit Details";
		editLink.addEventListener("click", editItem);
		editLink.innerHTML = editText;
		linksLi.appendChild(editLink);

		// line break
		var breakTag = document.createElement('br');
		linksLi.appendChild(breakTag);

		// delete 
		var deleteLink = document.createElement('a');
		deleteLink.href = "#";
		deleteLink.key = key;
		var deleteText = "Delete Details";
		deleteLink.addEventListener("click", deleteItem);
		deleteLink.innerHTML = deleteText;
		linksLi.appendChild(deleteLink);
	}

	function editItem(){
		// grab data from local storage
		var value = localStorage.getItem(this.key);
		var item = JSON.parse(value);

		// show form
		toggleControls("off");

		// populate the form fields with current localStorage values.
		ge('fname').value = item.fname[1];
		ge('lname').value = item.lname[1];
		ge('email').value = item.email[1];
		ge('date').value = item.date[1];
		ge('guitar').value = item.guitar[1];
		ge('store').value = item.store[1];
		ge('rating').value = item.rating[1];
		ge('pickups').value = item.pickups[1];
		ge('xtra').value = item.strings[1];
		ge('effects').value = item.effect[1];
		var radios = document.forms[0].currency;
		for(var i = 0; i<radios.length; i++){
			if(radios.value == "Cash" && item.currency[1] == "Cash"){
				radios[i].setAttribute("checked", "checked");
			}else if(radios[i].value == "Credit" && item.currency[1] == "Credit"){
				radios[i].setAttribute("checked", "checked");
			}
		}
		if(item.coupon[1] == "Yes"){
			ge('coupon').setAttribute("checked", "checked");
		}
		ge('comments').value = item.comments[1];

		// remove the initial listener from the input save button
		save.removeEventListener("click", storeData);

		// change submit button value to edit button
		ge('submit').value = "Edit Contact";
		var editSubmit = ge('submit');

		//save key value
		editSubmit.addEventListener("click", validate);
		editSubmit.key = this.key;
	}





// toggle controls

	function toggleControls(n){
		switch(n){
			case "on":
				ge('contactForm').style.display  	= "none";
				ge('clear').style.display 			= "inline";
				ge('displayLink').style.display 	= "none";
				ge('addNew').style.display 			= "inline";
				break;
					// off
			case "off":
				ge('contactForm').style.display 	= "block";
				ge('clear').style.display 			= "inline";
				ge('displayLink').style.display 	= "inline";
				ge('addNew').style.display 			= "none";
				ge('items').style.display 			= "none";
				break;

			default:
				return false;		
		}
	}

	// stored data function
	// stores all object data

		function storeData(data, key){
			// if there is no key, this means this is brand new item and we need a new key.
			if(!key){
			var id 					= Math.floor(Math.random()*100000001); // math that randomly picks a number to attach to the string
			}else{
				
				id = key;
			}
		getSelectedRadio(); // calling the select radio function
		getCheckboxValue(); // checkbox value function
		var item  				= {};
			item.fname			= ["First Name:", 					$('#fname').val()];
			item.lname			= ["Last Name:", 					$('#lname').val()];
			item.email			= ["Email:", 						$('#email').val()];
			item.date			= ["Date:", 						$('#date').val()];
			item.guitar			= ["Brand:", 						$('#guitar').val()];
			item.store			= ["Retailer:", 					$('#store').val()];
			item.rating			= ["Ranking:", 						$('#rating').val()];
			item.pickups			= ["Pick Ups:", 					$('#addon').val()];
			item.strings			= ["Strings:", 						$('#xtra').val()];
			item.effects			= ["Effects:", 						$('#effects').val()];
			item.currency			= ["Currency:", 					currencyValue];
			item.coupon			= ["Have Coupon?:", 					siteValue];
			item.comments			= ["Additional Comments:", 				$('#comments').val()];

			// save data stringify
			localStorage.setItem(id, JSON.stringify(item));
			alert("Details Saved!");
	}

	// get data

	function getData(){
		toggleControls("on");
		if(localStorage.length ===0){
			alert("There is no data in local storage so default data was added."); // alert
			autoFillData();
		}
		var makeDiv = document.createElement('div');
		makeDiv.setAttribute("id", "items");
		var makeList = document.createElement('ul');
		makeDiv.appendChild(makeList);
		document.body.appendChild(makeDiv);
		ge('items').style.display = "block";
		for(var i=0, len=localStorage.length; i<len; i++){
			var makeli = document.createElement('li');
			var linksLi = document.createElement('li'); // project 3 
			makeList.appendChild(makeli);
			var key = localStorage.key(i);
			var value = localStorage.getItem(key);
			//
			var obj = JSON.parse(value);
			var makeSubList = document.createElement('ul');
			makeli.appendChild(makeSubList);
			getImage(obj.pickups[1], makeSubList); // adds image to data
			// loop thru object
			for(var n in obj){
				var makeSubli = document.createElement('li');
				makeSubList.appendChild(makeSubli);
				var optSubText = obj[n][0]+" "+obj[n][1];
				makeSubli.innerHTML = optSubText;
				makeSubList.appendChild(linksLi); // project 3
			} 
			makeItemLinks(localStorage.key(i), linksLi); // creates our edit and delete buttons
		}
	}

	// get image
	function getImage(catName, makeSubList){
		var imageLi = document.createElement('li');
		makeSubList.appendChild(imageLi);
		var newImg = document.createElement('img');
		var setSrc = newImg.setAttribute("src", "images/"+ catName + ".png");
		imageLi.appendChild(newImg);
	}

	// auto populate local storage
	function autoFillData(){
		for(var n in json){
			var id = Math.floor(Math.random()*100000001); // math that randomly picks a number to attach to the string
			localStorage.setItem(id, JSON.stringify(json[n]));
		}
	}






	function deleteItem(){
		var ask = confirm("Are you sure you want to delete?");
		if(ask){
			localStorage.removeItem(this.key);
			alert("Details deleted!");
			window.location.reload();
		}else{
			alert("Details were not deleted.");
		}
	}	
	// clear local data

	function clearLocal(){
		if(localStorage.length === 0){
			alert("Nothing to delete."); // alert
		}else{
			localStorage.clear();
			alert("All Data Deleted");
			window.location.reload();
			return false;
		}
	}
// PROJECT 3 validate function. Tried using the template code, but json data would stop responding.
	function validate(){
		var parseContactForm = function(data){
			storeData(data);
		};

		$(addItem).on('pageinit', function(){

			var cform = $('#contactForm');

			cform.validate({
				invalidHandler: function(form, validator){},
				submitHandler: function(){

					var data = cform.serializeArray();
					parseContactForm(data);
				}
			})

		});
	}

	// array data for the drop down fucnctions called 
	var errMsg = ge('errors');

	//this displays the data
	var displayLink = ge("displayLink");
	displayLink.addEventListener("click", getData);
	// clears local data event
	var clearLink = ge("clear");
	clearLink.addEventListener("click", clearLocal);
	// submits stored data event 
	var save = ge("submit");
	save.addEventListener("click", validate);

});
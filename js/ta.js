(function(){

	var isNewBtnClicked = false;
	var studentRecords = []; // Array to be updated when clicked on "save" and "delete" buttons
	var recordDisplayed = -1; // index of the record displayed

	function displayRecord(index){
		document.getElementById("firstName").value = studentRecords[index]["fname"];
		document.getElementById("lastName").value = studentRecords[index]["lname"];
		document.getElementById("studentid").value = studentRecords[index]["studentId"];
		document.getElementById("areasofspec").value = studentRecords[index]["areasOfSpecification"];
		document.getElementById("select-check").checked = studentRecords[index]["isSelected"];
	}

	function clearAllInputFields(){
		var formElements = document.getElementsByClassName("form-control");

		Array.prototype.forEach.call(formElements, function(elementNode) {
		    elementNode.value = "";
		});

		document.getElementById("select-check").checked = false;
	}

	function toggleNavigationButtons(type){
		var navigationButtons = document.querySelectorAll("#btn-navigation button");

		Array.prototype.forEach.call(navigationButtons, function(btn) {
			if(type === "disable"){
			   btn.setAttribute("disabled", true); 
			}else{
			   btn.removeAttribute("disabled"); 
			}
		});
	}

	function getNewStudentRecord(){
		var record = {
			"fname" : document.getElementById("firstName").value,
			"lname" : document.getElementById("lastName").value,
			"studentId" : document.getElementById("studentid").value,
			"areasOfSpecification" : document.getElementById("areasofspec").value,
			"isSelected" : document.querySelector("#select-check").checked ? true : false
		};

		return record;
	}

	function getExistingStudentRecord(){
		var existingRecord;

		existingRecord = {
			"fname" : document.getElementById("firstName").value,
			"lname" : document.getElementById("lastName").value,
			"studentId" : document.getElementById("studentid").value,
			"areasOfSpecification" : document.getElementById("areasofspec").value,
			"isSelected" : document.querySelector("#select-check").checked ? true : false
		};

		studentRecords[recordDisplayed] = existingRecord;

		return existingRecord;
	}

	function updateLog(type, record){
		var message;

		if(type === "new"){
			message = "Added: " + record["fname"] + " " + record["lname"] + "," + record["studentId"] + "," + record["areasOfSpecification"];
		}else if(type === "delete"){
			message = "Deleted: " + record["fname"] + " " + record["lname"] + "," + record["studentId"] + "," + record["areasOfSpecification"];
		}else if(type === "update"){
			message = "Updated: " + record["fname"] + " " + record["lname"] + "," + record["studentId"] + "," + record["areasOfSpecification"];
		}

		if(document.getElementById("logs").value.length > 0){
			document.getElementById("logs").value = document.getElementById("logs").value + "\n" + message;
		}else{
			document.getElementById("logs").value = message;
		}
	}

	function handleAddRecord(evt){
		clearAllInputFields();
		toggleNavigationButtons("disable");
		document.getElementById("btn-new").setAttribute("disabled", true);
		document.getElementById("btn-edit").setAttribute("disabled", true);
		document.getElementById("btn-delete").setAttribute("disabled", true);
		document.getElementById("btn-save").removeAttribute("disabled");
		document.getElementById("btn-cancel").removeAttribute("disabled");
		isNewBtnClicked = true;
	}

	function handleUpdateRecord(){
		toggleNavigationButtons("disable");
		document.getElementById("btn-new").setAttribute("disabled", true);
		document.getElementById("btn-edit").setAttribute("disabled", true);
		document.getElementById("btn-delete").setAttribute("disabled", true);
		document.getElementById("btn-save").removeAttribute("disabled");
		document.getElementById("btn-cancel").removeAttribute("disabled");
		isNewBtnClicked = false;
	}

	function handleSaveRecord(evt){
		var record;

		// New record should be added
		if(isNewBtnClicked){
			record = getNewStudentRecord();
			studentRecords.push(record);
			updateLog("new", record);
			isNewBtnClicked = false;
		}else{ // update existing record
			record = getExistingStudentRecord();
			updateLog("update", record);
		}

		handleCancelRecord();
	}

	function handleCancelRecord(evt){
		toggleNavigationButtons("enable");
		document.getElementById("btn-new").removeAttribute("disabled");
		document.getElementById("btn-edit").removeAttribute("disabled");
		document.getElementById("btn-delete").removeAttribute("disabled");
		document.getElementById("btn-save").setAttribute("disabled", true);
		document.getElementById("btn-cancel").setAttribute("disabled", true);
	}

	function handleDeleteRecord(evt){
		updateLog("delete", studentRecords[recordDisplayed]);
		studentRecords.splice(recordDisplayed, 1);
	}

	function handleNextRecord(){
		if(studentRecords.length === 0 || (recordDisplayed + 1 === studentRecords.length)){
			return;
		}

		recordDisplayed++
		displayRecord(recordDisplayed);
	}

	function handlePrevRecord(){
		if(studentRecords.length === 0 || recordDisplayed === 0){
			return;
		}

		recordDisplayed--;
		displayRecord(recordDisplayed);
	}

	function handleRandomRecord(){
		var rec = Math.floor(Math.random()*studentRecords.length);
		recordDisplayed = rec;
		displayRecord(rec);
	}

	function handleLastRecord(){
		if(studentRecords.length === 0){
			return;
		}

		recordDisplayed = studentRecords.length - 1;
		displayRecord(studentRecords.length-1);
	}

	function handleFirstRecord(){
		if(studentRecords.length === 0){
			return;
		}

		recordDisplayed = 0;
		displayRecord(0);
	}

	document.getElementById("btn-save").setAttribute("disabled", true);
	document.getElementById("btn-cancel").setAttribute("disabled", true);

	document.getElementById("buttongroup").addEventListener("click", handleButtonClick);

	// Use "Event Delegation" to reduce number of event listeners
	function handleButtonClick(evt){
		var id = evt.target && evt.target.id;

		if(id){
			switch(id){
				case 'btn-new':
					handleAddRecord(evt);
					break;
				case 'btn-edit':
					handleUpdateRecord(evt);
					break;
				case 'btn-save':
					handleSaveRecord(evt);
					break;
				case 'btn-cancel':
					handleCancelRecord(evt);
					break;
				case 'btn-delete':
					handleDeleteRecord(evt);
					break;
				case 'btn-first':
					handleFirstRecord(evt);
					break;
				case 'btn-last':
					handleLastRecord(evt);
					break;
				case 'btn-next':
					handleNextRecord(evt);
					break;
				case 'btn-prev':
					handlePrevRecord(evt);
					break;
				case 'btn-select':
					handleRandomRecord(evt);
					break;
			}
		}
	}

})();
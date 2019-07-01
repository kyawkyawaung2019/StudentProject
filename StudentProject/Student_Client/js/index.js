$(document).ready(
	function() {
		$('#progress-bar').hide();
		$('#student').hide();
		$('#course').hide();
		$('#mediaMusic').hide();
		$('#mediaVideo').hide();
		$('#about').hide();

		$('#home').show();
	}
);
//
//////////////////////////////////////////////Show & hide function
//
function ShowHome(){
	$('#progress-bar').hide();
	$('#student').hide();
	$('#course').hide();
	$('#mediaMusic').hide();
	$('#mediaVideo').hide();
	$('#about').hide();
	
	$('#home').show();
};

function ShowStudent(){
	$('#progress-bar').hide();
	$('#home').hide();
	$('#course').hide();
	$('#mediaMusic').hide();
	$('#mediaVideo').hide();
	$('#about').hide();

	$('#student').show();
	
	RetrieveStudent();
};

function ShowCourse(){
	$('#progress-bar').hide();
	$('#home').hide();
	$('#student').hide();
	$('#mediaMusic').hide();
	$('#mediaVideo').hide();
	$('#about').hide();
	
	$('#course').show();
	
	RetrieveCourse();
};

function ShowMusic(){
	$('#progress-bar').hide();
	$('#home').hide();
	$('#student').hide();
	$('#course').hide();
	$('#mediaVideo').hide();
	$('#about').hide();
	
	$('#mediaMusic').show();
};

function ShowVideo(){
	$('#progress-bar').hide();
	$('#home').hide();
	$('#student').hide();
	$('#course').hide();
	$('#mediaMusic').hide();
	$('#about').hide();
	
	$('#mediaVideo').show();
};

function ShowAbout(){
	$('#progress-bar').hide();
	$('#home').hide();
	$('#student').hide();
	$('#course').hide();
	$('#mediaMusic').hide();
	$('#mediaVideo').hide();
	
	$('#about').show();
};
//
//////////////////////////////////////////////Student
//
// Insert Data Into Student Update Modal
function InsertDataIntoStudentUpdateModal(id){
	if(id != "")
	{
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8000/Student/"+id+"/",
			// data: JSON.stringify(),
			dataType: "json",
		}).then(function(data){
			$('#u_student_id').val(data.id);
			$('#u_student_name').val(data.student_name);
			$('#u_age').val(data.age);
			$('#u_gender').val(data.gender);
			$('#u_address').val(data.address);
			$('#course_id').val(data.course_id);
		});
		CheckCourseInfoStudentUpdate(id);
	}
	else 
	{
		alert("ID is null");
	}
};

// Insert Student Information
function CreateStudent(){
	var studentName = document.getElementById("reStudentName").value;
	var age = document.getElementById("reAge").value;
	var gender = document.getElementById("reGender").value;
	var address = document.getElementById("reAddress").value;
	var courseId = document.getElementById("reCourseId").value;
	var courseName = document.getElementById("rcName").value;
	var major = document.getElementById("rcMajor").value;
	
	if(studentName != "" && age != "" && gender != "" && address != "" && courseId != "" && courseName != "" && major != "")
	{
		var postData = {
			"student_name": studentName,
			"age": age,
			"gender": gender,
			"address": address,
			"course_id": courseId,
		};
		$.ajax({
			type: "POST",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Student/",
			data : JSON.stringify(postData),
			dataType: "json",
			success: function(){
				alert("Sucessfully entered!");
				ClearStudentRegisterModal();
				$('#showStudent').click();
			}
		});
	}
	else 
	{
		alert("Please fill out this fields.");
	}
};

// Retrieve Student Information
function RetrieveStudent(){
	$('#studentTableBody').empty();
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/Student/",
		// data: JSON.stringify(),
		dataType: "json",
	}).then(function(data){
		// console.log(data)
		for(var i=0; i<data.results.length; i++){
			var id = data.results[i].id;
			var student_name = data.results[i].student_name;
			var age = data.results[i].age;
			var gender = data.results[i].gender;
			var address = data.results[i].address;
			var course_id = data.results[i].course_id;
			document.getElementById("studentTableBody").insertRow(-1).innerHTML = '<tr><td>'+id+'</td>'+
																			'<td>'+student_name+'</td>'+
																			'<td>'+age+'</td>'+
																			'<td>'+gender+'</td>'+
																			'<td>'+address+'</td>'+
																			'<td><button type="button" class="btn btn-info btn-md" data-toggle="modal" data-target="#courseInfoModal" onclick="InsertDataIntoCourseInfoModal('+course_id+');">Show</button></td>'+
																			'<td><button type="button" class="btn btn-danger btn-md" data-toggle="modal" data-target="#studentUpdateModal" onclick="InsertDataIntoStudentUpdateModal('+id+');">EDIT</button></td></tr>';
		}
	});
};

// Update Student Information by id
function UpdateStudent(){
	var id = document.getElementById("u_student_id").value;
	var student_name = document.getElementById("u_student_name").value;
	var age = document.getElementById("u_age").value;
	var gender = document.getElementById("u_gender").value;
	var address = document.getElementById("u_address").value;
	var course_id = document.getElementById("course_id").value;
	var courseName = document.getElementById("ucName").value;
	var major = document.getElementById("ucMajor").value;
	
	if(id != "" && student_name != "" && age != "" && gender != "" && address != "" && course_id != "" && courseName != "" && major != "")
	{
		var putData = {
			// "id": id,
			"student_name": student_name,
			"age": age,
			"gender": gender,
			"address": address,
			"course_id": course_id
		};
		$.ajax({
			type : "PUT",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Student/"+id+"/",
			data : JSON.stringify(putData),
			dataType: "json",
			success: function(){
				alert("Successfully Update!");
				ClearStudentUpdateModal();
				$('#showStudent').click();
			}
		});
	}
	else 
	{
		alert("Please insert data!");
	}
};

// Delete Student Information by id
function DeleteStudent(){
	var id = document.getElementById("u_student_id").value;
	if(id != "")
	{
		$.ajax({
			type : "DELETE",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Student/"+id+"/",
			// data: JSON.stringify(),
			dataType: "json",
			success: function(){
				alert("Successfully Delete!");
				ClearStudentUpdateModal();
				$('#showStudent').click();
			}
		});
	}
	else
	{
		alert("Please insert student ID");
	}
};
//
/////////////////////////////////////////////Course
//
// Retrieve Course Information by id
function InsertDataIntoCourseInfoModal(id){
	if(id != "")
	{
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8000/Course/"+id+"/",
			// data: JSON.stringify(),
			dataType: "json",
		}).then(function(data){
			$('#r_course_id').val(data.id);
			$('#course_name').val(data.course_name);
			$('#major').val(data.major);
		});
	}
	else 
	{
		alert("ID is null");
	}
};

// Insert Data Into Course Update Modal
function InsertDataIntoCourseUpdateModal(id){
	if(id != "")
	{
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8000/Course/"+id+"/",
			// data: JSON.stringify(),
			dataType: "json",
		}).then(function(data){
			$('#u_course_id').val(data.id);
			$('#u_course_name').val(data.course_name);
			$('#u_major').val(data.major);
		});
	}
	else 
	{
		alert("ID is null");
	}
};

//Insert Course Information
function CreateCourse(){
	var courseName = document.getElementById("reCourseName").value;
	var major = document.getElementById("reMajor").value;
	if(courseName != "" && major != "")
	{
		var postData = {
			"course_name": courseName,
			"major": major
		};
		$.ajax({
			type: "POST",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Course/",
			data : JSON.stringify(postData),
			dataType: "json",
			success: function(){
				alert("Sucessfully entered!");
				ClearCourseRegisterModal();
				$('#showCourse').click();
			}
		});
	}
	else 
	{
		alert("Please insert data");
	}
};

// Retrieve Course Information
function RetrieveCourse(){
	$('#courseTableBody').empty();
	$.ajax({
		type: "GET",
		contentType: "application/json; charset=utf-8",
		url: "http://localhost:8000/Course/",
		// data: JSON.stringify(),
		dataType: "json",
	}).then(function(data){
		// console.log(data.next)
		for(var i=0; i<data.results.length; i++){
			var id = data.results[i].id;
			var course_name = data.results[i].course_name;
			var major = data.results[i].major;
			document.getElementById("courseTableBody").insertRow(-1).innerHTML = '<tr><td>'+id+'</td>'+
																			'<td>'+course_name+'</td>'+
																			'<td>'+major+'</td>'+
																			'<td><button type="button" class="btn btn-danger btn-md" data-toggle="modal" data-target="#courseUpdateModal" onclick="InsertDataIntoCourseUpdateModal('+id+');">EDIT</button></td></tr>';
		}
	});
};

// Update Course Information by id
function UpdateCourse(){
	var id = document.getElementById("u_course_id").value;
	var course_name = document.getElementById("u_course_name").value;
	var major = document.getElementById("u_major").value;
	if(id != "" && course_name != "" && major != "")
	{
		var putData = {
			// "id": id,
			"course_name": course_name,
			"major": major
		};
		$.ajax({
			type : "PUT",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Course/"+id+"/",
			data : JSON.stringify(putData),
			dataType: "json",
			success: function(){
				alert("Successfully Update!");
				ClearCourseUpdateModal();
				$('#showCourse').click();
			}
		});
	}
	else 
	{
		alert("Please insert data");
	}
};

// Delete Course Information by id
function DeleteCourse(){
	var id = document.getElementById("u_course_id").value;
	if(id != "")
	{
		$.ajax({
			type : "DELETE",
			contentType : "application/json; charset=utf-8",
			url : "http://localhost:8000/Course/"+id+"/",
			// data: JSON.stringify(),
			dataType: "json",
			success: function(){
				alert("Successfully Delete!");
				ClearCourseUpdateModal();
				$('#showCourse').click();
			}
		});
	}
	else 
	{
		alert("Please insert course ID");
	}
};
//
/////////////////////////////////////////////Clear & Hide Modal Data
//
// Clear studentRegisterModal data
function ClearStudentRegisterModal(){
	document.getElementById("reStudentId").value = "";
	document.getElementById("reStudentName").value = "";
	document.getElementById("reAge").value = "";
	document.getElementById("reGender").value = "";
	document.getElementById("reAddress").value = "";
	document.getElementById("reCourseId").value = "";
	document.getElementById("rcName").value = "";
	document.getElementById("rcMajor").value = "";
	//
	$('#studentRegisterModal').modal('hide');
};

// Clear studentUpdateModal data
function ClearStudentUpdateModal(){
	document.getElementById("u_student_id").value = "";
	document.getElementById("u_student_name").value = "";
	document.getElementById("u_age").value = "";
	document.getElementById("u_gender").value = "";
	document.getElementById("u_address").value = "";
	document.getElementById("course_id").value = "";
	document.getElementById("ucName").value = "";
	document.getElementById("ucMajor").value = "";
	//
	$('#studentUpdateModal').modal('hide');
};

// Clear courseRegisterModal data 
function ClearCourseRegisterModal(){
	document.getElementById("reCourseName").value = "";
	document.getElementById("reMajor").value = "";
	//
	$('#courseRegisterModal').modal('hide');
};

// Clear courseUpdateModal data
function ClearCourseUpdateModal(){
	document.getElementById("u_course_id").value = "";
	document.getElementById("u_course_name").value = "";
	document.getElementById("u_major").value = "";
	//
	$('#courseUpdateModal').modal('hide');
};

// Clear courseInfoModal data
function ClearCourseInfoModal(){
	document.getElementById("r_course_id").value = "";
	document.getElementById("course_name").value = "";
	document.getElementById("major").value = "";
	//
	$('#courseInfoModal').modal('hide');
};
//
////////////////////////////////////////////////////////////
// Check course information on student register
function CheckCourseInfoStudentRegister(id){
	document.getElementById("rcName").value = "";
	document.getElementById("rcMajor").value = "";
	if(id != "")
	{
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8000/Course/"+id+"/",
			// data: JSON.stringify(),
			dataType: "json",
		}).then(function(data){
			$('#rcName').val(data.course_name);
			$('#rcMajor').val(data.major);
		});
	}
	else 
	{
		alert("ID is null");
	}
};

// Check course information on student update
function CheckCourseInfoStudentUpdate(id){
	document.getElementById("ucName").value = "";
	document.getElementById("ucMajor").value = "";
	if(id != "")
	{
		$.ajax({
			type: "GET",
			contentType: "application/json; charset=utf-8",
			url: "http://localhost:8000/Course/"+id+"/",
			// data: JSON.stringify(),
			dataType: "json",
		}).then(function(data){
			$('#ucName').val(data.course_name);
			$('#ucMajor').val(data.major);
		});
	}
	else 
	{
		alert("ID is null");
	}
};

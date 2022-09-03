var communityUsers = JSON.parse(localStorage.getItem("studentList")) || [] ;
let arr = [];
var events = JSON.parse(localStorage.getItem('events')) || [];
var ev = [];
var toppers = JSON.parse(localStorage.getItem('toppers')) || [];
var top = [];

function login(){
    let email = document.getElementById('userid').value;
    let pass = document.getElementById('pass').value;

    if(email=='admin' && pass=='admin')
    {
        window.open("userloggedin.html")
    }
    else 
    {
        alert('login failed');
    }
}

function seterror(id,error)
{   
   let  element = document.getElementById(id);
    element.getElementsByClassName('formerror')[0].innerHTML = error;
}

function clearError(){
   let  errors = document.getElementsByClassName('formerror');
    for(let item in errors)
    {
        item.innerHTML='';
    }
}

function validateForm(){
    var returnVal = true;
    clearError();
    // first name
    var inputName= document.forms['myform']['fname'].value;
    if(inputName<3){
        seterror("inputName", "*name is too short!");
        returnVal = false;
    }
    // email
    var inputEmail = document.forms['myform']['fmail'].value;
   
    if(!inputEmail.includes('@')){
        seterror('inputEmail','please enter a valid email address');
        returnVal= false;
    }
    if(inputEmail==''){
        seterror('inputEmail','*this field is required');
        returnVal = false;
    }
    // birthday
    var inputDate = document.forms['myform']['fdate'].value;
    if(inputDate==''){
        seterror('inputDate','*this field is required');
        returnVal = false;
    }
   let date =  new Date(inputDate);
   let year = date.getFullYear();
   if(year>2006){
       seterror('inputDate','*you are not eligible to create an account');
       returnVal = false;
   }
// passwords
   var inputPassword = document.forms['myform']['fpass'].value;
   var inputcPassword = document.forms['myform']['fcpass'].value;

   if(inputPassword==''){
       seterror('inputPassword','*please enter your password');
        returnVal = false;
   }
   if(inputcPassword==''){
    seterror('inputcPassword','*please confirm your password');
     returnVal = false;
}
if(inputPassword != inputcPassword)
{
    seterror('inputcPassword','*passwords do not match!');
    returnVal = false;
}

var inputImage = document.forms['myform']['fimage'].value;
if(inputImage==''){
    seterror('inputImage','*please upload your profile picture');
    returnVal = false;
}
var inputLanguage = document.forms['myform'][8].value;
if(inputLanguage=='null')
{
    seterror('inputLanguage','*please select a lanaguage')
    returnVal = false;
}

if(returnVal==true){
    saveUserDetails();
}

return returnVal;
}


function saveUserDetails(){
// saving the form data
let user = {};
user.name= document.getElementById('fname').value;
user.email = document.getElementById('fmail').value;
user.dob = document.getElementById('fdate').value;
user.password = document.getElementById('fpass').value;
user.image = document.getElementById('fimage').value;
user.gender = document.querySelector('input[name="gender"]:checked').value;
user.language = document.forms['myform'][8].value;
communityUsers.push(user);
localStorage.setItem("studentList", JSON.stringify(communityUsers));
}

function addEvent(){
    let event = {};
    event.name =document.getElementById('competition').value;
    event.date = document.getElementById('eventDate').value;
    if(event.name && event.date)
    {
        events.push(event);
        localStorage.setItem('events',JSON.stringify(events));
    }
    document.getElementById('competition').value ='';
    document.getElementById('eventDate').value='';
}

function showEvents()
{
    const data = JSON.parse(localStorage.getItem('events'));
    var table = document.getElementById("events");
    
    for(var i=0;i<data.length;i++)
    {
        var row = `<tr>
        <td>${data[i].name}</td>
        <td>${data[i].date}</td>
        </tr>`
        table.innerHTML += row;
    }   
    
}

function addTopper(){
  
    let personName = document.getElementById('topper').value;
    top.push(personName);
    localStorage.setItem('toppers',JSON.stringify(top));
    document.getElementById('topper').value='';
}
function ShowToppers()
{
    const topper = JSON.parse(localStorage.getItem('toppers'));
    for(var i=0;i<topper.length;i++)
    {
        let listElement = document.createElement('li');
        listElement.classList = 'list-group-item list-group-item-action';
        let textElement = document.createTextNode(topper[i])
    }
   
}


function getUserData(){
	let arr=JSON.parse(localStorage.getItem('studentList'));
	return arr;
}
function setUserData(arr){
	localStorage.setItem('studentList',JSON.stringify(arr));
}

function buildTable(){
    // const data = JSON.parse(localStorage.getItem("studentList"));
    let data = getUserData();
    var count =1;
    var table = document.getElementById('myTable')
 
    for (var i = 0; i < data.length; i++){
        var row = `<tr>
                        <td>${count}</td>
                       <td><img src="${data[i].image}" style="height:50px;width:50px"</td>
                        <td>${data[i].name}</td>
                        <td>${data[i].email}</td>
                        <td>${data[i].language}</td>
                        <td>${data[i].dob}</td>
                        <td>${data[i].gender}</td>
                        <td><a href="javascript:void(0)" onclick="editUserData(${i})"><button>Edit</button></a>
                        &nbsp;<a onclick="deleteUser(${i})"><button>Delete</button>
                        </a></td>
                  </tr>`
        count++;
        table.innerHTML += row;
    } 
} 

function editUserData(id){
    console.log(id);
    let body = document.querySelectorAll('tbody')[1];
    let user = body.querySelectorAll('tr')[id];
    // name change
    user.querySelectorAll('td')[2].innerHTML = '';

     
    
}


function deleteUser(id)
{
console.log(id);
let arr=getUserData();
arr.splice(id,1);
setUserData(arr);
window.location.reload();
}


function createProfile()
{
    let data = getUserData();
    for (var i = 0; i < data.length; i++){
    
            let box = document.createElement('div');
            box.className ='container';
            let row = document.createElement('div');
            row.classList = 'row gx-0';
    
            let div1Outer = document.createElement('div');
            div1Outer.classList = 'col-sm-2 col-md-2 text-center';
            div1Outer.style = 'font-size:15px;'
            let div1Inner = document.createElement('div');
            let textElement = document.createTextNode(`${data[i].name}`);
            div1Inner.appendChild(textElement);
            // let image = document.createElement('img');
            // image.classList = "img-fluid rounded mb-4";
            // image.setAttribute('src',`${data[i].image}`);
            // div1Inner.appendChild(image);
            // div1Inner.tagName = "profile";
            div1Inner.classList = 'p-3 border bg-light';
            div1Outer.appendChild(div1Inner);
            
            let div2Outer = document.createElement('div');
            div2Outer.classList = 'col-sm-10 col-md-10 ';
            let div2Inner = document.createElement('div');
            div2Inner.classList = 'p-3 border bg-light';
            div2Inner.innerHTML = `<ul class="list-group">
            <li class="list-group-item">Language: ${data[i].language}</li>
            <li class="list-group-item">Contact @ ${data[i].email}</li>
            <li class="list-group-item">Birthday: ${data[i].dob}</li>
            <li class="list-group-item">Gender: ${data[i].gender}</li>
            
          </ul>`
            div2Outer.appendChild(div2Inner);
    
            row.appendChild(div1Outer);
            row.appendChild(div2Outer);

            box.append(row);
            let element = document.getElementById('studentContent');
            element.appendChild(box);
    }

}

function showBirthdays()
{
    const data = JSON.parse(localStorage.studentList);
    var table = document.getElementById("birthdays");
    // data.sort((a,b) => (a.DOB > b.DOB) ? 1 : ((b.DOB > a.DOB) ? -1 : 0));
    for(var i =0;i<data.length;i++)
    {
        if(upcomingBday(data[i].dob)){
            let m = moment(data[i].dob);
            var row = `<tr>
            <td>${data[i].name}</td>
            <td>${m.format("Do MMMM")}</td>
            <td>${daysRemaining(data[i].dob)+" days"}</td>
            </tr>`
            table.innerHTML += row;
        }
       
    }
} 
//  <td>${daysRemaining(data[i].DOB)}</td>
function upcomingBday(bday)
{
    let n = daysRemaining(bday);
    if(n<=31)
     return true;
}

//return the number of days remaining in the bday;
function daysRemaining(date){
    var c = moment(date);
    var d = moment();
    if(d>c){
    c.year(d.year());
    var dif = Math.abs( c.diff( d, 'days' ) );
    if (dif > (365/2))  c.year( d.year() + 1 );
    dif = Math.abs( c.diff( d, 'days' ) );
    return dif+1;
    // console.log(dif);
 }    
}



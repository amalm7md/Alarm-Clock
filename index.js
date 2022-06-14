// fetch the element where we need to display the time
var clock = document.getElementById("clock");
// alarm ring tone
var audio = new Audio("assets/alarm.mp3");

// array to store the added alarms
var alarmListArray=[];

// fetch the set alarm button
const addButton = document.getElementById("add-btn")

// fetch the element to show the added alarms
const alarmHistory = document.getElementById("alarm-list")


// function to show the added alarms
function showAlarm(newAlarm){
// dom manupulation to add the new alarms 
    var textIs = document.createTextNode(newAlarm);

    var trastIcon=document.createElement("i");
    trastIcon.classList.add("fa-solid");
    trastIcon.classList.add("fa-trash-can")

    var deleteButton =document.createElement("button");
    deleteButton.classList.add("delete-btn");

    var li = document.createElement("li");
   
    deleteButton.appendChild(trastIcon);
    li.appendChild(textIs);
    li.appendChild(deleteButton);
    alarmHistory.appendChild(li);
    
// to delete the alarm from the list
    deleteButton.addEventListener('click', e=>{
        e.preventDefault();
        const x = deleteButton.parentElement.textContent;
        const index= alarmListArray.indexOf(x);
        if(index> -1){
        alarmListArray.splice(index,1);
        console.log(alarmListArray);
        }
      
        deleteButton.parentElement.remove();

    })

}

// if the input is empty, this function returns with 0 so that while set alarm with 0 minutes and seconds
function checkIt(value){
    if(value== ""){
        console.log("checked 00")
        return value = "00";

    }else{
        console.log("checked true")
        return value;
    }
}


    

// set alarm button when clicked
addButton.addEventListener("click", e=>{
    console.log("button pressed")
    e.preventDefault();


    setHours = checkIt(document.getElementById("set-hours").value);
    setMinutes =  checkIt(document.getElementById("set-minutes").value);
    setSeconds = checkIt(document.getElementById("set-seconds").value);
    let amPm = document.getElementById("am-pm").value;
 
   
    if(setHours.length>2 || setHours>12 || setHours=="00"){
        alert("invalid time")
        console.log("hii");
        return;
    }
    if(setMinutes.length>2 || setMinutes>59){
        alert("invalid time")
        console.log("hii");
        return;
    }
    if(setSeconds.length>2 || setSeconds>59){
        alert("invalid time")
        console.log("hii");
        return;
    }
    
    

    const newAlarm =`${setHours}:${setMinutes}:${setSeconds} ${amPm}`;
   
    console.log(newAlarm)

//check if the alarm already doesnt exist or not and add them to the alarm aray and display on the alarm list
    if(!alarmListArray.includes(newAlarm)){
        alarmListArray.push(newAlarm);
        showAlarm(newAlarm);
        console.log(alarmListArray)

    }else {
        console.log("already exist");
        alert(` '${newAlarm}' this alarm already exist`)
    }



})



// live update of current time
function updatedTime() {
   
    let time=new Date();
    let hours = time.getHours();
    let amPm = hours >= 12 ? 'PM' : 'AM';
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    hours=hours%12;
    if(hours<10 ){
        hours= '0'+hours;
    }
    if(hours==00){
        hours=12;
    }
    if(minutes<10 ){
        minutes= '0'+minutes;
    }
    if(seconds<10 ){
        seconds= '0'+seconds;
    }
    const now =`${hours}:${minutes}:${seconds} ${amPm}`;
// display the clock to user

    clock.innerText = `${hours}:${minutes}:${seconds} ${amPm}`;
   
//    alarm ring and pop up alert to user with audio
    if(alarmListArray.includes(now) ){
        audio.play();
        setTimeout(function(){
            alert(`alarm...ring.. ring.. ring ${now}`);
                audio.pause();
                audio.currentTime = 0;
        }, 0);
        
        
    }

}


// display the time when the page loaded itself
updatedTime();
// update the time in even second
setInterval(updatedTime,1000);






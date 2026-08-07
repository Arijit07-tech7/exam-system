/* =====================================================
PREMIUM ONLINE EXAMINATION SYSTEM

APP.JS
PART 1 / 6

FIREBASE FREE LOGIN SYSTEM
===================================================== */


/* ===============================
USER DATABASE
================================ */


const users = [

{
    id:"AR001",
    username:"arijit",
    password:"arijit123",
    name:"Arijit",
    set:"A",
    unlimited:true
},


{
    id:"AL001",
    username:"alok",
    password:"alok123",
    name:"Alok",
    set:"B",
    unlimited:false
},


{
    id:"AN001",
    username:"ananya",
    password:"ananya123",
    name:"Ananya",
    set:"C",
    unlimited:false
},


{
    id:"SU001",
    username:"souhadri",
    password:"souhadri123",
    name:"Souhadri",
    set:"D",
    unlimited:false
}


];





/* ===============================
GLOBAL VARIABLES
================================ */


let currentStudent = null;

let currentSet = null;

let currentQuestion = 0;

let score = 0;

let questions = [];

let selectedAnswer = null;

let userAnswers = [];

let examFinished = false;

let questionTimer = null;

let masterTimer = null;

let totalSeconds = 600;

let warningCount = 0;







/* ===============================
PAGE LOAD
================================ */


window.addEventListener(
"load",
()=>{


setTimeout(()=>{


const loader =
document.getElementById(
"loadingScreen"
);



if(loader){

loader.style.display="none";

}




const loginPage =
document.getElementById(
"loginPage"
);



if(loginPage){

loginPage.classList.add(
"active"
);

}



},1200);



});









/* ===============================
PAGE SWITCH
================================ */


function showPage(pageId){


document
.querySelectorAll(".page")
.forEach(page=>{


page.style.display="none";


});




const page =
document.getElementById(pageId);



if(page){

page.style.display="block";


}



}









/* ===============================
LOGIN SYSTEM
================================ */



const loginBtn =
document.getElementById(
"loginBtn"
);



if(loginBtn){


loginBtn.addEventListener(
"click",
()=>{



const usernameInput =
document
.getElementById("username")
.value
.trim()
.toLowerCase();



const password =
document
.getElementById("password")
.value
.trim();





if(
usernameInput==="" ||
password===""
){


alert(
"Enter Username and Password"
);


return;


}







/* ===============================
FIND USER
================================ */



const student =
users.find(
user=>

user.username===usernameInput
&&
user.password===password

);






if(!student){


alert(
"Invalid Username or Password"
);


return;


}







/* ===============================
ATTEMPT CHECK
================================ */



let attempts =

JSON.parse(
localStorage.getItem(
"examAttempts"
)
)

|| {};







if(

attempts[student.username]

&&

student.unlimited !== true

){


alert(
"You have already completed your exam!"
);


return;


}








/* ===============================
SAVE LOGIN
================================ */


currentStudent = student;


currentSet =
student.set;



localStorage.setItem(
"currentUser",
JSON.stringify(student)
);







/* ===============================
DISPLAY STUDENT DATA
================================ */



const studentName =
document.getElementById(
"studentName"
);



if(studentName){

studentName.innerText =
student.name;


}







const studentSet =
document.getElementById(
"studentSet"
);



if(studentSet){


studentSet.innerText =

"Question Set : "
+
student.set;


}








const examStudent =
document.getElementById(
"examStudent"
);



if(examStudent){


examStudent.innerText =
student.name;


}







console.log(
"LOGIN SUCCESS",
currentStudent
);







showPage(
"instructionPage"
);



});



}







/* ===============================
AUTO RESTORE SESSION
================================ */


window.addEventListener(
"load",
()=>{


const savedUser =

JSON.parse(
localStorage.getItem(
"currentUser"
)
);



if(savedUser){


currentStudent =
savedUser;


currentSet =
savedUser.set;


}



});






console.log(
"================================="
);


console.log(
"PART 1 LOGIN SYSTEM READY"
);


console.log(
"FIREBASE REMOVED SUCCESSFULLY"
);


console.log(
"================================="
);

/* =====================================================
PREMIUM ONLINE EXAMINATION SYSTEM

APP.JS
PART 2 / 6

QUESTION DATABASE
FIREBASE FREE VERSION

SET A - ARIJIT
SET B - ALOK
SET C - ANANYA
SET D - SOUHADRI

===================================================== */


/* ===============================
QUESTION SET DATABASE
================================ */


const questionSets = {


/* ===============================
SET A
ARIJIT
================================ */


A:[


{
question:
"What does HTML stand for?",

options:[

"Hyper Text Markup Language",

"High Text Machine Language",

"Hyperlink Text Management Language",

"Home Tool Markup Language"

],

answer:0

},



{
question:
"Which CSS property is used to change text color?",

options:[

"font-color",

"color",

"text-color",

"background"

],

answer:1

},



{
question:
"Which keyword creates a constant variable in JavaScript?",

options:[

"var",

"let",

"const",

"static"

],

answer:2

},



{
question:
"Which method adds an element at the end of an array?",

options:[

"pop()",

"push()",

"shift()",

"add()"

],

answer:1

},



{
question:
"What does DOM stand for?",

options:[

"Document Object Model",

"Data Object Management",

"Digital Object Method",

"Document Oriented Model"

],

answer:0

}



],







/* ===============================
SET B
ALOK
================================ */


B:[


{
question:
"Which framework follows Product Owner and Scrum Master roles?",

options:[

"Waterfall",

"Scrum",

"Kanban",

"PRINCE2"

],

answer:1

},



{
question:
"What is MVP in software development?",

options:[

"Most Valuable Programmer",

"Minimum Viable Product",

"Maximum Visual Project",

"Main Version Program"

],

answer:1

},



{
question:
"Which tool is used for version control?",

options:[

"Git",

"Figma",

"Photoshop",

"Excel"

],

answer:0

},



{
question:
"What is debugging?",

options:[

"Finding and fixing code errors",

"Designing UI",

"Creating database",

"Hosting website"

],

answer:0

},



{
question:
"What does API stand for?",

options:[

"Application Programming Interface",

"Advanced Program Internet",

"Application Private Input",

"Applied Program Instruction"

],

answer:0

}



],








/* ===============================
SET C
ANANYA
================================ */


C:[


{
question:
"Which tag creates a hyperlink in HTML?",

options:[

"<link>",

"<a>",

"<href>",

"<url>"

],

answer:1

},



{
question:
"Which CSS system is used for two dimensional layout?",

options:[

"Flexbox",

"Grid",

"Float",

"Position"

],

answer:1

},



{
question:
"What does JSON stand for?",

options:[

"JavaScript Object Notation",

"Java Source Object Network",

"Java Online System",

"Joint Object Syntax"

],

answer:0

},



{
question:
"Which HTTP method retrieves data?",

options:[

"POST",

"GET",

"DELETE",

"PATCH"

],

answer:1

},



{
question:
"Which operator checks value and type both?",

options:[

"=",

"==",

"===",

"+="

],

answer:2

}



],








/* ===============================
SET D
SOUHADRI
================================ */


D:[


{
question:
"What is a software bug?",

options:[

"A code error",

"A feature",

"A design",

"A database"

],

answer:0

},



{
question:
"What is UI?",

options:[

"User Interface",

"User Internet",

"Universal Input",

"User Information"

],

answer:0

},



{
question:
"What is UX?",

options:[

"User Experience",

"User Extension",

"Universal XML",

"User Example"

],

answer:0

},



{
question:
"What is frontend?",

options:[

"User visible part of website",

"Database",

"Server",

"API"

],

answer:0

},



{
question:
"What is backend?",

options:[

"Server and database logic",

"Website color",

"Logo",

"Image"

],

answer:0

}



]



};







/* ===============================
QUESTION LOADER
================================ */


function loadStudentQuestionSet(){



if(!currentStudent){


alert(
"Student data missing"
);


return;


}





questions =

questionSets[
currentStudent.set
]

|| [];






console.log(
"Loaded Set:",
currentStudent.set
);



console.log(
"Total Questions:",
questions.length
);



}






console.log(
"================================="
);


console.log(
"PART 2 QUESTION SYSTEM READY"
);


console.log(
"FIREBASE QUESTION DATABASE REMOVED"
);


console.log(
"================================="
);

/* =====================================================
PREMIUM ONLINE EXAMINATION SYSTEM

APP.JS
PART 3 / 6

EXAM ENGINE
FIREBASE FREE VERSION

===================================================== */



/* ===============================
START EXAM BUTTON
================================ */


const startExamBtn =
document.getElementById(
"startExam"
);



if(startExamBtn){


startExamBtn.addEventListener(
"click",
async()=>{



const agree =
document.getElementById(
"agreeRules"
);




if(
!agree ||
!agree.checked
){


alert(
"Please accept instructions first"
);


return;


}





startExam();



});


}








/* ===============================
START EXAM
================================ */


function startExam(){



showPage(
"examPage"
);




loadStudentQuestionSet();





if(
questions.length===0
){


alert(
"No Question Found"
);


return;


}





currentQuestion = 0;

score = 0;

userAnswers = [];

selectedAnswer = null;

examFinished = false;



totalSeconds = 600;



startMasterTimer();



loadQuestion();





}









/* ===============================
LOAD QUESTION
================================ */


function loadQuestion(){



if(
examFinished
)
return;





const q =
questions[currentQuestion];




if(!q){


finishExam();

return;


}






const questionNo =
document.getElementById(
"questionNo"
);



if(questionNo){


questionNo.innerText =
currentQuestion + 1;


}








const questionText =
document.getElementById(
"questionText"
);



if(questionText){


questionText.innerText =
q.question;


}








const optionBox =
document.getElementById(
"options"
);



if(!optionBox)
return;






optionBox.innerHTML="";







q.options.forEach(
(option,index)=>{


const div =
document.createElement(
"div"
);



div.className =
"option";



div.innerHTML = `

<span>
${String.fromCharCode(65+index)}
</span>

${option}

`;




div.onclick = ()=>{


selectAnswer(
index,
div
);


};




optionBox.appendChild(
div
);



});







restoreAnswer();



updateProgress();



}









/* ===============================
SELECT ANSWER
================================ */


function selectAnswer(
index,
element
){



selectedAnswer=index;





document
.querySelectorAll(
".option"
)
.forEach(
option=>{


option.classList.remove(
"selected"
);


});





element.classList.add(
"selected"
);



}









/* ===============================
SAVE ANSWER
================================ */


function saveCurrentAnswer(){



userAnswers[
currentQuestion
]=selectedAnswer;



}









/* ===============================
RESTORE ANSWER
================================ */


function restoreAnswer(){



selectedAnswer =
userAnswers[
currentQuestion
];





if(
selectedAnswer===null ||
selectedAnswer===undefined
)
return;





const options =
document.querySelectorAll(
".option"
);



if(options[selectedAnswer]){


options[selectedAnswer]
.classList.add(
"selected"
);


}



}









/* ===============================
NEXT BUTTON
================================ */


const nextBtn =
document.getElementById(
"nextBtn"
);



if(nextBtn){


nextBtn.addEventListener(
"click",
()=>{


saveCurrentAnswer();





if(
currentQuestion <
questions.length-1
){


currentQuestion++;

loadQuestion();


}
else{


finishExam();


}



});


}









/* ===============================
PREVIOUS BUTTON
================================ */


const previousBtn =
document.getElementById(
"previousBtn"
);



if(previousBtn){


previousBtn.addEventListener(
"click",
()=>{



saveCurrentAnswer();





if(
currentQuestion>0
){


currentQuestion--;

loadQuestion();


}



});


}









/* ===============================
MASTER TIMER
================================ */


function startMasterTimer(){



clearInterval(
masterTimer
);





masterTimer =
setInterval(
()=>{



let min =
Math.floor(
totalSeconds/60
);



let sec =
totalSeconds%60;






const timer =
document.getElementById(
"masterTime"
);





if(timer){


timer.innerText =
`${min}:${sec<10?"0":""}${sec}`;


}






totalSeconds--;





if(
totalSeconds<=0
){



clearInterval(
masterTimer
);



alert(
"Time Finished"
);



finishExam();



}




},
1000
);



}









/* ===============================
PROGRESS BAR
================================ */


function updateProgress(){



const progress =

(
(currentQuestion+1)
/
questions.length
)
*
100;





const bar =
document.getElementById(
"progressFill"
);





if(bar){


bar.style.width =
progress+"%";


}



}







/* ===============================
AUTO SUBMIT
================================ */


function autoSubmit(){



finishExam();



}






console.log(
"================================="
);


console.log(
"PART 3 EXAM ENGINE READY"
);


console.log(
"FIREBASE FREE MODE"
);


console.log(
"================================="
);

/* =====================================================
PREMIUM ONLINE EXAMINATION SYSTEM

APP.JS
PART 4 / 6

EXAM SECURITY SYSTEM
FIREBASE FREE VERSION

===================================================== */



/* ===============================
SECURITY WARNING
================================ */


function showSecurityWarning(message){



if(examFinished)
return;





warningCount++;






const warningText =
document.getElementById(
"warningText"
);



if(warningText){


warningText.innerText =

message

+

"\nWarning : "

+

warningCount

+

"/3";


}







const popup =
document.getElementById(
"warningPopup"
);





if(popup){


popup.classList.remove(
"hidden"
);




setTimeout(()=>{


popup.classList.add(
"hidden"
);


},2500);



}








if(
warningCount>=3
){


alert(
"Too many violations. Exam submitted."
);


finishExam();


}



}









/* ===============================
TAB SWITCH DETECTION
================================ */


document.addEventListener(
"visibilitychange",
()=>{



if(

document.hidden

&&

!examFinished

&&

questions.length>0

){



showSecurityWarning(
"Tab switching detected!"
);



}



});









/* ===============================
FULLSCREEN EXIT
================================ */


document.addEventListener(
"fullscreenchange",
()=>{



if(

!document.fullscreenElement

&&

!examFinished

&&

questions.length>0

){



showSecurityWarning(
"Fullscreen exited!"
);



}



});









/* ===============================
COPY BLOCK
================================ */


document.addEventListener(
"copy",
(e)=>{



if(

!examFinished

&&

questions.length>0

){



e.preventDefault();



showSecurityWarning(
"Copy disabled!"
);



}



});









/* ===============================
PASTE BLOCK
================================ */


document.addEventListener(
"paste",
(e)=>{



if(

!examFinished

&&

questions.length>0

){



e.preventDefault();



showSecurityWarning(
"Paste disabled!"
);



}



});









/* ===============================
RIGHT CLICK BLOCK
================================ */


document.addEventListener(
"contextmenu",
(e)=>{



if(

!examFinished

&&

questions.length>0

){



e.preventDefault();


}



});









/* ===============================
KEYBOARD SECURITY
================================ */


document.addEventListener(
"keydown",
(e)=>{



if(examFinished)
return;






if(



e.key==="F12"



||



(

e.ctrlKey

&&

(

e.key.toLowerCase()==="c"

||

e.key.toLowerCase()==="v"

||

e.key.toLowerCase()==="u"

||

e.key.toLowerCase()==="s"

)

)



){



e.preventDefault();




showSecurityWarning(
"Keyboard shortcut blocked!"
);



}



});









/* ===============================
BACK BUTTON BLOCK
================================ */


history.pushState(
null,
null,
location.href
);





window.onpopstate =
()=>{



if(

!examFinished

&&

questions.length>0

){



showSecurityWarning(
"Back button disabled!"
);




history.pushState(
null,
null,
location.href
);



}



};









/* ===============================
PAGE CLOSE WARNING
================================ */


window.addEventListener(
"beforeunload",
(e)=>{



if(

!examFinished

&&

questions.length>0

){



e.preventDefault();



e.returnValue="";


}



});








console.log(
"================================="
);


console.log(
"PART 4 SECURITY SYSTEM READY"
);


console.log(
"FIREBASE FREE MODE"
);


console.log(
"================================="
);

/* =====================================================
PREMIUM ONLINE EXAMINATION SYSTEM

APP.JS
PART 5 / 6

RESULT SYSTEM + LOCAL STORAGE SAVE

FIREBASE FREE VERSION

===================================================== */





/* ===============================
FINISH EXAM
================================ */


function finishExam(){



if(examFinished)
return;





examFinished=true;





clearInterval(
questionTimer
);


clearInterval(
masterTimer
);






saveCurrentAnswer();





calculateScore();





saveExamResult();





showPage(
"resultPage"
);





displayResult();




}









/* ===============================
CALCULATE SCORE
================================ */


function calculateScore(){



score=0;





questions.forEach(
(q,index)=>{



if(

userAnswers[index] !== undefined

&&

userAnswers[index] !== null

&&

userAnswers[index] === q.answer

){


score++;


}



});





}









/* ===============================
SAVE RESULT
================================ */


function saveExamResult(){



if(!currentStudent)
return;







const percentage =


questions.length > 0

?

(

score

/

questions.length

)

*

100

:

0;








let results =

JSON.parse(

localStorage.getItem(
"examResults"
)

)

|| [];









const resultData={



id:

currentStudent.id,



name:

currentStudent.name,



username:

currentStudent.username,



set:

currentStudent.set,



score:

score,



total:

questions.length,



percentage:

percentage.toFixed(2),



date:

new Date().toLocaleString()



};








results.push(
resultData
);







localStorage.setItem(

"examResults",

JSON.stringify(results)

);









/*
================================
ATTEMPT SAVE

ONLY NORMAL USERS
================================
*/





if(

currentStudent.unlimited !== true

){



let attempts =


JSON.parse(

localStorage.getItem(
"examAttempts"
)

)

|| {};





attempts[
currentStudent.username
]
=true;





localStorage.setItem(

"examAttempts",

JSON.stringify(attempts)

);



}







console.log(
"RESULT SAVED",
resultData
);





}









/* ===============================
DISPLAY RESULT
================================ */


function displayResult(){



const percentage =


questions.length > 0

?

(

score

/

questions.length

)

*

100

:

0;








const resultStudent =

document.getElementById(
"resultStudent"
);



if(resultStudent){


resultStudent.innerText =

currentStudent.name;


}









const scoreText =

document.getElementById(
"scoreText"
);



if(scoreText){


scoreText.innerText =

score

+

" / "

+

questions.length;


}









const percentageBox =

document.getElementById(
"percentage"
);



if(percentageBox){


percentageBox.innerText =

percentage.toFixed(2)

+

"%";


}









const status =

document.getElementById(
"status"
);






if(status){



if(
percentage>=40
){



status.innerText="PASS";

status.className="pass";



}

else{


status.innerText="FAIL";

status.className="fail";


}



}









const grade =

document.getElementById(
"grade"
);





if(grade){


let g="F";



if(percentage>=90)
g="A+";

else if(percentage>=80)
g="A";

else if(percentage>=70)
g="B";

else if(percentage>=60)
g="C";

else if(percentage>=40)
g="D";





grade.innerText=g;



}




}









/* ===============================
AUTO SUBMIT
================================ */


function autoSubmit(){



alert(
"Time Finished! Exam Submitted"
);



finishExam();



}









console.log(
"================================="
);


console.log(
"PART 5 RESULT SYSTEM READY"
);


console.log(
"LOCAL STORAGE MODE ENABLED"
);


console.log(
"================================="
);

/* =====================================================
PREMIUM ONLINE EXAMINATION SYSTEM

APP.JS
PART 6 / 6

REVIEW + LOGOUT + CLEANUP

FIREBASE FREE VERSION

===================================================== */







/* ===============================
REVIEW BUTTON
================================ */


const reviewBtn =
document.getElementById(
"reviewBtn"
);



if(reviewBtn){


reviewBtn.addEventListener(
"click",
()=>{


showPage(
"reviewPage"
);



loadReview();



});


}









/* ===============================
LOAD REVIEW
================================ */


function loadReview(){



const container =

document.getElementById(
"reviewContainer"
);





if(!container)
return;





container.innerHTML="";








questions.forEach(
(q,index)=>{





const userAnswer =

userAnswers[index];






const div =

document.createElement(
"div"
);






div.className =
"reviewItem";









let userText =
"Not Answered";





if(
userAnswer!==undefined
&&
userAnswer!==null
){


userText =
q.options[userAnswer];


}







let correctText =

q.options[q.answer];









let resultClass="";




if(
userAnswer===q.answer
){


resultClass =
"correctAnswer";


}

else{


resultClass =
"wrongAnswer";


}









div.innerHTML = `


<h3>
Question ${index+1}
</h3>


<p>
${q.question}
</p>


<p class="${resultClass}">

Your Answer:
${userText}

</p>


<p>

Correct Answer:
${correctText}

</p>



`;







container.appendChild(
div
);






});






}









/* ===============================
CLOSE REVIEW
================================ */


const closeReview =

document.getElementById(
"closeReview"
);





if(closeReview){



closeReview.addEventListener(
"click",
()=>{


showPage(
"resultPage"
);



});


}









/* ===============================
LOGOUT BUTTON
================================ */


const logoutBtn =

document.getElementById(
"logoutBtn"
);





if(logoutBtn){


logoutBtn.addEventListener(
"click",
()=>{


logoutUser();


});


}









/* ===============================
LOGOUT FUNCTION
================================ */


function logoutUser(){





clearInterval(
questionTimer
);


clearInterval(
masterTimer
);







currentStudent=null;


currentSet=null;


questions=[];


userAnswers=[];


score=0;


currentQuestion=0;


examFinished=false;


warningCount=0;









localStorage.removeItem(
"currentUser"
);






showPage(
"loginPage"
);







console.log(
"USER LOGGED OUT"
);



}









/* ===============================
FULL RESET SYSTEM
================================ */


function resetExam(){





clearInterval(
questionTimer
);


clearInterval(
masterTimer
);







currentStudent=null;


currentSet=null;


questions=[];


userAnswers=[];


score=0;


currentQuestion=0;


selectedAnswer=null;


examFinished=false;


warningCount=0;








const username =

document.getElementById(
"username"
);





const password =

document.getElementById(
"password"
);







if(username)
username.value="";





if(password)
password.value="";







if(
document.fullscreenElement
){


document
.exitFullscreen()
.catch(()=>{});


}







showPage(
"loginPage"
);





}









/* ===============================
FINISH BUTTON
================================ */


const finishBtn =

document.getElementById(
"finishBtn"
);






if(finishBtn){



finishBtn.addEventListener(
"click",
()=>{


resetExam();



});


}









/* ===============================
SYSTEM READY
================================ */


console.log(
"================================="
);


console.log(
"PREMIUM EXAM SYSTEM READY"
);


console.log(
"PART 1-6 COMPLETED"
);


console.log(
"FIREBASE COMPLETELY REMOVED"
);


console.log(
"================================="
);


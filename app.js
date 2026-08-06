/* =====================================================
   PREMIUM ONLINE EXAMINATION SYSTEM
   APP.JS
   PART 1 / 6
===================================================== */


/* ===============================
   LOADING SYSTEM
================================ */


window.addEventListener("load", () => {


    setTimeout(() => {


        document
            .getElementById("loadingScreen")
            .style.display = "none";


        document
            .getElementById("loginPage")
            .classList
            .remove("hidden");


    }, 2000);


});





/* ===============================
   STUDENT DATABASE
================================ */


const students = [


    {

        username: "Arijit",

        password: "1234",

        name: "Arijit",

        set: "A"

    },


    {

        username: "ananaya",

        password: "9080",

        name: "Ananaya",

        set: "B"

    },


    {

        username: "Alok",

        password: "9878",

        name: "Alok",

        set: "C"

    },


    {

        username: "Souhadri",

        password: "5645",

        name: "Souhadri",

        set: "D"

    }


];





/* ===============================
   EXAM STATUS STORAGE
================================ */


function hasCompletedExam(username) {

    let attempts =
        Number(localStorage.getItem("attempt_" + username)) || 0;


    if(username === "Arijit"){

        return attempts >= 3;   // Arijit 3 bar allowed

    }


    return attempts >= 1;       // Others only 1 bar

}




function markExamCompleted(username) {

    let attempts =
        Number(localStorage.getItem("attempt_" + username)) || 0;


    attempts++;


    localStorage.setItem(
        "attempt_" + username,
        attempts
    );

}

/* ===============================
   GLOBAL VARIABLES
================================ */


let currentStudent = null;


let currentSet = null;


let currentQuestion = 0;


let userAnswers = [];


let score = 0;

let examFinished = false;



/* ===============================
   PAGE SWITCH FUNCTION
================================ */


function showPage(pageID) {


    document
        .querySelectorAll(".page")
        .forEach(page => {


            page.classList.add("hidden");


        });



    document
        .getElementById(pageID)
        .classList
        .remove("hidden");


}







/* ===============================
   LOGIN SYSTEM
================================ */


document
    .getElementById("loginBtn")
    .addEventListener("click", () => {


        let username =

            document
                .getElementById("username")
                .value
                .trim();



        let password =

            document
                .getElementById("password")
                .value
                .trim();





        if (username === "" || password === "") {


            alert("Enter Username and Password");


            return;


        }






        let student =

            students.find(user =>

                user.username === username

                &&

                user.password === password

            );





        if (student) {

            if (hasCompletedExam(student.username)) {


                alert(
                    "You have already completed your exam!"
                );


                return;


            }



            currentStudent = student;



            currentSet =
                student.set;



            document
                .getElementById("studentName")
                .innerText =

                student.name;




            document
                .getElementById("studentSet")
                .innerText =

                "Question Set : " + student.set;




            document
                .getElementById("examStudent")
                .innerText =

                student.name;




            showPage("instructionPage");



        }

        else {


            alert("Invalid Username or Password");


        }



    });

/* =====================================================
   PREMIUM ONLINE EXAMINATION SYSTEM
   APP.JS
   PART 2 / 6

   QUESTION DATABASE
   SET A - ARIJIT
   SET B - ANANAYA
   SET C - ALOKI
   SET D - SOUHADRI 
===================================================== */



const questionSets = {



    /* ===============================
            SET A
            ARIJIT
    ================================ */


    A:[

{
question:"In modern web development, why is it strongly recommended to use HTML5 semantic elements such as <header>, <nav>, <article>, <section>, and <footer> instead of generic <div> containers?",
options:[
"Semantic elements automatically apply responsive CSS grid styling without needing external style sheets.",
"Semantic elements improve Accessibility (a11y) for screen readers, enhance SEO indexing by search engine crawlers, and make code maintainable and readable.",
"Generic <div> tags are deprecated in HTML5 and will cause rendering warnings in modern browsers like Chrome and Firefox.",
"Semantic tags execute client-side JavaScript faster because they are parsed at a higher browser execution priority."
],
answer:1
},


{
question:"Consider a <div> element styled with width:300px, padding:20px, border:5px solid black, margin:15px and box-sizing:content-box. What is the total rendered width and how does border-box change it?",
options:[
"Under content-box total width is 350px; under border-box content width shrinks so total outer width equals 300px.",
"Under content-box total width is 380px; under border-box total width includes margins and equals 330px.",
"Under content-box total width is 350px (Width + Padding + Border); under border-box total rendered width equals 300px as padding and border are included inside width.",
"Under content-box total width is 325px; under border-box margin is added into content area."
],
answer:2
},


{
question:"Analyze the JavaScript execution order: console.log('Start'); setTimeout(()=>console.log('Timeout Callback'),0); Promise.resolve().then(()=>console.log('Promise Resolved')); console.log('End');",
options:[
"Start → Timeout Callback → Promise Resolved → End",
"Start → End → Timeout Callback → Promise Resolved",
"Start → End → Promise Resolved → Timeout Callback",
"Start → Promise Resolved → End → Timeout Callback"
],
answer:2
},


{
question:"When architecting complex web application layouts, what is the primary structural difference between CSS Flexbox and CSS Grid?",
options:[
"Flexbox is designed for 1-Dimensional layouts, whereas CSS Grid is designed for 2-Dimensional layouts.",
"Flexbox only works for mobile sizes while CSS Grid works only on desktop.",
"Flexbox requires absolute positioning while Grid does not.",
"Flexbox handles server-side rendering while Grid uses WebGL."
],
answer:0
},


{
question:"What happens when a user types https://www.example.com in a browser and presses Enter?",
options:[
"HTTP GET Request → HTML rendered → DNS Resolution → TCP Handshake → SSL/TLS Negotiation.",
"DNS Resolution → TCP 3-Way Handshake → TLS Handshake → HTTP GET Request → Server Response → DOM/CSSOM Rendering.",
"Browser renders cached layout → DNS downloads JavaScript → Database query executes locally.",
"TLS starts TCP lookup → HTTP POST fetches HTML → DNS compiles CSS."
],
answer:1
}


],





    B: [

        {
            question: "What is the main difference between <div> and <span> elements?",
            options: [
                "<div> is an inline element, and <span> is a block-level element.",
                "<div> is a block-level element, and <span> is an inline element.",
                "<div> is used for text, and <span> is used for layout containers.",
                "<div> automatically adds bold formatting, while <span> does not."
            ],
            answer: 1
        },


        {
            question: "What does semantic HTML mean?",
            options: [
                "Using tags with meaningful names (like <header>, <nav>, <article>) to describe content purpose.",
                "Writing HTML code using inline CSS styles.",
                "Adding custom JavaScript attributes to standard HTML elements.",
                "Writing all HTML tags in uppercase letters."
            ],
            answer: 0
        },


        {
            question: "What is the main purpose of the alt attribute in an <img> tag?",
            options: [
                "To specify an alternative image URL if the primary link breaks.",
                "To provide a textual description if the image fails to load or for screen readers.",
                "To define the hover tooltip text displayed over the image.",
                "To automatically resize the image width."
            ],
            answer: 1
        },


        {
            question: "Which HTML5 tag is used to embed video files natively without third-party plugins?",
            options: [
                "<media>",
                "<movie>",
                "<video>",
                "<play>"
            ],
            answer: 2
        },


        {
            question: "What is the correct HTML element for inserting a line break?",
            options: [
                "<lb>",
                "<br>",
                "<break>",
                "<newline>"
            ],
            answer: 1
        },


        {
            question: "In the CSS Box Model, what is the correct order of layers from the inside out?",
            options: [
                "Content → Border → Padding → Margin",
                "Content → Padding → Border → Margin",
                "Content → Margin → Padding → Border",
                "Padding → Content → Border → Margin"
            ],
            answer: 1
        },


        {
            question: "What does box-sizing: border-box; do in CSS?",
            options: [
                "It includes padding and border inside the total width and height of an element.",
                "It adds a default 1px solid border to all containers.",
                "It sets margin spacing to zero automatically.",
                "It rounds the corners of the box container."
            ],
            answer: 0
        },


        {
            question: "What is the difference between display:none and visibility:hidden?",
            options: [
                "display:none leaves an empty space; visibility:hidden removes the space.",
                "display:none removes the element completely from layout; visibility:hidden hides it but keeps its empty space.",
                "Both properties behave identically.",
                "visibility:hidden disables JavaScript events completely."
            ],
            answer: 1
        },


        {
            question: "Which CSS property centers flex items along the main axis in Flexbox?",
            options: [
                "align-items:center",
                "justify-content:center",
                "text-align:center",
                "flex-center:true"
            ],
            answer: 1
        },


        {
            question: "Which CSS position value locks an element relative to the browser viewport even when scrolling?",
            options: [
                "position:relative",
                "position:absolute",
                "position:fixed",
                "position:static"
            ],
            answer: 2
        },


        {
            question: 'How do you select an element with id="header" in CSS?',
            options: [
                ".header",
                "#header",
                "*header",
                "@header"
            ],
            answer: 1
        },


        {
            question: "What is the key difference between var, let, and const?",
            options: [
                "var is block-scoped; let and const are function-scoped.",
                "var is function-scoped; let is block-scoped and re-assignable; const is block-scoped and cannot be reassigned.",
                "const object properties cannot be modified.",
                "let can be hoisted, but var cannot."
            ],
            answer: 1
        },


        {
            question: "What is the difference between == and === in JavaScript?",
            options: [
                "== compares data types; === compares values.",
                "== converts data types before comparing; === compares both value AND data type without conversion.",
                "=== converts strings to numbers before comparison.",
                "Both operators function identically."
            ],
            answer: 1
        },


        {
            question: "What will typeof null return in JavaScript?",
            options: [
                '"null"',
                '"undefined"',
                '"object"',
                '"boolean"'
            ],
            answer: 2
        },


        {
            question: "Which of the following is NOT a primitive data type in JavaScript?",
            options: [
                "String",
                "Boolean",
                "Array",
                "Number"
            ],
            answer: 2
        },


        {
            question: "What does DOM stand for in JavaScript?",
            options: [
                "Document Object Model",
                "Data Object Mapping",
                "Digital Operations Mode",
                "Desktop Orientation Manager"
            ],
            answer: 0
        },


        {
            question: "How do you write a conditional statement in JS that executes if x is NOT equal to 5?",
            options: [
                "if (x <> 5)",
                "if (x !== 5)",
                "if x =! 5 then",
                "if (x NOT 5)"
            ],
            answer: 1
        },


        {
            question: "How do you select all elements with the class card using Vanilla JS?",
            options: [
                "document.getElementById('card')",
                "document.querySelectorAll('.card')",
                "document.getElement('.card')",
                "document.findClasses('card')"
            ],
            answer: 1
        },


        {
            question: "What is Event Bubbling in JavaScript DOM?",
            options: [
                "Events travel from the root document node down to the target element.",
                "An event triggers on the innermost element first, then propagates upwards through its parent elements.",
                "Events execute in a random order based on memory allocation.",
                "An event that repeats continuously in a loop."
            ],
            answer: 1
        },


        {
            question: "Which method is used to attach a click event to a button element?",
            options: [
                "button.attachEvent('click', callback)",
                "button.addEventListener('click', callback)",
                "button.onClick(callback)",
                "button.listen('click', callback)"
            ],
            answer: 1
        },


        {
            question: "How do you create a new <div> element dynamically in JS?",
            options: [
                "document.makeElement('div')",
                "document.createElement('div')",
                "document.newTag('div')",
                "window.addNode('div')"
            ],
            answer: 1
        },


        {
            question: "What does JSON.parse() do in JavaScript?",
            options: [
                "Converts a JavaScript object into a JSON string.",
                "Converts a JSON string into a JavaScript object.",
                "Validates if a form is filled correctly.",
                "Clears local storage data."
            ],
            answer: 1
        },


        {
            question: "What does the fetch() method return?",
            options: [
                "Direct JSON data.",
                "A Promise that resolves to a Response object.",
                "A synchronous text string.",
                "An XML Document."
            ],
            answer: 1
        },


        {
            question: 'What is the HTTP status code for "Not Found"?',
            options: [
                "200",
                "500",
                "404",
                "403"
            ],
            answer: 2
        },


        {
            question: "Which HTTP method is primarily used to request/retrieve data from a server?",
            options: [
                "GET",
                "POST",
                "PUT",
                "DELETE"
            ],
            answer: 0
        },


        {
            question: "Where is localStorage data stored, and when does it expire?",
            options: [
                "Stored on the server; expires when session ends.",
                "Stored in the browser; has no expiration date until explicitly deleted.",
                "Stored in browser memory; expires when the browser tab is closed.",
                "Stored in cookies; expires after 24 hours."
            ],
            answer: 1
        },


        {
            question: "What is CORS (Cross-Origin Resource Sharing)?",
            options: [
                "A CSS framework for responsive layouts.",
                "A browser security feature that restricts resources from being requested from a different domain.",
                "A server protocol to compress images.",
                "A JavaScript bundler tool."
            ],
            answer: 1
        },


        {
            question: 'Which HTML attribute is used to open a hyperlink in a new browser tab?',
            options: [
                'target="_self"',
                'target="_blank"',
                'rel="newtab"',
                'href="_new"'
            ],
            answer: 1
        },


        {
            question: "Which CSS unit is relative to the font-size of the root <html> element?",
            options: [
                "em",
                "rem",
                "vh",
                "px"
            ],
            answer: 1
        },


        {
            question: 'What will console.log(1 + "2" + 3) output in JavaScript?',
            options: [
                "6",
                '"123"',
                '"33"',
                "NaN"
            ],
            answer: 1
        }

    ],






    C: [

        {
            question: "Which HTML tag is used to create an unordered list with bullet points?",
            options: [
                "<ol>",
                "<ul>",
                "<list>",
                "<dl>"
            ],
            answer: 1
        },


        {
            question: "What is the purpose of the <head> tag in an HTML document?",
            options: [
                "To display the main heading text on the webpage.",
                "To contain metadata, title, and linked external files not directly visible in the page body.",
                "To create a fixed top header navigation bar.",
                "To write client-side JavaScript functions only."
            ],
            answer: 1
        },


        {
            question: "Which attribute is used in HTML forms to specify where to send the form-data when submitted?",
            options: [
                "method",
                "action",
                "target",
                "path"
            ],
            answer: 1
        },


        {
            question: "How do you embed an external CSS file into an HTML page?",
            options: [
                '<style src="styles.css">',
                '<link rel="stylesheet" href="styles.css">',
                '<script href="styles.css">',
                '<css path="styles.css">'
            ],
            answer: 1
        },


        {
            question: "What is the default display value for a <p> (paragraph) element?",
            options: [
                "inline",
                "block",
                "inline-block",
                "flex"
            ],
            answer: 1
        },


        {
            question: "Which CSS property is used to change the font of an element?",
            options: [
                "font-weight",
                "font-family",
                "font-style",
                "text-transform"
            ],
            answer: 1
        },


        {
            question: "What does the z-index property in CSS control?",
            options: [
                "The horizontal alignment of elements.",
                "The vertical alignment along the Y-axis.",
                "The stacking order of overlapping elements along the Z-axis.",
                "The zoom/scale percentage of an image."
            ],
            answer: 2
        },


        {
            question: "How do you make a list display horizontally without bullet points using CSS?",
            options: [
                "list-style-type:none; display:flex;",
                "text-decoration:none; position:horizontal;",
                "list-format:inline; align:row;",
                "display:grid; grid-columns:auto;"
            ],
            answer: 0
        },


        {
            question: "In Flexbox, which property controls spacing between flex items along the cross axis?",
            options: [
                "justify-content",
                "align-items",
                "flex-direction",
                "gap-inline"
            ],
            answer: 1
        },


        {
            question: "Which CSS pseudoclass styles an element when a user moves their mouse cursor over it?",
            options: [
                ":active",
                ":focus",
                ":hover",
                ":visited"
            ],
            answer: 2
        },


        {
            question: "Which operator in JavaScript is used to assign a value to a variable?",
            options: [
                "==",
                "===",
                "=",
                "=>"
            ],
            answer: 2
        },


        {
            question: "What will console.log(typeof NaN) return in JavaScript?",
            options: [
                '"NaN"',
                '"undefined"',
                '"number"',
                '"object"'
            ],
            answer: 2
        },


        {
            question: "How do you write a single-line comment in JavaScript?",
            options: [
                "<!-- comment -->",
                "/* comment */",
                "// comment",
                "# comment"
            ],
            answer: 2
        },


        {
            question: "Which built-in method converts a string to uppercase letters in JS?",
            options: [
                "toUpper()",
                "toUpperCase()",
                "changeCase('upper')",
                "capitalize()"
            ],
            answer: 1
        },


        {
            question: "What is the output of console.log([] + []) in JavaScript?",
            options: [
                "0",
                "undefined",
                '"" (empty string)',
                "NaN"
            ],
            answer: 2
        },


        {
            question: "Which JS array method adds one or more elements to the end of an array?",
            options: [
                "pop()",
                "push()",
                "unshift()",
                "shift()"
            ],
            answer: 1
        },


        {
            question: "Which JS array method removes the first element from an array?",
            options: [
                "pop()",
                "push()",
                "shift()",
                "unshift()"
            ],
            answer: 2
        },


        {
            question: "What does the preventDefault() method do inside an event listener?",
            options: [
                "Stops the event from bubbling up to parent elements.",
                "Prevents the browser's default action for the event.",
                "Deletes the event listener immediately after execution.",
                "Pauses JS execution for 1 second."
            ],
            answer: 1
        },


        {
            question: "Which property is used to get or set the text content inside an HTML element using JS?",
            options: [
                "element.innerText or element.textContent",
                "element.value",
                "element.getHTML()",
                "element.src"
            ],
            answer: 0
        },


        {
            question: "How do you execute a JS function repeatedly at specified time intervals?",
            options: [
                "setTimeout()",
                "setInterval()",
                "requestAnimationFrame()",
                "setLoop()"
            ],
            answer: 1
        },


        {
            question: "What will Boolean(\"\") evaluate to in JavaScript?",
            options: [
                "true",
                "false",
                "null",
                "undefined"
            ],
            answer: 1
        },


        {
            question: "Which method removes whitespace from both ends of a string in JS?",
            options: [
                "strip()",
                "trim()",
                "clean()",
                "cut()"
            ],
            answer: 1
        },


        {
            question: 'What is the HTTP status code for "Internal Server Error"?',
            options: [
                "400",
                "401",
                "500",
                "503"
            ],
            answer: 2
        },


        {
            question: 'Which HTTP status code represents "Unauthorized Access"?',
            options: [
                "201",
                "401",
                "404",
                "502"
            ],
            answer: 1
        },


        {
            question: "What is the main difference between HTTP and HTTPS?",
            options: [
                "HTTPS uses a faster transfer protocol than HTTP.",
                "HTTPS encrypts data in transit using SSL/TLS encryption.",
                "HTTP works only on mobile devices.",
                "HTTPS does not support POST requests."
            ],
            answer: 1
        },


        {
            question: "Which HTTP method is typically used to completely delete a resource from a server?",
            options: [
                "REMOVE",
                "DELETE",
                "CLEAR",
                "POST"
            ],
            answer: 1
        },


        {
            question: "What does the sessionStorage object do in Web Storage API?",
            options: [
                "Stores data permanently until cleared manually.",
                "Stores data only for the duration of the current page session/tab.",
                "Sends data back to the server on every HTTP request automatically.",
                "Encrypts data before saving it in browser memory."
            ],
            answer: 1
        },


        {
            question: "What is the purpose of the async keyword in JavaScript functions?",
            options: [
                "It forces the function to execute synchronously.",
                "It makes the function automatically return a Promise.",
                "It runs the function on a Web Worker thread.",
                "It pauses browser execution until data is returned."
            ],
            answer: 1
        },


        {
            question: 'In JavaScript, what is the output of console.log(3 == "3") vs console.log(3 === "3")?',
            options: [
                "true, true",
                "false, false",
                "true, false",
                "false, true"
            ],
            answer: 2
        },


        {
            question: "Which HTML element is used to group related input options together inside a <select> dropdown?",
            options: [
                "<group>",
                "<optgroup>",
                "<optionlist>",
                "<fieldset>"
            ],
            answer: 1
        }

    ],







    D: [

        {
            question: "What does HTML stand for?",
            options: [
                "Hyper Text Markup Language",
                "High Text Machine Language",
                "Hyperlinks Text Mark Language",
                "Home Tool Markup Language"
            ],
            answer: 0
        },


        {
            question: "Which HTML tag represents the largest heading?",
            options: [
                "<h6>",
                "<h1>",
                "<heading>",
                "<head>"
            ],
            answer: 1
        },


        {
            question: "Which tag is used to insert a line break in HTML?",
            options: [
                "<break>",
                "<lb>",
                "<br>",
                "<line>"
            ],
            answer: 2
        },


        {
            question: "What is the correct HTML syntax for creating a hyperlink?",
            options: [
                '<a href="url">',
                '<link src="url">',
                '<a url="url">',
                '<hyperlink href="url">'
            ],
            answer: 0
        },


        {
            question: "Which tag is used to embed an image in an HTML page?",
            options: [
                "<picture>",
                "<img>",
                "<src>",
                "<image>"
            ],
            answer: 1
        },


        {
            question: "Which tag is used to create a bulleted (unordered) list?",
            options: [
                "<ol>",
                "<ul>",
                "<li>",
                "<list>"
            ],
            answer: 1
        },


        {
            question: "Which tag is used to create a numbered (ordered) list?",
            options: [
                "<ol>",
                "<ul>",
                "<dl>",
                "<list>"
            ],
            answer: 0
        },


        {
            question: "What is the correct HTML syntax for creating a checkbox?",
            options: [
                '<input type="check">',
                '<input type="checkbox">',
                "<checkbox>",
                "<check>"
            ],
            answer: 1
        },


        {
            question: "Which HTML tag is used to create a dropdown list?",
            options: [
                '<input type="dropdown">',
                "<list>",
                "<select>",
                "<dropdown>"
            ],
            answer: 2
        },


        {
            question: "Which tag was introduced in HTML5 for embedding video content?",
            options: [
                "<media>",
                "<movie>",
                "<video>",
                "<play>"
            ],
            answer: 2
        },


        {
            question: "What does CSS stand for?",
            options: [
                "Cascading Style Sheets",
                "Creative Style System",
                "Computer Style Sheet",
                "Colorful Style Sheets"
            ],
            answer: 0
        },


        {
            question: "Which CSS property changes the background color of an element to red?",
            options: [
                "background-color: red;",
                "bg-color: red;",
                "color: red;",
                "text-background: red;"
            ],
            answer: 0
        },


        {
            question: "Which CSS property is used to change text color?",
            options: [
                "text-color",
                "font-color",
                "color",
                "style-color"
            ],
            answer: 2
        },


        {
            question: "Which character is used to select a Class in CSS?",
            options: [
                "# (Hash)",
                ". (Dot)",
                "* (Asterisk)",
                "& (Ampersand)"
            ],
            answer: 1
        },


        {
            question: "Which character is used to select an ID in CSS?",
            options: [
                "# (Hash)",
                ". (Dot)",
                "@ (At)",
                "! (Exclamation)"
            ],
            answer: 0
        },


        {
            question: "Which CSS property controls text size?",
            options: [
                "text-size",
                "font-size",
                "text-style",
                "font-weight"
            ],
            answer: 1
        },


        {
            question: "Which property adds space inside an element's border?",
            options: [
                "margin",
                "border",
                "padding",
                "spacing"
            ],
            answer: 2
        },


        {
            question: "Which property adds space outside an element's border?",
            options: [
                "padding",
                "margin",
                "border-spacing",
                "outline"
            ],
            answer: 1
        },


        {
            question: "How do you remove underlines from hyperlinks using CSS?",
            options: [
                "text-decoration: none;",
                "text-style: no-underline;",
                "decoration: none;",
                "text-underline: false;"
            ],
            answer: 0
        },


        {
            question: "Where in an HTML document is the correct place to link an external CSS file using the <link> tag?",
            options: [
                "Inside the <body> section",
                "Inside the <head> section",
                "Inside the <footer> section",
                "At the end of the HTML file"
            ],
            answer: 1
        },


        {
            question: "Which tag is used to write JavaScript code in HTML?",
            options: [
                "<javascript>",
                "<script>",
                "<js>",
                "<scripting>"
            ],
            answer: 1
        },


        {
            question: "How do you write a pop-up alert box in JavaScript?",
            options: [
                'msg("Hello");',
                'alertBox("Hello");',
                'alert("Hello");',
                'console.log("Hello");'
            ],
            answer: 2
        },


        {
            question: "Which keyword is valid for declaring a variable in JavaScript?",
            options: [
                "var x = 5;",
                "let x = 5;",
                "const x = 5;",
                "All of the above"
            ],
            answer: 3
        },


        {
            question: "Which command is used to output data to the browser console?",
            options: [
                "print()",
                "console.log()",
                "document.write()",
                "log.console()"
            ],
            answer: 1
        },


        {
            question: "How do you start a single-line comment in JavaScript?",
            options: [
                "<!-- comment -->",
                "/* comment */",
                "// comment",
                "# comment"
            ],
            answer: 2
        },


        {
            question: "Which event occurs when a user clicks on an HTML element?",
            options: [
                "onhover",
                "onclick",
                "onchange",
                "onmouse"
            ],
            answer: 1
        },


        {
            question: "Which DOM method selects an element using its ID in JavaScript?",
            options: [
                "document.getElementByName()",
                "document.getElementById()",
                "document.getStyleById()",
                "document.querySelectorId()"
            ],
            answer: 1
        },


        {
            question: "Which operator returns the data type of a variable in JavaScript?",
            options: [
                "typeof",
                "type",
                "datatype",
                "instanceof"
            ],
            answer: 0
        },


        {
            question: "What is the correct syntax for writing an Array in JavaScript?",
            options: [
                'let colors = "red", "green", "blue";',
                'let colors = ["red", "green", "blue"];',
                'let colors = (1:"red", 2:"green", 3:"blue");',
                'let colors = {red, green, blue};'
            ],
            answer: 1
        },


        {
            question: "Which engine processes and executes JavaScript code inside a web browser?",
            options: [
                "HTML Compiler",
                "C Programmers",
                "JavaScript Engine",
                "Web Server"
            ],
            answer: 2
        }

    ]

}





/* ===============================
   ACTIVE QUESTION ARRAY
================================ */


let questions = [];



/* =====================================================
   PREMIUM ONLINE EXAMINATION SYSTEM
   APP.JS
   PART 3 / 6

   EXAM ENGINE
===================================================== */



/* =====================================================
        START EXAM BUTTON
===================================================== */


document
    .getElementById("startExam")
    .addEventListener("click", () => {


        let agree =
            document.getElementById("agreeRules");


        if (!agree.checked) {

            alert("Please accept instructions first");
            return;

        }


        startExam();


    });





/* =====================================================
        LOAD STUDENT QUESTION SET
===================================================== */

function loadStudentQuestionSet() {


    if (!currentStudent) {

        alert("Student data missing. Please login again");
        return;

    }


    questions =
        questionSets[currentStudent.set] || [];


    console.log(
        "Loaded Set:",
        currentStudent.set,
        "Total Questions:",
        questions.length
    );


}





/* =====================================================
        START EXAM FUNCTION
===================================================== */


function startExam() {



    showPage("examPage");



    // Load student's question set

    loadStudentQuestionSet();



    currentQuestion = 0;


    userAnswers = [];


    score = 0;
    totalSeconds = 600;
    startMasterTimer();




    // Fullscreen

    openFullscreen();




    loadQuestion();



}






/* =====================================================
        FULLSCREEN
===================================================== */


function openFullscreen() {



    let page =

        document.documentElement;



    if (page.requestFullscreen) {


        page.requestFullscreen();


    }



}






/* =====================================================
        LOAD QUESTION
===================================================== */


function loadQuestion() {

    selectedAnswer = null;


    let q = questions[currentQuestion];


    if (!q) {
        finishExam();
        return;
    }


    document
        .getElementById("questionNo")
        .innerText = currentQuestion + 1;



    document
        .getElementById("questionText")
        .innerText = q.question;



    let optionBox =
        document.getElementById("options");


    optionBox.innerHTML = "";





    q.options.forEach((option, index) => {



        let div =

            document.createElement("div");




        div.className = "option";




        div.innerHTML =

            `

        <span>
        ${String.fromCharCode(65 + index)}
        </span>

        ${option}

        `;




        div.onclick = () => {


            selectAnswer(
                index,
                div
            );


        };



        optionBox.appendChild(div);



    });




    startQuestionTimer();



    updateProgress();



}







/* =====================================================
        SELECT ANSWER
===================================================== */


let selectedAnswer = null;



function selectAnswer(index, element) {



    selectedAnswer = index;




    document
        .querySelectorAll(".option")
        .forEach(opt => {


            opt.classList.remove(
                "selected"
            );


        });




    element.classList.add(
        "selected"
    );



}








/* =====================================================
        QUESTION TIMER
===================================================== */


let questionTime = 20;


let questionTimer;

let totalSeconds = 600;
let masterTimer;


function startQuestionTimer() {



    clearInterval(questionTimer);



    questionTime = 20;



    document
        .getElementById("questionTimer")
        .innerText =

        questionTime;




    questionTimer =

        setInterval(() => {



            questionTime--;




            document
                .getElementById("questionTimer")
                .innerText =

                questionTime;





            if (questionTime <= 0) {



                clearInterval(questionTimer);



                nextQuestion();



            }



        }, 1000);



}






/* =====================================================
        PROGRESS BAR
===================================================== */


function updateProgress() {



    let progress =
        ((currentQuestion + 1) / questions.length) * 100;



    document
        .getElementById("progressFill")
        .style.width =

        progress + "%";



}

function startMasterTimer() {

    masterTimer = setInterval(() => {

        let min = Math.floor(totalSeconds / 60);

        let sec = totalSeconds % 60;


        document.getElementById("masterTime").innerText =
            `${min}:${sec < 10 ? "0" : ""}${sec}`;


        totalSeconds--;


        if (totalSeconds < 0) {

            clearInterval(masterTimer);

            autoSubmit();

        }


    }, 1000);

}

/* =====================================================
   PREMIUM ONLINE EXAMINATION SYSTEM
   APP.JS
   PART 4 / 6

   ANSWER SYSTEM + SECURITY
===================================================== */





/* =====================================================
        NEXT BUTTON
===================================================== */


document
    .getElementById("nextBtn")
    .addEventListener("click", () => {


        nextQuestion();


    });






/* =====================================================
        NEXT QUESTION FUNCTION
===================================================== */


function nextQuestion() {



    clearInterval(questionTimer);




    // Save Answer

    userAnswers[currentQuestion] =
        selectedAnswer;




    // Check Answer


    if (

        selectedAnswer !== null

        &&

        selectedAnswer ===

        questions[currentQuestion].answer

    ) {


        score++;


    }




    selectedAnswer = null;





    // Next Question



    currentQuestion++;





    if (

        currentQuestion < questions.length

    ) {

        loadQuestion();


    }

    else {


        finishExam();


    }



}






/* =====================================================
        SECURITY SYSTEM
===================================================== */



let warningCount = 0;






function showSecurityWarning(message) {



    warningCount++;




    document
        .getElementById("warningText")
        .innerText =

        message
        +

        "\nWarning : "

        +

        warningCount
        +

        "/3";





    document
        .getElementById("warningPopup")
        .classList
        .remove("hidden");





    setTimeout(() => {


        document
            .getElementById("warningPopup")
            .classList
            .add("hidden");



    }, 2500);





    if (warningCount >= 3) {



        finishExam();



    }



}







/* =====================================================
        TAB SWITCH DETECTION
===================================================== */


document
    .addEventListener(
        "visibilitychange",
        () => {


            if (document.hidden) {


                showSecurityWarning(
                    "Tab switching detected!"
                );


            }



        });







/* =====================================================
        FULLSCREEN EXIT DETECTION
===================================================== */


document
    .addEventListener(
        "fullscreenchange",
        () => {



            if (

                !document.fullscreenElement

                &&

                !document
                    .getElementById("examPage")
                    .classList
                    .contains("hidden")

            ) {



                showSecurityWarning(
                    "Fullscreen exited!"
                );



            }



        });







/* =====================================================
        COPY PASTE BLOCK
===================================================== */


document
    .addEventListener(
        "copy",
        (e) => {


            e.preventDefault();


            showSecurityWarning(
                "Copy is disabled!"
            );


        });





document
    .addEventListener(
        "paste",
        (e) => {


            e.preventDefault();


            showSecurityWarning(
                "Paste is disabled!"
            );


        });






/* =====================================================
        RIGHT CLICK BLOCK
===================================================== */


document
    .addEventListener(
        "contextmenu",
        (e) => {


            e.preventDefault();



        });







/* =====================================================
        KEYBOARD BLOCK
===================================================== */


document
    .addEventListener(
        "keydown",
        (e) => {



            if (
                e.key === "F12" ||
                (
                    e.ctrlKey &&
                    (
                        e.key === "c" ||
                        e.key === "v" ||
                        e.key === "u"
                    )
                )
            ) {
                e.preventDefault();

                showSecurityWarning(
                    "Shortcut disabled!"
                );

            }



        });

/* =====================================================
   PREMIUM ONLINE EXAMINATION SYSTEM
   APP.JS
   PART 5 / 6

   RESULT SYSTEM
===================================================== */





/* =====================================================
        FINISH EXAM
===================================================== */


function finishExam() {

    if (examFinished) return;

    examFinished = true;

    clearInterval(questionTimer);
    clearInterval(masterTimer);


    if (currentStudent) {

        markExamCompleted(
            currentStudent.username
        );

    }



    showPage("resultPage");


    calculateResult();


}






/* =====================================================
        CALCULATE RESULT
===================================================== */


function calculateResult() {



    let total =

        questions.length;



    let percentage =

        (

            score

            /

            total

        )

        *

        100;







    document
        .getElementById("resultStudent")
        .innerText =

        currentStudent.name;






    document
        .getElementById("scoreText")
        .innerText =

        score

        +

        " / "

        +

        total;







    document
        .getElementById("percentage")
        .innerText =

        percentage.toFixed(2)

        +

        "%";







    let status =

        document
            .getElementById("status");





    if (percentage >= 40) {



        status.innerText =
            "PASS";



        status.className = "";



    }

    else {


        status.innerText =
            "FAIL";



        status.className =
            "fail";



    }




}







/* =====================================================
        TIMER COMPLETE SUBMIT
===================================================== */


function autoSubmit() {



    alert(
        "Time Finished! Exam Submitted"
    );



    finishExam();



}







/* =====================================================
        PREVENT BACK BUTTON
===================================================== */


history.pushState(
    null,
    null,
    location.href
);



window.onpopstate = function () {


    history.go(1);


    showSecurityWarning(
        "Back button disabled!"
    );


};

/* =====================================================
   PREMIUM ONLINE EXAMINATION SYSTEM
   APP.JS
   PART 6 / 6 FINAL

   REVIEW + RESET SYSTEM
===================================================== */





/* =====================================================
        REVIEW BUTTON
===================================================== */


document
    .getElementById("reviewBtn")
    .addEventListener("click", () => {


        showPage("reviewPage");


        loadReview();


    });








/* =====================================================
        LOAD ANSWER REVIEW
===================================================== */


function loadReview() {



    let container =

        document
            .getElementById("reviewContainer");



    container.innerHTML = "";





    questions.forEach((q, index) => {



        let userAnswer =

            userAnswers[index];



        let correctAnswer =

            q.answer;





        let div =

            document.createElement("div");



        div.className = "reviewItem";





        let userText =

            userAnswer !== undefined

                &&

                userAnswer !== null

                ?

                q.options[userAnswer]

                :

                "Not Answered";







        div.innerHTML =



            `

        <h3>

        Q${index + 1}. ${q.question}

        </h3>



        <p>

        Your Answer:

        <span class="

        ${userAnswer == null
                ?
                ""
                :
                userAnswer === correctAnswer
                    ?
                    "correctAnswer"
                    :
                    "wrongAnswer"
            }
        ">

        ${userText}

        </span>

        </p>




        <p>

        Correct Answer:

        <span class="correctAnswer">

        ${q.options[correctAnswer]}

        </span>

        </p>


        `;





        container.appendChild(div);



    });



}








/* =====================================================
        CLOSE REVIEW
===================================================== */


document
    .getElementById("closeReview")
    .addEventListener("click", () => {


        showPage("resultPage");


    });








/* =====================================================
        FINISH BUTTON
===================================================== */


document
    .getElementById("finishBtn")
    .addEventListener("click", () => {


        resetExam();


    });








/* =====================================================
        RESET SYSTEM
===================================================== */


function resetExam() {



    currentStudent = null;


    currentSet = null;


    currentQuestion = 0;


    userAnswers = [];


    score = 0;



    warningCount = 0;





    document
        .getElementById("username")
        .value = "";



    document
        .getElementById("password")
        .value = "";





    if (document.fullscreenElement) {


        document
            .exitFullscreen();


    }





    showPage("loginPage");



}








/* =====================================================
        SECURITY CLEANUP
===================================================== */


window.addEventListener(
    "beforeunload",
    (e) => {



        if (

            !document
                .getElementById("examPage")
                .classList
                .contains("hidden")

        ) {



            e.preventDefault();


            e.returnValue = "";


        }



    });





/* =====================================================
        SYSTEM READY
===================================================== */


console.log(
    "Premium Exam System Loaded Successfully"
);

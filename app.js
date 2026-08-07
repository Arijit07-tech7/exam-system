/* =====================================================
PREMIUM FUTURE EXAM SYSTEM

APP.JS
PART 1 / 6

DATABASE + SETTINGS + GLOBAL SYSTEM

NO FIREBASE
PURE JAVASCRIPT

===================================================== */


/* ===============================
USER DATABASE
================================ */


const users = [

{
    id:"AR001",
    username:"arijit",
    password:"arijit123",
    name:"Arijit Gupta",
    set:"A",
    unlimited:true,
    loginLimit:999999,
    loginCount:0,
    active:true
},

{
    id:"AL001",
    username:"alok",
    password:"alok007",
    name:"Alok",
    set:"B",
    unlimited:false,
    loginLimit:2,
    loginCount:1,
    active:true
},

{
    id:"AN001",
    username:"ananya",
    password:"ananya018",
    name:"Ananya",
    set:"C",
    unlimited:false,
    loginLimit:2,
    loginCount:1,
    active:true
},

{
    id:"SU001",
    username:"souhadri",
    password:"souhadri045",
    name:"Souhadri",
    set:"D",
    unlimited:false,
    loginLimit:2,
    loginCount:1,
    active:true
}

];





/* ===============================
EXAM SETTINGS
================================ */


const EXAM_SETTINGS = {


    TOTAL_TIME: 600,       // 10 Minutes

    QUESTION_TIME: 20,     // 20 Seconds

    PASS_MARK: 40,


    ENABLE_FULLSCREEN: true,

    BLOCK_COPY: true,

    BLOCK_KEYBOARD: true,

    BLOCK_RIGHT_CLICK: true,

    CANCEL_ON_TAB: true,

    CANCEL_ON_FOCUS_LOST: true


};







/* ===============================
GLOBAL VARIABLES
================================ */


/* USER */

let currentStudent = null;



/* QUESTIONS */

let questions = [];

let currentQuestion = 0;

let selectedAnswer = null;

let userAnswers = [];

let score = 0;



/* EXAM STATUS */


let examStarted = false;

let examFinished = false;



/* TIMER */


let masterTimer = null;

let questionTimer = null;


let totalSeconds =
    EXAM_SETTINGS.TOTAL_TIME;


let questionSeconds =
    EXAM_SETTINGS.QUESTION_TIME;




/* RESULT */


let resultSaved = false;



/* SECURITY */


let securityActive = false;




/* ===============================
LOCAL STORAGE KEYS
================================ */


const STORAGE = {


    USER: "current_exam_user",


    RESULT: "exam_results",


    ATTEMPT: "exam_attempt_"


};








/* ===============================
PAGE SYSTEM
================================ */


function showPage(pageId) {


    document
        .querySelectorAll(".page")
        .forEach(page => {


            page.classList.remove(
                "active"
            );


            page.classList.add(
                "hidden"
            );


        });



    const page =
        document.getElementById(pageId);



    if (page) {


        page.classList.remove(
            "hidden"
        );


        page.classList.add(
            "active"
        );


    }


}









/* ===============================
LOCAL STORAGE
================================ */


function saveData(key, value) {


    localStorage.setItem(

        key,

        JSON.stringify(value)

    );


}




function getData(key) {


    const data =
        localStorage.getItem(key);



    if (!data)
        return null;



    try {


        return JSON.parse(data);


    }

    catch {


        return null;

    }


}









/* ===============================
ATTEMPT SYSTEM
================================ */


function getAttempt(username) {


    return Number(

        localStorage.getItem(

            STORAGE.ATTEMPT + username

        )

        ||

        0

    );


}




function increaseAttempt(username) {


    let count =
        getAttempt(username);



    count++;



    localStorage.setItem(

        STORAGE.ATTEMPT + username,

        count

    );


}

function getLoginCount(username) {
    return Number(
        localStorage.getItem(
            STORAGE.LOGIN + username
        ) || 0
    );
}

function increaseLoginCount(username) {
    const count = getLoginCount(username) + 1;

    localStorage.setItem(
        STORAGE.LOGIN + username,
        count
    );
}








/* ===============================
RESET EXAM DATA
================================ */


function resetExamData() {


    questions = [];

    currentQuestion = 0;

    selectedAnswer = null;

    userAnswers = [];

    score = 0;



    examStarted = false;

    examFinished = false;



    totalSeconds =
        EXAM_SETTINGS.TOTAL_TIME;


    questionSeconds =
        EXAM_SETTINGS.QUESTION_TIME;


    resultSaved = false;


}








/* ===============================
WINDOW LOAD
================================ */


window.addEventListener(
    "load",
    () => {


        const loader =
            document.getElementById(
                "loadingScreen"
            );



        if (loader) {


            setTimeout(() => {


                loader.style.display =
                    "none";


            }, 1200);


        }



        showPage(
            "loginPage"
        );



        console.log(
            "SYSTEM LOADED"
        );


    });









console.log(
    "================================="
);


console.log(
    "PART 1 / 6 READY"
);


console.log(
    "NO FIREBASE"
);


console.log(
    "DATABASE READY"
);


console.log(
    "GLOBAL SYSTEM READY"
);


console.log(
    "================================="
);

/* =====================================================
PREMIUM FUTURE EXAM SYSTEM

APP.JS
PART 2 / 6

LOGIN SYSTEM + SESSION MANAGEMENT

NO FIREBASE
PURE JAVASCRIPT

===================================================== */



/* ===============================
LOGIN BUTTON
================================ */


const loginBtn =
    document.getElementById("loginBtn");



if (loginBtn) {


    loginBtn.addEventListener(
        "click",
        loginStudent
    );


}








/* ===============================
LOGIN FUNCTION
================================ */


function loginStudent() {



    const usernameInput =
        document.getElementById(
            "username"
        );


    const passwordInput =
        document.getElementById(
            "password"
        );



    if (!usernameInput || !passwordInput) {

        console.error(
            "Login input missing"
        );

        return;

    }





    const username =
        usernameInput.value
            .trim()
            .toLowerCase();



    const password =
        passwordInput.value
            .trim();





    if (
        username === "" ||
        password === ""
    ) {


        alert(
            "Enter Username and Password"
        );


        return;


    }







    const student =
        users.find(user =>


            user.username === username &&

            user.password === password &&

            user.active === true


        );






    if (!student) {


        alert(
            "Invalid Username or Password"
        );


        return;


    }

    const loginCount = getLoginCount(student.username);

    if (
        !student.unlimited &&
        loginCount >= student.loginLimit
    ) {
        alert("Login limit exceeded!");
        return;
    }

    increaseLoginCount(student.username);







    /* ===============================
    ATTEMPT CHECK
    ================================= */


    const attempt =
        getAttempt(
            student.username
        );




    if (
        !student.unlimited &&
        attempt >= 1
    ) {


        alert(
            "You have already attempted this examination."
        );


        return;


    }







    /* ===============================
    SAVE CURRENT USER
    ================================= */


    currentStudent = student;



    saveData(

        STORAGE.USER,

        student

    );







    /* ===============================
    UPDATE STUDENT INFO
    ================================= */



    const studentName =
        document.getElementById(
            "studentName"
        );



    if (studentName) {


        studentName.innerText =
            student.name;


    }







    const studentSet =
        document.getElementById(
            "studentSet"
        );



    if (studentSet) {


        studentSet.innerText =
            "Question Set : "
            +
            student.set;


    }








    const examStudent =
        document.getElementById(
            "examStudent"
        );



    if (examStudent) {


        examStudent.innerText =
            student.name;


    }







    console.log(
        "LOGIN SUCCESS",
        student
    );




    showPage(
        "instructionPage"
    );



}









/* ===============================
SESSION RESTORE
================================ */


window.addEventListener(
    "load",
    () => {


        const savedUser =
            getData(
                STORAGE.USER
            );



        if (savedUser) {


            currentStudent =
                savedUser;



            console.log(
                "SESSION RESTORED",
                savedUser
            );


        }



    });









/* ===============================
CLEAR SESSION
================================ */


function clearSession() {


    currentStudent = null;



    localStorage.removeItem(

        STORAGE.USER

    );


}









/* ===============================
LOGOUT FUNCTION

(REAL LOGOUT PART IN PART 6)

================================ */


function basicLogout() {


    clearSession();


    resetExamData();



    showPage(
        "loginPage"
    );


}








console.log(
    "================================="
);


console.log(
    "PART 2 / 6 READY"
);


console.log(
    "LOGIN SYSTEM READY"
);


console.log(
    "SESSION SYSTEM READY"
);


console.log(
    "ATTEMPT CONTROL READY"
);


console.log(
    "================================="
);

/* =====================================================
PREMIUM FUTURE EXAM SYSTEM

APP.JS
PART 3 / 6

QUESTION DATABASE + SET LOADER

NO FIREBASE
PURE JAVASCRIPT

===================================================== */


/* ===============================
QUESTION DATABASE

প্রতিটি SET এ পরে 30টা করে question বসানো যাবে।
এখন sample 5টা করে রাখা হলো।

================================ */


const questionSets = {



    A: [

        {
            question: "A navigation bar stays fixed at the top, but anchor links hide section headings behind it. Which CSS property fixes this without JavaScript?",

            options: [
                "scroll-behavior:smooth;",
                "scroll-margin-top:80px;",
                "margin-top:-80px;",
                "position:sticky;"
            ],

            answer: 1

        },


        {
            question: "A search input filters 50,000 items on every keystroke causing lag. What optimization should be applied?",

            options: [
                "Use debounce so filtering runs after user stops typing.",
                "Replace JavaScript with CSS selectors.",
                "Convert array into JSON string.",
                "Reload the page after every keypress."
            ],

            answer: 0

        },


        {
            question: "What is the fundamental difference between null and undefined in JavaScript?",

            options: [
                "undefined means missing/unassigned value, while null is intentional absence of value.",
                "null is undefined type and undefined is object type.",
                "undefined causes fatal error while null skips execution.",
                "null is only for numbers."
            ],

            answer: 0

        },


        {
            question: "What will be the output of this JavaScript code?\n\nfor(var i=0;i<3;i++){ setTimeout(()=>console.log(i),1000); }",

            options: [
                "0,1,2",
                "3,3,3",
                "undefined,undefined,undefined",
                "0,0,0"
            ],

            answer: 1

        },


        {
            question: "How does the Event Loop prioritize Microtasks and Macrotasks?",

            options: [
                "Both execute in parallel.",
                "Microtask queue is completed before the next Macrotask runs.",
                "Macrotasks always execute first.",
                "Microtasks run only on user interaction."
            ],

            answer: 1

        },


        {
            question: "A user submits <script>stealCookies()</script> in a comment box and it executes for other users. What vulnerability is this?",

            options: [
                "CSRF",
                "Stored XSS",
                "SQL Injection",
                "SSRH"
            ],

            answer: 1

        },


        {
            question: "What is the main purpose of Web Components (Shadow DOM, Custom Elements, HTML Templates)?",

            options: [
                "Create reusable encapsulated HTML components with isolated styles.",
                "Replace JavaScript libraries with C++.",
                "Run only on backend servers.",
                "Compile HTML using WebAssembly."
            ],

            answer: 0

        },


        {
            question: "Which technology works as a programmable browser proxy for offline PWA caching?",

            options: [
                "Service Worker",
                "Web Socket Engine",
                "LocalStorage Pipeline",
                "Web Worker Threads"
            ],

            answer: 0

        },


        {
            question: "When does the browser start downloading an image created using new Image() and assigned src?",

            options: [
                "As soon as img.src is assigned.",
                "Only after adding image to DOM.",
                "When user scrolls to image.",
                "After window load event."
            ],

            answer: 0

        },


        {
            question: "What is the difference between innerHTML and textContent?",

            options: [
                "innerHTML parses HTML markup while textContent treats content as plain text.",
                "textContent creates CSS reflow while innerHTML runs silently.",
                "innerHTML works only on p tags.",
                "Both are identical."
            ],

            answer: 0

        }

    ],



    B: [

        {
            questionNumber: 1,

            question: "What happens when a user types a URL using HTTPS into a web browser?",

            options: [
                "TCP Handshake → DNS Lookup → TLS Handshake → HTTP Request",
                "DNS Lookup → TCP Handshake → TLS Handshake → HTTP Request",
                "TLS Handshake → DNS Lookup → TCP Handshake → HTTP Request",
                "DNS Lookup → TLS Handshake → TCP Handshake → HTTP Request"
            ],

            answer: 1

        },

        {
            questionNumber: 2,

            question: "Which HTTP version introduced multiplexing over a single TCP connection?",

            options: [
                "HTTP/1.0",
                "HTTP/1.1",
                "HTTP/2",
                "HTTP/3"
            ],

            answer: 2

        },

        {
            questionNumber: 3,

            question: "Who enforces Cross-Origin Resource Sharing (CORS) rules?",

            options: [
                "The DNS server",
                "The User's Web Browser",
                "The Origin Server",
                "The Database Engine"
            ],

            answer: 1

        },

        {
            questionNumber: 4,

            question: "Which storage mechanism automatically sends its content with every HTTP request to its matching domain?",

            options: [
                "LocalStorage",
                "SessionStorage",
                "Cookies",
                "IndexedDB"
            ],

            answer: 2

        },

        {
            questionNumber: 5,

            question: "In JavaScript's Event Loop, which queue takes precedence for execution when the Call Stack empties?",

            options: [
                "Macrotask Queue",
                "Microtask Queue",
                "Rendering Queue",
                "Callback Queue"
            ],

            answer: 1

        },

        {
            questionNumber: 6,

            question: "Which sequence accurately reflects the Critical Rendering Path order?",

            options: [
                "Render Tree → DOM → CSSOM → Paint → Layout",
                "DOM → CSSOM → Render Tree → Layout → Paint",
                "CSSOM → DOM → Layout → Render Tree → Paint",
                "DOM → Layout → CSSOM → Render Tree → Paint"
            ],

            answer: 1

        },

        {
            questionNumber: 7,

            question: "What is the primary operational difference between Debouncing and Throttling?",

            options: [
                "Debounce delays execution until a quiet pause; Throttle enforces a fixed maximum execution frequency.",
                "Throttle delays execution until a quiet pause; Debounce enforces a fixed maximum execution frequency.",
                "Debounce runs asynchronously; Throttle runs synchronously.",
                "Debounce only works with mouse events; Throttle only works with keyboard events."
            ],

            answer: 0

        },

        {
            questionNumber: 8,

            question: "Which HTTP Response Header directly prevents Cross-Site Scripting (XSS) by restricting where scripts can be loaded from?",

            options: [
                "Access-Control-Allow-Origin",
                "Strict-Transport-Security",
                "Content-Security-Policy",
                "X-Frame-Options"
            ],

            answer: 2

        },

        {
            questionNumber: 9,

            question: "What makes an HTTP method idempotent?",

            options: [
                "Calling it multiple times produces different results every time.",
                "Calling it once or multiple times leaves the server in the exact same state.",
                "It executes faster than non-idempotent methods.",
                "It does not require headers or request payloads."
            ],

            answer: 1

        },

        {
            questionNumber: 10,

            question: "What key architectural advantage does GraphQL have over standard REST endpoints?",

            options: [
                "Automatic database indexing",
                "Elimination of client-side JavaScript",
                "Precise client-driven data fetching (prevents over/under-fetching)",
                "Built-in transport-layer encryption"
            ],

            answer: 2

        },

        {
            questionNumber: 11,

            question: "According to the CAP Theorem, what happens when a network partition (P) occurs in a distributed database?",

            options: [
                "You achieve both full Consistency (C) and Availability (A).",
                "The system must choose between Consistency (C) OR Availability (A).",
                "Network partitions only affect vertical scaling.",
                "Partition tolerance can be disabled to keep C and A."
            ],

            answer: 1

        },

        {
            questionNumber: 12,

            question: "What distinguishes a Reverse Proxy from a Forward Proxy?",

            options: [
                "Forward proxies protect servers; Reverse proxies protect clients.",
                "Forward proxies sit in front of clients; Reverse proxies sit in front of servers.",
                "Forward proxies handle SSL termination; Reverse proxies handle DNS resolving.",
                "Reverse proxies cannot perform load balancing."
            ],

            answer: 1

        },

        {
            questionNumber: 13,

            question: "Which index data structure is most commonly used by Relational Databases (RDBMS) for O(logN) lookups?",

            options: [
                "Hash Map",
                "B Tree / B+ Tree",
                "Linked List",
                "Binary Search Tree"
            ],

            answer: 1

        },

        {
            questionNumber: 14,

            question: "What is the main operational risk of using a Write-Back (Write-Behind) caching strategy?",

            options: [
                "Extremely high write latency.",
                "High database load during reads.",
                "Potential data loss if the cache crashes before flushing to disk.",
                "Automatic deletion of database indexes."
            ],

            answer: 2

        },

        {
            questionNumber: 15,

            question: "In microservices, what is the main function of the Circuit Breaker pattern?",

            options: [
                "To encrypt communication between services using TLS.",
                "To temporarily stop sending traffic to a failing service to prevent cascading failures.",
                "To compress network payloads automatically.",
                "To balance CPU load evenly among healthy instances."
            ],

            answer: 1

        },

        {
            questionNumber: 16,

            question: "Database Denormalization is primarily used to:",

            options: [
                "Eliminate all redundant data from tables.",
                "Reduce JOIN operations and improve read performance.",
                "Ensure 3rd Normal Form (3NF) compliance.",
                "Prevent SQL injection attacks."
            ],

            answer: 1

        },

        {
            questionNumber: 17,

            question: "How does Horizontal Scaling differ from Vertical Scaling?",

            options: [
                "Horizontal scaling adds more hardware (CPU/RAM) to a single machine.",
                "Horizontal scaling adds more machine nodes to a system pool.",
                "Vertical scaling eliminates single points of failure automatically.",
                "Vertical scaling is infinitely scalable without physical limits."
            ],

            answer: 1

        },

        {
            questionNumber: 18,

            question: "What is the fundamental security challenge with using stateless JWTs for session management?",

            options: [
                "They cannot be signed digitally.",
                "They require a database lookup on every request.",
                "They are difficult to instantly revoke before their expiration time without maintaining state.",
                "They only work over HTTP/1.0 protocols."
            ],

            answer: 2

        },

        {
            questionNumber: 19,

            question: "What is a primary benefit of using a Database Connection Pool?",

            options: [
                "It automatically converts NoSQL data into SQL format.",
                "It reuses established connections, saving time and overhead on TCP/TLS handshakes.",
                "It encrypts stored disk data automatically.",
                "It removes the need for database indexing."
            ],

            answer: 1

        },

        {
            questionNumber: 20,

            question: "What is an advantage of Server-Side Rendering (SSR) over Client-Side Rendering (CSR)?",

            options: [
                "Zero load on the application server.",
                "Faster Initial Page Load / First Contentful Paint and better default SEO indexing.",
                "Complete decoupling of client and server codebases.",
                "Immunity to XSS vulnerabilities."
            ],

            answer: 1

        },

        {
            questionNumber: 21,

            question: "In SOLID design principles, what does the Liskov Substitution Principle (LSP) dictate?",

            options: [
                "Modules should be open for modification, closed for extension.",
                "Subclasses should be replaceable for their base classes without altering program correctness.",
                "Interfaces must contain as many methods as possible.",
                "High-level modules must depend directly on concrete low-level implementations."
            ],

            answer: 1

        },

        {
            questionNumber: 22,

            question: "Which memory area is shared among all threads running within the same parent OS process?",

            options: [
                "Call Stack",
                "Register Set",
                "Program Counter",
                "Process Heap"
            ],

            answer: 3

        },

        {
            questionNumber: 23,

            question: "Which of the following is NOT one of the four necessary Coffman conditions for a system Deadlock?",

            options: [
                "Mutual Exclusion",
                "Hold and Wait",
                "Preemption Allowed",
                "Circular Wait"
            ],

            answer: 2

        },

        {
            questionNumber: 24,

            question: "How does git rebase differ from git merge?",

            options: [
                "git rebase creates a new merge commit preserving exact history branch lines.",
                "git rebase rewrites commit history by moving branch commits onto a new base commit.",
                "git merge deletes the feature branch automatically.",
                "git rebase cannot resolve merge conflicts."
            ],

            answer: 1

        },

        {
            questionNumber: 25,

            question: "What distinguishes Integration Testing from Unit Testing?",

            options: [
                "Integration tests mock all database and network interactions.",
                "Unit tests verify system user workflows end-to-end in a real browser environment.",
                "Integration tests verify interactions between combined modules or external dependencies.",
                "Unit tests run slower than integration tests."
            ],

            answer: 2

        },

        {
            questionNumber: 26,

            question: "In Object-Oriented Design, Dependency Inversion Principle (DIP) encourages:",

            options: [
                "Direct instantiations of concrete classes inside high-level business code.",
                "High-level and low-level modules depending on shared abstractions (interfaces).",
                "Avoiding interfaces altogether to keep code simple.",
                "Coupling code tightly to specific hardware implementations."
            ],

            answer: 1

        },

        {
            questionNumber: 27,

            question: "What happens during a Process Context Switch in an Operating System?",

            options: [
                "The OS compiles source code into machine binary.",
                "The CPU state (registers, program counter, stack pointer) of a running process is saved and another process state is restored.",
                "The process memory is cleared completely from disk.",
                "All running threads are terminated permanently."
            ],

            answer: 1

        },

        {
            questionNumber: 28,

            question: "What is a Closure in JavaScript?",

            options: [
                "A method that closes a database connection automatically.",
                "A function bundled with references to its surrounding lexical scope.",
                "A syntax feature used to block global variable creation.",
                "An asynchronous event loop handler."
            ],

            answer: 1

        },

        {
            questionNumber: 29,

            question: "Which testing strategy verifies user journeys end-to-end across the full deployed software stack?",

            options: [
                "Unit Testing",
                "Static Code Analysis",
                "End-to-End (E2E) Testing",
                "Mutation Testing"
            ],

            answer: 2

        },

        {
            questionNumber: 30,

            question: "What is the fundamental difference between Authentication and Authorization?",

            options: [
                "Authentication checks permissions; Authorization verifies identity.",
                "Authentication verifies user identity; Authorization verifies user access permissions.",
                "Authentication applies only to databases; Authorization applies only to frontend UI.",
                "They are identical terms for user login processes."
            ],

            answer: 1

        }

    ],






    C: [

        {
            questionNumber: 1,

            question: "What does HTML stand for?",

            options: [
                "Hyper Text Markup Language",
                "High Text Markup Language",
                "Hyperlinks and Text Markup Language",
                "Home Tool Markup Language"
            ],

            answer: 0

        },

        {
            questionNumber: 2,

            question: "Which CSS property is used to change the text color of an element?",

            options: [
                "text-color",
                "fgcolor",
                "color",
                "font-color"
            ],

            answer: 2

        },

        {
            questionNumber: 3,

            question: "Which HTTP status code indicates a 'Not Found' error?",

            options: [
                "200",
                "301",
                "404",
                "500"
            ],

            answer: 2

        },

        {
            questionNumber: 4,

            question: "Which JavaScript method is used to select an HTML element by its ID?",

            options: [
                "document.querySelectorID()",
                "document.getElementById()",
                "document.getElementByName()",
                "document.findId()"
            ],

            answer: 1

        },

        {
            questionNumber: 5,

            question: "How do you apply flexbox to a container element in CSS?",

            options: [
                "display: grid;",
                "display: flexbox;",
                "display: flex;",
                "flex-direction: row;"
            ],

            answer: 2

        },

        {
            questionNumber: 6,

            question: "Which HTML tag is used to embed a JavaScript file in an HTML document?",

            options: [
                "<script>",
                "<javascript>",
                "<js>",
                "<link>"
            ],

            answer: 0

        },

        {
            questionNumber: 7,

            question: "What is the output of typeof [] in JavaScript?",

            options: [
                "array",
                "object",
                "null",
                "undefined"
            ],

            answer: 1

        },

        {
            questionNumber: 8,

            question: "Which CSS unit is relative to the root (<html>) font size?",

            options: [
                "em",
                "vh",
                "rem",
                "px"
            ],

            answer: 2

        },

        {
            questionNumber: 9,

            question: "What is the main function of the HTML <meta name=\"viewport\"> tag?",

            options: [
                "To set the web page title",
                "To ensure proper responsive scaling on mobile devices",
                "To load external CSS styles",
                "To optimize web pages for search engines"
            ],

            answer: 1

        },

        {
            questionNumber: 10,

            question: "Which array method creates a new array populated with the results of calling a provided function on every element?",

            options: [
                "forEach()",
                "filter()",
                "map()",
                "reduce()"
            ],

            answer: 2

        },

        {
            questionNumber: 11,

            question: "What is the purpose of the z-index property in CSS?",

            options: [
                "To specify zoom level",
                "To set horizontal position",
                "To control stacking order of overlapping elements",
                "To adjust element transparency"
            ],

            answer: 2

        },

        {
            questionNumber: 12,

            question: "Which keyword is used to declare block-scoped, re-assignable variables in modern JavaScript?",

            options: [
                "var",
                "let",
                "const",
                "static"
            ],

            answer: 1

        },

        {
            questionNumber: 13,

            question: "In RESTful API design, which HTTP method is typically used to create a new resource?",

            options: [
                "GET",
                "PUT",
                "POST",
                "DELETE"
            ],

            answer: 2

        },

        {
            questionNumber: 14,

            question: "What does CORS stand for in web development?",

            options: [
                "Cross-Origin Resource Sharing",
                "Client-Origin Routing System",
                "Centralized Object Request Service",
                "Cross-Object Security System"
            ],

            answer: 0

        },

        {
            questionNumber: 15,

            question: "Which CSS layout model is specifically designed for two-dimensional (rows and columns) layouts?",

            options: [
                "Flexbox",
                "CSS Grid",
                "Float",
                "Positioning"
            ],

            answer: 1

        },

        {
            questionNumber: 16,

            question: "Which header file is required for using printf() and scanf() in C?",

            options: [
                "<stdlib.h>",
                "<string.h>",
                "<stdio.h>",
                "<conio.h>"
            ],

            answer: 2

        },

        {
            questionNumber: 17,

            question: "What is the correct size of an int data type in standard modern C compilers?",

            options: [
                "1 byte",
                "2 bytes",
                "4 bytes",
                "8 bytes"
            ],

            answer: 2

        },

        {
            questionNumber: 18,

            question: "Which operator is used to get the address of a variable in C?",

            options: [
                "*",
                "&",
                "->",
                "%"
            ],

            answer: 1

        },

        {
            questionNumber: 19,

            question: "What will be the output of 5 / 2 using integer division in C?",

            options: [
                "2.5",
                "2",
                "2.0",
                "3"
            ],

            answer: 1

        },

        {
            questionNumber: 20,

            question: "Which loop is guaranteed to execute at least once?",

            options: [
                "for loop",
                "while loop",
                "do-while loop",
                "None of the above"
            ],

            answer: 2

        },

        {
            questionNumber: 21,

            question: "What does a pointer variable store?",

            options: [
                "Value of another variable",
                "Address of another variable",
                "Data type of a variable",
                "Function body"
            ],

            answer: 1

        },

        {
            questionNumber: 22,

            question: "Which function is used to dynamically allocate memory in C?",

            options: [
                "alloc()",
                "malloc()",
                "new",
                "create()"
            ],

            answer: 1

        },

        {
            questionNumber: 23,

            question: "What character marks the end of a string in C?",

            options: [
                "\\n",
                "\\0",
                "\\t",
                "EOF"
            ],

            answer: 1

        },

        {
            questionNumber: 24,

            question: "What keyword is used to prevent a variable's value from being modified after initialization?",

            options: [
                "static",
                "volatile",
                "const",
                "extern"
            ],

            answer: 2

        },

        {
            questionNumber: 25,

            question: "Which specifier is used with printf() to print a string?",

            options: [
                "%c",
                "%d",
                "%s",
                "%f"
            ],

            answer: 2

        },

        {
            questionNumber: 26,

            question: "What happens if you try to access an array element out of its bounds in C?",

            options: [
                "Dynamic array expansion occurs",
                "Undefined behavior occurs",
                "Compiler throws a syntax error",
                "Program terminates with a default error message"
            ],

            answer: 1

        },

        {
            questionNumber: 27,

            question: "What is the default return type of a C function if not explicitly specified (in traditional C compilers)?",

            options: [
                "void",
                "int",
                "float",
                "char"
            ],

            answer: 1

        },

        {
            questionNumber: 28,

            question: "Which function is used to release dynamically allocated memory?",

            options: [
                "delete()",
                "remove()",
                "free()",
                "dealloc()"
            ],

            answer: 2

        },

        {
            questionNumber: 29,

            question: "What is the result of the expression 10 % 3 in C?",

            options: [
                "3",
                "1",
                "0.33",
                "3.33"
            ],

            answer: 1

        },

        {
            questionNumber: 30,

            question: "Which keyword is used to access members of a structure through a structure pointer?",

            options: [
                ".",
                "->",
                "::",
                "*"
            ],

            answer: 1

        }

    ],

    D: [

        {
            questionNumber: 1,
            question: "What does CSS stand for?",
            options: [
                "Creative Style Sheets",
                "Cascading Style Sheets",
                "Computer Style Sheets",
                "Custom Style Sheets"
            ],
            answer: 1
        },

        {
            questionNumber: 2,
            question: "Which HTML5 tag is used for self-contained, independent content like blog posts or news articles?",
            options: [
                "<section>",
                "<article>",
                "<div>",
                "<main>"
            ],
            answer: 1
        },

        {
            questionNumber: 3,
            question: "What is the default value of the position property in CSS?",
            options: [
                "relative",
                "absolute",
                "static",
                "fixed"
            ],
            answer: 2
        },

        {
            questionNumber: 4,
            question: "Which JavaScript method converts a JSON string into a JavaScript object?",
            options: [
                "JSON.stringify()",
                "JSON.parse()",
                "JSON.toObject()",
                "JSON.convert()"
            ],
            answer: 1
        },

        {
            questionNumber: 5,
            question: "What does the box-sizing: border-box; CSS rule do?",
            options: [
                "Adds a border around every element automatically",
                "Includes padding and border in the element's total width and height",
                "Excludes margin and padding from height calculation",
                "Forces elements into a flex container"
            ],
            answer: 1
        },

        {
            questionNumber: 6,
            question: "Which HTTP status code indicates a successful request?",
            options: [
                "200 OK",
                "201 Created",
                "302 Found",
                "400 Bad Request"
            ],
            answer: 0
        },

        {
            questionNumber: 7,
            question: "In JavaScript, which operator checks for both value and type equality?",
            options: [
                "==",
                "=",
                "===",
                "!=="
            ],
            answer: 2
        },

        {
            questionNumber: 8,
            question: "What is the purpose of the alt attribute on an <img> tag?",
            options: [
                "Specifies an alternate image URL",
                "Provides text for screen readers or when the image fails to load",
                "Sets the image title tooltip",
                "Defines the alignment of the image"
            ],
            answer: 1
        },

        {
            questionNumber: 9,
            question: "Which mechanism in Web APIs handles asynchronous requests using .then() or async/await?",
            options: [
                "Callbacks",
                "Promises",
                "Events",
                "Closures"
            ],
            answer: 1
        },

        {
            questionNumber: 10,
            question: "Which CSS display value makes an element invisible while keeping its space reserved on the layout?",
            options: [
                "display: none;",
                "visibility: hidden;",
                "opacity: 1;",
                "position: absolute;"
            ],
            answer: 1
        },

        {
            questionNumber: 11,
            question: "What is Event Bubbling in JavaScript?",
            options: [
                "Events propagating from the target element upward through parent elements",
                "Events travelling from the top window down to the target",
                "Multiple events firing simultaneously",
                "An error handling mechanism"
            ],
            answer: 0
        },

        {
            questionNumber: 12,
            question: "Which HTML tag is used to create a dropdown selection list?",
            options: [
                "<input type=\"dropdown\">",
                "<list>",
                "<select>",
                "<option>"
            ],
            answer: 2
        },

        {
            questionNumber: 13,
            question: "What is the main benefit of using a Content Delivery Network (CDN)?",
            options: [
                "It protects against database corruption",
                "It reduces latency by serving static assets from servers closer to the user",
                "It replaces backend server code",
                "It converts CSS code into JavaScript"
            ],
            answer: 1
        },

        {
            questionNumber: 14,
            question: "Which JavaScript array method returns true if at least one element passes a test function?",
            options: [
                "every()",
                "some()",
                "includes()",
                "find()"
            ],
            answer: 1
        },

        {
            questionNumber: 15,
            question: "What does the defer attribute do when loading a JavaScript script in HTML?",
            options: [
                "Blocks HTML parsing until the script is fully downloaded and run",
                "Executes the script immediately, pausing HTML execution",
                "Downloads the script in parallel and executes it only after HTML parsing completes",
                "Prevents the script from executing on mobile devices"
            ],
            answer: 2
        },

        {
            questionNumber: 16,
            question: "What is the output of sizeof(char) in C?",
            options: [
                "1 byte",
                "2 bytes",
                "4 bytes",
                "Compiler dependent"
            ],
            answer: 0
        },

        {
            questionNumber: 17,
            question: "Which keyword is used to create user-defined type aliases in C?",
            options: [
                "alias",
                "typedef",
                "struct",
                "define"
            ],
            answer: 1
        },

        {
            questionNumber: 18,
            question: "What is the correct format specifier for a double in printf()?",
            options: [
                "%d",
                "%f",
                "%lf",
                "%ld"
            ],
            answer: 1
        },

        {
            questionNumber: 19,
            question: "What will happen if you forget a break statement inside a switch case in C?",
            options: [
                "Compiler error",
                "Execution falls through to the subsequent cases",
                "The switch statement exits immediately",
                "Infinite loop"
            ],
            answer: 1
        },

        {
            questionNumber: 20,
            question: "Which standard function in C is used to open a file?",
            options: [
                "open()",
                "fopen()",
                "file_open()",
                "readfile()"
            ],
            answer: 1
        },

        {
            questionNumber: 21,
            question: "What is a wild pointer in C?",
            options: [
                "A pointer initialized to NULL",
                "A pointer pointing to freed memory",
                "An uninitialized pointer pointing to an arbitrary memory address",
                "A pointer to a pointer"
            ],
            answer: 2
        },

        {
            questionNumber: 22,
            question: "What does the static keyword inside a function local variable declaration do?",
            options: [
                "Makes the variable global across all files",
                "Preserves the variable's value across multiple function calls",
                "Prevents the variable from being reassigned",
                "Allocates memory on the heap"
            ],
            answer: 1
        },

        {
            questionNumber: 23,
            question: "Which standard header file contains functions like abs(), exit(), and calloc()?",
            options: [
                "<stdio.h>",
                "<stdlib.h>",
                "<math.h>",
                "<string.h>"
            ],
            answer: 1
        },

        {
            questionNumber: 24,
            question: "What is the key difference between malloc() and calloc()?",
            options: [
                "calloc() initializes allocated memory to zero; malloc() leaves garbage values",
                "malloc() allocates heap memory; calloc() allocates stack memory",
                "calloc() can reallocate memory; malloc() cannot",
                "malloc() takes two arguments; calloc() takes one argument"
            ],
            answer: 0
        },

        {
            questionNumber: 25,
            question: "Which string function is used to concatenate two strings in C?",
            options: [
                "strcpy()",
                "strcmp()",
                "strcat()",
                "strlen()"
            ],
            answer: 2
        },

        {
            questionNumber: 26,
            question: "What is the value of x after: int x = 10; int y = x++; ?",
            options: [
                "x = 10, y = 10",
                "x = 11, y = 10",
                "x = 11, y = 11",
                "x = 10, y = 11"
            ],
            answer: 1
        },

        {
            questionNumber: 27,
            question: "What happens when a macro defined as #define MAX 100 is processed?",
            options: [
                "It is compiled as a constant variable during runtime",
                "The preprocessor replaces all occurrences of MAX with 100 before compilation",
                "It generates a global scope integer variable",
                "Memory is allocated on the stack"
            ],
            answer: 1
        },

        {
            questionNumber: 28,
            question: "Which operator is used to access structure members directly from a structure variable (not a pointer)?",
            options: [
                ".",
                "->",
                "*",
                "&"
            ],
            answer: 0
        },

        {
            questionNumber: 29,
            question: "In a C union, how much memory is allocated?",
            options: [
                "Sum of sizes of all members",
                "Memory equal to the size of the largest member",
                "Always 8 bytes",
                "Depends on compiler alignment"
            ],
            answer: 1
        },

        {
            questionNumber: 30,
            question: "What is the scope of a global variable declared outside all functions without static?",
            options: [
                "Restricted to the block where it's used",
                "File scope only",
                "Entire program across all source files",
                "Function scope"
            ],
            answer: 2
        }

    ]
};





/* ===============================
LOAD STUDENT QUESTION SET
================================ */


function loadStudentQuestionSet() {



    if (!currentStudent) {


        alert(
            "Student not logged in"
        );


        return false;


    }






    questions =
        questionSets[
        currentStudent.set
        ];







    if (
        !questions ||
        questions.length === 0
    ) {


        alert(
            "Question Set Not Found"
        );


        return false;


    }







    console.log(
        "QUESTION SET LOADED"
    );


    console.log(
        "Student:",
        currentStudent.name
    );


    console.log(
        "Set:",
        currentStudent.set
    );


    console.log(
        "Total:",
        questions.length
    );



    return true;


}









/* ===============================
GET CURRENT QUESTION
================================ */


function getCurrentQuestion() {


    return questions[
        currentQuestion
    ];


}









/* ===============================
TOTAL QUESTION
================================ */


function getTotalQuestions() {


    return questions.length;


}








console.log(
    "================================="
);


console.log(
    "PART 3 / 6 READY"
);


console.log(
    "QUESTION DATABASE READY"
);


console.log(
    "SET A B C D READY"
);


console.log(
    "================================="
);

/* =====================================================
PREMIUM FUTURE EXAM SYSTEM

APP.JS
PART 4 / 6

EXAM ENGINE

START EXAM
QUESTION LOAD
OPTION SYSTEM
TIMER
NEXT / PREVIOUS
PROGRESS

NO FIREBASE
PURE JAVASCRIPT

===================================================== */



/* ===============================
START EXAM BUTTON
================================ */


const startExamBtn =
    document.getElementById(
        "startExam"
    );



if (startExamBtn) {


    startExamBtn.onclick = () => {


        const agree =
            document.getElementById(
                "agreeRules"
            );



        if (
            agree &&
            !agree.checked
        ) {


            alert(
                "Please accept instructions first"
            );


            return;


        }



        startExam();


    };


}








/* ===============================
START EXAM
================================ */


function startExam() {



    if (!currentStudent) {


        alert(
            "Please login first"
        );


        return;


    }






    const loaded =
        loadStudentQuestionSet();



    if (!loaded)
        return;







    showPage(
        "examPage"
    );






    currentQuestion = 0;

    selectedAnswer = null;

    userAnswers = [];

    score = 0;


    examStarted = true;

    examFinished = false;



    totalSeconds =
        EXAM_SETTINGS.TOTAL_TIME;



    questionSeconds =
        EXAM_SETTINGS.QUESTION_TIME;







    if (
        EXAM_SETTINGS.ENABLE_FULLSCREEN
    ) {


        if (
            document.documentElement.requestFullscreen
        ) {


            document
                .documentElement
                .requestFullscreen()
                .catch(() => { });


        }


    }







    enableSecurity();




    startMasterTimer();



    loadQuestion();





    console.log(
        "EXAM STARTED"
    );



}









/* ===============================
LOAD QUESTION
================================ */


function loadQuestion() {



    if (examFinished)
        return;





    const q =
        getCurrentQuestion();





    if (!q) {


        finishExam();


        return;


    }







    selectedAnswer = null;






    const qNo =
        document.getElementById(
            "questionNo"
        );



    if (qNo)
        qNo.innerText =
            currentQuestion + 1;







    const total =
        document.getElementById(
            "totalQuestion"
        );



    if (total)
        total.innerText =
            questions.length;








    const qText =
        document.getElementById(
            "questionText"
        );



    if (qText)
        qText.innerText =
            q.question;








    const optionBox =
        document.getElementById(
            "options"
        );



    if (!optionBox)
        return;





    optionBox.innerHTML = "";






    q.options.forEach(
        (option, index) => {



            const div =
                document.createElement(
                    "div"
                );



            div.className =
                "option";




            div.innerHTML = `

        <span class="optionLetter">
        ${String.fromCharCode(65 + index)}
        </span>

        <span>
        ${option}
        </span>

        `;







            div.onclick = () => {


                document
                    .querySelectorAll(
                        ".option"
                    )
                    .forEach(item => {


                        item.classList.remove(
                            "selected"
                        );


                    });




                div.classList.add(
                    "selected"
                );



                selectedAnswer = index;



            };





            optionBox.appendChild(div);



        });








    updateProgress();



    startQuestionTimer();



}









/* ===============================
SAVE ANSWER
================================ */


function saveAnswer() {



    userAnswers[
        currentQuestion
    ] = selectedAnswer;



}









/* ===============================
NEXT BUTTON
================================ */


const nextBtn =
    document.getElementById(
        "nextBtn"
    );



if (nextBtn) {



    nextBtn.onclick = () => {


        saveAnswer();




        if (
            currentQuestion <
            questions.length - 1
        ) {


            currentQuestion++;


            loadQuestion();


        }

        else {


            finishExam();


        }



    };


}









/* ===============================
PREVIOUS BUTTON
================================ */


const previousBtn =
    document.getElementById(
        "previousBtn"
    );



if (previousBtn) {


    previousBtn.onclick = () => {



        if (
            currentQuestion <= 0
        )
            return;





        saveAnswer();




        currentQuestion--;



        loadQuestion();




    };


}









/* ===============================
QUESTION TIMER
================================ */


function startQuestionTimer() {



    clearInterval(
        questionTimer
    );



    questionSeconds =
        EXAM_SETTINGS.QUESTION_TIME;





    const box =
        document.getElementById(
            "questionTime"
        );



    questionTimer =
        setInterval(() => {


            questionSeconds--;



            if (box)
                box.innerText =
                    questionSeconds + "s";





            if (
                questionSeconds <= 0
            ) {


                clearInterval(
                    questionTimer
                );


                saveAnswer();


                if (
                    currentQuestion <
                    questions.length - 1
                ) {


                    currentQuestion++;


                    loadQuestion();


                }

                else {


                    finishExam();


                }



            }



        }, 1000);



}









/* ===============================
MASTER TIMER
================================ */


function startMasterTimer() {



    clearInterval(
        masterTimer
    );



    masterTimer =
        setInterval(() => {


            totalSeconds--;



            const min =
                Math.floor(
                    totalSeconds / 60
                );


            const sec =
                totalSeconds % 60;





            const timer =
                document.getElementById(
                    "masterTime"
                );



            if (timer) {


                timer.innerText =
                    `${min}:${sec
                        .toString()
                        .padStart(2, "0")}`;


            }






            if (
                totalSeconds <= 0
            ) {


                clearInterval(
                    masterTimer
                );


                finishExam();


            }



        }, 1000);



}









/* ===============================
PROGRESS
================================ */


function updateProgress() {



    const bar =
        document.getElementById(
            "progressFill"
        );



    const text =
        document.getElementById(
            "progressText"
        );




    const percent =
        (
            (currentQuestion + 1)
            /
            questions.length
        )
        *
        100;





    if (bar)
        bar.style.width =
            percent + "%";





    if (text)
        text.innerText =
            `${currentQuestion + 1}/${questions.length}`;



}









console.log(
    "================================="
);


console.log(
    "PART 4 / 6 READY"
);


console.log(
    "EXAM ENGINE READY"
);


console.log(
    "TIMER READY"
);


console.log(
    "QUESTION SYSTEM READY"
);


console.log(
    "================================="
);

/* =====================================================
PREMIUM FUTURE EXAM SYSTEM

APP.JS
PART 5 / 6

SECURITY SYSTEM

COPY BLOCK
PASTE BLOCK
RIGHT CLICK BLOCK
KEYBOARD LOCK
TAB SWITCH DETECTION
FULLSCREEN EXIT DETECTION
SCREEN FOCUS PROTECTION

NO FIREBASE
PURE JAVASCRIPT

===================================================== */





/* ===============================
SECURITY STATUS
================================ */


let securityEnabled = false;









/* ===============================
ENABLE SECURITY
================================ */


function enableSecurity() {



    if (securityEnabled)
        return;




    securityEnabled = true;






    /* RIGHT CLICK */

    document.addEventListener(
        "contextmenu",
        blockRightClick
    );







    /* COPY PASTE */

    document.addEventListener(
        "copy",
        blockCopy
    );


    document.addEventListener(
        "paste",
        blockCopy
    );


    document.addEventListener(
        "cut",
        blockCopy
    );







    /* TEXT SELECT */

    document.addEventListener(
        "selectstart",
        blockCopy
    );







    /* KEYBOARD */

    document.addEventListener(
        "keydown",
        blockKeyboard
    );






    console.log(
        "SECURITY ENABLED"
    );


}









/* ===============================
RIGHT CLICK BLOCK
================================ */


function blockRightClick(e) {



    if (
        examStarted &&
        !examFinished
    ) {


        e.preventDefault();


    }


}









/* ===============================
COPY BLOCK
================================ */


function blockCopy(e) {



    if (
        examStarted &&
        !examFinished
    ) {


        e.preventDefault();


    }


}









/* ===============================
KEYBOARD LOCK
================================ */


function blockKeyboard(e) {



    if (
        !examStarted ||
        examFinished
    )
        return;






    const key =
        e.key.toLowerCase();







    const blocked = [


        "f12",

        "f5",

        "f11",

        "tab",

        "escape"


    ];






    if (
        blocked.includes(key)
        ||
        e.ctrlKey
        ||
        e.altKey
        ||
        e.metaKey
    ) {



        e.preventDefault();



        console.log(
            "Blocked:",
            e.key
        );



    }



}









/* ===============================
TAB SWITCH DETECTION
================================ */


document.addEventListener(

    "visibilitychange",

    () => {





        if (

            document.hidden &&

            examStarted &&

            !examFinished

        ) {



            alert(
                "Tab switching detected. Exam cancelled."
            );



            finishExam();



        }





    }

);









/* ===============================
WINDOW FOCUS LOST
================================ */


window.addEventListener(

    "blur",

    () => {



        if (

            examStarted &&

            !examFinished

        ) {



            alert(
                "Focus lost. Exam cancelled."
            );



            finishExam();



        }



    }

);









/* ===============================
FULLSCREEN EXIT
================================ */


document.addEventListener(

    "fullscreenchange",

    () => {





        if (

            examStarted &&

            !examFinished &&

            !document.fullscreenElement

        ) {



            alert(
                "Fullscreen exited. Exam cancelled."
            );



            finishExam();



        }





    }

);









/* ===============================
MOBILE BACK BUTTON BLOCK
================================ */


history.pushState(
    null,
    null,
    location.href
);



window.addEventListener(

    "popstate",

    () => {





        if (

            examStarted &&

            !examFinished

        ) {



            alert(
                "Back button detected. Exam cancelled."
            );



            finishExam();



        }




    }

);









/* ===============================
DISABLE SECURITY
================================ */


function disableSecurity() {



    securityEnabled = false;



    console.log(
        "SECURITY DISABLED"
    );



}









console.log(
    "================================="
);


console.log(
    "PART 5 / 6 READY"
);


console.log(
    "SECURITY SYSTEM READY"
);


console.log(
    "COPY BLOCK READY"
);


console.log(
    "KEYBOARD LOCK READY"
);


console.log(
    "TAB PROTECTION READY"
);


console.log(
    "================================="
);

/* =====================================================
PREMIUM FUTURE EXAM SYSTEM

APP.JS
PART 6 / 6

RESULT SYSTEM
REVIEW ANSWER
LOGOUT
FINAL CLEANUP

NO FIREBASE
PURE JAVASCRIPT

===================================================== */





/* ===============================
FINISH EXAM
================================ */


function finishExam() {



    if (examFinished)
        return;




    examFinished = true;

    examStarted = false;





    clearInterval(
        masterTimer
    );


    clearInterval(
        questionTimer
    );






    saveAnswer();



    calculateScore();



    saveResult();



    disableSecurity();





    showPage(
        "resultPage"
    );



    displayResult();





}









/* ===============================
CALCULATE SCORE
================================ */


function calculateScore() {



    score = 0;





    questions.forEach(

        (q, index) => {





            if (

                userAnswers[index]
                ===
                q.answer

            ) {



                score++;



            }





        }

    );



}









/* ===============================
SAVE RESULT
================================ */


function saveResult() {



    if (resultSaved)
        return;




    if (!currentStudent)
        return;







    let results =

        JSON.parse(

            localStorage.getItem(
                STORAGE.RESULT
            )

        )
        ||
        [];








    const percentage =

        (

            score /

            questions.length

        )
        *
        100;








    const result = {



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
            new Date()
                .toLocaleString()



    };








    results.push(
        result
    );





    localStorage.setItem(

        STORAGE.RESULT,

        JSON.stringify(results)

    );






    increaseAttempt(
        currentStudent.username
    );




    resultSaved = true;



}









/* ===============================
DISPLAY RESULT
================================ */


function displayResult() {





    const percentage =

        (

            score /

            questions.length

        )
        *
        100;








    const student =
        document.getElementById(
            "resultStudent"
        );



    if (student)
        student.innerText =
            currentStudent.name;









    const scoreBox =
        document.getElementById(
            "scoreText"
        );



    if (scoreBox)

        scoreBox.innerText =

            `${score} / ${questions.length}`;










    const percentBox =
        document.getElementById(
            "percentage"
        );



    if (percentBox)

        percentBox.innerText =

            percentage.toFixed(2)
            +
            "%";









    const status =
        document.getElementById(
            "status"
        );



    if (status) {



        if (
            percentage >=
            EXAM_SETTINGS.PASS_MARK
        ) {


            status.innerText =
                "PASS";


        }

        else {


            status.innerText =
                "FAIL";


        }


    }





}









/* ===============================
REVIEW BUTTON
================================ */


const reviewBtn =

    document.getElementById(
        "reviewBtn"
    );





if (reviewBtn) {



    reviewBtn.onclick = () => {



        showPage(
            "reviewPage"
        );



        loadReview();



    };



}









/* ===============================
LOAD REVIEW
================================ */


function loadReview() {



    const box =

        document.getElementById(
            "reviewContainer"
        );




    if (!box)
        return;





    box.innerHTML = "";







    questions.forEach(

        (q, index) => {





            const userAnswer =

                userAnswers[index];







            const card =

                document.createElement(
                    "div"
                );





            card.className =
                "reviewItem";







            card.innerHTML = `



        <h3>

        Q${index + 1}. ${q.question}

        </h3>



        <p>

        Your Answer:

        ${userAnswer !== undefined &&
                    userAnswer !== null

                    ?

                    q.options[userAnswer]

                    :

                    "Not Answered"

                }

        </p>





        <p>

        Correct Answer:

        ${q.options[q.answer]}

        </p>



        `;







            box.appendChild(
                card
            );





        }

    );



}









/* ===============================
CLOSE REVIEW
================================ */


const closeReview =

    document.getElementById(
        "closeReview"
    );




if (closeReview) {



    closeReview.onclick = () => {


        showPage(
            "resultPage"
        );


    };


}









/* ===============================
LOGOUT
================================ */


const finishBtn =

    document.getElementById(
        "finishBtn"
    );




if (finishBtn) {


    finishBtn.onclick =
        logout;


}









function logout() {





    clearInterval(
        masterTimer
    );


    clearInterval(
        questionTimer
    );





    disableSecurity();






    currentStudent = null;


    questions = [];


    userAnswers = [];


    selectedAnswer = null;


    currentQuestion = 0;


    score = 0;




    examStarted = false;


    examFinished = false;


    resultSaved = false;








    localStorage.removeItem(

        STORAGE.USER

    );








    const username =

        document.getElementById(
            "username"
        );



    const password =

        document.getElementById(
            "password"
        );




    if (username)
        username.value = "";



    if (password)
        password.value = "";








    showPage(
        "loginPage"
    );



}









/* ===============================
EXIT FULLSCREEN
================================ */


function exitFullscreen() {



    if (
        document.fullscreenElement
    ) {



        document
            .exitFullscreen()
            .catch(() => { });



    }



}









/* ===============================
FINAL MESSAGE
================================ */


console.log(
    "================================="
);


console.log(
    "PART 6 / 6 COMPLETE"
);


console.log(
    "RESULT SYSTEM READY"
);


console.log(
    "REVIEW SYSTEM READY"
);


console.log(
    "LOGOUT READY"
);


console.log(
    "PREMIUM EXAM SYSTEM COMPLETE"
);


console.log(
    "================================="
);
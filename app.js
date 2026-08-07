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
    loginLimit:3,
    loginCount:0,
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

        question: "In JavaScript, what is the output of [1, 2, 3] + [4, 5, 6]?",

        options: [
            "[1, 2, 3, 4, 5, 6]",
            "\"1,2,34,5,6\"",
            "NaN",
            "TypeError"
        ],

        answer: 1

    },

    {
        questionNumber: 2,

        question: "How does the browser layout engine handle will-change: transform in CSS?",

        options: [
            "Forces immediate synchronous repaint on all child nodes",
            "Creates a new stacking context and hints to promote the element to a composite layer",
            "Disables GPU acceleration to prevent memory leaks",
            "Forces the element to use absolute positioning relative to the viewport"
        ],

        answer: 1

    },

    {
        questionNumber: 3,

        question: "What is the fundamental difference between Promise.all() and Promise.allSettled()?",

        options: [
            "Promise.all() runs sequentially; Promise.allSettled() runs concurrently",
            "Promise.all() short-circuits on the first rejection; Promise.allSettled() waits for all promises to settle regardless of outcome",
            "Promise.allSettled() returns only resolved values; Promise.all() returns rejection reasons",
            "Promise.all() accepts non-iterable objects; Promise.allSettled() requires a map"
        ],

        answer: 1

    },

    {
        questionNumber: 4,

        question: "Which security header prevents a site from being embedded inside an <iframe> to mitigate Clickjacking attacks?",

        options: [
            "Access-Control-Allow-Origin",
            "X-Content-Type-Options",
            "Content-Security-Policy: frame-ancestors 'none'",
            "Strict-Transport-Security"
        ],

        answer: 2

    },

    {
        questionNumber: 5,

        question: "In the Event Loop execution model, in what order are Microtasks, Macrotasks, and Animation Frames executed during a single render cycle?",

        options: [
            "Macrotask → Animation Frames → Microtasks",
            "Microtasks → Macrotask → Animation Frames",
            "Macrotask → All Microtasks → requestAnimationFrame callback → Render",
            "requestAnimationFrame → Microtasks → Macrotask"
        ],

        answer: 2

    },

    {
        questionNumber: 6,

        question: "What is the memory footprint behavior of a JavaScript WeakMap?",

        options: [
            "Keys must be primitive types and are garbage collected automatically",
            "Keys must be objects, held weakly so they don't prevent garbage collection if no other references exist",
            "Values are stored weakly while keys are strongly referenced",
            "WeakMaps can be iterated using for...of loops without affecting GC"
        ],

        answer: 1

    },

    {
        questionNumber: 7,

        question: "What happens when an HTTP cross-origin request triggers a CORS Preflight?",

        options: [
            "The browser issues a GET request with X-Preflight: true",
            "The browser issues an OPTIONS request prior to the main request to verify permissions",
            "The server responds with 307 Temporary Redirect",
            "The browser converts POST to PUT automatically"
        ],

        answer: 1

    },

    {
        questionNumber: 8,

        question: "What is the specificity calculation weight tuple (Inline, ID, Class/Attribute/Pseudo, Element) for '#nav .menu-item:hover a'?",

        options: [
            "(0, 1, 2, 1)",
            "(0, 1, 1, 2)",
            "(0, 2, 1, 1)",
            "(0, 1, 3, 0)"
        ],

        answer: 0

    },

    {
        questionNumber: 9,

        question: "Which JavaScript statement regarding function declarations and hoisting inside a block scope ({ ... }) in strict mode is TRUE?",

        options: [
            "Block-level function declarations are hoisted to the global scope",
            "Block-level function declarations are hoisted to the top of the containing block and scoped to that block",
            "Function declarations inside blocks cause a SyntaxError",
            "Function declarations are not hoisted at all in JavaScript"
        ],

        answer: 1

    },

    {
        questionNumber: 10,

        question: "What is the output of (function() { return typeof arguments; })();",

        options: [
            "\"array\"",
            "\"arguments\"",
            "\"object\"",
            "\"undefined\""
        ],

        answer: 2

    },
    {
        questionNumber: 11,

        question: "What is the primary purpose of an HTTP ETag response header?",

        options: [
            "Encrypting sensitive payload data",
            "Providing a unique identifier for a specific version of a resource for cache validation",
            "Specifying token expiration times for JWT authorization",
            "Enabling cross-site script request validation"
        ],

        answer: 1

    },

    {
        questionNumber: 12,

        question: "What does the CSS property 'contain: layout style paint;' achieve?",

        options: [
            "It disables user interactions on elements outside the viewport",
            "It isolates the element's subtree from the rest of the DOM tree for rendering performance optimizations",
            "It prevents flexbox containers from wrapping content",
            "It enforces strictly relative units inside child components"
        ],

        answer: 1

    },

    {
        questionNumber: 13,

        question: "What is the result of '0.1 + 0.2 === 0.3' in JavaScript?",

        options: [
            "true",
            "false",
            "TypeError",
            "NaN"
        ],

        answer: 1

    },

    {
        questionNumber: 14,

        question: "What occurs during a DOM Reflow (Layout)?",

        options: [
            "Updating color and visibility properties without recalculating geometry",
            "Recalculating the positions and dimensions of render tree elements",
            "Splitting elements into GPU hardware layers",
            "Downloading external fonts and stylesheet assets"
        ],

        answer: 1

    },

    {
        questionNumber: 15,

        question: "In modern Web APIs, what is a Service Worker NOT allowed to access?",

        options: [
            "Cache Storage API",
            "Fetch API requests",
            "Direct DOM elements and the window object",
            "IndexedDB databases"
        ],

        answer: 2

    },

    {
        questionNumber: 16,

        question: "What is the output of the following C code?\n\nint a[5]={10,20,30,40,50};\nint *p=(int*)(&a+1);\nprintf(\"%d\",*(p-1));",

        options: [
            "10",
            "20",
            "50",
            "Undefined Behavior / Segmentation Fault"
        ],

        answer: 2

    },

    {
        questionNumber: 17,

        question: "What does the 'volatile' keyword inform the C compiler?",

        options: [
            "The variable's memory must be allocated on the heap",
            "The variable value can be modified externally, disabling compiler optimizations like register caching",
            "The variable cannot be modified by any function",
            "The variable is automatically thread-safe"
        ],

        answer: 1

    },

    {
        questionNumber: 18,

        question: "What is the result of evaluating sizeof('a') in standard C (not C++)?",

        options: [
            "1",
            "Size of int (typically 4 bytes)",
            "2",
            "Implementation-defined byte size"
        ],

        answer: 1

    },

    {
        questionNumber: 19,

        question: "What potential issue exists in the following C code?\n\nchar *str = \"Hello World\";\nstr[0] = 'h';",

        options: [
            "Syntax error",
            "Undefined behavior (typically Segmentation Fault due to writing to read-only string literal memory)",
            "Memory leak",
            "Dynamic reallocation error"
        ],

        answer: 1

    },

    {
        questionNumber: 20,

        question: "What is Sequence Point violation / Undefined Behavior in the expression 'i = i++ + ++i;'?",

        options: [
            "Modifying a scalar object more than once between successive sequence points",
            "Using integer arithmetic instead of bitwise operations",
            "Assigning an unsigned integer to a signed variable",
            "Invoking an uninitialized function pointer"
        ],

        answer: 0

    },

    {
        questionNumber: 21,

        question: "Given 'struct Node { char a; int b; short c; };', on a standard 32/64-bit alignment architecture (4-byte alignment), what is sizeof(struct Node)?",

        options: [
            "7 bytes",
            "8 bytes",
            "12 bytes",
            "16 bytes"
        ],

        answer: 2

    },

    {
        questionNumber: 22,

        question: "What does the 'restrict' pointer qualifier guarantee to the compiler in C99?",

        options: [
            "The pointer cannot be modified after initialization",
            "The pointer is the only reference accessing the memory location it points to during its scope",
            "The memory pointed to is thread-restricted",
            "The pointer address cannot be passed to standard library calls"
        ],

        answer: 1

    },

    {
        questionNumber: 23,

        question: "What is the value of x after executing the following code?\n\nint x = -1;\nx = x >> 1;",

        options: [
            "0",
            "-1 (on systems using arithmetic right shift)",
            "2147483647",
            "-2"
        ],

        answer: 1

    },

    {
        questionNumber: 24,

        question: "What is the type of 'fp' in the declaration: int (*fp)(char *, double);",

        options: [
            "A function returning a pointer to an int",
            "A pointer to a function taking (char*, double) parameters and returning an int",
            "An array of function pointers returning double",
            "Invalid syntax"
        ],

        answer: 1

    },

    {
        questionNumber: 25,

        question: "What happens when realloc(ptr, 0) is executed with a non-null valid pointer ptr (up to C11 standards)?",

        options: [
            "Frees the memory block and returns NULL (or implementation-defined behavior in newer standards)",
            "Allocates a default block size of 16 bytes",
            "Causes a compile-time assertion failure",
            "Converts the pointer into static storage"
        ],

        answer: 0

    },

    {
        questionNumber: 26,

        question: "In C, what is the effect of the 'inline' keyword on a function?",

        options: [
            "Guarantees the function will always be replaced inline",
            "Hints to the compiler to perform inline substitution, but the compiler makes the final decision",
            "Forces function variables to be stored on GPU memory",
            "Disables recursion"
        ],

        answer: 1

    },

    {
        questionNumber: 27,

        question: "What is the output of the following C program?\n\n#define CUBE(x) (x * x * x)\n\nint a = 2;\nprintf(\"%d\", CUBE(a + 1));",

        options: [
            "27",
            "7",
            "9",
            "12"
        ],

        answer: 1

    },

    {
        questionNumber: 28,

        question: "What occurs when an integer overflow happens on a signed integer in C?",

        options: [
            "It wraps around predictably using two's complement",
            "It triggers an automatic kernel panic",
            "It results in Undefined Behavior according to the C standard",
            "It automatically converts to long long"
        ],

        answer: 2

    },

    {
        questionNumber: 29,

        question: "What do setjmp() and longjmp() provide in C?",

        options: [
            "Multithread synchronization mechanisms",
            "Non-local jumps / low-level exception handling across functions",
            "Dynamic memory reallocation tracking",
            "Hardware interrupt masking"
        ],

        answer: 1

    },

    {
        questionNumber: 30,

        question: "What is the value of 'i' after executing the following code?\n\nint i = 1;\ni = sizeof(i++);",

        options: [
            "2",
            "4 (or sizeof(int))",
            "1",
            "0"
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
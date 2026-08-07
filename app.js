/* =====================================================
   PREMIUM ONLINE EXAMINATION SYSTEM
   APP.JS
   PART 1 / 6

   LOGIN SYSTEM
===================================================== */


/* ===============================
   FIREBASE INITIALIZATION
================================ */

const db = window.db;


const {
    doc,
    getDoc,
    updateDoc
} = window.firebaseFunctions;



/* ===============================
   GLOBAL VARIABLES
================================ */

let currentStudent = null;

let currentSet = null;

let currentQuestion = 0;

let score = 0;

let questions = [];

let selectedAnswer = null;



/* ===============================
   PAGE LOADING SYSTEM
================================ */

window.addEventListener("load", () => {


    setTimeout(() => {


        const loader = document
            .getElementById("loadingScreen");


        if (loader) {

            loader.style.display = "none";

        }



        const loginPage = document
            .getElementById("loginPage");


        if (loginPage) {

            loginPage.classList.add("active");

        }


    }, 1500);


});




/* ===============================
   PAGE SWITCH SYSTEM
================================ */

function showPage(pageId) {


    const pages = document
        .querySelectorAll(".page");


    pages.forEach(page => {

        page.style.display = "none";

    });



    const targetPage = document
        .getElementById(pageId);



    if (targetPage) {

        targetPage.style.display = "block";

    }


}




/* ===============================
   LOGIN SYSTEM
================================ */


document
    .getElementById("loginBtn")
    .addEventListener("click", async () => {



        const username = document
            .getElementById("username")
            .value
            .trim();



        const password = document
            .getElementById("password")
            .value
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




        try {



            const studentRef = doc(
                db,
                "students",
                username
            );




            const studentSnap = await getDoc(
                studentRef
            );




            if (!studentSnap.exists()) {



                alert(
                    "Student not found"
                );


                return;


            }





            const student = studentSnap.data();





            if (
                student.password !== password
            ) {



                alert(
                    "Wrong Password"
                );


                return;


            }





            if (
                student.attempt === true
            ) {



                alert(
                    "You have already completed your exam!"
                );


                return;


            }





            /* SAVE STUDENT DATA */


            currentStudent = student;


            currentStudent.username = username;


            currentSet = student.set;






            /* DISPLAY STUDENT INFO */


            const nameBox =
                document.getElementById(
                    "studentName"
                );


            if (nameBox) {

                nameBox.innerText =
                    student.name;

            }





            const setBox =
                document.getElementById(
                    "studentSet"
                );


            if (setBox) {


                setBox.innerText =
                    "Question Set : "
                    + student.set;


            }





            const examName =
                document.getElementById(
                    "examStudent"
                );


            if (examName) {


                examName.innerText =
                    student.name;


            }






            /* UPDATE ATTEMPT STATUS */


            await updateDoc(
                studentRef,
                {

                    attempt: true

                }
            );






            /* OPEN INSTRUCTION PAGE */


            showPage(
                "instructionPage"
            );





        }
        catch (error) {



            console.error(
                "Login Error : ",
                error
            );



            alert(
                "Firebase Error"
            );



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


    A: [

        {
            question: "In modern web development, why is it strongly recommended to use HTML5 semantic elements such as <header>, <nav>, <article>, <section>, and <footer> instead of generic <div> containers?",
            options: [
                "Semantic elements automatically apply responsive CSS grid styling without needing external style sheets.",
                "Semantic elements improve Accessibility (a11y) for screen readers, enhance SEO indexing by search engine crawlers, and make code maintainable and readable.",
                "Generic <div> tags are deprecated in HTML5 and will cause rendering warnings in modern browsers like Chrome and Firefox.",
                "Semantic tags execute client-side JavaScript faster because they are parsed at a higher browser execution priority."
            ],
            answer: 1
        },


        {
            question: "Consider a <div> element styled with width:300px, padding:20px, border:5px solid black, margin:15px and box-sizing:content-box. What is the total rendered width and how does border-box change it?",
            options: [
                "Under content-box total width is 350px; under border-box content width shrinks so total outer width equals 300px.",
                "Under content-box total width is 380px; under border-box total width includes margins and equals 330px.",
                "Under content-box total width is 350px (Width + Padding + Border); under border-box total rendered width equals 300px as padding and border are included inside width.",
                "Under content-box total width is 325px; under border-box margin is added into content area."
            ],
            answer: 2
        },


        {
            question: "Analyze the JavaScript execution order: console.log('Start'); setTimeout(()=>console.log('Timeout Callback'),0); Promise.resolve().then(()=>console.log('Promise Resolved')); console.log('End');",
            options: [
                "Start → Timeout Callback → Promise Resolved → End",
                "Start → End → Timeout Callback → Promise Resolved",
                "Start → End → Promise Resolved → Timeout Callback",
                "Start → Promise Resolved → End → Timeout Callback"
            ],
            answer: 2
        },


        {
            question: "When architecting complex web application layouts, what is the primary structural difference between CSS Flexbox and CSS Grid?",
            options: [
                "Flexbox is designed for 1-Dimensional layouts, whereas CSS Grid is designed for 2-Dimensional layouts.",
                "Flexbox only works for mobile sizes while CSS Grid works only on desktop.",
                "Flexbox requires absolute positioning while Grid does not.",
                "Flexbox handles server-side rendering while Grid uses WebGL."
            ],
            answer: 0
        },


        {
            question: "What happens when a user types https://www.example.com in a browser and presses Enter?",
            options: [
                "HTTP GET Request → HTML rendered → DNS Resolution → TCP Handshake → SSL/TLS Negotiation.",
                "DNS Resolution → TCP 3-Way Handshake → TLS Handshake → HTTP GET Request → Server Response → DOM/CSSOM Rendering.",
                "Browser renders cached layout → DNS downloads JavaScript → Database query executes locally.",
                "TLS starts TCP lookup → HTTP POST fetches HTML → DNS compiles CSS."
            ],
            answer: 1
        }


    ],





    B: [

        {
            question: "What does 'Scope Creep' refer to in a web development project?",
            options: [
                "Adding extra features without planning or adjusting time/budget",
                "Decreasing the budget mid-project",
                "Bugs introduced during the final testing phase",
                "Reducing the number of web pages before release"
            ],
            answer: 0
        },

        {
            question: "Which Agile framework uses roles like 'Product Owner' and 'Scrum Master'?",
            options: [
                "Waterfall",
                "Scrum",
                "Kanban",
                "PRINCE2"
            ],
            answer: 1
        },

        {
            question: "What is the primary purpose of a 'Sprint' in Scrum?",
            options: [
                "To deploy the entire website at once",
                "To train new developers on coding languages",
                "A fixed timebox (usually 1–4 weeks) to complete a specific set of tasks",
                "A continuous loop without any deadlines"
            ],
            answer: 2
        },

        {
            question: "In web development, what does 'MVP' stand for?",
            options: [
                "Most Valuable Programmer",
                "Minimum Viable Product",
                "Maximum Value Process",
                "Main Visual Prototype"
            ],
            answer: 1
        },

        {
            question: "Which tool is most commonly used for version control and collaborating on code?",
            options: [
                "Trello",
                "Figma",
                "Git",
                "Slack"
            ],
            answer: 2
        },

        {
            question: "In a traditional Waterfall project model, when does testing usually happen?",
            options: [
                "Daily throughout the project",
                "At the very start before design",
                "After the development phase is completed",
                "Concurrently with writing code"
            ],
            answer: 2
        },

        {
            question: "What is a 'User Story' in Agile project management?",
            options: [
                "A review written by a client after release",
                "A short description of a feature from the perspective of the end-user",
                "The biography of the lead developer",
                "A bug report sent by a user"
            ],
            answer: 1
        },

        {
            question: "What is the main goal of a Daily Standup meeting?",
            options: [
                "To write code together for 15 minutes",
                "To present full project demos to clients",
                "To share quick updates, plans for the day, and any blockers",
                "To negotiate developer salaries"
            ],
            answer: 2
        },

        {
            question: "Which visual board uses columns like 'To Do', 'In Progress', and 'Done' to manage task flow?",
            options: [
                "Gantt Chart",
                "Kanban Board",
                "Flowchart",
                "Entity Relationship Diagram"
            ],
            answer: 1
        },

        {
            question: "What is a 'Milestone' in project management?",
            options: [
                "A minor bug fixed in code",
                "A major event or phase completion marker in a project timeline",
                "A tool for hosting files",
                "A type of database index"
            ],
            answer: 1
        },

        {
            question: "What is the main purpose of Wireframing during web design?",
            options: [
                "Writing backend API routes",
                "Laying out the basic structural design of a website before coding",
                "Running automated speed tests",
                "Setting up server security rules"
            ],
            answer: 1
        },

        {
            question: "What does a Gantt Chart primarily display?",
            options: [
                "Code commits over time",
                "Server CPU usage",
                "Project schedule, tasks, and dependencies over time",
                "Client payment histories"
            ],
            answer: 2
        },

        {
            question: "Which role in Scrum is responsible for prioritizing the Product Backlog?",
            options: [
                "Scrum Master",
                "Lead Developer",
                "QA Engineer",
                "Product Owner"
            ],
            answer: 3
        },

        {
            question: "What does 'Refinement' or 'Grooming' mean for a Product Backlog?",
            options: [
                "Deleting all old tasks",
                "Reviewing, detailing, and estimating backlog items for upcoming sprints",
                "Refactoring the codebase",
                "Formatting CSS code style"
            ],
            answer: 1
        },

        {
            question: "What is a 'Blocker' (or Impediment)?",
            options: [
                "An obstacle that prevents a team member from progressing on a task",
                "A feature that blocks unauthorized users from logging in",
                "A CSS rule that disables clicks",
                "A server error caused by high traffic"
            ],
            answer: 0
        },

        {
            question: "Why is 'Time Tracking' important in web development projects?",
            options: [
                "To prevent developers from taking breaks",
                "To calculate project costs, measure productivity, and improve future estimates",
                "To automatically write documentation",
                "To speed up website loading times"
            ],
            answer: 1
        },

        {
            question: "In project management, what are 'Deliverables'?",
            options: [
                "Quantifiable outputs or results produced during or at the end of a project",
                "Notifications sent by email",
                "Third-party npm packages",
                "Server hardware components"
            ],
            answer: 0
        },

        {
            question: "What is the focus of a Sprint Retrospective meeting?",
            options: [
                "Showing the completed website to external stakeholders",
                "Discussing what went well, what didn't, and how to improve in the next sprint",
                "Writing developer documentation",
                "Assigning tasks to new recruits"
            ],
            answer: 1
        },

        {
            question: "What does QA stand for in web project teams?",
            options: [
                "Quick Access",
                "Query Analysis",
                "Quality Assurance",
                "Quantum Algorithm"
            ],
            answer: 2
        },

        {
            question: "Which document outlines the project goals, scope, deadlines, and responsibilities for a client?",
            options: [
                "API Documentation",
                "Statement of Work (SOW)",
                "README.md file",
                "Git Commit Log"
            ],
            answer: 1
        },

        {
            question: "What is 'Refactoring' in software engineering?",
            options: [
                "Changing the outward behavior of a feature",
                "Restructuring existing computer code without changing its external behavior",
                "Changing the project manager mid-way",
                "Redesigning the logo"
            ],
            answer: 1
        },

        {
            question: "What does 'Deployment' mean in web development?",
            options: [
                "Moving code from a local environment to a live server where users can access it",
                "Writing initial project specifications",
                "Designing low-fidelity prototypes in Figma",
                "Fixing CSS styling bugs"
            ],
            answer: 0
        },

        {
            question: "What is a 'Task Dependency'?",
            options: [
                "When a task is completed ahead of time",
                "A relationship where one task relies on the completion or start of another",
                "A library imported in JavaScript",
                "A developer relying on another developer's machine"
            ],
            answer: 1
        },

        {
            question: "Which tool is widely used for tracking issues, tasks, and project workflows?",
            options: [
                "Jira",
                "VS Code",
                "Postman",
                "FileZilla"
            ],
            answer: 0
        },

        {
            question: "What is the main benefit of adopting an Agile approach over a strict Waterfall approach?",
            options: [
                "No documentation is ever needed",
                "Flexibility to adapt to changing requirements and feedback quickly",
                "Guarantees that code will be 100% bug-free",
                "Eliminates the need for client communication"
            ],
            answer: 1
        },

        {
            question: "What does 'Definition of Done' (DoD) mean in a Scrum team?",
            options: [
                "The time when the developer stops working for the day",
                "A shared checklist of criteria that a task must meet to be considered complete",
                "The date when the company contract ends",
                "When the code is written, even if untested"
            ],
            answer: 1
        },

        {
            question: "What is a Sprint Backlog?",
            options: [
                "A list of bugs found on the live website",
                "The list of tasks selected from the Product Backlog to be completed during a specific sprint",
                "A history of past projects",
                "An archived list of canceled features"
            ],
            answer: 1
        },

        {
            question: "What is Risk Management in web projects?",
            options: [
                "Deleting risky code from the server",
                "Identifying, analyzing, and taking steps to reduce potential project problems before they occur",
                "Buying insurance for developer laptops",
                "Avoiding all new technology stacks"
            ],
            answer: 1
        },

        {
            question: "What is a Staging Environment?",
            options: [
                "The developer's personal machine",
                "A near-exact replica of the live production environment used for final testing before launch",
                "A public code repository",
                "The design folder on Google Drive"
            ],
            answer: 1
        },

        {
            question: "Who is primarily responsible for removing blockers for a developer team in Scrum?",
            options: [
                "Database Administrator",
                "Client Representative",
                "Scrum Master",
                "UI/UX Designer"
            ],
            answer: 2
        }

    ],



    C: [

        {
            question: "What does HTML stand for?",
            options: [
                "High Text Marking Language",
                "Hyper Text Markup Language",
                "Hyperlink and Text Markup Language",
                "Home Tool Markup Language"
            ],
            answer: 1
        },

        {
            question: "Which HTML element is used to define the main title of a document displayed on the browser tab?",
            options: [
                "<head>",
                "<h1>",
                "<title>",
                "<header>"
            ],
            answer: 2
        },

        {
            question: "Which CSS property is used to change the text color of an element?",
            options: [
                "font-color",
                "color",
                "text-style",
                "background-color"
            ],
            answer: 1
        },

        {
            question: "How do you create an unordered list in HTML?",
            options: [
                "<ol>",
                "<li>",
                "<ul>",
                "<dl>"
            ],
            answer: 2
        },

        {
            question: "Which keyword is used to declare a variable in JavaScript that cannot be reassigned?",
            options: [
                "var",
                "let",
                "const",
                "static"
            ],
            answer: 2
        },

        {
            question: "What does CSS stand for?",
            options: [
                "Creative Style Sheets",
                "Cascading Style Sheets",
                "Computer Style System",
                "Colorful Style Sheets"
            ],
            answer: 1
        },

        {
            question: "Which HTML attribute specifies an alternate text for an image if the image cannot be displayed?",
            options: [
                "src",
                "title",
                "alt",
                "href"
            ],
            answer: 2
        },

        {
            question: "In the CSS Box Model, what space sits directly between the element's content and its border?",
            options: [
                "Margin",
                "Padding",
                "Outline",
                "Gap"
            ],
            answer: 1
        },

        {
            question: "Which HTML tag is used to create a hyperlink?",
            options: [
                "<link>",
                "<a>",
                "<href>",
                "<url>"
            ],
            answer: 1
        },

        {
            question: "What is the correct JavaScript syntax to output 'Hello World' in the browser console?",
            options: [
                "print('Hello World')",
                "console.log('Hello World')",
                "document.writeConsole('Hello World')",
                "response.write('Hello World')"
            ],
            answer: 1
        },

        {
            question: "Which HTTP status code represents 'Not Found'?",
            options: [
                "200",
                "500",
                "404",
                "301"
            ],
            answer: 2
        },

        {
            question: "Which CSS unit is relative to the root element's (<html>) font size?",
            options: [
                "em",
                "px",
                "rem",
                "%"
            ],
            answer: 2
        },

        {
            question: "What is the purpose of the <meta name='viewport'> tag in HTML?",
            options: [
                "To connect external JavaScript files",
                "To ensure proper rendering and zooming on mobile devices",
                "To define page keywords for search engines",
                "To set up page character encoding"
            ],
            answer: 1
        },

        {
            question: "Which HTML5 tag is used to embed audio files?",
            options: [
                "<sound>",
                "<audio>",
                "<mp3>",
                "<media>"
            ],
            answer: 1
        },

        {
            question: "What will typeof [] return in JavaScript?",
            options: [
                "array",
                "object",
                "list",
                "undefined"
            ],
            answer: 1
        },

        {
            question: "Which CSS display value converts an element into a flex container?",
            options: [
                "display: inline-block",
                "display: flex",
                "display: grid",
                "display: block"
            ],
            answer: 1
        },

        {
            question: "Which HTML element is best suited for wrapping main navigation links?",
            options: [
                "<menu>",
                "<section>",
                "<nav>",
                "<aside>"
            ],
            answer: 2
        },

        {
            question: "How do you select an element with id='main' in CSS?",
            options: [
                ".main",
                "#main",
                "*main",
                "main"
            ],
            answer: 1
        },

        {
            question: "Which JavaScript method adds a new element to the end of an array?",
            options: [
                "push()",
                "pop()",
                "unshift()",
                "concat()"
            ],
            answer: 0
        },

        {
            question: "What is the default position value of an HTML element in CSS?",
            options: [
                "relative",
                "absolute",
                "static",
                "fixed"
            ],
            answer: 2
        },

        {
            question: "Which symbol is used for single-line comments in JavaScript?",
            options: [
                "<!-- comment -->",
                "/* comment */",
                "// comment",
                "# comment"
            ],
            answer: 2
        },

        {
            question: "What does DOM stand for in web development?",
            options: [
                "Document Object Model",
                "Data Object Management",
                "Digital Display Module",
                "Desktop Output Mode"
            ],
            answer: 0
        },

        {
            question: "Which attribute is used in an HTML <form> to specify where to send the form data?",
            options: [
                "method",
                "action",
                "target",
                "path"
            ],
            answer: 1
        },

        {
            question: "How do you link an external CSS file named style.css to an HTML document?",
            options: [
                "<script src='style.css'></script>",
                "<link rel='stylesheet' href='style.css'>",
                "<style src='style.css'>",
                "<css path='style.css'>"
            ],
            answer: 1
        },

        {
            question: "In JavaScript, which operator checks for both equal value and equal type?",
            options: [
                "=",
                "==",
                "===",
                "?="
            ],
            answer: 2
        },

        {
            question: "Which CSS property controls the stack order of overlapping elements?",
            options: [
                "order",
                "z-index",
                "flex-grow",
                "position"
            ],
            answer: 1
        },

        {
            question: "Which HTML tag is used to define an inline container for styling text?",
            options: [
                "<div>",
                "<span>",
                "<p>",
                "<section>"
            ],
            answer: 1
        },

        {
            question: "What does JSON stand for?",
            options: [
                "JavaScript Object Notation",
                "Java Source Open Network",
                "JavaScript Online Node",
                "Joint System Output Network"
            ],
            answer: 0
        },

        {
            question: "Which JavaScript function converts a JSON string into a JavaScript object?",
            options: [
                "JSON.stringify()",
                "JSON.parse()",
                "JSON.toObject()",
                "JSON.convert()"
            ],
            answer: 1
        },

        {
            question: "What is the HTTP method used to retrieve data from a server without modifying it?",
            options: [
                "POST",
                "PUT",
                "GET",
                "DELETE"
            ],
            answer: 2
        }

    ],



    D: [

        {
            question: "What is a 'Deadline' in a project?",
            options: [
                "The date or time by which a task or project must be completed.",
                "The day a project is officially started.",
                "A bug that crashes the website completely.",
                "The daily lunch break time for developers."
            ],
            answer: 0
        },

        {
            question: "What is the main purpose of 'Client Feedback'?",
            options: [
                "To find out what the client likes or wants changed in the website.",
                "To force the client to pay extra money.",
                "To test the server speed.",
                "To ask the client to write HTML code."
            ],
            answer: 0
        },

        {
            question: "Which of the following is a popular communication tool used by development teams?",
            options: [
                "Slack",
                "Photoshop",
                "Notepad",
                "CSS"
            ],
            answer: 0
        },

        {
            question: "What does 'To-Do' mean on a task management board?",
            options: [
                "Tasks that are already finished.",
                "Tasks that haven't been started yet.",
                "Tasks currently being worked on.",
                "Canceled tasks."
            ],
            answer: 1
        },

        {
            question: "What is a Project Manager (PM) primarily responsible for?",
            options: [
                "Writing all backend code for the project.",
                "Designing the logo and color schemes.",
                "Planning, organizing, and guiding the team to complete the project.",
                "Buying domain names and servers."
            ],
            answer: 2
        },

        {
            question: "What is 'Testing' in web development?",
            options: [
                "Checking the website to find and fix bugs or errors.",
                "Writing the project agreement contract.",
                "Hosting the website on the internet.",
                "Drawing wireframes on paper."
            ],
            answer: 0
        },

        {
            question: "What does 'In Progress' mean on a task board?",
            options: [
                "The task is completely done.",
                "The task is currently being worked on.",
                "The task is deleted.",
                "The task hasn't been assigned to anyone."
            ],
            answer: 1
        },

        {
            question: "What is a 'Bug' in software development?",
            options: [
                "A feature that the client loves.",
                "An error or mistake in the code that causes the website to work incorrectly.",
                "A new design layout.",
                "A type of web server."
            ],
            answer: 1
        },

        {
            question: "What is a 'Daily Standup' meeting?",
            options: [
                "A short, daily meeting where the team shares progress and plans.",
                "A two-hour coding test.",
                "A meeting held only when a project fails.",
                "A monthly party for the company."
            ],
            answer: 0
        },

        {
            question: "What is a 'Task'?",
            options: [
                "A single, specific piece of work that needs to be done.",
                "The total budget of the company.",
                "The entire website release.",
                "A client meeting."
            ],
            answer: 0
        },

        {
            question: "What does 'UI' stand for in web project discussions?",
            options: [
                "User Interface",
                "Unified Integration",
                "User Interaction",
                "Universal Internet"
            ],
            answer: 0
        },

        {
            question: "What does 'UX' stand for?",
            options: [
                "User Experience",
                "Universal Extension",
                "User Example",
                "Unit Execution"
            ],
            answer: 0
        },

        {
            question: "Why do teams break a large project into smaller tasks?",
            options: [
                "To make the project easier to manage, estimate, and complete.",
                "To make the project take more time.",
                "Because small tasks don't require testing.",
                "To confuse the client."
            ],
            answer: 0
        },

        {
            question: "What is a 'Feature' in a web application?",
            options: [
                "A specific functionality or capability of the app (e.g., Login, Search Bar).",
                "A syntax error in JavaScript.",
                "The monthly hosting bill.",
                "The folder where images are stored."
            ],
            answer: 0
        },

        {
            question: "What is the 'Front-End' of a website?",
            options: [
                "The database server where data is stored.",
                "The part of the website that users see and interact with.",
                "The backend security code.",
                "The payment gateway integration."
            ],
            answer: 1
        },

        {
            question: "What is the 'Back-End' of a website?",
            options: [
                "The visible layout made with HTML and CSS.",
                "The server, database, and background logic that users don't see directly.",
                "The domain name purchased by the client.",
                "The website's favicon logo."
            ],
            answer: 1
        },

        {
            question: "What does 'Done' mean on a project task board?",
            options: [
                "The task is fully finished, tested, and accepted.",
                "The developer has started typing code.",
                "The task is waiting for a client reply.",
                "The task was postponed to next year."
            ],
            answer: 0
        },

        {
            question: "What is a 'Project Schedule'?",
            options: [
                "A timeline showing when tasks and project phases start and end.",
                "A list of developer salaries.",
                "A document with all code comments.",
                "A database of client phone numbers."
            ],
            answer: 0
        },

        {
            question: "What is 'Documentation' in a project?",
            options: [
                "Written explanations and guides about how the project or code works.",
                "Sending text messages to clients on WhatsApp.",
                "Designing icons in Illustrator.",
                "Deleting unused files."
            ],
            answer: 0
        },

        {
            question: "What is a 'Kickoff Meeting'?",
            options: [
                "The first meeting held with the team and client to start a project.",
                "A party hosted after finishing a project.",
                "A meeting to fire a team member.",
                "The final security audit meeting."
            ],
            answer: 0
        },

        {
            question: "What is a 'Repository' (Repo) in developer teams?",
            options: [
                "A place where project code and files are stored and managed.",
                "A folder for storing office receipts.",
                "A type of monitor used by designers.",
                "An online payment method."
            ],
            answer: 0
        },

        {
            question: "What is a 'Design Mockup'?",
            options: [
                "A visual representation or preview of how the final website will look.",
                "The written JavaScript code.",
                "A test report showing server errors.",
                "An invoice sent to the client."
            ],
            answer: 0
        },

        {
            question: "What is a 'Brainstorming' session?",
            options: [
                "A group discussion to generate creative ideas and solutions for a project.",
                "Fixing server hardware issues.",
                "Writing database queries under time pressure.",
                "Testing a website for security vulnerabilities."
            ],
            answer: 0
        },

        {
            question: "What does 'Assignee' mean for a task?",
            options: [
                "The person responsible for working on and completing that task.",
                "The client who paid for the project.",
                "The software used to write code.",
                "The date the task was created."
            ],
            answer: 0
        },

        {
            question: "What is a 'Client'?",
            options: [
                "The person or company paying for the website/project to be built.",
                "The main server hosting the database.",
                "The lead programmer on the team.",
                "A software framework like React."
            ],
            answer: 0
        },

        {
            question: "What does 'Priority' mean when managing tasks?",
            options: [
                "Deciding which tasks are most important and should be done first.",
                "Doing tasks in alphabetical order.",
                "Giving all tasks to the newest team member.",
                "Deleting tasks that take more than one hour."
            ],
            answer: 0
        },

        {
            question: "What is a 'Feedback Loop'?",
            options: [
                "A continuous cycle of getting input, making improvements, and reviewing again.",
                "An infinite loop error in code that freezes the browser.",
                "A speaker noise during online calls.",
                "Paying the monthly subscription for Trello."
            ],
            answer: 0
        },

        {
            question: "What is a 'Launch' or 'Go-Live'?",
            options: [
                "Making the completed website official and accessible to the public on the internet.",
                "Starting the initial design phase.",
                "Deleting old project files from the computer.",
                "Writing the first line of code."
            ],
            answer: 0
        },

        {
            question: "What is 'Team Collaboration'?",
            options: [
                "People working together effectively to achieve a common project goal.",
                "One developer working completely alone without telling anyone.",
                "Competing against team members to see who codes fastest.",
                "Outsourcing the entire project to another company."
            ],
            answer: 0
        },

        {
            question: "What is a 'Project Goal'?",
            options: [
                "The main objective or outcome that the project aims to achieve.",
                "The maximum number of lines of code allowed.",
                "The total number of meetings held in a week.",
                "The domain extension used (like .com or .org)."
            ],
            answer: 0
        }

    ],

}



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
    .addEventListener("click", async () => {

        let agree = document.getElementById("agreeRules");

        if (!agree.checked) {
            alert("Please accept instructions first");
            return;
        }

        await startExam();

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


async function startExam() {


    showPage("examPage");



    // Load student's question set

    loadStudentQuestionSet();



    currentQuestion = 0;


    userAnswers = [];


    score = 0;
    examFinished = false;
    totalSeconds = 600;
    examFinished = false;

    startMasterTimer();




    // Fullscreen

    await openFullscreen();;




    loadQuestion();

}






/* =====================================================
        FULLSCREEN
===================================================== */


async function openFullscreen() {

    try {

        if (!document.fullscreenElement) {
            await document.documentElement.requestFullscreen();
        }

    } catch (e) {
        console.log("Fullscreen Failed", e);
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

    let btn = document.getElementById("nextBtn");


    if (currentQuestion >= questions.length) {

        finishExam();

    }
    else {

        btn.innerText = "NEXT QUESTION";

    }

}







/* =====================================================
        SELECT ANSWER
===================================================== */

selectedAnswer = null;



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

    if (currentQuestion >= questions.length) {
        finishExam();
    } else {
        loadQuestion();
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
    examFinished = false;

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

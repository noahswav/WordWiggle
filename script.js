const input =
document.getElementById(
"lettersInput"
);

const results =
document.getElementById(
"results"
);

const charCount =
document.getElementById(
"charCount"
);

const resultActions =
document.getElementById(
"resultActions"
);

const keepEdges =
document.getElementById(
"keepEdges"
);

const finderInput =
document.getElementById(
"finderInput"
);

const finderCount =
document.getElementById(
"finderCount"
);

const finderResults =
document.getElementById(
"finderResults"
);

const recentSection =
document.getElementById(
"recentSection"
);

const recentList =
document.getElementById(
"recentList"
);


let resultCount = 12;

let currentResults = [];

let classroomDifficulty =
"easy";

let classroomOriginalWord = "";



/* -------------------------
   SMALL DICTIONARY
------------------------- */

const dictionary = [

"able",
"about",
"above",
"act",
"add",
"after",
"again",
"age",
"air",
"all",
"alone",
"also",
"always",
"animal",
"answer",
"apple",
"around",
"ask",
"away",
"back",
"bad",
"ball",
"banana",
"bank",
"bear",
"beat",
"beautiful",
"bed",
"before",
"best",
"better",
"big",
"bird",
"black",
"blue",
"boat",
"body",
"book",
"box",
"boy",
"bring",
"build",
"busy",
"call",
"camera",
"car",
"care",
"carry",
"castle",
"cat",
"change",
"child",
"city",
"class",
"clear",
"cloud",
"cold",
"come",
"cool",
"copy",
"country",
"daily",
"dark",
"day",
"dog",
"door",
"dream",
"earth",
"easy",
"eat",
"end",
"example",
"face",
"family",
"fast",
"find",
"fire",
"fish",
"five",
"food",
"four",
"free",
"friend",
"fun",
"game",
"garden",
"good",
"great",
"green",
"group",
"grow",
"hand",
"happy",
"hard",
"head",
"help",
"home",
"house",
"idea",
"jungle",
"keep",
"kind",
"learn",
"lemon",
"letter",
"life",
"light",
"line",
"listen",
"little",
"live",
"long",
"look",
"magic",
"make",
"money",
"moon",
"more",
"music",
"name",
"night",
"number",
"open",
"orange",
"page",
"people",
"place",
"planet",
"play",
"point",
"pretty",
"purple",
"puzzle",
"quick",
"rain",
"read",
"real",
"red",
"river",
"road",
"room",
"run",
"school",
"sea",
"short",
"show",
"simple",
"silver",
"small",
"smile",
"sound",
"start",
"stop",
"storm",
"story",
"summer",
"sun",
"teacher",
"thing",
"tiger",
"time",
"today",
"tree",
"water",
"white",
"wiggle",
"wonder",
"word",
"work",
"world",
"write",

"silent",
"enlist",
"tinsel",
"inlet",
"tiles",
"lines",
"stone",
"tones",
"notes",
"onset",
"heart",
"angel",
"glean",
"angle",
"below",
"elbow",
"state",
"taste",
"tears",
"rates",
"stare",
"least",
"stale",
"steal",
"slate",
"tales",
"save",
"vase",
"evil",
"vile",
"veil",
"file",
"race",
"acre",
"stop",
"pots",
"tops",
"spot",
"post",
"tea",
"ate",
"rat",
"tar",
"art"

];



const dailyWords = [

"planet",
"wiggle",
"orange",
"rocket",
"puzzle",
"banana",
"silver",
"castle",
"summer",
"coffee",
"garden",
"breeze",
"camera",
"friend",
"bubble",
"cookie",
"jungle",
"little",
"purple",
"wonder",
"beach",
"music",
"happy",
"dream",
"magic",
"storm",
"river",
"cloud",
"tiger",
"lemon",
"smile"

];



/* -------------------------
   UTILITIES
------------------------- */

function cleanInput(value) {

return value
.toLowerCase()
.replace(
/[^a-z]/g,
""
)
.slice(
0,
24
);

}



function fisherYates(chars) {

const arr =
[...chars];


for (
let i =
arr.length - 1;
i > 0;
i--
) {

const j =
Math.floor(
Math.random() *
(i + 1)
);


[
arr[i],
arr[j]
] =
[
arr[j],
arr[i]
];

}


return arr.join("");

}



function scramble(
value,
preserveEdges = false
) {

if (
!preserveEdges ||
value.length < 4
) {

return fisherYates(
value
);

}


return (

value[0] +

fisherYates(
value.slice(
1,
-1
)
) +

value[
value.length - 1
]

);

}



function generateUnique(
value,
count,
preserveEdges
) {

const set =
new Set();


const maxAttempts =
Math.max(
200,
count * 40
);


for (

let i = 0;

i < maxAttempts &&
set.size < count;

i++

) {

const mixed =
scramble(
value,
preserveEdges
);


if (
mixed !== value
) {

set.add(
mixed
);

}

}


if (
set.size === 0
) {

set.add(
scramble(
value,
preserveEdges
)
);

}


return [...set];

}



/* -------------------------
   MAIN WIGGLE
------------------------- */

function renderEmpty(
message =
"Your scrambled words will appear here."
) {

results.innerHTML = `

<div class="empty-state">

<div class="empty-icon">
Aa
</div>

<p>
${message}
</p>

</div>

`;


resultActions
.classList
.add(
"hidden"
);


currentResults = [];

}



function renderResults(words) {

currentResults =
words;


results.innerHTML =
"";


words.forEach(
(word, index) => {

const item =
document.createElement(
"button"
);


item.type =
"button";


item.className =
"word";


item.textContent =
word;


item.style.animationDelay =
`${Math.min(
index * 18,
220
)}ms`;


item.addEventListener(
"click",
() =>
copyWord(
item,
word
)
);


results.appendChild(
item
);

}
);


resultActions
.classList
.remove(
"hidden"
);

}



function wiggleWords() {

const value =
cleanInput(
input.value
);


input.value =
value;


updateCount();


if (
value.length < 2
) {

renderEmpty(
"Enter at least 2 letters."
);

input.focus();

return;

}


const words =
generateUnique(
value,
resultCount,
keepEdges.checked
);


renderResults(
words
);


saveHistory(
value
);


track(
"wiggle_words",
{
letters:
value.length
}
);

}



function clearWords() {

input.value =
"";


updateCount();

renderEmpty();

input.focus();

}



/* -------------------------
   WORD FINDER
------------------------- */

function letterCount(word) {

const counts = {};


for (
const letter of word
) {

counts[letter] =
(counts[letter] || 0) +
1;

}


return counts;

}



function canBuildWord(
word,
availableLetters
) {

const needed =
letterCount(
word
);


const available =
letterCount(
availableLetters
);


for (
const letter
in needed
) {

if (

!available[letter] ||

needed[letter] >
available[letter]

) {

return false;

}

}


return true;

}



function findRealWords() {

const letters =
cleanInput(
finderInput.value
);


finderInput.value =
letters;


updateFinderCount();


if (
letters.length < 2
) {

renderFinderMessage(
"Enter at least 2 letters."
);

return;

}


const matches =
[
...new Set(
dictionary
)
]

.filter(
word =>
word.length >= 2 &&
word.length <=
letters.length &&
canBuildWord(
word,
letters
)
)

.sort(
(a, b) => {

if (
b.length !==
a.length
) {

return (
b.length -
a.length
);

}


return a.localeCompare(
b
);

}
);


if (
!matches.length
) {

renderFinderMessage(
"No words found yet."
);

return;

}


renderFinderResults(
matches
);


track(
"find_words",
{
results:
matches.length
}
);

}



function renderFinderMessage(
message
) {

finderResults.innerHTML = `

<div class="empty-state">

<div class="empty-icon">
Aa
</div>

<p>
${message}
</p>

</div>

`;

}



function renderFinderResults(
words
) {

finderResults.innerHTML =
"";


const summary =
document.createElement(
"div"
);


summary.className =
"finder-summary";


summary.textContent =
`${words.length} words found`;


finderResults.appendChild(
summary
);


const grouped = {};


words.forEach(
word => {

const length =
word.length;


if (
!grouped[length]
) {

grouped[length] = [];

}


grouped[length]
.push(
word
);

}
);


Object
.keys(
grouped
)

.sort(
(a, b) =>
b - a
)

.forEach(
length => {

const group =
document.createElement(
"div"
);


group.className =
"finder-group";


const title =
document.createElement(
"div"
);


title.className =
"finder-group-title";


title.textContent =
`${length} LETTER WORDS`;


const list =
document.createElement(
"div"
);


list.className =
"finder-word-list";


grouped[length]
.forEach(
word => {

const button =
document.createElement(
"button"
);


button.type =
"button";


button.className =
"word";


button.textContent =
word;


button.addEventListener(
"click",
() =>
copyWord(
button,
word
)
);


list.appendChild(
button
);

}
);


group.appendChild(
title
);


group.appendChild(
list
);


finderResults.appendChild(
group
);

}
);

}



/* -------------------------
   COPY / SHARE
------------------------- */

async function copyText(
text
) {

try {

await navigator
.clipboard
.writeText(
text
);

return true;

}

catch {

const area =
document.createElement(
"textarea"
);


area.value =
text;


document.body
.appendChild(
area
);


area.select();


document.execCommand(
"copy"
);


area.remove();


return true;

}

}



async function copyWord(
element,
word
) {

await copyText(
word
);


element
.classList
.add(
"copied"
);


setTimeout(
() => {

element
.classList
.remove(
"copied"
);

},
850
);

}



async function copyAll() {

if (
!currentResults.length
) {
return;
}


await copyText(
currentResults.join(
"\n"
)
);


flashButton(
document.getElementById(
"copyAllBtn"
),
"Copied!"
);

}



async function shareResults() {

if (
!currentResults.length
) {
return;
}


const text =

`My WordWiggle results:
${currentResults.join(", ")}

https://wordwiggle.online/`;


if (
navigator.share
) {

try {

await navigator.share(
{
title:
"WordWiggle",

text
}
);

return;

}

catch {}

}


await copyText(
text
);


flashButton(
document.getElementById(
"shareBtn"
),
"Copied!"
);

}



function flashButton(
button,
label
) {

const old =
button.textContent;


button.textContent =
label;


setTimeout(
() => {

button.textContent =
old;

},
1000
);

}



/* -------------------------
   HISTORY
------------------------- */

function saveHistory(
value
) {

let history =
JSON.parse(
localStorage.getItem(
"wordwiggle-history"
) ||
"[]"
);


history =
[
value,
...history.filter(
item =>
item !== value
)
]
.slice(
0,
8
);


localStorage.setItem(
"wordwiggle-history",
JSON.stringify(
history
)
);


renderHistory();

}



function renderHistory() {

const history =
JSON.parse(
localStorage.getItem(
"wordwiggle-history"
) ||
"[]"
);


recentList.innerHTML =
"";


if (
!history.length
) {

recentSection
.classList
.add(
"hidden"
);

return;

}


recentSection
.classList
.remove(
"hidden"
);


history.forEach(
word => {

const button =
document.createElement(
"button"
);


button.type =
"button";


button.className =
"recent-pill";


button.textContent =
word;


button.onclick =
() => {

switchMode(
"scramble"
);


input.value =
word;


updateCount();


wiggleWords();


window.scrollTo(
{
top: 100,
behavior:
"smooth"
}
);

};


recentList
.appendChild(
button
);

}
);

}



/* -------------------------
   DAILY WIGGLE
------------------------- */

function setupDaily() {

const now =
new Date();


const dayNumber =
Math.floor(

Date.UTC(
now.getFullYear(),
now.getMonth(),
now.getDate()
)

/

86400000

);


const word =
dailyWords[
dayNumber %
dailyWords.length
];


document.getElementById(
"dailyWord"
)
.textContent =
word.toUpperCase();


document.getElementById(
"dailyBtn"
)
.onclick =
() => {

const mixed =
generateUnique(
word,
1,
false
)[0];


const result =
document.getElementById(
"dailyResult"
);


result.textContent =
mixed;


result.onclick =
async () => {

await copyText(
mixed
);


result.textContent =
`${mixed} · copied!`;


setTimeout(
() => {

result.textContent =
mixed;

},
900
);

};

};

}



/* -------------------------
   MAIN MODE SWITCH
------------------------- */

function switchMode(
mode
) {

const scrambleTab =
document.getElementById(
"scrambleTab"
);


const finderTab =
document.getElementById(
"finderTab"
);


const scrambleMode =
document.getElementById(
"scrambleMode"
);


const finderMode =
document.getElementById(
"finderMode"
);


if (
mode ===
"finder"
) {

scrambleTab
.classList
.remove(
"active"
);


finderTab
.classList
.add(
"active"
);


scrambleMode
.classList
.add(
"hidden"
);


finderMode
.classList
.remove(
"hidden"
);

}

else {

finderTab
.classList
.remove(
"active"
);


scrambleTab
.classList
.add(
"active"
);


finderMode
.classList
.add(
"hidden"
);


scrambleMode
.classList
.remove(
"hidden"
);

}

}



/* -------------------------
   CHALLENGE A FRIEND
------------------------- */

function encodeChallenge(
word
) {

return btoa(
word
)
.replace(
/=/g,
""
);

}



function decodeChallenge(
value
) {

try {

const padded =
value +
"=".repeat(
(4 -
value.length % 4)
% 4
);


return atob(
padded
);

}

catch {

return "";

}

}



function createChallenge() {

const input =
document.getElementById(
"challengeWordInput"
);


const word =
cleanInput(
input.value
);


if (
word.length < 2
) {

input.focus();

return;

}


const scrambleWord =
generateUnique(
word,
1,
false
)[0];


const encoded =
encodeChallenge(
word
);


const url =
`${window.location.origin}${window.location.pathname}?challenge=${encodeURIComponent(encoded)}`;


document.getElementById(
"challengePreview"
)
.textContent =
scrambleWord.toUpperCase();


document.getElementById(
"challengeLink"
)
.value =
url;


document.getElementById(
"challengeCreated"
)
.classList
.remove(
"hidden"
);


track(
"create_challenge"
);

}



function checkIncomingChallenge() {

const params =
new URLSearchParams(
window.location.search
);


const value =
params.get(
"challenge"
);


if (
!value
) {
return;
}


const answer =
cleanInput(
decodeChallenge(
value
)
);


if (
answer.length < 2
) {
return;
}


const scrambleWord =
generateUnique(
answer,
1,
false
)[0];


const modal =
document.getElementById(
"receivedChallengeModal"
);


modal.dataset.answer =
answer;


document.getElementById(
"receivedScramble"
)
.textContent =
scrambleWord.toUpperCase();


modal
.classList
.remove(
"hidden"
);


track(
"open_challenge"
);

}



function submitChallengeGuess() {

const modal =
document.getElementById(
"receivedChallengeModal"
);


const answer =
modal.dataset.answer;


const guess =
cleanInput(
document.getElementById(
"challengeGuessInput"
)
.value
);


const feedback =
document.getElementById(
"challengeFeedback"
);


if (
guess === answer
) {

feedback.textContent =
"🎉 You got it!";


feedback.className =
"challenge-feedback success";


document.getElementById(
"challengeAgainBtn"
)
.classList
.remove(
"hidden"
);


track(
"solve_challenge"
);

}

else {

feedback.textContent =
"Not quite — try again 👀";


feedback.className =
"challenge-feedback wrong";

}

}



/* -------------------------
   CLASSROOM MODE
------------------------- */

function createClassroomScramble(
word
) {

if (
classroomDifficulty ===
"easy"
) {

return scramble(
word,
true
);

}


return scramble(
word,
false
);

}



function startClassroomMode() {

const input =
document.getElementById(
"classroomWordInput"
);


const word =
cleanInput(
input.value
);


if (
word.length < 2
) {

input.focus();

return;

}


classroomOriginalWord =
word;


const scrambleWord =
createClassroomScramble(
word
);


document.getElementById(
"classroomPuzzleWord"
)
.textContent =
scrambleWord.toUpperCase();


document.getElementById(
"classroomAnswer"
)
.textContent =
word.toUpperCase();


document.getElementById(
"classroomAnswer"
)
.classList
.add(
"hidden"
);


document.getElementById(
"classroomModal"
)
.classList
.add(
"hidden"
);


document.getElementById(
"classroomPresentation"
)
.classList
.remove(
"hidden"
);


document.body.style.overflow =
"hidden";


track(
"start_classroom"
);

}



function scrambleClassroomAgain() {

if (
!classroomOriginalWord
) {
return;
}


const puzzle =
createClassroomScramble(
classroomOriginalWord
);


document.getElementById(
"classroomPuzzleWord"
)
.textContent =
puzzle.toUpperCase();


document.getElementById(
"classroomAnswer"
)
.classList
.add(
"hidden"
);

}



/* -------------------------
   ANALYTICS
------------------------- */

function track(
name,
params = {}
) {

if (
typeof gtag ===
"function"
) {

gtag(
"event",
name,
params
);

}

}



/* -------------------------
   COUNTERS
------------------------- */

function updateCount() {

charCount.textContent =
`${input.value.length}/24`;

}



function updateFinderCount() {

finderCount.textContent =
`${finderInput.value.length}/15`;

}



/* -------------------------
   EVENTS
------------------------- */

document
.querySelectorAll(
".option-chip"
)
.forEach(
button => {

button.addEventListener(
"click",
() => {

document
.querySelectorAll(
".option-chip"
)
.forEach(
item => {

item.classList.remove(
"active"
);

}
);


button.classList.add(
"active"
);


resultCount =
Number(
button.dataset.count
) ||
12;

}
);

}
);



document.getElementById(
"scrambleTab"
)
.onclick =
() =>
switchMode(
"scramble"
);



document.getElementById(
"finderTab"
)
.onclick =
() =>
switchMode(
"finder"
);



input.addEventListener(
"input",
updateCount
);



finderInput.addEventListener(
"input",
updateFinderCount
);



input.addEventListener(
"keydown",
event => {

if (
event.key ===
"Enter"
) {

wiggleWords();

}

}
);



finderInput.addEventListener(
"keydown",
event => {

if (
event.key ===
"Enter"
) {

findRealWords();

}

}
);



document.getElementById(
"wiggleBtn"
)
.onclick =
wiggleWords;



document.getElementById(
"clearBtn"
)
.onclick =
clearWords;



document.getElementById(
"againBtn"
)
.onclick =
wiggleWords;



document.getElementById(
"copyAllBtn"
)
.onclick =
copyAll;



document.getElementById(
"shareBtn"
)
.onclick =
shareResults;



document.getElementById(
"findWordsBtn"
)
.onclick =
findRealWords;



document.getElementById(
"finderClearBtn"
)
.onclick =
() => {

finderInput.value =
"";


updateFinderCount();


renderFinderMessage(
"Real words will appear here."
);

};



document.getElementById(
"clearHistoryBtn"
)
.onclick =
() => {

localStorage.removeItem(
"wordwiggle-history"
);


renderHistory();

};



/* OPEN MODALS */

document.getElementById(
"openChallengeBtn"
)
.onclick =
() => {

document.getElementById(
"challengeModal"
)
.classList
.remove(
"hidden"
);

};



document.getElementById(
"openClassroomBtn"
)
.onclick =
() => {

document.getElementById(
"classroomModal"
)
.classList
.remove(
"hidden"
);

};



/* CLOSE MODALS */

document
.querySelectorAll(
"[data-close]"
)
.forEach(
button => {

button.onclick =
() => {

document.getElementById(
button.dataset.close
)
.classList
.add(
"hidden"
);

};

}
);



/* CHALLENGE */

document.getElementById(
"createChallengeBtn"
)
.onclick =
createChallenge;



document.getElementById(
"copyChallengeBtn"
)
.onclick =
async () => {

const link =
document.getElementById(
"challengeLink"
)
.value;


await copyText(
link
);


flashButton(
document.getElementById(
"copyChallengeBtn"
),
"Copied!"
);

};



document.getElementById(
"submitChallengeGuess"
)
.onclick =
submitChallengeGuess;



document.getElementById(
"challengeGuessInput"
)
.addEventListener(
"keydown",
event => {

if (
event.key ===
"Enter"
) {

submitChallengeGuess();

}

}
);



document.getElementById(
"challengeAgainBtn"
)
.onclick =
() => {

document.getElementById(
"receivedChallengeModal"
)
.classList
.add(
"hidden"
);


document.getElementById(
"challengeModal"
)
.classList
.remove(
"hidden"
);


history.replaceState(
{},
"",
window.location.pathname
);

};



/* CLASSROOM DIFFICULTY */

document
.querySelectorAll(
".difficulty-btn"
)
.forEach(
button => {

button.onclick =
() => {

document
.querySelectorAll(
".difficulty-btn"
)
.forEach(
item => {

item.classList.remove(
"active"
);

}
);


button.classList.add(
"active"
);


classroomDifficulty =
button.dataset.difficulty;

};

}
);



document.getElementById(
"startClassroomBtn"
)
.onclick =
startClassroomMode;



document.getElementById(
"revealClassroomBtn"
)
.onclick =
() => {

document.getElementById(
"classroomAnswer"
)
.classList
.remove(
"hidden"
);

};



document.getElementById(
"newClassroomScrambleBtn"
)
.onclick =
scrambleClassroomAgain;



document.getElementById(
"classroomExitBtn"
)
.onclick =
() => {

document.getElementById(
"classroomPresentation"
)
.classList
.add(
"hidden"
);


document.body.style.overflow =
"";

};



document.getElementById(
"classroomFullscreenBtn"
)
.onclick =
async () => {

const element =
document.getElementById(
"classroomPresentation"
);


try {

if (
!document.fullscreenElement
) {

await element
.requestFullscreen();

}

else {

await document
.exitFullscreen();

}

}

catch {}

};



/* -------------------------
   START
------------------------- */

updateCount();

updateFinderCount();

renderHistory();

setupDaily();

checkIncomingChallenge();
// const subjectsContainer = document.getElementById('subjects-container')
// const subjects = document.getElementsByClassName('subject-type');
// const terms = document.getElementsByTagName('li');
// const testDiv = document.getElementById('test-div');
// const yearNums = document.getElementsByClassName('year-num');
// const chapterContainers = document.getElementsByClassName('chapters');
// const years = document.getElementsByClassName('year');
// const subjectDividers = document.getElementsByClassName('subject-divider');
// const yearDividers = document.getElementsByClassName('year-divider');



const toolsIcon = document.getElementById('floppy-disk');
const tools = document.getElementsByClassName('tool');
const toolsContainer = document.getElementById('tools');
const pixelCross = document.getElementsByClassName('pixel-cross');
const toolWindows = document.getElementsByClassName('tool-window');

const OperationResult = document.getElementById('operation-result');
const QMMin = document.getElementById('qm-min');
const QMMax = document.getElementById('qm-max');
const OperatorInput = document.getElementById('qm-operator-input');
const OperationCheck = document.getElementById('operation-check');
const CalcSpeed = document.getElementById('calc-speed');
const Operand1 = document.getElementById('operand-1');
const Operand2 = document.getElementById('operand-2');
const QMOperator = document.getElementById('operator');
// $("#floppy-disk").ready(function(){
//    const toolsIcon = document.getElementById('floppy-disk');
//    const tools = document.getElementsByClassName('tool');
//    const toolsContainer = document.getElementById('tools');
//    const pixelCross = document.getElementsByClassName('pixel-cross');
//    const toolWindows = document.getElementsByClassName('tool-window');
//    return toolsIcon, tools, toolsContainer, pixelCross, toolWindows;
// });

// function getVars()  {
//    const toolsIcon = document.getElementById('floppy-disk');
//    const tools = document.getElementsByClassName('tool');
//    const toolsContainer = document.getElementById('tools');
//    const pixelCross = document.getElementsByClassName('pixel-cross');
//    const toolWindows = document.getElementsByClassName('tool-window');
// }
// $("#floppy-disk").click(function() {
// });
// setTimeout(function() {
// }, 500)



const boldSize = '0.2px'
const blurSize = '0.05px'

const subjectsData = [
   {
      type: 'type-physics',
      id: 'physics',
      loaded: false
   },
   {
      type: 'type-chemistry',
      id: 'chemistry',
      loaded: false
   },
   {
      type: 'type-geography',
      id: 'geography',
      loaded: false
   },
   {
      type: 'type-social',
      id: 'social',
      loaded: true
   }
]

// :window events
// window.onload = () => {
//    // document.body.classList.remove("preload");
//    for(let i = 0; i < subjects.length; i++) {
//       displayUpdate(i, subjects[i].id);
//    };
//    updateOutlineSections();
//    scrollCenterPosition();
// };

// window.onresize = () => {
//    scrollCenterPosition();
//    positionYearNum();
// };

// window.onscroll = () => {
//    scrollCenterPosition();
// }

// window.onclick = () => {
//    scrollCenterPosition();
// }

// :keyboard events
var toolsLoaded = false;
window.onkeydown = (element) => {
   //close tools when esc
   if (element.key == "Escape") {
      if (toolsLoaded) {
         return closeTools();
      }
   }
   //toggle tools when f(loppy disk) or t(ools)
   if ((element.key == "f" || element.key == "t") && !element.ctrlKey && !element.altKey) {
      if (toolsLoaded) {
         return closeTools();
      } else {
         return openTools()
      };
   }
}

window.addEventListener('copy', () => {
   moveCopied(document.getElementById('copy'), cursorX, cursorY);
 });

// :cursor
var cursorX, cursorY;
onmousemove = (cursor) => {
   cursorX = cursor.clientX;
   cursorY = cursor.clientY;
   //open and close outline
   // if (window.innerWidth - cursorX < 24) {
   //    toggleOutline(true);
   // } else if (window.innerWidth - cursorX > 100){
   //    toggleOutline(false);
   // }
}

// for (let i = 0; i < outlineSections.length; i++) {
//    onmousemove = () => {
//       outlineSections[i].onmouseover = () => {
//          toggleOutline(true);
//       }
//       outlineSections[i].onmouseout = () => {
//          toggleOutline(false)
//       }
//    }
// }


function moveCopied(element, cursorX, cursorY) {
   clearTimeout();
   element.style.left = String(cursorX + 25) + "px";
   element.style.top = String(cursorY + 0) + "px";
   element.style['transition-duration'] = '0s';
   element.style.opacity = '100%'
   setTimeout(function(){element.style['transition-duration'] = '300ms'; element.style.opacity = '0%';}, 200)
}

// function toggleOutline(open) {
//    let translate;
//    if (open) {
//       translate = "0"
//       outlineProtrude.style.visibility = 'hidden';
//    } else {
//       translate = "380px"
//       outlineProtrude.style.visibility = 'visible';
//    };
//    outline.style.transform = `translateX(${translate})`;
//    outlineBackground.style.transform = `translateX(${translate})`;
// }


// :positioning
// function scrollCenterPosition() {
//    for (let i = 0; i < yearDividers.length; i++) {
//       yearDividers[i].style['margin-left'] = `${html.scrollLeft + (window.innerWidth - yearDividers[i].clientWidth) / 2}px`
//    };
//    for (let i = 0; i < subjectDividers.length; i++) {
//       subjectDividers[i].style['margin-left'] = `${html.scrollLeft + (window.innerWidth - subjectDividers[i].clientWidth) / 2}px`
//    };
//    subjectsContainer.style['margin-left'] = `${html.scrollLeft + (window.innerWidth - subjectsContainer.clientWidth) / 2}px`
// };

// function positionYearNum() {
//    for (let i = 0; i < yearNums.length; i++) {
//    // if (yearNums[i].scrollWidth > yearNums[i].offsetWidth) {
//       var widthLeft = (years[i].clientWidth - chapterContainers[i].clientWidth) / 2;
//       //if can fit year-num
//       if (widthLeft > 400) {
//          years[i].style.display = 'flex';
//          yearNums[i].style.margin = '0 100px 0 0';
//          yearNums[i].style['text-align'] = 'right';
//          yearNums[i].style.width = '0';
//       } else {
//          years[i].style.display = 'block';
//          //when year-num touches window border
//          if (chapterContainers[i].clientWidth - years[i].clientWidth >= 0) {
//             yearNums[i].style.margin = '0 0 36px 0';
//          } else {
//             yearNums[i].style.margin = `0 0 36px ${widthLeft}px`;
//             };
//          yearNums[i].style['text-align'] = 'left';
//          yearNums[i].style.width = 'max-content';
//       }
//    }
// }


// :display
// var display = 'none';
// function displayUpdate(num, subjectType) {
//    if (subjectsData[num].loaded) {
//       display = 'block';
//       subjects[num].style['text-shadow'] = `-${boldSize} -${boldSize} ${blurSize} #40454eff, ${boldSize} -${boldSize} ${blurSize} #40454eff, -${boldSize} ${boldSize} ${blurSize} #40454eff, ${boldSize} ${boldSize} ${blurSize} #40454eff, ${boldSize} 0px ${blurSize} #40454eff, -${boldSize} 0px ${blurSize} #40454eff, 0px ${boldSize} ${blurSize} #40454eff, 0px -${boldSize} ${blurSize} #40454eff`;
//       subjects[num].style.color = '#40454eff';
//    } else {
//       subjects[num].style['text-shadow'] = 'none'
//       subjects[num].style.color = '#363b44ff';
//       display = 'none';
//    };

//    var loadedCount = 0;
//    while (subjectDividers.length > 0) {
//       subjectDividers[0].parentNode.removeChild(subjectDividers[0]);
//    };
//    for (let i = 0; i < subjectsData.length; i++) {
//       if (subjectType == subjectsData[i].type) {
//          document.getElementById(subjectsData[i].id).style.display = display;
//          positionYearNum();
//       };
//       if (subjectsData[i].loaded == true) {
//          loadedCount += 1;
//       };
//    };
//    if (loadedCount >= 2) {
//       for (let i = 0, divides = 0; i < subjectsData.length - 1 && divides < loadedCount - 1; i++) {
//          if (subjectsData[i].loaded == true) {
//             document.getElementById(subjectsData[i].id).insertAdjacentHTML('afterend', '<div class="subject-divider"></div>')
//             divides++
//          };
//       };
//    };
//    scrollCenterPosition();
// };

// :toggle subjects
// for (let i = 0; i < subjects.length; i++) {
//    subjects[i].onclick = function() {
//       loadToggle(i, this.id);
//       updateOutlineSections()
//    };
// };

// function loadToggle(num, subjectType) {
//    if (subjectsData[num].loaded) {
//       subjectsData[num].loaded = false;
//    } else {
//       subjectsData[num].loaded = true;
//    };
//    displayUpdate(num, subjectType);
// };

// :tools
function closeTools() {
   for (let i=0; i<tools.length; i++) {
      toolsIcon.style.border = 'none';
      tools[i].style.opacity = '0%';
      tools[i].style.visibility = 'hidden';
      toolsContainer.style.visibility = 'hidden';
   };
   return toolsLoaded = false;
}
function openTools() {
   for (let i=0; i<tools.length; i++) {
      toolsIcon.style['border-bottom'] = '2px solid #3a3d45ff';
      tools[i].style.opacity = '100%';
      tools[i].style.visibility = 'visible';
      toolsContainer.style.visibility = 'visible';
   };
   return toolsLoaded = true;
}

//toggle tools when click
toolsIcon.onclick = () => {
   if (toolsLoaded) {
      return closeTools();
   } else {
      return openTools()
   };
}

const toolsInfo = [
   {
      toolNo: '1',
      id: 'rand-substance',
      loaded: false
   },
   {
      toolNo: '2',
      id: 'quick-maths',
      loaded: false
   },
   {
      toolNo: '3',
      id: 'placeholder2',
      loaded: false
   },
]

for (let i=0; i<tools.length; i++) {
   pixelCross[i].onclick = () => {
      document.getElementById(toolsInfo[i].id).style.display = 'none';
      toolsInfo[i].loaded = false;
   }
   tools[i].onclick = (element) => {
      //clicked element == either tool or tool icon
      if (element.target == tools[i] || element.target == document.getElementsByClassName('tool-icon')[i]) {
         // if tool clicked is not loaded
         if (!toolsInfo[i].loaded) {
            document.getElementById(toolsInfo[i].id).style.display = 'block';
            toolsInfo[i].loaded = true;
         // closes all other tools since opened one
            for (let n=0; n<tools.length; n++) {
               if (n != i && toolsInfo[n].loaded) {
                  document.getElementById(toolsInfo[n].id).style.display = 'none';
                  toolsInfo[n].loaded = false;
               };
            };
         };
      };
   };
};

// :quick maths

function generateRandInt(min, max) {
   let num = Math.floor(Math.random() * (max - min + 1)) + min;
   console.log("rand", num);
   return num;
}

var operators = {
   "+": function(a,b) {return a + b},
   "-": function(a,b) {return a - b},
   "*": function(a,b) {return a * b},
   "/": function(a,b) {return a / b},
}

$("#qm-start").click(qm_start)
function qm_start() {
   let correct_operations = 0;
   let time_elapsed = 0;
   let min_value = parseInt(QMMin.value);
   let max_value = parseInt(QMMax.value);
   let operator = OperatorInput.value
   rand_1 = generateRandInt(min_value, max_value);
   rand_2 = generateRandInt(min_value, max_value);
   Operand1.innerText = rand_1;
   Operand2.innerText = rand_2;
   QMOperator.innerText = operator;
   correct_result = Math.round(operators[operator](rand_1, rand_2));
   console.log(correct_result)
   let operations_per_min = setInterval(function(){
      time_elapsed += 2/60;
      console.log("hi")
      CalcSpeed.innerText = String(Math.round(correct_operations/time_elapsed *10)/10 + " opm");
   }, 2000) //every 2 seconds update opm (operations per min)

   OperationResult.addEventListener("keyup", function(event) {
      if (event.key === " ") {
         console.log("result",OperationResult.value)
         console.log("correct",correct_result)
         if (OperationResult.value == correct_result) {
            OperationCheck.innerText = "yes";
            rand_1 = generateRandInt(min_value, max_value);
            rand_2 = generateRandInt(min_value, max_value);
            Operand1.innerText = rand_1;
            Operand2.innerText = rand_2;
            correct_result = Math.round(operators[operator](rand_1, rand_2));
            QMOperator.innerText = operator;
            correct_operations += 1;
            OperationResult.value = "";
            console.log(correct_result)
         } else {
            OperationCheck.innerText = "no";
            OperationResult.value = "";
            Operand1.innerText = "_";
            Operand2.innerText = "_";
            return clearInterval(operations_per_min);
         }
      };
   })
};



// function toolInfo(toolNo, loaded) {
//    this.toolNo = toolNo
//    this.loaded = loaded
// }
// toolsInfo.push(new toolInfo(i+1, false));

// var outlineLength;
// // :outline
// function updateOutlineSections() {
//    outline.innerHTML = "";
//    let a = 0;
//    for (let i=0; i<subjectsData.length; i++) {
//       if (subjectsData[i].loaded) {
//          const subjectSections = document.getElementById(subjectsData[i].id).getElementsByClassName('year-num');
//          for (let subjectSectionNum=0; subjectSectionNum<subjectSections.length; subjectSectionNum++) {
//             let outlineSection = document.createElement("div");
//             let subjectName = document.createTextNode(subjectSections[subjectSectionNum].firstChild.data);
//             outlineSection.appendChild(subjectName);
//             outlineSection.classList.add("outline-section");
//             outline.appendChild(outlineSection);
//             if (a<outlineSections.length - 1) {
//                outlineSections[a].insertAdjacentHTML('afterend', `<div class="outline-divider-wrap"><div class="outline-section-name">${subjectSections[subjectSectionNum].firstChild.nextSibling.innerText}</div><div class="outline-divider"></div></div>`)
//                a++;
//             }
//          }
//       }
//    }
//    for (let outlineSectionNum=0; outlineSectionNum<outlineSections.length - 1; outlineSectionNum++) {
//       // let outlineDivider = document.createElement("div");
//       // outlineDivider.classList.add("outline-divider");
//       // outlineSections[outlineSectionNum].appendChild(outlineDivider)
//    }
// }
// //scroll into view
// document.getElementById("outline").onclick = () => {
//    for (let i=0; i<outlineSections.length; i++) {
//       outlineSections[i].onclick = () =>{
//          for (let u=0; u<subjectsData.length; u++) {
//             if (subjectsData[u].loaded) {
//                const subjectSections = document.getElementById(subjectsData[u].id).getElementsByClassName('year-num');
//                for (let subjectSectionNum=0; subjectSectionNum<subjectSections.length; subjectSectionNum++) {
//                   if (subjectSections[subjectSectionNum].firstChild.data == outlineSections[i].firstChild.data) {
//                      subjectSections[subjectSectionNum].scrollIntoView({ behavior: 'smooth', block: 'center' })
//                   }
//                }
//             }
//          }
//       }
//    }
// }


   // if (outline.getElementsByTagName("div")[i].innerHTML == ""


// function updateOutlineSections() {
// }
// for (let i=0; i<subjectsData.length; i++) {
//    if (subjectsData[i].loaded) {
//       const subjectSections = document.getElementById(subjectsData[i].id).getElementsByClassName('year-num')
//       for (let subjectSectionNum=0; subjectSectionNum<subjectSections.length; subjectSectionNum++) {
//          let outlineSection = document.createElement("div")
//          let subjectName = document.createTextNode(subjectSections[subjectSectionNum].firstChild.data)
//          outlineSection.appendChild(subjectName);
//          outlineSection.classList.add("outline-section");
//          outline.appendChild(outlineSection);
//       }
//    }
// }
// const outlineSection = document.get



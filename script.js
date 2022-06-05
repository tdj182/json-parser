let json = '';
function addButtons(buttonOptions) {
    let buttons = [];
    for(let i=0; i < buttonOptions.length; i++) {
        const button = document.createElement("button");
        button.classList.add("btn", "btn-primary");
        button.type = "button";
        switch(buttonOptions[i]) {
            case "keyValue": {
                button.innerText = "Add (Key : Value)";
                button.onclick = addKeyValuePair;
                break;
            }
            case "keyArray": {
                button.innerText = "Add (Key : Array)";
                button.onclick = addKeyArrayPair;
                break;
            }
            case "keyObject": {
                button.innerText = "Add (Key : Object)";
                button.onclick = addKeyObjectPair;
                break;
            }
            case "valueOnly": {
                button.innerText = "Add value";
                button.onclick = addInputBoxOnly;
                break;
            }
            default: {
                console.log("Error in switch")
            }
        }
        buttons.push(button);
    }
    return buttons;
}

function addInputBoxOnly(event, valuePreset="") {
    let parentElement = event.target.parentElement;

    /* wrapper element */
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("form-row");

    /* value section */
    columnDiv = addInput("valueOnly", valuePreset);
    rowDiv.append(columnDiv);

    /* append to page */
    parentElement.append(rowDiv);
}

/*
    div - form-row
        div - key-col
            input - key
        div - value column wrapper
            div - {
            div - value content
                button - key : value
                button - key : array
            div - }
*/
function addKeyObjectPair(event, keyPreset="") {
    let parentElement = event.target.parentElement;
    
    /* wrapper element */
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("form-row");
    
    /* key section */
    let columnDiv = addInput("key", keyPreset);
    rowDiv.append(columnDiv);

    /* value block wrapper */
    const valueObjectBlock = document.createElement("div"); 
    valueObjectBlock.classList.add("col-9")

    /* open bracket */
    let openBracket = document.createElement("div");
    openBracket.innerText = "{";
    openBracket.classList.add("open-bracket");
    valueObjectBlock.append(openBracket);

    /* value obj section  */
    columnDiv = document.createElement("div");
    columnDiv.classList.add("py-2")
    let buttons = addButtons(["keyValue", "keyArray", "keyObject"]);
    columnDiv.append(...buttons);
    valueObjectBlock.append(columnDiv);
    
    /* closing bracket */
    const closingBracket = document.createElement("div");
    closingBracket.innerText = "}";
    closingBracket.classList.add("close-bracket");
    valueObjectBlock.append(closingBracket);

    rowDiv.append(valueObjectBlock);

    /* append to page */
    parentElement.append(rowDiv);
}

function addKeyValuePair(event, keyPreset="", valuePreset="") {
    let parentElement = event.target.parentElement;

    /* wrapper element */
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("form-row");

    /* key section */
    let columnDiv = addInput("key", keyPreset);
    rowDiv.append(columnDiv);

    /* value section */
    columnDiv = addInput("valuePair", valuePreset);
    rowDiv.append(columnDiv);

    /* append to page */
    parentElement.append(rowDiv);
}

function addKeyArrayPair(event, keyPreset="") {
    let parentElement = event.target.parentElement;

    /* wrapper element */
    const rowDiv = document.createElement("div");
    rowDiv.classList.add("form-row");

    /* key section */
    let columnDiv = addInput("key", keyPreset);
    rowDiv.append(columnDiv);

    /* value block wrapper */
    const valueObjectBlock = document.createElement("div"); 
    valueObjectBlock.classList.add("col-9");
    
    /* open bracket */
    let openBracket = document.createElement("div");
    openBracket.innerText = "[";
    openBracket.classList.add("open-bracket");
    valueObjectBlock.append(openBracket);

    /* value array section */
    columnDiv = document.createElement("div");
    columnDiv.classList.add("py-2")
    let buttons = addButtons(["valueOnly"]);
    columnDiv.append(...buttons);
    valueObjectBlock.append(columnDiv);

    /* closing bracket */
    const closingBracket = document.createElement("div");
    closingBracket.innerText = "]";
    closingBracket.classList.add("close-bracket");
    valueObjectBlock.append(closingBracket);

    rowDiv.append(valueObjectBlock);

    /* append to page */
    parentElement.append(rowDiv);
}

function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

function createInputWithDelete(input, inputType="key") {
    /* div */
    let wrapperDiv = document.createElement("div");
    wrapperDiv.classList.add("d-flex", "flex-row");
    /* delete button */
    let deleteButton = document.createElement("button");
    deleteButton.innerText = "X";
    deleteButton.classList.add("btn", "btn-outline-danger", "delete-button");
    /* input */
    inputType === "key" ? input.classList.add("key-pair") : input.classList.add("value-pair")

    wrapperDiv.append(deleteButton, input);
    return wrapperDiv;
}

function addInput(type, startingValue) {
    /* div */
    let columnDiv = document.createElement("div");
    type === "key" ? columnDiv.classList.add("col") : columnDiv.classList.add("col-9");
    columnDiv.classList.add("py-2");

    /* input */
    let input = document.createElement("input");
    input.classList.add("form-control");
    if (type === "key") 
        input = createInputWithDelete(input, "key");
    else if (type === "valuePair")
        input.classList.add("value-pair")
    else if (type === "valueOnly")
        input = createInputWithDelete(input, "value");
        // input.classList.add("value-pair")
    
    if (startingValue !== "")
        input.value = startingValue;
    else
        type === "key" ? input.placeholder = "key" : input.placeholder = "value";

    columnDiv.append(input); 
    return columnDiv;
}


/* 
    check for parent -> parent -> next sibling 
    if no sibling, parent -> parent -> parent is the main form. In that case do nothing
    if not main form, check parent -> parent -> parent -> nextsibling
*/
function checkForClosingBrackets(currentElement) {
    if (currentElement.parentElement.parentElement.nextElementSibling === null) {
        let closingBracketCheck = currentElement.parentElement.parentElement.parentElement;
        if (closingBracketCheck.id !== "main-form" && closingBracketCheck.nextElementSibling.classList.contains("close-bracket")) {
            json += closingBracketCheck.nextElementSibling.innerText;
            checkForClosingBrackets(closingBracketCheck);
        }
    }
}

function handleArrayList(parentElement) {
    let listItems = parentElement.children[1].children;
    for (let i=1; i < listItems.length; i++) {
        inputStr = listItems[i].firstChild.firstChild.children[1].value;
        json += (onlyNumbers(inputStr)) ? `${inputStr}, ` : `"${inputStr}", `
        // json += `"${}", `
    }

    json = json.replace(/,\s*$/, "");
    listItems.length === 1 ? json += ']' : checkForClosingBrackets(listItems[listItems.length-1].firstChild.firstChild);
}

function generateJson() {
    clearJson();
    json = '{';
    const keys = document.querySelectorAll(".key-pair");
    const valuePairs = document.querySelectorAll(".value-pair");
    // const valuesOnly = document.querySelectorAll(".value-only");
    let arrayAndObjectCounter = 0;
    let arrayListItemCounter = 0

    for (let i=0; i < keys.length; i++) {
        /* add key */
        json += `"${keys[i].value}": `;

        /* used to check the value type of the key */
        let keyParentSibling = keys[i].parentElement.parentElement.nextElementSibling;
        firstChild = keyParentSibling.children[0];

        if (firstChild.classList.contains("value-pair")){
            let inputStr = valuePairs[i-arrayAndObjectCounter].value;
            if (onlyNumbers(inputStr)) 
                json += `${inputStr}`;
            else 
                json += `"${inputStr}"`;
            
            checkForClosingBrackets(valuePairs[i-arrayAndObjectCounter]);
            /* add comma for next key */
            json += `, `
        } else if (firstChild.classList.contains("open-bracket")){
            arrayAndObjectCounter++;
            json += firstChild.innerText;

            /* edge case for empty object (length === 3 because of the 3 buttons) */
            if (firstChild.innerText === "{" && keyParentSibling.children[1].children.length === 3){
                json += '}, ';
            }
            /* do array stuff */ 
            else if (firstChild.innerText === "["){
                handleArrayList(firstChild.parentElement);
                json += `, `
            }
        } 
    }

    json = json.replace(/,\s*$/, "");
    json += "}";

    document.getElementById("generated-json").value = json;
    console.log(json);
}

function onlyNumbers(str) {
    return /^[0-9]+$/.test(str);
}

function clearFormOptions() {
    const form = document.getElementById("main-form");
    form.innerHTML = '';
    let buttons = addButtons(["keyValue", "keyArray", "keyObject"]);
    form.append(...buttons);
}

function clearJson() {
    json = '';
}

function getHtmlValue() {
    let form = document.getElementById("main-form");
    console.log(form);
}

function refreshPage() {
    location.reload();
}

function onPageLoad() {
    let values = document.getElementsByClassName("value-pair");
    values[0].value = makeid(16);
}

onPageLoad();

/* delete form group */
$(document).on("click", ".delete-button", function(event){
    let formGroup = event.target.parentElement.parentElement.parentElement;
    formGroup.remove();
 });

$("#main-form").submit(function(e) {
    e.preventDefault(); // <==stop page refresh==>
});
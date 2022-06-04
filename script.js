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
    closingBracket.classList.add("open-bracket");
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
    let buttons = addButtons(["keyArray", "keyObject", "valueOnly"]);
    columnDiv.append(...buttons);
    valueObjectBlock.append(columnDiv);

    /* closing bracket */
    const closingBracket = document.createElement("div");
    closingBracket.innerText = "]";
    closingBracket.classList.add("open-bracket");
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

function addInput(type, startingValue) {
    /* div */
    let columnDiv = document.createElement("div");
    type === "key" ? columnDiv.classList.add("col") : columnDiv.classList.add("col-9");
    columnDiv.classList.add("py-2");

    /* input */
    let input = document.createElement("input");
    input.classList.add("form-control");
    if (type === "key") 
        input.classList.add("key-pair");
    else if (type === "valuePair")
        input.classList.add("value-pair")
    else if (type === "valueOnly")
        input.classList.add("value-pair")
    // type === "key" ? input.classList.add("key-pair") : input.classList.add("value-pair")
    if (startingValue !== "") {
        input.value = startingValue;
    } else {
        type === "key" ? input.placeholder = "key" : input.placeholder = "value";
    }

    columnDiv.append(input); 
    return columnDiv;
}

function generateDWMovesTemplate() {
    addKeyValuePair("_id", makeid(16));
    addKeyValuePair("name");
    addKeyValuePair("permission");
    addKeyValuePair("type");
    addKeyValuePair("data");
    addKeyValuePair("flags");
    addKeyValuePair("image");
}

function generateJson() {
    let json = '{';
    const keys = document.querySelectorAll(".key-pair");
    const valuePairs = document.querySelectorAll(".value-pair");
    const valuesOnly = document.querySelectorAll(".value-only");
    let arrayAndObjectCounter = 0;

    for (let i=0; i < keys.length; i++) {
        //get keys parent, and then sibling
        let keySibling = keys[i].nextSibling;
        if (keys[i])
        json += `"${keys[i].value}": `;
        json += `"${valuePairs[i].value}"`;
    }

    json += "}";
    console.log(json);
}

function getHtmlValue() {
    let form = document.getElementById("main-form");
    console.log(form);
}

// <!-- _id, name, permission, type, data, flags, image -->
// <!-- data: {name, description, rollType, rollMod, requiresLevel, requiresMove, class, moveType} -->

// generateDWMovesTemplate();
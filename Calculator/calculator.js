    const display = document.getElementById("display");

function appendToDisplay(input){
    display.value += input;


}

function ClearDisplay(){
    display.value= "" ;

}

function Calculate(){
    display.value = display.value.replace(/×/g, '*');
    display.value = eval(display.value);


}
function appendToDisplay(input) {
    if (input === "%") {
        display.value = eval(display.value) / 100; // Convert % into a division by 100 and convert to percencentage 
    } else {
        display.value += input;
    }
}

function appendToDisplay(input) {
    if (input === '*') {
        display.value += '×'; 
    } else {
        display.value += input;
    }
}

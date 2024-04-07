//selecting input boxs
let upperEl=document.querySelector('#uppercase');
let lowerEl=document.querySelector('#lowercase');
let numbers=document.querySelector('#numbers');
let symbols=document.querySelector('#symbols');
let lengthEl=document.querySelector('#length');

//result container
let resultEl=document.querySelector('#result');

//buttons

//copybutton
let copyEl = document.querySelector('#clipboard');

//generate button
let generateEl = document.querySelector('#generate');


//get random upperCase using acsii code table  65=>A 
function getUpperCase(){
    return  String.fromCharCode(Math.floor(Math.random()*26)+65);
}

//get random lowerCase using acsii code table  97=>a
function getLowerCase(){
    return  String.fromCharCode(Math.floor(Math.random()*26)+97);
}

//get random number 0-9
function getNumber(){
    return Math.floor(Math.random()*10)
}

//get special character
function getSpecialChar(){
    const symbols = '!@#$%^&*(){}[]=<>/,.'
    return symbols[Math.floor(Math.random()*symbols.length)]
}

//collections of needs
const randomFunc = {
	lower: getLowerCase,
	upper: getUpperCase,
	number: getNumber,
	symbol: getSpecialChar
}

//copy function
clipboard.addEventListener('click', () => {
    //create the new textarea that can select the the content 
    //caue of functionality limination and simplicity and reability 
    //input and text area can use .select method but the other id node or sth
	const textarea = document.createElement('textarea');
	const password = resultEl.innerText;
	//there is no value on password, return
	if(!password) { return; }

    //put value to textarea
	textarea.value = password;
    //setting node to body
	document.body.appendChild(textarea);
    //select and give command
	textarea.select();
	document.execCommand('copy');
    //remove the node
	textarea.remove();
	alert('Password copied to clipboard');
});

generateEl.addEventListener('click',()=>{
    const length = +lengthEl.value;
	const hasLower = lowerEl.checked;
	const hasUpper = upperEl.checked;
	const hasNumber = numbers.checked;
	const hasSymbol = symbols.checked;
	
	resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
})

//the function that can generate the random password
function generatePassword(lower, upper, number, symbol, length) {
    //variable that can receive the return value of specific rondom things 
	let generatedPassword = '';
    //check which are check or unchecked
	const typesCount = lower + upper + number + symbol;
    //filter the unchecked functions and store the object which has true value
    //the objects which have false value will be ommited
	const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item =>Object.values(item)[0]);
	
	// Doesn't have a selected type
	if(typesCount === 0) {
		return '';
	}
	
	// create a loop
	for(let i=0; i<length; i+=typesCount) {
		typesArr.forEach(type => {
			const funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}
	//cut the lenght what we want
	const finalPassword = generatedPassword.slice(0, length);
	
	return finalPassword;
}
const BooleanFunctions = {
    isName: function(inputString){
        if(!inputString.match(/^[A-Za-z]+$/)){
            return false;
        }
        else{
            return true;
        }
    },
    isGender:function(inputString){
        let inputStringToLowerCase = inputString.toLowerCase();
        if(!(inputStringToLowerCase ==='male' || inputStringToLowerCase ==='female')){
            return false;
        }
        else{
            return true;
        }
    },
    isBirthDate:function(inputString){
        let boolBirthMonth;
        let boolBirthDay;
        let boolBirthyear;
        if(inputString.match(/[/]/g).length === 2){
            var birthdateArray = inputString.split(/[/]/);
            boolBirthMonth = checkBirthMonth(birthdateArray[0]);
            boolBirthDay = checkBirthDay(birthdateArray[1]);
            boolBirthyear = checkBirthYear(birthdateArray[2]);
            if(boolBirthMonth && boolBirthDay && boolBirthyear) {
                return true;
            }
            else{
                return false;
            }
        }
        else{
            return false;
        }
    }
}
function checkBirthMonth(birthMonth){
    if((!isNaN(birthMonth)) && (birthMonth <= 12)){
        return true;
    }
    else{
        return false;
    }
}
function checkBirthDay(birthDay){
    if((!isNaN(birthDay)) && (birthDay <= 31)){
        return true;
    }
    else{
        return false;
    }
}
function checkBirthYear(birthYear){
    if((!isNaN(birthYear)) && (birthYear >=1000 && birthYear <=2019)){
        return true;
    }
    else{
        return false;
    }
}
module.exports = BooleanFunctions;
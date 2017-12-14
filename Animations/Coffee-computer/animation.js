var keyGroup = document.querySelectorAll('#groupeClavier rect'),
    codeGroup = document.querySelectorAll('#groupeCode path'),
    codeStatus = 0;

(function () {
    clearScreenCode();
    goCode();
})();

function clearScreenCode() {
    for (var i = 0 ; i < codeGroup.length ; i++) {
        codeGroup[i].style.display = 'none';
    }
}

function goCode(){

    setInterval(function () {
        if(codeStatus === codeGroup.length ) {
            clearScreenCode();
            codeStatus = 0;
        }
        KeyFrappe(MathRand(500));
    }, 80);
}

function KeyFrappe(delay) {
    setTimeout(function () {
        var randIndex = MathRand(keyGroup.length);
        keyGroup[randIndex].style.opacity = '0.5';
        setTimeout(function () {
            codeGroup[codeStatus].style.display = 'inline';
            keyGroup[randIndex].style.opacity = '1';
            codeStatus++;
        },80);
    }, delay);
}



/**
 * @return {number}
 */
function MathRand(nb) {
    return Math.floor(Math.random() * nb);
}
const game = (() => {
    let maxRange = 0,
        start = 0,
        end = 0,
        tries = 0,
        middle = 0,
        triesMaxNeeded = 0;

    let triesEl = document.querySelector('.tries--count');

    const getMaxNumber = () => {
        let value = document.getElementById('maxnumber').value;

        if (!value) {
            alert('Please enter the max nmbr!');
            return;
        }

        if (value <= 0 || isDecimalNumber(value)) {
            alert('Please enter a positive integer!');
            return;
        }

        setValues();

        document.querySelector('.game--range').classList.add('ds-none');
        document.querySelector('.bet--validation').classList.remove('ds-none');
        _startGame(true);
        document.querySelector('.tries--count').classList.remove('ds-none');

        function setValues() {
            maxRange = Number(value);
            end = maxRange;
            triesMaxNeeded = Math.ceil(Math.log2(end)) + 1; // +1 because the first guess is random
        }
    }

    const _startGame = (init) => {
        if (init) {
            resetTeam2Text();
        }

        tries++;
        middle = init ?
            Math.floor(Math.random() * (end + 1)) :
            Math.round((start + end) / 2);

        triesEl.textContent = `Tries: ${tries}`;
        document.getElementById('betnumber').value = `Is your nmbr ${middle} ?`;
    }

    const fixGuess = (action) => {
        if (action == 'higher') {
            start = middle + 1;

            if (start > maxRange) {
                start = maxRange;
            }
        } else {
            end = middle - 1;
        }
        _startGame();
    }

    const reset = () => {
        let textAlert = getTextAlert();
        alert(textAlert);
        setTimeout(() => {
            window.location.reload();
        });
    }

    const getTextAlert = () => {
        if (tries == 1) {
            return 'Wizard won in 1 try!'
        }
        else if (tries <= triesMaxNeeded) {
            return 'Wizard won in ' + tries + ' tries!'
        }
        else {
            return "You cheated me!";
        }
    }

    const resetTeam2Text = () => {
        document.getElementById('team2').textContent = "Team 2 will find your nmbr in at most " + triesMaxNeeded + " tries!";
    }

    return {
        getMaxNumber: getMaxNumber,
        fixGuess: fixGuess,
        reset: reset,
        getTextAlert: getTextAlert,
        resetTeam2Text: resetTeam2Text
    }
})();

function isDecimalNumber(number) {
    return number % 1 != 0;
}


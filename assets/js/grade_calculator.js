document.addEventListener('DOMContentLoaded', function() {

    const totals = [6, 5, 6, 5, 3, 3]; // Homework totals for HW1 to HW6

    function syncInputs(sliderId, numberId) {
        const slider = document.getElementById(sliderId);
        const numberInput = document.getElementById(numberId);

        if (slider && numberInput) {
            slider.addEventListener('input', function() {
                numberInput.value = slider.value;
            });
            numberInput.addEventListener('input', function() {
                if (Number(numberInput.value) > parseInt(numberInput.max)) {
                    numberInput.value = numberInput.max;
                }
                if (Number(numberInput.value) < parseInt(numberInput.min)) {
                    numberInput.value = numberInput.min;
                }
                slider.value = numberInput.value;
            });
        }
    }

    // Sync homework sliders and inputs
    for (let i = 1; i <= 6; i++) {
        syncInputs(`hw-${i}`, `hw-${i}-input`);
    }

    // Sync exam sliders and inputs
    syncInputs('midterm-score', 'midterm-score-input');
    syncInputs('final-score', 'final-score-input');


    const includeCheckboxes = document.querySelectorAll('.include');

    function updateRowState(checkbox) {
        const row = checkbox.closest('tr');
        const isChecked = checkbox.checked;
        
        if (isChecked) {
            row.classList.remove('disabled');
        } else {
            row.classList.add('disabled');
        }

        const inputs = row.querySelectorAll('input, select, button, textarea');
        inputs.forEach(input => {
            if (input !== checkbox) {
                input.disabled = !isChecked;
            }
        });
    }

    includeCheckboxes.forEach(checkbox => {
        // Set initial state
        updateRowState(checkbox);

        // Add event listener
        checkbox.addEventListener('change', () => {
            updateRowState(checkbox);
        });
    });

    // setting hw totals dynamically

    function setHomeworkTotals() {
        
        for (let i = 1; i <= 6; i++) {
            // setting the max attribute of each hw number input and slider
            const numberInput = document.getElementById(`hw-${i}-input`);
            const slider = document.getElementById(`hw-${i}`);
            if (numberInput) {
                numberInput.max = totals[i - 1];
            }
            if (slider) {
                slider.max = totals[i - 1];
            }
        }
    }

    setHomeworkTotals();




    // --- Social Learning Score Calculation -------------------------------



    /*Your engagement in social learning activities is vital for your success. 
    Each week, there are 5 events: 1 reading quiz, 2 lectures, 1 lab, and 1 study group.

    Your weekly social learning score for each week is determined as follows:

    Exemplary (3 social points): You receive a "Pass" for at least 4 events, including 
    a "Pass" on both the weekly lab and the reading quiz.
    Satisfactory (2 social points): You receive a "Pass" for at least 3 events, 
    including a "Pass" on at least one of the weekly lab or the reading quiz.
    Needs Improvement (1 social point): You receive a "Pass" for at least 2 events.
    Incomplete (0 social points): You receive a "Pass" for fewer than 2 events.*/

    // Calculate and update weekly social learning scores
    for (let week = 1; week <= 10; week++) {
        const checkboxes = [
            document.getElementById(`tu-lec-${week}`),
            document.getElementById(`th-lec-${week}`),
            document.getElementById(`lab-${week}`),
            document.getElementById(`study-group-${week}`),
            document.getElementById(`rq-${week}`)
        ];
        const scoreSpan = document.getElementById(`week-${week}-score`);

        function updateWeekScore() {
            let score = 0;
            checkboxes.forEach(checkbox => {
                if (checkbox && checkbox.checked) {
                    score++;
                }
            });
            if (score >= 4 && checkboxes[2].checked && checkboxes[4].checked) {
                scoreSpan.innerText = '3';
            } else if (score >= 3 && (checkboxes[2].checked || checkboxes[4].checked)) {
                scoreSpan.innerText = '2';
            } else if (score >= 2) {
                scoreSpan.innerText = '1';
            } else {
                scoreSpan.innerText = '0';
            }
        }

        checkboxes.forEach(checkbox => {
            if (checkbox) {
                checkbox.addEventListener('change', updateWeekScore);
            }
        });

        // Initial calculation
        updateWeekScore();
    }

    function calculateGradeModifier() {
        let totalSocialPoints = 0;
        let includedWeeks = 0;
        for (let w = 1; w <= 10; w++) {
            const weekIncludeCheckbox = document.getElementById(`week-${w}-include`);
            if (weekIncludeCheckbox && weekIncludeCheckbox.checked) {
                const weekScoreSpan = document.getElementById(`week-${w}-score`);
                if (weekScoreSpan) {
                    totalSocialPoints += parseInt(weekScoreSpan.innerText) || 0;
                }
                includedWeeks++;
            }
        }

        const gradeModifierDisplay = document.getElementById('grade-modifier-display');
        if (!gradeModifierDisplay) return;

        if (includedWeeks === 0) {
            gradeModifierDisplay.innerText = 'N/A';
            return;
        }

        const averageScore = totalSocialPoints / includedWeeks;
        const totalPossible = includedWeeks * 3; // Assuming max 3 points per week for calculation
        const percentage = totalSocialPoints / totalPossible;

        if (percentage >= 0.8) { // 24/30
            gradeModifierDisplay.innerText = 'Plus (+)';
        } else if (percentage >= 0.6) { // 18/30
            gradeModifierDisplay.innerText = 'No modifier';
        } else if (percentage >= 0.4) { // 12/30
            gradeModifierDisplay.innerText = 'Minus (-)';
        } else {
            gradeModifierDisplay.innerText = 'One letter grade reduction';
        }
    }

    // Recalculate modifier when any relevant input changes
    const allInputs = document.querySelectorAll('.calculator-container input');
    allInputs.forEach(input => {
        input.addEventListener('change', () => {
            // The weekly score is already updated by its own listener,
            // so we just need to recalculate the final modifier.
            calculateGradeModifier();
        });
    });

    // Initial calculation for grade modifier
    calculateGradeModifier();


    // --- End of Social Learning Score Calculation ----------------------------


    // --- Homework Score Calculation ------------------------------------------
    for (let i = 1; i <= 6; i++) {
        const numberInput = document.getElementById(`hw-${i}`);

        const scoreDisplay = document.getElementById(`hw-${i}-score`);

        function updateHomeworkScore() {
            let score = numberInput.value;
            if (score/totals[i - 1] === 1) {
                scoreDisplay.innerText = '3';
            } else if (score/totals[i - 1] >= 0.6) {
                scoreDisplay.innerText = '2';
            } else if (score/totals[i - 1] >= 0.4) {
                scoreDisplay.innerText = '1';
            } else {
                scoreDisplay.innerText = '0';
            }
        }

        numberInput.addEventListener('change', updateHomeworkScore);
    }

    for (let i = 1; i <= 6; i++) {
        const numberInput = document.getElementById(`hw-${i}-score`);
        const scoreDisplay = document.getElementById(`hw-total-display`);
        
        function updateHomeworkTotal() {
            let totalScore = 0;
            for (let j = 1; j <= 6; j++) {
                const hwScoreSpan = document.getElementById(`hw-${j}-score`);
                if (hwScoreSpan) {
                    totalScore += parseInt(hwScoreSpan.innerText);
                }
            }
            scoreDisplay.innerText = totalScore;
        }

        numberInput.addEventListener('change', updateHomeworkTotal);
    }

    // --- LocalStorage Persistence --------------------------------------------

    const storageKey = 'gradeCalculatorState';

    function saveState() {
        const state = {};
        const inputs = document.querySelectorAll('.calculator-container input');
        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                state[input.id] = input.checked;
            } else {
                state[input.id] = input.value;
            }
        });
        localStorage.setItem(storageKey, JSON.stringify(state));
    }

    function loadState() {
        const savedState = JSON.parse(localStorage.getItem(storageKey));
        if (!savedState) {
            return;
        }

        const inputs = document.querySelectorAll('.calculator-container input');
        inputs.forEach(input => {
            if (savedState[input.id] !== undefined) {
                if (input.type === 'checkbox') {
                    input.checked = savedState[input.id];
                } else {
                    input.value = savedState[input.id];
                }
            }
        });
    }

    // Load the state when the page loads
    loadState();

    // After loading, trigger updates to reflect the loaded state
    const allInputsForUpdate = document.querySelectorAll('.calculator-container input');
    allInputsForUpdate.forEach(input => {
        // Dispatch a change event to trigger all relevant listeners
        input.dispatchEvent(new Event('change', { 'bubbles': true }));
    });

    // Add a single listener to save state on any change
    document.querySelector('.calculator-container').addEventListener('change', saveState);
});

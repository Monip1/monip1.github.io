document.addEventListener('DOMContentLoaded', function() {

    const hwTotals = [6, 5, 6, 5, 3, 3]; // Homework totals for HW1 to HW6
    const hwThresholds = [[6, 3, 2], [5, 3, 2], [6, 3, 2], [5, 3, 2], [3, 2, 1], [3, 2, 1]]; // Thresholds for grades 3, 2, 1 respectively
    const examTotals = [30, 3]; // Exam totals for Midterm and Final
    const examThresholds = [[27, 24, 18], [3,2,1]]; // Thresholds for A, B, C respectively

    let hwGrades = [0, 0, 0, 0, 0, 0];
    let socialGrades = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let letterGradesFinal = [0, 0];

    let socialCheckboxes = []; // all the checkboxes for social learning

    let hwSliders = [document.getElementById('hw-1'),
                     document.getElementById('hw-2'),
                     document.getElementById('hw-3'),
                     document.getElementById('hw-4'),
                     document.getElementById('hw-5'),
                     document.getElementById('hw-6')];
                     
    let hwNumberInputs = [document.getElementById('hw-1-input'),
                          document.getElementById('hw-2-input'),
                          document.getElementById('hw-3-input'),
                          document.getElementById('hw-4-input'),
                          document.getElementById('hw-5-input'),
                          document.getElementById('hw-6-input')];

    for (let i = 1; i <= 10; i++) {
        const week = [];
        week.push(document.getElementById(`tu-lec-${i}`));
        week.push(document.getElementById(`th-lec-${i}`));
        week.push(document.getElementById(`lab-${i}`));
        week.push(document.getElementById(`study-group-${i}`));
        week.push(document.getElementById(`rq-${i}`));

        socialCheckboxes.push(week);
    }

    for (let i = 0; i < socialCheckboxes.length; i++) {
        for (let j = 0; j < socialCheckboxes[i].length; j++) {
            socialCheckboxes[i][j].addEventListener('change', function() {
                updateTotals();
                console.log("updated");
            });
        }
    }

    for (let i = 0; i < hwSliders.length; i++) {
        hwSliders[i].setAttribute('max', hwTotals[i]);
        hwNumberInputs[i].setAttribute('max', hwTotals[i]);

        hwSliders[i].addEventListener('input', function() {
            hwNumberInputs[i].value = hwSliders[i].value;
            updateTotals();
        });

        hwNumberInputs[i].addEventListener('input', function() {
            if (Number(hwNumberInputs[i].value) > parseInt(hwNumberInputs[i].max)) {
                hwNumberInputs[i].value = hwNumberInputs[i].max;
            }
            if (Number(hwNumberInputs[i].value) < parseInt(hwNumberInputs[i].min)) {
                hwNumberInputs[i].value = hwNumberInputs[i].min;
            }
            hwSliders[i].value = hwNumberInputs[i].value;
            updateTotals();
        });
    }

    const finalScoreSlider = document.getElementById('final-score');
    const finalScoreInput = document.getElementById('final-score-input');
    finalScoreSlider.setAttribute('max', examTotals[1]);
    finalScoreInput.setAttribute('max', examTotals[1]);

    finalScoreSlider.addEventListener('input', function() {
        finalScoreInput.value = finalScoreSlider.value;
        updateTotals();
    });
    finalScoreInput.addEventListener('input', function() {
        if (Number(finalScoreInput.value) > parseInt(finalScoreInput.max)) {
            finalScoreInput.value = finalScoreInput.max;
        }
        if (Number(finalScoreInput.value) < parseInt(finalScoreInput.min)) {
            finalScoreInput.value = finalScoreInput.min;
        }
        finalScoreSlider.value = finalScoreInput.value;
        updateTotals();
    });

    const midtermScoreSlider = document.getElementById('midterm-score');
    const midtermScoreInput = document.getElementById('midterm-score-input');
    midtermScoreSlider.setAttribute('max', examTotals[0]);
    midtermScoreInput.setAttribute('max', examTotals[0]);

    midtermScoreSlider.addEventListener('input', function() {
        midtermScoreInput.value = midtermScoreSlider.value;
        updateTotals();
    });
    midtermScoreInput.addEventListener('input', function() {
        if (Number(midtermScoreInput.value) > parseInt(midtermScoreInput.max)) {
            midtermScoreInput.value = midtermScoreInput.max;
        }
        if (Number(midtermScoreInput.value) < parseInt(midtermScoreInput.min)) {
            midtermScoreInput.value = midtermScoreInput.min;
        }
        midtermScoreSlider.value = midtermScoreInput.value;
        updateTotals();
    });

    let socialIncludes = 0;
    let hwIncludes = 0;

    for (let i = 1; i <= 10; i++) {
        const includeCheckbox = document.getElementById(`week-${i}-include`);
        socialIncludes += includeCheckbox.checked ? 1 : 0;
        console.log("include checkbox", includeCheckbox.checked);
        document.getElementById(`week-${i}-row`).classList.toggle('disabled', !includeCheckbox.checked);
        
        for (let j = 0; j < socialCheckboxes[i - 1].length; j++) {
            if (!includeCheckbox.checked) {
                socialCheckboxes[i - 1][j].disabled = true;
            } else {
                socialCheckboxes[i - 1][j].disabled = false;
            }
        }

        includeCheckbox.addEventListener('change', function() {
            socialIncludes += includeCheckbox.checked ? 1 : -1;
            document.getElementById(`week-${i}-row`).classList.toggle('disabled', !includeCheckbox.checked);
            for (let j = 0; j < socialCheckboxes[i - 1].length; j++) {
                if (!includeCheckbox.checked) {
                    socialCheckboxes[i - 1][j].disabled = true;
                } else {
                    socialCheckboxes[i - 1][j].disabled = false;
                }
            }

            updateTotals();
        });
    }

    for (let i = 1; i <= 6; i++) {
        const includeCheckbox = document.getElementById(`hw-${i}-include`);
        hwIncludes += includeCheckbox.checked ? 1 : 0;

        document.getElementById(`hw-${i}-row`).classList.toggle('disabled', !includeCheckbox.checked);

        for (let j = 0; j < hwSliders.length; j++) {
            if (!includeCheckbox.checked) {
                hwSliders[i - 1].disabled = true;
                hwNumberInputs[i - 1].disabled = true;
            } else {
                hwSliders[i - 1].disabled = false;
                hwNumberInputs[i - 1].disabled = false;
            }
        }

        includeCheckbox.addEventListener('change', function() {
            hwIncludes += includeCheckbox.checked ? 1 : -1;
            document.getElementById(`hw-${i}-row`).classList.toggle('disabled', !includeCheckbox.checked);
            for (let j = 0; j < hwSliders.length; j++) {
                if (!includeCheckbox.checked) {
                    hwSliders[i - 1].disabled = true;
                    hwNumberInputs[i - 1].disabled = true;
                } else {
                    hwSliders[i - 1].disabled = false;
                    hwNumberInputs[i - 1].disabled = false;
                }
            }
            updateTotals();
        });
    }

    document.getElementById('midterm-row').classList.toggle('disabled', !document.getElementById('midterm-include').checked);
    document.getElementById('midterm-score').disabled = !document.getElementById('midterm-include').checked;
    document.getElementById('midterm-score-input').disabled = !document.getElementById('midterm-include').checked;
    document.getElementById('midterm-include').addEventListener('change', function() {
        midtermIncludes = document.getElementById('midterm-include').checked ? 1 : 0;
        document.getElementById('midterm-row').classList.toggle('disabled', !document.getElementById('midterm-include').checked);
        document.getElementById('midterm-score').disabled = !document.getElementById('midterm-include').checked;
        document.getElementById('midterm-score-input').disabled = !document.getElementById('midterm-include').checked;
        updateTotals();
    });

    document.getElementById('final-row').classList.toggle('disabled', !document.getElementById('final-include').checked);
    document.getElementById('final-score').disabled = !document.getElementById('final-include').checked;
    document.getElementById('final-score-input').disabled = !document.getElementById('final-include').checked;
    document.getElementById('final-include').addEventListener('change', function() {
        finalIncludes = document.getElementById('final-include').checked ? 1 : 0;
        document.getElementById('final-row').classList.toggle('disabled', !document.getElementById('final-include').checked);
        document.getElementById('final-score').disabled = !document.getElementById('final-include').checked;
        document.getElementById('final-score-input').disabled = !document.getElementById('final-include').checked;
        updateTotals();
    });



    // --- Functions to update totals and grades -------------------------------


    function updateTotals() {
        // Update social grades
        updateSocialGrades();

        // Update homework grades
        updateHomeworkGrades();

        updateExamTotals();

        // Update displays
        updateDisplays();
    }


    function updateSocialGrades() { 
        for (let i = 0; i < socialCheckboxes.length; i++) {
            let score = 0;
            for (let j = 0; j < socialCheckboxes[i].length; j++) {
                if (socialCheckboxes[i][j].checked) {
                    score++;
                }
                if (score >= 4 && socialCheckboxes[i][2].checked && socialCheckboxes[i][4].checked) {
                    socialGrades[i] = 3;
                } else if (score >= 3 && (socialCheckboxes[i][2].checked || socialCheckboxes[i][4].checked)) {
                    socialGrades[i] = 2;
                } else if (score >= 2) {
                    socialGrades[i] = 1;
                } else {
                    socialGrades[i] = 0;
                }
            }
        }

        const gradeModifierDisplay = document.getElementById('social-result-total');
        const socialScoreTotal = document.getElementById('social-score-total');
        const socialPossibleTotal = document.getElementById('social-possible-total');
        let socialSum = 0;

        for (let i = 0; i < socialGrades.length; i++) {
            socialSum += socialGrades[i];
        }

        if (socialIncludes === 0) {
            gradeModifierDisplay.innerText = 'N/A';
            socialScoreTotal.innerText = 'N/A';
            socialPossibleTotal.innerText = 'N/A';
            return;
        }

        const totalPossible = socialIncludes * 3; 
        const percentage = socialSum / totalPossible;
        socialScoreTotal.innerText = socialSum;
        socialPossibleTotal.innerText = totalPossible;
        
        if (percentage >= 0.8) { 
            gradeModifierDisplay.innerText = 'Plus (+)';
        } else if (percentage >= 0.6) { 
            gradeModifierDisplay.innerText = 'No modifier';
        } else if (percentage >= 0.4) { 
            gradeModifierDisplay.innerText = 'Minus (-)';
        } else {
            gradeModifierDisplay.innerText = 'One letter grade reduction';
        }
        console.log("totals updated", socialGrades, socialSum, socialIncludes);
    }

    function updateHomeworkGrades() {
        for (let i = 0; i < hwSliders.length; i++) {
            let score = hwSliders[i].value;
            console.log("hw score", score, typeof(score), hwThresholds[i]);
            if (Number(score) === hwThresholds[i][0]) {
                hwGrades[i] = 3;
            } else if (Number(score) >= hwThresholds[i][1]) {
                hwGrades[i] = 2;
            } else if (Number(score) >= hwThresholds[i][2]) {
                hwGrades[i] = 1;
            } else {
                hwGrades[i] = 0;
            }
        }

        const hwScoreTotal = document.getElementById('hw-score-total');
        const hwPossibleTotal = document.getElementById('hw-possible-total');
        const hwResultTotal = document.getElementById('hw-result-total');

        let hwSum = 0;

        for (let i = 0; i < hwGrades.length; i++) {
            hwSum += hwGrades[i];
        }

        if (hwIncludes === 0) {
            hwResultTotal.innerText = 'N/A';
            hwScoreTotal.innerText = 'N/A';
            hwPossibleTotal.innerText = 'N/A';
            return;
        }

        const totalPossible = hwIncludes * 3; 
        hwScoreTotal.innerText = hwSum;
        hwPossibleTotal.innerText = totalPossible;
        if (hwSum / totalPossible >= (15/18)) {
            hwResultTotal.innerText = 'A';
        } else if (hwSum / totalPossible >= (12/18)) {
            hwResultTotal.innerText = 'B';
        } else if (hwSum / totalPossible >= (9/18)) {
            hwResultTotal.innerText = 'C';
        } else {
            hwResultTotal.innerText = 'F';
        }
        console.log("hw totals updated", hwGrades, hwSum, hwIncludes);

    }

    function updateExamTotals() {
        const midtermScoreInput = document.getElementById('midterm-score');
        const finalScoreInput = document.getElementById('final-score');
        const midTermIncludeCheckbox = document.getElementById('midterm-include');
        const finalIncludeCheckbox = document.getElementById('final-include');

        const midtermScoreDisplay = document.getElementById('midterm-score-display');
        const finalScoreDisplay = document.getElementById('final-score-display');

        const examScoreTotal = document.getElementById('exam-score-total');
        const examPossibleTotal = document.getElementById('exam-possible-total');

        const midtermScore = Number(midtermScoreInput.value) || 0;
        const finalScore = Number(finalScoreInput.value) || 0;

        let scores = [0, 0];

        if (midtermScore >= examThresholds[0][0]) {
            scores[0] = 3;
            midtermScoreDisplay.innerText = '3';
        } else if (midtermScore >= examThresholds[0][1]) {
            scores[0] = 2;
            midtermScoreDisplay.innerText = '2';
        } else if (midtermScore >= examThresholds[0][2]) {
            scores[0] = 1;
            midtermScoreDisplay.innerText = '1';
        } else {
            scores[0] = 0;
            midtermScoreDisplay.innerText = '0';
        }

        if (finalScore >= examThresholds[1][0]) {
            scores[1] = 3;
            finalScoreDisplay.innerText = '3';
        } else if (finalScore >= examThresholds[1][1]) {
            scores[1] = 2;
            finalScoreDisplay.innerText = '2';
        } else if (finalScore >= examThresholds[1][2]) {
            scores[1] = 1;
            finalScoreDisplay.innerText = '1';
        } else {
            scores[1] = 0;
            finalScoreDisplay.innerText = '0';
        }

        let totalPossible = 0;
        if (midTermIncludeCheckbox.checked) {
            totalPossible += 3;
        }
        if (finalIncludeCheckbox.checked) {
            totalPossible += 3;
        }

        if (totalPossible === 0) {
            document.getElementById('exam-result-total').innerText = 'N/A';
            document.getElementById('exam-score-total').innerText = 'N/A';
            document.getElementById('exam-possible-total').innerText = 'N/A';
            return;
        }
        console.log(totalPossible);
        
        let totalScore = 0;
        if (scores[0] < scores[1]) {
            totalScore = 2 * scores[1];
        } else {
            totalScore = scores[0] + scores[1];
        }

        examScoreTotal.innerText = totalScore;
        examPossibleTotal.innerText = totalPossible;

        if (totalScore / totalPossible === 1) {
            letterGradesFinal[1] = 3;
            document.getElementById('exam-result-total').innerText = 'A';
        } else if (totalScore / totalPossible >= (4/6)) {
            letterGradesFinal[1] = 2;
            document.getElementById('exam-result-total').innerText = 'B';
        } else if (totalScore / totalPossible >= (2/6)) {
            letterGradesFinal[1] = 1;
            document.getElementById('exam-result-total').innerText = 'C';
        } else {
            letterGradesFinal[1] = 0;
            document.getElementById('exam-result-total').innerText = 'F';
        }
    }


    function updateDisplays() {
        for (let i = 1; i <= 10; i++) {
            const display = document.getElementById(`week-${i}-score`);
            display.innerText = socialGrades[i - 1];
        }

        // implement hw

        for (let i = 1; i <= 6; i++) {
            const display = document.getElementById(`hw-${i}-score`);
            display.innerText = hwGrades[i - 1];
        }
    }
    // function syncInputs(sliderId, numberId) {
    //     const slider = document.getElementById(sliderId);
    //     const numberInput = document.getElementById(numberId);

    //     if (slider && numberInput) {
    //         slider.addEventListener('input', function() {
    //             numberInput.value = slider.value;
    //         });
    //         numberInput.addEventListener('input', function() {
    //             if (Number(numberInput.value) > parseInt(numberInput.max)) {
    //                 numberInput.value = numberInput.max;
    //             }
    //             if (Number(numberInput.value) < parseInt(numberInput.min)) {
    //                 numberInput.value = numberInput.min;
    //             }
    //             slider.value = numberInput.value;
    //         });
    //     }
    // }

    // // Sync homework sliders and inputs
    // for (let i = 1; i <= 6; i++) {
    //     syncInputs(`hw-${i}`, `hw-${i}-input`);
    // }

    // // Sync exam sliders and inputs
    // syncInputs('midterm-score', 'midterm-score-input');
    // syncInputs('final-score', 'final-score-input');


    // const includeCheckboxes = document.querySelectorAll('.include');

    // function updateRowState(checkbox) {
    //     const row = checkbox.closest('tr');
    //     const isChecked = checkbox.checked;
        
    //     if (isChecked) {
    //         row.classList.remove('disabled');
    //     } else {
    //         row.classList.add('disabled');
    //     }

    //     const inputs = row.querySelectorAll('input, select, button, textarea');
    //     inputs.forEach(input => {
    //         if (input !== checkbox) {
    //             input.disabled = !isChecked;
    //         }
    //     });
    // }

    // includeCheckboxes.forEach(checkbox => {
    //     // Set initial state
    //     updateRowState(checkbox);

    //     // Add event listener
    //     checkbox.addEventListener('change', () => {
    //         updateRowState(checkbox);
    //     });
    // });

    // // setting hw totals dynamically

    // function setHomeworkTotals() {
        
    //     for (let i = 1; i <= 6; i++) {
    //         // setting the max attribute of each hw number input and slider
    //         const numberInput = document.getElementById(`hw-${i}-input`);
    //         const slider = document.getElementById(`hw-${i}`);
    //         if (numberInput) {
    //             numberInput.max = totals[i - 1];
    //         }
    //         if (slider) {
    //             slider.max = totals[i - 1];
    //         }
    //     }
    // }

    // setHomeworkTotals();




    // // --- Social Learning Score Calculation -------------------------------



    // /*Your engagement in social learning activities is vital for your success. 
    // Each week, there are 5 events: 1 reading quiz, 2 lectures, 1 lab, and 1 study group.

    // Your weekly social learning score for each week is determined as follows:

    // Exemplary (3 social points): You receive a "Pass" for at least 4 events, including 
    // a "Pass" on both the weekly lab and the reading quiz.
    // Satisfactory (2 social points): You receive a "Pass" for at least 3 events, 
    // including a "Pass" on at least one of the weekly lab or the reading quiz.
    // Needs Improvement (1 social point): You receive a "Pass" for at least 2 events.
    // Incomplete (0 social points): You receive a "Pass" for fewer than 2 events.*/

    // // Calculate and update weekly social learning scores
    // for (let week = 1; week <= 10; week++) {
    //     const checkboxes = [
    //         document.getElementById(`tu-lec-${week}`),
    //         document.getElementById(`th-lec-${week}`),
    //         document.getElementById(`lab-${week}`),
    //         document.getElementById(`study-group-${week}`),
    //         document.getElementById(`rq-${week}`)
    //     ];
    //     const scoreSpan = document.getElementById(`week-${week}-score`);

    //     function updateWeekScore() {
    //         let score = 0;
    //         checkboxes.forEach(checkbox => {
    //             if (checkbox && checkbox.checked) {
    //                 score++;
    //             }
    //         });
    //         if (score >= 4 && checkboxes[2].checked && checkboxes[4].checked) {
    //             scoreSpan.innerText = '3';
    //         } else if (score >= 3 && (checkboxes[2].checked || checkboxes[4].checked)) {
    //             scoreSpan.innerText = '2';
    //         } else if (score >= 2) {
    //             scoreSpan.innerText = '1';
    //         } else {
    //             scoreSpan.innerText = '0';
    //         }
    //     }

    //     checkboxes.forEach(checkbox => {
    //         if (checkbox) {
    //             checkbox.addEventListener('change', updateWeekScore);
    //         }
    //     });

    //     // Initial calculation
    //     updateWeekScore();
    // }

    // function calculateGradeModifier() {
    //     let totalSocialPoints = 0;
    //     let includedWeeks = 0;
    //     for (let w = 1; w <= 10; w++) {
    //         const weekIncludeCheckbox = document.getElementById(`week-${w}-include`);
    //         if (weekIncludeCheckbox && weekIncludeCheckbox.checked) {
    //             const weekScoreSpan = document.getElementById(`week-${w}-score`);
    //             if (weekScoreSpan) {
    //                 totalSocialPoints += parseInt(weekScoreSpan.innerText) || 0;
    //             }
    //             includedWeeks++;
    //         }
    //     }

    //     const gradeModifierDisplay = document.getElementById('grade-modifier-display');
    //     if (!gradeModifierDisplay) return;

    //     if (includedWeeks === 0) {
    //         gradeModifierDisplay.innerText = 'N/A';
    //         return;
    //     }

    //     const averageScore = totalSocialPoints / includedWeeks;
    //     const totalPossible = includedWeeks * 3; // Assuming max 3 points per week for calculation
    //     const percentage = totalSocialPoints / totalPossible;

    //     if (percentage >= 0.8) { // 24/30
    //         gradeModifierDisplay.innerText = 'Plus (+)';
    //     } else if (percentage >= 0.6) { // 18/30
    //         gradeModifierDisplay.innerText = 'No modifier';
    //     } else if (percentage >= 0.4) { // 12/30
    //         gradeModifierDisplay.innerText = 'Minus (-)';
    //     } else {
    //         gradeModifierDisplay.innerText = 'One letter grade reduction';
    //     }
    // }

    // // Recalculate modifier when any relevant input changes
    // const allInputs = document.querySelectorAll('.calculator-container input');
    // allInputs.forEach(input => {
    //     input.addEventListener('change', () => {
    //         // The weekly score is already updated by its own listener,
    //         // so we just need to recalculate the final modifier.
    //         calculateGradeModifier();
    //     });
    // });

    // // Initial calculation for grade modifier
    // calculateGradeModifier();


    // // --- End of Social Learning Score Calculation ----------------------------


    // // --- Homework Score Calculation ------------------------------------------
    // for (let i = 1; i <= 6; i++) {
    //     const numberInput = document.getElementById(`hw-${i}`);

    //     const scoreDisplay = document.getElementById(`hw-${i}-score`);

    //     function updateHomeworkScore() {
    //         let score = numberInput.value;
    //         if (score/totals[i - 1] === 1) {
    //             scoreDisplay.innerText = '3';
    //         } else if (score/totals[i - 1] >= 0.6) {
    //             scoreDisplay.innerText = '2';
    //         } else if (score/totals[i - 1] >= 0.4) {
    //             scoreDisplay.innerText = '1';
    //         } else {
    //             scoreDisplay.innerText = '0';
    //         }
    //     }

    //     numberInput.addEventListener('change', updateHomeworkScore);
    // }

    // for (let i = 1; i <= 6; i++) {
    //     const numberInput = document.getElementById(`hw-${i}-score`);
    //     const scoreDisplay = document.getElementById(`hw-total-display`);
        
    //     function updateHomeworkTotal() {
    //         let totalScore = 0;
    //         for (let j = 1; j <= 6; j++) {
    //             const hwScoreSpan = document.getElementById(`hw-${j}-score`);
    //             if (hwScoreSpan) {
    //                 totalScore += parseInt(hwScoreSpan.innerText);
    //             }
    //         }
    //         scoreDisplay.innerText = totalScore;
    //     }

    //     numberInput.addEventListener('change', updateHomeworkTotal);
    // }

    // // --- LocalStorage Persistence --------------------------------------------

    // const storageKey = 'gradeCalculatorState';

    // function saveState() {
    //     const state = {};
    //     const inputs = document.querySelectorAll('.calculator-container input');
    //     inputs.forEach(input => {
    //         if (input.type === 'checkbox') {
    //             state[input.id] = input.checked;
    //         } else {
    //             state[input.id] = input.value;
    //         }
    //     });
    //     localStorage.setItem(storageKey, JSON.stringify(state));
    // }

    // function loadState() {
    //     const savedState = JSON.parse(localStorage.getItem(storageKey));
    //     if (!savedState) {
    //         return;
    //     }

    //     const inputs = document.querySelectorAll('.calculator-container input');
    //     inputs.forEach(input => {
    //         if (savedState[input.id] !== undefined) {
    //             if (input.type === 'checkbox') {
    //                 input.checked = savedState[input.id];
    //             } else {
    //                 input.value = savedState[input.id];
    //             }
    //         }
    //     });
    // }

    // // Load the state when the page loads
    // loadState();

    // // After loading, trigger updates to reflect the loaded state
    // const allInputsForUpdate = document.querySelectorAll('.calculator-container input');
    // allInputsForUpdate.forEach(input => {
    //     // Dispatch a change event to trigger all relevant listeners
    //     input.dispatchEvent(new Event('change', { 'bubbles': true }));
    // });

    // // Add a single listener to save state on any change
    // document.querySelector('.calculator-container').addEventListener('change', saveState);
});

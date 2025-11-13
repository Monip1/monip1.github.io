document.addEventListener('DOMContentLoaded', function() {

    const hwTotals = [6, 5, 6, 5, 3, 3]; // Homework totals for HW1 to HW6
    const hwThresholds = [[6, 3, 2], [5, 3, 2], [6, 3, 2], [5, 3, 2], [3, 2, 1], [3, 2, 1]]; // Thresholds for grades 3, 2, 1 respectively
    const examTotals = [30, 3]; // Exam totals for Midterm and Final
    const examThresholds = [[27, 24, 18], [3,2,1]]; // Thresholds for A, B, C respectively

    let hwGrades = [0, 0, 0, 0, 0, 0];
    let socialGrades = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

    let letterGradesFinal = [0, 0, 0];

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
            letterGradesFinal[2] = null;
            return;
        }

        const totalPossible = socialIncludes * 3; 
        const percentage = socialSum / totalPossible;
        socialScoreTotal.innerText = socialSum;
        socialPossibleTotal.innerText = totalPossible;
        
        if (percentage >= 0.8) { 
            gradeModifierDisplay.innerText = 'Plus (+)';
            letterGradesFinal[2] = 3;
        } else if (percentage >= 0.6) { 
            gradeModifierDisplay.innerText = 'No modifier';
            letterGradesFinal[2] = 2;
        } else if (percentage >= 0.4) { 
            gradeModifierDisplay.innerText = 'Minus (-)';
            letterGradesFinal[2] = 1;
        } else {
            gradeModifierDisplay.innerText = 'One letter grade reduction';
            letterGradesFinal[2] = 0;
        }
    }

    function updateHomeworkGrades() {
        for (let i = 0; i < hwSliders.length; i++) {
            let score = hwSliders[i].value;
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
            letterGradesFinal[0] = null;
            return;
        }

        const totalPossible = hwIncludes * 3; 
        hwScoreTotal.innerText = hwSum;
        hwPossibleTotal.innerText = totalPossible;
        if (hwSum / totalPossible >= (15/18)) {
            letterGradesFinal[0] = 3;
            hwResultTotal.innerText = 'A';
        } else if (hwSum / totalPossible >= (12/18)) {
            letterGradesFinal[0] = 2;
            hwResultTotal.innerText = 'B';
        } else if (hwSum / totalPossible >= (9/18)) {
            letterGradesFinal[0] = 1;
            hwResultTotal.innerText = 'C';
        } else {
            letterGradesFinal[0] = 0;
            hwResultTotal.innerText = 'F';
        }
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
            letterGradesFinal[1] = null;
            return;
        }

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

        let baseLetterGrade = 0;
        console.log("final grade array", letterGradesFinal);

        if (letterGradesFinal[0] === null || letterGradesFinal[1] === null || letterGradesFinal[2] === null) {
            document.getElementById('final-grade-total').innerText = 'N/A';
            return;
        }

        if (letterGradesFinal[0] !== null && letterGradesFinal[1] !== null) {
            baseLetterGrade = Math.min(letterGradesFinal[0], letterGradesFinal[1]);
        }
        else if (letterGradesFinal[0] !== null) {
            baseLetterGrade = letterGradesFinal[0];
        }
        else if (letterGradesFinal[1] !== null) {
            baseLetterGrade = letterGradesFinal[1];
        }
        else {
            document.getElementById('final-grade-total').innerText = 'N/A';
            return;
        }

        let modifier = letterGradesFinal[2];

        const grades = ['F', 'C', 'B', 'A'];

        console.log("final grade calc", baseLetterGrade, modifier);

        // document.getElementById('final-grade-total').innerText = grades[modifier === 0 ? (baseLetterGrade - 1) < 0 ? 0 : baseLetterGrade - 1 : baseLetterGrade] + (modifier === 3 ? '+' : (modifier === 2 ? '' : (modifier === 1 ? '-' : '')));
        // ignore this abomination

        if (modifier === 0 && baseLetterGrade !== 0) {
            baseLetterGrade -= 1;
        } 

        let gradeModifierDisplay = '';
        if (modifier === 3) {
            gradeModifierDisplay = '+';
        }
        else if (modifier === 2) {
            gradeModifierDisplay = '';
        }
        else if (modifier === 1) {
            gradeModifierDisplay = '-';
        } 

        document.getElementById('final-grade-total').innerText = grades[baseLetterGrade] + gradeModifierDisplay;

    }

    // --- Local Storage Persistence -------------------------------------------
    function saveToLocalStorage() {
    }
    
});

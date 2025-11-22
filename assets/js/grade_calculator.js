document.addEventListener('DOMContentLoaded', () => {
    new GradeCalculator();
});

const CONFIG = {
    hw: {
        count: 6,
        maxScore: 3,
        thresholds: [3, 2, 1] 
    },
    exams: {
        count: 2,
        maxScore: 3,
        thresholds: [3, 2, 1]
    },
    social: {
        weeks: 10,
        itemsPerWeek: 5,
        mandatoryIndices: [2, 4] // Lab(2) and StudyGroup(4)
    },
    grading: {
        labels: ['F', 'C', 'B', 'A'], 
        modifiers: ['One letter grade reduction', 'Minus (-)', 'No modifier', 'Plus (+)']
    }
};

class GradeCalculator {
    constructor() {
        // 1. Initialize State
        this.mode = 'simple'; // 'simple' or 'advanced'

        this.state = {
            hw: Array(CONFIG.hw.count).fill(0),
            social: Array.from({ length: CONFIG.social.weeks }, () => Array(CONFIG.social.itemsPerWeek).fill(false)),
            exams: { midterm: 0, final: 0 }
        };

        // 2. Cache DOM Elements
        this.ui = this.cacheDOMElements();

        // 3. Load Data & Bind Events
        this.loadFromStorage();
        this.bindEvents();
        
        // 4. Initial Render
        this.toggleMode('simple'); // Default to simple
        this.update();
    }

    cacheDOMElements() {
        const get = (id) => document.getElementById(id);
        
        const getHwElements = (suffix) => 
            Array.from({ length: CONFIG.hw.count }, (_, i) => get(`hw-${i + 1}${suffix}`));
        
        const getSocialElements = () => {
            const weeks = [];
            const types = ['tu-lec', 'th-lec', 'lab', 'study-group', 'rq'];
            for (let i = 1; i <= CONFIG.social.weeks; i++) {
                weeks.push(types.map(type => get(`${type}-${i}`)));
            }
            return weeks;
        };

        return {
            mode: {
                simpleBtn: get('btn-simple'),
                advancedBtn: get('btn-advanced'),
                simplePanel: get('simple-ui'),
                advancedPanel: get('advanced-ui')
            },
            simple: {
                hw: get('simple-hw'),
                exam: get('simple-exam'),
                social: get('simple-social')
            },
            hw: {
                sliders: getHwElements(''),
                inputs: getHwElements('-input'),
                scores: getHwElements('-score')
            },
            social: {
                checkboxes: getSocialElements(),
                weekScores: Array.from({ length: CONFIG.social.weeks }, (_, i) => get(`week-${i + 1}-score`))
            },
            exams: {
                midtermSlider: get('midterm-score'),
                midtermInput: get('midterm-score-input'),
                midtermDisplay: get('midterm-score-display'),
                finalSlider: get('final-score'),
                finalInput: get('final-score-input'),
                finalDisplay: get('final-score-display')
            },
            explanationDisplay: get('grade-explanation') 
        };
    }

    bindEvents() {
        // Toggle Buttons
        this.ui.mode.simpleBtn.addEventListener('click', () => this.toggleMode('simple'));
        this.ui.mode.advancedBtn.addEventListener('click', () => this.toggleMode('advanced'));

        // Simple Inputs
        ['hw', 'exam', 'social'].forEach(key => {
            this.ui.simple[key].addEventListener('input', () => {
                // Ensure values stay within bounds
                let max = 18; 
                if (key === 'exam') max = 6;
                if (key === 'social') max = 30;
                
                let val = parseFloat(this.ui.simple[key].value);
                if (val > max) this.ui.simple[key].value = max;
                if (val < 0) this.ui.simple[key].value = 0;
                
                this.update();
            });
        });

        // Advanced: Homework Inputs
        this.ui.hw.sliders.forEach((slider, i) => {
            this.syncInputs(slider, this.ui.hw.inputs[i], (val) => {
                this.state.hw[i] = val;
                this.update();
            });
        });

        // Advanced: Social Checkboxes
        this.ui.social.checkboxes.forEach((week, wIndex) => {
            week.forEach((checkbox, cIndex) => {
                if(!checkbox) return; 
                checkbox.addEventListener('change', () => {
                    this.state.social[wIndex][cIndex] = checkbox.checked;
                    this.update();
                });
            });
        });

        // Advanced: Exams
        this.syncInputs(this.ui.exams.midtermSlider, this.ui.exams.midtermInput, (val) => {
            this.state.exams.midterm = val;
            this.update();
        });
        this.syncInputs(this.ui.exams.finalSlider, this.ui.exams.finalInput, (val) => {
            this.state.exams.final = val;
            this.update();
        });
    }

    toggleMode(mode) {
        this.mode = mode;
        if (mode === 'simple') {
            this.ui.mode.simplePanel.style.display = 'block';
            this.ui.mode.advancedPanel.style.display = 'none';
            this.ui.mode.simpleBtn.classList.add('active');
            this.ui.mode.advancedBtn.classList.remove('active');
        } else {
            this.ui.mode.simplePanel.style.display = 'none';
            this.ui.mode.advancedPanel.style.display = 'block';
            this.ui.mode.simpleBtn.classList.remove('active');
            this.ui.mode.advancedBtn.classList.add('active');
        }
        this.update(); // Recalculate based on new mode
    }

    syncInputs(slider, numberInput, callback) {
        if (!slider || !numberInput) return;

        const max = slider.getAttribute('max') || 3;
        const min = 0;
        
        slider.setAttribute('max', max);
        numberInput.setAttribute('max', max);
        numberInput.setAttribute('min', min);

        const updateState = (val) => {
            let safeVal = Math.max(min, Math.min(max, Number(val)));
            slider.value = safeVal;
            numberInput.value = safeVal;
            callback(safeVal);
        };

        slider.addEventListener('input', () => updateState(slider.value));
        numberInput.addEventListener('input', () => updateState(numberInput.value));
    }

    update() {
        let hwResults, examResults, socialResults;

        if (this.mode === 'simple') {
            // Read from simple inputs
            hwResults = this.calcSimpleHomework();
            examResults = this.calcSimpleExams();
            socialResults = this.calcSimpleSocial();
        } else {
            // Read from advanced state and update simple inputs
            hwResults = this.calcHomework();
            examResults = this.calcExams();
            socialResults = this.calcSocial();

            // Sync Advanced results to Simple Inputs
            this.ui.simple.hw.value = hwResults.totalScore;
            this.ui.simple.exam.value = examResults.totalScore;
            this.ui.simple.social.value = socialResults.totalScore;
        }

        const finalGrade = this.calcFinalGrade(hwResults.letterIndex, examResults.letterIndex, socialResults.modifierIndex);

        this.render(socialResults, hwResults, examResults, finalGrade);
        this.saveToStorage();
    }

    // --- Simple Mode Calculations ---

    calcSimpleHomework() {
        const total = parseFloat(this.ui.simple.hw.value) || 0;
        const maxPoints = 18;
        const ratio = total / maxPoints;
        let letterIndex = 0;
        if (ratio >= 15/18) letterIndex = 3;
        else if (ratio >= 12/18) letterIndex = 2;
        else if (ratio >= 9/18) letterIndex = 1;
        
        // For simple mode, scores array is irrelevant for display
        return { scores: [], totalScore: total, maxPoints, letterIndex };
    }

    calcSimpleExams() {
        const total = parseFloat(this.ui.simple.exam.value) || 0;
        const maxPoints = 6;
        const ratio = total / maxPoints;
        let letterIndex = 0;
        if (ratio >= 5/6) letterIndex = 3;
        else if (ratio >= 3/6) letterIndex = 2;
        else if (ratio >= 1/6) letterIndex = 1;

        return { midScore: 0, finScore: 0, totalScore: total, maxPoints, letterIndex };
    }

    calcSimpleSocial() {
        const total = parseFloat(this.ui.simple.social.value) || 0;
        const maxPoints = 30;
        const ratio = total / maxPoints;
        let modifierIndex = 0;
        if (ratio >= 0.8) modifierIndex = 3;
        else if (ratio >= 0.6) modifierIndex = 2;
        else if (ratio >= 0.4) modifierIndex = 1;

        return { weekScores: [], totalScore: total, maxPoints, modifierIndex };
    }

    // --- Advanced Mode Calculations ---

    calcSocial() {
        let totalScore = 0;
        const weekScores = this.state.social.map((week) => {
            const checkedCount = week.filter(Boolean).length;
            const hasMandatory = week[2] && week[4];
            const hasOneMandatory = week[2] || week[4];

            let score = 0;
            if (checkedCount >= 4 && hasMandatory) score = 3;
            else if (checkedCount >= 3 && hasOneMandatory) score = 2;
            else if (checkedCount >= 2) score = 1;
            
            totalScore += score;
            return score;
        });

        const maxPoints = CONFIG.social.weeks * 3;
        const ratio = totalScore / maxPoints;
        
        let modifierIndex = 0;
        if (ratio >= 0.8) modifierIndex = 3;
        else if (ratio >= 0.6) modifierIndex = 2;
        else if (ratio >= 0.4) modifierIndex = 1;

        return { weekScores, totalScore, maxPoints, modifierIndex };
    }

    calcHomework() {
        let totalScore = 0;
        const scores = this.state.hw.map(val => {
            let grade = 0;
            if (val >= CONFIG.hw.thresholds[0]) grade = 3;
            else if (val >= CONFIG.hw.thresholds[1]) grade = 2;
            else if (val >= CONFIG.hw.thresholds[2]) grade = 1;
            totalScore += grade;
            return grade;
        });

        const maxPoints = CONFIG.hw.count * 3;
        const ratio = totalScore / maxPoints;

        let letterIndex = 0;
        if (ratio >= 15/18) letterIndex = 3;
        else if (ratio >= 12/18) letterIndex = 2;
        else if (ratio >= 9/18) letterIndex = 1;

        return { scores, totalScore, maxPoints, letterIndex };
    }

    calcExams() {
        const getScore = (raw) => {
            if (raw >= CONFIG.exams.thresholds[0]) return 3;
            if (raw >= CONFIG.exams.thresholds[1]) return 2;
            if (raw >= CONFIG.exams.thresholds[2]) return 1;
            return 0;
        };

        let midScore = getScore(this.state.exams.midterm);
        let finScore = getScore(this.state.exams.final);

        if (finScore > midScore) midScore = finScore;

        const totalScore = midScore + finScore;
        const maxPoints = 6;
        const ratio = totalScore / maxPoints;

        let letterIndex = 0;
        if (ratio >= 5/6) letterIndex = 3;
        else if (ratio >= 3/6) letterIndex = 2;
        else if (ratio >= 1/6) letterIndex = 1;

        return { midScore, finScore, totalScore, maxPoints, letterIndex };
    }

    calcFinalGrade(hwIndex, examIndex, socialModifier) {
        let baseIndex = Math.min(hwIndex, examIndex);
        
        if (socialModifier === 0 && baseIndex > 0) {
            baseIndex -= 1; 
        }

        let displayModifier = '';
        if (baseIndex > 0) {
            if (socialModifier === 3) displayModifier = '+';
            if (socialModifier === 1) displayModifier = '-';
        }

        const letter = CONFIG.grading.labels[baseIndex];
        return { text: `${letter}${displayModifier}` };
    }

    // --- Rendering ---

    render(social, hw, exams, final) {
        // Only update Advanced UI if we are in Advanced Mode
        if (this.mode === 'advanced') {
            social.weekScores.forEach((s, i) => {
                if(this.ui.social.weekScores[i]) this.ui.social.weekScores[i].innerText = s;
            });

            hw.scores.forEach((s, i) => {
                if(this.ui.hw.scores[i]) this.ui.hw.scores[i].innerText = s;
            });

            if(this.ui.exams.midtermDisplay) this.ui.exams.midtermDisplay.innerText = exams.midScore;
            if(this.ui.exams.finalDisplay) this.ui.exams.finalDisplay.innerText = exams.finScore;
        }

        this.updateExplanation(hw, exams, social, final);
    }

    updateExplanation(hw, exams, social, final) {
        if (!this.ui.explanationDisplay) return;

        const baseIndex = Math.min(hw.letterIndex, exams.letterIndex);
        const baseGrade = CONFIG.grading.labels[baseIndex];
        
        let html = `Grade Breakdown for Final Grade: <strong>${final.text}</strong>\n`;
        html += "=".repeat(50) + "\n\n";

        // 1. Stats
        html += `Homework Points: <strong>${hw.totalScore}/${hw.maxPoints}</strong>\n`;
        html += `Exam Points: <strong>${exams.totalScore}/${exams.maxPoints}</strong>\n`;
        html += `Base Grade: <strong>${baseGrade}</strong>\n\n`;

        // 2. Base Grade Criteria Logic
        html += "Base Grade Criteria:\n";
        if (baseIndex === 3) { 
            html += `<strong>✓ Met requirements for A</strong> (15+ homework points AND 6 exam points)\n`;
        } else if (baseIndex === 2) { 
            html += `<strong>✓ Met requirements for B</strong>\n`;
            if (hw.totalScore < 15 || exams.totalScore < 6) {
                html += `✗ Did not meet A requirements (need 15+ homework AND 6 exam)\n`;
            }
        } else if (baseIndex === 1) { 
            html += `<strong>✓ Met requirements for C</strong>\n`;
            if (hw.totalScore < 12 || exams.totalScore < 4) {
                 html += `✗ Did not meet B requirements (need 12+ homework AND 4+ exam)\n`;
            }
        } else { 
            html += `<strong>✗ Did not meet minimum requirements for C</strong>\n`;
        }

        html += "\n";

        // 3. Social Logic
        html += `Social Learning Points: <strong>${social.totalScore}/${social.maxPoints}</strong>\n`;

        switch (social.modifierIndex) {
            case 3:
                html += "Social Modifier: <strong>+ (24+ points - excellent participation!)</strong>\n";
                html += `Final Grade: ${baseGrade} + modifier = <strong>${final.text}</strong>\n`;
                break;
            case 2:
                html += "Social Modifier: <strong>none (18-23 points - good participation)</strong>\n";
                html += `Final Grade: ${baseGrade} (no change) = <strong>${final.text}</strong>\n`;
                break;
            case 1:
                html += "Social Modifier: <strong>- (12-17 points - moderate participation)</strong>\n";
                html += `Final Grade: ${baseGrade} + modifier = <strong>${final.text}</strong>\n`;
                break;
            case 0:
                html += "Social Modifier: <strong>Lower one letter grade (<12 points - needs improvement)</strong>\n";
                html += `Final Grade: ${baseGrade} lowered by one grade = <strong>${final.text}</strong>\n`;
                break;
        }

        this.ui.explanationDisplay.innerHTML = html;
    }
    
    // --- Storage ---

    saveToStorage() {
        const data = {
            mode: this.mode,
            state: this.state
        };
        localStorage.setItem('gradeCalculatorState_v4', JSON.stringify(data));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('gradeCalculatorState_v4');
        if (!saved) return;
        
        try {
            const parsed = JSON.parse(saved);
            
            // Handle Mode
            if (parsed.mode) this.toggleMode(parsed.mode);

            // Handle Advanced State
            if (parsed.state) {
                if(parsed.state.hw) this.state.hw = parsed.state.hw;
                if(parsed.state.social) this.state.social = parsed.state.social;
                if(parsed.state.exams) this.state.exams = parsed.state.exams;

                // Sync Advanced Inputs
                this.ui.hw.sliders.forEach((el, i) => el.value = this.state.hw[i]);
                this.ui.hw.inputs.forEach((el, i) => el.value = this.state.hw[i]);
                
                this.ui.social.checkboxes.forEach((week, w) => {
                    week.forEach((box, i) => box.checked = this.state.social[w][i]);
                });

                this.ui.exams.midtermSlider.value = this.state.exams.midterm;
                this.ui.exams.midtermInput.value = this.state.exams.midterm;
                this.ui.exams.finalSlider.value = this.state.exams.final;
                this.ui.exams.finalInput.value = this.state.exams.final;
            }

        } catch (e) {
            console.error("Failed to load save data", e);
        }
    }
}
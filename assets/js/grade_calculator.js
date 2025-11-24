document.addEventListener('DOMContentLoaded', () => {
    new GradeCalculator();
});

const CONFIG = {
    grading: {
        labels: ['F', 'C', 'B', 'A'], 
        modifiers: ['One letter grade reduction', 'Minus (-)', 'No modifier', 'Plus (+)']
    }
};

class GradeCalculator {
    constructor() {
        this.ui = {
            hw: document.getElementById('simple-hw'),
            exam: document.getElementById('simple-exam'),
            social: document.getElementById('simple-social'),
            display: document.getElementById('grade-explanation')
        };

        this.loadFromStorage();
        this.bindEvents();
        this.update();
    }

    bindEvents() {
        ['hw', 'exam', 'social'].forEach(key => {
            if (!this.ui[key]) return;
            
            this.ui[key].addEventListener('input', () => {
                // Basic constraints to prevent crazy numbers
                let max = 18; 
                if (key === 'exam') max = 6;
                if (key === 'social') max = 30;
                
                let val = parseFloat(this.ui[key].value);
                
                // Visual feedback only, allow typing but clamp calculation later
                if (val > max) {
                    this.ui[key].style.borderColor = '#d73a49'; // Red warning border
                } else {
                    this.ui[key].style.borderColor = ''; // Reset
                }
                
                this.update();
            });
        });
    }

    update() {
        const hw = this.calcHomework();
        const exams = this.calcExams();
        const social = this.calcSocial();
        const final = this.calcFinalGrade(hw.letterIndex, exams.letterIndex, social.modifierIndex);

        this.updateExplanation(hw, exams, social, final);
        this.saveToStorage();
    }

    // --- Calculation Logic ---

    calcHomework() {
        let total = parseFloat(this.ui.hw.value) || 0;
        const maxPoints = 18;
        
        // Clamp for calculation
        total = Math.min(total, maxPoints);
        
        let letterIndex = 0;
        if (total >= 15) letterIndex = 3;      // A
        else if (total >= 12) letterIndex = 2; // B
        else if (total >= 9) letterIndex = 1;  // C
        
        return { totalScore: total, maxPoints, letterIndex };
    }

    calcExams() {
        let total = parseFloat(this.ui.exam.value) || 0;
        const maxPoints = 6;

        total = Math.min(total, maxPoints);

        let letterIndex = 0;
        if (total >= 6) letterIndex = 3;      // A
        else if (total >= 4) letterIndex = 2; // B
        else if (total >= 2) letterIndex = 1; // C

        return { totalScore: total, maxPoints, letterIndex };
    }

    calcSocial() {
        let total = parseFloat(this.ui.social.value) || 0;
        const maxPoints = 30;

        total = Math.min(total, maxPoints);

        let modifierIndex = 0;
        if (total >= 24) modifierIndex = 3;      // +
        else if (total >= 18) modifierIndex = 2; // None
        else if (total >= 12) modifierIndex = 1; // -

        return { totalScore: total, maxPoints, modifierIndex };
    }

    calcFinalGrade(hwIndex, examIndex, socialModifier) {
        // Base grade is the Minimum of HW and Exam
        let baseIndex = Math.min(hwIndex, examIndex);
        
        // Logic: If modifier is 0 (Lower grade), reduce index
        if (socialModifier === 0 && baseIndex > 0) {
            baseIndex -= 1; 
        }

        let displayModifier = '';
        // Don't add +/- to F grades (index 0)
        if (baseIndex > 0) {
            if (socialModifier === 3) displayModifier = '+';
            if (socialModifier === 1) displayModifier = '-';
        }

        const letter = CONFIG.grading.labels[baseIndex];
        return { text: `${letter}${displayModifier}` };
    }

    // --- Output Generation ---

    updateExplanation(hw, exams, social, final) {
        if (!this.ui.display) return;

        // Helper for base grade label
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

        this.ui.display.innerHTML = html;
    }

    // --- Storage ---

    saveToStorage() {
        const data = {
            hw: this.ui.hw.value,
            exam: this.ui.exam.value,
            social: this.ui.social.value
        };
        localStorage.setItem('gradeCalculatorSimple', JSON.stringify(data));
    }

    loadFromStorage() {
        const saved = localStorage.getItem('gradeCalculatorSimple');
        if (!saved) return;
        
        try {
            const parsed = JSON.parse(saved);
            if(parsed.hw) this.ui.hw.value = parsed.hw;
            if(parsed.exam) this.ui.exam.value = parsed.exam;
            if(parsed.social) this.ui.social.value = parsed.social;
        } catch (e) {
            console.error("Failed to load save data", e);
        }
    }
}
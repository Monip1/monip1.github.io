---
title: Grade Calculator
layout: default
permalink: /calculator
nav_order: 6
---
# Grade Calculator

{: .warning}
This is only an estimate and may not reflect your actual final grade.

Enter the totals from your Canvas gradebook below. It is normal for these totals
to be a week behind as grades are updated. 

<div class="calculator-container">
    
    <div class="input-card">
        <p class="instruction-text">Totals</p>
        
        <div class="inputs-wrapper">
            <div class="input-group">
                <label for="simple-hw">Homework Total <span class="max-label">(Max 18)</span></label>
                <input type="number" id="simple-hw" min="0" max="18" step="1" placeholder="0">
            </div>

            <div class="input-group">
                <label for="simple-exam">Exam Total <span class="max-label">(Max 6)</span></label>
                <input type="number" id="simple-exam" min="0" max="6" step="1" placeholder="0">
            </div>

            <div class="input-group">
                <label for="simple-social">Social Total <span class="max-label">(Max 30)</span></label>
                <input type="number" id="simple-social" min="0" max="30" step="1" placeholder="0">
            </div>
        </div>
    </div>

    <div class="report-wrapper">
        <div class="report-header">
            <span class="report-label">GRADE REPORT</span>
            <span class="report-status">LIVE ESTIMATE</span>
        </div>
        <div id="grade-explanation">Waiting for input...</div>
    </div>

</div>

<style>
/* --- Layout --- */
.calculator-container {
    margin: 0 auto;
}

/* --- Input Card --- */
.input-card {
    padding: 2rem;
    border-radius: 8px;
    border: 1px solid #e1e4e8;
    box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    margin-bottom: 2rem;
}

.instruction-text {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    text-align: center;
}

.inputs-wrapper {
    display: flex;
    gap: 2rem;
    justify-content: center;
    flex-wrap: wrap;
}

.input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
    min-width: 180px;
}

.input-group label {
    font-weight: 600;
    font-size: 0.95rem;
}

.max-label {
    color: #6a737d;
    font-weight: 400;
    font-size: 0.85rem;
}

.input-group input {
    padding: 12px;
    font-size: 1.2rem;
    border: 1px solid #d1d5da;
    border-radius: 6px;
    transition: border-color 0.2s, box-shadow 0.2s;
}

.input-group input:focus {
    border-color: #0366d6;
    box-shadow: 0 0 0 3px rgba(3, 102, 214, 0.3);
    outline: none;
}

/* --- Report Output --- */
.report-wrapper {
    border-radius: 8px;
    border: 1px solid #e1e4e8;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    overflow: hidden;
    margin-bottom: 3rem;
}

.report-header {
    background: #2d333b;
    padding: 12px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #1e2329;
}

.report-label {
    font-weight: 700;
    color: #adbac7;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
}

.report-status {
    background: #2ea043;
    color: white;
    padding: 2px 10px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
}

#grade-explanation {
    white-space: pre-wrap;
    font-family: 'Menlo', 'Consolas', 'Monaco', 'Courier New', monospace;
    font-size: 0.95rem;
    line-height: 1.6;
    padding: 25px;
    border-left: 5px solid #4f46e5;
}
</style>

<script src="{{ site.baseurl }}/assets/js/grade_calculator.js"></script>

---
# Grade Calculation Explained
Here's a breakdown of how the final grade is calculated based on the different components.

## Base Grade Calculation
The base grade is determined by your performance on homework and exams. 
How does this work? Each homework assignment is worth 3 points, each point corresponding
to Exemplary Pass (3 points), Satisfactory Pass (2 points), or Needs Improvement (1 point) 
and Incomplete (0 points).

Similarly, each exam (midterm and final) is also worth 3 points each, with the same point system.

You can find these grades on Canvas under the "Grades" section. 

{: .warning} 
DO NOT RELY ON CANVAS SCORE CALCULATIONS. Use Canvas *only* to see the individual grades for each homework and exam.

### Grading criteria:

| Grade | Homework Points | Exam Points |
|:-----:|:---------------:|:-----------:|
|   A   |      >= 15      |     >= 6    |
|   B   |      >= 12      |     >= 4    |
|   C   |      >= 9       |     >= 2    |
|   F   |  < 9 | < 2 |


## Social Learning Modifier
Your participation in social learning activities determines a modifier that can adjust your base grade. 
What are these activities? Lectures, labs, study groups, and reading quizzes all contribute to your social learning points.

### Grading criteria:
- **Exemplary (3 social points):** You receive a "Pass" for at least 4 events, including a "Pass" on both the weekly lab and the reading quiz.
- **Satisfactory (2 social points):** You receive a "Pass" for at least 3 events, including a "Pass" on at least one of the weekly lab or the reading quiz.
- **Needs Improvement (1 social point):** You receive a "Pass" for at least 2 events.
- **Incomplete (0 social points):** You receive a "Pass" for fewer than 2 events.

Every week, you can earn up to 3 social points and accumulate up to 30 points (3 points x 10 weeks).

This total social points then determine your social learning modifier as follows:

### Modifier criteria:

| Total Social Points | Modifier |
|:-------------------:|:-----------------------:|
|       >= 24         |           +             |
|        18-23        |      (no modifier)      |
|        12-17        |           -             |
|         < 12        | Lower one letter grade  |


## Final Grade Calculation
The final grade is calculated by applying the social learning modifier to your base grade. 
Modifiers don't apply to F grades; if your base grade is F, your final grade remains F regardless of social learning points.
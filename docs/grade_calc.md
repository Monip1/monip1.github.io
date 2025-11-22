---
title: Grade Calculator
layout: default
permalink: /calculator
nav_exclude: true
---
# Grade Calculator

{: .warning}
This is only an estimate and may not reflect your actual final grade.

<div class="mode-toggle-container">
    <button id="btn-simple" class="mode-btn active">Simple Mode</button>
    <button id="btn-advanced" class="mode-btn">Advanced Mode</button>
</div>

<div class="calculator-container">
    
    <div id="simple-ui" class="mode-content">
        <p >Enter your total points found on Canvas.</p>
        <div class="simple-inputs-wrapper">
            <div class="simple-input-group">
                <label>Total Homework Points (Max 18)</label>
                <input type="number" id="simple-hw" min="0" max="18" value="0">
            </div>
            <div class="simple-input-group">
                <label>Total Exam Points (Max 6)</label>
                <input type="number" id="simple-exam" min="0" max="6" value="0">
            </div>
            <div class="simple-input-group">
                <label>Total Social Points (Max 30)</label>
                <input type="number" id="simple-social" min="0" max="30" value="0">
            </div>
        </div>
    </div>

    <div id="advanced-ui" class="mode-content" style="display: none;">
        <div class="advanced-flex-row">
            <div class="left-column">
                <form id="homework-scores">
                    <h3>Homework Scores</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Homework</th>
                                <th>Score (Points)</th>
                            </tr>
                        </thead>
                        <tbody>
                            {% for hw_num in (1..6) %}
                            <tr id="hw-{{ hw_num }}-row">
                                <td>Homework {{ hw_num }}</td>
                                <td>
                                    <div class="slider-container">
                                        <input type="range" id="hw-{{ hw_num }}" name="hw-{{ hw_num }}" min="0" max="3" step="1" value="0">
                                        <input type="number" id="hw-{{ hw_num }}-input" name="hw-{{ hw_num }}-input" style="width:3rem" min="0" max="3" step="1" value="0">
                                        <span id="hw-{{ hw_num }}-score" style="width:1rem">0</span>
                                    </div>
                                </td>
                            </tr>
                            {% endfor %}
                        </tbody>
                    </table>
                </form>
                <form id="exam-scores">
                    <h3 style="margin-top: 20px;">Exam Scores</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Exam</th>
                                <th>Score (Points)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr id="midterm-row">
                                <td>Midterm</td>
                                <td>
                                    <div class="slider-container">
                                        <input type="range" id="midterm-score" name="midterm-score" min="0" max="3" step="1" value="0">
                                        <input type="number" style="width:3rem" id="midterm-score-input" name="midterm-score-input" min="0" max="3" step="1" value="0">
                                        <span id="midterm-score-display" style="width:1rem">0</span>
                                    </div>
                                </td>
                            </tr>
                            <tr id="final-row">
                                <td>Final</td>
                                <td>
                                    <div class="slider-container">
                                        <input type="range" id="final-score" name="final-score" min="0" max="3" step="1" value="0">
                                        <input type="number" style="width:3rem" id="final-score-input" name="final-score-input" min="0" max="3" step="1" value="0">
                                        <span id="final-score-display" style="width:1rem">0</span>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>

            <form id="social-learning-scores">
                <h3>Social Learning</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Week</th>
                            <th>Tu Lecture</th>
                            <th>Th Lecture</th>
                            <th>Lab</th>
                            <th>Study Group</th>
                            <th>Reading Quiz</th>
                            <th>Score</th>
                        </tr>
                    </thead>
                    <tbody>
                        {% for week in (1..10) %}
                        <tr id="week-{{ week }}-row">
                            <td>Week {{ week }}</td>
                            <td style="text-align: center;"><input class="grade" type="checkbox" id="tu-lec-{{ week }}" name="tu-lec-{{ week }}"></td>
                            <td style="text-align: center;"><input class="grade" type="checkbox" id="th-lec-{{ week }}" name="th-lec-{{ week }}"></td>
                            <td style="text-align: center;"><input class="grade" type="checkbox" id="lab-{{ week }}" name="lab-{{ week }}"></td>
                            <td style="text-align: center;"><input class="grade" type="checkbox" id="study-group-{{ week }}" name="study-group-{{ week }}"></td>
                            <td style="text-align: center;"><input class="grade" type="checkbox" id="rq-{{ week }}" name="rq-{{ week }}"></td>
                            <td style="text-align: center;"><span id="week-{{ week }}-score">0</span></td>
                        </tr>
                        {% endfor %}
                    </tbody>
                </table>
            </form>
        </div>
    </div>
</div>

<hr style="margin: 2rem 0;">

<div class="report-wrapper">
    <div class="report-header">
        <span class="report-label">GRADE REPORT</span>
        <span class="report-status">LIVE ESTIMATE</span>
    </div>
    <div id="grade-explanation">Calculating...</div>
</div>

<style>
/* --- Mode Toggle --- */
.mode-toggle-container {
    display: flex;
    justify-content: center;
    gap: 10px;
}

.mode-btn {
    padding: 10px 20px;
    border: 2px solid #4f46e5;
    background: transparent;
    color: #4f46e5;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: all 0.2s;
}

.mode-btn:hover {
    background: #e0e7ff;
}

.mode-btn.active {
    background: #4f46e5;
    color: white;
}

/* --- Simple Mode Layout --- */
.simple-inputs-wrapper {
    display: flex;
    gap: 20px;
    flex-wrap: wrap;
    justify-content: space-around;
    padding: 30px;
    border-radius: 8px;
    border: 1px solid;
}

.simple-input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.simple-input-group label {
    font-weight: 600;
}

.simple-input-group input {
    padding: 10px;
    font-size: 1.1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    width: 150px;
}

/* --- Advanced Mode Layout --- */
.advanced-flex-row {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
.left-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 300px;
}
#social-learning-scores {
    flex: 2;
    min-width: 400px;
}

/* --- Tables & Sliders --- */
.slider-container {
    display: flex;
    align-items: center;
    gap: 5%;
}
.slider-container input[type="range"] {
    width: 75%;
}
.slider-container input[type="number"] {
    border-radius: 0.5rem;
    border: 1px solid #ccc;
    padding: 4px;
}
th, td {
    padding: 8px;
}

/* --- Report Output --- */
.report-wrapper {
    border-radius: 8px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.08);
    overflow: hidden;
    margin-bottom: 3rem;
    margin-left: auto;
    margin-right: auto;
}

.report-header {
    background: #2d333b;
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 0.85rem;
    letter-spacing: 0.05em;
    border-bottom: 1px solid #1e2329;
}

.report-label {
    font-weight: 700;
    color: #adbac7;
    text-transform: uppercase;
}

.report-status {
    background: #2ea043;
    color: white;
    padding: 2px 8px;
    border-radius: 100px;
    font-weight: 600;
    font-size: 0.7rem;
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

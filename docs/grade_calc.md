---
title: Grade Calculator
layout: default
permalink: /calculator
nav_exclude: true
---
# Grade Calculator

{: .warning}
This is only an estimate and may not reflect your actual final grade.


This grade calculator allows you to estimate your final grade in the course
based on your current scores and social learning components. 

<div class="calculator-container">
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
            <h3 style="margin-top: 0;">Exam Scores</h3>
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

    <!-- a spreadsheet like form with rows for each week and checkboxes for each social learning component i.e. 2 lecs, 1 lab, 1 study group and 1 rq -->
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

<h3>Totals</h3>
<table class="totals-table">
    <thead>
        <tr>
            <th style="width: 25%;">Component</th>
            <th style="width: 25%;">Total Score</th>
            <th style="width: 25%;">Total Possible</th>
            <th style="width: 25%;">Result</th>
        </tr>
    </thead>
    <tr>
        <th class="component">Grade Modifier</th>
        <td><p id="social-score-total">N/A</p></td>
        <td><p id="social-possible-total">N/A</p></td>
        <td><p id="social-result-total">N/A</p></td>
    </tr>
    <tr>
        <th class="component">Homework Total</th>
        <td><p id="hw-score-total">N/A</p></td>
        <td><p id="hw-possible-total">N/A</p></td>
        <td><p id="hw-result-total">N/A</p></td>
    </tr>
    <tr>
        <th class="component">Exam Total</th>
        <td><p id="exam-score-total">N/A</p></td>
        <td><p id="exam-possible-total">N/A</p></td>
        <td><p id="exam-result-total">N/A</p></td>
    </tr>
    <tr>
        <th class="component">Final Grade</th>
        <td colspan="3"><p id="final-grade-total">N/A</p></td>
    </tr>
</table>

<style>
#what-if {
    margin-bottom: 1rem;
}

.calculator-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
}
.left-column {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0rem;
    min-width: 10rem;
}
#social-learning-scores {
    flex: 2;
    min-width: 400px;
}

th {
    min-width: 80px;
}

td {
    min-width: 80px;
}

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
}

.totals-table td, th {
    text-align: center;
}


</style>

<script src="{{ site.baseurl }}/assets/js/grade_calculator.js"></script>
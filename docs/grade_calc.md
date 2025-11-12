---
title: Grade Calculator
layout: default
permalink: /calculator
nav_order: 7
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
                    <tr>
                        <td><input class="include" type="checkbox" id="hw-{{ hw_num }}-include" name="hw-{{ hw_num }}-include">Homework {{ hw_num }}</td>
                        <td>
                            <div class="slider-container">
                                <input type="range" id="hw-{{ hw_num }}" name="hw-{{ hw_num }}" min="0" max="3" step="1" value="0">
                                <input type="number" id="hw-{{ hw_num }}-input" name="hw-{{ hw_num }}-input" min="0" max="3" step="1" value="0">
                                <span id="hw-{{ hw_num }}-score">0</span>
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
                    <tr>
                        <td>Midterm</td>
                        <td>
                            <div class="slider-container">
                                <input type="range" id="midterm-score" name="midterm-score" min="0" max="3" step="1" value="0">
                                <input type="number" id="midterm-score-input" name="midterm-score-input" min="0" max="3" step="1" value="0">
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>Final</td>
                        <td>
                            <div class="slider-container">
                                <input type="range" id="final-score" name="final-score" min="0" max="3" step="1" value="0">
                                <input type="number" id="final-score-input" name="final-score-input" min="0" max="3" step="1" value="0">
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
                <tr>
                    <td><input class="include" type="checkbox" id="week-{{ week }}-include" name="week-{{ week }}-include">Week {{ week }}</td>
                    <td style="text-align: center;"><input type="checkbox" id="tu-lec-{{ week }}" name="tu-lec-{{ week }}"></td>
                    <td style="text-align: center;"><input type="checkbox" id="th-lec-{{ week }}" name="th-lec-{{ week }}"></td>
                    <td style="text-align: center;"><input type="checkbox" id="lab-{{ week }}" name="lab-{{ week }}"></td>
                    <td style="text-align: center;"><input type="checkbox" id="study-group-{{ week }}" name="study-group-{{ week }}"></td>
                    <td style="text-align: center;"><input type="checkbox" id="rq-{{ week }}" name="rq-{{ week }}"></td>
                    <td style="text-align: center;"><span id="week-{{ week }}-score">0</span></td>
                </tr>
                {% endfor %}
            </tbody>
        </table>
    </form>
</div>

<h3>Totals</h3>
<p id="grade-modifier-display">N/A</p>
<p id="hw-total-display">N/A</p>

<style>
#what-if {
    margin-bottom: 1rem;
}
.include {
    margin-right: 0.75rem;
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

tr.disabled {
    color: #888;
    background-color: #f9f9f9;
}
</style>

<script src="{{ site.baseurl }}/assets/js/grade_calculator.js"></script>
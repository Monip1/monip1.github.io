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

```python
def calculate_base_grade(homework_points, exam_points):
    """
    Determine base letter grade based on homework and exam points.
    
    Args:
        homework_points: Total homework points (max 18)
        exam_points: Total exam points (max 6)
    
    Returns:
        str: Base letter grade ('A', 'B', 'C', or 'F')
    """
    if homework_points >= 15 and exam_points >= 6:
        return 'A'
    elif homework_points >= 12 and exam_points >= 4:
        return 'B'
    elif homework_points >= 9 and exam_points >= 2:
        return 'C'
    else:
        return 'F'
```

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


```python
def calculate_social_modifier(social_points):
    """
    Determine social learning modifier based on total social points.
    
    Args:
        social_points: Total social learning points (max 30)
    
    Returns:
        str: Modifier ('+', '', '-', or 'lower')
    """
    if social_points >= 24:
        return '+'
    elif 18 <= social_points <= 23:
        return ''
    elif 12 <= social_points <= 17:
        return '-'
    else:
        return 'lower'
```

### Final Grade Calculation
The final grade is calculated by applying the social learning modifier to your base grade.

```python
def calculate_final_grade(homework_points, exam_points, social_points):
    base_grade = calculate_base_grade(homework_points, exam_points)
    social_modifier = calculate_social_modifier(social_points)
    
    if social_modifier == 'lower':
        if base_grade == 'A':
            final_grade = 'B'
        elif base_grade == 'B':
            final_grade = 'C'
        elif base_grade == 'C':
            final_grade = 'F'
        else:
            final_grade = 'F'
    else:
        final_grade = base_grade + social_modifier
    
    return final_grade
```

### Detailed Grade Explanation
This function provides a detailed breakdown of how your final grade was determined.

```python
def explain_grade(homework_points, exam_points, social_points):
    """
    Provide a detailed explanation of why a student received their final grade.
    
    Args:
        homework_points: Total homework points (max 18)
        exam_points: Total exam points (max 6)
        social_points: Total social learning points (max 30)
    
    Returns:
        str: A detailed explanation of the final grade calculation
    """
    base_grade = calculate_base_grade(homework_points, exam_points)
    social_modifier = calculate_social_modifier(social_points)
    final_grade = calculate_final_grade(homework_points, exam_points, social_points)
    
    explanation = f"Grade Breakdown for Final Grade: {final_grade}\n"
    explanation += "=" * 50 + "\n\n"
    
    # Explain homework and exam performance
    explanation += f"Homework Points: {homework_points}/18\n"
    explanation += f"Exam Points: {exam_points}/6\n"
    explanation += f"Base Grade: {base_grade}\n\n"
    
    # Explain how base grade was determined
    explanation += "Base Grade Criteria:\n"
    if base_grade == 'A':
        explanation += "✓ Met requirements for A (15+ homework points AND 6 exam points)\n"
    elif base_grade == 'B':
        explanation += "✓ Met requirements for B (12+ homework points AND 4+ exam points)\n"
        explanation += "✗ Did not meet A requirements (need 15+ homework AND 6 exam)\n"
    elif base_grade == 'C':
        explanation += "✓ Met requirements for C (9+ homework points AND 2+ exam points)\n"
        explanation += "✗ Did not meet B requirements (need 12+ homework AND 4+ exam)\n"
    else:
        explanation += "✗ Did not meet minimum requirements for C\n"
    
    explanation += "\n"
    
    # Explain social learning impact
    explanation += f"Social Learning Points: {social_points}/30\n"
    
    if social_modifier == '+':
        explanation += "Social Modifier: + (24+ points - excellent participation!)\n"
        explanation += f"Final Grade: {base_grade} + modifier = {final_grade}\n"
    elif social_modifier == '':
        explanation += "Social Modifier: none (18-23 points - good participation)\n"
        explanation += f"Final Grade: {base_grade} (no change) = {final_grade}\n"
    elif social_modifier == '-':
        explanation += "Social Modifier: - (12-17 points - moderate participation)\n"
        explanation += f"Final Grade: {base_grade} + modifier = {final_grade}\n"
    else:  # 'lower'
        explanation += "Social Modifier: Lower one letter grade (<12 points - needs improvement)\n"
        explanation += f"Final Grade: {base_grade} lowered by one grade = {final_grade}\n"
    
    return explanation
```

---
layout: default
title: Lab 5
parent: Labs
nav_order: 5
permalink: /lab5
---

# Lab 5: Exposing bugs via automated testing
{: .no_toc}

{: .note }
Starting with Lab 4, we will release staff solutions for each lab after 7 days. You may find our solutions to Lab 4 in our [solutions repository](https://github.com/CSE29Spring2025/lab4-solutions). We will also start to release the [make-up questions](https://docs.google.com/document/d/16aUlbzs8LCp3ki1XYv4DGY5I9gNnLYPNbMExjGHV0Fs) for each lab after the deadline. For now, let's focus on lab 5.

In this lab, you will put your GDB and Valgrind skills into practice by finding and fixing bugs in an aviation-themed linked list program. You'll also learn to write unit tests using assert statements to expose bugs. We hope that our introduction to testing encourages you to write your own tests in PA 2\!

This lab is relatively open-ended and involved. There is no need to rush during lab time as you have until Thursday at 11:59 PM to submit your final lab report.

[Start your lab report →](https://docs.google.com/document/d/1zYzacLiQLAy2tXvmGfVSsfcyMzVrLh3_/copy){: .btn .btn-blue }

## Lab 5 learning objectives
{: .no_toc}

* Recognize the value of automated tests in software development
* Write automated tests using `assert` statements
* Use Valgrind and GDB to troubleshoot bugs exposed by failing tests

#### Table of contents
{: .no_toc}

1. TOC
{:toc }

# Icebreaker

With the people around you, discuss:

* If you could choose a superpower to have, what would it be? What would you do with it?
* Who’s your favorite superhero/villain, if you have any?

{: .note }
Please write the answers of yourself and one of your group members in your lab report. No check-off is needed\!

# Negative, tester, the pattern is full…

You will be testing some bad implementations of some common linked list functions and finding out what’s wrong with them. Some of these implementations have memory leaks, others may be logically incorrect, and some of them just straight-up crash on certain inputs. It’s up to you to use all the tools in your debugging arsenal and all the knowledge you’ve gained to pick out the exact problem(s). **Please clone our [starter repository](https://github.com/CSE29Spring2025/lab5-testing) into your account on ieng6.** Head to the `flights.c` file to take a look at the code you’ll be critiquing.

We will stick to the following step-by-step process to remove defects from this file:

1. Write tests that *expose* an existing bug by failing, which can take the form of:
   1. An "Assertion failed" message
   2. Memory errors when the test is executed with Valgrind
   3. A program that never terminates
2. Use Valgrind and GDB to inspect how the tests failed
3. Implement a fix such that the tests pass

# Bad Free Path

Our recent lectures have mentioned the `assert` function. Given some argument `arg`, it checks if `arg` is true. If true (nonzero), it returns normally, and the code after the call to `assert` proceeds. If false (zero), it crashes the program immediately with an error message that includes the line number of the failing call to `assert`. While we can use the `assert` function to verify assumptions in linked list procedures, it is also essential in automated tests. `assert` function calls in automated tests check for an expected outcome. For example, a test may conceptually sound like:

> If I create an empty list, and I then call `add_item_front` on this list with `5`, then (I assert that) the list should now contain one node with `data` equal to `5`.

Let's start with `bad_free_path_1`. Around line 101 in `flights.c`, we have written an example test for you. Compile `flights.c` with the `-g` flag, and run it with Valgrind. Identify and make your fixes to make our test pass with no errors from Valgrind. Feel free to write more tests to check more cases.

**💡 Drawing diagrams is very useful for wrapping your head around linked lists. If you're stuck, draw a diagram! There's a reason why almost every staff member relies on a drawing of nodes and connections when explaining linked list operations.**

{: .checkoff }
Ask a tutor or TA to check your fix for `bad_free_path_1`, and put a screenshot of the fixed code into your lab report.

{: .owntime }
> **Test-First Development**
> <br>*Feel free to skip this note and come back to it later.*
>
> Most programming courses in higher education adopt a "Test-Last" approach, where we first write the implementation and then write tests to verify its correctness. What if we flip this order? The Agile programming community has advocated for *Test-First Development* (TFD), where whenever we want to develop a new feature, we first write tests (that would obviously fail), and we then write the implementation with the goal of making the tests pass. While this sounds counter-intuitive, following it in a disciplined manner has several benefits for software engineering:
>
> 1. TFD promotes high *test coverage*, meaning tests exercise many (if not all) parts of your implementation code
> 2. TFD encourages you to *refactor* your code, i.e., restructure it for performance, maintainability, etc. without worrying that you might break something because you can easily find out by running your tests
> 3. Some argue that TFD makes programming more fun and rewarding. Writing a test is like giving yourself a challenge, and seeing it pass for the first time is gratifying. On the other hand, writing tests last can seem like a chore.
>
> However, TFD is criticized for its counter-intuitiveness, repeated context switching between testing and implementing, and being unsuitable for input/output applications. While we are not in a position to officially recommend Test-First Development, we want you to try it with your next PA and see if you like it.

Now that we have seen how an assert works for writing a few test cases and catching bugs, we shall write our own. We have given you 2 broken functions, `bad_remove_element` and `bad_insert_element_at_pos`.

# Bad Remove Element

There are 2 problems with `bad_remove_element` in `flights.c`. One will be caught by Valgrind, and the other we will have to find using asserts. Write assert statements to test this function, including one which should fail. Some test cases we usually want to consider when dealing with lists are what happens at the beginning, the end, and somewhere in between. Here's an example test you could write:

1. Create a path LAX→SFO→PDX
2. Use `bad_remove_element` to remove the first item, LAX
3. Assert that the first item of the list is now SFO
4. Assert that the second item of the list is now PDX

{: .checkoff }
After finishing your tests, put a screenshot of your failing test code for `bad_remove_element` into your lab report. Ask a tutor or TA to check your test code to ensure that your tests are valid.

Now that we have successfully found in which case the program does not give us the desired behavior, it is easier to pinpoint where in the code there is a problem. For the second problem, keep in mind that for every `malloc` there must also be a `free` and vice versa. Use this to help you fix the function.

{: .note }
Once you are certain that the function is fixed, put a screenshot of Valgrind's output for `./flights` into your lab report.
**No need to have a tutor or TA check this one---you should already know how to check it!**

# Bad Insert Element

At this point, you are probably getting bored of the uninspired section names. What we hope you haven’t gotten bored of is writing tests, because that is what you will be doing yet again.

The `bad_insert_element_at_pos` function takes in a `path`, the name of a new airport `name`, and an `int pos`. It should insert a new airport with the given name, into the path, at the given position. For example, if we are given the path LAX→TPE→PEK, and we pass in “SIN” for the name, and 1 as the pos, we would expect the path to become LAX→SIN→TPE→PEK. Note that the index of SIN is now 1\. If `pos` is equal to 0, the function should update the value of `*path` to communicate the address of the new first node to the function caller. For another example, starting with LAX→TPE→PEK, and passing in 3 as the pos, and “HND” for the name, we would expect LAX→TPE→PEK→HND.

Use these examples to help you write tests that expose the bugs in `bad_insert_element_at_pos`.

{: .checkoff }
After finishing your tests, put a screenshot of your failing test code for `bad_insert_element_at_pos` into your lab report. Ask a tutor or TA to check your test code to ensure that your tests are valid.

After finding the bug, now you should be able to debug the code and implement a working solution.

{: .note }
Once you are certain that the function is fixed, put a screenshot of Valgrind's output for `./flights` into your lab report.
**No need to have a tutor or TA check this one---you should already know how to check it!**

# Next steps: Review Quiz
As usual, we have a fresh Review Quiz for you this week. It will help you make progress on PA 2\.

[Go to PrairieLearn →](https://us.prairielearn.com/pl/course_instance/180232){: .btn .btn-blue }

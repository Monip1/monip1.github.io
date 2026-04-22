---
layout: default
title: PA2
parent: Programming Assignments
permalink: /pa2
nav_order: 3
toc: sidebar
---

# PA 2: Unix Calendar
{: .no_toc}

Due date: April 21 23:59 PDT
{: .fs-4 }

[GitHub Classroom Assignment](#){: .btn .btn-blue }


## Updates
{: .no_toc }

- Nothing yet!

#### Table of contents
{: .no_toc}

1. TOC
{:toc }

## Learning Goals

In this assignment, we will:

* Practice implementing linked list operations
* Learn how Unix time simplifies how computers deal with time
* Organize data structures using C structs
* Combine structs and linked lists to represent complex, growable data
* Design helper functions to reduce code duplication and improve readability

## Getting Help

In CSE29, we have lots of ways to get and receive help. We encourage you
to take advantage of all of them! Study groups, office hours, and
EdStem are all great places to ask questions and collaborate with your peers. :\)

## Before we Begin

{: .warning}
You may find this PA difficult until our lecture on Thursday, April 23, which
covers linked lists in greater detail. You also might find testing our code difficult
until you've had further practice with `assert()` statements, which will be introduced
in Lab 4.

## Introduction

In this program, we'll be manipulating a C program that implements a _calendar_.
The calendar will span exactly 7 days. Like Google Calendar, your calendar
stores a collection of _calendar events_, each containing a start time, an end time,
and a name. The code that you write will enable the calendar to add, remove, reschedule,
and search for events while avoiding time conflicts between events.


## What's the calendar look like?

The calendar is comprised of a series of two important structs: `day`s and `event`s.
You can get a sense for what each of these structs look like by analyzing the following image:
<iframe height="600" src="https://whimsical.com/embed/XsiPeoeb16q6KveT4KSanr"></iframe>

We'll also go over the details of these structs below.

### Events

An `event` has a name, a start time, and an end time, just like you'd expect from
a calendar event. The important thing to note is that in addition to these
pieces of information, an `event` also has a _pointer_ to the next `event` in the same day.
You will find this familiar once you've learned about linked lists in lecture!

One thing you'll observe is that the days are sorted in ascending order; the early
events of the day come before the later events.

### Days

`day`s are the building blocks of the calendar. As mentioned above, the calendar is made up of 7 `day`s.
Each `day` has a date it represents, the number of events that day, and a pointer to a linked list of
`event`s that occur on that day. 

### The Week

The calendar itself is represented by a `week`, which wraps up all
7 `day`s into a single struct. A `week` holds an array of exactly 7 `day`s,
with `days[0]` being the earliest day and `days[6]` being the latest.

{: .note }
Before you start implementing, take a peek at the [Unix Time](#unix-time)
section in the Appendix for a quick primer on how our calendar represents
time.

## Functions to implement

In order to complete your calendar, you'll need to implement the following functions inside `calendar.c`:

- `add_event`
- `remove_event`
- `reschedule_event`
- `search_event`
- `free_week`

Now, we'll briefly describe what each one of these functions actually do.
**Note that these descriptions are incomplete; they're meant to be read
as a gentle introduction to the functions, not as a full specification.** You should
use them as a companion to the function descriptions in the comments of `calendar.c`.

### `add_event`

```c
int add_event(week_t *week, time_t start_time, time_t end_time, char *name);
```

`add_event` should add an event to the calendar by
(1) finding the correct day to add the event to,
and (2) adding the event to the linked list of events
for that day. If (1) the day is out of the range of the calendar,
or (2) the event conflicts
with an existing event,
then the function should return `-1` to indicate the event's invalid.

Otherwise, you should add the event! Remember that the linked list of events for each day should
be sorted in ascending order.

### `remove_event`

```c
int remove_event(week_t *week, int id);
```

Given a week and an event ID, this should remove the matching event from
the calendar. Return `0` if the event was found and removed, or `-1` if
no event in the week has that ID.

### `reschedule_event`

```c
int reschedule_event(week_t *week, int id, time_t start_time, time_t end_time);
```

Given a week, an event ID, and a new start and end time, this should move
the matching event to the new time. The new time may be on a different
day of the week than the event's original day.

{ : .note }
It's okay if the event's ID changes after rescheduling! 

`reschedule_event` should return one of three things:
1. If no event in the week has that ID, return `1`.
2. If the new time is out of range, or conflicts with another event,
   return `-1`. (In this case, the original event should be left as it
   was.)
3. Otherwise, update the event to the new time and return `0`.

### `search_event`

```c
int search_event(week_t *week, const char *query, event_t *results[]);
```

Given a week and a query string, this should find every event in the week
whose name _contains_ the query as a substring, matching **case-insensitively**.
Write a pointer to each matching event into the provided `results` array,
and return the number of matches.

You may assume that no more than 10 events will match any given query.

### `free_week`

```c
void free_week(week_t *week);
```

Free every piece of memory your calendar has allocated: every event, every
event's name, and the `week` itself.

## Testing Your Code

Your solution must be tested comprehensively -- as C programmers,
we should honor the immense trust that the C compiler places in us!
(I suppose this is true for programmers in general... but it's
super duper important in C!)

As in PA1, part of your submission will include writing _unit tests_ for your
code — tests that verify the correctness of individual functions.
For PA2, we'll write tests a tad bit differently.

### Writing Unit Tests with `assert`

In PA1, our unit tests checked results with `if` statements and printed a
message on failure. Recall the buggy `add` function from PA1's writeup:

```c
// This function is supposed to add two integers and return the result, but it has a bug.
int add(int a, int b) {
    return a + 0;
}
```

A PA1-style unit test for this function looked like:

```c
void test_add_ok() {
    int actual_result = add(2, 3);
    int expected_result = 5;
    if (actual_result != expected_result) {
        printf("test failed.\n");
    }
}
```

Starting with PA2, we'll use `assert` from `<assert.h>`, which you should be
familiar with from Lab 4. The same test written with `assert`:

```c
#include <assert.h>

void test_add_ok() {
    assert(add(2, 3) == 5);
}
```

Much shorter! And we get the same "silent on pass, loud on fail" behavior
for free: if the assertion fails, `assert` prints a diagnostic message
(with the failing expression, function name, and line number) and aborts
the program. If it passes, nothing happens.

You should call your unit test functions from `main()`, i.e., you should
have something similar to:

```c
int main(int argc, char *argv[]) {
    test_add_ok();
    // ... call other test functions ...
    // ... and also implement the calendar ...
    return 0;
}
```

{: .note }
Because a failing `assert` aborts the program, any tests you'd normally run
after it won't run. If multiple tests in your `main()` are failing, you'll
only see the first one at a time. Fix the first failure, re-run, and continue
from there.

As with PA1, **you should write at least one unit test for each function you
implement**, and call your test functions from `main()`. You are strongly
encouraged to write more than one — the nuances in each function's
specification make a single test per function nowhere near enough coverage.

{: .warning }
If you plan to rely on the autograder to test your code, keep in mind that
you will only be able to see your program's performance against the public
test cases. The performance of your code on the hidden test cases will
remain unavailable until after the deadline. Your own unit tests are what
will catch the bugs that public tests don't.

## Submitting Your Code

Once you're done, you can submit your code by pushing it to the GitHub repository,
like in PA1. Note that the autograder will only see your `calendar.c` file,
so **please don't edit any other files, such as `calendar.h`!**

# Appendix

## Unix Time

Before we get to the structs, we need to talk about how our calendar represents
time. In C, a moment in time is represented with the type `time_t`, which is
just an integer. Specifically, `time_t` counts the **number of seconds that
have elapsed since midnight UTC on January 1, 1970** — a reference point
called the **Unix epoch**.

| Date and time (UTC) | Unix time (`time_t`) |
|:--------------------|---------------------:|
| Jan 1, 1970 12:00:00 AM | `0` |
| Jan 1, 1970 12:01:00 AM | `60` |
| Jan 2, 1970 12:00:00 AM | `86400` |
| May 5, 2025 12:00:00 AM PDT | `1746428400` |

Why represent time as a single integer? Because it makes a lot of time
operations shockingly simple:

- **Is event A before event B?** `a.start_time < b.start_time`

Contrast that with representing time as a struct with year, month, day, hour,
minute, and second fields — you'd need a lot of arithmetic (and special cases
for leap years, month lengths, and time zones) to do even simple comparisons.

{: .important }
Although there's a whole standard library header (`time.h`) for
converting between `time_t` and human-readable dates, **you should not call
any function from `time.h` directly in this PA**. We provide two helpers,
`same_date` and `combine_date_time`, which cover everything you'll need.
You'll see them in use below.

<style>
  pre.highlight {
    line-height: normal;
  }

  .highlight code {
    font-size: 15px;
    color: #131313;
  }

  x-em {
    font-weight: bold;
    display: inline-block;
    border: 1px solid #220000;
  }
</style>

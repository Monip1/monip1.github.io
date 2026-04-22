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
Before you start implementing, it's probably worth your time to
skim the [Unix Time](#unix-time)
section in the FAQ for a quick primer on how our calendar represents
time.

## Functions to implement

In order to complete your calendar, you'll need to implement the following functions inside `calendar.c`:

- `add_event`
- `remove_event`
- `reschedule_event`
- `search_event`
- `free_week`

All your code should be written in `calendar.c`. **Do not
edit `calendar.h`!**

Now, we'll briefly describe what each one of these functions actually do.
**Note that these descriptions are incomplete; they're meant to be read
as a gentle introduction to the functions, not as a full specification.** You should
use them as a companion to the function descriptions in the comments of `calendar.c`.

### `add_event`

```c
int add_event(week_t *week, time_t start_time, time_t end_time, char *name);
```

`add_event` should add an event to the calendar with the given start time, end time, and name,
as long as the event is valid. For example, from our starting diagram, let's say
we added an event called "Post-Midterm Dance" on Monday from 3:45-3:55 PM.

There indeed _is_ space for this event, since it doesn't conflict with any existing events.
So, we should add it to the calendar, and the resulting calendar would look like this:

<iframe height="600" src="https://whimsical.com/embed/after-add-event-8h7YAMEfWMzhCdnMyHwo6d"></iframe>

Notice that we added the event _between_ the two events on Monday -- this helps preserve
the sorted order of the events on that day.

Okay, one more example. From here, let's say we wanted to add another event:
an event on Thursday from 5:30-7PM. Should we add the event? No! The event already conflicts
with the "Sun God Festival" event on Thursday, so we shouldn't add it to the calendar.
We should _leave the calendar alone_ and return `-1` to indicate that the event couldn't be added.

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

{: .note }
It's okay if the event's ID changes after rescheduling! 

Let's say we wanted to reschedule the "Post-Midterm Dance" event from
Monday 3:45-3:55 PM to Wednesday from 8-8:10 AM (obviously).
This is a valid rescheduling, since the new time doesn't conflict with any existing events.

After running `reschedule_event`, the calendar would look like this:

<iframe height="600" src="https://whimsical.com/embed/after-reschedule-event-Sr8YDDxsiBbgw76Bi3aFKB"></iframe>

Notice that the "Post-Midterm Dance" event is now on Wednesday, and that it has a new ID.

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

For example -- if we searched the above calendar for the query "midterm", we should
see that `results` has two events in it: the "CSE 29 Midterm" event on Monday, and the
"Post-Midterm Dance" event on Wednesday.

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
Like with PA1, some of the autograder's tests will be hidden, so you
shouldn't exclusively rely on the autograder to test your code!

## Submitting Your Code

Once you're done, you can submit your code by pushing it to the GitHub repository,
like in PA1.

{: .important }
**When turning in your work, only `calendar.c` and `credits.txt` will be
used by the autograder**. All other files, including `calendar.h`, will be
ignored.

# FAQs

## What's `calendar.h`?

`calendar.h` is a header file that helps tell C how to interpret the code in `calendar.c`.
You don't have to know all the details of `calendar.h` to get started with this lab;
the main thing to know is that it contains the definitions of the `week`, `day`, and `event` structs.

## What's `typedef`?

`typedef` is a C keyword that allows us to create an alias for a type. `calendar.h` uses
`typedef` so that instead of writing `struct event` or `struct day` everywhere,
we can write `event_t` and `day_t` instead.

## What's Unix time?

As you're working with the structs, you'll need to be introduced
to the concept of Unix time.
In C, a moment in time is represented with the type `time_t`, which is
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
operations shockingly simple: for example, if you want to see
if some time `a` is before time `b`, you can just compare the two integers:

```c
time_t time_a = 1746428400; // May 5, 2025 12:00:00 AM PDT
time_t time_b = 1746432000; // May 5, 2025 1:00:00 AM PDT
if (time_a < time_b) {
    printf("time_a is before time_b!\n");
}
```

{: .important }
While this PA will show you the big idea behind Unix time, you won't need
to write C code to parse, format, or interpret Unix time values. In fact, **you
should NOT have to use any function declared in `time.h`, including `localtime`,
`mktime`, or `difftime`.** We have written those parts for you in the
implementation of `same_date` and `combine_date_time`.

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

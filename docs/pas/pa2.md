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

Due date: May 5 23:59 PDT
{: .fs-4 }

[GitHub Classroom Assignment](https://classroom.github.com/a/V88wy-FY){: .btn .btn-blue }


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
covers linked lists in greater detail. You also might find writing tests difficult
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
pieces of information, an `event` also has (1) an ID and (2)
 a _pointer_ to the next `event` in the same day.
You will find (2) familiar once you've learned about linked lists in lecture!

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
skim the Unix Time
section in the FAQ for a quick primer on how our calendar represents
time.

## Program Specification

### Assumptions

Throughout this program, you may make the following _assumptions_ (i.e., you do
not need to verify them, you do not need to account for situations where
they are false, and you shouldn't violate them when providing data to your
program while it's running):

- Every event starts and ends on the same day.
  - For example, an event that starts on Tuesday at 11pm and ends on Wednesday
    at 12am is impossible.
- Every event has a positive duration (in other words, `start_time < end_time`).
- All `start_time` and `end_time` values are 15-minute aligned. This means:
  - The only possible minute values are 0, 15, 30, and 45.
  - The only possible second value is 0.
- The program will always operate on a machine in the `America/Los_Angeles`
  timezone. In general, you don't need to worry about timezones.
- `malloc` always succeeds (i.e., it will never return `NULL`)

More detailed assumptions are listed in the comments next to each
function in `calendar.h`.

### Invariants

The following _invariants_ should always be true. **You are responsible** for
ensuring that they are never violated by your code:

- There should be no time conflicts between any pair of events. Adjacent events
  (e.g., 2-4pm followed by 4-6pm), however, must be allowed.
  - `calendar.h` specifies what to do when each function detects a conflict.
- Within each day, the linked list of events should be ordered by their time of
  occurrence from earliest to latest. Because our calendar prohibits time
  conflicts, you can achieve this by ordering the events by either `start_time`
  or `end_time`.
- Within each day, both the start time and the end time of every event must fall
  under the same date as the `date` member of the `day` struct.
  - For example, if a `struct event` named `evt` is in the linked list of events
    for `calendar->days[2]`, then
    `same_date(evt.start_time, calendar->days[2].date)` and
    `same_date(evt.end_time, calendar->days[2].date)` must both be true.
- Within each day, the `num_events` member of the `day` struct must match the
  actual number of `event` structs in the linked list attached to the `day` struct.

### Policies

Your solution MUST NOT:

- Add any `#include` statements beyond what we have provided in `calendar.c`
- Rely on a modification to `calendar.h` or `callib.c`
  - We recommend that you make these two files read-only to prevent inadvertent
    edits. Run `chmod a-w calendar.h callib.c` to do so.

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

### Adding an event

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

### Removing an event

```c
int remove_event(week_t *week, int id);
```

Given a week and an event ID, this should remove the matching event from
the calendar. Return `0` if the event was found and removed, or `-1` if
no event in the week has that ID.

### Rescheduling an event

```c
int reschedule_event(week_t *week, int id, time_t start_time, time_t end_time);
```

Given a week, an event ID, and a new start and end time, this should move
the matching event to the new time. The new time may be on a different
day of the week than the event's original day.

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

### Searching for events

```c
int search_event(week_t *week, const char *query, event_t *results[]);
```

Given a week and a query string, this should find every event in the week
whose name _contains_ the query as a substring, matching **case-insensitively**.
Any matches that are found should be added to the `results` array, and the
function should return the number of events found.

For example -- if we searched the above calendar for the query "midterm", we should
see that `results` has two events in it: the "CSE 29 Midterm" event on Monday, and the
"Post-Midterm Dance" event on Wednesday. Once we've added both events to `results`,
we should return `2` to indicate that two events were found.

You may assume that no more than 10 events will match any given query.

### Freeing the calendar

```c
void free_week(week_t *week);
```

Free every piece of memory your calendar has allocated: every event, every
event's name, and the `week` itself.

## Interacting with your Calendar

Your program will interact with the user via a TUI (text-based user interface).
The user is able to enter text in response to interactive prompts to perform all
available actions on the calendar, including saving it to a file and loading it
from a file. To reduce your workload and sharpen your focus on linked lists and
structs, **we have implemented user interaction and file saving/loading
operations for you**. Your task, then, is to implement all the other calendar
operations.

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

Starting with PA2, we'll use `assert` from `<assert.h>`, which you will
become familiar with from Lab 4. The same test written with `assert`:

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

Once you're done, you can submit your code by (1) pushing your code to the GitHub repository, and (2) uploading it to the corresponding Gradescope
assignment (coming soon!).

{: .important }
**When turning in your work, only `calendar.c` and `credits.txt` will be
used by the autograder**. All other files, including `calendar.h`, will be
ignored.

# FAQs

## What's `calendar.h`?

`calendar.h` is a header file that helps tell C how to interpret the code in `calendar.c`.
You don't have to know all the details of `calendar.h` to get started with this PA;
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
to write C code to actually parse/format Unix time values. In fact, **you
should NOT have to use any function declared in `time.h`, including `localtime`,
`mktime`, or `difftime`.** We have written those parts for you in the
implementation of `same_date` and `combine_date_time`.

## Why would we use a linked list?
No one likes linked lists. Lose one pointer and your whole list goes kaput.
Why not just use an array for this instead? Let's ponder this for a moment.

Let's give each day an array with 10 slots.
What if you have a particularly successful week of procrastination and
you end up with 20 events? Or 30? Or 100? Let's just make the array bigger.
I see your 10 element array and I raise you 20. To grow this array,
you'd have to allocate more space, then loop through the old array,
copying each event over to the new, larger array. Finally, to prevent memory leaks,
you'd have to free the old array.

Now to really prove the point, let's say you have to go watch the Minecraft
movie with your friends and you find a last minute ticket for the 3:30 showing
**today**. If you have a lot of events after it, then using an array would
require you to shift _all of them_ over by one slot and possibly have to copy
the entire array. That's a lot of work!

Okay now with that point made, I hope you won't come bearing diamond swords
when I say that linked lists are the way to go for representing calendar events.
They are much easier to work with when it comes to inserting and deleting
arbitrary events. You can just change a few pointers and you're done.
No need to shift everything over!

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

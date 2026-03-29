---
layout: default
title: PA 2
parent: Programming Assignments
permalink: /pa2
nav_order: 3
toc: sidebar
---

# PA 2: Unix Calendar
{: .no_toc}

Due date: May 6 23:59 PDT _(in UNIX time: 1746601199)_
{: .fs-4 }

[GitHub Classroom Assignment](https://classroom.github.com/a/RmCIvL7l){: .btn .btn-blue }


{: .note-title }
> Updates since release
>
> 1. Updated starter code to fix a small memory leak on April 28 at 4 PM PT
> 2. Added [Interacting with your program](#interacting-with-your-program) on
>    April 30
> 3. Added guideline against calling functions in `time.h` on May 5

#### Table of contents
{: .no_toc}

1. TOC
{:toc }

## Learning Goals

In this assignment, we will:

- Practice implementing linked list operations
- Learn how Unix time simplifies how computers deal with time
- Organize data structures using C structs
- Combine structs and linked lists to represent complex, growable data
- Design helper functions to reduce code duplication and improve readability

## Introduction

In this PA, you will write a C program that implements a calendar spanning 7
days. Like Google Calendar, your calendar stores a collection of _calendar events_,
each containing a start time, end time, and name. Your program will enable
users to add, remove, reschedule, search for, and duplicate events while
detecting and avoiding time conflicts between events. Finally, it will be able
to save and load calendars from a file.

Here's a graphical overview of the data structures you will use to represent
this calendar:

<iframe height="600" src="https://whimsical.com/embed/XsiPeoeb16q6KveT4KSanr"></iframe>

There is a global array of 7 `struct day` items. Each `struct day` item
contains a pointer to the first node of a linked list of `struct event` items.
Each `struct event` item holds information about a calendar event: its start
time, end time, and name. Note that since calendar events can have very long
names, we store the name of each event separately from the `struct event`
itself; each `struct event` holds a pointer to the separately allocated string
holding the name.

{: .note-title }

> Why linked lists?
>
> No one likes linked lists. Lose one pointer and your whole list goes kaput.
> Why not just use an array for this instead? Let's ponder this for a moment.
>
> Let's give each day an array with 10 slots.
> What if you have a particularly successful week of procrastination and
> you end up with 20 events? Or 30? Or 100? Let's just make the array bigger.
> I see your 10 element array and I raise you 20. To grow this array,
> you'd have to allocate more space, then loop through the old array,
> copying each event over to the new, larger array. Finally, to prevent memory leaks,
> you'd have to free the old array.
>
> Now to really prove the point, let's say you have to go watch the Minecraft
> movie with your friends and you find a last minute ticket for the 3:30 showing
> **today**. If you have a lot of events after it, then using an array would
> require you to shift _all of them_ over by one slot and possibly have to copy
> the entire array. That's a lot of work!
>
> Okay now with that point made, I hope you won't come bearing diamond swords
> when I say that linked lists are the way to go for representing calendar events.
> They are much easier to work with when it comes to inserting and deleting
> arbitrary events. You can just change a few pointers and you're done.
> No need to shift everything over!

Your program will interact with the user via a TUI (text-based user interface).
The user is able to enter text in response to interactive prompts to perform all
available actions on the calendar, including saving it to a file and loading it
from a file. To reduce your workload and sharpen your focus on linked lists and
structs, **we have implemented user interaction and file saving/loading
operations for you**. Your task, then, is to implement all the other calendar
operations.

### Unix time

To represent points in time in our calendar, we will use
[Unix time](https://en.wikipedia.org/wiki/Unix_time), also frequently referred
to as **POSIX time** or **Epoch time**. It is a widely used standard in computing
for representing a specific point in time. It measures
time as the total number of non-leap [seconds](https://en.wikipedia.org/wiki/Second)
that have elapsed since 00:00:00 [UTC](https://en.wikipedia.org/wiki/Coordinated_Universal_Time)
(Coordinated Universal Time) on Thursday, 1 January 1970. This specific starting
date and time is known as the [Unix epoch](https://en.wikipedia.org/wiki/Unix_time#Encoding_time_as_a_number).

This system provides a simple, unambiguous numerical representation of time,
making it easy for computer systems to store, compare, and calculate time
durations, independent of time zones or daylight saving rules. If you're curious
what it is in Unix time right now (according to your machine), it's
<code id="timestamp"></code>. Or, you can run:

```
date +%s                (Linux, macOS, or WSL)
Get-Date -UFormat %s    (Windows)
```

<script>
    setInterval(() => {
        document.getElementById("timestamp").innerText = Math.floor(Date.now() / 1000);
    }, 200, 20);
</script>

{: .note }

> Keen observers will recall that integers are stored as 4 bytes. Many systems,
> especially older ones, store Unix time in signed 32-bit integers, which can
> hold values from $$-2^{31}$$ to $$2^{31} - 1$$. The maximum positive value,
> $$2147483647$$, corresponds to **03:14:07 UTC on Tuesday, January 19, 2038**.
> So, what happens one second later? (You can figure this out using what you
> learned on April 17 during lecture!)
>
> Due to two's complement representation, the value will wrap around to become
> the largest _negative_ number, $$-2147483648$$. Systems interpreting this
> timestamp will suddenly think the date is **20:45:52 UTC on Friday, December 13, 1901**.
> This is known as the [Year 2038 Problem](https://en.wikipedia.org/wiki/Year_2038_problem).
>
> Nowadays, modern systems store Unix time in signed 64-bit integers, which
> will take ~292 billion years to overflow. This is much longer than the
> estimated age of the universe, so we, as systems programmers, are satisfied.

While this PA will show you the big idea behind Unix time, you won't need
to write C code to parse, format, or interpret Unix time values. In fact, **you
should NOT have to use any function declared in `time.h`, including `localtime`,
`mktime`, or `difftime`.** We have written those parts for you in the
implementation of `same_date` and `combine_date_time`.

All you need to know about Unix time is that it is _monotonic_: **When comparing
two time values, the larger value always represents a later time.** You will
need this fact to keep calendar events sorted by start time within each day.

## Getting Started

Click the following button to accept the GitHub Classroom assignment for this
PA and create your repository. Same as before, clone your repository into your
`ieng6` account.

[GitHub Classroom assignment](https://classroom.github.com/a/RmCIvL7l){: .btn .btn-blue }

In your repository, `calendar.h` is a _header file_ that outlines all the
structs and functions in this PA and specifies each function's behavior in
detail. Use this file as a reference as you work on this PA. The final section
of this header file (marked with TODO) lists all the functions you are tasked
with implementing:

1. `add_event`
2. `remove_event`
3. `search_event`
4. `reschedule_event`
5. `duplicate_event`
6. `free_week`

All your code should be written in `calendar.c`. **Do not
edit `calendar.h`!**

{: .note }

> There are a few new language constructs in `calendar.h`:
>
> - `#ifndef CALENDAR_H` and `#define CALENDAR_H` form a _header guard_ that
>   prevents the preprocessor from processing the contents of `calendar.h`
>   multiple times. You'll learn more about header guards in a future lab.
> - `typedef` creates an alias for a type name. In our header file, we have
>   used `typedef` such that you can use `event_t` in place of `struct event`,
>   `day_t` in place of `struct day`, etc.

Alongside `calendar.h`, `callib.c` holds all the functions we have implemented
for you. This includes saving to files, loading from files, printing calendars,
and user interaction via the terminal.

`samples` is a directory containing files that each represent a 7-day calendar
filled with events. Feel free to use these files to test your work.

{: .important }
**When turning in your work, only `calendar.c` and `credits.txt` will be
used by the autograder**. All other files, including `calendar.h`, will be
ignored.

### Helper functions

We highly recommend creating your own helper functions. Here are a few reasons
why helper functions are so useful:

- **Decrease Code Repetition**: By placing shared code into helper functions, you
  avoid writing the same code multiple times, making your program easier to update
  and manage.
- **Promote Reusability**: Once written, helper functions can often be reused across
  different parts of your program saving you time and effort.
- **Improve Readability**: Well-named helper functions break down complex tasks
  into smaller, understandable pieces - making your code easier to follow.
- **Convenient to Test**: Smaller functions focused on a single task are easier to
  test and debug individually, which helps ensure correctness and catch issues early.

Here are a few examples of helper functions you might consider creating:

- A function to determine which day an event belongs to based on its start and
  end times.
- A function to check for scheduling conflicts between a calendar and a
  potential event to add to it.
- A function to traverse through a linked list and find the right position to
  insert a new event into.
- A function to verify all the [invariants](#invariants), which you can
  call after each calendar operation to ensure the integrity of your data
  structures.

### Split screens in Vim

Starting with this PA, you'll need to look back and forth between a header file
and its corresponding source file frequently. You can facilitate this in Vim by
splitting your terminal screen vertically, displaying the header file on one
half and the source file on the other half:

![Vim displaying calendar.h and calendar.c side-by-side](/assets/PA2_split.png)

To open `calendar.h` and `calendar.c` side-by-side, run
`vim -O calendar.h calendar.c` in the root of your cloned repository.
Alternatively, you can open up another file in a vertical split using the
command `:vsplit <other file name>`, like `:vsplit calendar.c`. To switch
between the tabs, press <kbd>Ctrl</kbd>+<kbd>W</kbd> twice. When you have
multiple files open like this, the `:q` command only closes the current file
you're in. You can use the `:qa` command to "**q**uit **a**ll", which closes the
editor entirely.

Lastly, you can could also open a new terminal window and log into ieng6 (yes,
you can have multiple accounts signed in at once!). From here, you have the same
flexibility as before. (One of the tutors sometimes has 4-5 terminals open at once!)
Either way, **always make sure you exit Vim using a Vim command**, not by
closing a terminal window with Vim running. This helps prevent stale swapfiles.

## Program Specifications

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

## Testing

We recommend that you test your work **thoroughly** and **incrementally**. To
test incrementally, you should test a function's implementation as soon as you
finish writing that function by interacting with your program. To test
thoroughly, you should come up with logical cases that cover all possible inputs
and states and test each case. For example, `add_event` could insert an event at
the beginning, the middle, or the end of a linked list that could start out with
0, 1, 2, or more than 2 elements. To test your solution without having all the
functions written, you can compile your program using the command we provide
below and restrict your TUI commands to the operations you have implemented.

Alongside the functions we ask you to implement, you can consider writing a
helper function that verifies all the invariants listed above and call this
function at the end of `add_event`, `remove_event`, etc. so that you can catch
bugs closer to their source.

To minimize busywork building elaborate calendars, we have provided a few sample
calendars that you can test with. When running your program, you can load them
in by typing `samples/sample.unical`, for example. Note that your program will use
your `add_event` function to load the events stored in the file, so if loading
the file leads to an issue, there is probably a problem with your `add_event`
implementation.

### Compilation

{: .important }
This compilation command is different from the one you used in Lab 1 because the
`callib.c` is part of the program.

To compile your program, run

```
gcc calendar.c callib.c -o calendar
```

If you'd like, feel free to include:

- `-g` so you can use GDB to debug your code (if you don't know what this is,
  visit [Lab 3](/lab3))
- `-Wall` so the compiler gives you more helpful warnings (like unused
  variables)
- `-Wextra` so the compiler gives you a few more helpful warnings

### Interacting with your program

Added on April 30
{: .label .label-purple }

After running the compilation command above, you can run the compiled program
and type commands that cause each of your functions to be called. When it
begins, it will attempt to list all the `.unical` files in the current directory
and ask you to enter the path to a `.unical` file to pre-load events from. To
pre-load a sample calendar from `samples/`, type something like
`samples/course.unical`. To start with an empty calendar, just press Enter.

The program will display the prompt `unical >` and accept commands from
you in a loop, much like your terminal shell. Use the command `?` to list all
the available commands. Each command is identified by a single letter, like `w`
for writing the calendar in memory to a `.unical` file. After calling your
functions, you can use `p` (for print) or `l` (for list) to display the entire
calendar for verification.

{: .note }

> The `p` command displays the calendar in a graphical format where each line
> represents an instant, not a time interval. As such, each event occupies both
> the line for its start time _and_ the line for its end time. For example, an
> event from 11:00 to 12:00 looks like:
>
> ```
> 11:00 || 001 Work on PA |
> 11:15 || 001 Work on PA |
> 11:30 || 001 Work on PA |
> 11:45 || 001 Work on PA |
> 12:00 || 001 Work on PA |
> ```
>
> Under this scheme, back-to-back events (like 11:00--12:00 followed by
> 12:00--13:00) overlap at the `12:00` line, where the earlier event takes
> precedence.

### Make your own cases

You can make your own example test cases using Google Calendar. As of right now,
the provided script only works on the week of May 12, 2025. Here is how you can
make your own test cases:

1. Open Google Calendar, open the burger menu on the left, and click `+` next to
   `Other calendars`.
2. You can name this whatever you want. For reference, we will be naming it "CSE
   29 Calendar". Next, hover over the calendar you just created and click
   "Display this only"
3. Create your own events! Ideally, each start and end time should be aligned
   along 15 minute intervals, although the script should be to round the times to
   the correct interval (but do this at your own risk). Make sure none of the
   events overlap.
4. Once you're satisfied, hover over the calendar again and click
   `Settings and sharing`.
5. Then, click `Export calendar` in the `Calendar settings` tab. This should
   give you a zip file for download.
6. Then, run
    ```bash
    scp <PATH TO YOUR ICS ZIP FILE> <USERNAME>@ieng6.ucsd.edu:~/<PATH TO YOUR PA2>
    ```
    in your terminal.
7. On ieng6, check if your zip file is in your PA directory using `ls`. If it
    isn't there, go back a step. Now, you should be able to run:
    ```bash
    bash zip_to_unical.sh <NAME OF YOUR ICS ZIP FILE> out.unical
    ```
8. Now, you should have your converted calendar file. Happy testing!

{: .note-title }
> A Quick Intro to `scp`
>
> The `scp` (Secure Copy Protocol) command is a fundamental tool for securely
> transferring files between computers over a network, using the SSH
> (Secure Shell) protocol for authentication and encryption. It's particularly
> useful when you need to move files between your local machine and a remote
> server, like the `ieng6` servers used in this course.
>
> The basic syntax mirrors the standard `cp` command but includes host
> information:
>
> ```
> scp [options] [user@]source_host:]source_path [user@]destination_host:]destination_path
> ```
>
> For example, to copy a local file `my_file.zip` to your home directory on
> `ieng6`, you would use:
>
> ```bash
> scp my_file.zip your_username@ieng6.ucsd.edu:~/
> ```
>
> Conversely, to copy a file _from_ the server _to_ your local machine, you'd
> reverse the source and destination:
>
> ```bash
> scp your_username@ieng6.ucsd.edu:~/remote_file.txt .
> ```
>
> (The `.` at the end represents your current local directory). Using `scp`
> ensures your file transfers are encrypted and secure.

## Mid-quarter Reflection Survey

The last part of this assignment is a reflection survey.
Please spend a few minutes reflecting on your experience in this course and
give thoughtful and truthful answers.

[Take Mid-quarter Reflection Survey](https://docs.google.com/forms/d/e/1FAIpQLSd2IeM1jYW8FVEhsPaYZtOSWpgiCLOlOZnOTw8ZJ9-liO8I2A/viewform?usp=sharing){: .btn .btn-purple }

## Grading and Point Distribution

We will evaluate your work using both _unit tests_ and _end-to-end tests_. Our
unit tests verify each of your functions in isolation and does not involve
the `main()` function. Our end-to-end tests run the executable program
compiled from `calendar.c` on various inputs designed to exercise all parts of
your solution together.

Unlike PA 1, **the autograder checks for memory leaks** for all test cases.
If your program behaves correctly but leaks memory for a particular
test case, you earn 80% of the total points allocated for it. For example, if
your program behaves correctly but leaks memory for a 2-point unit test case,
you earn $$2\times 0.8 = 1.6$$ out of 2 points.

| Grade component               | Public points | Hidden points | Total points |
| :---------------------------- | :------------ | :------------ | :----------- |
| `add_event`                   | 6             | 2             | 8            |
| `remove_event`                | 4             | 2             | 6            |
| `search_event`                | 4             | 2             | 6            |
| `reschedule_event`            | 6             | 1             | 7            |
| `duplicate_event`             | 5             | 1             | 6            |
| End-to-end tests              | 4             | 2             | 6            |
| Mid-quarter reflection survey | 1             | 0             | 1            |

Total: 40 points
{: .fs-5 .fw-500 }

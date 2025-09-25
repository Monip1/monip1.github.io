---
layout: default
title: PA 4
parent: Programming Assignments
permalink: /pa4
nav_order: 5
toc: sidebar
---

# PA 4: Pioneer Shell
{: .no_toc }

Due date: June 3 23:59 PDT
{: .fs-4 }

[GitHub Classroom Assignment](https://classroom.github.com/a/LHNdc_-a){: .btn .btn-blue }

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

## Learning Goals

This assignment calls upon many of the concepts that you have practiced
in previous PAs. To put it more elegantly, it's a _celebration_ of this
entire wonderful quarter of CSE 29.

Specifically, we will practice the following concepts in C:

- String manipulation using library functions
- Command line arguments
- Opening, reading from, and writing to files
- Process management using `fork()`, `exec()`, and `wait()`

## Introduction

Throughout this quarter, you have been interacting with the ieng6 server
via the terminal---you've used vim to write code, used `gcc` and `make` to
compile, used `git` to commit and push your changes, _etc._ The program that
enables you to interact with the ieng6 server via commands is the _shell_, the
terminal user interface of the operating system.

At its core, the shell is just a program that parses user input and runs
built-in commands (such as `cd`) or executable programs (such as
`ls`, `gcc`, `make`, or our favorite `vim`).

As a perfect way to wrap up this quarter, **you will now create your own
shell** (a massively simplified one of course). We shall call it:

## The Pioneer Shell

The **pi**oneer **sh**ell, or as we endearingly call it, _pish_ (a name
with such elegance as other popular programs in the UNIX world, _e.g._, git).

{: .note }
There any many shell languages. The most common ones are `bash` and `zsh`.
There is a standard for these shell langauges called the [POSIX standard](https://en.wikipedia.org/wiki/POSIX).
`bash` and `zsh` are two POSIX compliant languages; `fish` and `powershell`
are two that are not. Some of us love `fish`; it has fancy autocomplete!
`bash` is the default shell on ieng6, while `zsh` is the default shell on macOS.

Your basic shell simply runs on an infinite loop; it repeatedly:

- Prints out a prompt
- Reads keyboard input from the user
- Parses the input into our familiar `argv` (a list of arguments)
- If the input is a built-in shell command, then executes the command directly;
- Otherwise, **creates a child process** to run the program specified in
  the input command, and waits for that process to finish
- If the user types `exit`, then the shell is terminated

This mode of operation is called the _interactive mode_. The other mode
you will need to implement is:

### Script Mode

A shell script, as its name suggests, is a script that runs a series of shell
commands that accomplishes some tasks. These scripts can get very complicated
depending on the task being automated, but even simple shell scripts can save
lots of time. (Imagine having a shell script that runs all the tests in PA 3!)
Any command that you can run on the command line can be written as an
instruction in a shell script.

Here's a simple shell script that prints "Hello, World!" and lists the files in
the current directory:

```bash
echo "Hello, World!"
echo "Here are the files in the current directory:"
ls
```

Shell programs (like `bash`, which is what you have been using on ieng6) also
support a script execution mode. In this mode, instead of
printing out a prompt and waiting for user input, the shell reads from a
script and executes the commands from that file one line at a time.

In both modes, once the shell hits the end-of-file marker (EOF), it should
call `exit(EXIT_SUCCESS)` to exit gracefully. When not in script mode, you can
send the EOF marker to a running program by pressing **Ctrl-D**.

## Parsing Input

Every time pish reads a line of input (be it from `stdin` or from a file),
it breaks it down into our familiar `argv` array.
For instance, if the user enters `"ls -a -l\n"` (notice the newline character),
the shell should break it down into `argv[0] = "ls"`, `argv[1] = "-a"`, and
`argv[2] = "-l"`. To ensure compatibility with `execvp()`, `argv` should be
**NULL-terminated**, so in this example, pish should also set `argv[3] = NULL`.
More on this in [the `execvp` section](#the-execvp-system-call).

### Handling Whitespaces

You should make sure your code is robust enough to handle various sorts of
whitespace characters. In this PA, we expect your shell to handle any
arbitrary number of spaces (` `) and tabs (`\t`) between arguments.

For example, your shell should be able to handle the following input:
`"   \tls\t\t-a -l     "`, and still run the `ls` program with the
correct `argv` array. You have a few choices on how you want to parse inputs:

1. `strtok()`
2. `strsep()`
3. You can try to implement either of these from scratch if you'd like!

As usual, for an authentic Unix-style systems programming experience, we
recommend using man pages to learn about how to use these functions. Try `man
strtok` or `man strsep`.

{: .note }
In Vim, you can launch a terminal next to an open file by running the
command `:vert term`. Then, you can pull up your man page of choice in the
terminal. As before, switch between the terminal and the file by pressing
**Ctrl+W** twice.

## Built-In Commands

Whenever your shell executes a command, it should check whether the command is
a **built-in command** or not. Specifically, the first whitespace-separated
value in the user input string is the command. For example, if the user enters
`ls -a -l tests/`, we break it down into `argv[0] = "ls"`, `argv[1] = "-a"`,
`argv[2] = "-l"`, and `argv[3] = "tests/"`, and the _command_ we are checking
for is `argv[0]`, which is `"ls"`.

If the command is one of the following built-in commands, your shell should
invoke your implementation of that built-in command.

There are three built-in commands to implement for this project: `exit`, `cd`,
and `history`.

### Built-in Command: `exit`

When the user types `exit`, your shell should simply call the `exit` system
call with `EXIT_SUCCESS` (macro for 0) as argument. This command does not
take arguments. If any is provided, it should call the `usage_error` function
provided in the starter code.

### Built-in Command: `cd`

`cd` should be executed with precisely 1 argument, which is the path to change to.
You should use the `chdir()` system call with the argument supplied by the
user. If `chdir()` fails (refer to man page to see how to detect failure),
you should call `perror("cd")` to print an error message. We will explain
the `perror()` function in a later section.

#### `cd -`

Here's a neat trick with `cd` that we haven't shown you in lab: if you switch
between some directories on `ieng6` and then run `cd -`, the shell prints the
previous directory you were in and changes into it. Observe:

```
you@ieng6-203:~/cse29$ cd pa3-malloc
you@ieng6-203:~/cse29/pa3-malloc$ cd -
/home/linux/ieng6/oce/you/cse29
you@ieng6-203:~/cse29$ cd -
/home/linux/ieng6/oce/you/cse29/pa3-malloc
you@ieng6-203:~/cse29/pa3-malloc$ pwd
/home/linux/ieng6/oce/you/cse29/pa3-malloc
```

Try it yourself on `ieng6` to understand what it does.

Let's implement this feature in pish. If the path to change to is a hyphen
(`"-"`), the shell should determine the previous working directory,
i.e., the program's working directory right before the previous `cd` command in
the same shell session. (This means you shouldn't read from the history file to
determine the previous working directory.) If there is no previous `cd` command
in the same session, the shell should print the current working directory.
Otherwise, it should print the previous working directory and change into it
using `chdir`. For example, here's how pish should behave:

```
(the pish program launches here)
you@pish /home/you/cse29/pa4-pish$ pwd
/home/you/cse29/pa4-pish
you@pish /home/you/cse29/pa4-pish$ cd -
/home/you/cse29/pa4-pish
you@pish /home/you/cse29/pa4-pish$ cd ..
you@pish /home/you/cse29$ cd -
/home/you/cse29/pa4-pish
you@pish /home/you/cse29/pa4-pish$ cd -
/home/you/cse29
you@pish /home/you/cse29$
```

### Built-in Command: `history`

When the user enters the `history` command without additional arguments, the
shell should print out a list of all commands the user has ever executed in
_interactive mode_.

To do this, we will need to write the command history to a file for persistent
storage. Just like `bash`, we designate a hidden file in the user's home
directory to store the command history.

{: .note}
If you are on ieng6, open the `~/.bash_history` file to take a look at all
the commands you have executed. How far you've come this quarter!

Our history file will be stored at `~/.pish_history`. (You will find a function
in the starter code that help you get this file path.) Every time a command is
processed, it should be written to this file using the
`add_history()` function **unless**:

1. The command is processed in script mode, **OR**
2. The command is empty (`argc == 0` or whitespace-only)

When at least one of these conditions is true, the command should not be
written to the history file.

In our shell, the `history` command can _either_ display the command history or
clear it. When the user types in the `history` command without additional
arguments, it should print out all the contents of our history file,
adding a counter to each line:

```
you@pish /home/you/cse29$ history
1 history
you@pish /home/you/cse29$ pwd
/home/you/cse29
you@pish /home/you/cse29$ ls
pa1-enigma  pa2-calendar  pa3-malloc  pa4-pish
you@pish /home/you/cse29$ history
1 history
2 pwd
3 ls
4 history
```
{: .lh-0}

{: .note}
The number before each line in the output of the `history` command is added
by the program. Do not write the number to `~/.pish_history`!

When the user types `history -c`, however, our shell should clear the history
file by either removing all content from the file or deleting the
file entirely. Nothing needs to be printed in this case.

## Running Programs

If, instead, the command is _not_ one of the aforementioned built-in commands,
the shell treats it as a _program_, and spawns a child process to run the program
using the `fork()` and `exec()` family of system calls.

{: .note}

> When you run a program in the shell, _e.g._, the `gcc` compiler, do you ever wonder
> where that program actually is? And how does the shell know where to find it?
>
> We can locate the program executable using the `which` command:
>
> ```
> $ which gcc
> /usr/bin/gcc
> ```
>
> So we see that the `gcc` executable is actually stored in a directory called
> `/usr/bin/`. And how does the shell know to look there? That's because of an
> _environment variable_ called `PATH`, which keeps track of places in the file
> system where executable programs can be found.

### The `fork()` system call

The `fork()` system call is perhaps very counter-intuitive if you are seeing it
for the first time. Please make sure you understand how to distinguish between
the parent process and the child process when using it. The man page for `fork()`
is particularly useful for this.

### The `execvp()` system call

```c
int execvp(const char *file, char *const argv[]);
```

Specifically, we will use the `execvp()` system call to run the desired program
**in the child process** created by `fork()`, which means after `fork()`, it is
the child process's responsibility to call the `execvp()` system call with the
appropriate arguments.

Pay close attention to the `argv` argument. This is just like the `argv` parameter
that the `main` function gets (_i.e._, `int main(int argc, char *argv[])`). But
how does `execvp` know how many elements are in this `argv` array? With the `main`
function, we get an explicit `argc` which tells us the length of the array, but
there is no such thing here.

To find the answer, we turn our attention again to the manual (`man execvp`). And
from the manual, we find the following:

> The `char *const argv[]` argument is an array of pointers to **null-terminated**
> strings that represent the argument list available to the new program. The first
> argument, by convention, should point to the filename associated with the file
> being executed. The array of pointers **must** be terminated by a null pointer.

To illustrate this, consider the following input to the shell: `mv test.c test.c.old`
(which renames `test.c` to `test.c.old`). Parsing this command into the `argv` array,
we should have

```c
argv[0] = "mv";
argv[1] = "test.c";
argv[2] = "test.c.old";
argv[3] = NULL;  // This is NECESSARY for execvp()
```
{: .lh-0}

With the correct `argv` array, `execvp()` will find and execute the program.
But how do we know if the `execvp()` call succeeded or failed? The
answer to that is simple: Because `execvp()` _replaces_ the current process
with another, if the call succeeded, any code written after `execvp()` will
never be executed, because the program itself has been replaced. So, we know
`execvp()` failed if our shell child process continues executing, which means
you can simply put any error handling code directly after the `execvp()` system
call. We will discuss error handling in more detail in a later section.

### The `wait()` system call

While the child process is off on some wild adventure executing some exciting
program like `gcc`, the parent must patiently wait for the child to finish.
This can be accomplished by the `wait()` system call. Please refer to the man
page for details on how to use this system call.

## Policies

For this PA, do not `#include` any header file beyond what is already included
in the starter code. Also, do not edit `pish_history.h` because the autograder
will ignore your edits and always use the starter code's copy of that file.

## Excluded Features

Now because our shells are quite simple, there are a lot of things that you may
be accustomed to using that will not be present in our shell. (Just so you are
aware how much work the authors of the bash shell put into their product!)

You will not be able to:

- use the arrow keys to navigate your command history,
- use `<tab>` to autocomplete commands,
- use the tilde character (`~`) to represent your home directory,
- use redirection (`>` and `<`),
- pipe between commands (`|`),
- and many more...

Don't freak out when these things don't work in your shell implementation!

If this were an upper-division C course, we would also ask you to implement
redirection and piping, but you have enough work to do...

## Handling Errors

Because the shell is quite a complex program, we expect you to handle
many different errors and print appropriate error messages. To make this
simple, we now introduce--

### Usage errors

This only applies to built-in commands. When the user invokes one of the
shell's built-in commands, we need to check if they are doing it correctly.

- For `cd`, we expect `argc == 2`,
- For `history`, we expect an optional `-c` argument and nothing else.
- For `exit`, we expect `argc == 1`.

If the users enters an incorrect command, _e.g._ `exit 1`, `cd` without
a path, `history -x`, or `history 1 2`, then you should call the `usage_error()`
function in the starter code and continue prompting the user for commands.

### The `perror()` function

```c
void perror(const char *s);
```
{: .lh-0}

The `perror()` function produces a message on stderr describing the last
error encountered during a library function/system call. It's a very
convenient way to report errors.

When printing the error message, `perror()` would first print whatever
string `s` we give it, followed by a colon and a blank.

Consider an example where we try to open a nonexistent file using
`fopen()`, the call should fail and not return a valid FILE pointer,
in which case, we call `perror()` to report the problem:

```c
FILE *fp = fopen("noexist.txt", "r");
if (fp == NULL) {
    perror("noexist.txt");
    return EXIT_FAILURE;
}
```
{: .lh-0}

If we run this program, we would get the following output:

```
noexist.txt: No such file or directory
```
{: .lh-0}

### System Errors

You need to handle errors from the following system calls/library functions
using `perror()`. Please pay attention to the string we give to `perror()`
in each case and reproduce it in your code.

- `fopen(filename, ...)` failure: `perror(filename)`,
- `chdir()` failure: `perror("cd")`,
- `execvp(cmd, ...)` failure: `perror(cmd)`,
  - Example: Running the command `nonexistent -q` should cause
    `nonexistent: No such file or directory` to be printed to stderr.
- `fork()` failure: `perror("fork")`,

## Getting Started

The starter code for this assignment is hosted on GitHub classroom.
Use the following link to accept the GitHub Classroom assignment:

[**Click here to accept this GitHub Classroom assignment.**][classroom]
(Right click to open in new tab.)

[classroom]: https://classroom.github.com/a/LHNdc_-a

Just like last time, clone the repository to **your `ieng6` account**.

### The Code Base

There aren't as many files this time (phew!), and the starter code is fairly
minimal. You are given the following files:

- `pish_history.h`: Defines `struct pish_arg` for handling command parsing; declares
  functions handling the history feature.
- `pish.c`: Implements the shell, including parsing, some built-in commands,
  and running programs.
- `pish_history.c`: Implements the history feature.
- `Makefile`: Builds the project.
- `ref-pish`: A reference implementation of the shell. Note that in this
  version, the history is written to `~/.ref_pish_history` rather than
  `~/.pish_history`, to avoid conflict with your own shell program.

### Running `pish`

First, run `make` to compile everything. You should see the `pish` executable
in your assignment directory.

To run `pish` in interactive mode (accepting keyboard input), type

```
$ ./pish
```

Or, to run a script (_e.g._, `script.sh`), type

```
$ ./pish script.sh
```

The same applies for the reference implementation `ref-pish`.

### Incremental development

This project once more requires you to think carefully about _incremental
development_. There are many things to, how should you go about everything?
In what order? Here's one possible plan:

1. Start by implementing input parsing. Think about how to
   break down the line and put it into `struct pish_arg`.
   1. Start from simple commands without any arguments, _e.g._, `"ls"`.
   1. Next, make sure you can parse commands with arguments, _e.g._, `"ls -a"`.
   1. Next, make sure you can handle arbitrary whitespaces.
   1. Make sure reading from a script file works just as well as from `stdin`.
1. Once command parsing is working, go on to implement some built-in
   commands: `exit` and `cd`. Make sure to take care of error handling.
1. Add support for `cd -`, _then test it_.
1. After that, start implementing running programs with `fork` and `exec`.
1. Once that's working, you can finish implementing the `history` command.

The list above is just a suggestion. You are of course encouraged to come up
with your own implementation plan. But the most important thing is that _you
should have a plan_!

## Submission and Grading

### Final reflection survey

As we wrap up the quarter, please take a moment to tell us about your
experience in CSE 29 so that we can improve it in future quarters. Unlike
previous reflection surveys, this one is _anonymous_ and does not contribute to
your PA 4 grade. We appreciate your feedback!

[Take the Final Reflection Survey](https://forms.fillout.com/t/n16vmvG6cfus){: .btn .btn-purple }

### Citing AI usage

Same as before, please cite your usage of AI tools in a new file named
`credits.txt`. You should describe what you asked AI tools to do and how their
answers helped you complete this PA. You do not need to cite external sources
that are not AI-driven, such as Google, Stack Overflow, man pages, and
GeeksForGeeks. The autograder will ensure that you have filled out
`credits.txt`, but its content will not have any effect on your grade.

### Grading and Point distribution

Submit to [Gradescope][gscp], where the autograder will run a series
of tests to validate your shell implementation. Most tests will include a
Valgrind check. If a test produces correct results but also
produces Valgrind errors, you earn 80% of the points available for that test.

| Feature             | Public points | Hidden points | Total |
| :------------------ | :------------ | :------------ | :---- |
| Parsing commands    | 5             | 5             | 10    |
| Launching processes | 15            | 0             | 15    |
| Script mode         | 10            | 0             | 10    |
| `cd`                | 20            | 5             | 25    |
| `history`           | 15            | 0             | 15    |
| `exit`              | 5             | 0             | 5     |
| Everything          | 0             | 10            | 10    |

Total: 90 points
{: .fs-5 .fw-500 }

[gscp]: https://www.gradescope.com/courses/1013315

## Acknowledgements
{: .no_toc }

This assignment was inspired by [Project 2a of CS 537 @ University of
Wisconsin-Madison (Fall 2019)][cs537p2a] by [Prof. Shivaram Venkataraman][shiv],
which was adapted from [the Shell project accompanying the _Operating
Systems: Three Easy Pieces_ textbook][ostepshell] by [Prof. Remzi
Arpaci-Dusseau][remzi] and [Prof. Andrea Arpaci-Dusseau][andrea].
Jerry Yu authored this PA in 2024 and expresses his eternal gratitude
to these three professors for their mentorship.

[cs537p2a]: https://pages.cs.wisc.edu/~shivaram/cs537-sp19/p2a.html
[shiv]: https://pages.cs.wisc.edu/~shivaram/
[ostepshell]: https://github.com/remzi-arpacidusseau/ostep-projects/tree/master/processes-shell
[remzi]: https://pages.cs.wisc.edu/~remzi/
[andrea]: https://pages.cs.wisc.edu/~dusseau/

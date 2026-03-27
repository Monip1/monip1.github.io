---
layout: default
title: PA 4
parent: Programming Assignments
permalink: /pa4
nav_order: 5
toc: sidebar
---

# PA4: The Pioneer Shell
{: .no_toc}


### Due Date: Tuesday, March 11 23:59
{: .no_toc}

[Github Classroom Assignment](https://classroom.github.com/a/fbAXTGX6)

### Updates and Revisions
{: .no_toc}

* [March 7, 10:18] Added section on shell scripting


<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>

<!-- {: .note}
Watch [the discussion podcast][podcast] if you need to review how to
use the `fork()`/`exec()`/`wait()` system calls. (You need to **log in**
to the podcast website to view both camera and screen feed.) The
slides for this discussion is [shared via Google Drive][slides].

[podcast]: https://podcast.ucsd.edu/watch/sp24/cse29_c00/28
[slides]: https://drive.google.com/file/d/1j-vKVtad0BNsrhlWJNmiF2EypGa-q8Ew/view?usp=sharing -->


## Learning Goals

This assignment calls upon many of the concepts that you have practiced
in previous PAs. To put it more elegantly, it's a _celebration_ of this 
entire wonderful quarter of CSE 29.

Specfically, we will practice the following concepts in C:

- string manipulation using library functions,
- command line arguments,
- opening, reading from, and writing to files,
- process management using `fork()`, `exec()`, and `wait()`, and of course,
- using the terminal and vim.

## Introduction

Throughout this quarter, you have been interacting with the ieng6 server
via the terminal -- you've used vim to write code, used `gcc` and `make` to
compile, used `git` to commit and push your changes, _etc._ At the heart
of all this lies **the shell**, which acts as the user interface for the
operating system.

At its core, the shell is just a program that reads and parses user input, 
and runs built-in commands (such as `cd`) or executable programs (such as
`ls`, `gcc`, `make`, or our favorite `vim`).

As a perfect way to wrap up this quarter, **you will now create your own
shell** (a massively simplified one of course). We shall call it--

## The Pioneer Shell

The **pi**oneer **sh**ell, or as we endearingly call it, _pish_ (a name 
with such elegance as other popular programs in the UNIX world, _e.g._, git).

Your basic shell simply runs on an infinite loop; it repeatedly--

* prints out a prompt, 
* reads keyboard input from the user
* parses the input into our familiar `argv` (a list of arguments),
* if the input is a built-in shell command, then executes the command directly,
* otherwise, **creates a child process** to run the program specified in
  the input command, and waits for that process to finish.
* if the user types `exit`, then the shell is terminated.

This mode of operation is called the _interactive mode_. The other mode
you will need to implement is--

### Batch Mode

Shell programs (like `bash`, which is what you have been using on ieng6) also
support a batch execution mode, _i.e._, scripts. In this mode, instead of
printing out a prompt and waiting for user input, the shell reads from a
_script file_ and executes the commands from that file one line at a time.

In both modes, once the shell hits the end-of-file marker (EOF), it should
call `exit(EXIT_SUCCESS)` to exit gracefully. In the interactive mode, this
can be done by pressing Ctrl-D.

## Parsing Input

Every time the shell reads a line of input (be it from `stdin` or from a file),
it breaks it down into our familiar `argv` array.

For instance, if the user enters `"ls -a -l\n"` (notice the newline character), 
the shell should break it down into `argv[0] = "ls"`, `argv[1] = "-a"`, and
`argv[2] = "-l"`. In the starter code, we provide a struct to hold the parsed
command.

### Handling Whitespaces

You should make sure your code is robust enough to handle various sorts of
whitespace characters. In this PA, we expect your shell to handle any
arbitrary number of spaces (` `) and tabs (`\t`) between arguments.

For example, your shell should be able to handle the following input:
`"   \tls\t\t-a -l     "`, and still run the `ls` program with the
correct `argv` array.

To split the arguments is very much like what you did in PA 3, and since
we don't want to repeat PA 3, we will introduce a C library function to
help us split strings:

### The `strtok()` function

```c
char *strtok(char *str, const char *delim);
```
{: .lh-0}

The `strtok()` function breaks a string into a sequence of zero or more
nonempty tokens. **On the first call to `strtok()`, the string to be parsed
should be specified in `str`. In each subsequent call that should parse
the same string, `str` must be `NULL`.**

The `delim` argument specifies a set of characters that _delimit_ the tokens
in the parsed string.

Each call to `strtok()` returns a pointer to a null-terminated string
containing the next token. If no more tokens are found, `strtok()` returns
`NULL`.

The above paragraphs are taken directly from the Linux manual. Now let's see
this function in action:

Suppose we have the following string:

```c
char str[32] = "A|BC|D E   |FGH   \n"
```
{: .lh-0}

And we would like to break it down by either `'|'`, `' '`, or `'\n'`, which
would leave us `"A"`, `"BC"`, `"D"`, `"E"`, and `"FGH"`. We can write
the following code:

```c
#include <stdio.h>
#include <string.h>

int main()
{
    char str[32] = "  A|BC|D E   |FGH   \n";
    // break down the string at '|', ' ', and '\n' delimiters.
    char *tok = strtok(str, " |\n");
    while (tok) {
        printf("\'%s\'\n", tok);
        tok = strtok(NULL, " |\n");
    }
    return 0;
}
```
{: .lh-0}

And running this program gives us:

```
'A'
'BC'
'D'
'E'
'FGH'
```
{: .lh-0}

Note again that we try to break down (tokenize) the string using three
possible delimiter characters: `'|'`, `' '`, or `'\n'`, the `delim` **string**
we pass to `strtok()` has these three characters: `" |\n"`. 

{: .note}
Note here we declare a character array instead of using a character pointer
to the string literal. This is because just like what you did in PA 3, the
`strtok()` function needs to **modify** the string to parse it into tokens,
which means we need a string that is **mutable**. You do not have to worry
about this in the PA though, since you won't be calling `strtok()` on string
literals. Just FYI.

You will find `strtok()` very useful for your implementation.

## Built-In Commands

Whenver your shell executes a command, it should check whether the command is
a **built-in command** or not. Specifically, the first whitespace-separated
value in the user input string is the command. For example, if the user enters
`ls -a -l tests/`, we break it down into `argv[0] = "ls"`, `argv[1] = "-a"`,
`argv[2] = "-l"`, and `argv[3] = "tests/"`, and the _command_ we are checking
for is `argv[0]`, which is `"ls"`.

If the command is one of the following built-in commands, your shell should 
invoke your implmementation of that built-in command.

There are three built-in commands to implement for this project: `exit`, `cd`,
and `history`.

### Built-in Command: `exit`

When the user types `exit`, your shell should simply call the `exit` system
call with `EXIT_SUCCESS` (macro for 0) as argument. This command does not
take arguments. If any is provided, the shell raises a usage error.

### Built-in Command: `cd`

`cd` should be run with precisely 1 argument, which is the path to change to.
You should use the `chdir()` system call with the argument supplied by the
user. If `chdir()` fails (refer to man page to see how to detect failure), 
you should use call `perror("cd")` to print an error message. We will explain
the `perror()` function in a later section.

### Built-in Command: `history`

When the user enters the `history` command, the shell should print out a list
of all the input the user has ever entered (except in batch mode).

To do this, we will need to write the execution history to a file for persistent
storage. Just like `bash`, we designate a hidden file in the user's home
directory to store the command history. 

{: .note}
If you are on ieng6, open the `~/.bash_history` file to take a look at all 
the commands you have executed. How far you've come this quarter!

Our history file will be stored at `~/.pish_history`. (You will find a function
in the starter code that help you get this file path.)

Every time a command is processed, it should be written to this file using
a `add_history()` function.

{: .important}
> When adding a command to history, 
> If the user enters an empty command (0 length or whitespace-only), it should
> not be added to the history.

When the user types in the `history` command to our shell, it should print
out all the contents of our history file, adding a counter to each line:

```
▶  history
1 history
▶  pwd
/home/jerry/cse29sp24/pa6/Simple-Shell
▶  ls
Makefile  script.sh  pish  pish.c  pish.h	pish_history.c  pish_history.o  pish.o
▶  history
1 history
2 pwd
3 ls
4 history
```
{: .lh-0}

{: .note}
The number before each line in the output of the `history` command is added
by the program. Do not write the number to the actual file!

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

The `fork()` system call is perhaps very counterintuitive if you are seeing it
for the first time. Please make sure you understand how to distinguish between
the parent process and the child process when using it. The man page for `fork()`
is particularly useful. Here's the section on return value:

> RETURN VALUE
>
>   On success, the PID of the child process is returned in the parent, and 0 is
>   returned in the child. On failure, -1 is returned in the parent, no child
>   process is creeated, and errno is set appropriately.

### The `execvp()` system call

```c
int execvp(const char *file, char *const argv[]);
```

Specifically, we will use the `execvp()` system call to run the desired program
**in the child process** created by `fork()`, which means after `fork()`, it is
the child process's responsibility to call teh `execvp()` system call with the
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

{: .note}
Sometimes, although not in this PA, a child process might hang indefinitely,
and the parent process would need to step in and terminate (kill) it instead. 
This leads to hilarious<sup>?</sup> google searches like "how to kill child 
in parent". But that is beyond the scope of CSE 29.

## Excluded Features

Now because our shells are quite simple, there are a lot of things that you may
be accustomed to using that will not be present in our shell. (Just so you are
aware how much work the authors of the bash shell put into their product!)

You will not be able to
* use the arrow keys to navigate your command history,
* use `<tab>` to autocomplete commands,
* use the tilde character (`~`) to represent your home directory,
* use redirection (`>` and `<`),
* pipe between commands (`|`),
* and many more...

Don't freak out when these things don't work in your shell implementation!

If this were an upper-division C course, we would also ask you to implement
redirection and piping, but you have enough work to do...

## Handling Errors

Because the shell is quite a complex program, we expect you to handle
many different errors and print appropriate error messages. To make this
simple, we now introduce--

### Usage Errors

This only applies to built-in commands. When the user invokes one of the
shell's built-in commands, we need to check if they are doing it correctly.

* For `cd`, we expect `argc == 2`,
* For `history` and `exit`, we expect `argc == 1`.

If the users enters an incorrect command, _e.g._ `exit 1` or `cd` without
a path, then you should call the `usage_error()` function in the starter
code, and continue to the next iteration of the loop.

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
    perror("open");
    return EXIT_FAILURE;
}
```
{: .lh-0}

If we run this program, we would get the following output:

```
open: No such file or directory
```
{: .lh-0}

### Errors to handle

You need to handle errors from the following system calls/library functions
using `perror()`. Please pay attention to the string we give to `perror()`
in each case and reproduce it in your code exactly.

- `fopen()` failure: `perror("open")`,
- `chdir()` failure: `perror("cd")`,
- `execvp()` failure: `perror("pish")`,
- `fork()` failure: `perror("fork")`,

## Shell Scripting [Updated March 7, 10:16]
Before we get started...Here's a brief overview of what exactly shell scripting is:

A shell script, as its name suggests, is a script that runs a series of shell commands that accomplishes some tasks. These scripts can get very complicated depending on the task being automated, but even simple shell scripts can save lots of time. Any command that you can run on the command line, you can put as an instruction in a shell script.

Here's a simple shell script that prints "Hello, World!" and lists the files in the current directory:

```
#!/bin/bash

echo "Hello, World!"
echo "Here are the files in the current directory:"
ls
```

Here,
* `#!/bin/bash` - This is the shebang, which tells the system to execute the script using the Bash shell.
* `echo "Hello, World!"` - Prints "Hello, World!" to the terminal.
* `ls` - Lists the files in the current directory.

To run the script,

1. Save the script to a file, e.g., `hello.sh`.
2. Give it execution permission using:
   ```
   chmod +x hello.sh
   ```
3. Run it:
   ```
   ./hello.sh
   ```

## Getting Started

The starter code for this assignment is hosted on GitHub classroom.
Use the following link to accept the GitHub Classroom assignment:

[**Click here to accept this GitHub Classroom assignment.**][classroom]
(Right click to open in new tab.)

[classroom]: https://classroom.github.com/a/fbAXTGX6

Just like last time, clone the repository to **your `ieng6` server**.
(Do _NOT_ clone the repo to your local machine.)

### The Code Base

There aren't as many files this time (phew!), and the starter code is fairly
minimal. You are given the following files:

- `pish.h`: Defines `struct pish_arg` for handling command parsing; declares
  functions handling the history feature.
- `pish.c`: Implements the shell, including parsing, some built-in commands,
  and running programs.
- `pish_history.c`: Implements the history feature.
- `Makefile`: Builds the project.
- `ref-pish`: A reference implementation of the shell. Note that in this
  version, the history is written to `~/.ref_pish_history` rather than
  `~/.pish_history`, to avoid conflict with your own shell program.

{: .warning}
It has been brought to our attention that the reference implementation contains
a few inconsistencies with the write-up. For instance, the reference program 
does not report an error when `cd`ing into a nonexistent directory. If such
an inconsistency occur, please stick to the writeup.

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

### `struct pish_arg`

In `pish.h`, you will find the definition of `struct pish_arg`:

```c
#define MAX_ARGC 64

struct pish_arg {
  int argc;
  char *argv[MAX_ARGC];
};
```
{: .lh-0}

In our starter code, all functions handling a command (after it has been parsed)
will be given a `struct pish_arg` argument. This struct basically packages `argc`
and `argv` into one variable.

## Hints

This project once more requires you to think carefully about _incremental 
development_. There are many things to, how should you go about everything?
In what order? Here's one possibile plan:

1. Start by implementing input parsing using `strtok()`. Think about how to
   break down the line and put it into `struct pish_arg`.
   1. Start from simple commands without any arguments, _e.g._, `"ls"`.
   1. Next, make sure you can parse commands with arguments, _e.g._, `"ls -a"`.
   1. Next, make sure you can handle arbitrary whitespaces.
   1. Make sure reading from a script file works just as well as from `stdin`.
1. Once command parsing is working, go on to implement the two simple built-in
   commands: `exit` and `cd`. Make sure to take care of error handling.
1. After that, start implementing running programs with `fork` and `exec`.
1. Once that's working, you can finish implementing the `history` command.

The list above is just a suggestion. You are of course encouraged to come up
with your own implementation plan. But the most important thing is that _you
should have a plan_! 

This PA is overall not too difficult, hence the 3-star rating. However, not
following the principles of incremental development and testing will make it
much harder than it neesd to be!

Start early, start... you know the rest.

### Valgrind

You have a lot of freedom for how to implement this PA. You do _not_ necessarily
need to use `malloc`, but if you use dynamic memory allocation at any point, make
sure you free everything properly. We will include a valgrind test when grading
your assignment. So make sure there are no memory issues! (Memory leaks, invalid
read/writes, using uninitialized variables, _etc._)

## Submission

Submit your code to [Gradescope][gscp]. 

[gscp]: https://www.gradescope.com/courses/942522

## Acknowledgements

This assignment was inspired by [Project 2a of CS 537 @ University of 
Wisconsin-Madison (Fall 2019)][cs537p2a] by [Prof. Shivaram Venkataraman][shiv], 
which was adapted from [the Shell project accompanying the _Operating 
Systems: Three Easy Pieces_ textbook][ostepshell] by [Prof. Remzi 
Arpaci-Dusseau][remzi] and [Prof. Andrea Arpaci-Dusseau][andrea]. 

The author of this PA expresses his eternal gratitude to these three professors
for their mentorship.

[cs537p2a]: https://pages.cs.wisc.edu/~shivaram/cs537-sp19/p2a.html
[shiv]: https://pages.cs.wisc.edu/~shivaram/
[ostepshell]: https://github.com/remzi-arpacidusseau/ostep-projects/tree/master/processes-shell
[remzi]: https://pages.cs.wisc.edu/~remzi/
[andrea]: https://pages.cs.wisc.edu/~dusseau/

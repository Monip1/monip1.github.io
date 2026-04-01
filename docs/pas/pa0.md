---
layout: default
title: PA0
parent: Programming Assignments
nav_order: 0
permalink: /pa0
---

# PA0
{: .no_toc }

## Table of contents
{: .no_toc .text-delta }

1. TOC
{:toc}

---


{: .note }
PA0 will not have an effect on your final grade in CSE29, but it's still a worthwhile exercise to help accustom you to how we'll write code in this class!

## Learning Goals

Welcome to your first PA for CSE 29!

In this assignment, we will:

- Learn how to write a C program that follows a given specification.
- Practice `ssh`ing to `ieng6` machines and using `vim` and `gcc` to write, compile, and run C programs.

We expect everyone to have experience with programming in a
high-level language like Java or Python. If this isn't the case
for you, please reach out to staff as soon as possible!

Another important note: unless you have prior experience with C and the command line, we recommend waiting until after Lab 1 to start working on this PA, as Lab 1 will cover the necessary
tools and concepts to complete this assignment.

## Getting Help

You are always welcome to come to either instructor or TA office hours. Both of which are listed on the course website. In office hours, however, conceptual questions will be prioritized.

As with all other PAs, you are highly encouraged to
collaborate with your peers. Study Groups and
[Edstem](https://edstem.org/us/courses/97308/discussion/7876666)
are great places to get started doing this. :\)

## Getting Started

### Connecting to ieng6

As shown in [Lab 1](../labs/_lab1.md), you should use
the `ssh` command to connect to an `ieng6` machine.

Once you've connected, it would be a valuable exercise
to poke around using the commands covered in
Lab 1 to get a better feel for the terminal.
Try `pwd` to see where you are.

```
$ pwd
/home/<your-username>
```

### Downloading the starter code

From here, let's create a new folder in our home directory
called `pa0` to store the files for this PA:

```
$ mkdir pa0
```

From here, let's navigate into the `pa0` directory.
We can use `wget` to download the starter code for this PA:

```
$ cd pa0
$ pwd
/home/<your-username>/pa0
$ wget https://cse29spring2026.github.io/assets/pas/pa0/variables.java
```

After you've run the command above, you should see `variables.java` in your current directory. You can use `ls` to check this:

```
$ ls
variables.java
```

And as in Lab 1, you can use `vim` to open the file and take a look at the code.


### Compiling and running the starter code
{: .note }
This section will describe how to compile and run Java programs:
we won't be doing much more of this for the rest of this course!

To compile a Java program, you can run `javac <program>.java`.
So in this case, you can run `javac variables.java`.

```
$ javac variables.java
```

If the above command runs without any output, then you've succeeded!
If you `ls` again, you should see a new file called `variables.class`:

```
$ ls
variables.class  variables.java
```

Next, to run the program, you can run `java <program>`.
So in this case, you can run `java variables`:

```
$ java variables
a = 10
b = 3
c = 2.5
a / b = 3
a % b = 1
a / c = 4.0
a / (int) c = 5
(int) (a / c) = 4
ASCII of A = 65
ASCII of a = 97
```

## Your Task

Now, let's move onto the actual task for this PA. Your task
is to translate the `variables.java` program into a C program:
`variables.c`.

Some things to keep in mind as you write your C program:
- The output of your C program should match that of its Java counterpart. It's recommended that you first go through these programs and try to execute them to get a better understanding.
- You shouldn't simply hard-code the output into your C program, you should faithfully reproduce the logic in the original Java code.

## Writing variables.c
To write `variables.c`, let's use `vim` to create
and edit the file. You can run `vim variables.c` to get started.

The following C code snippet may be a helpful starting point for you to get started on `variables.c`:

```c
#include <stdio.h>

int main() {
    printf("Hello world!\n");
    return 0;
}
```

### Compiling and running variables.c
Once we've written a starting point for `variables.c`, we can use
`gcc` to compile it. Exit `vim` and run the following command:

```
$ gcc variables.c -o variables -Wall
```

As with `javac`, if you don't see any output after running `gcc`, then you've succeeded! You should see a new file called `variables`:

```
$ ls
variables  variables.c  variables.class variables.java
```

To run the program, you can type `./variables`:

```
$ ./variables
Hello world!
```

Now, you can modify `variables.c` to match the logic of
`variables.java` After each modification, you can re-run the `gcc` command to compile your code and then run it to check if your output matches that of `variables.java`.

You know you're done when running `variables.c` produces the same output as `variables.java`!

## Submission

For this PA, you will submit `variables.c` to Gradescope. (Submission link coming soon!)

### Downloading `variables.c` to your local machine

On your `ieng6` machine, you can use `scp` to download `variables.c` to your local machine.

{: .note }
Make sure that you're running the `scp` command from _your local machine's terminal_, not from the `ieng6` terminal!

If you've set up your folders the same way as described in the "Getting Started" section, you can run the following command to download `variables.c`:

```
$ scp <your-username>@ieng6.ucsd.edu:/home/<your-username>/pa0/variables.c .
```

After you're done, you should see `variables.c` in whatever directory you ran the above command from. Upload this file to Gradescope to submit your PA!


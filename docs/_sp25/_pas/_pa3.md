---
layout: default
title: PA 3
parent: Programming Assignments
permalink: /pa3
nav_order: 4
toc: sidebar
---

# PA 3: Systems Programming
{: .no_toc}

### Due date: February 25 23:59
{: .no_toc}


[Github Classroom Assignment](https://classroom.github.com/a/5zpf7Z88)

<!-- #### Reading time: 18 minutes <!-- TODO -->
<!-- {: .no_toc} -->


<!-- ### Checkpoint Due May 17 23:59, PA Due May 24 23:59
{: .no_toc}

{: .warning}
The checkpoint may look simple, but it takes a lot of work to get it working.
So please start this assignment early, and utilize tutor hours!

{: .note}
Slip days: You can use 3 slip days for both the checkpoint and the final submission.

### Updates and Revisions
{: .no_toc} -->


<!-- ### Updates and Revisions
{: .no_toc} -->

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
1. TOC
{:toc}
</details>


## Learning Goals

Welcome to systems programming! This week we begin working on our
own memory allocation system in C.

Specfically, we will practice the following concepts in C:

- bitwise operations,
- pointer arithmetic,
- memory management, and of course,
- using the terminal and vim.

## Introduction

𝐀𝐥𝐥 𝐭𝐡𝐞 𝐦𝐞𝐦𝐨𝐫𝐲’𝐬 𝐚 𝐬𝐭𝐚𝐠𝐞,

𝐀𝐧𝐝 𝐚𝐥𝐥 𝐭𝐡𝐞 𝐚𝐫𝐫𝐚𝐲𝐬 𝐚𝐧𝐝 𝐬𝐭𝐫𝐮𝐜𝐭𝐬 𝐦𝐞𝐫𝐞𝐥𝐲 𝐩𝐨𝐢𝐧𝐭𝐞𝐫𝐬;

𝐓𝐡𝐞𝐲 𝐡𝐚𝐯𝐞 𝐭𝐡𝐞𝐢𝐫 𝐞𝐱𝐢𝐭𝐬 𝐚𝐧𝐝 𝐭𝐡𝐞𝐢𝐫 𝐞𝐧𝐭𝐫𝐚𝐧𝐜𝐞𝐬;

𝐀𝐧𝐝 𝐨𝐧𝐞 𝐛𝐥𝐨𝐜𝐤 𝐢𝐧 𝐢𝐭𝐬 𝐭𝐢𝐦𝐞 𝐩𝐥𝐚𝐲𝐬 𝐦𝐚𝐧𝐲 𝐩𝐚𝐫𝐭𝐬.

This is a monumental PA, and for some, a career-defining one. Generations of
students of Computer Science have worked on this PA, from our own
TAs to tutors, and now to you. Decades may pass,
but memory of this PA will remain with many of you, as it did with us.

<!-- This version of the allocator assignment was adapted from the version that
I worked on [when I learned C at UW-Madison][madgrades] years ago.

[madgrades]: https://madgrades.com/courses/cb48129f-99e6-36fa-9a20-46e0617e2499?termCode=1192&instructorId=636841

> _I tried to find a picture of myself in the old Madison CS building around
> that time. I could not find one, but the old memories made me deeply emotional
> for a minute._
>
> _How many unexpected turns life has taken! Seeing the way
> things were makes me think of the way many things would have, could have, or
> should have been. But onto the PA now:_ -->

## The Final Product

The final product of our code for this PA will no longer be an _executable_,
but a **library**. Your code will be compiled into a _shared object file_
(`.so`). We can then write other programs using our own library functions.

More specifically, you will be writing your own versions of the `malloc` and
`free` functions, which, after PA 2, you should be very familiar with.

## Getting Started

The starter code for this assignment is hosted on GitHub Classroom.
Use the following link to accept the GitHub Classroom assignment:

[**Click here to accept this GitHub Classroom assignment.**][classroom]
(Right click to open in new tab.)

[classroom]: https://classroom.github.com/a/5zpf7Z88

Just like last time, clone the repository to **your `ieng6` server**.
(Do _NOT_ clone the repo to your local machine.)

### The Code Base

This is perhaps the largest and most complex code base we will ever deal with
in CSE 29 this quarter. Let's take a look at what we have--

**The Library**

* `vmlib.h`: This header file defines the **public interface** of our library.
Other programs wishing to use our library will include this header file.
* `vm.h`: This header file defines the **internal** data structures, constants,
and helper functions for our memory management system. It is not meant to be
exposed to users of the library.
* `vminit.c`: This file implements functions that set up our "heap".
* `vmalloc.c`: This file implements our own allocation function called `vmalloc`.
* `vmfree.c`: This file implements our own free function called `vmfree`.
* `utils.c`: This file implements helper functions and debug functions.

**Testing**

* `vmtest.c`: This file is *not* a part of the library. It defines a main function
and uses the library functions we created. We can test our library by compiling
this file into its own program to run tests.  You can write code in the `main()`
function here for testing purposes.
* `tests/`: This directory contains small programs and other files which you
should use for testing your code. We will explain this in more detail in a later
section.


### Header Files in C: What Are They and Why Use Them?

A header file is a file that contains global constants, type definitions (our structs) and function declarations - these are just statements that introduce a function by specifying its name, return type, and parameter types, essentially informing the compiler that the function exists before it is actually defined in .c files. Header files typically have a .h extension and are used to separate declaration of your program structure from specific implementation details.

#### Why Use Header Files?
* **Reusability** – Functions, types and other things which are defined in a header file can be included in multiple source files without rewriting that code, preventing duplicate declarations and ensuring consistency across multiple files.

* **Code Organization and Maintenance** – Header files help keep code clean by separating function declarations from their implementations which is especially helpful for organization and readability when managing multiple .c files in a project at once. In addition to that, when modification to a type or a function is needed, it can be done by a single change in the header file, rather than in multiple source files.

#### How to Use Header Files?
* Creating a Header File – Write function declarations (prototypes) or struct declarations in a .h file.
* Including a Header File – Use #include "filename.h" (for user-defined headers) or #include <filename.h> (for standard library headers) in a .c file.
* Using Include Guards – Prevent multiple inclusions using #ifndef, #define, and #endif.

Example: Using a Header File

`math_functions.h` (Header File)

```
#ifndef MATH_FUNCTIONS_H  // if header not previously defined
#define MATH_FUNCTIONS_H // define header

// header file contents

int add(int a, int b);  // Function prototype

#endif // end of ifndef conditional statement
```

`math_functions.c` (Function Implementation)

```c

#include "math_functions.h"

int add(int a, int b) {
    return a + b;
}
```

`main.c` (Using the Header File)

```c
#include <stdio.h>
#include "math_functions.h"

int main() {
    int result = add(5, 3);
    printf("Sum: %d\n", result);
    return 0;
}
```

This structure ensures that the function add() is declared in one place and can be reused in multiple source files without redefinition errors.


### Compiling the Starter Code

To compile, run `make` in the terminal. You should see the following items show
up in your directory:

* `libvm.so`: This is a _dynamically linked library_, _i.e._, our own memory
allocation system that can be _linked_ to other programs (_e.g._, `vmtest`).
The interface for this library is defined in `vmlib.h`.
* `vmtest`: This executable is compiled from `vmtest.c` with `libvm.so` linked
together. It uses our own memory management library to allocate/free memory.

The starter code in `vmtest.c` is very simple: it calls `vminit()` to initialize
our simulated "heap", and calls the `vminfo()` function to print out the contents
of the heap in a neatly readable format. Run the `vmtest` executable to find out
what the heap looks like rgith after it's been initialize! (Hint: it's just one
giant free block.)

### Reading the Starter Code

In previous PAs, you did not need to pay much attention to what we give you in
the starter code. This time, however, you should begin by reading (and
understanding!) some of the code that we have provided.

{: .important}
> In lecture, you were taught using an example allocator with
> a 16-byte alignment requirement.
>
> In this programming assignment as well, our headers/footeres are 8 bytes in size, and
> all blocks are 16-byte aligned. This means the smallest unit of allocation
> is 16.
>
> The `size_t` data type, which you will see frequently throughout this PA, is
> a 64-bit (8-byte) unsigned integer type.

Begin by reading through the `vm.h` file, where we define the internal data
structures for the heap. This is where you will find the all-important block
headers and block footers. Focus on understanding how `struct block_header` is
used. You will see it in action later.

Next, open `vminit.c`. This is a very big file containing functions that create
and set up the simulated heap for this assignment. **Find the `init_heap()`
function**, and **read through the entire thing** to understand how it is setting
up the heap. _This is not an easy read!_ There is a lot of pointer arithmetic
involved, you will need to do similar things for implementing `vmalloc` and
`vmfree`, so make sure you have a solid understanding of that. (Why is it necessary
to cast pointers to different types?)

{: .note}
Our allocator does not manipulate the actual heap in the address space. Instead,
we create a large chunk of memory as our "simulated heap", and allocations/frees
are performed in that memory region.

Once you understand what the `init_heap()` function is doing, open up `utils.c`.
Here we have implemented the function `vminfo()`, which will be **your ally**
throughout this PA. This function traverses through the heap blocks and prints out
the metadata in each block header. You should find inspiration for how to write
your own `vmalloc` function here. Look at how it manipulates the pointer to
jump between blocks!

## Implementing `vmalloc`

```c
void *vmalloc(size_t size);
```

The `vmalloc()` function returns a `void *` pointer. Unlike other pointers
we have dealt with in the past, the `void *` pointer is not associatd with
any concrete data type. It is used as a generic pointer, and can be implicitly
cast to any other type of pointer.

{: .note}
> The `malloc()` function in `stdlib.h` also returns a `void *` pointer. Notice
> how we can assign the pointer `malloc()` returns to any pointer type.
> 
> ```c
> int *p = malloc(sizeof(int) * 10);
> char *c = malloc(sizeof(char) * 64);
> ```

The `size_t size` parameter specifies the number of bytes the caller wants.
Again, this is the exact same as the usual `malloc` we have been using.

If `size` is not greater than 0, or if the allocator could not find a heap
block that is large enough for the allocation, then `vmalloc` should return
`NULL` to indicate no allocation was made.

### Allocation Size Calculation

We need to do some calculations based on the requested size to get the actual
block size that we need to look for in our heap.

1. Add 8 bytes for the block header to the requested size;
1. Round **up** the new size to the nearest multiple of 16.

{: .note}
The reason we do the rounding up is so that all allocated memory blocks are
16-byte aligned. There are complex architectural reasons behind this choice
that we will not go into in this PA.

For example, if the user calls `vmalloc(10)`, we first add 8 bytes for the
header to get 18, and then round up to the nearest multiple of 16, which
gets us 32. So to allocate 10 bytes, we need to look for a heap block that
is _at least_ 32 bytes in size.

### Allocation Policy

We discussed many different allocation policies during class, and the one
you will need to implement for this PA is the **best-fit policy**.

Once you have determined the size requirement of the desired heap block,
you need to traverse the entire heap to find the best-fitting block. **If
there are multiple candidates of the same size, then you should use the
first one**.

### Splitting Large Blocks

If the best-fitting block you find is larger than what we need, then we
need to split that block into two. For example, if we are looking for a
16-byte block for `vmalloc(4)`, and the best fitting candidate is a 
64-byte block, then we will split it into a 16-byte block and a 48-byte
block. The former is allocated and returned to the caller, the latter
remains free.

### Updating Block Header(s)

If a new block was created as a result of a split, you need to create a
new header for it, and

* set the correct size.
* set the status bit to 0.
* set the previous bit to 1.

And for the block that was allocated, you need to

* update the size (if splitting happened).
* set the status bit to 1.
* go to the next block header (if it's not the end mark) and set its 
previous bit to 1.

### Returning the Address

After updating all the relevant metadata, `vmalloc` should return a pointer
to the start of the **payload**. Do _not_ return the address of the block
header!

## Implementing `vmfree`

```c
void vmfree(void *ptr)
```

The `vmfree` function expects a 16-byte aligned pointer to an allocated payload
(_i.e._, an address obtained by a previous call to `vmalloc`). If the address
`ptr` is `NULL`, then `vmfree` does not perform any action and returns directly.

Once the address is verified, `vmfree` goes to the block header to begin freeing
the block. If the block header indicates that the block is already free, then
`vmfree` returns without performing any additional action. (This means that in
our system, a double-free error is theoretically impossible.)

The simplest version of `vmfree` just finds the header for the given block and 
resets the block status bit to 0.

### Coalescing freed blocks

Just freeing a block is not necessarily enough, since this may leave us with many
small free blocks that can't hold a large allocation. When freeing, we also want to
check if the next and previous blocks in the heap are free, and coalesce with them 
to make one large free block.

If you are coalescing two blocks, **remember to update both the header and the footer!**

### Block footers / Previous Bit

Since a block's header contains its size, we know how far forward to move to get to the
next block's header. However, when coalescing backwards, we need to know the size of the
previous block to get to its header. To be able to do this without walking the entire list
of blocks from the beginning, we write the block size to a footer in the last 8 bytes of the block.

Since footers are only needed during coalescing, we only need to add footers to free blocks;
this means that footers don't take up extra space in allocated blocks, and free blocks aren't
using that space anyway. However, we then need to make sure we update the "previous block busy" 
bit correctly so that we don't confuse user data in an allocated block with footer data in a free block.

You will need to update both your `vmalloc` and your `vmfree` implementation to add code for
creating/updating accurate footers, and making sure the "previous block busy" bit is correct.

In conclusion, to free a block, the following actions must be taken (not necessarily in this order):

* unset the status bit to 0,
* create a block footer,
* unset the next block's previous bit,
* coalesce with the next block if it is also free, and
* coalesce with the previous block if it is also free.

## Incremental Development Tips

1. Run the starter code and understand the output. Always figure out how to
run your program first! You can't do any testing if you don't know how to
run your program.
1. Understand the `init_heap()` function.
1. Understand the `vminfo()` function.
1. Begin writing the `vmalloc()` function:
  1. write **and test** the size calculation code.
  1. write **and test** the best-fit policy. (A helper function would be great 
     here.) See later section for testing images.
  1. write **and test** splitting free blocks.
1. Test everything there is to test for `vmalloc()`.
1. Begin writing the `vmfree()` function:
  1. Update `vmalloc()` implementation to include block footers.
  1. write **and test** a basic `vmfree()` implementation that only frees 
     one block.
  1. write **and test** coalescing with the previous/next block.
1. Test everything under the sun.

And lastly, as a general tip: Create lots of helper functions! -- one for
getting the block size, one for getting a pointer to the next block, one
for setting the allocation bit, one for setting the previous bit...

Write code that is not only functional, but _elegant_.

## Test Programs

There is no reference implementation for this assignment. Instead, we provide
you with plenty of testing code to help you make sure your program is working.

In the repository, you will find the `tests/` directory, where we have privided 
some small testing programs that test your library function. 

By `cd`ing in to the `tests/` directory and running `make`, you can compile all
these test programs and run them yourself. These programs are what we will be
using in the autograder as well.

For example, here's the code for the very first test: `alloc_basic.c`:

```c
#include <assert.h>
#include <stdint.h>
#include <stdlib.h>

#include "vmlib.h"
#include "vm.h"

/*
 * Simplest vmalloc test.
 * Makes one allocation and confirms that it returns a valid pointer,
 * and the allocation takes place at the beginning of the heap.
 */
int main()
{
    vminit(1024);

    void *ptr = vmalloc(8);
    struct block_header *hdr = (struct block_header *)
                               ((char *)ptr - sizeof(struct block_header));

    // check that vmalloc succeeded.
    assert(ptr != NULL);
    // check pointer is aligned.
    assert((uint64_t)ptr % 16 == 0);
    // check position of malloc'd block.
    assert((char *)ptr - (char *)heapstart == sizeof(struct block_header));
    // check block header has the correct contents.
    assert(hdr->size_status == 19);

    vmdestroy();
    return 0;
}
```
{: .lh-0}

In this test, we simply make one `vmalloc()` call, and we verify that the
allocation returned a valid pointer at the correct location in the heap.

These tests use the `assert()` statement to check certain test conditions.
If your code passes the tests, then nothing will be printed. If one of the
`assert` statements fail, then you will see an error.

## Test Images

When you are writing `vmalloc`, you may wonder how you can test the allocation
policy fully when you don't have the ability to free blocks to create a more
realistic allocation scenarios (_i.e._, a heap with many different allocated/free
blocks to search through).

To help you with that, we have created some images in the starter code in the
`tests/img` directory. In your test programs, instead of calling `vminit()`,
you can call the `vmload()` function instead to load one of these images.

Our `alloc_basic2` program uses one such image. If you open `tests/alloc_basic2.c`,
you will see that it creates the simulated heap using the following function
call:

```c
vmload("img/many_free.img");
```

If you load this image and call `vminfo()`, you can see exactly how this image
is laid out:

```
vmload: heap created at 0x7c2abd1da000 (4096 bytes).
vmload: heap initialization done.
---------------------------------------
 #      stat    offset   size     prev   
---------------------------------------
 0      BUSY    8        48       BUSY   
 1      BUSY    56       48       BUSY   
 2      FREE    104      48       BUSY   
 3      BUSY    152      32       FREE   
 4      FREE    184      32       BUSY   
 5      BUSY    216      48       FREE   
 6      FREE    264      128      BUSY   
 7      BUSY    392      112      FREE   
 8      BUSY    504      32       BUSY   
 9      FREE    536      112      BUSY   
 10     BUSY    648      352      FREE   
 11     BUSY    1000     304      BUSY   
 12     BUSY    1304     336      BUSY   
 13     FREE    1640     320      BUSY   
 14     BUSY    1960     288      FREE   
 15     BUSY    2248     448      BUSY   
 16     BUSY    2696     256      BUSY   
 17     BUSY    2952     96       BUSY   
 18     BUSY    3048     368      BUSY   
 19     FREE    3416     672      BUSY   
 END    N/A     4088     N/A      N/A    
---------------------------------------
Total: 4080 bytes, Free: 6, Busy: 14, Total: 20
```
{: .lh-0}

You can use this image to test allocating in a more realistic heap. 

Three images exist in total: 
- `last_free.img`: the last block is free,
- `many_free.img`: many blocks are free,
- `no_free.img`: no block is free (use this to test allocation failure).

### Test Structure

Each test is a separate C file (e.g., `alloc_basic.c`, `free_basic.c`) designed to:

* Allocate memory using `vmalloc()`

* Free memory using `vmfree()`

* Check if the allocator correctly handles edge cases (e.g., allocating zero bytes, coalescing freed blocks)


### Categories of Tests

The test cases are designed to check different aspects of the allocator:

* Basic Allocation (`alloc_basic.c`, `alloc_basic2.c`): Ensures that memory can be successfully allocated.

* Edge Cases (`alloc_oversize.c`, `alloc_zero.c`): Tests if the allocator correctly handles invalid allocation requests.

* Fragmentation and Freeing (`free_coalesce_l.c`, `free_coalesce_r.c`): Verifies that freed memory is properly coalesced to reduce fragmentation.

* Stress Tests (`alloc_large.c`, `alloc_full.c`): Checks how the allocator behaves under heavy memory usage.

{: .note}
These are not the only test files that will be used to evaluate your code. The categories listed above are just examples to give you a general idea of the types of tests included. You can find all the test files in the `tests` folder inside the repo.


## Formatting Your Code

Once again, we expect your code to be formatted for good readability:

### Running `clang-format`

In the directory with your C code, run the following command:

```
$ clang-format -i *.c *.h
```

This command runs the `clang-format` program. The `-i` flag tells it to modify the
source files **in place**, which means changes will be made directly to the files.
`*.c *.h` tells the program to format _all_ files with the extension `.c` and `.h`.

The hidden `.clang-format` file defines the code style we use in this course.

## The Checkpoint

For the checkpoint, we expect you to finish the implementation for the basic
features of `vmalloc`. This means your alloctor should be able to do the
following:

1. Traverse the heap to find the best-fitting block, and
1. Allocate that block by updating the block header and returning the correct
address.

You do not need to have implemented block splitting or block footers, or anything
related to `vmfree` for this checkpoint. But we encourage you to start working
on it as soon as possible.

If you are able to reach the checkpoint by **Wednesday (Feb 19, 2025)**, it means you are on right track.

{: .warning}
The checkpoint may look simple, but it takes a lot of work to get it working.
So please start this assignment early, and utilize tutor hours!

{: .note}
Remember that this checkpoint serves as a progress indicator rather than a strict deadline. The goal is to ensure you're engaging with the assignment early and understanding the fundamental concepts needed for successful completion.

## Final Submission

Submit your code to [Gradescope][gscp]. Make sure your code compiles and works
with the aforementioned two test programs.

[gscp]: https://www.gradescope.com/courses/942522


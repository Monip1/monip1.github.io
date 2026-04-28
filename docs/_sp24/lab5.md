---
layout: default
title: Lab 5
parent: Labs
nav_order: 4
---

# Lab 5: Memory Leaks and Valgrind
{: .no_toc}

#### Table of contents
{: .no_toc}

1. TOC
{:toc }

## Getting Started

With your partner, discuss:
- If you could wake up tomorrow and be any (non-human) animal, what animal would you choose to be and why? Would you want to be a pet or be free?
- Have you had any pets growing up?

## Dynamic Memory Allocation

![Pointers Meme](/assets/labs/pointers_meme.png)

Accept the assignment on GitHub Classroom ([https://classroom.github.com/a/MaLcZEnE](https://classroom.github.com/a/MaLcZEnE)) to create a repo with the starter code for this lab. Clone this repo into your `cse29` folder on `ieng6`.

The starter code contains quite a few files, which we'll walk you through in this lab.

### Warm-up with malloc()

First, we'll get a bit of practice using `malloc()` to allocate memory on the heap. In `2d_array.c`, allocate memory for a 2-D array using `malloc()`. Use the constants for the number of rows and columns defined above the main function.

{: .note }
The double pointer variable is named `twod_array` because variable names in C cannot start with a number. It's specifically named `twod_array`, as opposed to any other name, because I ran out of ideas. If you have a better name, feel free to rename it (and then tell me).

If you're not sure how to allocate memory for a 2-D array, ask your partner about what they know! If you're both unsure, feel free to refer to class resources or ask a tutor.

Once you've implemented memory allocation for a 2-D array, compile the program and run it. You should see that the program prints out a 2×3 array with the numbers 1 through 6. Rather than manually writing the compilation command, we've provided a Makefile for you to use. This will be helpful since we have quite a few files to compile in this lab. To compile a program, use the `make` command followed by the name of the file to compile without the `.c` suffix. For example, to compile `2d_array.c` into the `2d_array` binary file, use this command:
```
$ make 2d_array
```

{: .note }
In situations like these, where we have more files than patience, having a Makefile to create command shortcuts is very helpful. By incredible coincidence, I've seen into the future and I can predict that we'll learn about Makefiles in the next lab.

Although running the program gives no visible errors, the program actually produced some memory leaks as a result of us not properly freeing the allocated memory. The *Valgrind* program allows us to see how much memory is still being used when the program exits, and therefore leaked. Like with GDB, you pass in the program to inspect as an argument to `valgrind`:
```
$ valgrind ./2d_array
```

Valgrind provides a "heap summary" of how much memory is still being used at exit, and a "leak summary" which details the different types of leaks that have occurred. When Valgrind reports anything in a leak summary, that means you have a memory leak!

## Memory Leaks

Unlike real life (plumbing) leaks, it's okay to leave the (memory) leak in `2d_array.c` alone for now; we'll come back to it later.

Memory leaks are especially harmful in long-running programs, where the amount of available memory gradually reduces over a long time, thereby also reducing the overall performance of the program or the computer in general.

In `memory_errors.c`, we demonstrate some common situations in which memory errors can occur. Compile this program using the Makefile:
```
$ make memory_errors
```
In order to see more details of the leaked memory, run Valgrind on this program with the `--leak-check=full` flag.
```
$ valgrind --leak-check=full ./memory_errors
```
With this flag, the Valgrind heap summary will also report the locations where leaked memory had been allocated, since we compiled the program with the `-g` flag.

Let's go over each function in `memory_errors.c` in more detail, and fix each of them:
- `memory_leak()`: In general, memory leaks occur when we allocate memory and do not free the memory before the program exits. Here, we fix the memory leak by calling `free()` on the pointer returned by `malloc()` which points to the allocated memory.
- `free_after_set()`: In this case, we lose the pointer to the allocated memory when we set it to `NULL`, therefore calling `free(p)` does not do anything. In general, we consider it good practice to set a freed pointer to `NULL`, but it actually needs to be freed first! We can fix this by making sure to call `free()` on the pointer before setting the pointer to `NULL`, instead of after.
- `double_free()`: This one isn't actually a memory leak, but it's an error that can occur with improper usage of `free()`, which is why it's here. Calling `free()` on a pointer that has already been freed is considered undefined behavior, meaning that it should not be expected to work properly. This program gives you a really messy memory error when you try to run it. Valgrind will also report an "invalid free" error above the heap summary. In this case, it's apparent why the double free error occurs and how to fix it, but in other cases it may be more obscure.
- `reuse_freed()`: Also not a memory leak, but a case in which we try to access memory that was already freed. Valgrind reports this error as an "invalid write" above the heap summary. Again, it's good practice to set a freed pointer to `NULL` immediately after it's been freed.
- `double_malloc()`: This can accidentally occur when you intend to allocate two blocks of memory to be used one after the other with the same pointer, but forget to free the first block. What should be done here to fix this leak?

Once you've implemented the fixes, compile and re-run the program with Valgrind to confirm that there are no longer any memory leaks or errors. It should report that "all heap blocks were freed -- no leaks are possible". Yippee! Although if there are still memory leaks/errors, try again, then yippee.

### Types of Memory Leaks

You might have noticed in the leak summary of Valgrind that there are different types of memory leaks. The distinction between these leaks isn't too important for our purposes, but may help you identify how leaks are happening in a more complex program.

In `leak_types.c`, we demonstrate each of the different types in separate functions. There's no need to fix these leaks; just compile and run Valgrind on the program to see how Valgrind reports different types.
```
$ make leak_types
$ valgrind --leak-check=full ./leak_types
```
Notice how the heap summary gives you information on where each memory error occurs. Inspect the source code to see how each type is caused.

- Definitely lost: Besides myself, memory leaks are also considered "definitely lost" when the pointer to the memory becomes inaccessible. This can happen when the pointer is deleted when a function ends and its stack frame is deleted, or when the pointer is set to another value.
- Indirectly lost: Blocks of memory are considered "indirectly lost" when there exists a pointer in another leaked memory to the block. In this case, the memory pointed to by `pp` (i.e. `*pp`) is definitely lost, and the memory pointed to by `*pp` (i.e. `**pp`) is indirectly lost.
- Possibly lost: "Possibly lost" memory leaks occur when we have a pointer to some part of the leaked memory, but not to the base of the memory block, likely because the pointer was modified. In this case, we allocate an array of integers, then move the pointer to point to the middle of the array.
- Still reachable: Memory leaks are "still reachable" when the pointer is not lost when program exits, but the memory is still unfreed. This can occur when a global variable contains a pointer to leaked memory.
- Suppressed: Users can specify the flag `--suppressions=<filename>` to Valgrind to intentionally ignore leaks that are known to be harmless or unavoidable. If you want to learn how to use this flag, you can check out this [StackOverflow post](https://stackoverflow.com/questions/13692890/suppress-potential-memory-leak-in-valgrind), although in our (at least one tutor and at least one TA) experience this flag is seldom used, if at all.

### Invalid Memory Access

Besides memory leaks, Valgrind can also detect when an invalid memory access occurs. In `invalid_read_write.c`, invalid memory accesses occur when we read or write to a position in memory out-of-bounds from the allocated array. Accessing memory that has already been freed is also considered invalid. Compile and run Valgrind on `invalid_read_write` to see how Valgrind reports these errors.
```
$ make invalid_read_write
$ valgrind --leak-check=full ./invalid_read_write
```
In addition to identifying that an invalid read/write has occurred, Valgrind will also report:

- the size of the memory being read or written to, 
- where the read/write occurs in the source code,
- how far the location of the invalid read/write is from an allocated block of memory,
- and where that allocated block of memory had been allocated in the source code.

Especially in more complex programs, each of these pieces of information may be useful for debugging how an invalid memory access is occurring.

### Uninitialized Values

In addition to invalid memory access, Valgrind can also detect when an uninitalized variable is used. The value of an uninitialized value is usually 0, but this may not always be the case. This can lead to unexpected outcomes. In `uninit_val.c`, the functions `print_and_increase_1()` and `print_and_increase_2()` have the exact same definition, meaning that they should have the same behavior, but running the program shows that they don't. This occurs becauase the local variable data remains on the stack even after the function returns. When we say that the function stack frame is deleted, this does not necessarily erase the data in that memory, so when we declare a part of the stack to contain the value of `i` in `print_and_increase_2()`, that memory just so happens to have the final value of `i` at the end of `print_and_increase_1()`.

We can run Valgrind on this program with the `--track-origins=yes` flag to also report where the uninitalized values were created.
```
$ make uninit_val
$ valgrind --track-origins=yes ./uninit_val
```

Valgrind reports a lot of "conditional jump or move depends on uninitalized value(s)" errors and a couple of "use of uninitialized value of size 8". These indicate that function behavior may be affected by other operations in the program (e.g. unrelated function calls) in unexpected ways.

### Other Flags

If you really like reading, including reading parts of Valgrind output that we haven't mentioned yet, you might have noticed that the last line of Valgrind's report provides an "error summary". This summary counts the number of errors detected, which may also include some types of memory leaks. By default, with `--leak-check=full` Valgrind considers definitely and possibly lost as errors, but you can customize it with yet another flag, such as `--errors-for-leak-kinds=all`.

Another flag you could use when running Valgrind is `--leak-resolution=med`, in which you can replace `med` with `low` or `high`. The default is `high` if the flag is not specified. This flag specifies to what extent Valgrind can merge multiple leaks into one if some backtraces of the leak are the same. Try different flags to see what kind of output works best for your debugging preferences.

## Fixing Memory Leaks

That whole previous section was a little walkthrough what memory leaks are, some basic examples of how they occur and how to fix them, and some other things Valgrind can catch. Now we return to `2d_array.c` to finally fix the memory leak we initially discovered.

### The Array in the Heap

Run Valgrind on `2d_array` again to revisit what the memory leaks are. The heap summary should tell us that we've allocated 40 bytes in total, and 24 bytes total in 2 blocks were leaked. What do you think these 2 blocks of 12 bytes each correspond to?

If your Valgrind heap summary says something different, or if it reports some errors in addition to the memory leaks, something might be wrong with your implementation of allocating memory for the 2-D array. This may happen if you've allocated too much memory (which isn't an error, but not the intention here), too little memory, or memory organized in a different way. If so, revisit your earlier implementation and fix it, such that Valgrind reports no errors but the heap summary still reports a leak of 24 bytes total in 2 blocks out of 40 bytes, before continuing.

There already exists one call to `free()`, but clearly this isn't enough. Make changes to the program to successfully free all allocated blocks of memory. Ideally, your solution should work for any size of array, meaning that it should still work even if the values of `ROWS` and `COLS` change.

{: .note-title }
> Hint
> 
> Drawing a diagram of how memory is allocated can help you understand what parts of memory are being leaked, and how to free them properly. Pen and paper works perfectly, but if you don't have that, touchpad and Microsoft Paint is also acceptable.

### Red List, Blue List

In `one_list.c`, we create a linked list with 5 nodes and print the list. This program uses the implementation of a linked list in `linked_list.c`. Here, we have functions declared in one file being used in a different file. `linked_list.h` defines function signatures for functions implemented in `linked_list.c` (as well as `struct node`) to be used in other files. In order to compile the source code of two different files together, they need to be linked. Conveniently, that is all handled for you by the Makefile. Use the Makefile to compile `one_line`, and it will automatically handle compiling and linking `linked_list.c`:
```
$ make one_list
```

The `one_list` program compiles and runs and has no errors, but guess what it does have? Figure out what the memory leaks are, then make changes to successfully free the leaked memory. A function template for `free_list()` is given in `linked_list.c`; write a method here to free the list, then call this function from `one_list.c`. Again, your solution should ideally work for linked lists of any size. When you're done, Valgrind should report no memory leaks or errors.

{: .note-title }
> Hint
> 
> This one might be particularly tricky, so be sure to try drawing memory diagrams, or asking others for their ideas if you're stuck!

Once `free_list()` is implemented and `one_list` has no memory leaks, we can look at another program that uses linked lists. `two_list.c` creates a linked list with 5 nodes, prints and frees this list, then creates a different linked list with 3 nodes, and prints and frees this list. Does this program work as expected? If we're asking you that, it probably doesn't. Does Valgrind report anything? If we're asking you that, it probably does. Make changes to `two_list.c` to successfully resolve any errors or memory leaks.

{: .note-title }
> Hint
> 
> This one seems complex, but the solution is actually quite simple. Getting to the solution might not be so simple though. Again, try drawing memory diagrams, asking others, or even trying GDB here.

## On PA4

So. I've heard y'all don't like hidden tests. Well then, let's flip the script shall we?

Today, you will be testing some bad implementation of some common linked list functions, and finding out what's wrong with them. Some of these implementations have memory leaks, other may be logically incorrect, and some of them just straight-up crash on certain inputs.
It's up to you to use all the tools in your debugging arsenal and all the knowledge you've gained to pick out the exact problem(s). Head to the `flights.c` file to take a look at the code you'll be critiquing.

One good way to start is, get this, to _test_ these implementations! Come up with some to these inputs, and see how each of these implementations behave! I've provided a sample function called `generate_path()` that will give you a sample linked list. Please feel free to use this code as a starting point for creating your own linked lists.

How many errors can you find? Add a comment above each code section (or line) containing error(s) that briefly states what the error was and how you might go about fixing it (feel free to edit the code you've been given and try to make it work :)).

Through this exercise, you can hopefully get a better idea of how to test for edge cases, identify different types of bugs, and understand how those dreaded hidden test cases are designed (and how to deal with them!)

## Optional Feedback Form

If you'd like to give feedback on how labs are conducted and how they can be improved, please feel free to submit any comments in [this anonymous form](https://docs.google.com/forms/d/e/1FAIpQLSdVrEZvQNcd5nt5mfrI_eEVQHJCNNBFdSn07BJSCaastSVpXg/viewform?usp=sf_link). This is a space for you to drop any comments you have at the end of every lab!

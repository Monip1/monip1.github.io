---
layout: default
title: Lab 1
parent: Labs
nav_order: 1
permalink: /lab1
---

# Lab 1: Unix, SSH, and Vim
{: .no_toc}

Welcome to your first CSE 29 lab of the quarter!

* In each lab, you will follow this guide to get firsthand experience with the tools and techniques we have introduced to you in lectures and discussions. This experience will be essential to your PA work. You earn credit for participation by being engaged with the content of this lab and interacting with the staff when asked.

These labs are a low-stakes environment to get proficient with programming and software tools with support from fellow classmates and course staff. **Please ask for help from course staff if you are stuck on something—we are here for you!**


## Lab 1 Learning Objectives
{: .no_toc }

* Connect to `ieng6` using SSH (Secure SHell)
* Try out and understand some essential Unix/Linux commands
* Write a basic C program on `ieng6` using Vim
* Compile and run the C program you wrote

#### Table of contents
{: .no_toc}

1. TOC
{:toc }

# Let’s connect to `ieng6`

First, open up a terminal window by following the instructions for your operating system.

* **Windows**: Do you have (Windows Subsystem for Linux) installed? (if you aren't sure assume you do not)
  * **No WSL**: Press the Windows button, type in “Terminal”, then select “Terminal” or “Command Prompt” (if “Terminal” doesn’t exist).
    * Once the window launches, type `ssh` and press Enter. If you see a red error message stating that `ssh` is not recognized, please follow the instructions [here](https://www.howtogeek.com/336775/how-to-enable-and-use-windows-10s-built-in-ssh-commands/) to enable SSH.
    * We do recommend installing wsl as it is a very useful tool! Let us know if you run into any issues on EdStem, in tutor hours, or in office hours.
  * **Yes, WSL is installed**: Press the Windows button, type in “wsl”, then select “WSL”
* **MacOS**: Click the Launchpad icon in the Dock, type in “Terminal”, then select the Terminal application.
* **Linux**: Press Ctrl+Alt+T to launch a terminal window.

As a student, you are assigned an account on the `ieng6` server hosted by UCSD. These are similar to accounts you might get on other systems at other institutions (or a future job). We’ll see how to use your machine to connect to a remote computer over the Internet to do work there.

Your account name is the same account name as the one that’s used for your school Google account, i.e. it is the string that precedes “@ucsd.edu” in your school email address. In case you need to check the status of your student account, refer to the [UCSD Student Account Lookup page](https://sal.ucsd.edu/).

Let’s use SSH (Secure SHell) to connect to `ieng6` . Your command will look like this, but with the `aname` replaced by your account name. **Don't copy the `$`\!**

<code>
    <span style="color:red">$</span> ssh <span class="code-replace-me" contenteditable>Your account name</span>@ieng6.ucsd.edu
</code>

The `$` symbol is the prompt. In the terminal, it represents that you can type commands after this symbol to execute them. It is conventional to include `$` when giving examples of commands to make it clear that they are user-written commands, as opposed to output from a command.

Since this is likely the first time you’ve connected to this server, you will probably get a message like this:

```
$ ssh aname@ieng6.ucsd.edu
The authenticity of host 'ieng6.ucsd.edu (128.54.70.227)' can't be established.
RSA key fingerprint is SHA256:ksruYwhnYH+sySHnHAtLUHngrPEyZTDl/1x99wUQcec.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

If you see this prompt, copy and paste the one of the corresponding listed public key fingerprints and press Enter. We do this for complicated security reasons. Please note that if you have taken 15L, you will need to remove your SSH keys.

* If you see the phrase **ED25519 key fingerprint** answer with: `SHA256:8vAtB6KpnYXm5dYczS0M9sotRVhvD55GYz8EjN1DYgs`
* If you see the phrase **ECDSA key fingerprint** answer with: `SHA256:/bQ70BSkHU8AEUqommBUhdAg0M4GaFIHLKq0YQyKvmw`
* If you see the phrase **RSA key fingerprint** answer with: `SHA256:npmS8Gk0l+zAXD0nNGUxr7hLeYPn7zzhYWVKxlfNaeQ`

After this, you get a prompt to enter your password. This is the same password you use to log into your student account on other websites, like Canvas and Tritonlink. The terminal itself does not show what you type when you enter your password. This is conventionally done for your own security, so that others looking at your screen don’t see it. Just trust that it gets inputted when you type. Press Enter when you are done.

If the login process succeeds, you should see something like:

```
Last login: Tue Jan  7 10:00:00 2025 from 66.11.22.33
Hello aname, you are currently logged into ieng6-999.ucsd.edu

You are using 0% CPU on this system

To see all available software packages, type "prep -l" at the command prompt, or "prep -h" for more options.
[aname@ieng6-999]:~:45$
```

Now your terminal is connected to a computer in the CSE basement, and any commands you run will run on that computer\! We call your computer the *client* and the computer in the basement the *server* based on how you are connected.

If, in this process, you run into errors and can’t figure out how to proceed, ask\! Remember – it is **rare** for a tutorial to work perfectly. We often have to stop, think, guess, Google search, ask someone, etc. in order to get things to work the way the tutorial says.

To exit out of the `ieng6` server and return to running commands on your local device, type `exit` as a command, or press <kbd>Ctrl+D</kbd> (which sends an EOF character). **Please exit the `ieng6` server now for the next section.**

{: .checkoff }
Call over a tutor to get checked off for signing into `ieng6`, and paste a screenshot of your terminal into your lab report.

{: .owntime }
Your SSH client is pretty versatile. You can "bookmark" common connections and refer to them by name (so you could type `ssh ieng6` instead of `ssh aname@ieng6.ucsd.edu`). You can also register your client with `ieng6` so that you don't have to type out your password every time. If you're interested, check out [this guide](https://blog.geekinstitute.org/2024/11/the-complete-guide-to-ssh-secure-shell.html#ssh-configuration) for an overview of these features.

# Identify yourself to ieng6

With this setup, each time you log in to your `ieng6` account, you have to type the password. This can get a bit tedious. Luckily, there is a cool and interesting way to avoid this while still staying secure using SSH keys. **You should perform the following on your own device, not on a lab computer.** If you don't have your own device with you, please indicate this in your lab report and skip to the next section.

{: .important-title }
> Windows Users
>
> Please open a terminal in WSL before proceeding. Verify this by the prompt displayed in the terminal (It should *not* start with "`PS`", and it *should* end with `$`, not `>`). If you don't have WSL, you may still proceed with a PowerShell terminal, but you should [install WSL](/docs/setup.html) before the next lab.

1. Verify that you are **not** logged into `ieng6`. If your prompt does not contain the string `ieng6`, then you're probably not on it.
2. Run `ssh-keygen -t rsa`. This command will generate a pair of SSH keys for you: one public (ends in .pub) and one private.
   If the program claims that the keys already exist, answer the `Overwrite (y/n)?` prompt with `n` to prevent overwriting your existing keys. Otherwise, keep pressing `<Enter>` until the program shows some text it calls the "randomart image".
3. Expand the instructions that match your system below:

<details>
    <summary>
        <strong>If your prompt ends with $ or % or #, not > (macOS, WSL, Linux)</strong> (Click to show instructions)
    </summary>
    Run <code>ssh-copy-id <span class="code-replace-me" contenteditable>username</span>@ieng6.ucsd.edu</code>, and enter your password (one last time). The program should claim that it has installed your key.
</details>
<details>
    <summary>
        <strong>If your prompt ends with > (Windows)</strong> (Click to show instructions)
    </summary>
    <ol>
        <li>Log into ieng6 with <code>ssh</code> (using your password as usual)</li>
        <li>Run <code>mkdir -p .ssh</code> in the terminal</li>
        <li>Log out of your remote account by pressing <kbd>Ctrl</kbd>+<kbd>D</kbd> or typing <code>exit</code>.</li>
        <li>On your local machine, run the following command:<br />
           <code>type $env:USERPROFILE\.ssh\id_rsa.pub | ssh <span class="code-replace-me" contenteditable>username</span>@ieng6.ucsd.edu "cat >> .ssh/authorized_keys"</code><br />
           (Credit to <a href="https://chrisjhart.com/Windows-10-ssh-copy-id/">Christopher Hart</a> for this convenient command. Please note if the above command does not work, copy in your full path to the SSH key)
        </li>
    </ol>
</details>

Try to log onto your remote account again. **You shouldn’t be prompted for a password anymore.** If you are, ask for help and carefully review the steps above with your group.

{: .important }
Please put a screenshot of you logging into your `ieng6` account without a password prompt into your lab report. No check-off is needed\!

# The Terminal and You

In your day-to-day life as a CSE 29 student (and as a software engineer), you’ll be making heavy use of the terminal. Best to get familiar with it early on.

A **terminal** is a text-based interface for a user to interact with the computer. There are various **commands** that a user can type into the terminal that perform different functions. Let’s take a look at some of them.

## pwd \- “Where am I?”

 The location in the file system in which you are currently is called the “working directory”. You can use the pwd command to **p**rint the name of the **w**orking **d**irectory.

```
$ pwd
/home/linux/ieng6/oce/6k/aname
```

## ls \- Looking around

You can’t do much without knowing what exists in the current working directory to interact with. You can use the `ls` command to **l**i**s**t out the contents of the current working directory.

```
$ ls
folder hello.txt
```

Most commands will have multiple pre-defined options which allow you to modify the behavior of a command. Options are usually written as a dash (-) followed by a few letters. Some common options for the `ls` command include:

* `-a`: list all files, including hidden files
* `-l`: list in a long format, which shows additional information, such as permissions and time of creation
* `-al`:  enables both the `-a` and `-l` options for the same command

## cd \- Going Places

You can **c**hange your working **d**irectory to a different directory using the cd command with the destination directory as an argument.

```
$ cd folder
$ pwd
/home/aname/folder
```

There are also built-in symbols which refer to locations in the filesystem that you can use as arguments to commands.

* `/` (slash) represents the root directory, which is the top-most directory in a file system. It has to start somewhere\!
* `~` (tilde) represents the home directory, which is usually a specific directory assigned to each user on a system.
* `.` represents the current directory.
* `..` represents the parent directory, i.e. the directory in which this directory is contained.

## touch \- Creating Things

The *touch* command is used to change the last modified date of a file (hence, touching the file). A neat bonus feature of *touch* is that it will create a file with the given name if the file doesn’t already exist.

```
$ touch random.txt
$ ls
random.txt
```

A quick side note \- by default, the output of a command is printed out to the screen. But we can redirect the output into files using the \> character.
For example,
`$ pwd > random.txt`
takes the output from *pwd* and redirects it into a new file called *random.txt* (thus it does not print to the terminal).

## cat \- Looking at Things

You can use the cat command to display the contents of a file. This command is designed to be used to con**cat**enate files, but it is also commonly used to print out things.

```
$ cat mylocation.txt
/home/aname/folder
```

## mkdir \- Creating Things to Hold Things

 You can use the *mkdir* command to **m**a**k**e a new **dir**ectory with the given name as an argument.

```
$ mkdir nestedfolder
$ ls
nestedfolder
```

## rm \- Removing Things


When a file has outlived its usefulness, we may wish to **r**e**m**ove them. This can be done with the `rm` command.
For example:

```
$ ls
random.txt
$ rm random.txt
$ ls
```

Because the `random.txt` file got removed, our working directory is now empty, so ls doesn’t print anything.

## man \- Getting Help

Recall the command line options introduced for `ls`, `-a` and `-l`.

What if we wanted to learn more about what they do? What if we wanted to learn what other options *ls* has? How about the functionality and options of other commands? If only there were a **man**ual for this information…

Luckily for us, there is. You can use the *man* command to look up the functionality of a command. For example:

```
$ man ls
LS(1)                                               User Commands                                               LS(1)
NAME
        ls - list directory contents

SYNOPSIS
        ls [OPTION]... [FILE]...

DESCRIPTION
        List  information  about the FILEs (the current directory by default).
        Sort entries alphabetically if none of
        -cftuvSUX nor --sort is specified
...
    -a, --all   do not ignore entries starting with .
...
    -l    use a long listing format
...
```

To navigate the manual page, you can use the up and down arrow keys. To exit the manual, press <kbd>q</kbd>.

Try looking up some of the commands we’ve learned about so far in the manual. Who knows? You might learn something new.

{: .exercise }
> 1. On ieng6, create a directory called cse29, this will be the directory that contains all your work for labs
> 2. Within cse29,  create a directory called lab1
> 3. Inside lab1, create two directories called Music and Books
> 4. In Music and Books, create a couple of files with the names of your favorite songs and books respectively, here’s an example:
>
>         lab1
>         |----Music
>         |   |----Auld Lang Syne.mp3
>         |   |----Canon in D.mp3
>         |----Books
>             |----OSTEP.txt
>             |----Frankenstein.txt
>             |----The Little Prince.txt
>
>    **HINT:** to pass in strings with spaces as arguments, surround them in quotes, for example:
>     `$ touch "Auld Lang Syne.mp3"`
>
>
> 5. Navigate back to the lab1 directory, and use the `ls` command to print out the directories AND all their contents.
>
>    **HINT:** there is an option that lets you do this, try using the `man` command to find the `ls` option that enables you to print the contents of a directory **recursively**


# The Vim Text Editor

> Back in **my** day, before we had IDEs, we had to write all our code *in the terminal* with *Vim*, and we **liked** it\!

Up till now, you have most likely been programming in a graphical editor where you could click around with a mouse and highlight things by clicking and dragging.

But CSE 29 is cool. And using the mouse is decidedly uncool (in our view). So we are now going to learn a keyboard-based editor. Because you will spend the entire quarter inside the terminal (and you will love it), knowing how to use a text-based editor like what we are about to introduce is incredibly crucial.

After all, all the awesome hackers in movies are always *typing*, have you seen a single movie hacker clicking around with a mouse? Blurgh.

Our terminal-based editor is called **vim**. It’s an incredibly powerful editor once you learn how to use it properly. However, the learning curve is very steep, which is why the more you practice in these earlier weeks, the better. In this lab, you will use vim to write a small C program while learning a few essential vim features along the way.

Vim is highly configurable—using its own scripting language (VimScript), we can customize its behavior in a wide variety of ways. We can even install a Vim package manager and add [plugins](https://vimawesome.com/) that make it feel like VSCode\! For now, let's start with some sensible defaults, like 4 spaces for indentation, syntax highlighting enabled, and automatic "smart" indentation. If you haven't configured Vim on `ieng6` before, run the following command to download and install our configuration file:

```
$ wget https://cse29.site/assets/labs/lab1_commandline/vimrc.txt -O ~/.vimrc
```

Now, we are ready to begin. Inside the `lab1` directory you created in the previous section, run the following command to edit a new file named `contains.c`:

```
$ vim contains.c
```

## The Insert mode: "Just type"

When you enter vim, you start in the **Normal** mode. **Press `i`** to enter **Insert** mode, where anything you type gets **i**nserted into the file. You should see `-- INSERT --` show up at the bottom left (the status bar).

In this mode, you can:

* Use your **arrow keys** to move your cursor around the file
* Press **Backspace**/delete to delete the character at the cursor, much like conventional text editors
* Press **Ctrl+Shift+V** (Windows and Linux) or **Command+V** (macOS) to paste text from your operating system clipboard
* Press **Esc** to exit Insert mode and return to Normal mode

While we're in Insert mode, let's write a small C program that demonstrates a linear search algorithm. Complete the following skeleton in vim:

```c
#include <stdio.h>

int contains(int item, int arr[], int size) {
   // Write your solution here!
   // Return 1 if "item" exists in "arr" (which has length "size"), otherwise 0
}

int main() {
   int arr[] = {2, 9, 2, 0, 2, 5};

   // Call "contains" with an item of your choice, "arr", and the length of "arr".
   // Replace "0" in the following line with your function call
   printf("Result: %d\n", 0);
   return 0;
}
```

A quick side note - in class we recently learned about using char arrays as strings and having a null terminator to mark the end of the data. However, this does not apply to other array data types, like int.

## The Normal mode

Press **Esc** to exit Insert mode. The `-- INSERT --` indicator at the bottom left should disappear. You are now in Normal mode, where you can:

* Press `h`, `j`, `k`, and `l` to move your cursor inside the text editor
    ```
        ^
        k     Hint: The h key is at the left and moves left.
    < h   l >       The l key is at the right and moves right.
        j           The j key looks like a down arrow.
        v
    ```

    You can still use your arrow keys instead if you'd like\! *Psssst, no shame in doing so—professor Soosairaj does this, too\!*
* Press `:` to enter **Command** mode
* Press `i` or `a` to enter **Insert** mode
  * Try out both to figure out the difference\!
* Copy/paste: press `y` twice to "**y**ank" (copy) the current line into vim's internal clipboard. Press `p` to **p**aste it at the current cursor position.
* Delete: press `d` twice to **d**elete the current line and put it into vim's internal clipboard. Press `p` to **p**aste the deleted line at the current cursor position.

## The Command mode

When you enter Command mode by pressing `:` in Normal mode, your cursor moves to the bottom line of the terminal, where you can type out commands. For now, we will only use two command shorthands: `w` for **w**riting your changes (like pressing Save in a graphical text editor), and `q` for **q**uitting vim. You can type `:w` to save your changes to storage, `:q` to quit (add `!` afterward to force quit without saving unsaved changes), or `wq` to save and quit. So, when you are done editing in vim, you would type `:wq` from Normal mode. Pretty convenient, right?

By the way, if you ever change your mind and want to abandon your command, press **Esc** in Command mode to return to Normal mode.

A quick side note - avoid running two instances of Vim on the same file at the same time as this can lead to <a href="https://engineering.purdue.edu/ece264/21sp/resources/vim_swap_warnings">swap file conflicts</a>. You should not close your terminal window to exit Vim as this will leave the swapfile there.

{: .exercise }
> 1. Using `y` and `p` in Normal mode, change your code to make several calls to `contains` with different values for `item`, printing out the result each time.
> 2. Using `d` in Normal mode, remove the line with `return 0;` inside the `main` function. This line is actually not required for the `main` function.
> 3. Save your changes and exit vim.
> 4. To verify that your changes are saved, display the contents of `contains.c` without using vim.


{: .owntime }
Vim has many more commands and shortcuts. Run the `vimtutor` command in your own time for a guided tutorial through them.

# Compiling and running your program

Now we want to be able to run our program. First we will compile it using `gcc`, and then we will run our executable file.

## Compiling

GCC, our C compiler of choice, takes `.c` files and compiles them into our executable. for now we will only have 1 `.c` file and we will give it as our first argument to gcc, giving us:

`$ gcc contains.c` (Don't run this yet!)

However, this would create an executable named `a.out` and we would like our file to be named `contains`. (Yes, executable files don't have an extension in Unix/Linux.) We can use the `-o` flag to do this. `-o` takes the next argument and renames the output file to be that name:

`$ gcc contains.c -o contains` (Don't run this yet!)

We would also like to see any warnings that the compiler catches even if it doesn’t prevent it from compiling as an error. We will use the `-Wall` flag, which stands for **W**arn **all**. (Run this!)

```
$ gcc contains.c -o contains -Wall
```

If you don't see any output from this command, then it has succeeded. To run our program, since it is named “contains”, we shall type:

```
$ ./contains
```

You should see your linear search implementation in action.

Congratulations! In this lab, you have created, compiled, and executed a C program. If your program has not run, please ask a tutor near you for help getting it to run.

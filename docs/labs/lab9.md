---
layout: default
title: Lab 9
parent: Labs
nav_order: 10
permalink: /lab9
---

# Lab 9: Github Pages
{: .no_toc}
In this lab you'll make a public website that is accessible by anyone with an internet connection. Please contact your TA (etomson@ucsd.edu) if for personal privacy or security reasons you do not want to publish a public website, even under a pseudonym.

## Lab 9 learning objectives
{: .no_toc}
* Learn how to use markdown 
* Learn how to make a repository into a Github Pages Site
* Explore expanding upon a site

#### Table of contents
{: .no_toc}

1. TOC
{:toc }

# Icebreaker
{: .no_toc}
If you could only eat one meal for the rest of your life, what would it be?

## Related Links
{: .no_toc}

- [About Git](https://docs.github.com/en/get-started/using-git/about-git)
- [Github](https://github.com/)
- [Github Pages](https://pages.github.com/)
- [Github Desktop](https://desktop.github.com/)
- [Markdown cheat sheet](https://commonmark.org/help/)
- [What is Markdown?](https://www.markdownguide.org/getting-started/)
- [Git](https://git-scm.com/)
- [Lab Doc](https://docs.google.com/spreadsheets/d/1otg_99XZKDlf7_rpDagsQmmb3jqUd0qvWUjhWcX-sVY/edit?usp=sharing)


## Key Definitions

- **git repository**: A folder that tracks the history of edits to its files
- **Github repository**: A git repository online, like a Google Drive folder with history
- **Github pages**: A service that takes a Github repository and builds a
website from it (usually relying on conventions, like `index.md`)
- **Markdown**: A way to write plain text files with a little bit of formatting
- **commit**: A set of changes to a file or multiple files in a repository. A
repository history is made up of commits
- **git clone**: A git action to copy a repository from one place to another
(usually from somewhere like Github to our computer). Copies the contents of the
folder _and_ the entire history – the whole repository.
- **git commit**: A git action to take some changes we've made to files and
turn them into a commit in the repository's history
- **git push**: A git action to send commits from one place to another (usually
from our computer to Github)


### Part 1 – git, Github, and Github Pages Overview

Having a professional portfolio website for yourself can be useful in many, many ways. It's a useful URL to put at the top of your resume/CV where potential employers can learn more about you.  Lots of great work in CS is published only on someone's personal page, or is at least most accessible there.  Most CS faculty have such a page ([just](https://roseyu.com/) [a few](https://cseweb.ucsd.edu/~tzli/) [examples](http://kvaccaro.com/) [from new](https://web.engr.oregonstate.edu/~jensenca/OSU_ENGR/index.html) CSE faculty), for example.

Also, journaling and logging what you've learned is a powerful tool. Writing down what we've done and how we've done it, for an audience (real or imagined) other than ourselves, forces us to confront lingering misconceptions and cements what we learned in our memories. It's also simply useful to refresh your memory later!

For these reasons, we'll spend this lab creating a personal page, and then learning to write a blog post about what we learned.

Github ([https://www.github.com](github.com)) is a web service for storing and sharing code, along with a huge number of services surrounding that code. It uses a tool and protocol called `git` [https://git-scm.com/](https://git-scm.com) to store and retrieve that code. Github Pages [https://pages.github.com/](https://pages.github.com/) is one of the services Github provides for publishing personal and project websites from your Github account.

This lab is a basic introduction to Github Pages, building on what you have already learned about git in past labs; learning all that git, Github, or Github
Pages has to offer could take months of practice!

### Part 2 – Creating a Website with Github Pages

This section will show you how to create a site with Github Pages.

There are written instructions with screenshots below you can follow, and also a video. This demonstration was reorded for 15L, and you do not need to worry about lab reports and should name your repository whatever makes sense for *your* website.

<iframe width="560" height="315" src="https://www.youtube.com/embed/GZqizez1Dzs" title="GitHub Pages Youtube Video" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>


#### Create a Repository

On your github account, we are going to _create a new repository_ on Github. Throughout the quarter, we have provided repositories to you via a link to the repository on github which you were able to clone, or a github classroom assignment which creates a repository for you.

![](../../assets/labs/sp26/l9new-repository.png)

Name the repository something fitting, as it will be in the url to get to your website. Leave the other settings as they are, and click "Create Repository" at the bottom.

![](../../assets/labs/sp26/l9create-repository.png)

You should see a screen like this (but with your username and repo name):

![](../../assets/labs/sp26/l9new-repository-screen.png)

It is at this point that you could copy the ssh link from the blue box in the middle to clone the repo and edit it how you've edited any github assignment for this class, but now we can learn another way to add and edit files without ever leaving github. 

Click the "Create a new file" link (small, in blue, beneath the "Set up in Desktop" button). Make a new file called `index.md`, and put some text in it (whatever you like).

![](../../assets/labs/sp26/l9hello-world-pages.png)

At the top right of the screen you should see a green button with "Commit changes..." written on it. Click it and then type in a commit message (or accept the one copilot will surely give you), something like "created index.md" will do. Now click the green "Commit changes" button. You should see a view of your repository that now lists a file called `index.md`.

You have a public Github repository with some text in it! You could copy the link from your browser and send it to your friends and family to view! But wait... it will get cooler and more sharable.

#### Making a Pages Site

Next, click on "Settings" at the top of your repository, and then choose the "Pages" option in the sidebar:

![](../../assets/labs/sp26/l9settings-repo-button.png)

![](../../assets/labs/sp26/l9github-pages-branch.png)

Choose `main` as the source for Github Pages, and click "Save".

![](../../assets/labs/sp26/l9github-pages-link.png)


At the top it'll say “GitHub Pages source saved". Wait a bit and refresh the page. Eventually you'll see a message that says “Your site is live at `<url here>`.” (This can take a few minutes!) Click the link that's shown there; at first it will say the page isn't found. Wait a few minutes, then refresh the page.  Then you should see the text you wrote show up on a page like this:

![](../../assets/labs/sp26/l9hello-world-page-load.png)

Note that in addition to seeing your file at, e.g, [https://monip1.github.io/cse29-fun/](https://monip1.github.io/cse29-fun/), you can also see it with `index.html` added to the end of the URL: [https://monip1.github.io/cse29-fun/index.html](https://monip1.github.io/cse29-fun/index.html) (Try it!).

Something interesting that can now be done is many files can be added. If you recall from [lab 1](./lab1) where we had a `people` directory that included all of the staff, you can now see those `data.md` files because that entire directory has been copied in at the top level next to `index.md`. i.e. <https://monip1.github.io/cse29-fun/people/TAs/Elena/data> will show you Elena's nicely rendered markdown file. 

{: .note}
Adding `.md` to the end of that <https://monip1.github.io/cse29-fun/people/TAs/Elena/data.md> will allow you to see the raw text of said file.

{: .exercise} 
Add another file to your repository with any name you choose, but end it in the extension `.md`. Can you use this idea to see that file?

#### Editing Markdown

The `.md` extension stands for "Markdown," which is a particular text format used for writing. There are many good documents on the web. A good cheat sheet and explainer are here:

- [Cheat sheet](https://commonmark.org/help/)
- [What is Markdown?](https://www.markdownguide.org/getting-started/)

Skim both of those documents, then try to use some of the elements described in the cheat sheet in your `index.md` or your new file (or both). How do some of the different formatting options show up when you use them? Are any surprising?

You should now have:

- A repository with at least two files (`index.md` and another one you made up)
- In one of those files, a use of each kind of basic Markdown syntax
- A page that shows the rendered version of your Markdown text at a public URL

**Congratulations** – you now know how to make a (simple), public-facing website with basic formatting! You can share the link to your page with anyone in the world with an internet connection, and they can see your page.

{: .fun-fact} 
[the page you are reading](https://github.com/CSE29Spring2026/cse29spring2026.github.io/blob/main/docs/labs/lab9.md) is written in Markdown and uses Github Pages!

### Images in markdown

Another video you may want to watch from our much appreciated Spring 2024 CSE15L staff on images in markdown.

<iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/FN6K9YvdhTA?cc_load_policy=1" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe> 

{: .funny}

Images are added using the format: `![description of image](link-to-image)`
* the description can be any string you'd like, but ideally something useful in the event the image does not properly load.
* the link can be either a link to an image online, or a link to an image stored in your repo where you give it the relative path. If you make a folder called `images` next to `index.md` and add `dog.png` to said `images` folder, then you could add the image to your `index.md` by adding the line `![a very cute dog](./images/dog.png)`

### Fun with Github Pages

As mentioned [earlier in the lab](./lab9#part-1--git-github-and-github-pages-overview), these tools can be used for very serious things like portfolios, but to help build the toolset of getting comfortable with **markdown** and structuring the site, your task is to make something fun or interesting to you during this lab time.

If you are at a loss on what to do, consider:
* make a loop of pages with 1 home page. ie `index.md` has a link to a second page, which has a link to a third.
* a page on something you enjoy (some sport or hobby)
* incorporate back buttons on your pages to get back to your `index.md` or otherwise

If you would like any inspiration, Elena has provided her [15L reports repo](https://monip1.github.io/cse15l-lab-reports/), which serves as an example of what is possible with the handful of tools you have learned (mostly links and pictures) throughout the course of the quarter's worth of 15L labs and one lockdown-induced late night session of possible insanity in about week 3 of said quarter.



#### Before you leave

Please go ahead and fill out this Google form before you leave, it will help us improve the class in the future (survey??TODO)


<!---**How do I submit my Github Pages site to Gradescope?**

Visit your Github Pages website with your tutorial in a browser (Safari, Chrome, Brave, 
Firefox, Edge, etc), and use “Print” to save it to a PDF. Then, upload the PDF to the 
“Lab Report 1 - Remote Access and Filesystem” assignment on Gradescope. For example, 
if your Github Pages site has the link [https://pandrew99.github.io/cse15l-lab-reports-example](https://pandrew99.github.io/cse15l-lab-reports-example)
and you made your lab report 1 .md file called `lab1.md`, you would access it by adding `lab1.html` 
at the end, like: [https://pandrew99.github.io/cse15l-lab-reports-example/lab1.html](https://pandrew99.github.io/cse15l-lab-reports-example/lab1.html).
The format of the PDF you submit should look something like this:
![Image](../images/cse15l-lab-reports-example.png)
    
**Can I use screenshots from the lab document we worked on together?**

Sure! If they are from your account, that's fine. Don't share another person's screenshots,
instead describe where you got stuck and include a screenshot of what doesn't
work.
--->



### Part ? -- Installing VSCode and git on your computer


Go to the Visual Studio Code website
[https://code.visualstudio.com/](https://code.visualstudio.com/), and follow the
instructions to download and install it on your computer. There are versions for
all the major operating systems, like macOS (for Macs) and Windows (for PCs).

When it is installed, you should be able to open a window that looks like this
(it might have different colors, or a different menu bar, depending on your
system and settings):

![/images/vscode.png](../../assets/labs/sp26/l9vscode.png)


Then if you're on Windows: install `git` for Windows, which comes with some
useful tools we need:

[Git for Windows](https://gitforwindows.org/)

Once installed, use the steps in this post to set your default terminal to use
the newly-installed `git bash` in Visual Studio Code:

[Using Bash on Windows in VScode](https://stackoverflow.com/a/50527994)

(That's all the special instructions for Windows users). 

Then, to run commands, open a terminal in VScode. (Ctrl or Command + \`, or use the Terminal → New
Terminal menu option). Try running some of the commands we learned in earlier
labs and lectures on this computer.


## Codespaces
### *Alternative way of working with a GitHub repository* 
There is an alternative way of working with our repository, and we *highly recommend* you try working with GitHub Codespaces (which comes with the GitHub Student Developer Pack)! More documentation is available [here](https://docs.github.com/en/codespaces). It is an online Integrated Development Environment that allows us to work with our code directly online! 

**Important Note:** Make sure you apply for your Github Student Account in order to get access to the codespaces. 

*(Only if you set up GitHub Codespaces -- highly recommended)* Go to a repository on GitHub and click “<> Code”, click "Codespaces", click "Create codespace on main"

<style>
.funny {
    position: relative;
    overflow: hidden;

    background-color: var(--callout-funfact-bg) !important;
    color: var(--text-color) !important;
    border-left: 4px solid #41ac99 !important;

    padding: 0.75rem 1rem;
    border-radius: 4px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.06);
    margin: 1rem 0;
}

/* The flying lightsaber */
.funny::after {
    content: "";

    position: absolute;
    top: 50%;
    left: -200px;

    width: 160px;
    height: 160px;

    background-image: url("../../assets/labs/sp26/lightsaber.png");
    background-size: contain;
    background-repeat: no-repeat;

    transform: translateY(-50%) rotate(-12deg);

    opacity: 0;

    pointer-events: none;

    animation: saber-flyby 14s linear infinite;
}

/* Optional pulse for icon/text/etc */
.funny::before {
    content: "⚔️";
    display: inline-block;
    margin-right: 0.5rem;
    animation: ff-pulse 8s ease-in-out infinite;
}

@keyframes ff-pulse {
    0%   { transform: scale(1); }
    50%  { transform: scale(1.10); }
    100% { transform: scale(1); }
}

/*
    Most of the animation is invisible.
    The saber only appears briefly.
*/
@keyframes saber-flyby {

    /* Hidden for a while */
    0%, 70% {
        left: -250px;
        opacity: 0;
    }

    /* Fade in */
    72% {
        opacity: 1;
    }

    /* Fly across */
    85% {
        left: calc(100% + 250px);
        opacity: 1;
    }

    /* Fade out */
    88%, 100% {
        left: calc(100% + 250px);
        opacity: 0;
    }
}
</style>
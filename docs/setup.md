---
title: Windows Setup
layout: default
nav_order: 6
---

# Windows Setup

{: .note}
If you are on Mac or Linux, you can skip this page.

In this course, we will do most of our work in a Unix-style terminal window.
Both macOS and Linux have native support for this, but Windows does not. To
make your life easier, we will install [Windows Subsystem for Linux (WSL)](https://docs.microsoft.com/en-us/windows/wsl/install),
which will allow you to run a Linux terminal on your Windows machine.
This will make it easier to follow along with the course material and complete the assignments.
This will also leave you with a local Linux-based C development environment that you can fully customize to your liking, unlike ieng6.

This process will take about 30 minutes and you might be prompted to restart
your computer a few times. Make sure you have a good internet connection and are plugged into power.

- Check your Windows version. You need to be on Windows 10 version 2004 or higher
or any version of Windows 11. To check your version, press <kbd>Windows + R</kbd> and type `winver`.

  ![Sample screenshot of winver](/assets/wsl/winver.png)

  If your version is lower than 2004, you will need to update Windows
  (or alternatively, [install WSL manually](https://learn.microsoft.com/en-us/windows/wsl/install-manual)).
- Open PowerShell as an administrator. To do this, press <kbd>Windows + X</kbd>
  and select `Windows PowerShell (Admin)` or `Terminal (Admin)`.

  ![The Terminal (Admin) item in the Windows+X menu](/assets/wsl/pwsh_admin.png)
- In the PowerShell window, type the following command and press Enter:

  ```bash
  wsl --install
  ```

  You may see a message that requests permission to install the WSL feature. Hit "Allow" or "Yes" or whatever affirmative response is appropriate for your system. You will see a progress bar as WSL is installed. This may take a few minutes.

  If you see "Ubuntu is already installed" then you can stop here and close the terminal. If not, read on.
- Restart your computer when prompted.

  ![Result of WSL installation command prompting a reboot](/assets/wsl/reboot.png)
- This window should pop up when you are back. If it doesn't, follow step 2 to open a terminal window and type `wsl`.

  ![Installation of Ubuntu in progress](/assets/wsl/cont_inst.png)
- The window will prompt you for a username. You can use any username; your school user should be as good as any. Hit enter to submit the username.
- The terminal will then prompt you for a password. When you type your password, no text will appear. **THIS IS FINE**, the terminal is still remembering what you typed in, it’s just hiding it for privacy purposes. Hit enter to submit your password, then retype your password.

  {: .note}
  Backspace also works, but the deletion of characters is also hidden. So if you
  messed up your password and don’t know where you typed wrong characters, you may
  have to spam backspace to delete the whole password and retry your entry.
  ![Password is not shown when setting your UNIX password](/assets/wsl/user.png)

  {: .note}
  If you want to better understand why you need a username to use the terminal,
  a typical Operating Systems course (like CSE 120) will explain the concepts of
  users and permissions. The basic idea is that there can be many users on one
  UNIX system, but each user shouldn't be able to tamper with another user's data,
  except for a few "superusers" like `root`.
- You will now be presented with a prompt. In this terminal, the prompt is colored green and ends with a $.
At this point you are done with your installation! Now you can type any Linux command into this prompt.
To close WSL, you can either type “exit” and hit enter, or type CTRL-D. Or, just hit the big X at the top-right corner of the window.
![alt text](/assets/wsl/done.png)

- To access this terminal, you can simply type WSL in the Start Menu.

# Setting WSL as the default in Windows Terminal

You will be using the terminal a **LOT** throughout this quarter.
Feel free to play around with the Settings in Windows Terminal by pressing <kbd>Ctrl + , (comma)</kbd>.

Click on the Default Profile dropdown and select the option with [Tux](https://en.wikipedia.org/wiki/Tux_(mascot)).
Then hit save.

![Setting Ubuntu as the default profile in Windows Terminal](/assets/wsl/default.png)

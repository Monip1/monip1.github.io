---
layout: default
title: Minecraft Setup
parent: Labs
nav_order: 11
permalink: /minecraft
---

# Minecraft Summer 2026
{: .no_toc}


#### Table of contents
{: .no_toc}

1. TOC
{:toc }

# Prerequisite Installations

## Minecraft: Java Edition
To play minecraft you gotta have [minecraft](https://www.minecraft.net/en-us/download).

## Neoforge
You can download Neoforge [here](https://neoforged.net/).  
We will be playing on version 1.21.1 and the neoforge version is 21.1.234.

[This link](https://maven.neoforged.net/releases/net/neoforged/neoforge/21.1.234/neoforge-21.1.234-installer.jar) should download it automatically? 

# Adding Mods

Locate your `.minecraft` folder. You should see it if you go to your file explorer and type `%appdata%` in the path. It's probably `~/AppData/Roaming`. Enter the `.minecraft/mods` directory.

{: .funny}
Take the mods [here](todo) and put them into said `mods` folder. (Be sure to unzip it first, probably right-click -> extract all). 

# Playing

## Launching with Neoforge
Launch the minecraft launcher. Theorhetically it now says "Neoforge" on the installation selected which is shown to the left of the "Play" button. If that is selected, click play. If it's not selected, see if you can find it in the drop down or in the "Installations" tab at the top.

## Playing on our server

Ask Elena to whitelist you, provide her with your Minecraft username.

Multiplayer->Add Server

Give it whatever name you want and the IP Address is pinned in the discord in the `#gaming` channel.







<style>
.funny {
    position: relative;
    overflow: hidden;

    background-color: transparent !important;
    padding: 0.75rem 1rem;
    border-radius: 4px;
    margin: 1rem 0;
}

/* The flying lightsaber */
.funny::after {
    content: "";

    position: absolute;
    top: 50%;
    left: -200px;

    width: 120px;
    height: 120px;

    background-image: url("../../assets/labs/sp26/lightsaber.png");
    background-size: contain;
    background-repeat: no-repeat;

    transform: translateY(-50%);

    opacity: 0;

    pointer-events: none;

    animation: saber-flyby 60s linear infinite;
}


/*
    Most of the animation is invisible.
    The saber only appears briefly.
*/
@keyframes saber-flyby {

    /* hidden offscreen */
    0%, 77% {
        left: -250px;
        opacity: 0;
        transform:
            translateY(-50%)
            rotate(-78deg);
    }

    /* start appearing */
    80% {
        left: -250px;
        opacity: 1;
        transform:
            translateY(-50%)
            rotate(12deg);
    }

    /* fly across spinning */
    83% {
        left: calc(100% + 250px);
        opacity: 1;
        transform:
            translateY(-50%)
            rotate(12deg);
    }

    /* fade away */
    86%, 100% {
        left: calc(100% + 250px);
        opacity: 0;
        transform:
            translateY(-50%)
            rotate(12deg);
    }
}

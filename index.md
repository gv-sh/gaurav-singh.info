---
layout: base.njk
title: Introduction
description: The Personal Website of Gaurav Singh
keywords: Gaurav Singh, personal website, introduction, CV, journal, projects, teaching, research, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, computer science, design, art, creative practice, innovation, experience design, programming, computational thinking, ethics, societal impact, technology innovation, Griffith Gold Coast, Griffith University Gold Coast, Australia Gold Coast, India Bangalore
sidebar: true
right: Test
---

### Hello, I'm Gaurav, based in Gold Coast — Exploring ML and data visualisation to solve engineering challenges.

Welcome to my digital space — think of this as an book. Start with the <!--[foreword](/foreword/) from friends, then flip to the--> [prologue](/prologue/) to see how it began. Check out my [CV](/cv/) for the basics, or dive into the [journal](/journal/) for stories and study notes. Explore chapters on my [education](/education/), [work](/work/), [teaching](/teaching/), [projects](/projects/), and [research](/research/). Along the way, meet my [peers](/peers/), [students](/students/), and [mentors](/mentors/). Don’t miss [Mathscapes](/mathscapes/), my life's project<!--, or the [store](/store/) for my latest stuff-->. Use the [index](/index/) to find your way around. I hope you find something useful or inspiring here.

[Email](mailto:hi@gvsh.cc)
 
---  

#### Latest from my journal  

{% assign latestPosts = collections.journal | slice: 0, 10 %}
{% for entry in latestPosts %}{{ entry.data.date | postDate }} <a href="{{ entry.url }}" title="{{ entry.data.title }}">{{ entry.data.title | truncate: 40 }}</a>{% if entry.data.cover %}&nbsp;<img class="micro" src="{{ entry.data.cover }}"></img>{% endif %}{% unless forloop.last %}\{% endunless %}
{% endfor %}

[View all posts](/journal/)

--- 

#### Featured pages
- [Places I've been](/map/) (Visualisation)
- [Graphic work](/graphic-shots/) (Screenshots)
- <a target="_blank" href="https://docs.google.com/presentation/d/1ZEFgsGSbvhxkISJNc6xFoFhgyMTzoNEtWAiibE7x--Q/pub?start=false&loop=false&delayms=3000">Introduction slides</a> (External link)
- Story behind my website: [Prologue](/prologue/), [Evolution](/journal/evolution-of-my-personal-website/) and [Design](/journal/design-of-my-personal-website/)
- Five projects that I'm proud of: [Deconstructing algorithms](/projects/deconstructing-algorithms-2020/), [ReRide](/projects/reride/), [IMTAR](/projects/interactive-multimarker-tracking-and-ar-in-low-light-or-partially-obstruction/), [HARR-CD](/projects/harr-cascade-based-detection/)
- Five of my favorite courses that I've facilitated: [Making with Algorithms](/teaching/making-with-algorithms/), [Sketch, Crit and Remix](/teaching/sketch-crit-and-remix/), [MagFlora](/teaching/mathematics-of-magnificent-flora/), [Should you Copyleft?](/teaching/should-you-copyleft/), [Digital Making](/teaching/digital-making-workshop-for-foundation-students/)
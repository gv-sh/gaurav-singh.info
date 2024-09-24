---
layout: base.njk
title: Introduction
description: The Personal Webbsite of Gaurav Singh
keywords: Gaurav Singh, personal website, introduction, CV, journal, projects, teaching, research, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, computer science, design, art, creative practice, innovation, experience design, programming, computational thinking, ethics, societal impact, technology innovation, Griffith Gold Coast, Griffith University Gold Coast, Australia Gold Coast, India Bangalore
sidebar: true
---

![](/assets/20240715_142519.jpg)
_Cradle mountain, Tasmania_

### Hello, I'm Gaurav, based in Gold Coast — Exploring ML and data visualisation to solve engineering challenges.

Welcome to my digital space — think of this as an book. Start with the <!--[foreword](/foreword/) from friends, then flip to the--> [prologue](/prologue/) to see how it began. Check out my [CV](/cv/) for the basics, or dive into the [journal](/journal/) for stories and study notes. Explore chapters on my [education](/education/), [work](/work/), [teaching](/teaching/), [projects](/projects/), and [research](/research/). Along the way, meet my [peers](/peers/), [students](/students/), and [mentors](/mentors/). Don’t miss [Mathscapes](/mathscapes/), my life's project<!--, or the [store](/store/) for my latest stuff-->. Use the [index](/index/) to find your way around. I hope you find something useful or inspiring here.

<details>
<summary>Read more about me</summary>

Hello! I’m Gaurav Singh, originally from India and currently evolving my expertise in Machine Learning (ML) at Griffith University, Gold Coast, Australia. My journey combines together a [foundation in computer science](/education/bachelors-cs/) with an interest for visual arts and a commitment to creative and ethical practice. My work explores ML within human-computer interaction (HCI) and engineering, striving to make data analysis more accessible while considering its societal and ethical dimensions. This focus drives my projects and future ambitions for conscientious technology innovation.

In addition to my computer science background, I've studied [Innovation and Experience Design](/education/adp-ied/), focusing on creative problem-solving and the societal role of technology. From 2008 to 2015, I worked as an [independent designer](/work/independent-designer/), developing [Mathscapes](https://mathscapes.xyz), a space for creating accessible design tools through mathematics. In 2017, I took a [faculty position at Srishti-Manipal](/work/faculty-member-at-srishti-manipal/), where I taught courses in HCI, mathematics, and programming. My dual roles as designer and researcher have shaped my teaching, offering students unique perspectives on design and technology. In 2022, I left Srishti to pursue further studies, continuing to merge mathematics, computation, and ethics in my work.
</details>

[Email](mailto:gv-sh@outlook.com)
 
---

#### Latest from my journal  

<ul>
{% assign latestPosts = collections.journal | slice: 0, 10 %}
{% for post in latestPosts %}
<li><a href="{{ post.url }}">{{ post.data.title | truncate: 30 }}</a> posted on {% if post.data.date %}{{ post.data.date | postDate }}{% if post.data.attribution %} / {{ post.data.attribution }}{% endif %}{% endif %}</li> 
{% endfor %}
</ul>

--- 

#### Featured pages
- [Places I've been](/map/) (Visualisation)
- [Graphic work](/graphic-shots/) (Screenshots)
- <a target="_blank" href="https://docs.google.com/presentation/d/1ZEFgsGSbvhxkISJNc6xFoFhgyMTzoNEtWAiibE7x--Q/pub?start=false&loop=false&delayms=3000">Introduction slides</a> (External link)
- Story behind my website: [Prologue](/prologue/), [Evolution](/journal/evolution-of-my-personal-website/) and [Design](/journal/design-of-my-personal-website/)
- Five projects that I'm proud of: [Deconstructing algorithms](/projects/deconstructing-algorithms-2020/), [ReRide](/projects/reride/), [IMTAR](/projects/interactive-multimarker-tracking-and-ar-in-low-light-or-partially-obstruction/), [HARR-CD](/projects/harr-cascade-based-detection/)
- Five of my favorite courses that I've facilitated: [Making with Algorithms](/teaching/making-with-algorithms/), [Sketch, Crit and Remix](/teaching/sketch-crit-and-remix/), [MagFlora](/teaching/mathematics-of-magnificent-flora/), [Should you Copyleft?](/teaching/should-you-copyleft/), [Digital Making](/teaching/digital-making-workshop-for-foundation-students/)
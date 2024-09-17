---
layout: base.njk
title: Introduction
sidebar: true
---

![](/assets/20240715_142519.jpg)
_Cradle mountain, Tasmania_

### Hello, I'm Gaurav, based in Gold Coast — Exploring ML and data visualization to solve complex engineering problems.

Welcome to my corner on the web — think of this as an open book. Start with the <!--[foreword](/foreword/) from friends, then flip to the--> [prologue](/prologue/) to see how it all started. Check out my [CV](/cv/) for the basics, or dive into the [journal](/journal/) for some personal stories and study notes. You’ll find chapters on my [education](/education/), [work](/work/), [teaching](/teaching/), [projects](/projects/), and [research](/research/). Meet the awesome [peers](/peers/), [students](/students/), and [mentors](/mentors/) along the way. Don’t miss [Mathscapes](/mathscapes/), my life's project<!--, or the [store](/store/) for my latest stuff-->. Wrap things up with the [epilogue](/epilogue/) and use the [index](/index/) to find your way around. I hope you find something useful or inspiring here.

---

Hello! I’m Gaurav Singh, originally from India and currently evolving my expertise in Machine Learning (ML) at Griffith University, Gold Coast, Australia. My professional journey combines together a [foundation in computer science](/education/bachelors-cs/) with an interest for visual arts and a commitment to creative and ethical practice. I am particularly focused on exploring ML within the realms of human-computer interaction (HCI) and engineering, striving to bridge the gap between technology and creativity. My motivation is to make advanced data analysis techniques more accessible while thoughtfully addressing their societal, environmental, and ethical implications. This focus guides my current projects and inspires my future ambitions, with a vision for responsible progress in these areas.

Beyond my computer science background, I have studied [Innovation and Experience Design](/education/adp-ied/), gaining insights into creative experimentation, the role of technology in tackling societal challenges, and the political dimensions of design. From 2008 to 2015, I worked as an [independent designer](/work/independent-designer/), participating in international competitions and projects. During this period, I envisioned <a class="external" href="https://mathscapes.xyz">Mathscapes</a>, a space to develop accessible tools for design and research using maths. In 2017, my interest for teaching and research led me to a [faculty position at the Srishti-Manipal Institute](/work/faculty-member-at-srishti-manipal/), where I [taught courses and workshops](/teaching/) in human-computer interaction, mathematics, and programming at both undergraduate and graduate levels. My dual roles as a designer and researcher have significantly influenced my teaching, offering students [distinctive perspectives](/journal/in-defense-of-a-creative-pursuit/) on the intersection of design, mathematics, and technology. In 2022, I left Srishti to pursue further studies, continuing to draw from mathematics, computation, and ethics to inform my thoughts, ideas, and projects.

<a href="mailto:gv-sh@outlook.com" class="external">Email</a> &nbsp; [CV](/cv) &nbsp; <a target="_blank" class="external" href="https://docs.google.com/presentation/d/1ZEFgsGSbvhxkISJNc6xFoFhgyMTzoNEtWAiibE7x--Q/pub?start=false&loop=false&delayms=3000">Intro slides</a>

---

#### Latest from my journal  
<ul>
{% assign latestPosts = collections.journal | slice: 0, 10 %}
{% for post in latestPosts %}
<li><a href="{{ post.url }}">{{ post.data.title }}</a> posted on {% if post.data.date %}{{ post.data.date | postDate }}{% if post.data.attribution %} / {{ post.data.attribution }}{% endif %}{% endif %}</li>
{% endfor %}
</ul>

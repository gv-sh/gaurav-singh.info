---
layout: base.njk
title: Projects
sidebar: true
description: Gaurav's Projects
keywords: Gaurav Singh, personal website, projects, work, research, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, computer science, design, art, creative practice, innovation, experience design, programming, computational thinking, societal impact, technology innovation, Griffith Gold Coast, Griffith University Gold Coast, Australia Gold Coast, India, interdisciplinary studies, ethical technology, data ethics, user experience design, computational creativity, visual storytelling, digital art, academic research, community engagement, technology and society, educational technology, design thinking, software development, algorithmic design, interactive media, 
---

{% for entry in collections.projects %}{% if entry.data.date %}{{ entry.data.date | postDate }}{% endif %} <a href="{{ entry.url }}" title="{{ entry.data.title }}">{{ entry.data.title  | truncate: 30}}</a>{% unless forloop.last %}\{% endunless %}
{% endfor %}
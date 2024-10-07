---
layout: base.njk
title: Journal
sidebar: true
description: Gaurav's Journal
keywords: Gaurav Singh, personal website, journal, stories, notes, reflections, thoughts, experiences, learning, teaching, research, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, computer science, design, art, creative practice, innovation, experience design, programming, computational thinking, ethics, societal impact, technology innovation, Griffith Gold Coast, Griffith University Gold Coast, Australia Gold Coast, India, academic writing, personal growth, insights, creative process, interdisciplinary studies, technology and society, educational experiences, narrative, exploration, critical thinking, professional development, community engagement
permalink: /journal/
---

{% for entry in collections.journal %}{{ entry.data.date | postDate }} <a href="{{ entry.url }}" title="{{ entry.data.title }}">{{ entry.data.title | truncate: 40 }}</a>{% if entry.data.cover %}&nbsp;<img class="micro" src="{{ entry.data.cover }}"></img>{% endif %}{% unless forloop.last %}\{% endunless %}
{% endfor %}
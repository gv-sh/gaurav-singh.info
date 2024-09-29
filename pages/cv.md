---
layout: base.njk
title: CV
sidebar: true
description: Gaurav's CV
keywords: Gaurav Singh, personal website, journal, stories, notes, reflections, thoughts, experiences, learning, teaching, research, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, computer science, design, art, creative practice, innovation, experience design, programming, computational thinking, ethics, societal impact, technology innovation, Griffith Gold Coast, Griffith University Gold Coast, Australia Gold Coast, India, academic writing, personal growth, insights, creative process, interdisciplinary studies, technology and society, educational experiences, narrative, exploration, critical thinking, professional development, community engagement
permalink: /cv/
---

### Latest

{% assign sorted_entries = collections.cv | sort: 'data.year', 'data.code' | reverse | where: 'data.active', true %}
{% for entry in sorted_entries %}{{ entry.data.year }} <span class="doc-code">[{{ entry.data.code }}]</span> <a target="_blank" href="{{ entry.data.link }}" title="{{ entry.data.title }}">{{ entry.data.title }}</a>{% unless forloop.last %}\{% endunless %}
{% endfor %}

### Older versions
{% assign sorted_entries = collections.cv | sort: 'data.year', 'data.code' | reverse | where: 'data.active', false %}
{% for entry in sorted_entries %}{{ entry.data.year }} <span class="doc-code">[{{ entry.data.code }}]</span> <a target="_blank" href="{{ entry.data.link }}" title="{{ entry.data.title }}">{{ entry.data.title }}</a>{% unless forloop.last %}\{% endunless %}
{% endfor %}

---
layout: base.njk
title: Research
sidebar: true
description: Gaurav's Research
keywords: Gaurav Singh, personal website, research, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, design, embodied self-monitoring, motorbike commuting, bike area network, modular platform, personal informatics, cloud-based platform, interactive prototype, situated memory, self-efficacy, well-being, senior citizens, digital technology, real-time data visualization, posture tracking, in-situ evaluation, user experience design, community engagement, ethical technology, interdisciplinary studies, technology innovation, educational technology, algorithmic design, interactive media
---
{% for entry in collections.research %}{% if entry.data.date %}{{ entry.data.date | postDate }}{% endif %} <a href="{{ entry.url }}" title="{{ entry.data.title }}">{{ entry.data.title  | truncate: 30}}</a>{% unless forloop.last %}\{% endunless %}
{% endfor %}
---
layout: base.njk
title: Education
description: Gaurav's Education
keywords: Gaurav Singh, personal website, education, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, computer science, design, art, creative practice, innovation, experience design, programming, computational thinking, societal impact, technology innovation, Griffith Gold Coast, Griffith University Gold Coast, Australia Gold Coast, India, interdisciplinary studies, ethical technology, data ethics, user experience design, computational creativity, visual storytelling, digital art, academic research, community engagement, technology and society, educational technology, design thinking, software development, algorithmic design, interactive media, embodied self-monitoring, personal informatics, self-efficacy, situated memory, motorbike riding, bike area network, modular platform, cloud-based platform, interactive prototype, well-being, senior citizens, real-time data visualization, posture tracking, in-situ evaluation, user experience design, community engagement, ethical technology, interdisciplinary studies, technology innovation, educational technology, algorithmic design, interactive media
sidebar: true
permalink: /education/
---

{% for entry in collections.education %}{% if entry.data.date %}{{ entry.data.date | postDate }}{% endif %} <a href="{{ entry.url }}">{{ entry.data.title  | truncate: 30}}</a>{% unless forloop.last %}\{% endunless %}
{% endfor %}
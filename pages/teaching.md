---
layout: base.njk
title: Teaching
sidebar: true
description: Gaurav's Teaching
keywords: Gaurav Singh, personal website, teaching, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, computer science, design, art, creative practice, innovation, experience design, programming, computational thinking, societal impact, technology innovation, Griffith Gold Coast, Griffith University Gold Coast, Australia Gold Coast, content, course, participants, create, management, user, building, interfaces, adobe, illustrator, digital, designing, programming, data, structures, computer, processing, code, interactive, learning, websites, wearable, embedding, emerging, boards, prototyping, advanced, design, language, algorithms, computation, human-computer interaction, digital making, interaction, screens, pushing boundaries, math, probability, discrete, physical​⬤
permalink: /teaching/
---

{% for entry in collections.teaching %}{% if entry.data.date %}{{ entry.data.date | postDate }}{% endif %} <a href="{{ entry.url }}" title="{{ entry.data.title }}">{{ entry.data.title  | truncate: 30}}</a>{% unless forloop.last %}\{% endunless %}
{% endfor %}
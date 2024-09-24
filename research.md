---
layout: base.njk
title: Research
sidebar: true
description: Gaurav's Research
keywords: Gaurav Singh, personal website, research, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, design, embodied self-monitoring, motorbike commuting, bike area network, modular platform, personal informatics, cloud-based platform, interactive prototype, situated memory, self-efficacy, well-being, senior citizens, digital technology, real-time data visualization, posture tracking, in-situ evaluation, user experience design, community engagement, ethical technology, interdisciplinary studies, technology innovation, educational technology, algorithmic design, interactive media
pagination: 
    data: collections.research
    size: 5
    alias: entries
---
Please check my [CV](/cv/) for a list of my research interests.
 
---

<div class="spacer"></div>

{% for entry in entries %}
<div class="item">
    {% if entry.data.cover %}
        <img src="{{ entry.data.cover }}" alt="{{ entry.data.title }}">
    {% endif %}
    <h6 class="deck">{{ entry.data.deck }}</h6>
    <h3>{{ entry.data.title }}</h3>
    <p class="meta">
    {% if entry.data.date %}
        {{ entry.data.date | postDate }}{% if entry.data.attribution %} / {{ entry.data.attribution }}{% endif %}
    {% endif %}
    </p>
    <p>{{ entry.content }}</p>
    {% if entry.data.showFurther %}
        <p><a href="{{ entry.url }}">View more</a></p>
    {% endif %}
</div>
<div class="spacer"></div>
{% endfor %}
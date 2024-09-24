---
layout: base.njk
title: Work
sidebar: true
description: Gaurav's Work
keywords: Gaurav Singh, personal website, work, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, computer science, design, art, creative practice, innovation, experience design, programming, computational thinking, societal impact, technology innovation, Griffith Gold Coast, Griffith University Gold Coast, Australia Gold Coast, India, interdisciplinary studies, ethical technology, data ethics, user experience design, computational creativity, visual storytelling, digital art, academic research, community engagement, technology and society, educational technology, design thinking, software development, algorithmic design, interactive media, embodied self-monitoring, personal informatics, self-efficacy, situated memory, motorbike riding, bike area network, modular platform, cloud-based platform, interactive prototype, well-being, senior citizens, real-time data visualization, posture tracking, in-situ evaluation, user experience design, community engagement, ethical technology, interdisciplinary studies, technology innovation, educational technology, algorithmic design, interactive media
pagination: 
    data: collections.work
    size: 5
    alias: entries
---

{% for entry in entries %}
<div class="item">
    {% if entry.data.cover %}
        <img src="{{ entry.data.cover }}" alt="{{ entry.data.title }}">
    {% endif %}
    <h6 class="deck">{{ entry.data.deck }}</h6>
    <h3>{{ entry.data.title }}</h3>
    <p class="meta">
    {% if entry.data.startDate %}
        {{ entry.data.startDate | postDate }} to {% if entry.data.endDate %} {{ entry.data.endDate | postDate }} {% else %} Present {% endif %} / {{ entry.data.duration }} {% if entry.data.remote %} / Remote {% endif %}
    {% endif %}
    </p>
    <p>{{ entry.data.description }}</p>
    <a href="{{ entry.url }}">View more</a>
</div>
<div class="spacer"></div>
{% endfor %}

<nav aria-labelledby="my-pagination">
  <ol>
    {%- for pageEntry in pagination.pages %}
        <li><a href="{{ pagination.hrefs[ forloop.index0 ] }}"{% if page.url == pagination.hrefs[ forloop.index0 ] %} aria-current="page"{% endif %}>{{ forloop.index }}</a></li>
    {%- endfor %}
  </ol>
</nav>
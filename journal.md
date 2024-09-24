---
layout: base.njk
title: Journal
sidebar: true
description: Gaurav's Journal
keywords: Gaurav Singh, personal website, journal, stories, notes, reflections, thoughts, experiences, learning, teaching, research, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, computer science, design, art, creative practice, innovation, experience design, programming, computational thinking, ethics, societal impact, technology innovation, Griffith Gold Coast, Griffith University Gold Coast, Australia Gold Coast, India, academic writing, personal growth, insights, creative process, interdisciplinary studies, technology and society, educational experiences, narrative, exploration, critical thinking, professional development, community engagement
pagination: 
    data: collections.journal
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
    {% if entry.data.date %}
        {{ entry.data.date | postDate }}{% if entry.data.attribution %} / {{ entry.data.attribution }}{% endif %}
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
---
layout: base.njk
title: Teaching
sidebar: true
description: Gaurav's Teaching
keywords: Gaurav Singh, personal website, teaching, Griffith University, Gold Coast, Australia, India, Bangalore, Srishti Manipal, Manipal, HCI, ML, AI, data visualisation, machine learning, human-computer interaction, computer science, design, art, creative practice, innovation, experience design, programming, computational thinking, societal impact, technology innovation, Griffith Gold Coast, Griffith University Gold Coast, Australia Gold Coast, content, course, participants, create, management, user, building, interfaces, adobe, illustrator, digital, designing, programming, data, structures, computer, processing, code, interactive, learning, websites, wearable, embedding, emerging, boards, prototyping, advanced, design, language, algorithms, computation, human-computer interaction, digital making, interaction, screens, pushing boundaries, math, probability, discrete, physical​⬤
pagination: 
    data: collections.teaching
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
        {{ entry.data.date | postYear }}{% if entry.data.attribution %} / {{ entry.data.attribution }}{% endif
    %}
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
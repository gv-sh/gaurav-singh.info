---
layout: base.njk
title: Journal
sidebar: true
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
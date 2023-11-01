---
layout: base.njk
title: Teaching
sidebar: true
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
    <h6>{{ entry.data.deck }}</h6>
    <h3>{{ entry.data.title }} {% if entry.data.meta %} [{{ entry.data.meta }}] {% endif %}</h3>
    <p class="meta">
    {% if entry.data.date %}
        {{ entry.data.date | postYear }}{% if entry.data.attribution %} ● {{ entry.data.attribution }}{% endif %}
    {% endif %}
    </p>
    <p>{{ entry.data.description }}</p>
    {% if entry.data.showFurther %}
        <p><a href="{{ entry.url }}">View more</a></p>
    {% endif %}
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
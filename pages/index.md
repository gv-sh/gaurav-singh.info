---
layout: base.njk
title: Index
sidebar: true
permalink: /index/
---

{% assign allLinks = "" | split: "" %}
{% for entry in collections.all %}
  {% if entry.url != page.url %}
    {% assign link = entry.data.title | append: "|" | append: entry.url %}
    {% assign allLinks = allLinks | push: link %}
  {% endif %}
{% endfor %}

{% assign sortedLinks = allLinks | sort %}

{% assign groupedLinks = "" | split: "" %}
{% for link in sortedLinks %}
  {% assign linkParts = link | split: "|" %}
  {% assign title = linkParts[0] %}
  {% assign url = linkParts[1] %}
  {% assign firstLetter = title | slice: 0 | upcase %}
  
  {% assign groupFound = false %}
  {% assign newGroupedLinks = "" | split: "" %}
  {% for group in groupedLinks %}
    {% if group.first == firstLetter and groupFound == false %}
      {% assign groupFound = true %}
      {% assign updatedGroup = group | push: link %}
      {% assign newGroupedLinks = newGroupedLinks | push: updatedGroup %}
    {% else %}
      {% assign newGroupedLinks = newGroupedLinks | push: group %}
    {% endif %}
  {% endfor %}
  
  {% if groupFound == false %}
    {% assign newGroup = "" | split: "" | push: firstLetter | push: link %}
    {% assign newGroupedLinks = newGroupedLinks | push: newGroup %}
  {% endif %}
  
  {% assign groupedLinks = newGroupedLinks %}
{% endfor %}

{% assign groupedLinks = groupedLinks | sort %}

{% for group in groupedLinks %}
### {{ group.first }}
{% for link in group offset:1 %}{% assign linkParts = link | split: "|" %}{% assign title = linkParts[0] %}{% assign url = linkParts[1] %}
[{{ title }}]({{ url }})  {% endfor %}
{% endfor %}

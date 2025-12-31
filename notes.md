---
layout: default
title: Notes
---

# Notes

These are technical notes and deep dives on backend systems, Azure,
security automation, and practical applications of AI.

---

{% for post in site.posts %}
### [{{ post.title }}]({{ post.url }})

<span class="post-meta">
  {{ post.date | date: "%B %d, %Y" }}
</span>

{% endfor %}

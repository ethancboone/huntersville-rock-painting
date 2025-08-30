---
layout: gallery
title: Gallery
---
# Gallery
Filter: [All](/gallery/) · [Birthday](/gallery/#birthday) · [School Spirit](/gallery/#school) · [Events](/gallery/#events)

<div class="grid">
{% for item in site.gallery %}
  <a class="card" href="{{ item.url }}">
    <img src="{{ item.image }}" alt="{{ item.alt }}" />
    <div class="caption">{{ item.caption }}</div>
  </a>
{% endfor %}
{% if site.gallery == empty %}
  <p>No items yet. Add some in <code>_gallery/</code> or via <a href="/admin/">CMS</a>.</p>
{% endif %}
</div>


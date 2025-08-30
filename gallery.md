---
layout: gallery
title: Gallery
---
# Gallery
Filter: [All]({{ '/gallery/' | relative_url }}) · [Birthday]({{ '/gallery/#birthday' | relative_url }}) · [School Spirit]({{ '/gallery/#school' | relative_url }}) · [Events]({{ '/gallery/#events' | relative_url }})

<div class="grid">
{% for item in site.gallery %}
  <a class="card" href="{{ item.url }}">
    <img src="{{ item.image | relative_url }}" alt="{{ item.alt }}" />
    <div class="caption">{{ item.caption }}</div>
  </a>
{% endfor %}
{% if site.gallery == empty %}
  <p>No items yet. Add some in <code>_gallery/</code> or via <a href="{{ '/admin/' | relative_url }}">CMS</a>.</p>
{% endif %}
</div>

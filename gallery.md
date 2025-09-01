---
layout: gallery
title: Gallery
---
# Gallery

Explore by category.

<div class="row g-3 mb-4">
  {% assign cats = site.data.gallery_categories.categories %}
  {% for c in cats %}
    {% assign count = 0 %}
    {% for item in site.gallery %}
      {% if item.tags contains c.id %}
        {% assign count = count | plus: 1 %}
      {% endif %}
    {% endfor %}
    <div class="col-12 col-sm-6 col-md-4" data-reveal>
      <a class="card h-100 text-decoration-none" href="{{ '/gallery/' | append: c.id | append: '/' | relative_url }}">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <div class="small text-muted text-uppercase">{{ c.id }}</div>
            <h2 class="h5 mb-1">{{ c.title }}</h2>
            <p class="mb-2 muted">{{ count }} item{% if count != 1 %}s{% endif %}</p>
          </div>
          <div class="text-primary">View →</div>
        </div>
      </a>
    </div>
  {% endfor %}
</div>

{% include gallery_grid.html %}
{% include lightbox_modal.html %}

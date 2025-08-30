---
layout: gallery
title: Gallery
---
# Gallery

<ul class="nav nav-pills mb-3" id="gallery-filters" role="tablist">
  <li class="nav-item" role="presentation"><button class="nav-link active" data-filter="all" type="button">All</button></li>
  <li class="nav-item" role="presentation"><button class="nav-link" data-filter="birthday" type="button">Birthday</button></li>
  <li class="nav-item" role="presentation"><button class="nav-link" data-filter="school" type="button">School Spirit</button></li>
  <li class="nav-item" role="presentation"><button class="nav-link" data-filter="event" type="button">Events</button></li>
  </ul>

<div class="row g-3" id="gallery-grid">
{% for item in site.gallery %}
  <div class="col-12 col-sm-6 col-md-4 gallery-item" data-tags="{{ item.tags | join: ' ' }}">
    <div class="card h-100">
      <a href="#" class="stretched-link text-decoration-none" data-lightbox data-img="{{ item.image | relative_url }}" data-alt="{{ item.alt }}" data-caption="{{ item.caption | escape }}">
        <img class="card-img-top gallery-card-img" src="{{ item.image | relative_url }}" alt="{{ item.alt }}" loading="lazy" />
      </a>
      <div class="card-body">
        <div class="small text-muted text-uppercase">{{ item.tags | join: ', ' }}</div>
        <div class="card-text">{{ item.caption }}</div>
      </div>
    </div>
  </div>
{% endfor %}
{% if site.gallery == empty %}
  <div class="col-12"><p>No items yet. Add some in <code>_gallery/</code> or via <a href="{{ '/admin/' | relative_url }}">CMS</a>.</p></div>
{% endif %}
</div>

<!-- Lightbox Modal -->
<div class="modal fade" id="lightboxModal" tabindex="-1" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered modal-lg">
    <div class="modal-content">
      <div class="modal-body p-0">
        <img id="lightboxImg" src="" alt="" class="w-100" style="max-height:70vh; object-fit:contain; background:#000;" />
      </div>
      <div class="modal-footer">
        <div class="me-auto" id="lightboxCaption"></div>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>

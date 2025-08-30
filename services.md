---
layout: page
title: Services & Pricing
---
# Services & Pricing

<div class="row g-3" data-reveal>
{% for p in site.packages %}
  <div class="col-12 col-md-6 col-lg-4" data-reveal>
    <div class="card h-100 shadow-sm">
      <div class="card-body d-flex flex-column">
        <h3 class="h5 card-title">{{ p.name }}</h3>
        <p class="card-subtitle mb-2 text-muted">{% if p.price %}${{ p.price }}{% else %}Quote{% endif %}</p>
        <p class="card-text">{{ p.short }}</p>
        {% if p.includes %}
        <ul class="small mb-3">
          {% for i in p.includes %}<li>{{ i }}</li>{% endfor %}
        </ul>
        {% endif %}
        <a class="btn btn-primary mt-auto align-self-start" href="{{ '/book/' | relative_url }}">Request to Book</a>
      </div>
    </div>
  </div>
{% endfor %}
{% if site.packages == empty %}
  <div class="col-12">_No packages yet. Add some in_ <code>_packages/</code> _or via_ <a href="{{ '/admin/' | relative_url }}">CMS</a>.</div>
{% endif %}
</div>

---

### Policies
- Weather: we reschedule at no extra cost.
- Cancellations: 48 hours notice preferred.
- Lead time: book 1–2 weeks ahead when possible.

<div class="alert alert-info mt-3">
  <strong>Note:</strong> Clients arrange rock reservations (school/HOA). We handle design, materials, and painting. Payment is completed via Venmo or Zelle after booking.
</div>

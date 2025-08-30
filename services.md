---
layout: page
title: Services & Pricing
---
# Services & Pricing

{% for p in site.packages %}
### {{ p.name }} — ${{ p.price }}
{{ p.short }}

**Includes:**
{% for i in p.includes %}- {{ i }}
{% endfor %}

[Reserve with Stripe]({{ p.stripe_link }})

---
{% endfor %}

{% if site.packages == empty %}
_No packages yet. Add some in_ <code>_packages/</code> _or via_ <a href="{{ '/admin/' | relative_url }}">CMS</a>.
{% endif %}

**Note:** Clients arrange rock reservations (school/HOA). We handle design, materials, and painting.

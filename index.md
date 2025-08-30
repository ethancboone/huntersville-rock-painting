---
layout: page
title: Home
image: /assets/og.jpg
---
# Custom-Painted Spirit Rocks
Vibrant, weather-resistant designs for **birthdays**, **school spirit**, and **special events** in Huntersville, NC.

[Book Now](/book/) · [See Pricing](/services/) · [View Gallery](/gallery/)

## How It Works
1. **Reserve** your rock with your school or HOA.
2. **Share your idea** (name, theme, date). We create a quick mockup.
3. **We paint** — on time and on brand. You enjoy the smiles!

## Featured Work
{% assign featured = site.gallery | sort: 'date' | reverse | slice: 6 %}
<div class="grid">
  {% for item in featured %}
  <a class="card" href="{{ item.url }}">
    <img src="{{ item.image }}" alt="{{ item.alt }}" />
    <div class="caption">{{ item.title }}</div>
  </a>
  {% endfor %}
  {% if featured.size == 0 %}
  <p>No gallery items yet. Add one in <code>_gallery/</code> or via <a href="/admin/">CMS</a>.</p>
  {% endif %}
  
</div>

## Testimonials
{% assign quotes = site.testimonials | slice: 3 %}
{% if quotes.size > 0 %}
<div class="grid">
  {% for t in quotes %}
  <div class="card" style="padding:12px;">
    <p>“{{ t.quote }}”</p>
    <p class="muted">— {{ t.author }}</p>
  </div>
  {% endfor %}
  {% if quotes.size == 0 %}
  <p>Be the first to leave a testimonial!</p>
  {% endif %}
</div>
{% else %}
<p>We’ll add testimonials here as they come in.</p>
{% endif %}

## Service Area
Huntersville, Cornelius, Davidson, North Charlotte. Need another location? [Contact us](/contact/).


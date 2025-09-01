---
layout: page
title: Home
image: /assets/og.jpg
---
<section class="py-5 hero" data-reveal>
  <div class="container">
    <div class="row align-items-center g-4">
      <div class="col-lg-6 text-center text-lg-start">
        <h1 class="display-5 fw-bold">Custom Painted Rocks by [Artist’s Name] in Huntersville, NC.</h1>
        <p class="lead mb-4">Vibrant, weather-resistant designs for <strong>birthdays</strong>, <strong>house numbers</strong>, <strong>yard art</strong>, and <strong>memorials</strong>.</p>
        <div class="d-flex gap-2 justify-content-center justify-content-lg-start">
          <a class="btn btn-primary btn-lg rounded-pill" href="{{ '/book/' | relative_url }}"><i class="bi bi-calendar2-check me-1"></i> Book Now</a>
          <a class="btn btn-outline-secondary btn-lg rounded-pill" href="{{ '/gallery/' | relative_url }}"><i class="bi bi-image me-1"></i> View Gallery</a>
          <a class="btn btn-outline-primary btn-lg rounded-pill" href="{{ '/contact/' | relative_url }}"><i class="bi bi-chat-dots me-1"></i> Contact</a>
        </div>
      </div>
      <div class="col-lg-6">
        {% assign hero_items = site.gallery | sort: 'date' | reverse | slice: 6 %}
        {% if hero_items.size > 0 %}
        <div class="mosaic">
          {% for item in hero_items %}
          <a class="mosaic-item {% if forloop.index == 1 or forloop.index == 4 %}mosaic-lg{% endif %}" href="{{ item.url | relative_url }}" aria-label="{{ item.title }}">
            <img src="{{ item.image | relative_url }}" alt="{{ item.alt }}" loading="lazy" />
          </a>
          {% endfor %}
        </div>
        {% endif %}
      </div>
    </div>
  </div>
  </section>

## How It Works
<div class="stepper" data-reveal>
  <div class="step">
    <div class="step-icon"><i class="bi bi-geo-alt-fill"></i></div>
    <div class="step-title">Reserve the Rock</div>
    <div class="step-desc">Confirm your date with your school or HOA.</div>
  </div>
  <div class="step">
    <div class="step-icon"><i class="bi bi-chat-dots-fill"></i></div>
    <div class="step-title">Share Your Idea</div>
    <div class="step-desc">Theme, name, and any must‑have colors.</div>
  </div>
  <div class="step">
    <div class="step-icon"><i class="bi bi-brush-fill"></i></div>
    <div class="step-title">We Paint</div>
    <div class="step-desc">Durable, weather‑resistant finish — on time.</div>
  </div>
</div>

## Featured Work
{% assign featured = site.gallery | sort: 'date' | reverse | slice: 6 %}
<div class="row g-3" data-reveal>
  {% for item in featured %}
  <div class="col-12 col-sm-6 col-md-4">
    <a class="card h-100 text-decoration-none" href="{{ item.url | relative_url }}">
      <img class="card-img-top gallery-card-img" src="{{ item.image | relative_url }}" alt="{{ item.alt }}" loading="lazy" />
      <div class="card-body"><div class="card-title h6 mb-0">{{ item.title }}</div></div>
    </a>
  </div>
  {% endfor %}
  {% if featured.size == 0 %}
    <div class="col-12"><p>No gallery items yet. Add one in <code>_gallery/</code>.</p></div>
  {% endif %}
</div>

## Testimonials
{% assign quotes = site.testimonials | slice: 5 %}
{% if quotes.size > 0 %}
<div id="testimonialCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    {% for t in quotes %}
    <div class="carousel-item {% if forloop.first %}active{% endif %}">
      <div class="d-flex justify-content-center">
        <div class="col-12 col-md-8">
          <div class="card shadow-sm">
            <div class="card-body p-4 text-center">
              <p class="fs-5 mb-1">“{{ t.quote }}”</p>
              <p class="text-muted mb-0">— {{ t.author }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#testimonialCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
{% else %}
<p>We’ll add testimonials here as they come in.</p>
{% endif %}

## About the Artist
With over two decades serving the Lake Norman and North Charlotte area, our artist brings deep experience across large-scale murals, school parking spot painting, and spirit rock designs. Expect professional communication, durable materials, and on-time delivery.

## Service Area
Huntersville, Cornelius, Davidson, North Charlotte. Need another location? [Contact us]({{ '/contact/' | relative_url }}).

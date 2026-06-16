---
layout: default
title: blog
permalink: /blog/
nav: true
nav_order: 3
pagination:
  enabled: true
  collection: posts
  permalink: /page/:num/
  per_page: 5
  sort_field: date
  sort_reverse: true
---

<div class="blog-page">
  <header class="blog-header">
    <h1 class="blog-title">{{ site.blog_name }}</h1>
    {% if site.blog_description %}
      <p class="blog-subtitle">{{ site.blog_description }}</p>
    {% endif %}
  </header>

  {% if site.pagination.enabled %}
    {% assign postlist = paginator.posts %}
  {% else %}
    {% assign postlist = site.posts %}
  {% endif %}

  {% if postlist == empty %}
    <p class="blog-empty">No posts yet — check back soon.</p>
  {% else %}
    <div class="blog-list">
      {% for post in postlist %}
        {% assign read_time = post.content | number_of_words | divided_by: 180 | plus: 1 %}
        {% assign year = post.date | date: '%Y' %}

        {% if post.redirect contains '://' %}
          {% assign post_url = post.redirect %}
        {% else %}
          {% assign post_url = post.url | relative_url %}
        {% endif %}

        <article class="blog-card" data-post-url="{{ post_url }}" role="link" tabindex="0" aria-label="{{ post.title | escape }}">
          <h2 class="blog-card-title">{{ post.title }}</h2>

          {% if post.description %}
            <p class="blog-card-desc">{{ post.description }}</p>
          {% endif %}

          <div class="blog-card-meta">
            <span class="meta-date"><i class="fa-solid fa-calendar fa-sm"></i> {{ post.date | date: '%B %d, %Y' }}</span>
            <span class="meta-dot">&middot;</span>
            <span class="meta-read">{{ read_time }} min read</span>
            {% if post.tags.size > 0 %}
              <span class="blog-card-tags">
                {% for tag in post.tags %}
                  <a class="blog-tag" href="{{ tag | slugify | prepend: '/blog/tag/' | prepend: site.baseurl }}">{{ tag }}</a>
                {% endfor %}
              </span>
            {% endif %}
          </div>
        </article>
      {% endfor %}
    </div>
  {% endif %}

  {% if site.pagination.enabled and paginator.total_pages > 1 %}
    <nav aria-label="Page navigation">
      <ul class="pagination justify-content-center">
        {% if paginator.previous_page %}
          <li class="page-item">
            <a class="page-link" href="{{ paginator.previous_page_path | relative_url }}">&laquo;</a>
          </li>
        {% else %}
          <li class="page-item disabled"><span class="page-link">&laquo;</span></li>
        {% endif %}

        {% for page_number in (1..paginator.total_pages) %}
          {% if page_number == paginator.page %}
            <li class="page-item active" aria-current="page">
              <span class="page-link">{{ page_number }}</span>
            </li>
          {% elsif page_number == 1 %}
            <li class="page-item"><a class="page-link" href="{{ '/blog/' | relative_url }}">{{ page_number }}</a></li>
          {% else %}
            <li class="page-item">
              <a class="page-link" href="{{ site.paginate_path | relative_url | replace: ':num', page_number }}">{{ page_number }}</a>
            </li>
          {% endif %}
        {% endfor %}

        {% if paginator.next_page %}
          <li class="page-item">
            <a class="page-link" href="{{ paginator.next_page_path | relative_url }}">&raquo;</a>
          </li>
        {% else %}
          <li class="page-item disabled"><span class="page-link">&raquo;</span></li>
        {% endif %}
      </ul>
    </nav>
  {% endif %}
</div>

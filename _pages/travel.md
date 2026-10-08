---
layout: page
title: travel
permalink: /travel/
nav: false
map: true
---

Tap a dot on the map, or a place in the list below, to zoom in.

<!--
  HOW TO ADD A PLACE: add an entry to _data/travel.yml, e.g.

    - { name: Tokyo, country: Japan, coords: [35.6895, 139.6917] }   # [latitude, longitude]

  The map auto-zooms to fit every place, and the "Traveling" card on the about page
  updates its counts automatically.
-->

<script type="application/geo+json">
{
  "type": "FeatureCollection",
  "features": [
    {%- for place in site.data.travel %}
    { "type": "Feature", "properties": { "name": {{ place.name | jsonify }}, "country": {{ place.country | jsonify }} },
      "geometry": { "type": "Point", "coordinates": [{{ place.coords[1] }}, {{ place.coords[0] }}] } }{% unless forloop.last %},{% endunless %}
    {%- endfor %}
  ]
}
</script>

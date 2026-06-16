---
layout: page
title: travel
permalink: /travel/
nav: false
map: true
description: Some of the places I've been lucky enough to visit.
---

A map of places I've traveled to. Click a pin to see where it is.

<!--
  HOW TO ADD A PLACE:
  Add a Feature to the "features" list below. IMPORTANT: GeoJSON coordinates are
  [longitude, latitude] — longitude FIRST, then latitude. (This trips everyone up.)
  Look up a city's coordinates by searching e.g. "Tokyo latitude longitude".

    { "type": "Feature", "properties": { "name": "Tokyo" },
      "geometry": { "type": "Point", "coordinates": [139.6917, 35.6895] } }

  The map auto-zooms to fit whatever points are listed, so just add/remove entries.
  The cities below are starter examples — edit them to match your own travels.
-->

```geojson
{
  "type": "FeatureCollection",
  "features": [
    { "type": "Feature", "properties": { "name": "Edmonton" },
      "geometry": { "type": "Point", "coordinates": [-113.4938, 53.5461] } },
    { "type": "Feature", "properties": { "name": "Montreal" },
      "geometry": { "type": "Point", "coordinates": [-73.5674, 45.5019] } },
    { "type": "Feature", "properties": { "name": "Toronto" },
      "geometry": { "type": "Point", "coordinates": [-79.3832, 43.6532] } },
    { "type": "Feature", "properties": { "name": "Calgary" },
      "geometry": { "type": "Point", "coordinates": [-114.0719, 51.0447] } },
    { "type": "Feature", "properties": { "name": "Banff" },
      "geometry": { "type": "Point", "coordinates": [-115.5708, 51.1784] } },
    { "type": "Feature", "properties": { "name": "Jasper" },
      "geometry": { "type": "Point", "coordinates": [-118.0814, 52.8737] } },
    { "type": "Feature", "properties": { "name": "Kelowna" },
      "geometry": { "type": "Point", "coordinates": [-119.4960, 49.8880] } },
    { "type": "Feature", "properties": { "name": "Revelstoke" },
      "geometry": { "type": "Point", "coordinates": [-118.1953, 50.9981] } },
    { "type": "Feature", "properties": { "name": "Seattle" },
      "geometry": { "type": "Point", "coordinates": [-122.3321, 47.6062] } },
    { "type": "Feature", "properties": { "name": "San Francisco" },
      "geometry": { "type": "Point", "coordinates": [-122.4194, 37.7749] } },
    { "type": "Feature", "properties": { "name": "Los Angeles" },
      "geometry": { "type": "Point", "coordinates": [-118.2437, 34.0522] } },
    { "type": "Feature", "properties": { "name": "Las Vegas" },
      "geometry": { "type": "Point", "coordinates": [-115.1398, 36.1699] } },
    { "type": "Feature", "properties": { "name": "Denver" },
      "geometry": { "type": "Point", "coordinates": [-104.9903, 39.7392] } },
    { "type": "Feature", "properties": { "name": "Albuquerque" },
      "geometry": { "type": "Point", "coordinates": [-106.6504, 35.0844] } },
    { "type": "Feature", "properties": { "name": "Santa Fe" },
      "geometry": { "type": "Point", "coordinates": [-105.9378, 35.6870] } },
    { "type": "Feature", "properties": { "name": "Chicago" },
      "geometry": { "type": "Point", "coordinates": [-87.6298, 41.8781] } },
    { "type": "Feature", "properties": { "name": "Boston" },
      "geometry": { "type": "Point", "coordinates": [-71.0589, 42.3601] } },
    { "type": "Feature", "properties": { "name": "Honolulu" },
      "geometry": { "type": "Point", "coordinates": [-157.8581, 21.3069] } },
    { "type": "Feature", "properties": { "name": "São Paulo" },
      "geometry": { "type": "Point", "coordinates": [-46.6333, -23.5505] } },
    { "type": "Feature", "properties": { "name": "Rio de Janeiro" },
      "geometry": { "type": "Point", "coordinates": [-43.1729, -22.9068] } },
    { "type": "Feature", "properties": { "name": "Rabat" },
      "geometry": { "type": "Point", "coordinates": [-6.8498, 34.0209] } },
    { "type": "Feature", "properties": { "name": "Paris" },
      "geometry": { "type": "Point", "coordinates": [2.3522, 48.8566] } },
    { "type": "Feature", "properties": { "name": "Brussels" },
      "geometry": { "type": "Point", "coordinates": [4.3517, 50.8503] } },
    { "type": "Feature", "properties": { "name": "Amsterdam" },
      "geometry": { "type": "Point", "coordinates": [4.9041, 52.3676] } },
    { "type": "Feature", "properties": { "name": "Vienna" },
      "geometry": { "type": "Point", "coordinates": [16.3738, 48.2082] } },
    { "type": "Feature", "properties": { "name": "St. Wolfgang" },
      "geometry": { "type": "Point", "coordinates": [13.4470, 47.7395] } },
    { "type": "Feature", "properties": { "name": "Kigali" },
      "geometry": { "type": "Point", "coordinates": [30.0619, -1.9441] } },
    { "type": "Feature", "properties": { "name": "Beijing" },
      "geometry": { "type": "Point", "coordinates": [116.4074, 39.9042] } },
    { "type": "Feature", "properties": { "name": "Shanghai" },
      "geometry": { "type": "Point", "coordinates": [121.4737, 31.2304] } },
    { "type": "Feature", "properties": { "name": "Qingdao" },
      "geometry": { "type": "Point", "coordinates": [120.3826, 36.0671] } },
    { "type": "Feature", "properties": { "name": "Nanjing" },
      "geometry": { "type": "Point", "coordinates": [118.7969, 32.0603] } },
    { "type": "Feature", "properties": { "name": "Hefei" },
      "geometry": { "type": "Point", "coordinates": [117.2272, 31.8206] } },
    { "type": "Feature", "properties": { "name": "Suzhou" },
      "geometry": { "type": "Point", "coordinates": [120.5853, 31.2989] } },
    { "type": "Feature", "properties": { "name": "Hangzhou" },
      "geometry": { "type": "Point", "coordinates": [120.1551, 30.2741] } },
    { "type": "Feature", "properties": { "name": "Huangshan" },
      "geometry": { "type": "Point", "coordinates": [118.1667, 30.1333] } },
    { "type": "Feature", "properties": { "name": "Xiamen" },
      "geometry": { "type": "Point", "coordinates": [118.0894, 24.4798] } },
    { "type": "Feature", "properties": { "name": "Dali" },
      "geometry": { "type": "Point", "coordinates": [100.2676, 25.6065] } },
    { "type": "Feature", "properties": { "name": "Erhai Lake" },
      "geometry": { "type": "Point", "coordinates": [100.1900, 25.7800] } },
    { "type": "Feature", "properties": { "name": "Haikou" },
      "geometry": { "type": "Point", "coordinates": [110.1999, 20.0440] } },
    { "type": "Feature", "properties": { "name": "Sanya" },
      "geometry": { "type": "Point", "coordinates": [109.5119, 18.2528] } },
    { "type": "Feature", "properties": { "name": "Seoul" },
      "geometry": { "type": "Point", "coordinates": [126.9780, 37.5665] } },
    { "type": "Feature", "properties": { "name": "Tokyo" },
      "geometry": { "type": "Point", "coordinates": [139.6917, 35.6895] } },
    { "type": "Feature", "properties": { "name": "Kamakura" },
      "geometry": { "type": "Point", "coordinates": [139.5500, 35.3192] } },
    { "type": "Feature", "properties": { "name": "Hakone" },
      "geometry": { "type": "Point", "coordinates": [139.0260, 35.2324] } },
    { "type": "Feature", "properties": { "name": "Mt. Fuji" },
      "geometry": { "type": "Point", "coordinates": [138.7274, 35.3606] } },
    { "type": "Feature", "properties": { "name": "Kyoto" },
      "geometry": { "type": "Point", "coordinates": [135.7681, 35.0116] } },
    { "type": "Feature", "properties": { "name": "Osaka" },
      "geometry": { "type": "Point", "coordinates": [135.5023, 34.6937] } }
  ]
}
```

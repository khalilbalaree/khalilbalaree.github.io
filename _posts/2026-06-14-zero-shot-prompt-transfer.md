---
layout: post
title: "Carrying a soft prompt from one model to another"
date: 2026-06-14
description: Describing a soft prompt by what it's near, so its task semantics carry across different language models.
tags: [llm, prompt-tuning, transfer, nlp, research]
categories: [research]
related_publications: true
---

Say you've spent real effort tuning a soft prompt — a little set of learned vectors that
makes a model good at some task. Then a newer, better model comes out. Can you just hand
your prompt over to the new model?

With a *text* prompt, sure — words are words, and you can paste them anywhere. But a
**continuous** (soft) prompt isn't words. It's a bundle of raw embedding vectors tuned
to one specific model's internal space. Hand those numbers to a different model and they
mean nothing. The effort doesn't transfer.

That portability gap is what [zero-shot continuous prompt transfer]({{ '/publications/' | relative_url }})
{% cite wu2024zeroshot %} sets out to close.

## Why soft prompts don't travel

Every model carries its own private map of meaning. Two models might both "understand"
language, but the *coordinates* they use are completely different — the direction that
means "about sports" in one model points somewhere unrelated in another.

A soft prompt is just a point (well, a few points) on one model's map. Copy those exact
coordinates onto a different map and you land somewhere arbitrary. The prompt was never a
statement about the task in the abstract; it was a statement in one model's private
dialect.

<div class="text-center">
  <img src="{{ '/assets/img/blog/fig1-cpt-problem.svg' | relative_url }}" alt="A soft prompt tuned in Model A's embedding space lands on a meaningless location when its vectors are copied directly into Model B's differently-shaped space." style="max-width:100%; height:auto;">
  <p class="post-description">The same coordinates mean different things on different maps, so a direct copy fails.</p>
</div>

## The idea: describe a prompt by what it's near

The fix is to stop describing the prompt by its *absolute* coordinates and start
describing it by its *relationships*. Pick a set of ordinary words that both models know
— "river," "happy," "run," and so on — and use them as **anchors**. Then describe the
source prompt not as "these vectors," but as "this much like *river*, this much like
*happy*, this much like *run*…"

That description — a list of similarities to shared anchor words — is the **relative
representation**. And crucially, it's *model-agnostic*: because both models know the same
anchor words, both can speak in this common language. It captures the **task semantics**
of the prompt while throwing away the model-specific coordinate frame.

To transfer, you flip the process around on the target model: **search for a prompt in
the new model whose relationships to those same anchors match the source's**. No labeled
data, no retuning on the target — just find the point on the new map that has the same
description.

<div class="text-center">
  <img src="{{ '/assets/img/blog/fig2-cpt-relative.svg' | relative_url }}" alt="The source prompt is encoded as similarities to shared anchor words, giving a model-agnostic relative representation, and a matching prompt is searched for in the target model." style="max-width:100%; height:auto;">
  <p class="post-description">Encode the prompt as relations to shared words, then find the prompt in the new model with the same relations.</p>
</div>

## Does it actually work?

It does. Prompts transferred this way carry their task ability across to other models
**without any tuning on the target side** — confirming that the "task semantics" baked
into a continuous prompt really are generalizable, not just an artifact of one model.

There's also a nice bonus. If you encode the *same* task from **several source models**
and combine their relative representations, the transfer gets even better. Pooling
several models' takes on a task washes out each one's idiosyncrasies and leaves a cleaner
signal of what the task actually is.

## Why I think this matters

Soft prompts are cheap to store but, until now, awkwardly disposable — retire a model and
the prompts you tuned for it retire with it. Treating a prompt's meaning as a set of
*relationships* rather than fixed coordinates makes that knowledge portable: you can move
task know-how onto new and better models as they arrive, instead of starting over each
time.

The broader idea I like here is the reframing — **meaning as relations, not
coordinates.** A point is only interpretable relative to a shared frame of reference, and
once you choose anchors everyone agrees on, a surprising amount of "model-specific" stuff
turns out to be translatable after all.

The full method, the relative-space encoding, and the experiments are in the
[paper](https://arxiv.org/abs/2310.01691).

---
layout: post
title: "Carrying a soft prompt from one model to another"
date: 2026-06-14
description: Describing a soft prompt by what it's near, so its task semantics carry across different language models.
tags: [llm, prompt-tuning, transfer]
related_publications: true
---

A soft prompt is a short sequence of learned vectors that you prepend to a frozen
language model's input to steer it toward a task. Tuning one is cheap in parameters but
not in compute: every gradient step still has to backpropagate through the entire model.
For a small model that's fine. For a large one, it's exactly the cost you were hoping to
avoid.

So here's the tempting shortcut: tune the prompt on a **small, cheap model**, then hand it
to a **large one**. Or to next year's model, so the effort isn't thrown away when you
upgrade.

With a *text* prompt, that just works — words are words, and you can paste them anywhere.
A soft prompt isn't words. It's a bundle of raw embedding vectors tuned to one specific
model's internal space, and that's the portability gap
[zero-shot continuous prompt transfer]({{ '/publications/' | relative_url }})
{% cite wu2024zeroshot %} sets out to close.

## Why soft prompts don't travel

Every model carries its own private map of meaning. Two models might both "understand"
language, but the *coordinates* they use are unrelated — the direction that means "about
sports" in one model points somewhere arbitrary in another.

A soft prompt is a few points on one model's map. Copy those exact coordinates onto a
different map and you land somewhere meaningless. How meaningless? Take a prompt tuned on
BERT-base and drop it straight into RoBERTa-base — same 768-dimensional width, so the
copy is at least *possible* — and accuracy falls to about **0.1%**.

<div class="text-center">
  <a class="fig-link" href="{{ '/assets/img/blog/fig1-cpt-problem.svg' | relative_url }}" target="_blank" rel="noopener" title="Open full-size figure"><img src="{{ '/assets/img/blog/fig1-cpt-problem.svg' | relative_url }}" alt="A soft prompt tuned in Model A's embedding space lands on a meaningless location when its vectors are copied directly into Model B's differently-shaped space." style="max-width:100%; height:auto;"></a>
  <p class="post-description">The same coordinates mean different things on different maps, so a direct copy fails.</p>
</div>

## The idea: describe a prompt by what it's near

The fix is to stop describing the prompt by its *absolute* coordinates and describe it by
its *relationships* instead. Take the tokens that both models' vocabularies share —
"river," "happy," "run," and thousands more — and use them as **anchors**. Then describe
each prompt vector not as "these numbers," but as its cosine similarity to every anchor:
this much like *river*, this much like *happy*, this much like *run*…

That list of similarities is the prompt's **relative representation**. Because both models
know the same anchor words, both can express a vector this way. The relative
representation keeps the prompt's **task semantics** while discarding the model-specific
coordinate frame.

To transfer, run it in reverse on the target model. Start from a random prompt and use
gradient descent to make *its* similarities to the same anchors (measured with the
target's own word embeddings) match the source prompt's. This search only touches the
target's embedding table — no labeled data, and no backpropagation through the target
model.

One practical wrinkle: cosine similarity ignores vector length, so the search can return
vectors at the wrong scale for the target. A simple rescale to the mean and spread of the
target's word embeddings fixes that. It barely matters when source and target are the
same model, but it matters a lot when they differ.

<div class="text-center">
  <a class="fig-link" href="{{ '/assets/img/blog/fig2-cpt-relative.svg' | relative_url }}" target="_blank" rel="noopener" title="Open full-size figure"><img src="{{ '/assets/img/blog/fig2-cpt-relative.svg' | relative_url }}" alt="The source prompt is encoded as similarities to shared anchor words, giving a model-agnostic relative representation, and a matching prompt is searched for in the target model." style="max-width:100%; height:auto;"></a>
  <p class="post-description">Encode the prompt as relations to shared words, then find the prompt in the new model with the same relations.</p>
</div>

## How well does it work?

We tested on factual probing (LAMA): 41 relation types such as *place of birth*, where the
model has to fill in the missing entity. Sources were BERT and RoBERTa; targets also
included ALBERT, and we used 8,192 anchors and 5 prompt vectors.

Two reference points make the results readable. On BERT-base, a **hand-written prompt**
scores 30.6%, and a soft prompt **tuned directly on BERT-base** scores 50.6% — the ceiling
for any transfer method. A prompt tuned on RoBERTa-base and transferred with our method,
with zero tuning on BERT-base, scores **31.3%**. From RoBERTa-base, transferred prompts beat
the hand-written ones on four of the five other models. They also beat a trained neural
projector between the two embedding spaces in almost every pairing, without having to
learn any mapping.

So it isn't free: transferred prompts still trail prompts tuned on the target itself. But a
real share of the task knowledge survives the trip, and you get it without computing a
single gradient through the target model. In follow-up experiments the same recipe carried
prompts from encoders to GPT-2, and worked on classification too: on SST-2, a prompt moved
from RoBERTa-base to RoBERTa-large reaches 84.6%, versus 70.0% for the manual prompt.

## A bigger source is a worse source

The finding I found most interesting: **large source models transfer worse.** Prompts
tuned on RoBERTa-large stay under 13% on every other target, even though they work fine
on RoBERTa-large itself.

The likely reason is expressiveness. A large, deep model has many equally good soft prompts
for the same task, so the one you happen to find carries plenty of model-specific detail on
top of the task itself — detail that has no counterpart in another model. Conveniently, the
setting we actually care about is small source → large target, which is exactly where
transfer works best.

The same reasoning suggests a remedy: if each source adds its own quirks, average over
several sources. Matching the relative representations of **two source models at once**
improves transfer. BERT-base plus BERT-large beats BERT-base alone by 2–10 points on the
models outside the pair, even though BERT-large is a weak source by itself.

## Why I think this matters

Soft prompts are cheap to store but have been awkwardly disposable: retire a model and the
prompts tuned for it retire too. Treating a prompt's meaning as a set of *relationships*
makes that knowledge portable. A small model can act as a "soft prompt engineer" for a
large one, producing prompts that can beat hand-written ones without any gradients through
the large model.

The broader idea I like is the reframing — **meaning as relations, not coordinates.** A
point is only interpretable relative to a shared frame of reference, and once you choose
anchors that both models agree on, a surprising amount of "model-specific" knowledge turns
out to be translatable.

The full method, the ablations on anchors and prompt length, and the complete transfer
tables are in the [paper](https://arxiv.org/abs/2310.01691).

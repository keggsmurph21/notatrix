"use strict";

import {RE} from "utils";
import {NxBaseClass} from "./base-class";
import {Label} from "./label";

export enum CommentType {
  Normal,
  Label,
  SentenceId,
}

/**
 * Abstraction over a CoNLL-U or CG3 comment, allows us to extract and then
 *  manipulate data in some useful ways across a Corpus.
 */
export class Comment extends NxBaseClass {
  public type: CommentType = CommentType.Normal;
  public labels: string[];
  public id: string;
  constructor(public sent: any, public body: string) {
    super("Comment");

    const label = body.match(RE.commentLabel);
    const sentId = body.match(RE.commentSentId);

    if (label) {
      let dedupedLabels: string[] = [];
      label[3].split(/\s/).forEach(label => {
        if (label && dedupedLabels.indexOf(label) === -1)
          dedupedLabels.push(label)
      });

      this.type = CommentType.Label;
      this.labels = dedupedLabels;

    } else if (sentId) {
      this.type = CommentType.SentenceId;
      this.id = sentId[2];
    }
  }

  serialize(): string { return this.body; }
}

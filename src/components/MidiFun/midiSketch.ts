import React from "react";
import * as p5 from "p5";

import Tetronimo from "./Tetronimo";

const NOTE_MIN = 21;
const NOTE_MAX = 108;
const NUMBER_NOTES = NOTE_MAX - NOTE_MIN;

interface Note {
  note: number;
  velocity: number;
  accumulating: boolean;
}

class SketchContainer {
  blockWidth: number = 0;
  pendingNotes: Note[] = [];
  tetronimos: Tetronimo[] = [];

  noteOn(note: number, velocity: number) {
    this.pendingNotes.push({ note, velocity, accumulating: true });
  }

  noteOff(note: number) {
    this.tetronimos
      .filter(t => t.note === note)
      .forEach(t => (t.accumulating = false));
    this.pendingNotes
      .filter(p => p.note === note)
      .forEach(p => (p.accumulating = false));
  }

  sketch(s: p5) {
    const that = this;

    s.setup = function() {
      s.createCanvas(600, 600);
      s.frameRate(15);
      s.colorMode(s.HSB, s.width);
      that.blockWidth = Math.round(s.width / NUMBER_NOTES);
    };

    s.draw = function() {
      s.background(0);

      that.pendingNotes.forEach(({ note, velocity, accumulating }) => {
        let x = (note - NOTE_MIN) * that.blockWidth;
        let y = 0;
        let colour = s.color(x, s.width, s.width);
        that.tetronimos.unshift(
          new Tetronimo(
            note,
            velocity,
            s.createVector(x, y),
            that.blockWidth,
            colour,
            accumulating
          )
        );
      });
      that.pendingNotes = [];

      that.tetronimos.forEach(t => {
        t.update();
        t.draw(s);
      });

      // Filter out any tetronimos that have fallen off the bottom of the screen
      that.tetronimos = that.tetronimos.filter(t => t.position.y < s.height);
    };
  }
}

interface UseMidiSketch {
  sketchContainer: SketchContainer;
  noteOn: (note: number, velocity: number) => void;
  noteOff: (note: number) => void;
}

export function useMidiSketch(): UseMidiSketch {
  const sketchContainer = React.useMemo(() => new SketchContainer(), []);

  return {
    sketchContainer,
    noteOn: sketchContainer.noteOn.bind(sketchContainer),
    noteOff: sketchContainer.noteOff.bind(sketchContainer)
  };
}

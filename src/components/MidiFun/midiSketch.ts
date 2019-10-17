import React from "react";
import * as p5 from "p5";

interface Note {
  note: number;
  velocity: number;
  age: number;
}

class SketchContainer {
  noteObjects: Note[] = [];

  noteOn(note: number, velocity: number) {
    this.noteObjects.unshift({ note, velocity, age: 0 });
  }

  noteOff(note: number) {
    console.log("NOTE OFF PRE", { note, notes: this.noteObjects });
    // this.notes = this.notes.filter(n => n.note != note);
    // console.log("NOTE OFF POST", { note, notes: this.notes });
  }

  sketch(s: p5) {
    const that = this;

    s.setup = function() {
      s.createCanvas(600, 600);
    };

    s.draw = function() {
      s.background(0);

      that.noteObjects.forEach(({ note, velocity, age }) =>
        s.ellipse(note * 5, 50 + age, velocity, velocity)
      );

      that.noteObjects = that.noteObjects.filter(noteObject => {
        noteObject.age += 1;
        return noteObject.age < s.height;
      });
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

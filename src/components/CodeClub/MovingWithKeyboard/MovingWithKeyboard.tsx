import React from "react";

const MovingWithKeyboard: React.FunctionComponent = () => {
  return (
    <div className="container">
      <h1>Moving With Keyboard</h1>
      <p>
        We will be learning how to move shapes around the screen using our
        keyboard. This will give you some options when writing games. Here is a
        completed example.
      </p>
      <iframe
        height="265"
        style={{ width: "100%", height: "550px" }}
        scrolling="no"
        title="empty-example"
        src="https://codepen.io/JoeSharpBalcarras/embed/zYYPYjP?height=265&theme-id=0&default-tab=js,result"
      >
        See the Pen{" "}
        <a href="https://codepen.io/JoeSharpBalcarras/pen/zYYPYjP">
          Moving with Keyboard
        </a>{" "}
        by Joe (
        <a href="https://codepen.io/JoeSharpBalcarras">@JoeSharpBalcarras</a>)
        on <a href="https://codepen.io">CodePen</a>.
      </iframe>
    </div>
  );
};

export default MovingWithKeyboard;

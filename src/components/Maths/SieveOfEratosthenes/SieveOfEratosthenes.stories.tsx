import React from "react";
import { storiesOf } from "@storybook/react";
import SieveOfEratosthenes from "./SieveOfEratosthenes";

storiesOf("Maths/Sieve Of Eratosthenes", module).add("basic", () => (
  <SieveOfEratosthenes />
));

import AnalogueSignals from "./AnalogueSignals";
import { Page } from "src/types";

export const page: Page = {
  href: "/computerScience/analogueSignals",
  title: "Analogue to Digital",
  description:
    "Create waveforms, take samples and generate a digital signal from an analogue one",
  component: AnalogueSignals,
};

export default AnalogueSignals;

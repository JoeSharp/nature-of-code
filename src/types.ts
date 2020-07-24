interface Page {
  href: string;
  title: string;
  component: React.FunctionComponent;
}

interface ControlledInput<T> {
  value: T | undefined;
  onChange: (s: T) => void;
}

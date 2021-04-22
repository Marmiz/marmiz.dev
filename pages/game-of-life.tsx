import dynamic from "next/dynamic";

type Props = {
  name: string;
};

const RustComponent = dynamic({
  loader: async () => {
    // Import wasm module
    const wasm = await import("../pkg");
    // return a React component
    return (props: Props) => {
      wasm.greet(props.name);
      return <div>Hi</div>;
    };
  },
  ssr: false,
});

const GOL = () => {
  return (
    <div>
      Hello from wasm Game of life!
      <RustComponent name="example" />
    </div>
  );
};

export default GOL;

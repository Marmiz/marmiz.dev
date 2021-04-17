type Props = {
  title: string;
  withSide: boolean;
};

const Intro = ({ title = "Blog", withSide = true }: Props) => {
  return (
    <section className="flex-col md:flex-row flex items-center md:justify-between mt-16 mb-16 md:mb-12">
      <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        {title}.
      </h1>
      {withSide && (
        <h4 className="flex flex-col items-center text-center md:text-left text-lg mt-5 md:pl-8">
          <svg
            width="120"
            height="80"
            viewBox="0 0 345 165"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              id="Logo"
              d="M1 164V2L40 43.5L81.5 2V164L99.75 83M178 156C136.8 156 169.833 81 191.5 43.5L146 2L152.5 164L118 2L99.75 83M191.5 156V2L227.5 43.5L250.5 2M250.5 2V164M250.5 2H268.5M250.5 164L315.5 2H268.5M250.5 164H268.5M315.5 164H268.5M99.75 83H325H344.5M268.5 2V164"
              stroke="black"
            />
          </svg>
          Personal blogging space.
        </h4>
      )}
    </section>
  );
};

export default Intro;

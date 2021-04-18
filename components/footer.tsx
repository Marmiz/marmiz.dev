import Container from "./container";
import { GITHUB_URL, LINKEDIN_URL, MAIL } from "../lib/constants";

const Footer = () => {
  return (
    <footer className="bg-accent-1 border-t border-accent-2">
      <Container>
        <div className="py-16 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-5xl font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Made with ❤️.
          </h3>
          <div className="flex flex-col lg:flex-row justify-evenly items-center lg:pl-4 lg:w-1/2">
            <a
              href={GITHUB_URL}
              target="_blank"
              className="hover:shadow-2xl transition-shadow duration-200"
            >
              <img src="/assets/icons/github-fill.svg" />
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              className="hover:shadow-2xl transition-shadow duration-200"
            >
              <img src="/assets/icons/linkedin-fill.svg" />
            </a>
            <a
              href={`mailto:${MAIL}`}
              className="hover:shadow-2xl transition-shadow duration-200"
            >
              <img src="/assets/icons/mail-send-line.svg" />
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;

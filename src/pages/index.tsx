import PageHeader from "@/components/PageHeader";
import LibButton from "@/library/Button";
import LibContainer from "@/library/Container";
import Image from "next/image";

const HomePage: React.FC = () => {
  return (
    <>
      <PageHeader />

      <LibContainer className="pt-4 pb-8">
        <h1 className="text-4xl text-center font-bold !leading-tight sm:text-4xl md:text-5xl">
          Affordable, AI-Generated Websites Specifically Built for Local
          Businesses
        </h1>
      </LibContainer>

      <LibContainer className="pb-12">
        <p className="mb-8 text-2xl md:text-3xl text-center font-semibold">
          Hello my name is Jason, I'm an AI web developer.
        </p>

        <div className="sm:flex sm:items-end">
          <div>
            <p className="mb-4 text-xl">
              With just a little bit of information from you I will build you a
              complete website in{" "}
              <span className="font-semibold underline">
                30 minutes or less
              </span>
              . One specifically built for your type of business.
            </p>

            <div className="flex items-end sm:block">
              <div className="shrink">
                <p className="text-xl">
                  Well I will be once I finish my training. So you would say
                  that I'm coming soon. If this is interesting to you click the
                  button below and{" "}
                  <span className="font-semibold underline">
                    let's have a quick conversation
                  </span>
                  .
                </p>
              </div>
              <div className="shrink-0 basis-24 sm:hidden">
                <Image
                  src="/images/posing/jason-posing-hands-in-pocket.png"
                  alt="Jason Standing"
                  width={360}
                  height={550}
                />
              </div>
            </div>
          </div>

          <div className="hidden shrink-0 basis-28 sm:block">
            <Image
              src="/images/posing/jason-posing-hands-in-pocket.png"
              alt="Jason Standing"
              width={360}
              height={550}
            />
          </div>
        </div>

        <div className="flex justify-center mt-8 mb-6 sm:mt-20 sm:mb-12 lg:mt-8 lg:mb-6">
          <LibButton isLarge={true} isSecondary={true}>
            Talk to Jason
          </LibButton>
        </div>

        <p className="text-center font-italic">
          BTW I'm currently working on{" "}
          <span className="block text-lg text-primary font-semibold">
            Real Estate Investor Websites
          </span>{" "}
          but please let me know what type I should learn next ;)
        </p>
      </LibContainer>
    </>
  );
};

export default HomePage;

import { ArrowRight, Check } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Hero108Props {
  className?: string;
}

const Hero108 = ({ className }: Hero108Props) => {
  return (
    <section
      className={cn("bg-background py-12 font-sans md:py-20", className)}
    >
      <div className="container flex flex-col items-center gap-8 lg:flex-row">
        <div className="flex flex-col gap-10">
          <h1 className="text-5xl font-semibold text-foreground md:text-6xl">
            Earn{" "}
            <span className="relative inline-block">
              <span>income</span>
              <svg
                width="240"
                className="pointer-events-none absolute top-1/2 left-1/2 hidden -translate-x-1/2 -translate-y-1/2 transform fill-accent md:block"
                viewBox="0 0 191 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M99.7039 69.4796C106.054 68.9325 112.377 68.1885 118.645 67.2402C124.566 66.3358 130.477 65.3219 136.279 64.0016L138.463 63.5275L140.628 63.0023C142.072 62.6449 143.516 62.3093 144.95 61.9373C147.801 61.1568 150.688 60.4201 153.484 59.5594C159.085 57.8744 164.467 55.8977 169.273 53.3374C171.676 52.0609 173.887 50.6167 175.888 49.0192C177.871 47.4364 179.598 45.6858 180.996 43.7528C181.27 43.3589 181.526 42.9504 181.754 42.5419L182.384 41.2873L182.33 41.353C185.089 36.5169 185.738 30.9733 183.179 26.3195C180.685 21.6148 175.276 18.026 169.108 15.5241C165.508 14.0871 161.671 12.92 157.705 11.9864C153.722 11.0892 149.601 10.2649 145.498 9.59385C137.266 8.23712 128.906 7.3764 120.518 7.0044C103.724 6.26038 86.8024 7.47123 70.4198 10.564C69.1315 10.7755 67.6422 11.1183 66.1163 11.4247C64.5904 11.7457 63.0098 12.0082 61.6118 12.2854C58.7976 12.796 56.5316 12.9565 56.2757 12.1541C55.7275 10.5421 61.1366 7.82864 70.3832 6.04885C75.9568 4.94013 81.6309 4.18152 87.3049 3.53963C90.1557 3.28433 92.9974 2.96339 95.8664 2.82479C97.3009 2.74456 98.7262 2.62785 100.161 2.5695L104.455 2.41632C105.89 2.35067 107.315 2.35067 108.749 2.34337C110.184 2.34337 111.609 2.3069 113.044 2.32149C115.904 2.40173 118.764 2.39443 121.624 2.5622C127.334 2.76644 133.008 3.29892 138.664 3.86787L144.841 4.65565L150.971 5.64037L157.057 6.82204C159.085 7.24511 161.123 7.72652 163.133 8.27359C167.144 9.37502 171.119 10.688 174.856 12.4751C175.788 12.9273 176.72 13.3723 177.615 13.8902C178.529 14.3716 179.397 14.9186 180.256 15.4803C181.133 16.0201 181.909 16.6693 182.741 17.2601L183.883 18.2448C184.276 18.5658 184.641 18.9086 184.979 19.2733C187.812 22.0889 189.886 25.488 190.617 29.1205C191.403 32.7385 190.928 36.4221 189.667 39.8358C189.009 41.5353 188.177 43.1838 187.172 44.7667C186.14 46.3349 184.961 47.8303 183.645 49.2453C180.95 52.0682 177.716 54.4534 174.216 56.4885C167.921 60.1575 160.858 62.6157 153.841 64.6873C146.805 66.7151 139.66 68.473 132.405 69.9172C117.905 72.8203 103.012 74.4105 88.0817 74.8919C74.0381 75.2639 59.9945 74.695 46.0332 72.886C42.5246 72.39 39.0343 71.7918 35.5714 71.0187C32.1176 70.2236 28.6911 69.2826 25.3469 68.1156C22.0211 66.912 18.7774 65.4969 15.7257 63.7901C12.683 62.0613 9.89625 59.9825 7.49323 57.6118L6.004 56.0363C5.53802 55.4965 5.12691 54.913 4.69748 54.3513L4.05793 53.5052C3.85692 53.2207 3.69236 52.9144 3.50962 52.6153L2.45896 50.8209C1.18892 48.3627 0.430502 45.7441 0.128981 43.1109C-0.163403 40.4777 0.0557155 37.8372 0.640483 35.2842C1.24352 32.7312 2.23958 30.2657 3.50962 27.917C6.08625 23.2341 9.78674 19.0253 14.2456 15.4584C16.475 13.6713 18.8963 12.0374 21.5003 10.6005C22.7978 9.87833 24.141 9.20726 25.5299 8.58725C26.9187 7.98912 28.2982 7.43476 29.7053 6.88769C35.0413 4.90365 40.9804 3.51045 46.1793 1.96407H46.0789C49.4596 1.76713 52.9773 1.11065 56.5316 0.665699C60.0768 0.191574 63.6219 -0.100196 66.8473 0.308281C69.0767 0.235339 71.3519 0.27181 73.4991 0.155102C83.3761 -0.326318 85.9618 0.300987 82.709 2.20478C81.9963 2.62785 82.8461 3.16033 80.4705 3.47398C80.4613 3.47398 80.2878 3.44481 80.2878 3.44481L80.3607 3.47398C77.0531 4.15964 73.3803 4.39306 69.6067 4.53894C65.8423 4.69212 61.9864 4.77236 58.359 5.1006C49.4687 5.91755 40.7155 7.48581 32.7571 10.4327C31.7429 10.7755 30.7927 11.1913 29.8151 11.5998C28.8283 11.9937 27.8962 12.424 26.9825 12.869C25.1551 13.7662 23.41 14.7946 21.7562 15.9034C18.4486 18.1281 15.5156 20.7103 13.076 23.555C8.22428 29.2227 5.31866 36.0792 6.15926 42.7389C6.36941 44.3947 6.79901 46.0213 7.46601 47.5896L8.0141 48.7493C8.21511 49.1286 8.46179 49.5006 8.68108 49.8799L9.34806 51.0106C9.6039 51.3753 9.88727 51.7254 10.1614 52.0755C12.3268 54.9203 15.2871 57.3857 18.7135 59.4135C22.8982 61.9446 27.8048 63.7755 32.8667 65.2343C37.9468 66.6932 43.2829 67.6779 48.6737 68.3927C59.5559 69.8005 70.6391 70.3914 81.6492 70.3038C87.6887 70.1871 93.7008 69.7713 99.8043 69.4577L99.7039 69.4796Z" />
              </svg>
            </span>{" "}
            from real estate without owning property
          </h1>
          <ul className="flex flex-col gap-4">
            <li className="flex items-center gap-2">
              <div className="flex h-7 w-7 rounded-full bg-accent">
                <Check
                  className="m-auto size-4 stroke-foreground"
                  strokeWidth={3}
                />
              </div>
              <div className="text-foreground">
                Average 9% Return on Investment
              </div>
            </li>
            <li className="flex items-center gap-2">
              <div className="flex h-7 w-7 rounded-full bg-accent">
                <Check
                  className="m-auto size-4 stroke-foreground"
                  strokeWidth={3}
                />
              </div>
              <div className="text-foreground">Access your funds quarterly</div>
            </li>
            <li className="flex items-center gap-2">
              <div className="flex h-7 w-7 rounded-full bg-accent">
                <Check
                  className="m-auto size-4 stroke-foreground"
                  strokeWidth={3}
                />
              </div>
              <div className="text-foreground">
                Investments chosen by certified SGRs
              </div>
            </li>
          </ul>
          <Button
            asChild
            className="flex h-fit w-full items-center justify-center gap-2 rounded-3xl px-6 py-3 font-medium md:w-fit"
          >
            <a href="#">
              <div>Start Now</div>
              <ArrowRight className="size-5" />
            </a>
          </Button>
        </div>
        <div className="w-full shrink-0 lg:w-1/2">
          <div className="relative mx-auto h-[27.5rem] w-full max-w-[36.5rem] overflow-hidden rounded-3xl bg-muted bg-cover bg-center bg-no-repeat sm:h-[39.5rem]">
            <div className="relative mx-auto mt-20 w-[12.5rem] sm:w-[18.75rem]">
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/hero108/iphone.png"
                alt=""
                className="absolute top-0 z-20 block w-full"
              />
              <img
                src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-7-tall.svg"
                alt=""
                className="absolute top-0 block w-full rounded-[50px]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Hero108 };

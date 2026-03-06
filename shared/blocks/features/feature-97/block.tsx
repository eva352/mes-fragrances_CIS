import { BarChart, Heart, Monitor, Plus, TrendingUp } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";

interface Feature97Props {
  className?: string;
}

const Feature97 = ({ className }: Feature97Props) => {
  return (
    <section className={cn("py-32", className)}>
      <div className="container">
        <div className="mx-auto flex max-w-xl flex-col gap-6 text-center">
          <h2 className="text-4xl font-semibold">Platform Highlights</h2>
          <p className="text-lg">
            Built with cutting-edge insights, offering a complete perspective on
            the connection between lifestyle, behavior, and health. Our platform
            delivers an all-encompassing health overview.
          </p>
          <div className="flex flex-col justify-center gap-2 sm:flex-row">
            <Button variant="outline">View All Features</Button>
            <Button>
              <Plus className="mr-2 h-auto w-4" />
              Schedule Consultation
            </Button>
          </div>
        </div>
        <div className="mx-auto mt-20 grid max-w-5xl gap-20 md:grid-cols-2">
          <div className="text-center">
            <Heart className="mx-auto h-auto w-7" />
            <h3 className="mt-4 mb-2 text-xl font-semibold">Health Overview</h3>
            <p>
              Discover key health insights tailored to your lifestyle, delivered
              in a clear and actionable format.
            </p>
          </div>
          <div className="text-center">
            <BarChart className="mx-auto h-auto w-7" />
            <h3 className="mt-4 mb-2 text-xl font-semibold">
              Personalized Insights
            </h3>
            <p>
              Gain tailored health insights based on your unique data, helping
              you make informed decisions.
            </p>
          </div>
          <div className="text-center">
            <TrendingUp className="mx-auto h-auto w-7" />
            <h3 className="mt-4 mb-2 text-xl font-semibold">
              Comprehensive Analytics
            </h3>
            <p>
              Deep dive into your health data with comprehensive analytics
              designed to offer actionable outcomes.
            </p>
          </div>
          <div className="text-center">
            <Monitor className="mx-auto h-auto w-7" />
            <h3 className="mt-4 mb-2 text-xl font-semibold">
              Continuous Monitoring
            </h3>
            <p>
              Stay updated on your health with continuous monitoring that tracks
              progress in real-time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Feature97 };

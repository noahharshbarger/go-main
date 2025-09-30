
import SolarCalculator from "@/components/SolarCalculator";

export const metadata = {
  title: "Solar Calculator | Calculate Your Solar Savings",
  description: "Calculate your potential solar savings and system requirements with our comprehensive solar calculator.",
};

export default function SolarCalculatorPage() {
  return (
    <>
      <div className="pb-16 pt-24 md:pb-20 md:pt-28 lg:pb-24 lg:pt-32">
        <div className="container mx-auto">
          <SolarCalculator />
        </div>
      </div>
    </>
  );
}

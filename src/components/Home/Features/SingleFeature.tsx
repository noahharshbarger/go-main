import { Feature } from "@/types/feature";

export default function SingleFeature({ feature }: { feature: Feature }) {
  return (
    <div className="w-full px-4 md:w-1/2 lg:w-1/3">
      <div className="group mx-auto mb-10 max-w-[380px] text-center md:mb-16">
        <div className="bg-primary/5 text-primary group-hover:!bg-primary mx-auto mb-6 flex h-[70px] w-[70px] items-center justify-center rounded-full transition group-hover:text-white md:mb-9 md:h-[90px] md:w-[90px] dark:bg-white/5 dark:text-white">
          {feature?.icon}
        </div>
        <div>
          <h3 className="font-heading text-dark mb-3 text-xl font-medium sm:text-2xl md:mb-5 dark:text-white">
            {feature?.title}
          </h3>
          <p className="text-dark-text text-base">{feature?.description}</p>
        </div>
      </div>
    </div>
  );
}

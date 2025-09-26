"use client";

import SectionTitle from "@/components/Common/SectionTitle";
import { portfolioData } from "@/static-data/portfolio";
import { useEffect, useState } from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import SinglePortfolio from "./SinglePortfolio";

export default function Portfolio() {
  const [activeTag, setActiveTag] = useState("All");
  const [items, setItems]         = useState(portfolioData);

  const allTag = Array.from(
    new Set(portfolioData.flatMap((item) => item.tags))
  );

  const filterItems = (itemTag: any) => {
    setActiveTag(itemTag);
    if (itemTag === "All") {
      return setItems(portfolioData);
    } else {
      const findItems = portfolioData.filter((findItem) => {
        return findItem.tags.includes(itemTag);
      });
      setItems(findItems);
    }
  };

  return (
    <section
      id='portfolio'
      className='pt-14 sm:pt-20 lg:pt-[130px]'
    >
      <div className='px-4 xl:container'>
        <SectionTitle
          mainTitle='PORTFOLIO'
          title='Gallery, Previews and Portfolio'
          paragraph='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in maximus.'
        />

        <div className='w-full'>
          <div className='portfolio-btn-wrapper mb-16 flex items-center justify-center overflow-x-auto pb-2'>
            <button
              className={`${activeTag === "All" ? "active" : ""} font-heading text-dark whitespace-nowrap px-5 text-base dark:text-white`}
              onClick={() => filterItems("All")}
            >
              All
            </button>
            {allTag.map((tag) => (
              <button
                key={tag}
                className={`${activeTag === tag ? "active" : ""} font-heading text-dark whitespace-nowrap px-5 text-base capitalize dark:text-white`}
                onClick={() => filterItems(tag)}
              >
                {tag}
              </button>
            ))}
          </div>

          <Projects items={items} />


          <div className='w-full pt-10 text-center'>
            <a
              href='#'
              className='bg-primary font-heading hover:bg-primary/90 inline-flex items-center rounded-sm px-8 py-[14px] text-base text-white'
            >
              See More Projects
              <span className='pl-3'>
                <svg
                  width='16'
                  height='16'
                  viewBox='0 0 16 16'
                  fill='none'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    d='M12.172 7L6.808 1.636L8.222 0.222L16 8L8.222 15.778L6.808 14.364L12.172 9H0V7H12.172Z'
                    fill='white'
                  />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Separating this to prevent hydration errors
function Projects({ items }: { items: typeof portfolioData }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <ResponsiveMasonry
      columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
    >
      <Masonry gutter='30px'>
        {items.map((portfolio) => (
          <SinglePortfolio
            key={portfolio?.id}
            portfolio={portfolio}
          />
        ))}
      </Masonry>
    </ResponsiveMasonry>
  );
}


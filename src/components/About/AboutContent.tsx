"use client";

import { useState } from "react";
import TabPanel from "./TabPanel";

const tabButtons = [
  {
    id: crypto.randomUUID(),
    title: "About Us",
    value: "about"
  },
  {
    id: crypto.randomUUID(),
    title: "Our Mission",
    value: "mission"
  },
  {
    id: crypto.randomUUID(),
    title: "Our Vision",
    value: "vision"
  }
];

export default function AboutContent() {
  const [activeTab, setActiveTab] = useState<string>(tabButtons[0].value);

  return (
    <>
      <div className='tabButtons flex w-full items-center justify-around'>
        {tabButtons.map((tabButton) => (
          <button
            key={tabButton?.id}
            onClick={() => setActiveTab(tabButton?.value)}
            className={`w-full border-b px-2 pb-6 pt-8 font-heading text-base font-medium lg:pb-7 lg:pt-9 ${activeTab === tabButton?.value ? "border-primary text-primary dark:border-primary" : "hover:border-primary hover:text-primary dark:border-[#4B4E56] dark:text-white dark:hover:border-primary"}`}
          >
            {tabButton?.title}
          </button>
        ))}
      </div>
      <div className='w-full'>
        {activeTab === "about" && (
          <TabPanel
            title='DB, Auth, Stripe, Sanity, and More'
            image1='/images/about/image-1.jpg'
            image1Alt='about image 1'
            image2='/images/about/image-2.jpg'
            image2Alt='about image 2'
          >
            <p className='mb-6 text-base text-dark-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              condimentum sapien ac leo cursus dignissim. In ac lectus vel orci
              accumsan ultricies at in libero accumsan.
            </p>
            <p className='mb-6 text-base text-dark-text'>
              Phasellus ex massa, facilisis ac vestibulum eget, ultrices quis
              nulla. Integer vitae magna lacus. Sed venenatis auctor dolor.
            </p>
            <p className='text-base text-dark-text'>
              Phasellus ex massa, facilisis ac vestibulum eget, ultrices quis
              nulla. Integer vitae magna lacus. Sed venenatis auctor dolor.
            </p>
          </TabPanel>
        )}

        {activeTab === "mission" && (
          <TabPanel
            title='Built-with Latest Tools and Technologies'
            image1='/images/about/image-1.jpg'
            image1Alt='about image 1'
            image2='/images/about/image-2.jpg'
            image2Alt='about image 2'
            leftContent
          >
            <p className='mb-6 text-base text-dark-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              condimentum sapien ac leo cursus dignissim. In ac lectus vel orci
              accumsan ultricies at in libero accumsan.
            </p>
            <p className='mb-6 text-base text-dark-text'>
              Phasellus ex massa, facilisis ac vestibulum eget, ultrices quis
              nulla. Integer vitae magna lacus. Sed venenatis auctor dolor.
            </p>
            <p className='text-base text-dark-text'>
              Phasellus ex massa, facilisis ac vestibulum eget, ultrices quis
              nulla. Integer vitae magna lacus. Sed venenatis auctor dolor.
            </p>
          </TabPanel>
        )}

        {activeTab === "vision" && (
          <TabPanel
            title='High-quality Premium Design with Everything You Need'
            image1='/images/about/image-1.jpg'
            image1Alt='about image 1'
            image2='/images/about/image-2.jpg'
            image2Alt='about image 2'
          >
            <p className='mb-6 text-base text-dark-text'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
              condimentum sapien ac leo cursus dignissim. In ac lectus vel orci
              accumsan ultricies at in libero accumsan.
            </p>
            <p className='mb-6 text-base text-dark-text'>
              Phasellus ex massa, facilisis ac vestibulum eget, ultrices quis
              nulla. Integer vitae magna lacus. Sed venenatis auctor dolor.
            </p>
            <p className='text-base text-dark-text'>
              Phasellus ex massa, facilisis ac vestibulum eget, ultrices quis
              nulla. Integer vitae magna lacus. Sed venenatis auctor dolor.
            </p>
          </TabPanel>
        )}
      </div>
    </>
  );
}

import SectionTitle from "../Common/SectionTitle";
import Image from "next/image";


export default function Brands() {
  return (
    <section className='pt-14 sm:pt-20 lg:pt-24'>
      <div className='px-4 xl:container'>
        <SectionTitle
          title='Trusted by Global Brands'
          paragraph='Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in maximus.'
        />
        <div className='border-b pb-24 dark:border-[#2E333D]'>
          <div className='-mx-4 flex flex-wrap'>
            <div className='w-full px-4'>
              <div className='flex flex-wrap items-center justify-center'>
                <a
                  href='https://uideck.com/'
                  className='mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]'
                >
                  <Image
                    src='./images/brands/uideck.svg'
                    alt='image'
                    className='hidden h-10 w-full dark:block'
                    width={180}
                    height={40}
                  />

                  <Image
                    src='./images/brands/uideck-2.svg'
                    alt='image'
                    className='h-10 w-full dark:hidden'
                    width={180}
                    height={40}
                  />
                </a>

                <a
                  href='https://tailadmin.com/'
                  className='mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]'
                >
                  <Image
                    src='./images/brands/tailadmin.svg'
                    alt='image'
                    className='hidden h-10 w-full dark:block'
                    width={180}
                    height={40}
                  />
                  <Image
                    src='./images/brands/tailadmin-2.svg'
                    alt='image'
                    className='h-10 w-full dark:hidden'
                    width={180}
                    height={40}
                  />
                </a>

                <a
                  href='https://graygrids.com/'
                  className='mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]'
                >
                  <Image
                    src='./images/brands/graygrids.svg'
                    alt='image'
                    className='hidden h-10 w-full dark:block'
                    width={180}
                    height={40}
                  />
                  <Image
                    src='./images/brands/graygrids-2.svg'
                    alt='image'
                    className='h-10 w-full dark:hidden'
                    width={180}
                    height={40}
                  />
                </a>

                <a
                  href='https://lineicons.com/'
                  className='mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]'
                >
                  <Image
                    src='./images/brands/lineicons.svg'
                    alt='image'
                    className='hidden h-10 w-full dark:block'
                    width={180}
                    height={40}
                  />
                  <Image
                    src='./images/brands/lineicons-2.svg'
                    alt='image'
                    className='h-10 w-full dark:hidden'
                    width={180}
                    height={40}
                  />
                </a>

                <a
                  href='https://plainadmin.com/'
                  className='mx-4 flex w-[150px] items-center justify-center py-5 2xl:w-[180px]'
                >
                  <Image
                    src='./images/brands/plainadmin.svg'
                    alt='image'
                    className='hidden h-10 w-full dark:block'
                    width={180}
                    height={40}
                  />
                  <Image
                    src='./images/brands/plainadmin-2.svg'
                    alt='image'
                    className='h-10 w-full dark:hidden'
                    width={180}
                    height={40}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

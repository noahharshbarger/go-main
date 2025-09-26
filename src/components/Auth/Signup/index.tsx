"use client";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import z from "zod";
import { integrations, messages } from "../../../../integrations.config";

const signupSchema = z
  .object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .min(8)
      .refine(
        (val) =>
          /[A-Z]/.test(val) && // At least one uppercase letter
          /[a-z]/.test(val) && // At least one lowercase letter
          /\d/.test(val) && // At least one number
          /[@$!%*?&]/.test(val), // At least one special character
        {
          message:
            "Password must be at least 8 characters long and contain uppercase and lowercase letters, a number, and a special character.",
        },
      ),
    rePassword: z.string().min(8),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match",
    path: ["rePassword"], // Error message will be attached to `rePassword`
  });

export default function Signup() {
  const router = useRouter();

  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    rePassword: "",
  });

  const { name, email, password, rePassword } = data;

  const registerUser = async (e: any) => {
    e.preventDefault();

    if (!integrations?.isAuthEnabled) {
      toast.error(messages?.auth);
      return;
    }

    const result = await signupSchema.safeParseAsync(data);

    if (!result.success) {
      toast.error(result.error.issues[0]?.message);
      return;
    }

    axios
      .post("/api/register", {
        name,
        email,
        password,
      })
      .then(() => {
        toast.success("User has been registered.");
        router.push("/auth/signin");
        setData({
          name: "",
          email: "",
          password: "",
          rePassword: "",
        });
      })
      .catch(() => toast.error("Something went wrong"));
  };
  return (
    <section className="pt-[120px] lg:pt-[240px]">
      <div className="px-4 xl:container">
        <div className="border-b pb-24 dark:border-[#2E333D]">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[920px] rounded-sm border bg-white px-6 py-10 sm:p-[70px] dark:border-transparent dark:bg-[#1D232D]">
                <h1 className="font-heading mb-3 text-2xl font-medium text-black sm:text-3xl lg:text-2xl xl:text-[40px] xl:leading-tight dark:text-white">
                  Create your Account
                </h1>
                <p className="text-dark-text mb-12 text-base font-medium">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </p>

                <h3 className="font-heading text-dark mb-8 text-xl dark:text-white">
                  Sign Up with Social Media
                </h3>
                <div className="mb-12 flex items-center space-x-4">
                  <button
                    onClick={() => signIn("google")}
                    className="text-dark-text flex h-[50px] w-[50px] items-center justify-center rounded-sm border text-base sm:w-auto sm:px-7 dark:border-transparent dark:bg-[#2C3443]"
                  >
                    <span className="sm:pr-3">
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 18 18"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <g clipPath="url(#clip0_1416_409)">
                          <path
                            d="M18 9.19932C18.0109 8.58059 17.9457 7.96284 17.806 7.35938H9.18372V10.6993H14.2449C14.149 11.2849 13.9333 11.8455 13.6106 12.3473C13.288 12.8491 12.8651 13.2818 12.3674 13.6193L12.3497 13.7311L15.0761 15.8009L15.2649 15.8194C16.9995 14.2493 17.9997 11.9393 17.9997 9.19932"
                            fill="#4285F4"
                          />
                          <path
                            d="M9.18382 18.0003C11.6633 18.0003 13.745 17.2003 15.2655 15.8203L12.3675 13.6202C11.592 14.1503 10.5512 14.5203 9.18382 14.5203C8.02249 14.5137 6.89279 14.1488 5.955 13.4775C5.0172 12.8061 4.31894 11.8624 3.95927 10.7803L3.85164 10.7893L1.01679 12.9392L0.979736 13.0402C1.74323 14.5314 2.91494 15.7851 4.36385 16.661C5.81276 17.537 7.48174 18.0007 9.18417 18.0003"
                            fill="#34A853"
                          />
                          <path
                            d="M3.95921 10.7798C3.75834 10.2069 3.65469 9.60558 3.65239 8.99982C3.65609 8.39505 3.75591 7.79453 3.94828 7.21988L3.94316 7.10057L1.07355 4.91602L0.979681 4.95976C0.335608 6.21294 0.00012207 7.59658 0.00012207 8.99973C0.00012207 10.4029 0.335608 11.7865 0.979681 13.0397L3.95921 10.7798Z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M9.1838 3.47965C10.4997 3.45963 11.7725 3.93991 12.7348 4.81971L15.3267 2.33965C13.6644 0.811346 11.463 -0.0272143 9.1838 -0.000350488C7.48139 -0.000747434 5.81242 0.462942 4.36352 1.33887C2.91461 2.2148 1.74289 3.46843 0.97937 4.95959L3.94902 7.21971C4.31223 6.13773 5.01281 5.19476 5.95199 4.52376C6.89117 3.85275 8.02156 3.48755 9.1838 3.47965Z"
                            fill="#EB4335"
                          />
                        </g>
                        <defs>
                          <clipPath id="clip0_1416_409">
                            <rect width="18" height="18" fill="white" />
                          </clipPath>
                        </defs>
                      </svg>
                    </span>
                    <span className="hidden sm:inline-flex">
                      {" "}
                      Sign up with Google{" "}
                    </span>
                  </button>

                  <button
                    onClick={() => signIn("github")}
                    className="flex h-[50px] w-[50px] items-center justify-center rounded-md border dark:border-transparent dark:bg-[#2C3443]"
                  >
                    <svg
                      width="23"
                      height="22"
                      viewBox="0 0 23 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.2731 0C9.7927 0 8.32679 0.291587 6.95907 0.858113C5.59136 1.42464 4.34862 2.25501 3.30182 3.30181C1.1877 5.41593 0 8.28329 0 11.2731C0 16.2558 3.23538 20.4832 7.7108 21.9825C8.27446 22.0727 8.45483 21.7233 8.45483 21.4189C8.45483 21.1596 8.45483 20.4494 8.45483 19.5137C5.33218 20.1901 4.66706 18.0031 4.66706 18.0031C4.1485 16.6955 3.41575 16.346 3.41575 16.346C2.3899 15.6471 3.49466 15.6696 3.49466 15.6696C4.62197 15.7485 5.21945 16.8307 5.21945 16.8307C6.20021 18.5442 7.85735 18.037 8.49992 17.7664C8.60138 17.0336 8.89448 16.5376 9.21013 16.2558C6.7075 15.974 4.08086 15.0045 4.08086 10.7094C4.08086 9.45813 4.50924 8.45482 5.24199 7.65443C5.12926 7.37261 4.7347 6.2002 5.35472 4.67834C5.35472 4.67834 6.30167 4.37396 8.45483 5.82819C9.3454 5.58018 10.3149 5.45618 11.2731 5.45618C12.2313 5.45618 13.2008 5.58018 14.0914 5.82819C16.2445 4.37396 17.1915 4.67834 17.1915 4.67834C17.8115 6.2002 17.4169 7.37261 17.3042 7.65443C18.037 8.45482 18.4653 9.45813 18.4653 10.7094C18.4653 15.0158 15.8274 15.9627 13.3135 16.2445C13.7194 16.594 14.0914 17.2817 14.0914 18.3301C14.0914 19.8407 14.0914 21.0581 14.0914 21.4189C14.0914 21.7233 14.2717 22.084 14.8467 21.9825C19.3221 20.4719 22.5462 16.2558 22.5462 11.2731C22.5462 9.79269 22.2546 8.32678 21.6881 6.95907C21.1216 5.59135 20.2912 4.34862 19.2444 3.30181C18.1976 2.25501 16.9549 1.42464 15.5871 0.858113C14.2194 0.291587 12.7535 0 11.2731 0Z"
                        fill="#79808A"
                      />
                    </svg>
                  </button>
                </div>

                <div className="relative z-10 mb-8 flex items-center justify-center">
                  <span className="absolute left-0 top-1/2 -z-10 hidden h-[1px] w-full -translate-y-1/2 bg-slate-300 sm:block dark:bg-[#2E333D]"></span>
                  <p className="text-dark-text bg-white text-base font-medium sm:px-4 dark:bg-[#1D232D]">
                    Or create account with email
                  </p>
                </div>

                <form onSubmit={registerUser}>
                  <div className="-mx-4 flex flex-wrap">
                    <div className="w-full px-4 sm:w-1/2">
                      <div className="mb-10">
                        <label
                          htmlFor="name"
                          className="font-heading text-dark mb-3 block text-base dark:text-white"
                        >
                          Full Name
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={data.name}
                          onChange={(e) =>
                            setData({
                              ...data,
                              [e.target.name]: e.target.value,
                            })
                          }
                          placeholder="Jhon Andrio"
                          className="text-dark placeholder-dark-text outline-hidden focus:border-primary w-full border-b bg-transparent py-5 text-base font-medium dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 sm:w-1/2">
                      <div className="mb-10">
                        <label
                          htmlFor="email"
                          className="font-heading text-dark mb-3 block text-base dark:text-white"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={data.email}
                          onChange={(e) =>
                            setData({
                              ...data,
                              [e.target.name]: e.target.value,
                            })
                          }
                          placeholder="jhonandrio@domain.com"
                          className="text-dark placeholder-dark-text outline-hidden focus:border-primary w-full border-b bg-transparent py-5 text-base font-medium dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 sm:w-1/2">
                      <div className="mb-10">
                        <label
                          htmlFor="password"
                          className="font-heading text-dark mb-3 block text-base dark:text-white"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          name="password"
                          value={data.password}
                          onChange={(e) =>
                            setData({
                              ...data,
                              [e.target.name]: e.target.value,
                            })
                          }
                          placeholder="**********"
                          className="text-dark placeholder-dark-text outline-hidden focus:border-primary w-full border-b bg-transparent py-5 text-base font-medium dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                        />
                      </div>
                    </div>
                    <div className="w-full px-4 sm:w-1/2">
                      <div className="mb-10">
                        <label
                          htmlFor="rePassword"
                          className="font-heading text-dark mb-3 block text-base dark:text-white"
                        >
                          Retype Password
                        </label>
                        <input
                          type="password"
                          name="rePassword"
                          value={data.rePassword}
                          onChange={(e) =>
                            setData({
                              ...data,
                              [e.target.name]: e.target.value,
                            })
                          }
                          placeholder="**********"
                          className="text-dark placeholder-dark-text outline-hidden focus:border-primary w-full border-b bg-transparent py-5 text-base font-medium dark:border-[#2C3443] dark:text-white dark:focus:border-white"
                        />
                      </div>
                    </div>

                    <div className="mb-8 w-full px-4">
                      <label
                        htmlFor="checkbox"
                        className="text-dark-text hover:text-primary flex gap-4"
                      >
                        <input
                          type="checkbox"
                          id="checkbox"
                          className="peer sr-only"
                        />

                        <span className="group flex h-[1lh] shrink-0 items-center">
                          <span className="flex size-5 items-center justify-center rounded-sm border dark:border-[#414652]">
                            <svg
                              width="11"
                              height="8"
                              viewBox="0 0 11 8"
                              fill="currentColor"
                              className="group-peer-checked:opacity-100 text-primary opacity-0"
                            >
                              <path
                                d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972ZM4.2327 6.30081L4.2317 6.2998C4.23206 6.30015 4.23237 6.30049 4.23269 6.30082L4.2327 6.30081Z"
                                strokeWidth="0.4"
                              ></path>
                            </svg>
                          </span>
                        </span>

                        <span className="max-w-md">
                          By creating account means you agree to the Terms and
                          Conditions and our Privacy Policy
                        </span>
                      </label>
                    </div>
                    <div className="w-full px-4">
                      <button className="bg-primary flex items-center justify-center rounded-sm px-14 py-[14px] text-sm font-semibold text-white">
                        Create Account
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

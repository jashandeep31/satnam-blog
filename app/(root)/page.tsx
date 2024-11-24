import { db } from "@/lib/db";
import { Post, State } from "@prisma/client";
import { Dot, Filter, MapPin, Search } from "lucide-react";
import React from "react";
import Link from "next/link";
import AsideBar from "@/components/aside-bar";
import HomePagination from "@/components/home-pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "ALL",
  "JOB",
  "ADMIT_CARD",
  "RESULT",
  "IMPORTANT",
  "ANSWER_KEY",
  "GOVT_SCHEMES",
] as const;

const getNotifications = async () => {
  return await db.notification.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: 10,
  });
};
const postsFunction = async (
  page: number,
  state: string,
  category: (typeof CATEGORIES)[number]
) => {
  const where: any = {};

  if (state !== "all") {
    where["state"] = {
      name: state,
    };
  }
  if (category !== "ALL") {
    where["category"] = category;
  }
  return db.$transaction(async (db) => {
    const [posts, total] = await Promise.all([
      db.post.findMany({
        orderBy: {
          updatedAt: "desc",
        },
        include: {
          state: true,
        },
        where,
        take: page * 10,
        skip: (page - 1) * 10,
      }),
      db.post.count(),
    ]);
    return {
      total: total,
      posts: posts,
    };
  });
};
const getStates = async () => {
  const states = await db.state.findMany();
  return states;
};
interface IPost extends Post {
  state: State;
}

const page = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    state: "string";
    category: (typeof CATEGORIES)[number];
  };
}) => {
  const page = searchParams.page ? searchParams.page : 1;
  const currentState = searchParams.state || "all";
  const currentCategory = searchParams.category || "ALL";
  const dbResponse = await postsFunction(page, currentState, currentCategory);
  const posts: IPost[] = dbResponse.posts;
  const states = await getStates();
  const notifications = await getNotifications();
  const Card = ({ post }: { post: IPost }) => (
    <Link
      href={`/${post.id}`}
      className="border rounded p-3 flex gap-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:scale-[101%] duration-300 "
    >
      <div>
        <div
          className="w-8 h-8 bg-slate-300 rounded-full flex
        items-center justify-center"
        >
          <span className="text-lg font-bold capitalize">
            {post.title.trim()[0]}
          </span>
        </div>
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-bold">{post.title}</h3>{" "}
        <div className="flex justify-between items-center flex-wrap ">
          <p className="text-xs text-muted-foreground italic">
            By {post.company}
          </p>
          <span className=" border rounded-full py-1 px-2 text-muted-foreground text-xs">
            {post.category}
          </span>
        </div>
        <ul className="flex md:gap-2 flex-wrap text-sm text-muted-foreground mt-6">
          <li className="flex items-center capitalize">
            <Dot className="inline " size={20} />{" "}
            {post.state.name === "all" ? "All India" : post.state.name}
          </li>
          {post.tags.split(",").map((tag) => (
            <li className="flex items-center" key={tag}>
              <Dot className="inline" size={20} /> {tag}
            </li>
          ))}
        </ul>
        <p className=" text-xs text-muted-foreground mt-7 pl-3">
          {post.updatedAt.toLocaleDateString()}{" "}
        </p>
      </div>
    </Link>
  );

  return (
    <div className="container md:mt-12 mt-6">
      <div className="grid md:grid-cols-6 gap-6">
        <div className="md:col-span-4">
          <div className="grid">
            <div className="">
              <div className="inline-flex items-center border-2 border-foreground rounded-full  px-3 text-lg gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
                <span className="font-bold">Live</span>
              </div>
            </div>
            <div className="flex pb-2 md:pb-0 overflow-auto gap-2 md:flex-wrap  mt-3 items-center">
              <span className="text-muted-foreground px-2">
                <Filter size={16} />
              </span>

              {CATEGORIES.map((category, index) => (
                <Link
                  href={`/?state=${currentState}&page=${1}&category=${category}`}
                  className={`font-bold border-2 text-ellipsis whitespace-nowrap rounded-full px-4 py-1 ${
                    currentCategory === category
                      ? " border-primary text-primary  "
                      : " text-muted-foreground hover:border-primary "
                  } capitalize`}
                  key={index}
                >
                  {category.toLocaleLowerCase().split("_").join(" ")}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid">
            <div className="flex pb-2 md:pb-0 overflow-auto gap-2 md:flex-wrap  items-center my-2">
              <span className="text-muted-foreground px-2">
                <MapPin size={16} />
              </span>
              {states.map((state, index) => (
                <Link
                  href={`/?state=${
                    state.name
                  }&page=${1}&category=${currentCategory}`}
                  className={`font-bold border-2 rounded-full px-4 py-1 whitespace-nowrap ${
                    state.name === currentState
                      ? " border-primary text-primary  "
                      : " text-muted-foreground hover:border-primary "
                  } capitalize`}
                  key={index}
                >
                  {state.name}
                </Link>
              ))}
            </div>
          </div>
          {/* <div className="mt-6 grid gap-3">
            {posts.map((post: IPost) => (
              <Card key={post.id} post={post} />
            ))}
          </div> */}
          <div className="grid grid-cols-3 gap-4  mt-6">
            {CATEGORIES.map((category, index) => (
              <div key={index} className=" border  border-black w-full ">
                <div className="bg-primary">
                  <h2 className="text-2xl text-white py-3 font-bold text-center ">
                    {category}
                  </h2>
                </div>
                <div className="p-2">
                  {posts
                    .filter((post) => post.category === category)
                    .map((post) => (
                      <Link
                        href={"/"}
                        className="text-blue-500 underline hover:text-blue-700  flex items-center"
                        key={post.id}
                      >
                        <Dot className="inline" size={18} />
                        {post.title}
                      </Link>
                    ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <HomePagination total={dbResponse.total} currentPage={page} />
          </div>
        </div>
        <AsideBar notifications={notifications} />
      </div>
      <div>
        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          Sarkari Job, rojgarseeker.com : sarkari result, Online Result | Result
          2024
        </h1>
        <p className="mt-6">
          Sarkari Job सरकारी रिजल्ट Provides You All The Latest Sarkari Result,
          Sarkari Exam, Sarkari Naukri And RRB NTPC Admit Card,punjab Police
          SI,Group D Exam, Sarkari Job And punjab Board Result 2024, Scholarship
          Status, Latest Sarkari Exam, Sarkari Result Or Sarkari Results Info.
          <br />
          <br />
          We all are aware of the benefits and authority of government jobs that
          are not possible to get through any of the private jobs that the State
          and Central government are offering
        </p>
        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          Sarkari Result, Sarkari Exam, Sarkari Naukri : Top Sarkari Job
        </h1>
        <p className="mt-6">
          sarkari job, Sarkari Naukri is way to search all Latest Jobs,Top
          Online Form,Other Online Form,Result And Answer Key, Syllabus,Admit
          Card,Admission Form, Scholarship Form And punjab scholarship Status at
          rojgarseeker.com.These sarkari result Contain Various Exam Like RRB
          NTPC Exam Date And Railway Group D Exam 2023-24 and punjab Police SI,
          PB TGT PGT, PUNJAB Police, SSC CGL, SSC MTS, Airforce, IBPS PO, IBPS
          Clerk, Army Rally, UPSC, NIELIT, CCC More Exams, UPSSC Lower PCS,PB
          Scholarship, PB Scholarship Status Sarkari Naukri etc.
        </p>
        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          Sarkari Naukri 2024: Latest Government Job Notifications
        </h1>
        <p className="mt-6">
          We provide comprehensive information and results related to the latest
          government jobs, top online forms, admit cards, and Sarkari exam
          results. Stay updated on various exams like PB TET 2024, UPSC IES, PB
          Police New Vacancy 2024, New Railway Vacancy 2024, SSC JE, Bank,
          Railway, Army Bharti, and Gram Panchayat jobs.
        </p>
        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          Sarkari Naukri Job Official Website
        </h1>
        <p className="mt-6">
          Sarkari Result on rojgarseeker.com includes all RRB Group D Exam
          Dates, RRB NTPC Admit Cards, and Punjab Police Vacancies. Find
          information on Punjab Police SI, TGT PGT Online Forms, UPSI 7000+ Post
          Vacancy 2024, PB Lekhpal, ITBP Constable, GDS, Teacher Vacancies,
          Army, BSF, Bank, Railway, SSC, and UPSSSC at one place. Sarkari
          Naukari provides all government job vacancies at rojgarseeker.com.
        </p>
        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          Sarkari Job PB: Latest Government Job Updates
        </h1>
        <p className="mt-6">
          Sarkari Naukri also provides PB Board Results for 10th/12th, Railway
          Group D Admit Cards, Railway Group D Results, SSC CGL Online Forms,
          UPSI Online Forms, Bihar SI Online Forms, and UPSSSC Lower
          Subordinate. Additionally, find details on UPPSC PCS and the latest
          Railway Vacancies for 2024.
        </p>
        <p className="mt-6">
          With the help of Sarkari Result, you can easily find all the latest
          government jobs, Sarkari Naukri, latest results, admit cards, and
          government job notifications at rojgarseeker.com. We also provide
          information on all admission forms, including counseling updates, AKTU
          results, DELEd results, and BHU UET/PET exams, which are updated
          daily.
        </p>
        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          PB Scholarship Status: Stay Updated with Government Notifications
        </h1>
        <p className="mt-6">
          As soon as any notification is issued by the Government of India,
          Government of UP, Government of MP, Government of Punjab, or any other
          government, it is updated live on Sarkari Result. With the help of
          rojgarseeker.com, you can find notifications as soon as they are
          released.
        </p>
        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          Sarkari Exam, Sarkari Result: Your Go-To Portal for Government Jobs
        </h1>
        <p className="mt-6">
          सरकारी रिजल्ट (Sarkari Result) provides information on all public
          sector jobs, including banking, NTPC, IOCL, and ONGC. If you&apos;re
          searching for any government job or Sarkari Naukri, it is first
          updated on this platform. Find all the latest government jobs at this
          portal with Sarkari Result on rojgarseeker.com. Make sure to check it
          daily so you don&apos;t miss any Sarkari job notifications.
        </p>

        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          Sarkari Naukri 2024: Your Guide to Government Jobs
        </h1>
        <p className="mt-6">
          Job Find will help you gain knowledge of state and central government
          jobs across the country. You can search for these jobs based on your
          qualifications and preferred job location. It includes opportunities
          for 8th pass, 10th pass, 12th pass, and graduates such as BA, BSc,
          B.Tech, B.E, B.Com, and more.
        </p>

        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          Sarkari Result 2024: Comprehensive Government Job Listings
        </h1>
        <p className="mt-6">
          Find all government jobs, including Railway NTPC, Group D, Army, Bank,
          SSC, Navy, UPSC, UPSSSC, and more, all in one place. Additionally,
          access offline forms for various job applications.
        </p>
        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          Sarkari Naukri: सरकारी रिजल्ट हिंदी
        </h1>
        <p className="mt-6">
          सरकारी रिजल्ट हिंदी provides official notifications for all government
          jobs in India, including Railway, Bank, SSC, Army Rally, Navy, UPSSSC,
          and Punjab Police SI. Stay updated with the latest Sarkari exams and
          job opportunities at rojgarseeker.com.
        </p>
        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          Sarkari Result PB Latest Jobs, Sarkari Naukri 2024
        </h1>
        <p className="mt-6">
          Like Punjab and various other states, the youth of Punjab, Haryana,
          Himachal, and Chandigarh prioritize the rojgarseeker website as their
          primary resource. Rojgarseeker consistently offers timely updates
          regarding government job vacancies and admissions in Punjab. These
          updates encompass a wide array of sectors, including BPSC, Punjab
          Police, Patna High Court, Punjab Vidhan Sabha, Punjab Sachivalaya,
          Punjab Scholarship, Patna University, BPSSSC, Punjab SSC, BSSC, Punjab
          Swastha Vibhag, NHM Punjab, BSPHCL, and numerous other significant
          recruitment and admission opportunities.
        </p>
        <h2 className="text-lg font-semibold mt-8">
          How SarkariJobFind Can Assist Me?
        </h2>
        <p className="mt-6">
          Indian government job applications now accept online submissions,
          enabling document scanning and electronic submission. However, despite
          this convenience, the process remains stressful and burdensome.
        </p>
        <p className="mt-6">
          Applying for government jobs can be daunting, given the many deadlines
          and exam requirements. Rojgarseeker, through Sarkari Result,
          simplifies this process by consolidating all government job listings
          onto its platform very quickly. It presents key information in
          easy-to-read, one-page summaries, saving applicants the hassle of
          navigating multiple websites. Whether it&apos;s SSC, Railways, or
          other government jobs, you can find all updates in a very quick way
          with the rojgarseeker web page.
        </p>
        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          Why Should You Trust rojgarseeker.com for Sarkari Jobs?
        </h1>
        <p className="mt-6">
          Rojgarseeker is more than just a website; it stands as India’s premier
          job portal, trusted by millions of students. It serves as the primary
          source for all government-related information, ensuring easy access
          for students. The website’s main objective is to provide timely
          updates on government jobs in straightforward language.
        </p>
        <p className="mt-6">
          Since 2021, rojgarseeker has been the top choice for students seeking
          employment opportunities. Every day, thousands of students rely on the
          website for the latest job updates, as it operates around the clock,
          seven days a week.
        </p>
        <p className="mt-6">
          Whenever a new exam result is published, an exam admit card is issued,
          or a new government job opportunity emerges—whether through SSC, UPSC,
          state government, or any other central government recruitment
          channel—young individuals promptly rely on the rojgarseeker website to
          stay informed and up-to-date.
        </p>
        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          Top Sarkari job Notification 2024
        </h1>

        <table className="w-full mt-6 border">
          <tbody>
            <tr>
              <td className="border border-gray-200 p-2">Sarkari Job</td>
              <td className="border border-gray-200 p-2">Sarkariexam</td>
              <td className="border border-gray-200 p-2">Punjab Scholarship</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-2">Sarkari Naukri</td>
              <td className="border border-gray-200 p-2">Sarkari Result</td>
              <td className="border border-gray-200 p-2">All Sarkari Result</td>
            </tr>
            <tr>
              <td className="border border-gray-200 p-2">Sarkari Job Result</td>
              <td className="border border-gray-200 p-2">Sarkari Result SSC</td>
              <td className="border border-gray-200 p-2">Sarkari Exam</td>
            </tr>
          </tbody>
        </table>
        <h1 className="md:text-3xl text-xl text-primary font-bold mt-12">
          Follow rojgarseeker On Social Media For Latest Update Sarkari Job
          Facebook | Sarkari Job Instagram | Sarkari Job Whatsapp group |
          Sarkari Job Telegram
        </h1>
      </div>
    </div>
  );
};

export default page;

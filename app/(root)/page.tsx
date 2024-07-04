import { Dot, Search } from "lucide-react";
import React from "react";

const page = () => {
  const Card = () => (
    <div className="border rounded p-3 flex gap-2 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 hover:scale-[101%] duration-300 ">
      <div>
        <div className="w-8 h-8 bg-slate-300 rounded-full "></div>
      </div>
      <div>
        <p className="text-sm text-muted-foreground italic">PSPCL</p>
        <h3 className="text-lg font-bold">PSPCL looking for line mans</h3>

        <ul className="flex gap-2 flex-wrap text-sm text-muted-foreground mt-3">
          <li className="flex items-center">
            <Dot className="inline" size={20} /> Govt Job
          </li>
          <li className="flex items-center">
            <Dot className="inline" size={20} /> start pay 46k
          </li>
          <li className="flex items-center">
            <Dot className="inline" size={20} /> End date december this month
          </li>
        </ul>

        <p className=" text-xs text-muted-foreground mt-7 pl-3">Updated At:</p>
      </div>
    </div>
  );

  return (
    <div className="container md:mt-12 mt-6">
      <div className="grid md:grid-cols-6 gap-6">
        <div className="md:col-span-4">
          <div className="flex gap-2">
            <button className="text-sm border rounded-full px-4 py-1 border-primary text-primary bg-primary/10">
              All
            </button>
            <button className="text-sm border rounded-full px-4 py-1 text-muted-foreground hover:border-primary duration-300 hover:text-primary">
              Admin Cards
            </button>
          </div>

          <div className="mt-6 grid gap-3">
            <Card />
            <Card />
            <Card />
            <Card />
          </div>
        </div>
        <aside className="md:col-span-2">
          <div className="flex flex-wrap  gap-1 mb-3 justify-end ">
            <input
              type="text"
              className=" border block  border-primary/30  py-1 px-2"
            />
            <button className="bg-primary text-white  px-2">
              <Search size={20} />
            </button>
          </div>
          <div className="border ">
            <h2 className="bg-primary py-3 text-white text-lg  text-center font-bold">
              Notifications
            </h2>
            <div>
              <ul className="max-h-48 overflow-auto">
                <li className="border-b text-sm text-blue-500 py-2 px-1 underline">
                  Upate: Application date got extended till teh end of this
                  month
                </li>

                <li className="border-b text-sm text-blue-500 py-2 px-1 underline">
                  Upate: Application date got extended till teh end of this
                  month
                </li>
                <li className="border-b text-sm text-blue-500 py-2 px-1 underline">
                  Upate: Application date got extended till teh end of this
                  month
                </li>
                <li className="border-b text-sm text-blue-500 py-2 px-1 underline">
                  Upate: Application date got extended till teh end of this
                  month
                </li>
                <li className="border-b text-sm text-blue-500 py-2 px-1 underline">
                  Upate: Application date got extended till teh end of this
                  month
                </li>
                <li className="border-b text-sm text-blue-500 py-2 px-1 underline">
                  Upate: Application date got extended till teh end of this
                  month
                </li>
              </ul>
            </div>
          </div>
          <div className="border mt-12">
            <h2 className="bg-primary py-3 text-white text-lg  text-center font-bold">
              Admin cards
            </h2>
            <div>
              <ul className="max-h-48 overflow-auto">
                <li className="border-b text-sm text-blue-500 py-2 px-1 underline">
                  Upate: Application date got extended till teh end of this
                  month
                </li>

                <li className="border-b text-sm text-blue-500 py-2 px-1 underline">
                  Upate: Application date got extended till teh end of this
                  month
                </li>
                <li className="border-b text-sm text-blue-500 py-2 px-1 underline">
                  Upate: Application date got extended till teh end of this
                  month
                </li>
                <li className="border-b text-sm text-blue-500 py-2 px-1 underline">
                  Upate: Application date got extended till teh end of this
                  month
                </li>
                <li className="border-b text-sm text-blue-500 py-2 px-1 underline">
                  Upate: Application date got extended till teh end of this
                  month
                </li>
                <li className="border-b text-sm text-blue-500 py-2 px-1 underline">
                  Upate: Application date got extended till teh end of this
                  month
                </li>
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default page;

import { teamData } from "@/static-data/team";
import SectionTitle from "../Common/SectionTitle";
import SingleTeam from "./SingleTeam";

export default function Team() {
  return (
    <section id="team" className="pt-14 sm:pt-20 lg:pt-[130px]">
      <div className="px-4 xl:container">
        <SectionTitle
          mainTitle="OUR TEAM"
          title="Meet With Our Creative Dedicated Team"
          paragraph="Lorem ipsum dolor sit amet, consectetur adipiscing elit. In convallis tortor eros. Donec vitae tortor lacus. Phasellus aliquam ante in maximus."
        />

        <div className="-mx-4 flex flex-wrap justify-center">
          {teamData.map((team) => (
            <SingleTeam key={team?.id} team={team} />
          ))}
        </div>
      </div>
    </section>
  );
}

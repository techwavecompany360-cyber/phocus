import Hero from "@/components/home/Hero";
import AboutPreview from "@/components/home/AboutPreview";
import FeaturedServices from "@/components/home/FeaturedServices";
import SolutionsSection from "@/components/home/SolutionsSection";
import ProcessTimeline from "@/components/home/ProcessTimeline";
import ProjectShowcase from "@/components/home/ProjectShowcase";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import ContactCTA from "@/components/home/ContactCTA";
import {
  getCompanySettings,
  getServices,
  getSolutions,
  getProjects,
} from "@/lib/publicData";

export default async function HomePage() {
  const [company, services, solutions, projects] = await Promise.all([
    getCompanySettings(),
    getServices(),
    getSolutions(),
    getProjects(),
  ]);

  return (
    <>
      <Hero
        heroLabel={company.heroLabel}
        tagline={company.tagline}
        missionStatement={company.missionStatement}
      />
      <AboutPreview
        missionStatement={company.missionStatement}
        principles={company.principles}
      />
      <FeaturedServices services={services} />
      <SolutionsSection solutions={solutions} />
      <ProcessTimeline approachSteps={company.approachSteps} />
      <ProjectShowcase projects={projects} />
      <WhyChooseUs whyChooseUs={company.whyChooseUs} />
      <ContactCTA />
    </>
  );
}

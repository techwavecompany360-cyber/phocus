import { connectToDatabase } from "@/lib/mongodb";
import { CompanySettings, Service, Solution, Project } from "@/lib/models";
import { companyData } from "@/data/company";
import { servicesData, ServiceItem } from "@/data/services";
import { solutionsData, SolutionItem } from "@/data/solutions";
import { projectsData, ProjectItem } from "@/data/projects";

export async function getCompanySettings() {
  "use cache";
  try {
    await connectToDatabase();
    const doc = await CompanySettings.findOne().lean();
    if (doc) {
      return {
        legalName: (doc.legalName as string) || companyData.legalName,
        shortName: (doc.shortName as string) || companyData.shortName,
        tagline: (doc.tagline as string) || companyData.tagline,
        heroLabel: (doc.heroLabel as string) || companyData.heroLabel,
        trustStatement: (doc.trustStatement as string) || companyData.trustStatement,
        missionStatement: (doc.missionStatement as string) || companyData.missionStatement,
        registration: (doc.registration as string) || companyData.registration,
        principles: (doc.principles && (doc.principles as any[]).length > 0)
          ? (doc.principles as any[]).map(p => ({
              title: p.title,
              description: p.description,
              iconName: p.iconName,
            }))
          : companyData.principles,
        approachSteps: (doc.approachSteps && (doc.approachSteps as any[]).length > 0)
          ? (doc.approachSteps as any[]).map(a => ({
              step: a.step,
              title: a.title,
              tagline: a.tagline,
              description: a.description,
              iconName: a.iconName,
            }))
          : companyData.approachSteps,
        whyChooseUs: (doc.whyChooseUs && (doc.whyChooseUs as any[]).length > 0)
          ? (doc.whyChooseUs as any[]).map(w => ({
              title: w.title,
              description: w.description,
              iconName: w.iconName,
            }))
          : companyData.whyChooseUs,
        contactConfig: doc.contactConfig
          ? {
              officialEmail: (doc.contactConfig as any).officialEmail || companyData.contactConfig.officialEmail,
              phone: (doc.contactConfig as any).phone || companyData.contactConfig.phone,
              emailLink: (doc.contactConfig as any).emailLink || companyData.contactConfig.emailLink,
              phoneLink: (doc.contactConfig as any).phoneLink || companyData.contactConfig.phoneLink,
              officeLocation: (doc.contactConfig as any).officeLocation || companyData.contactConfig.officeLocation,
              socialLinks: {
                linkedin: (doc.contactConfig as any)?.socialLinks?.linkedin || companyData.contactConfig.socialLinks.linkedin,
                github: (doc.contactConfig as any)?.socialLinks?.github || companyData.contactConfig.socialLinks.github,
                twitter: (doc.contactConfig as any)?.socialLinks?.twitter || companyData.contactConfig.socialLinks.twitter,
                facebook: (doc.contactConfig as any)?.socialLinks?.facebook || companyData.contactConfig.socialLinks.facebook,
              },
            }
          : companyData.contactConfig,
        navLinks: (doc.navLinks && (doc.navLinks as any[]).length > 0)
          ? (doc.navLinks as any[]).map(n => ({
              name: n.name,
              href: n.href,
            }))
          : companyData.navLinks,
      };
    }
  } catch (err) {
    console.error("getCompanySettings error, falling back to static data:", err);
  }
  return companyData;
}

export async function getServices(): Promise<ServiceItem[]> {
  "use cache";
  try {
    await connectToDatabase();
    const docs = await Service.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs && docs.length > 0) {
      return docs.map((d: any) => ({
        id: d.id,
        slug: d.slug,
        title: d.title,
        category: d.category,
        shortDescription: d.shortDescription,
        fullDescription: d.fullDescription,
        iconName: d.iconName,
        capabilities: d.capabilities || [],
        features: d.features || [],
        deliverables: d.deliverables || [],
      }));
    }
  } catch (err) {
    console.error("getServices error, falling back to static data:", err);
  }
  return servicesData;
}

export async function getSolutions(): Promise<SolutionItem[]> {
  "use cache";
  try {
    await connectToDatabase();
    const docs = await Solution.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs && docs.length > 0) {
      return docs.map((d: any) => ({
        id: d.id,
        title: d.title,
        tagline: d.tagline,
        description: d.description,
        iconName: d.iconName,
        challengesAddressed: d.challengesAddressed || [],
        capabilitiesIncluded: d.capabilitiesIncluded || [],
        typicalOutcomes: d.typicalOutcomes || [],
      }));
    }
  } catch (err) {
    console.error("getSolutions error, falling back to static data:", err);
  }
  return solutionsData;
}

export async function getProjects(): Promise<ProjectItem[]> {
  "use cache";
  try {
    await connectToDatabase();
    const docs = await Project.find().sort({ order: 1, createdAt: 1 }).lean();
    if (docs && docs.length > 0) {
      return docs.map((d: any) => ({
        id: d.id,
        title: d.title,
        category: d.category,
        badge: d.badge,
        isConceptual: d.isConceptual ?? true,
        shortDescription: d.shortDescription,
        technologies: d.technologies || [],
        scope: d.scope,
        architectureHighlight: d.architectureHighlight,
        gradient: d.gradient,
      }));
    }
  } catch (err) {
    console.error("getProjects error, falling back to static data:", err);
  }
  return projectsData;
}

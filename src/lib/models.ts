import mongoose, { Schema, Document, Model } from "mongoose";

// ─── Admin User ───────────────────────────────────────────────────────────────
export interface IAdminUser extends Document {
  email: string;
  passwordHash: string;
  name: string;
  role: "superadmin" | "editor";
  createdAt: Date;
  updatedAt: Date;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    role: { type: String, enum: ["superadmin", "editor"], default: "editor" },
  },
  { timestamps: true }
);

export const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser ?? mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);

// ─── Company (General) Settings ──────────────────────────────────────────────
export interface IPrinciple {
  title: string;
  description: string;
  iconName: string;
}

export interface IApproachStep {
  step: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
}

export interface IWhyChooseUsItem {
  title: string;
  description: string;
  iconName: string;
}

export interface ISocialLinks {
  linkedin: string;
  github: string;
  twitter: string;
  facebook: string;
}

export interface IContactConfig {
  officialEmail: string;
  phone: string;
  emailLink: string;
  phoneLink: string;
  officeLocation: string;
  socialLinks: ISocialLinks;
}

export interface INavLink {
  name: string;
  href: string;
}

export interface ICompanySettings extends Document {
  legalName: string;
  shortName: string;
  tagline: string;
  heroLabel: string;
  trustStatement: string;
  missionStatement: string;
  registration: string;
  principles: IPrinciple[];
  approachSteps: IApproachStep[];
  whyChooseUs: IWhyChooseUsItem[];
  contactConfig: IContactConfig;
  navLinks: INavLink[];
  updatedAt: Date;
}

const CompanySettingsSchema = new Schema<ICompanySettings>(
  {
    legalName: String,
    shortName: String,
    tagline: String,
    heroLabel: String,
    trustStatement: String,
    missionStatement: String,
    registration: String,
    principles: [{ title: String, description: String, iconName: String }],
    approachSteps: [{ step: String, title: String, tagline: String, description: String, iconName: String }],
    whyChooseUs: [{ title: String, description: String, iconName: String }],
    contactConfig: {
      officialEmail: String,
      phone: String,
      emailLink: String,
      phoneLink: String,
      officeLocation: String,
      socialLinks: {
        linkedin: String,
        github: String,
        twitter: String,
        facebook: String,
      },
    },
    navLinks: [{ name: String, href: String }],
  },
  { timestamps: true }
);

export const CompanySettings: Model<ICompanySettings> =
  mongoose.models.CompanySettings ??
  mongoose.model<ICompanySettings>("CompanySettings", CompanySettingsSchema);

// ─── Service ─────────────────────────────────────────────────────────────────
export interface IService extends Document {
  id: string;
  slug: string;
  title: string;
  category: string;
  shortDescription: string;
  fullDescription: string;
  iconName: string;
  capabilities: string[];
  features: string[];
  deliverables: string[];
  order: number;
}

const ServiceSchema = new Schema<IService>(
  {
    id: { type: String, required: true, unique: true },
    slug: { type: String, required: true, unique: true },
    title: String,
    category: String,
    shortDescription: String,
    fullDescription: String,
    iconName: String,
    capabilities: [String],
    features: [String],
    deliverables: [String],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Service: Model<IService> =
  mongoose.models.Service ?? mongoose.model<IService>("Service", ServiceSchema);

// ─── Solution ─────────────────────────────────────────────────────────────────
export interface ISolution extends Document {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  challengesAddressed: string[];
  capabilitiesIncluded: string[];
  typicalOutcomes: string[];
  order: number;
}

const SolutionSchema = new Schema<ISolution>(
  {
    id: { type: String, required: true, unique: true },
    title: String,
    tagline: String,
    description: String,
    iconName: String,
    challengesAddressed: [String],
    capabilitiesIncluded: [String],
    typicalOutcomes: [String],
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Solution: Model<ISolution> =
  mongoose.models.Solution ?? mongoose.model<ISolution>("Solution", SolutionSchema);

// ─── Project ─────────────────────────────────────────────────────────────────
export interface IProject extends Document {
  id: string;
  title: string;
  category: string;
  badge: string;
  isConceptual: boolean;
  shortDescription: string;
  technologies: string[];
  scope: string;
  architectureHighlight: string;
  gradient: string;
  order: number;
}

const ProjectSchema = new Schema<IProject>(
  {
    id: { type: String, required: true, unique: true },
    title: String,
    category: String,
    badge: String,
    isConceptual: { type: Boolean, default: true },
    shortDescription: String,
    technologies: [String],
    scope: String,
    architectureHighlight: String,
    gradient: String,
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Project: Model<IProject> =
  mongoose.models.Project ?? mongoose.model<IProject>("Project", ProjectSchema);

// ─── Invoice ─────────────────────────────────────────────────────────────────
export interface IInvoiceLineItem {
  description: string;
  qty: number;
  unitPrice: number;
}

export interface IInvoice extends Document {
  invoiceNumber: string;
  type: "invoice" | "proforma";
  status: "draft" | "sent" | "paid" | "cancelled";
  issueDate: string;
  dueDate: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  customerCity: string;
  customerCountry: string;
  lineItems: IInvoiceLineItem[];
  vatEnabled: boolean;
  vatRate: number;
  paymentDetails: string;
  termsAndConditions: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceLineItemSchema = new Schema<IInvoiceLineItem>(
  {
    description: { type: String, default: "" },
    qty: { type: Number, default: 1 },
    unitPrice: { type: Number, default: 0 },
  },
  { _id: false }
);

const InvoiceSchema = new Schema<IInvoice>(
  {
    invoiceNumber: { type: String, required: true, unique: true },
    type: { type: String, enum: ["invoice", "proforma"], default: "invoice" },
    status: { type: String, enum: ["draft", "sent", "paid", "cancelled"], default: "draft" },
    issueDate: { type: String, default: "" },
    dueDate: { type: String, default: "" },
    customerName: { type: String, default: "" },
    customerEmail: { type: String, default: "" },
    customerPhone: { type: String, default: "" },
    customerAddress: { type: String, default: "" },
    customerCity: { type: String, default: "" },
    customerCountry: { type: String, default: "" },
    lineItems: [InvoiceLineItemSchema],
    vatEnabled: { type: Boolean, default: true },
    vatRate: { type: Number, default: 18 },
    paymentDetails: { type: String, default: "" },
    termsAndConditions: { type: String, default: "" },
    notes: { type: String, default: "" },
  },
  { timestamps: true }
);

export const Invoice: Model<IInvoice> =
  mongoose.models.Invoice ?? mongoose.model<IInvoice>("Invoice", InvoiceSchema);

// ─── Website Visitor Analytics ────────────────────────────────────────────────
export interface IPageVisit extends Document {
  path: string;
  referrer: string;
  userAgent: string;
  ip: string;
  device: "desktop" | "mobile" | "tablet";
  browser: string;
  createdAt: Date;
}

const PageVisitSchema = new Schema<IPageVisit>(
  {
    path: { type: String, required: true, index: true },
    referrer: { type: String, default: "" },
    userAgent: { type: String, default: "" },
    ip: { type: String, default: "" },
    device: { type: String, enum: ["desktop", "mobile", "tablet"], default: "desktop" },
    browser: { type: String, default: "Other" },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

PageVisitSchema.index({ createdAt: -1 });

export const PageVisit: Model<IPageVisit> =
  mongoose.models.PageVisit ?? mongoose.model<IPageVisit>("PageVisit", PageVisitSchema);


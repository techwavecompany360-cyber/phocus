import { DatabaseSync } from "node:sqlite";
import path from "node:path";
import fs from "node:fs";

let dbInstance: DatabaseSync | null = null;

export function getDatabase(): DatabaseSync {
  if (dbInstance) return dbInstance;

  const dataDir = path.join(process.cwd(), "data");
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }

  const dbPath = path.join(dataDir, "inquiries.db");
  const db = new DatabaseSync(dbPath);

  // Initialize inquiries table
  db.exec(`
    CREATE TABLE IF NOT EXISTS inquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      company TEXT,
      email TEXT NOT NULL,
      phone TEXT,
      service TEXT NOT NULL,
      budget TEXT,
      subject TEXT,
      details TEXT NOT NULL,
      preferred_method TEXT DEFAULT 'Email',
      email_status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      status TEXT DEFAULT 'new'
    );
  `);

  // Safe migrations for pre-existing tables
  try {
    db.exec("ALTER TABLE inquiries ADD COLUMN subject TEXT DEFAULT '';");
  } catch {
    // Column already exists
  }

  try {
    db.exec("ALTER TABLE inquiries ADD COLUMN email_status TEXT DEFAULT 'pending';");
  } catch {
    // Column already exists
  }

  dbInstance = db;
  return dbInstance;
}

export interface InquiryInput {
  fullName: string;
  company?: string;
  email: string;
  phone?: string;
  service: string;
  budget?: string;
  subject: string;
  details: string;
  preferredMethod?: string;
  emailStatus?: string;
}

export function saveInquiry(data: InquiryInput): { id: number; timestamp: string } {
  const db = getDatabase();
  const stmt = db.prepare(`
    INSERT INTO inquiries (full_name, company, email, phone, service, budget, subject, details, preferred_method, email_status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const result = stmt.run(
    data.fullName.trim(),
    (data.company || "").trim(),
    data.email.trim().toLowerCase(),
    (data.phone || "").trim(),
    data.service.trim(),
    (data.budget || "Not Specified").trim(),
    data.subject.trim(),
    data.details.trim(),
    (data.preferredMethod || "Email").trim(),
    (data.emailStatus || "pending").trim()
  );

  return {
    id: Number(result.lastInsertRowid),
    timestamp: new Date().toISOString()
  };
}

export function updateInquiryEmailStatus(id: number, status: string) {
  const db = getDatabase();
  const stmt = db.prepare("UPDATE inquiries SET email_status = ? WHERE id = ?");
  stmt.run(status, id);
}

export function listInquiries(limit = 20) {
  const db = getDatabase();
  const stmt = db.prepare("SELECT * FROM inquiries ORDER BY id DESC LIMIT ?");
  return stmt.all(limit);
}

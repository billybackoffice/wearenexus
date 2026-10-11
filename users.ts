import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const DATA_DIR = path.join(process.cwd(), "data");
const USERS_FILE = path.join(DATA_DIR, "users.json");

export type User = {
  id: string;
  email: string;
  name?: string;
  passwordHash?: string; // only for credentials users
  provider?: "credentials" | "google";
  createdAt: string;
};

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, "[]", "utf-8");
  }
}

function readUsers(): User[] {
  ensureDataDir();
  try {
    const raw = fs.readFileSync(USERS_FILE, "utf-8");
    return JSON.parse(raw) as User[];
  } catch {
    return [];
  }
}

function writeUsers(users: User[]) {
  ensureDataDir();
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf-8");
}

export async function findUserByEmail(email: string): Promise<User | null> {
  const users = readUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase()) || null;
}

export async function createUser(params: {
  email: string;
  password: string;
  name?: string;
}): Promise<User> {
  const existing = await findUserByEmail(params.email);
  if (existing) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(params.password, 12);
  const user: User = {
    id: uuidv4(),
    email: params.email.toLowerCase(),
    name: params.name || params.email.split("@")[0],
    passwordHash,
    provider: "credentials",
    createdAt: new Date().toISOString(),
  };

  const users = readUsers();
  users.push(user);
  writeUsers(users);
  return user;
}

export async function verifyPassword(
  email: string,
  password: string
): Promise<User | null> {
  const user = await findUserByEmail(email);
  if (!user || !user.passwordHash) return null;

  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) return null;

  return user;
}

export async function upsertGoogleUser(params: {
  email: string;
  name?: string;
}): Promise<User> {
  let user = await findUserByEmail(params.email);
  if (user) return user;

  user = {
    id: uuidv4(),
    email: params.email.toLowerCase(),
    name: params.name || params.email.split("@")[0],
    provider: "google",
    createdAt: new Date().toISOString(),
  };

  const users = readUsers();
  users.push(user);
  writeUsers(users);
  return user;
}

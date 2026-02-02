import fs from 'fs'
import path from 'path'

const DATA_DIR = path.join(process.cwd(), '.data')
const MYLIST_FILE = path.join(DATA_DIR, 'mylist.json')

type Store = {
  [email: string]: string[]
}

function ensureDir() {
  if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true })
}

export function readStore(): Store {
  try {
    ensureDir()
    if (!fs.existsSync(MYLIST_FILE)) return {}
    const raw = fs.readFileSync(MYLIST_FILE, 'utf-8')
    return JSON.parse(raw || '{}')
  } catch (e) {
    return {}
  }
}

export function writeStore(store: Store) {
  ensureDir()
  fs.writeFileSync(MYLIST_FILE, JSON.stringify(store, null, 2), 'utf-8')
}

export function getListFor(email: string) {
  const s = readStore()
  return s[email] || []
}

export function addToList(email: string, movieId: string) {
  const s = readStore()
  const list = s[email] || []
  if (!list.includes(movieId)) list.push(movieId)
  s[email] = list
  writeStore(s)
  return s[email]
}

export function setList(email: string, list: string[]) {
  const s = readStore()
  s[email] = list
  writeStore(s)
}

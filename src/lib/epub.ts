import JSZip from "jszip";

interface EpubChapter {
  title: string;
  text: string;
}

interface ParsedEpub {
  title: string;
  author?: string;
  coverDataUrl?: string;
  chapters: EpubChapter[];
}

export async function parseEpub(file: File): Promise<ParsedEpub> {
  const buffer = await file.arrayBuffer();
  const zip = await JSZip.loadAsync(buffer);

  // Read container.xml to find the OPF file
  const containerXml = await zip.file("META-INF/container.xml")?.async("text");
  if (!containerXml) throw new Error("Invalid EPUB: missing container.xml");

  const containerDoc = new DOMParser().parseFromString(
    containerXml,
    "application/xml"
  );
  const rootfileEl = containerDoc.querySelector("rootfile");
  const opfPath = rootfileEl?.getAttribute("full-path");
  if (!opfPath) throw new Error("Invalid EPUB: missing rootfile path");

  // Read the OPF file
  const opfXml = await zip.file(opfPath)?.async("text");
  if (!opfXml) throw new Error("Invalid EPUB: missing OPF file");

  const opfDoc = new DOMParser().parseFromString(opfXml, "application/xml");
  const opfDir = opfPath.includes("/")
    ? opfPath.substring(0, opfPath.lastIndexOf("/") + 1)
    : "";

  // Extract metadata
  const titleEl =
    opfDoc.querySelector("metadata title") ??
    opfDoc.querySelector("dc\\:title");
  const authorEl =
    opfDoc.querySelector("metadata creator") ??
    opfDoc.querySelector("dc\\:creator");
  const title = titleEl?.textContent?.trim() || file.name.replace(/\.epub$/i, "");
  const author = authorEl?.textContent?.trim() || undefined;

  // Build full manifest map (id -> { href, mediaType })
  const fullManifest = new Map<
    string,
    { href: string; mediaType: string }
  >();
  opfDoc.querySelectorAll("manifest item").forEach((item) => {
    const id = item.getAttribute("id");
    const href = item.getAttribute("href");
    const mediaType = item.getAttribute("media-type") || "";
    if (id && href) {
      fullManifest.set(id, { href, mediaType });
    }
  });

  // Extract cover image
  const coverDataUrl = await extractCover(opfDoc, fullManifest, opfDir, zip);

  // Build HTML-only manifest for spine
  const manifest = new Map<string, string>();
  fullManifest.forEach(({ href, mediaType }, id) => {
    if (mediaType.includes("html")) {
      manifest.set(id, href);
    }
  });

  // Read spine order
  const spineItems: string[] = [];
  opfDoc.querySelectorAll("spine itemref").forEach((ref) => {
    const idref = ref.getAttribute("idref");
    if (idref && manifest.has(idref)) {
      spineItems.push(manifest.get(idref)!);
    }
  });

  // Extract text from each spine item
  const chapters: EpubChapter[] = [];
  for (const href of spineItems) {
    const filePath = opfDir + href;
    const content = await zip.file(filePath)?.async("text");
    if (!content) continue;

    const doc = new DOMParser().parseFromString(content, "application/xhtml+xml");

    // Try to find a chapter title from headings
    const heading =
      doc.querySelector("h1, h2, h3")?.textContent?.trim() || "";

    // Extract text content, stripping all HTML
    const body = doc.querySelector("body");
    const text = extractText(body);

    // Skip very short chapters (title pages, copyright, etc.)
    const wordCount = text.split(/\s+/).filter(Boolean).length;
    if (wordCount < 50) continue;

    chapters.push({
      title: heading || `Chapter ${chapters.length + 1}`,
      text,
    });
  }

  if (chapters.length === 0) {
    throw new Error("No readable chapters found in this EPUB file");
  }

  return { title, author, coverDataUrl, chapters };
}

async function extractCover(
  opfDoc: Document,
  manifest: Map<string, { href: string; mediaType: string }>,
  opfDir: string,
  zip: JSZip
): Promise<string | undefined> {
  // Strategy 1: <meta name="cover" content="cover-image-id" />
  let coverId: string | null = null;
  opfDoc.querySelectorAll("metadata meta").forEach((meta) => {
    if (meta.getAttribute("name") === "cover") {
      coverId = meta.getAttribute("content");
    }
  });

  // Strategy 2: manifest item with properties="cover-image" (EPUB3)
  if (!coverId) {
    manifest.forEach(({ mediaType }, id) => {
      if (!coverId) {
        const el = opfDoc.querySelector(`manifest item[id="${id}"]`);
        if (el?.getAttribute("properties")?.includes("cover-image")) {
          coverId = id;
        }
      }
    });
  }

  // Strategy 3: look for common cover IDs
  if (!coverId) {
    for (const guess of ["cover", "cover-image", "coverimage", "cover_image"]) {
      if (manifest.has(guess)) {
        const entry = manifest.get(guess)!;
        if (entry.mediaType.startsWith("image/")) {
          coverId = guess;
          break;
        }
      }
    }
  }

  if (!coverId) return undefined;

  const entry = manifest.get(coverId);
  if (!entry || !entry.mediaType.startsWith("image/")) return undefined;

  const filePath = opfDir + entry.href;
  const imageData = await zip.file(filePath)?.async("base64");
  if (!imageData) return undefined;

  return `data:${entry.mediaType};base64,${imageData}`;
}

function extractText(node: Element | null): string {
  if (!node) return "";

  const blocks: string[] = [];
  const walker = document.createTreeWalker(node, NodeFilter.SHOW_TEXT);

  let current = walker.nextNode();
  while (current) {
    const text = current.textContent?.trim();
    if (text) blocks.push(text);
    current = walker.nextNode();
  }

  return blocks.join(" ");
}

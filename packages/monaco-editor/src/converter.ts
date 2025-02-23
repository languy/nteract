import Immutable from "immutable";
import * as monaco from "monaco-editor";

/**
 * Code Mirror to Monaco constants.
 */
export enum Mode {
  markdown = "markdown",
  raw = "plaintext",
  python = "python"
}

/**
 * Maps Code Mirror mode to a valid Monaco Editor supported langauge
 * defaults to plaintext if map not found.
 * @param mode Code Mirror mode
 * @returns Monaco language
 */
export function mapCodeMirrorModeToMonaco(mode: any): string {
  let language: string = "";

  // Parse codemirror mode object
  if (typeof mode === "string") {
    language = mode;
  }
  // Vanilla object
  else if (typeof mode === "object" && mode.name) {
    language = mode.name;
  }
  // Immutable Map
  else if (Immutable.Map.isMap(mode) && mode.has("name")) {
    language = mode.get("name");
  }

  // Need to handle "ipython" as a special case since it is not a registered language
  if (language === "ipython") {
    return Mode.python;
  } else if (monaco.languages.getEncodedLanguageId(language) > 0) {
    return language;
  }
  return Mode.raw;
}

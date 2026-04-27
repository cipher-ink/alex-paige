module.exports = {
  // object that describes the step and its configuration
  description: {
    // the name of your step
    name: "Nate Book Formatting",

    // short description of what it does
    description: "Formats a manuscript with YAML frontmatter, adds headers for top-level scenes, and concatenates indented scenes.",

    // array. valid options are "Scene", "Manuscript", "Join". "Join" must be the only member if present.
    availableKinds: ["Join"],    // array of step options, or an empty array if step has no options
    options: [
      {
        id: "title",
        name: "Title",
        description: "The title of the manuscript.",
        type: "Text",
        default: "The Red Sanctum",
      },
      {
        id: "author",
        name: "Author",
        description: "The author of the manuscript.",
        type: "Text",
        default: "Nathan T. Beene",
      },
      {
        id: "date",
        name: "Date",
        description: "The date or subtitle of the manuscript.",
        type: "Text",
        default: "Alex Paige Book One",
      },
      {
        id: "toc",
        name: "Table of Contents",
        description: "Include table of contents",
        type: "Boolean",
        default: false,
      },
      {
        id: "template",
        name: "Template Path",
        description: "Path to the LaTeX template file",
        type: "Text",
        default: "F:/Obsidian Vaults/Alex Paige Vault/99 - Meta/Pandoc/templates/alex-paige-template.tex",
      },
      {
        id: "luaFilter",
        name: "Lua Filter Path",
        description: "Path to the Lua filter file",
        type: "Text",
        default: "F:/Obsidian Vaults/Alex Paige Vault/99 - Meta/Pandoc/templates/scene-breaks.lua",
      },
      {
        id: "pdfEngine",
        name: "PDF Engine",
        description: "PDF engine for LaTeX compilation",
        type: "Text",
        default: "xelatex",
      },
    ],
  },

  /**
    Function that is executed during compilation. It may be `async`.
    Errors encountered during execution should be thrown and will
    be handled by Longform.
    @param input If the step is of kind Scene or Join (see context),
    this will be *an array* containing elements of type:
      {
        path: string; // path to scene
        name: string; // file name of scene
        contents: string; // text contents of scene
        metadata: CachedMetadata; // Obsidian metadata of scene
        indentationLevel?: number; // The indent level (starting at zero) of the scene
      }
    where each element corresponds to a scene (and thus the step has access to all scenes at once in `input`).
    If the step is of kind Manuscript (see context), this will be of type:
      {
        // text contents of manuscript
        contents: string;
      }
    @param context The execution context of the step, including the step
    kind and option values:
      {
        kind: string; // "Scene" | "Join" | "Manuscript"
        optionValues: { [id: string]: unknown } // Map of option IDs to values
        projectPath: string; // path in vault to compiling project
        draft: Draft; // The Draft type describing your project
        app: App; // Obsidian app
      }
    @note For an example of using `context` to determine the shape of `input`, see
    https://github.com/kevboh/longform/blob/main/src/compile/steps/strip-frontmatter.ts
    @returns If of kind "Scene" or "Manuscript", the same shape as `input`
    with the appropriate changes made to `contents`. If of kind "Join",
    the same shape as a "Manuscript" step input.
  */
  compile: compile,
};

async function compile(input, context) {
  if (context.kind !== "Join") {
    throw new Error("This step only works with Join kind.");
  }  // Extract option values with defaults
  const title = context.optionValues.title || "The Red Sanctum";
  const author = context.optionValues.author || "Nathan T. Beene";
  const date = context.optionValues.date || "Alex Paige Book One";
  const toc = context.optionValues.toc || false;
  const template = context.optionValues.template || "F:\\Obsidian Vaults\\Alex Paige Vault\\99 - Meta\\Pandoc\\templates\\alex-paige-template.latex";
  const luaFilter = context.optionValues.luaFilter || "F:\\Obsidian Vaults\\Alex Paige Vault\\99 - Meta\\Pandoc\\templates\\scene-breaks.lua";
  const pdfEngine = context.optionValues.pdfEngine || "xelatex";
  
  const chapterSeparator = context.optionValues.chapterSeparator || "\n===\n";
  const sceneSeparator = context.optionValues.sceneSeparator || "\n---\n";  // Build YAML frontmatter
  let yamlFrontmatter = "---\n";
  yamlFrontmatter += `title: "${title}"\n`;
  yamlFrontmatter += `author: "${author}"\n`;
  yamlFrontmatter += `date: "${date}"\n`;
  yamlFrontmatter += `toc: ${toc}\n`;
  yamlFrontmatter += `template: "${template}"\n`;
  yamlFrontmatter += `lua-filter: "${luaFilter}"\n`;
  yamlFrontmatter += `pdf-engine: "${pdfEngine}"\n`;
  yamlFrontmatter += "---\n\n";

  // Initialize the manuscript contents with YAML frontmatter
  let manuscript = yamlFrontmatter;

  input.forEach((scene, index) => {
    const previousScene = input[index - 1];

    if (scene.indentationLevel === 0) {
      // Add chapter separator before chapter headers, skipping the first one
      if (previousScene && previousScene.indentationLevel === 0) {
        manuscript += chapterSeparator;
      }
      manuscript += `# ${scene.name}\n\n${scene.contents}\n\n`;
    } else if (scene.indentationLevel > 0) {
      // Skip the first scene title within a chapter
      if (previousScene && previousScene.indentationLevel === 0) {
        manuscript += `${scene.contents}\n\n`;
      } else {
        manuscript += `## ${scene.name}\n\n${scene.contents}\n\n`;
      }
    }
  });

  return { contents: manuscript.trim() };
}

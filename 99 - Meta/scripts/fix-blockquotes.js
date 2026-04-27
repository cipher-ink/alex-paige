module.exports = {
  description: {
    name: "Fix Blockquotes",
    description: "Finds consecutive blockquote lines and inserts a separator line.",
    availableKinds: ["Scene", "Manuscript"],
    options: [],
  },

  compile: async function (input, context) {
    const isSceneOrManuscript = context.kind === "Scene" || context.kind === "Manuscript";

    if (isSceneOrManuscript) {
      if (Array.isArray(input)) {
        // Handle "Scene" kind: Iterate over all scenes
        return input.map(scene => ({
          ...scene,
          contents: processBlockquotes(scene.contents),
        }));
      } else {
        // Handle "Manuscript" kind
        return {
          ...input,
          contents: processBlockquotes(input.contents),
        };
      }
    }

    throw new Error("Unsupported step kind: " + context.kind);
  },
};

/**
 * Function to insert a separator line between consecutive blockquote lines.
 * @param {string} markdown The markdown content to process.
 * @returns {string} The processed markdown content.
 */
function processBlockquotes(markdown) {
  // Add a blank blockquote line between consecutive lines starting with '>'
  return markdown.replace(/(>.*\n)(?=>)/g, "$1> \n");
}

module.exports = {
  description: {
    name: "Add Hard Line Breaks 2",
    description: "Replaces single line breaks with hard line breaks in markdown, ignoring blockquotes.",
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
          contents: processMarkdown(scene.contents),
        }));
      } else {
        // Handle "Manuscript" kind
        return {
          ...input,
          contents: processMarkdown(input.contents),
        };
      }
    }

    throw new Error("Unsupported step kind: " + context.kind);
  },
};

/**
 * Function to replace single line breaks with double line breaks, ignoring blockquotes.
 * @param {string} markdown The markdown content to process.
 * @returns {string} The processed markdown content.
 */
function processMarkdown(markdown) {
  if (!markdown) return ""; // Handle empty or undefined input gracefully

  // Split the markdown into lines
  const lines = markdown.split("\n");

  // Process lines, skipping blockquote lines
  const processedLines = lines.map((line, index, arr) => {
    if (typeof line !== "string" || line.startsWith(">")) {
      return line; // Ignore blockquotes and ensure safety for undefined/null lines
    }

    // Check if the previous and next lines are also not blockquotes
    const isNotBlockquote = (i) =>
      i >= 0 && i < arr.length && typeof arr[i] === "string" && !arr[i].startsWith(">");

    if (
      isNotBlockquote(index - 1) &&
      isNotBlockquote(index + 1) &&
      line.trim() !== "" // Avoid adding breaks around blank lines
    ) {
      return line + "\n"; // Add a double break for eligible lines
    }
    return line;
  });

  // Rejoin the lines back into markdown
  return processedLines.join("\n");
}

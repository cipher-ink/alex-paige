module.exports = {
  description: {
    name: "Strip Frontmatter with Indentation",
    description: "Removes the YAML frontmatter section from scenes based on the specified indentation level.",
    availableKinds: ["Scene", "Manuscript"],
    options: [
      {
        id: "indentation-level",
        name: "Indentation Level",
        description: "The indentation level of scenes to process.",
        type: "Text",
        default: "0",
      },
    ],
  },

  compile: function (input, context) {
    const targetIndentationLevel = parseInt(context.optionValues["indentation-level"], 10);

    if (isNaN(targetIndentationLevel)) {
      throw new Error("Invalid indentation level: must be a number in string format.");
    }

    if (context.kind === "Scene") {
      return input.map((sceneInput) => {
        if (sceneInput.indentationLevel === targetIndentationLevel) {
          const contents = sceneInput.contents.replace(/^---\n(?:.*?\n)*?---/m, "");
          return {
            ...sceneInput,
            contents,
          };
        }
        return sceneInput;
      });
    } else {
      // For manuscripts, apply the logic regardless of indentation.
      return {
        ...input,
        contents: input.contents.replace(/^---\n(?:.*?\n)*?---/m, ""),
      };
    }
  },
};

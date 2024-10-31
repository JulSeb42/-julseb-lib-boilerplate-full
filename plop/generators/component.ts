/*=============================================== Generate component ===============================================*/

import type { NodePlopAPI } from "plop"
import { BASE_CLIENT_PATH, TEMPLATES_PATH } from "../utils/index.js"

export default (plop: NodePlopAPI) => {
    const { setGenerator } = plop

    setGenerator("component", {
        description: "React component",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Enter component's name",
            },
            {
                type: "input",
                name: "tag",
                message: "Enter HTML tag",
                default: "div",
            },
            {
                type: "input",
                name: "attribute",
                message: "Enter HTML attribute",
                default: (data: { tag: string }) => data.tag,
            },
            {
                type: "confirm",
                name: "forward",
                message: "Add `forwardRef`?",
                default: false,
            },
            {
                type: "confirm",
                name: "as",
                message: "Add `as` prop?",
                default: false,
            },
            {
                type: "confirm",
                name: "children",
                message: "Add `children` prop?",
                default: true,
            },
            {
                type: "confirm",
                name: "export",
                message: "Export this component from components folder?",
                default: true,
            },
        ],
        actions: data => {
            const actions = [
                "Creating new files",
                {
                    type: "addMany",
                    destination: `${BASE_CLIENT_PATH}/components/{{ pascalCase name }}`,
                    templateFiles: `${TEMPLATES_PATH}/component/*.hbs`,
                    base: `${TEMPLATES_PATH}/component`,
                    verbose: false,
                },
            ]

            if (data?.export)
                actions.push("Exporting your new component", {
                    type: "modify",
                    // @ts-ignore
                    path: `${BASE_CLIENT_PATH}/components/index.ts`,
                    template:
                        'export * from "components/{{ pascalCase name }}"\n$1',
                    pattern: /(\/\* prepend - do not remove \*\/)/g,
                    verbose: false,
                })

            return actions
        },
    })
}

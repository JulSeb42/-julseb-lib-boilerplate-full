/*=============================================== Global types ===============================================*/

import type { FunctionComponent, ElementType as ElType } from "react"
import "styled-components"
import type {
    ReactChildren,
    DispatchState as DispatchType,
} from "@julseb-lib/react/types"
import type { COLORS_LIGHT, COLORS_DARK } from "@julseb-lib/react"

declare global {
    type Children = ReactChildren
    type DispatchState<T> = DispatchType<T>
    type FC<T = FunctionComponent> = FunctionComponent<T>
    type ElementType = ElType
}

declare module "styled-components" {
    type ThemeLight = typeof COLORS_LIGHT
    type ThemeDark = typeof COLORS_DARK
    export interface DefaultTheme extends ThemeLight, ThemeDark {}
}

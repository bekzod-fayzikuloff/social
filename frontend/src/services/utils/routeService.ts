import { NavigateFunction } from "react-router-dom";


const clickRedirect = (navigator: NavigateFunction, to: string): void => {
  navigator(to)
}

export { clickRedirect };
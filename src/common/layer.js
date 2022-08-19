
import store from "../store";
const {commit} = store

export function topComponent(bar) {
  commit("topComponent", bar);
}
export function bottomComponent(bar) {
  commit("bottomComponent", bar);
}
export function upComponent(bar) {
  commit("upComponent", bar);
  commit("recordSnapshot");
}
export function downComponent(bar) {
  commit("downComponent", bar);
  commit("recordSnapshot");
}

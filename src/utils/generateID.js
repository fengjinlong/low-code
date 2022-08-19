let id = 0
// 主要用于 Vue 的 diff 算法，为每个元素创建一个独一无二的 ID
export default function generateID(componentData) {
    if (componentData.length > 0) {
        id = Math.max.apply(null, componentData.map(item => item.id));
    }
    return ++id;
}
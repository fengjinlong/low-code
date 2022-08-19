import { $ } from './utils'
import { mod360 } from './translate'

// 将组合中的各个子组件拆分出来，并计算它们新的 style
export default function decomposeComponent(component, editorRect, parentStyle) {
    const componentRect = $(`#component${component.id}`).getBoundingClientRect()
    // 获取元素的中心点坐标
    const center = {
        x: componentRect.left - editorRect.left + componentRect.width / 2,
        y: componentRect.top - editorRect.top + componentRect.height / 2,
    }

    component.materialData.style.rotate = mod360(component.materialData.style.rotate + parentStyle.rotate)
    component.materialData.style.width = parseFloat(component.groupStyle.width) / 100 * parentStyle.width
    component.materialData.style.height = parseFloat(component.groupStyle.height) / 100 * parentStyle.height
    // 计算出元素新的 top left 坐标
    component.materialData.style.left = center.x - component.materialData.style.width / 2
    component.materialData.style.top = center.y - component.materialData.style.height / 2
    component.groupStyle = {}
}
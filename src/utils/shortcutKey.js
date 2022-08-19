import store from '@/store'
import Bus from "@/utils/bus";

const ctrlKey = 17,
    commandKey = 91, // mac command
    vKey = 86, // 粘贴
    cKey = 67, // 复制
    xKey = 88, // 剪切

    yKey = 89, // 重做
    zKey = 90, // 撤销


    sKey = 83, // 保存
    dKey = 68, // 删除
    deleteKey = 46 // 删除

// export const keycodes = [66, 67, 68, 69, 71, 76, 80, 83, 85, 86, 88, 89, 90]

// 与组件状态无关的操作
const basemap = {
    [vKey]: paste,
    // [yKey]: redo,
    [zKey]: undo,
    [sKey]: save,
    // [pKey]: preview,
    // [eKey]: clearCanvas,
}

// 组件锁定状态下可以执行的操作
const lockMap = {
    ...basemap,
}

// 组件未锁定状态下可以执行的操作
const unlockMap = {
    ...basemap,
    [cKey]: copy,
    [xKey]: cut,
    [dKey]: deleteComponent,
    [deleteKey]: deleteComponent,
}

let isCtrlOrCommandDown = false
// 全局监听按键操作并执行相应命令
// export function listenGlobalCtrl() {
//     window.onkeydown = (e) => {
//         e.preventDefault() 
//         const { keyCode } = e
//         console.log.log('-=-=-=-=' +keyCode)
//         if (keyCode === ctrlKey || keyCode === commandKey) {
//             // isCtrlOrCommandDown = true
//             console.log.log('-=-=-=-=' +e.button)
//         }
//     }
// }
export function listenGlobalKeyDown() {
    window.onkeydown = (e) => {
        e.preventDefault()
        // if (!store.state.isInEdiotr) return

        const { curComponent } = store.state
        const { keyCode } = e
        if (keyCode === ctrlKey || keyCode === commandKey) {
            isCtrlOrCommandDown = true
        } else if (keyCode == deleteKey && curComponent) {
            // delete
            store.commit('deleteComponent')
            store.commit('recordSnapshot')
        } else if (isCtrlOrCommandDown) {
            if (unlockMap[keyCode] && (!curComponent || !curComponent.isLock)) {
                e.preventDefault()
                unlockMap[keyCode]()
            } else if (lockMap[keyCode] && curComponent && curComponent.isLock) {
                // e.preventDefault()
                // lockMap[keyCode]()
            }
        }
    }

    window.onkeyup = (e) => {
        e.preventDefault()
        if (e.keyCode === ctrlKey || e.keyCode === commandKey) {
            isCtrlOrCommandDown = false
        }
    }

    window.onmousedown = () => {
        // store.commit('setInEditorStatus', false)
    }
}

function copy() {
    store.commit('copy')
}

function paste() {
    store.commit('paste')
    store.commit('recordSnapshot')
}

function cut() {
    store.commit('cut')
}


function undo() {
    store.commit('undo')
}



function save() {
    Bus.emit('save')
}


function deleteComponent() {
    if (store.state.curComponent) {
        store.commit('deleteComponent')
        store.commit('recordSnapshot')
    }
}

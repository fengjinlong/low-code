import { sin, cos } from '@/utils/translate'

export function getStyle(style, filter = []) {
    const needUnit = [ //px
        "width",
        "height",
        "top",
        "left",
        "fontSize",
        // "borderWidth",
        "borderTopLeftRadius",
        "borderTopRightRadius",
        "borderBottomLeftRadius",
        "borderBottomRightRadius",
    ]
    const needBoxShadow = [ //阴影特殊处理
        "boxShadowX",
        "boxShadowY",
        "boxShadowM",
        "boxShadowC",
        "boxShadowColor"
    ]
    const noNeedUnit = [
        "color",
        "backgroundColor",
        "borderColor",
        "opacity"
    ];
    //背景图片特殊处理
    const needBgImage = ["backgroundImage"];
    //边框样式特殊处理
    const needBorder = ["borderTop", "borderBottom", "borderLeft", "borderRight"];

    const result = {}
    Object.keys(style).forEach(key => {
        if (!filter.includes(key)) {
            if (key != 'rotate') {
                result[key] = style[key]

                if (needUnit.includes(key)) {
                    result[key] += 'px'
                }
                if (noNeedUnit.includes(key)) {
                    result[key] = style[key]
                }

                // 边框特殊处理
                if (needBorder.includes(key)) {
                    if (style[key] == true) {
                        result[key] = `${style["borderWidth"]}px ${style["borderType"]} ${style["borderColor"]} `;
                    } else {
                        result[key] = 0;
                    }
                }
                // 背景图特殊处理
                if (needBgImage.includes(key)) {
                    result[key] = `url(${style[key]})`;
                    result["backgroundSize"] = "100% 100%";
                    result["backgroundRepeat"] = "no-repeat";
                }
                //阴影样式
                if (needBoxShadow.includes(key)) { 
                    // result["boxShadow"] = `${style["boxShadowX"]}px  ${style["boxShadowY"]}px ${style["boxShadowM"]}px ${style["boxShadowC"]}px #132a53`;
                    result["boxShadow"] = `${style["boxShadowX"]}px  ${style["boxShadowY"]}px ${style["boxShadowM"]}px ${style["boxShadowC"]}px ${style["boxShadowColor"]}`;
                }
            } else {
                result.transform = key + '(' + style[key] + 'deg)'
            }
        }
    })

    return result
}

// 获取一个组件旋转 rotate 后的样式
export function getComponentRotatedStyle(style) {
    style = { ...style }
    if (style.rotate != 0) {
        const newWidth = style.width * cos(style.rotate) + style.height * sin(style.rotate)
        const diffX = (style.width - newWidth) / 2 // 旋转后范围变小是正值，变大是负值
        style.left += diffX
        style.right = style.left + newWidth

        const newHeight = style.height * cos(style.rotate) + style.width * sin(style.rotate)
        const diffY = (newHeight - style.height) / 2 // 始终是正
        style.top -= diffY
        style.bottom = style.top + newHeight

        style.width = newWidth
        style.height = newHeight
    } else {
        style.bottom = style.top + style.height
        style.right = style.left + style.width
    }

    return style
}
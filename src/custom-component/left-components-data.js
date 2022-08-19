// 公共样式
export const commonStyle = {
  rotate: 0,
  opacity: 1,
};

// 一共存在组件的类型
export const commonType = 6;

export const commonAttr = {
  animations: [],
  events: {},
  groupStyle: {}, // 当一个组件成为 Group 的子组件时使用
  isLock: false, // 是否锁定组件
};

// 柱状图 系列默认属性
export const barSeriesObj = {
  type: 'bar', //bar 类型
  name: '', // name
  // 柱设置
  barWidth: '', //40% 柱形宽度
  barMinHeight:0, // 最小高度
  barGap:'30%', //不同类目间距
  barCategoryGap:'20%', //同类目间距
  itemStyle: {
    borderColor:'#000', //描边颜色
    borderWidth:'', //描边宽度，默认不描边
    borderType:"solid", //描边类型 'solid''dashed''dotted'
    borderRadius: 0, //[5, 5, 0, 0] //（顺时针左上，右上，右下，左下）
  },

  // 柱背景
  showBackground: false, //显示柱背景
  backgroundStyle: {
    color: 'rgba(180, 180, 180, 0.2)', // 颜色
    borderColor:'#000', //描边颜色
    borderWidth:'', //描边宽度，默认不描边
    borderType:"solid", //描边类型 'solid''dashed''dotted'
    borderRadius: 0, //[5, 5, 0, 0] //（顺时针左上，右上，右下，左下）
  },

  // 3.文本标签
  label: {
    show:false,
    formatter:'{b}',//内容格式
    position:'top', //top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
    color: 'red',//名称的颜色
    fontSize: 16, // 名称的字体大小
    fontWeight: 'normal', // 名称的字体粗细 / 普通、加粗bold、更细lighter
    fontFamily:'sans-serif', //名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
  },
  // 4.动画
  animation: true, //开启动画
  animationDuration:1000, //动画的时长
  animationEasing:'exponentialInOut', //动画效果 => animateList

  // data: [5, 60, 136, 10, 10, 220]
};
// 折线图 系列默认属性
export const lineSeriesObj = {
  type: "line", //bar 类型
  name: "", // name
  // areaStyle: {}, // 折线图区域背景色
  // yAxisIndex:0, //索引
  // markPoint:{ //是否展示 数据标注
  //   data: [
  //     { type: 'max', name: 'Max' },
  //     { type: 'min', name: 'Min' }
  //   ]
  // },
  // markLine: {
  //   data: [{
  //       name: '平均线',
  //       // 支持 'average', 'min', 'max'
  //       type: 'average'
  //   }]
  // },
  // 1.折现样式
  smooth: true, //这句就是让曲线变平滑的
  // 2.拐点样式
  symbol: "circle", //拐点样式 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
  symbolSize: 4, //拐点大小
  // 4.动画
  animation: true, //开启动画
  animationDuration: 1000, //动画的时长
  animationEasing: "exponentialInOut", //动画效果 => animateList
  lineStyle: {
    color: "#fac858",
    width: 2,
    type: "solid", //'solid''dashed''dotted'
  },
  itemStyle: {
    // 描边
    color: "", //拐点颜色
    borderColor: "#000000", // 描边颜色
    borderWidth: 2, // 描边大小
    borderType: "solid", //'solid''dashed''dotted'
  },
  // 3.文本标签
  label: {
    show: false,
    formatter: "{b}", //内容格式
    position: "top", //top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
    color: "#cccccc", //名称的颜色
    fontSize: 12, // 名称的字体大小
    fontWeight: "normal", // 名称的字体粗细 / 普通、加粗bold、更细lighter
    fontFamily: "sans-serif", //名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
  },

  data: [5, 60, 136, 10, 10, 220],
}

// 编辑器左侧组件列表
const list = [


  {
    component: "c-text",
    componentType: "11",
    layerBg: "layer-bar.png",
    label: "文字",
    propValue: "双击编辑文字",
    icon: "wenben",
    materialData: {
      style: {
        width: 200,
        height: 22,
        top: 1,
        left: 1,
        border: '1px solid #ddd',
        fontSize: 14,
        // fontWeight: 500,
        lineHeight: "",
        // letterSpacing: 0,
        textAlign: "",
        color: "",
      },
    },
  },
  {
    component: "c-button",
    componentType: "11",
    label: "按钮",
    layerBg: "layer-bar.png",
    propValue: "按钮",
    icon: "button",
    materialData: {
      style: {
        width: 100,
        height: 34,
        top: 1,
        left: 1,
        border: '1px solid #ddd',
        borderColor: "red",
        fontSize: 14,
        lineHeight: "",
        textAlign: "",
        color: "green",
        backgroundColor: "",
      },
    },
  },
  {
    component: "c-line",
    componentType: "3",
    layerBg: "layer_line.png",
    label: "折线图",
    propValue: "折线图",
    icon: "button",
    xAxisArr:[{name: 'x', id: 0}], //编辑数据中维度
    yAxisArr:[{name: 'y1', id: 0},{name: 'y2', id: 1}, {name: 'y3', id: 2}], //编辑数据中量度
    objectData: [
      {
        "x": "一月",
        "y1": 8,
        "y2": 2,
        "y3": 9
      },
      {
        "x": "二月",
        "y1": 2,
        "y2": 3,
        "y3": 6
      },
      {
        "x": "三月",
        "y1": 8,
        "y2": 4,
        "y3": 3
      },
      {
        "x": "四月",
        "y1": 9,
        "y2": 4,
        "y3": 9
      },
      {
        "x": "五月",
        "y1": 1,
        "y2": 5,
        "y3": 4
      }
    ],
    materialData: {
      style: {
        name:'折线图', // 组件标题
        width: 300,
        height: 200,
        top:1,
        left:1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

        borderTop: false,
        borderBottom: false,
        borderLeft: false,
        borderRight: false,
        borderWidth:0,
        borderType:"solid",
        borderColor:"rgba(0,0,0,0.5)",
        // 背景类型
        backgroundType:"color",
        backgroundColor:'rgba(0,0,0,0.5)',
        // background-repeat: no-repeat;
        // boxShadow: '13px 13px 11px 3px #ccc', //阴影
        boxShadowX: 0, //阴影
        boxShadowY: 0, //阴影
        boxShadowM: 0, //阴影
        boxShadowC: 0, //阴影
        boxShadowColor: '#132a53', // 阴影颜色
      },
      // 视区
      grid: {
        //  功能: 增加数值绝对值、百分比
        show: false,
        left: "12%",
        right: "7%",
        top: "20%",
        bottom: "22%",
      },
      xAxis: {
        //  type: 'value',
        show: true, //显示隐藏
        position: "bottom", // 坐标轴位置 / top
        name: "",
        nameLocation: "end", // 坐标轴名称位置 center 、start
        nameGap: "15", //坐标轴名称与轴线之间的距离。
        inverse: false, //是否是反向坐标轴。
        boundaryGap: false, //坐标轴两边留白策略
        // 名称文本样式
        nameTextStyle: {
          color: "#cccccc", // 坐标轴名称的颜色
          fontSize: 12, // 坐标轴名称的字体大小
          fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
          fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        },
        //  标签
        axisLabel: {
          show: true, // 默认显示，属性show控制显示与否
          rotate: 0, // 字体旋转
          align: "center", //'left''center''right'
          margin: 8, //刻度标签与轴线之间的距离
          color: "#cccccc", // 坐标轴名称的颜色
          fontSize: 12, // 坐标轴名称的字体大小
          fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
          fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        },
        // 轴线
        axisLine: {
          show: false, // 默认显示，属性show控制显示与否
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "#FFFFFF",
            width: 1,
            type: "solid", //'solid''dashed''dotted'
          },
        },
        // 刻度
        axisTick: {
          show: false, // 默认显示，属性show控制显示与否
          alignWithLabel: false, // 与标签对齐
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "#FFFFFF",
            width: 1,
          },
        },
        // 分割线
        splitLine: {
          show: false, // 默认显示，属性show控制显示与否
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "#FFFFFF", // ['#aaa', '#ddd']
            width: 1,
            type: "solid", //'solid''dashed''dotted'
          },
        },
        // 分割区域
        splitArea: {
          show: false, // 默认显示，属性show控制显示与否
          areaStyle: {
            // 属性lineStyle控制线条样式
            color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"], // 奇数偶数颜色
          },
        }
      },
      yAxis: {
        // type: 'category',
        show: true, //显示隐藏
        position: "left", // 坐标轴位置 'left''right'
        name: "坐标轴名称",
        nameLocation: "end", // 坐标轴名称位置 、start
        nameGap: "15", //坐标轴名称与轴线之间的距离。
        inverse: false, //是否是反向坐标轴。
        boundaryGap: false, //坐标轴两边留白策略
        // min: "dataMin", //坐标区间最小
        // max: "dataMax", //坐标区间最大
        // 名称文本样式
        nameTextStyle: {
          color: "#cccccc", // 坐标轴名称的颜色
          fontSize: 12, // 坐标轴名称的字体大小
          fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
          fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        },
        //  标签
        axisLabel: {
          show: true, // 默认显示，属性show控制显示与否
          rotate: 0, // 字体旋转
          align: "right", //'left''center''right'
          margin: 8, //刻度标签与轴线之间的距离
          color: "#cccccc", // 坐标轴名称的颜色
          fontSize: 12, // 坐标轴名称的字体大小
          fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
          fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        },
        // 轴线
        axisLine: {
          show: true, // 默认显示，属性show控制显示与否
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "#FFFFFF",
            width: 1,
            type: "solid", //'solid''dashed''dotted'
          },
        },
        // 刻度
        axisTick: {
          show: false, // 默认显示，属性show控制显示与否
          alignWithLabel: false, // 与标签对齐
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "#FFFFFF",
            width: 1,
          },
        },
        // 分割线
        splitLine: {
          show: false, // 默认显示，属性show控制显示与否
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "#FFFFFF",
            width: 1,
            type: "solid", //'solid''dashed''dotted'
          },
        },
        // 分割区域
        splitArea: {
          show: false, // 默认显示，属性show控制显示与否
          areaStyle: {
            // 属性lineStyle控制线条样式
            color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"], // 奇数偶数颜色
          },
        },
      },
      // 图表标题
      title: {
        show: false, //显示隐藏
        text: "",
        link: "",
        subtext: "",
        sublink: "",

        // 位置
        // textAlign:'auto', //'left'、'right'、'center' 水平对齐方式，默认根据x设置自动调整
        // textVerticalAlign :'auto', //'top'、'bottom'、'middle' 垂直对齐方式，默认根据y设置自动调整
        left: "center", //20%  值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
        top: "top", //20%    值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐

        padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
        // 接受数组分别设定上右下左边距，同css
        itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，

        backgroundColor: "rgba(0,0,0,0)",
        borderColor: "#ccc", // 标题边框颜色
        borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
        // 主标题文字
        textStyle: {
          color: "#333333", // 主标题文字颜色
          fontSize: 18,
          fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
          fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        },
        // 副标题文字
        subtextStyle: {
          color: "#aaaaaa", // 副标题文字颜色
          fontSize: 12,
          fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
          fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        },
      },
      // 图例
      legend: {
        show: false,
        type: "plain", //'plain'：普通图例。缺省就是普通图例。'scroll'：可滚动翻页的图例。当图例数量较多时可以使用。
        // selectedMode: true, //图例选择的模式 'single' 或者 'multiple' 使用单选或者多选模式。
        // selected:{ //图例选中状态表。
        //     // 选中'系列1'
        //     '系列1': true,
        //     // 不选中'系列2'
        //     '系列2': false
        // },
        align: "auto", //'auto' 'left' 'right'
        icon: "", //'circle'园, 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
        // 横向布局时为水平间隔，纵向布局时为纵向间隔
        itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
        itemWidth: 25, // 图例图形宽度
        itemHeight: 14, // 图例图形高度
        // 1.区域/位置

        orient: "horizontal", // 布局方式，默认为水平布局，可选为： 'horizontal' ¦ 'vertical'
        width: "auto", // 图例组件的宽度。默认自适应auto。
        left: "center", //水平位置 20%  值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
        top: "top", //垂直位置 20%   值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐

        // 3.背景快设置
        padding: 5, // [10,5,5,5]图例内边距，单位px，默认各方向内边距为5，
        backgroundColor: "transparent",
        borderColor: "#cccccc", // 图例边框颜色
        borderWidth: 0, // 图例边框线宽，单位px，默认为0（无边框）
        borderRadius: 5, // 圆角半径 （顺时针左上，右上，右下，左下）
        shadowBlur: 10, //阴影的模糊大小
        shadowColor: "#cccccc", //阴影的颜色
        shadowOffsetX: 0, //阴影偏移距离
        shadowOffsetY: 0, //阴影偏移距离
        // 4.分页设置
        pageButtonItemGap: 5, //按钮间距
        pageButtonGap: 60, //距离 图例项之间的间隔
        pageButtonPosition: "end", // 图例控制块的位置。可选值为：'start'：控制块在左或上。'end'：控制块在右或下。
        pageIconColor: "#2f4554", // 翻页按钮的颜色
        pageIconInactiveColor: "#aaaaaa", // 禁按颜色
        pageIconSize: 15, //按钮的大小
        // 2.文字样式
        textStyle: {
          color: "#333333", // 主标题文字颜色
          fontSize: 18,
          fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
          fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        },
        pageTextStyle: {
          color: "#333", // 主标题文字颜色
          fontSize: 18,
          fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
          fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        },
      },
      // 提示框
      tooltip: {
        show: true,
        trigger: "axis", // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'(坐标轴)
        // 1.外观
        backgroundColor: "rgba(0,0,0,0.7)", // 提示背景颜色，默认为透明度为0.7的黑色
        borderColor: "#333333", // 提示边框颜色
        borderWidth: 0, // 提示边框线宽，单位px，默认为0（无边框）
        borderRadius: 4, // 提示边框圆角，单位px，默认为4
        padding: 5, // 提示内边距，单位px，默认各方向内边距为5，

        // showDelay: 20, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
        // hideDelay: 100, // 隐藏延迟，单位ms
        // transitionDuration: 0.4, // 动画变换时间，单位

        // 2.文本样式
        textStyle: {
          color: "#ffffff", // 主标题文字颜色
          fontSize: 14,
          fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
          fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        },
      },
      // 工具栏
      toolbox: {
        show: false,
        // 2.位置朝向
        orient: "horizontal", // 布局方式，默认为水平布局，可选为： 'horizontal' ¦ 'vertical'
        // width: '150', // 图例组件的宽度。默认自适应auto。
        left: "right", //水平位置 20%  值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
        top: "top", //垂直位置 20%   值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐
        // 3。图标尺寸
        itemSize: 15, // 工具箱图形宽度
        itemGap: 10, // 各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
        // 1.功能按钮
        feature: {
          // 保存图片
          saveAsImage: {
            show: false,
          },
          // 配置项还原
          restore: {
            show: true,
          },
          // 数据视图工具
          dataView: {
            show: false,
          },
        },
      },
      // 系列
      series: [
        {
          type: "line", //bar 类型
          name: "销量", // name
          // areaStyle: {}, // 折线图区域背景色
          // yAxisIndex:0, //索引
          // markPoint:{ //是否展示 数据标注
          //   data: [
          //     { type: 'max', name: 'Max' },
          //     { type: 'min', name: 'Min' }
          //   ]
          // },
          // markLine: {
          //   data: [{
          //       name: '平均线',
          //       // 支持 'average', 'min', 'max'
          //       type: 'average'
          //   }]
          // },
          // 1.折现样式
          smooth: true, //这句就是让曲线变平滑的
          // 2.拐点样式
          symbol: "circle", //拐点样式 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
          symbolSize: 4, //拐点大小
          // 4.动画
          animation: true, //开启动画
          animationDuration: 1000, //动画的时长
          animationEasing: "exponentialInOut", //动画效果 => animateList
          lineStyle: {
            color: "#5470c6",
            width: 2,
            type: "solid", //'solid''dashed''dotted'
          },
          itemStyle: {
            // 描边
            color: "", //拐点颜色
            borderColor: "#000000", // 描边颜色
            borderWidth: 2, // 描边大小
            borderType: "solid", //'solid''dashed''dotted'
          },
       
          // 3.文本标签
          label: {
            show: false,
            formatter: "{b}", //内容格式
            position: "top", //top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
            color: "#cccccc", //名称的颜色
            fontSize: 12, // 名称的字体大小
            fontWeight: "normal", // 名称的字体粗细 / 普通、加粗bold、更细lighter
            fontFamily: "sans-serif", //名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
          }
        },
        {
          type: "line", //bar 类型
          name: "销量1", // name
          // areaStyle: {}, // 折线图区域背景色
          // yAxisIndex:0, //索引
          // markPoint:{ //是否展示 数据标注
          //   data: [
          //     { type: 'max', name: 'Max' },
          //     { type: 'min', name: 'Min' }
          //   ]
          // },
          // markLine: {
          //   data: [{
          //       name: '平均线',
          //       // 支持 'average', 'min', 'max'
          //       type: 'average'
          //   }]
          // },
          // 1.折现样式
          smooth: true, //这句就是让曲线变平滑的
          // 2.拐点样式
          symbol: "circle", //拐点样式 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
          symbolSize: 4, //拐点大小
          // 4.动画
          animation: true, //开启动画
          animationDuration: 1000, //动画的时长
          animationEasing: "exponentialInOut", //动画效果 => animateList
          lineStyle: {
            color: "#91cc75",
            width: 2,
            type: "solid", //'solid''dashed''dotted'
          },
          itemStyle: {
            // 描边
            color: "", //拐点颜色
            borderColor: "#000000", // 描边颜色
            borderWidth: 2, // 描边大小
            borderType: "solid", //'solid''dashed''dotted'
          },
          // 3.文本标签
          label: {
            show: false,
            formatter: "{b}", //内容格式
            position: "top", //top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
            color: "#cccccc", //名称的颜色
            fontSize: 12, // 名称的字体大小
            fontWeight: "normal", // 名称的字体粗细 / 普通、加粗bold、更细lighter
            fontFamily: "sans-serif", //名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
          }
        },
      ],
    },
  },
  {
    component: "c-line",
    componentType: "3",
    layerBg: "layer-bar.png",
    label: "柱状图",
    propValue: "柱状图",
    icon: "button",
    xAxisArr:[{name: 'x', id: 0}], //编辑数据中维度
    yAxisArr:[{name: 'y1', id: 0},{name: 'y2', id: 1}, {name: 'y3', id: 2}], //编辑数据中量度
    objectData: [
      {
        "x": "一月",
        "y1": 8,
        "y2": 2,
        "y3": 9
      },
      {
        "x": "二月",
        "y1": 2,
        "y2": 3,
        "y3": 6
      },
      {
        "x": "三月",
        "y1": 8,
        "y2": 4,
        "y3": 3
      },
      {
        "x": "四月",
        "y1": 9,
        "y2": 4,
        "y3": 9
      },
      {
        "x": "五月",
        "y1": 1,
        "y2": 5,
        "y3": 4
      }
    ],
    materialData: {
      style: {
        name:'柱状图', // 组件标题
        width: 300,
        height: 200,
        top:1,
        left:1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

        borderTop: false,
        borderBottom: false,
        borderLeft: false,
        borderRight: false,
        borderWidth:'1',
        borderType:"solid",
        borderColor:"rgba(0,0,0,0)",
        // 背景类型
        backgroundType:"color",
        backgroundColor:'rgba(0,0,0,0.5)',  
        backgroundImage:'',
        // background-repeat: no-repeat;
        // boxShadow: '13px 13px 11px 3px #ccc', //阴影
        boxShadowX: 0, //阴影
        boxShadowY: 0, //阴影
        boxShadowM: 0, //阴影
        boxShadowC: 0, //阴影
        boxShadowColor: '#132a53', // 阴影颜色
      },
      // 视区
      // grid: {
      //   //  功能: 增加数值绝对值、百分比
      //   show: false,
      //   left: "12%",
      //   right: "7%",
      //   top: "20%",
      //   bottom: "22%",
      // },
      // xAxis: {
      //   //  type: 'value',
      //   show: true, //显示隐藏
      //   position: "bottom", // 坐标轴位置 / top
      //   name: "",
      //   nameLocation: "end", // 坐标轴名称位置 center 、start
      //   nameGap: "15", //坐标轴名称与轴线之间的距离。
      //   inverse: false, //是否是反向坐标轴。
      //   boundaryGap: true, //坐标轴两边留白策略
      //   // 名称文本样式
      //   nameTextStyle: {
      //     color: "#cccccc", // 坐标轴名称的颜色
      //     fontSize: 12, // 坐标轴名称的字体大小
      //     fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
      //     fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
      //   },
      //   //  标签
      //   axisLabel: {
      //     show: true, // 默认显示，属性show控制显示与否
      //     rotate: 0, // 字体旋转
      //     align: "center", //'left''center''right'
      //     margin: 8, //刻度标签与轴线之间的距离
      //     color: "#cccccc", // 坐标轴名称的颜色
      //     fontSize: 12, // 坐标轴名称的字体大小
      //     fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
      //     fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
      //   },
      //   // 轴线
      //   axisLine: {
      //     show: true, // 默认显示，属性show控制显示与否
      //     lineStyle: {
      //       // 属性lineStyle控制线条样式
      //       color: "#FFFFFF",
      //       width: 1,
      //       type: "solid", //'solid''dashed''dotted'
      //     },
      //   },
      //   // 刻度
      //   axisTick: {
      //     show: true, // 默认显示，属性show控制显示与否
      //     alignWithLabel: true, // 与标签对齐
      //     lineStyle: {
      //       // 属性lineStyle控制线条样式
      //       color: "#FFFFFF",
      //       width: 1,
      //     },
      //   },
      //   // 分割线
      //   splitLine: {
      //     show: false, // 默认显示，属性show控制显示与否
      //     lineStyle: {
      //       // 属性lineStyle控制线条样式
      //       color: "#FFFFFF", // ['#aaa', '#ddd']
      //       width: 1,
      //       type: "solid", //'solid''dashed''dotted'
      //     },
      //   },
      //   // 分割区域
      //   splitArea: {
      //     show: false, // 默认显示，属性show控制显示与否
      //     areaStyle: {
      //       // 属性lineStyle控制线条样式
      //       color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"], // 奇数偶数颜色
      //     },
      //   },

      //   // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      // },
      // yAxis: {
      //   // type: 'category',
      //   show: true, //显示隐藏
      //   position: "left", // 坐标轴位置 'left''right'
      //   name: "坐标轴名称",
      //   nameLocation: "end", // 坐标轴名称位置 、start
      //   nameGap: "15", //坐标轴名称与轴线之间的距离。
      //   inverse: false, //是否是反向坐标轴。
      //   boundaryGap: false, //坐标轴两边留白策略
      //   // min: 0, //坐标区间最小 dataMin
      //   // max: "dataMax", //坐标区间最大
      //   // 名称文本样式
      //   nameTextStyle: {
      //     color: "#cccccc", // 坐标轴名称的颜色
      //     fontSize: 12, // 坐标轴名称的字体大小
      //     fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
      //     fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
      //   },
      //   //  标签
      //   axisLabel: {
      //     show: true, // 默认显示，属性show控制显示与否
      //     rotate: 0, // 字体旋转
      //     align: "right", //'left''center''right' echarts数据为反数据
      //     margin: 8, //刻度标签与轴线之间的距离
      //     color: "#cccccc", // 坐标轴名称的颜色
      //     fontSize: 12, // 坐标轴名称的字体大小
      //     fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
      //     fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
      //   },
      //   // 轴线
      //   axisLine: {
      //     show: true, // 默认显示，属性show控制显示与否
      //     lineStyle: {
      //       // 属性lineStyle控制线条样式
      //       color: "#FFFFFF",
      //       width: 1,
      //       type: "solid", //'solid''dashed''dotted'
      //     },
      //   },
      //   // 刻度
      //   axisTick: {
      //     show: false, // 默认显示，属性show控制显示与否
      //     alignWithLabel: false, // 与标签对齐
      //     lineStyle: {
      //       // 属性lineStyle控制线条样式
      //       color: "#FFFFFF",
      //       width: 1,
      //     },
      //   },
      //   // 分割线
      //   splitLine: {
      //     show: false, // 默认显示，属性show控制显示与否
      //     lineStyle: {
      //       // 属性lineStyle控制线条样式
      //       color: "#FFFFFF",
      //       width: 1,
      //       type: "solid", //'solid''dashed''dotted'
      //     },
      //   },
      //   // 分割区域
      //   splitArea: {
      //     show: false, // 默认显示，属性show控制显示与否
      //     areaStyle: {
      //       // 属性lineStyle控制线条样式
      //       color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"], // 奇数偶数颜色
      //     },
      //   },
      // },
      // // 图表标题
      // title: {
      //   show: false, //显示隐藏
      //   text: "",
      //   link: "",
      //   subtext: "",
      //   sublink: "",

      //   // 位置
      //   // textAlign:'auto', //'left'、'right'、'center' 水平对齐方式，默认根据x设置自动调整
      //   // textVerticalAlign :'auto', //'top'、'bottom'、'middle' 垂直对齐方式，默认根据y设置自动调整
      //   left: "center", //20%  值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
      //   top: "top", //20%    值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐

      //   padding: 5, // 标题内边距，单位px，默认各方向内边距为5，
      //   // 接受数组分别设定上右下左边距，同css
      //   itemGap: 10, // 主副标题纵向间隔，单位px，默认为10，

      //   backgroundColor: "rgba(0,0,0,0)",
      //   borderColor: "#ccc", // 标题边框颜色
      //   borderWidth: 0, // 标题边框线宽，单位px，默认为0（无边框）
      //   // 主标题文字
      //   textStyle: {
      //     color: "#333333", // 主标题文字颜色
      //     fontSize: 18,
      //     fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
      //     fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
      //   },
      //   // 副标题文字
      //   subtextStyle: {
      //     color: "#aaaaaa", // 副标题文字颜色
      //     fontSize: 12,
      //     fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
      //     fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
      //   },
      // },
      // // 图例
      // legend: {
      //   show: false,
      //   type: "plain", //'plain'：普通图例。缺省就是普通图例。'scroll'：可滚动翻页的图例。当图例数量较多时可以使用。
      //   // selectedMode: true, //图例选择的模式 'single' 或者 'multiple' 使用单选或者多选模式。
      //   // selected:{ //图例选中状态表。
      //   //     // 选中'系列1'
      //   //     '系列1': true,
      //   //     // 不选中'系列2'
      //   //     '系列2': false
      //   // },
      //   align: "auto", //'auto' 'left' 'right'
      //   icon: "", //'circle'园, 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow', 'none'
      //   // 横向布局时为水平间隔，纵向布局时为纵向间隔
      //   itemGap: 10, // 各个item之间的间隔，单位px，默认为10，
      //   itemWidth: 25, // 图例图形宽度
      //   itemHeight: 14, // 图例图形高度
      //   // 1.区域/位置

      //   orient: "horizontal", // 布局方式，默认为水平布局，可选为： 'horizontal' ¦ 'vertical'
      //   width: "auto", // 图例组件的宽度。默认自适应auto。
      //   left: "center", //水平位置 20%  值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
      //   top: "top", //垂直位置 20%   值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐

      //   // 3.背景快设置
      //   padding: 5, // [10,5,5,5]图例内边距，单位px，默认各方向内边距为5，
      //   backgroundColor: "transparent",
      //   borderColor: "#cccccc", // 图例边框颜色
      //   borderWidth: 0, // 图例边框线宽，单位px，默认为0（无边框）
      //   borderRadius: 5, // 圆角半径 （顺时针左上，右上，右下，左下）
      //   shadowBlur: 10, //阴影的模糊大小
      //   shadowColor: "#cccccc", //阴影的颜色
      //   shadowOffsetX: 0, //阴影偏移距离
      //   shadowOffsetY: 0, //阴影偏移距离
      //   // 4.分页设置
      //   pageButtonItemGap: 5, //按钮间距
      //   pageButtonGap: 60, //距离 图例项之间的间隔
      //   pageButtonPosition: "end", // 图例控制块的位置。可选值为：'start'：控制块在左或上。'end'：控制块在右或下。
      //   pageIconColor: "#2f4554", // 翻页按钮的颜色
      //   pageIconInactiveColor: "#aaaaaa", // 禁按颜色
      //   pageIconSize: 15, //按钮的大小
      //   // 2.文字样式
      //   textStyle: {
      //     color: "#333333", // 主标题文字颜色
      //     fontSize: 18,
      //     fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
      //     fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
      //   },
      //   pageTextStyle: {
      //     color: "#333", // 主标题文字颜色
      //     fontSize: 18,
      //     fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
      //     fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
      //   },
      // },
      // // 提示框
      // tooltip: {
      //   show: true,
      //   trigger: "item", // 触发类型，默认数据触发，见下图，可选为：'item' ¦ 'axis'(坐标轴)
      //   // 1.外观
      //   backgroundColor: "rgba(0,0,0,0.7)", // 提示背景颜色，默认为透明度为0.7的黑色
      //   borderColor: "#333333", // 提示边框颜色
      //   borderWidth: 0, // 提示边框线宽，单位px，默认为0（无边框）
      //   borderRadius: 4, // 提示边框圆角，单位px，默认为4
      //   padding: 5, // 提示内边距，单位px，默认各方向内边距为5，

      //   // showDelay: 20, // 显示延迟，添加显示延迟可以避免频繁切换，单位ms
      //   // hideDelay: 100, // 隐藏延迟，单位ms
      //   // transitionDuration: 0.4, // 动画变换时间，单位

      //   // 2.文本样式
      //   textStyle: {
      //     color: "#ffffff", // 主标题文字颜色
      //     fontSize: 14,
      //     fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
      //     fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
      //   },
      // },
      // // 工具栏
      // toolbox: {
      //   show: false,
      //   // 2.位置朝向
      //   orient: "horizontal", // 布局方式，默认为水平布局，可选为： 'horizontal' ¦ 'vertical'
      //   // width: '150', // 图例组件的宽度。默认自适应auto。
      //   left: "right", //水平位置 20%  值为'left', 'center', 'right'，组件会根据相应的位置自动对齐。
      //   top: "top", //垂直位置 20%   值为'top', 'middle', 'bottom'，组件会根据相应的位置自动对齐
      //   // 3。图标尺寸
      //   itemSize: 15, // 工具箱图形宽度
      //   itemGap: 10, // 各个item之间的间隔，单位px，默认为10，横向布局时为水平间隔，纵向布局时为纵向间隔
      //   // 1.功能按钮
      //   feature: {
      //     // 保存图片
      //     saveAsImage: {
      //       show: false,
      //     },
      //     // 配置项还原
      //     restore: {
      //       show: true,
      //     },
      //     // 数据视图工具
      //     dataView: {
      //       show: false,
      //     },
      //   },
      // },
      // 系列
      series: [
        {
          type: 'bar', //bar 类型
          name: '销量', // name
          // 柱设置
          barWidth: '', //40% 柱形宽度
          barMinHeight: 0, // 最小高度
          barGap:'30%', //不同类目间距
          barCategoryGap:'20%', //同类目间距
          itemStyle: {
            borderColor:'#000', //描边颜色
            borderWidth:'', //描边宽度，默认不描边
            borderType:"solid", //描边类型 'solid''dashed''dotted'
            borderRadius: 0, //[5, 5, 0, 0] //（顺时针左上，右上，右下，左下）
          },

          // 柱背景
          showBackground: false, //显示柱背景
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)', // 颜色
            borderColor:'#000', //描边颜色
            borderWidth:'', //描边宽度，默认不描边
            borderType:"solid", //描边类型 'solid''dashed''dotted'
            borderRadius: 0, //[5, 5, 0, 0] //（顺时针左上，右上，右下，左下）
          },

          // 3.文本标签
          label: {
            show:false,
            formatter:'{b}',//内容格式
            position:'top', //top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
            color: 'red',//名称的颜色
            fontSize: 16, // 名称的字体大小
            fontWeight: 'normal', // 名称的字体粗细 / 普通、加粗bold、更细lighter
            fontFamily:'sans-serif', //名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
          },
          // 4.动画
          animation: true, //开启动画
          animationDuration:1000, //动画的时长
          animationEasing:'exponentialInOut', //动画效果 => animateList
        },
        {
          type: "bar", //bar 类型
          name: "销量1", // name
          // areaStyle: {}, // 折线图区域背景色
          // yAxisIndex:0, //索引
          // markPoint:{ //是否展示 数据标注
          //   data: [
          //     { type: 'max', name: 'Max' },
          //     { type: 'min', name: 'Min' }
          //   ]
          // },
          // markLine: {
          //   data: [{
          //       name: '平均线',
          //       // 支持 'average', 'min', 'max'
          //       type: 'average'
          //   }]
          // },

          // 柱设置
          barWidth: '', //40% 柱形宽度
          barMinHeight:0, // 最小高度
          barGap:'30%', //不同类目间距
          barCategoryGap:'20%', //同类目间距
          itemStyle: {
            borderColor:'#000', //描边颜色
            borderWidth:'', //描边宽度，默认不描边
            borderType:"solid", //描边类型 'solid''dashed''dotted'
            borderRadius: 0, //[5, 5, 0, 0] //（顺时针左上，右上，右下，左下）
          },

          // 柱背景
          showBackground: false, //显示柱背景
          backgroundStyle: {
            color: 'rgba(180, 180, 180, 0.2)', // 颜色
            borderColor:'#000', //描边颜色
            borderWidth:'', //描边宽度，默认不描边
            borderType:"solid", //描边类型 'solid''dashed''dotted'
            borderRadius: 0, //[5, 5, 0, 0] //（顺时针左上，右上，右下，左下）
          },

          // 3.文本标签
          label: {
            show: false,
            formatter: "{b}", //内容格式
            position: "top", //top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
            color: "#cccccc", //名称的颜色
            fontSize: 12, // 名称的字体大小
            fontWeight: "normal", // 名称的字体粗细 / 普通、加粗bold、更细lighter
            fontFamily: "sans-serif", //名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
          },
          // 4.动画
          animation: true, //开启动画
          animationDuration: 1000, //动画的时长
          animationEasing: "exponentialInOut", //动画效果 => animateList
        },
        // {
        //   type: "bar", //bar 类型
        //   name: "销量1", // name
        //   // areaStyle: {}, // 折线图区域背景色
        //   // yAxisIndex:0, //索引
        //   // markPoint:{ //是否展示 数据标注
        //   //   data: [
        //   //     { type: 'max', name: 'Max' },
        //   //     { type: 'min', name: 'Min' }
        //   //   ]
        //   // },
        //   // markLine: {
        //   //   data: [{
        //   //       name: '平均线',
        //   //       // 支持 'average', 'min', 'max'
        //   //       type: 'average'
        //   //   }]
        //   // },

        //   // 柱设置
        //   barWidth: '', //40% 柱形宽度
        //   barMinHeight:0, // 最小高度
        //   barGap:'30%', //不同类目间距
        //   barCategoryGap:'20%', //同类目间距
        //   itemStyle: {
        //     borderColor:'#000', //描边颜色
        //     borderWidth:'', //描边宽度，默认不描边
        //     borderType:"solid", //描边类型 'solid''dashed''dotted'
        //     borderRadius: 0, //[5, 5, 0, 0] //（顺时针左上，右上，右下，左下）
        //   },

        //   // 柱背景
        //   showBackground: true, //显示柱背景
        //   backgroundStyle: {
        //     color: 'rgba(180, 180, 180, 0.2)', // 颜色
        //     borderColor:'#000', //描边颜色
        //     borderWidth:'', //描边宽度，默认不描边
        //     borderType:"solid", //描边类型 'solid''dashed''dotted'
        //     borderRadius: 0, //[5, 5, 0, 0] //（顺时针左上，右上，右下，左下）
        //   },

        //   // 3.文本标签
        //   label: {
        //     show: false,
        //     formatter: "{b}", //内容格式
        //     position: "top", //top / left / right / bottom / inside / insideLeft / insideRight / insideTop / insideBottom / insideTopLeft / insideBottomLeft / insideTopRight / insideBottomRight
        //     color: "#cccccc", //名称的颜色
        //     fontSize: 12, // 名称的字体大小
        //     fontWeight: "normal", // 名称的字体粗细 / 普通、加粗bold、更细lighter
        //     fontFamily: "sans-serif", //名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        //   },
        //   // 4.动画
        //   animation: true, //开启动画
        //   animationDuration: 1000, //动画的时长
        //   animationEasing: "exponentialInOut", //动画效果 => animateList
        //   data: [5, 60, 136, 10, 10, 220],
        // },
      ],
      // 视区
      grid: {
        //  功能: 增加数值绝对值、百分比
        show: false,
        left: "12%",
        right: "7%",
        top: "20%",
        bottom: "22%",
      },
      xAxis: {
        //  type: 'value',
        show: true, //显示隐藏
        position: "bottom", // 坐标轴位置 / top
        name: "",
        nameLocation: "end", // 坐标轴名称位置 center 、start
        nameGap: "15", //坐标轴名称与轴线之间的距离。
        inverse: false, //是否是反向坐标轴。
        boundaryGap: true, //坐标轴两边留白策略
        // 名称文本样式
        nameTextStyle: {
          color: "#cccccc", // 坐标轴名称的颜色
          fontSize: 12, // 坐标轴名称的字体大小
          fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
          fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        },
        //  标签
        axisLabel: {
          show: true, // 默认显示，属性show控制显示与否
          rotate: 0, // 字体旋转
          align: "center", //'left''center''right'
          margin: 8, //刻度标签与轴线之间的距离
          color: "#cccccc", // 坐标轴名称的颜色
          fontSize: 12, // 坐标轴名称的字体大小
          fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
          fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        },
        // 轴线
        axisLine: {
          show: true, // 默认显示，属性show控制显示与否
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "#FFFFFF",
            width: 1,
            type: "solid", //'solid''dashed''dotted'
          },
        },
        // 刻度
        axisTick: {
          show: true, // 默认显示，属性show控制显示与否
          alignWithLabel: true, // 与标签对齐
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "#FFFFFF",
            width: 1,
          },
        },
        // 分割线
        splitLine: {
          show: false, // 默认显示，属性show控制显示与否
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "#FFFFFF", // ['#aaa', '#ddd']
            width: 1,
            type: "solid", //'solid''dashed''dotted'
          },
        },
        // 分割区域
        splitArea: {
          show: false, // 默认显示，属性show控制显示与否
          areaStyle: {
            // 属性lineStyle控制线条样式
            color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"], // 奇数偶数颜色
          },
        },

        // data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      yAxis: {
        // type: 'category',
        show: true, //显示隐藏
        position: "left", // 坐标轴位置 'left''right'
        name: "坐标轴名称",
        nameLocation: "end", // 坐标轴名称位置 、start
        nameGap: "15", //坐标轴名称与轴线之间的距离。
        inverse: false, //是否是反向坐标轴。
        boundaryGap: false, //坐标轴两边留白策略
        // min: 0, //坐标区间最小 dataMin
        // max: "dataMax", //坐标区间最大
        // 名称文本样式
        nameTextStyle: {
          color: "#cccccc", // 坐标轴名称的颜色
          fontSize: 12, // 坐标轴名称的字体大小
          fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
          fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        },
        //  标签
        axisLabel: {
          show: true, // 默认显示，属性show控制显示与否
          rotate: 0, // 字体旋转
          align: "right", //'left''center''right' echarts数据为反数据
          margin: 8, //刻度标签与轴线之间的距离
          color: "#cccccc", // 坐标轴名称的颜色
          fontSize: 12, // 坐标轴名称的字体大小
          fontWeight: "normal", // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
          fontFamily: "sans-serif", // 坐标轴名称的字体 /Microsoft YaHei/SimHei/SimSun/KaiTi/FangSong
        },
        // 轴线
        axisLine: {
          show: true, // 默认显示，属性show控制显示与否
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "#FFFFFF",
            width: 1,
            type: "solid", //'solid''dashed''dotted'
          },
        },
        // 刻度
        axisTick: {
          show: false, // 默认显示，属性show控制显示与否
          alignWithLabel: false, // 与标签对齐
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "#FFFFFF",
            width: 1,
          },
        },
        // 分割线
        splitLine: {
          show: false, // 默认显示，属性show控制显示与否
          lineStyle: {
            // 属性lineStyle控制线条样式
            color: "#FFFFFF",
            width: 1,
            type: "solid", //'solid''dashed''dotted'
          },
        },
        // 分割区域
        splitArea: {
          show: false, // 默认显示，属性show控制显示与否
          areaStyle: {
            // 属性lineStyle控制线条样式
            color: ["rgba(250,250,250,0.3)", "rgba(200,200,200,0.3)"], // 奇数偶数颜色
          },
        },
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
    },
  },
  
  {
    component: "c-img",
    componentType: "1",
    label: "单张图片",
    layerBg: "icon_default_image.png",
    propValue: "单张图片",
    icon: "img",
    materialData: {
      style: {
        name:'单张图片', // 组件标题
        width: 300,
        height: 300,
        top:1,
        left:1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

        borderTop: false,
        borderBottom: false,
        borderLeft: false,
        borderRight: false,
        borderWidth:1,
        borderType:"solid",
        borderColor:"rgba(0,0,0,0.5)",
        // 背景类型
        backgroundType:"color",
        backgroundColor:'rgba(0,0,0,0)',
        backgroundImage: require('@/assets/images/icon_default_image.png'),
        // background-repeat: no-repeat;
        // backgroundSize: 100, //图片重复
        backgroundSize: '100% 100%', //图片重复
        // boxShadow: '13px 13px 11px 3px #ccc', //阴影
        boxShadowX: 0, //阴影
        boxShadowY: 0, //阴影
        boxShadowM: 0, //阴影
        boxShadowC: 0, //阴影
        boxShadowColor: '#132a53', // 阴影颜色
      },
    }
  },
  {
    component: "c-statistic",
    componentType: "2",
    label: "数字组件",
    propValue: "数字组件",
    layerBg: "layer_statistic.png",
    icon: "statistic",
    xAxisArr:[{name: 'des', id: 0}], //编辑数据中维度
    yAxisArr:[{name: 'value', id: 0}], //编辑数据中量度
    objectData:{
      "des": "Feedback",
      "value": 886623
    },
    materialData: {
      style: {
        name:'数字组件', // 组件标题
        width: 200,
        height: 100,
        top:1,
        left:1,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,

        borderTop: false,
        borderBottom: false,
        borderLeft: false,
        borderRight: false,
        borderWidth:'1',
        borderType:"solid",
        borderColor:"rgba(0,0,0,0)",

        // 背景类型
        backgroundType:"color",
        backgroundColor:'rgba(0,0,0,0)',
        backgroundImage:'',
        // background-repeat: no-repeat;
        // backgroundSize: 'cover', //图片重复
        // boxShadow: '13px 13px 11px 3px #ccc', //阴影
        boxShadowX: 0, //阴影
        boxShadowY: 0, //阴影
        boxShadowM: 0, //阴影
        boxShadowC: 0, //阴影
        boxShadowColor: '#132a53', // 阴影颜色

        componentStyle: {
          // 排列方式
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          // flexWrap: 'wrap', // wrap / 反转 wrap-reverse
          // flexDirection: 'column',
          flexFlow:'1',
          // 对齐方式
          textAlign: 'center',
        }
      },
      title: { //标题
        marginLeft:0,
        color: '#cccccc',// 坐标轴名称的颜色
        fontSize: 20, // 坐标轴名称的字体大小
        fontWeight: 'normal', // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
      },
      number: {
        paddingLeft:0,
        color: '#3f8600',// 坐标轴名称的颜色
        fontSize: 18, // 坐标轴名称的字体大小
        fontWeight: 'normal', // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
        prefix: { //前缀
          marginLeft:0,
          content:'$',
          color: '#cccccc',// 坐标轴名称的颜色
          fontSize: 18, // 坐标轴名称的字体大小
          fontWeight: 'normal', // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
        },
        suffix: { //后缀
          paddingLeft:0,
          content:'元',
          color: '#cccccc',// 坐标轴名称的颜色
          fontSize: 18, // 坐标轴名称的字体大小
          fontWeight: 'normal', // 坐标轴名称的字体粗细 / 普通、加粗bold、更细lighter
        }
      }
    }
  },
];

for (let i = 0, len = list.length; i < len; i++) {
  const item = list[i];
  // item.style = { ...commonStyle, ...item.style };
  item.materialData.style = { ...item.materialData.style, ...commonStyle };
  list[i] = { ...commonAttr, ...item };
}

export default list;

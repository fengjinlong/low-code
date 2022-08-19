<template>
  <div class="in-coder-panel">
    <a-modal
      v-model:visible="visible"
      width="440px"
      :zIndex="399"
      :closable="false"
      @cancel="cancel"
      :footer="null"
      >
        <textarea style="height: 100% !important;" ref="textarea" v-model="code"></textarea>
    </a-modal>
  </div>
</template>

<script>
// 引入全局实例
import _CodeMirror from 'codemirror/lib/codemirror'

// 核心样式
import 'codemirror/lib/codemirror.css'
import 'codemirror/lib/codemirror.js'
// 引入主题后还需要在 options 中指定主题才会生效
// 需要引入具体的语法高亮库才会有对应的语法高亮效果, 目前已动态引入
import 'codemirror/theme/darcula.css'
// 主题样式
import 'codemirror/addon/hint/show-hint.css'

// 代码折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'

import 'codemirror/mode/javascript/javascript.js'
import 'codemirror/mode/css/css.js'
// import '@/assets/js/csslint.js'
// import '@/assets/js/jsonlint.js'
// import '@/assets/js/csslint.js'
import 'codemirror/addon/lint/lint.js'
import 'codemirror/addon/lint/javascript-lint.js'
import 'codemirror/addon/lint/json-lint.js' 
import 'codemirror/addon/lint/css-lint.js'

import 'codemirror/addon/lint/lint.css'




import {reactive, defineComponent, toRefs, getCurrentInstance, onMounted, onBeforeUnmount} from 'vue'

// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import 'codemirror/mode/clike/clike.js'
import 'codemirror/mode/r/r.js'
const codemirrorThemList = []
const requireModules = require.context('codemirror/theme/', false, /\.css$/)
requireModules.keys().forEach(value => {
    const newValue = value.replace(/^\.\//, '').replace(/\.css$/, '')
  codemirrorThemList.push(newValue)
})

// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror
let coder = null; // 编辑器实例

import { effect, ref } from "vue";
import { nextTick } from 'q';

export default defineComponent({
  name: 'codeEditor',
  props: {
    value: {
      type: String,
      default: ''
    },
    heightSize: {
      type: Number,
      default: 500
    },
    scene: {
      type: String,
      default: 'edit' // add: 新增； edit: 编辑； look: 查看
    },
    eventType: {
      type: String,
      default: 'blur' // 可用事件'change', 'blur'等等；具体参考codemirror文档
    },
    theme: {
      type: String,
      default: 'darcula' // 编辑器主题色
    }
  },
  setup(props, {emit}) {
    const {proxy} = getCurrentInstance()
    const visible = ref(true)
    const updataVal = ref([]); //修改后的数据
    const data = reactive({
      code: props.value, // 内部真实的内容
      // 默认配置
      options: {
        indentWithTabs: true,
        foldGutter: true,
        lineWrapping: true, //是否自动换行
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
        smartIndent: true,
        matchBrackets: true,
        autoRefresh: true,
        extraKeys: { Ctrl: 'autocomplete' }, // 自定义快捷键
        hintOptions: {
            // 自定义提示选项
            tables: {
                users: ['name', 'score', 'birthDate'],
                countries: ['name', 'population', 'size'],
            },
        },
        // mode: 'text/x-java', // 不设置的话，默认使用第一个引用
        mode: 'application/json', // 不设置的话，默认使用第一个引用
        lint:true,
          // lint: {options: {esversion: 2021}},
        // 缩进格式
        tabSize: 2,
        // 主题，对应主题库 JS 需要提前引入
        theme: props.theme,
        // 显示行号
        lineNumbers: true,
        readOnly: (props.scene === 'add' || props.scene === 'edit') ? false : 'nocursor' // true: 不可编辑  false: 可编辑 'nocursor' 失焦,不可编辑
      },
      // 初始化
      initialize: () => {
        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        coder = CodeMirror.fromTextArea(proxy.$refs.textarea, data.options)
        const h = props.heightSize + 'px'
        coder.setSize('auto', h)
        // 此处也可使用'change'事件，不过每次书写的过程中都会触发，为了提高性能，故默认使用'blur'
        coder.on(props.eventType, coder => {
          // emit('update:value', coder.getValue())
          updataVal.value = coder.getValue()
          // console.log(coder.getValue(),'coder.getValue()')
        })
      },
      // 动态引入语法高亮库
      importThemDynamic: () => {
        return new Promise(resolve => {
          codemirrorThemList.forEach(value => {
            if (props.theme === value) {
              import(`codemirror/theme/${props.theme}.css`)
              resolve()
            }
          })
        })
      },
      cancel: () => {
        // console.log(props.value,'code')
        // console.log(data.code,'code')
        // console.log(updataVal.value,'code')
        var parseData = null;
        try {
          parseData = JSON.parse(updataVal.value, null, "\t")
        } catch (d) {
          parseData = JSON.parse(data.code, null, "\t")
        }
        // console.log(parseData,'parseData')
        // emit('cancel:value', parseData)
        emit('cancel:value', parseData)
      }
    })
    onMounted(() => {
      // console.log('value:', props.value)
      data.importThemDynamic().then(() => {
         data.initialize()
      })
      // nextTick(()=>{

      //   data.initialize()
      // })
    })
    onBeforeUnmount(() => {
      coder.off(props.eventType)
    })
    return {
      ...toRefs(data),
      visible
    }
  }
})
</script>

<style  lang="less">
.in-coder-panel {
  flex-grow: 1;
  display: flex;
  position: relative;
}

.in-coder-panel .CodeMirror {
  flex-grow: 1;
  text-align: left !important;
  z-index: 1;
}

.in-coder-panel .CodeMirror .CodeMirror-code {
  line-height: 20px;
}
.ant-modal {
  /*修改滚动条样式*/
  div::-webkit-scrollbar{
    width:2px;
    height:8px;
    /**/
  }
  div::-webkit-scrollbar-track{
    background: #09324d;
    border-radius:2px;
  }
  div::-webkit-scrollbar-thumb{
    background: #008bc9;
    border-radius:10px;
  }
  div::-webkit-scrollbar-thumb:hover{
    background: #2da3bd;
  }
  div::-webkit-scrollbar-corner{
    background: #179a16;
  }                                     
}
</style>